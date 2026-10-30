"use client";

import { useState, useEffect, useCallback } from 'react';
import { cleanTextForSpeech } from '@/lib/audioClean';

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  sampleWord?: string;
  phonicsMode?: boolean;
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [speakingLang, setSpeakingLang] = useState<'en' | 'hi' | null>(null);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedEnglishVoice, setSelectedEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [selectedHindiVoice, setSelectedHindiVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isHindiVoiceAvailable, setIsHindiVoiceAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);

      // Helper to ensure an English voice is never accidentally a Hindi voice
      const isHindiVoiceName = (name: string) => {
        const lower = name.toLowerCase();
        return (
          lower.includes('hindi') ||
          lower.includes('kalpana') ||
          lower.includes('heera') ||
          lower.includes('ravi') ||
          lower.includes('madhur') ||
          lower.includes('swara')
        );
      };

      // 1. Select genuine English voice (warm, authentic English teacher voice)
      const preferredEnglish =
        available.find(
          (v) =>
            (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
            !isHindiVoiceName(v.name) &&
            (v.name.includes('Natural') ||
              v.name.includes('Google US English') ||
              v.name.includes('Google UK English') ||
              v.name.includes('Samantha') ||
              v.name.includes('Jenny') ||
              v.name.includes('Victoria') ||
              v.name.includes('Zira') ||
              v.name.includes('David') ||
              v.name.includes('Mark') ||
              v.name.includes('George'))
        ) ||
        available.find(
          (v) => (v.lang === 'en-US' || v.lang === 'en-GB') && !isHindiVoiceName(v.name)
        ) ||
        available.find(
          (v) => v.lang.startsWith('en') && !isHindiVoiceName(v.name)
        ) ||
        null;

      setSelectedEnglishVoice(preferredEnglish);

      // 2. Select Hindi voice (hi-IN)
      const preferredHindi =
        available.find(
          (v) =>
            v.lang.startsWith('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.toLowerCase().includes('kalpana') ||
            v.name.toLowerCase().includes('madhur') ||
            v.name.toLowerCase().includes('swara')
        ) ||
        available.find((v) => v.lang === 'hi-IN' || v.lang === 'hi') ||
        null;

      setSelectedHindiVoice(preferredHindi);
      setIsHindiVoiceAvailable(Boolean(preferredHindi));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingText(null);
      setSpeakingLang(null);
      setSpeechNotice(null);
    }
  }, []);

  const speakEnglish = useCallback(
    (rawText: string, options?: SpeakOptions) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      // 1. Always cancel any previous speech to prevent overlapping voices
      window.speechSynthesis.cancel();
      setSpeechNotice(null);

      // 2. Sanitize and clean text for English speech
      const sanitizedText = cleanTextForSpeech(rawText, {
        lang: 'en',
        sampleWord: options?.sampleWord,
        phonicsMode: options?.phonicsMode,
      });

      if (!sanitizedText || sanitizedText.trim().length === 0) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(sanitizedText);
      if (selectedEnglishVoice) {
        utterance.voice = selectedEnglishVoice;
      }
      utterance.lang = 'en-US';
      utterance.rate = options?.rate ?? 0.82; // Slightly slower, clear rate for 6yo child
      utterance.pitch = options?.pitch ?? 1.1; // Warm, friendly teacher pitch

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(rawText);
        setSpeakingLang('en');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
        setSpeakingLang(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
        setSpeakingLang(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [selectedEnglishVoice]
  );

  const speakHindi = useCallback(
    (rawText: string, options?: SpeakOptions) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      // 1. Always cancel any previous speech to prevent overlapping voices
      window.speechSynthesis.cancel();

      // 2. Sanitize and clean text for Hindi speech
      const sanitizedText = cleanTextForSpeech(rawText, {
        lang: 'hi',
      });

      if (!sanitizedText || sanitizedText.trim().length === 0) {
        return;
      }

      if (!selectedHindiVoice && !isHindiVoiceAvailable) {
        setSpeechNotice('Hindi voice not detected on your browser. Please read the Hindi explanation on screen.');
      } else {
        setSpeechNotice(null);
      }

      const utterance = new SpeechSynthesisUtterance(sanitizedText);
      if (selectedHindiVoice) {
        utterance.voice = selectedHindiVoice;
      }
      utterance.lang = 'hi-IN';
      utterance.rate = options?.rate ?? 0.85; // Natural clear cadence
      utterance.pitch = options?.pitch ?? 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(rawText);
        setSpeakingLang('hi');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
        setSpeakingLang(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
        setSpeakingLang(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [selectedHindiVoice, isHindiVoiceAvailable]
  );

  return {
    speak: speakEnglish,
    speakEnglish,
    speakHindi,
    stop,
    isSpeaking,
    speakingText,
    speakingLang,
    isHindiVoiceAvailable,
    speechNotice,
    voices,
    selectedVoice: selectedEnglishVoice,
    selectedEnglishVoice,
    selectedHindiVoice,
  };
}
