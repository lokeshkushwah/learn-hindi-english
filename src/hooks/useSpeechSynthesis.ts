"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeechSynthesisOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [hasSupport, setHasSupport] = useState<boolean>(false);
  const [hindiVoiceFound, setHindiVoiceFound] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      setHasSupport(true);

      const updateVoices = () => {
        if (!synthRef.current) return;
        const voices = synthRef.current.getVoices();
        // Look for Hindi voice
        const hindiVoice =
          voices.find(
            (v) =>
              v.lang.toLowerCase().startsWith("hi") ||
              v.lang.toLowerCase() === "hi-in" ||
              v.name.toLowerCase().includes("hindi")
          ) ||
          voices.find((v) => v.lang.toLowerCase().includes("in")) ||
          null;

        if (hindiVoice) {
          voiceRef.current = hindiVoice;
          setHindiVoiceFound(true);
        } else if (voices.length > 0) {
          // Fallback to first available voice
          voiceRef.current = voices[0];
          setHindiVoiceFound(false);
        }
      };

      updateVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, options: SpeechSynthesisOptions = {}, onEnd?: () => void) => {
      if (!synthRef.current || !text) {
        if (onEnd) onEnd();
        return;
      }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";

      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
      }

      // Kid-friendly speech settings: slightly slower for crystal-clear articulation
      utterance.rate = options.rate ?? 0.82;
      utterance.pitch = options.pitch ?? 1.05;
      utterance.volume = options.volume ?? 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis error:", e);
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      synthRef.current.speak(utterance);
    },
    []
  );

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    hasSupport,
    hindiVoiceFound,
  };
}

