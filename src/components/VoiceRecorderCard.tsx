"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Radio,
  Info,
  Sparkles,
  ArrowRight,
  Headphones,
  Zap,
} from "lucide-react";
import { HindiItem } from "@/data/hindiContent";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { compareHindiSpeech, CompareResult } from "@/lib/comparison";
import { AudioWaveform } from "./AudioWaveform";
import { useKidSounds } from "@/hooks/useKidSounds";
import { ConfettiCelebration } from "./ConfettiCelebration";

interface VoiceRecorderCardProps {
  item: HindiItem;
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev?: () => void;
  speechRate?: number;
  autoAdvance?: boolean;
}

export function VoiceRecorderCard({
  item,
  currentIndex,
  totalItems,
  onNext,
  onPrev,
  speechRate = 0.82,
  autoAdvance = true,
}: VoiceRecorderCardProps) {
  const [isPlayingChild, setIsPlayingChild] = useState<boolean>(false);
  const [sequentialActive, setSequentialActive] = useState<"reference" | "child" | null>(null);
  const [result, setResult] = useState<CompareResult | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState<boolean>(autoAdvance);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { speak, isSpeaking: isTtsSpeaking, stop: stopTts } = useSpeechSynthesis();
  const { playPopSound, playMicChime, playStarSound, playCorrectSound } = useKidSounds();

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setCountdownSeconds(null);
  }, []);

  const triggerSuccess = useCallback(
    (comparison: CompareResult) => {
      if (hasSucceeded) return;
      setHasSucceeded(true);
      setResult(comparison);
      setShowConfetti(true);
      playCorrectSound();
      playStarSound();

      // Cleanly stop audio recording & STT
      stopRecording();
      stopStt();

      if (autoAdvanceEnabled) {
        clearAutoAdvance();
        setCountdownSeconds(1);

        autoAdvanceTimerRef.current = setTimeout(() => {
          clearAutoAdvance();
          playPopSound();
          onNext();
        }, 1300);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoAdvanceEnabled, clearAutoAdvance, hasSucceeded, onNext, playCorrectSound, playPopSound, playStarSound]
  );

  const targetWord = item.devanagari || item.text;

  const handleRecognizedSpeech = useCallback(
    (text: string, alternatives?: string[]) => {
      if (hasSucceeded) return;
      const res = compareHindiSpeech(targetWord, text, {
        alternatives,
        transliteration: item.transliteration || item.romanization,
        expectedSpeech: item.expectedSpeech,
        consonantRoot: (item as any).consonantRoot,
      });
      setResult(res);
      if (res.isMatch) {
        triggerSuccess(res);
      }
    },
    [hasSucceeded, item, targetWord, triggerSuccess]
  );

  const handleInterimSpeech = useCallback(
    (text: string, alternatives?: string[]) => {
      if (!text || hasSucceeded) return;
      const res = compareHindiSpeech(targetWord, text, {
        alternatives,
        transliteration: item.transliteration || item.romanization,
        expectedSpeech: item.expectedSpeech,
        consonantRoot: (item as any).consonantRoot,
      });
      if (res.isMatch) {
        triggerSuccess(res);
      }
    },
    [hasSucceeded, item, targetWord, triggerSuccess]
  );

  const {
    transcript,
    startListening: startStt,
    stopListening: stopStt,
    resetTranscript,
  } = useSpeechRecognition({
    lang: "hi-IN",
    onInterimResult: handleInterimSpeech,
    onFinalResult: handleRecognizedSpeech,
  });

  const {
    isRecording,
    recordingDuration,
    audioBlob,
    audioUrl,
    voiceLevel,
    waveformBars,
    permissionDenied,
    errorMessage,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  // Reset state when word changes
  useEffect(() => {
    clearAutoAdvance();
    setResult(null);
    setHasSucceeded(false);
    setShowConfetti(false);
    clearRecording();
    resetTranscript();
    setSequentialActive(null);
    setIsPlayingChild(false);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
  }, [item.id, clearAutoAdvance, clearRecording, resetTranscript]);

  // Start recording both audio blob and speech recognition
  const handleStartRecording = async () => {
    clearAutoAdvance();
    playPopSound();
    playMicChime(true);
    setResult(null);
    setHasSucceeded(false);
    resetTranscript();
    await startRecording();
    startStt();
  };

  // Stop recording
  const handleStopRecording = () => {
    playMicChime(false);
    stopRecording();
    stopStt();
  };

  // Clear & retry
  const handleClear = () => {
    clearAutoAdvance();
    playPopSound();
    clearRecording();
    resetTranscript();
    setResult(null);
    setHasSucceeded(false);
    setSequentialActive(null);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
  };

  // Play back child's recording
  const handlePlayChildAudio = () => {
    if (!audioUrl) return;
    playPopSound();
    stopTts();
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.play();
      setIsPlayingChild(true);
    }
  };

  // Play back reference pronunciation
  const handlePlayReference = () => {
    playPopSound();
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    speak(targetWord, { rate: speechRate });
  };

  // Sequential comparison: Reference first, then Child's recording
  const handlePlaySequential = () => {
    playPopSound();
    if (!audioUrl) return;

    setSequentialActive("reference");
    speak(targetWord, { rate: speechRate }, () => {
      // After reference finishes, wait 600ms then play child's audio
      setTimeout(() => {
        setSequentialActive("child");
        if (audioPlayerRef.current) {
          audioPlayerRef.current.currentTime = 0;
          audioPlayerRef.current.play();
          setIsPlayingChild(true);
        }
      }, 600);
    });
  };

  const handleManualNext = () => {
    clearAutoAdvance();
    playPopSound();
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Celebration Confetti */}
      <ConfettiCelebration trigger={showConfetti} />

      {/* Hidden audio element for recorded playback */}
      {audioUrl && (
        <audio
          ref={audioPlayerRef}
          src={audioUrl}
          onEnded={() => {
            setIsPlayingChild(false);
            setSequentialActive(null);
          }}
          onError={() => {
            setIsPlayingChild(false);
            setSequentialActive(null);
          }}
        />
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-sky-300 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-300 flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-sky-600" />
              <span>मेरी आवाज़ सुनो (Sound Clarity)</span>
            </span>

            {/* Quick Auto-Advance Toggle Pill */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                if (autoAdvanceEnabled) clearAutoAdvance();
                setAutoAdvanceEnabled(!autoAdvanceEnabled);
              }}
              className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs ${
                autoAdvanceEnabled
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 ring-2 ring-emerald-300"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
              title="सही बोलने पर अपने आप अगला शब्द खोलें"
            >
              <Zap className={`w-3 h-3 ${autoAdvanceEnabled ? "fill-white" : ""}`} />
              <span>ऑटो-नेक्स्ट: {autoAdvanceEnabled ? "चालू" : "बंद"}</span>
            </button>
          </div>

          <span className="text-xs sm:text-sm font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            शब्द {currentIndex + 1} / {totalItems}
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center justify-center gap-2">
            <span>अपनी आवाज़ रिकॉर्ड करो और मिलाओ</span>
            <span>🎙️</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            अपनी आवाज़ रिकॉर्ड करके सही उच्चारण के साथ बारी-बारी सुनो!
          </p>
        </div>

        {/* Word Display Box */}
        <div className="my-4 py-6 px-4 rounded-3xl bg-gradient-to-b from-sky-50 to-blue-50/40 border-2 border-sky-200 text-center shadow-inner">
          <div className="text-5xl sm:text-6xl mb-2 animate-bounce-gentle">
            {item.emoji}
          </div>
          <div className="text-6xl sm:text-7xl font-black text-slate-900 font-hindi drop-shadow-sm">
            {targetWord}
          </div>
          <div className="text-slate-600 font-semibold text-sm sm:text-base mt-2">
            {item.romanization || item.transliteration} {item.englishMeaning && `— ${item.englishMeaning}`}
          </div>
        </div>

        {/* Success / Match Alert Banner */}
        {hasSucceeded && (
          <div className="my-4 p-4 rounded-3xl bg-emerald-50 border-3 border-emerald-400 shadow-md text-center animate-fade-in">
            <div className="text-xl sm:text-2xl font-black text-emerald-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>शाबाश! तुम्हारी आवाज़ बिल्कुल सही मिली! 🎉</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-1.5 flex items-center justify-center gap-1">
              <span>{autoAdvanceEnabled ? "अगला शब्द अपने आप खुल रहा है..." : "अगले शब्द पर जाने के लिए नीचे बटन दबाएं"}</span>
              <span className="animate-pulse">➡️</span>
            </p>
          </div>
        )}

        {/* Real-time Waveform & Voice Activity Visualizer */}
        <div className="my-5">
          <AudioWaveform
            bars={waveformBars}
            isActive={isRecording}
            voiceLevel={voiceLevel}
            label={isRecording ? `रिकॉर्डिंग चल रही है (${recordingDuration}s)` : "ध्वनि तरंगें (Waveform)"}
          />
        </div>

        {/* Recording Controls */}
        <div className="my-5">
          {!audioUrl && !isRecording && (
            <button
              type="button"
              onClick={handleStartRecording}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
            >
              <Mic className="w-6 h-6 animate-pulse" />
              <span>🎤 रिकॉर्डिंग शुरू करो</span>
            </button>
          )}

          {isRecording && (
            <button
              type="button"
              onClick={handleStopRecording}
              className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg flex items-center justify-center gap-3 shadow-lg ring-4 ring-red-200 animate-pulse active:scale-95 transition-transform"
            >
              <Square className="w-6 h-6 fill-white" />
              <span>⏹️ रिकॉर्डिंग बंद करो ({recordingDuration}s)</span>
            </button>
          )}
        </div>

        {/* Listen & Compare Section (After recording exists) */}
        {audioUrl && (
          <div className="space-y-4 my-6 p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 animate-fade-in">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
              🎧 दोनों आवाज़ें सुनो और अंतर समझो
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Play Reference */}
              <button
                type="button"
                onClick={handlePlayReference}
                disabled={isTtsSpeaking}
                className={`p-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-2 transition-all ${
                  sequentialActive === "reference" || isTtsSpeaking
                    ? "bg-sky-500 text-white border-sky-600 shadow-md scale-105 animate-pulse"
                    : "bg-white text-slate-800 border-sky-300 hover:bg-sky-50"
                }`}
              >
                <Volume2 className="w-5 h-5 text-sky-500" />
                <span>🔊 सही उच्चारण</span>
              </button>

              {/* Play Child Recording */}
              <button
                type="button"
                onClick={handlePlayChildAudio}
                disabled={isPlayingChild}
                className={`p-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-2 transition-all ${
                  sequentialActive === "child" || isPlayingChild
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 animate-pulse"
                    : "bg-white text-slate-800 border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                <Play className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                <span>▶️ तुम्हारी रिकॉर्डिंग</span>
              </button>
            </div>

            {/* Sequential "दोनों सुनो" Button */}
            <button
              type="button"
              onClick={handlePlaySequential}
              disabled={isTtsSpeaking || isPlayingChild}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Radio className="w-5 h-5" />
              <span>
                {sequentialActive === "reference"
                  ? "1/2 सही उच्चारण चल रहा है..."
                  : sequentialActive === "child"
                  ? "2/2 तुम्हारी आवाज़ चल रही है..."
                  : "🔁 दोनों बारी-बारी सुनो (सही ➔ तुम्हारी आवाज़)"}
              </span>
            </button>

            {/* Recognized Hindi Text */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">
                  पहचाना गया टेक्स्ट (Speech-to-Text)
                </span>
                <span className="text-lg font-black text-slate-800">
                  {transcript || result?.recognized || "रिकॉर्डिंग से जांच हो रही है..."}
                </span>
              </div>
              {result && (
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    result.isMatch
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {result.isMatch ? "✓ सही मिलान" : "पुनः अभ्यास"}
                </span>
              )}
            </div>

            {/* Re-record button */}
            <button
              type="button"
              onClick={handleClear}
              className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>नई रिकॉर्डिंग करो (Retry)</span>
            </button>
          </div>
        )}

        {/* Disclaimer / Accuracy Note */}
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>महत्वपूर्ण सूचना:</strong> आवाज़ की तरंगें (Waveform) केवल आपकी आवाज़ की तीव्रता और लय दिखाती हैं। सही उच्चारण का आकलन बच्चे और शिक्षक द्वारा दोनों ध्वनियों को सुनकर सबसे अच्छा किया जा सकता है।
          </p>
        </div>

        {/* Next / Previous Word Controls */}
        <div className="mt-6 pt-4 border-t-2 border-slate-100 flex items-center justify-between">
          {onPrev && currentIndex > 0 ? (
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              ← पिछला शब्द
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleManualNext}
            className={`px-6 py-3 rounded-2xl text-white font-black text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all ${
              hasSucceeded
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 ring-4 ring-emerald-200 animate-pulse scale-105"
                : "bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600"
            }`}
          >
            <span>अगला शब्द {hasSucceeded && "➡️"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

