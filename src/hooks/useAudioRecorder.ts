"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface AudioRecorderState {
  isRecording: boolean;
  recordingDuration: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  voiceLevel: number; // 0 - 100
  waveformBars: number[]; // 32 normalized height values (0 - 100)
  isSupported: boolean;
  permissionDenied: boolean;
  errorMessage: string | null;
}

export function useAudioRecorder() {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    recordingDuration: 0,
    audioBlob: null,
    audioUrl: null,
    voiceLevel: 0,
    waveformBars: new Array(32).fill(10),
    isSupported: true,
    permissionDenied: false,
    errorMessage: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasMedia = Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      const hasRecorder = typeof MediaRecorder !== "undefined";
      setState((prev) => ({
        ...prev,
        isSupported: hasMedia && hasRecorder,
      }));
    }
  }, []);

  const cleanUpStream = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState((prev) => ({
        ...prev,
        errorMessage: "इस डिवाइस में ऑडियो रिकॉर्डिंग समर्थित नहीं है।",
      }));
      return;
    }

    cleanUpStream();

    // Revoke previous audio URL if any
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      // Determine best mimeType
      let mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else {
          mimeType = "";
        }
      }

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const finalType = recorder.mimeType || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type: finalType });
        const url = URL.createObjectURL(blob);
        setState((prev) => ({
          ...prev,
          isRecording: false,
          audioBlob: blob,
          audioUrl: url,
          voiceLevel: 0,
        }));
      };

      // Set up AudioContext for real-time waveform & voice level
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // Gives 32 frequency bins
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateWaveform = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate overall amplitude / volume
          let sum = 0;
          const bars: number[] = [];
          for (let i = 0; i < dataArray.length; i++) {
            const val = dataArray[i];
            sum += val;
            // Map 0-255 to 10-100 min bar height
            bars.push(Math.max(12, Math.round((val / 255) * 100)));
          }

          const avg = sum / dataArray.length;
          const level = Math.min(100, Math.round((avg / 128) * 100));

          setState((prev) => ({
            ...prev,
            voiceLevel: level,
            waveformBars: bars,
          }));

          animFrameRef.current = requestAnimationFrame(updateWaveform);
        };

        animFrameRef.current = requestAnimationFrame(updateWaveform);
      }

      recorder.start(100);

      setState((prev) => ({
        ...prev,
        isRecording: true,
        recordingDuration: 0,
        audioBlob: null,
        audioUrl: null,
        permissionDenied: false,
        errorMessage: null,
      }));

      // Track duration in seconds
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds += 1;
        setState((prev) => ({
          ...prev,
          recordingDuration: seconds,
        }));

        // Limit recording to max 10 seconds for young kids
        if (seconds >= 10) {
          stopRecording();
        }
      }, 1000);
    } catch (err: any) {
      console.error("Microphone error:", err);
      cleanUpStream();
      setState((prev) => ({
        ...prev,
        isRecording: false,
        permissionDenied: true,
        errorMessage: "माइक की अनुमति नहीं मिल सकी। कृपया अनुमति दें।",
      }));
    }
  }, [cleanUpStream, state.audioUrl]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    cleanUpStream();
  }, [cleanUpStream]);

  const clearRecording = useCallback(() => {
    cleanUpStream();
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState((prev) => ({
      ...prev,
      isRecording: false,
      recordingDuration: 0,
      audioBlob: null,
      audioUrl: null,
      voiceLevel: 0,
      waveformBars: new Array(32).fill(10),
      errorMessage: null,
    }));
  }, [cleanUpStream, state.audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanUpStream();
    };
  }, [cleanUpStream]);

  return {
    ...state,
    startRecording,
    stopRecording,
    clearRecording,
  };
}

