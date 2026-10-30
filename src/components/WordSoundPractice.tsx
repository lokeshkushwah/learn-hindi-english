"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Volume2,
  Volume1,
  Play,
  Square,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Mic,
  HelpCircle,
  Zap,
  Image as ImageIcon,
  Layers,
  Radio,
  Info,
  Trophy,
  Check,
} from "lucide-react";
import { HindiItem, getQuizOptionsForWord } from "@/data/hindiContent";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { compareHindiSpeech, CompareResult } from "@/lib/comparison";
import { useKidSounds } from "@/hooks/useKidSounds";
import { useProgress } from "@/hooks/useProgress";
import { AudioWaveform } from "./AudioWaveform";
import { ConfettiCelebration } from "./ConfettiCelebration";

interface WordSoundPracticeProps {
  item: HindiItem;
  category: "two-letter" | "three-letter" | "four-letter";
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev?: () => void;
  speechRate?: number;
  autoAdvance?: boolean;
  onAttemptCompleted?: (item: HindiItem, isCorrect: boolean, retries: number) => void;
}

export function WordSoundPractice({
  item,
  category,
  currentIndex,
  totalItems,
  onNext,
  onPrev,
  speechRate = 0.82,
  autoAdvance = true,
  onAttemptCompleted,
}: WordSoundPracticeProps) {
  // Practice Modes: "reading" (Hear & Blend) | "quiz" (Listen & Choose Picture)
  const [activeTab, setActiveTab] = useState<"reading" | "quiz">("reading");

  // Visual Highlighting & Sound Blending States
  const [highlightedLetterIndex, setHighlightedLetterIndex] = useState<number | null>(null);
  const [blendStepIndex, setBlendStepIndex] = useState<number | null>(null);
  const [isBlendingActive, setIsBlendingActive] = useState<boolean>(false);
  const [showPictureCard, setShowPictureCard] = useState<boolean>(true);

  // Audio Playback States
  const [isPlayingChildAudio, setIsPlayingChildAudio] = useState<boolean>(false);
  const [sequentialActive, setSequentialActive] = useState<"reference" | "child" | null>(null);

  // Success & Auto-Advance States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);
  const [speechResult, setSpeechResult] = useState<CompareResult | null>(null);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState<boolean>(autoAdvance);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);

  // Quiz Mode States
  const [quizOptions, setQuizOptions] = useState<HindiItem[]>([]);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "incorrect" | null>(null);

  const childAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blendSequenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { speak, isSpeaking, stop: stopTts } = useSpeechSynthesis();
  const { playPopSound, playMicChime, playStarSound, playCorrectSound, playRetrySound } = useKidSounds();
  const { recordAttempt } = useProgress();

  const targetWord = item.devanagari || item.text;
  const letters = item.letters && item.letters.length > 0 ? item.letters : Array.from(targetWord);

  // Compute assembly steps for progressive sound blending
  const blendSteps =
    item.blendSteps && item.blendSteps.length > 0
      ? item.blendSteps
      : letters.map((_, i) => letters.slice(0, i + 1).join(""));

  const levelNumber = category === "two-letter" ? 1 : category === "three-letter" ? 2 : 3;
  const levelLabel =
    category === "two-letter"
      ? "Level 1: दो अक्षर वाले शब्द"
      : category === "three-letter"
      ? "Level 2: तीन अक्षर वाले शब्द"
      : "Level 3: चार अक्षर वाले शब्द";

  // Clear auto-advance timer
  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setCountdownSeconds(null);
  }, []);

  // Clear sound blending sequence timer
  const clearBlendSequence = useCallback(() => {
    if (blendSequenceTimerRef.current) {
      clearTimeout(blendSequenceTimerRef.current);
      blendSequenceTimerRef.current = null;
    }
    setIsBlendingActive(false);
    setBlendStepIndex(null);
    setHighlightedLetterIndex(null);
  }, []);

  // Trigger Success & Snap to Next
  const triggerSuccess = useCallback(
    (reason: string) => {
      if (hasSucceeded) return;
      setHasSucceeded(true);
      setShowConfetti(true);
      playCorrectSound();
      playStarSound();

      recordAttempt(item.id, targetWord, category, reason, true, 0);
      if (onAttemptCompleted) {
        onAttemptCompleted(item, true, 0);
      }

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
    [autoAdvanceEnabled, category, clearAutoAdvance, hasSucceeded, item, onAttemptCompleted, onNext, playCorrectSound, playPopSound, playStarSound, recordAttempt, targetWord]
  );

  // Speech-to-Text handler for recorded voice check
  const handleRecognizedSpeech = useCallback(
    (spokenText: string, alternatives?: string[]) => {
      if (hasSucceeded) return;
      const comp = compareHindiSpeech(targetWord, spokenText, {
        alternatives,
        transliteration: item.transliteration || item.romanization,
        expectedSpeech: item.expectedSpeech,
      });
      setSpeechResult(comp);
      if (comp.isMatch) {
        triggerSuccess("बोलकर मिलान सफल");
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
    onInterimResult: (text, alts) => {
      if (!text || hasSucceeded) return;
      const comp = compareHindiSpeech(targetWord, text, {
        alternatives: alts,
        transliteration: item.transliteration || item.romanization,
      });
      if (comp.isMatch) {
        triggerSuccess("बोलकर मिलान सफल");
      }
    },
    onFinalResult: handleRecognizedSpeech,
  });

  const {
    isRecording,
    recordingDuration,
    audioUrl,
    voiceLevel,
    waveformBars,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  // Reset state whenever the active word changes
  useEffect(() => {
    clearAutoAdvance();
    clearBlendSequence();
    stopTts();
    setHasSucceeded(false);
    setShowConfetti(false);
    setSpeechResult(null);
    setSelectedQuizAnswer(null);
    setQuizFeedback(null);
    clearRecording();
    resetTranscript();
    setSequentialActive(null);
    setIsPlayingChildAudio(false);

    // Prepare quiz distractors for the current word
    setQuizOptions(getQuizOptionsForWord(item));

    // Optional introductory pronunciation
    const timer = setTimeout(() => {
      speak(targetWord, { rate: speechRate });
    }, 400);

    return () => {
      clearTimeout(timer);
      clearAutoAdvance();
      clearBlendSequence();
      stopTts();
    };
  }, [item.id, clearAutoAdvance, clearBlendSequence, clearRecording, resetTranscript, speak, speechRate, stopTts, targetWord, item]);

  // 1. Control: सुनो (Listen to natural full word)
  const handleListenFull = () => {
    playPopSound();
    clearBlendSequence();
    stopTts();
    speak(targetWord, { rate: speechRate });
  };

  // 2. Control: धीरे सुनो (Listen Slowly for phonetic clarity)
  const handleListenSlow = () => {
    playPopSound();
    clearBlendSequence();
    stopTts();
    // 0.52 speech rate provides clear schwa and consonant articulation
    speak(targetWord, { rate: 0.52 });
  };

  // 3. Control: अक्षर सुनो (Hear individual letters sequentially with highlighting)
  const handleHearLettersSequentially = () => {
    playPopSound();
    clearBlendSequence();
    stopTts();
    setIsBlendingActive(true);

    let idx = 0;
    const playNextLetter = () => {
      if (idx >= letters.length) {
        setIsBlendingActive(false);
        setHighlightedLetterIndex(null);
        return;
      }

      setHighlightedLetterIndex(idx);
      const letterToSpeak = letters[idx];

      speak(letterToSpeak, { rate: 0.78 }, () => {
        idx += 1;
        blendSequenceTimerRef.current = setTimeout(playNextLetter, 500);
      });
    };

    playNextLetter();
  };

  // Click single letter directly to hear its sound
  const handlePlaySingleLetter = (idx: number, letterChar: string) => {
    playPopSound();
    clearBlendSequence();
    stopTts();
    setHighlightedLetterIndex(idx);
    speak(letterChar, { rate: 0.78 });
    setTimeout(() => setHighlightedLetterIndex(null), 900);
  };

  // 4. Control: जोड़कर पढ़ो (Progressive sound blending animation & auditory assembly)
  const handleBlendSounds = () => {
    playPopSound();
    clearBlendSequence();
    stopTts();
    setIsBlendingActive(true);

    let step = 0;
    const playNextStep = () => {
      if (step >= blendSteps.length) {
        // Finally speak the fully blended natural word!
        setBlendStepIndex(blendSteps.length - 1);
        speak(targetWord, { rate: speechRate }, () => {
          setIsBlendingActive(false);
        });
        return;
      }

      setBlendStepIndex(step);
      const currentSegment = blendSteps[step];

      speak(currentSegment, { rate: 0.75 }, () => {
        step += 1;
        blendSequenceTimerRef.current = setTimeout(playNextStep, 650);
      });
    };

    playNextStep();
  };

  // 5. Control: चित्र देखो (Toggle picture & meaning card)
  const handleTogglePicture = () => {
    playPopSound();
    setShowPictureCard((prev) => !prev);
  };

  // 6. Control: मेरी आवाज़ रिकॉर्ड करो
  const handleStartVoiceRecord = async () => {
    clearAutoAdvance();
    clearBlendSequence();
    stopTts();
    playPopSound();
    playMicChime(true);
    setSpeechResult(null);
    setHasSucceeded(false);
    resetTranscript();
    await startRecording();
    startStt();
  };

  const handleStopVoiceRecord = () => {
    playMicChime(false);
    stopRecording();
    stopStt();
  };

  // 7. Control: मेरी आवाज़ सुनो (Play child's recorded voice)
  const handlePlayChildVoice = () => {
    if (!audioUrl) return;
    playPopSound();
    stopTts();
    if (childAudioPlayerRef.current) {
      childAudioPlayerRef.current.currentTime = 0;
      childAudioPlayerRef.current.play();
      setIsPlayingChildAudio(true);
    }
  };

  // Sequential comparison: Reference ➔ Child's Recording
  const handleSequentialCompare = () => {
    if (!audioUrl) return;
    playPopSound();
    stopTts();
    setSequentialActive("reference");

    speak(targetWord, { rate: speechRate }, () => {
      setTimeout(() => {
        setSequentialActive("child");
        if (childAudioPlayerRef.current) {
          childAudioPlayerRef.current.currentTime = 0;
          childAudioPlayerRef.current.play();
          setIsPlayingChildAudio(true);
        }
      }, 550);
    });
  };

  // 8. Control: फिर से कोशिश करो
  const handleRetry = () => {
    clearAutoAdvance();
    clearBlendSequence();
    stopTts();
    playPopSound();
    setHasSucceeded(false);
    setSpeechResult(null);
    setSelectedQuizAnswer(null);
    setQuizFeedback(null);
    clearRecording();
    resetTranscript();
  };

  // 9. Control: अगला शब्द
  const handleManualNext = () => {
    clearAutoAdvance();
    clearBlendSequence();
    stopTts();
    playPopSound();
    onNext();
  };

  // 10. Quiz Option Selection
  const handleSelectQuizOption = (chosen: HindiItem) => {
    playPopSound();
    setSelectedQuizAnswer(chosen.id);

    if (chosen.id === item.id) {
      setQuizFeedback("correct");
      triggerSuccess("क्विज़ में सही शब्द चुना");
    } else {
      setQuizFeedback("incorrect");
      playRetrySound();
      speak(`यह ${chosen.devanagari || chosen.text} है। ${targetWord} को दोबारा सुनो!`, { rate: 0.85 });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <ConfettiCelebration trigger={showConfetti} />

      {/* Hidden audio element for recorded voice playback */}
      {audioUrl && (
        <audio
          ref={childAudioPlayerRef}
          src={audioUrl}
          onEnded={() => {
            setIsPlayingChildAudio(false);
            setSequentialActive(null);
          }}
          onError={() => {
            setIsPlayingChildAudio(false);
            setSequentialActive(null);
          }}
        />
      )}

      {/* Main Practice Card Container */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-8 shadow-xl border-4 border-amber-300 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-100/60 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-orange-100/40 rounded-full pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-xs flex items-center gap-1.5">
              <span>{item.emoji}</span>
              <span>{levelLabel}</span>
            </span>

            {/* Quick Auto-Advance Toggle */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                if (autoAdvanceEnabled) clearAutoAdvance();
                setAutoAdvanceEnabled(!autoAdvanceEnabled);
              }}
              className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                autoAdvanceEnabled
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 ring-2 ring-emerald-300"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
              title="सही होने पर अपने आप अगला शब्द खोलें"
            >
              <Zap className={`w-3.5 h-3.5 ${autoAdvanceEnabled ? "fill-white" : ""}`} />
              <span>ऑटो-नेक्स्ट: {autoAdvanceEnabled ? "चालू" : "बंद"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Tabs Switcher: "पढ़ना सीखो" vs "सुनो और चुनो क्विज़" */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveTab("reading");
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "reading"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📖 पढ़ना सीखो
              </button>
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveTab("quiz");
                  speak(targetWord, { rate: speechRate });
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === "quiz"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-purple-700"
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>सुनो और चुनो</span>
              </button>
            </div>

            <span className="text-xs sm:text-sm font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {currentIndex + 1} / {totalItems}
            </span>
          </div>
        </div>

        {/* Success / Match Celebration Banner */}
        {hasSucceeded && (
          <div className="my-4 p-4 rounded-3xl bg-emerald-50 border-3 border-emerald-400 shadow-md text-center animate-fade-in relative z-10">
            <div className="text-xl sm:text-2xl font-black text-emerald-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>शाबाश! तुमने बिल्कुल सही सीखा! 🎉</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-1.5 flex items-center justify-center gap-1">
              <span>{autoAdvanceEnabled ? "अगला शब्द अपने आप आ रहा है..." : "अगले शब्द पर जाने के लिए नीचे 'अगला शब्द' दबाएं"}</span>
              <span className="animate-pulse">➡️</span>
            </p>
          </div>
        )}

        {/* 1. Large Word & Interactive Letter Box */}
        <div className="my-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-50/70 to-orange-50/40 border-2 border-amber-200 text-center shadow-inner relative z-10">
          {/* Main Large Hindi Word */}
          <div className="text-6xl sm:text-8xl font-black text-slate-900 font-hindi drop-shadow-sm mb-2 tracking-wide">
            {targetWord}
          </div>

          <div className="text-base sm:text-lg font-bold text-slate-600">
            {item.romanization || item.transliteration}{" "}
            {item.englishMeaning && <span className="text-slate-400">({item.englishMeaning})</span>}
          </div>

          {/* Interactive Constituent Letter Cards */}
          <div className="mt-5 pt-4 border-t border-amber-200/80">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>अक्षरों की पहचान (प्रत्येक अक्षर पर क्लिक करके सुनें)</span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {letters.map((char, idx) => {
                const isLetterHighlighted = highlightedLetterIndex === idx;
                return (
                  <button
                    key={`${char}-${idx}`}
                    type="button"
                    onClick={() => handlePlaySingleLetter(idx, char)}
                    className={`min-w-[54px] sm:min-w-[64px] h-14 sm:h-16 rounded-2xl font-black text-2xl sm:text-3xl font-hindi transition-all border-2 flex items-center justify-center shadow-xs active:scale-95 ${
                      isLetterHighlighted
                        ? "bg-amber-400 border-amber-600 text-slate-900 scale-110 shadow-md ring-4 ring-amber-200"
                        : "bg-white text-slate-800 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                    }`}
                    title={`अक्षर '${char}' की ध्वनि सुनें`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progressive Sound Blending Visualizer */}
          {blendStepIndex !== null && (
            <div className="mt-4 p-3 bg-white/90 rounded-2xl border-2 border-amber-400 shadow-sm animate-fade-in inline-flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900">जोड़ने का क्रम:</span>
              <span className="font-hindi text-xl font-black text-orange-600">
                {blendSteps.slice(0, blendStepIndex + 1).join(" ➔ ")}
              </span>
            </div>
          )}
        </div>

        {/* 2. TAB A: READING CONTROLS & VOICE RECORDING */}
        {activeTab === "reading" && (
          <div className="space-y-6 relative z-10 animate-fade-in">
            {/* Primary Sound Controls Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {/* 1. सुनो (Listen) */}
              <button
                type="button"
                onClick={handleListenFull}
                className="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Volume2 className="w-5 h-5" />
                <span>🔊 सुनो (Listen)</span>
              </button>

              {/* 2. धीरे सुनो (Listen Slowly) */}
              <button
                type="button"
                onClick={handleListenSlow}
                className="py-3 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Volume1 className="w-5 h-5 text-amber-700" />
                <span>🐢 धीरे सुनो</span>
              </button>

              {/* 3. अक्षर सुनो (Hear Letters) */}
              <button
                type="button"
                onClick={handleHearLettersSequentially}
                className="py-3 px-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 border-2 border-sky-300 font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Layers className="w-5 h-5 text-sky-700" />
                <span>🔤 अक्षर सुनो</span>
              </button>

              {/* 4. जोड़कर पढ़ो (Blend Sounds) */}
              <button
                type="button"
                onClick={handleBlendSounds}
                className="py-3 px-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 border-2 border-purple-300 font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Sparkles className="w-5 h-5 text-purple-700" />
                <span>🧩 जोड़कर पढ़ो</span>
              </button>
            </div>

            {/* Picture & Meaning Accordion / Toggle Card */}
            {showPictureCard && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50/50 border-2 border-sky-200 flex flex-col sm:flex-row items-center gap-4 animate-fade-in shadow-xs">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-sky-300 flex items-center justify-center text-5xl shadow-sm shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-0.5">
                    चित्र व अर्थ (Picture & Meaning)
                  </div>
                  <div className="text-xl font-black text-slate-800 font-hindi">
                    {targetWord} — {item.englishMeaning || item.meaning}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    💡 {item.soundTipHindi || `${letters.join(" + ")} = ${targetWord}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTogglePicture}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1"
                >
                  छिपाएं
                </button>
              </div>
            )}

            {!showPictureCard && (
              <button
                type="button"
                onClick={handleTogglePicture}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200"
              >
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <span>🖼️ चित्र और अर्थ देखें</span>
              </button>
            )}

            {/* Voice Recording Waveform Visualizer */}
            <div className="my-4">
              <AudioWaveform
                bars={waveformBars}
                isActive={isRecording}
                voiceLevel={voiceLevel}
                label={isRecording ? `आवाज़ रिकॉर्ड हो रही है (${recordingDuration}s) — अब बोलो!` : "ध्वनि तरंगें (Voice Waveform)"}
              />
            </div>

            {/* Voice Recording Controls */}
            <div className="space-y-3">
              {!isRecording && (
                <button
                  type="button"
                  onClick={handleStartVoiceRecord}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-transform"
                >
                  <Mic className="w-5 h-5 animate-pulse" />
                  <span>🎙️ मेरी आवाज़ रिकॉर्ड करो</span>
                </button>
              )}

              {isRecording && (
                <button
                  type="button"
                  onClick={handleStopVoiceRecord}
                  className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-md ring-4 ring-red-200 animate-pulse active:scale-95 transition-transform"
                >
                  <Square className="w-5 h-5 fill-white" />
                  <span>⏹️ रिकॉर्डिंग बंद करो ({recordingDuration}s)</span>
                </button>
              )}

              {/* Recorded Voice Playback Options (After recording exists) */}
              {audioUrl && (
                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Play Child Audio */}
                    <button
                      type="button"
                      onClick={handlePlayChildVoice}
                      disabled={isPlayingChildAudio}
                      className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all ${
                        isPlayingChildAudio || sequentialActive === "child"
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-sm animate-pulse"
                          : "bg-white text-slate-800 border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                      <span>▶️ मेरी आवाज़ सुनो</span>
                    </button>

                    {/* Both In Sequence (Compare) */}
                    <button
                      type="button"
                      onClick={handleSequentialCompare}
                      className="p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border-2 bg-white text-slate-800 border-purple-300 hover:bg-purple-50 transition-all"
                    >
                      <Radio className="w-4 h-4 text-purple-600" />
                      <span>🔁 दोनों बारी-बारी सुनो</span>
                    </button>
                  </div>

                  {/* Speech Recognition Comparison Match Box */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block font-bold">माइक ने सुना:</span>
                      <span className="text-base font-black text-slate-800 font-hindi">
                        {transcript || speechResult?.recognized || "जांच हो रही है..."}
                      </span>
                    </div>

                    {speechResult && (
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-xs ${
                          speechResult.isMatch
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {speechResult.isMatch ? "✓ सही मिलान" : "पुनः अभ्यास"}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. TAB B: LISTENING QUIZ & SIMILAR SOUNDS */}
        {activeTab === "quiz" && (
          <div className="space-y-6 relative z-10 animate-fade-in">
            <div className="text-center p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block mb-1">
                🎯 सुनो और सही चित्र व शब्द चुनो (Listening Quiz)
              </span>
              <p className="text-xs text-slate-600 mb-3">
                आवाज़ को ध्यान से सुनो और नीचे दिए गए 4 विकल्पों में से सही शब्द पर क्लिक करो!
              </p>

              <button
                type="button"
                onClick={handleListenFull}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 आवाज़ फिर से सुनो</span>
              </button>
            </div>

            {/* 4 Quiz Options Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {quizOptions.map((opt) => {
                const isSelected = selectedQuizAnswer === opt.id;
                const isCorrectAnswer = opt.id === item.id;
                const isWrongSelection = isSelected && !isCorrectAnswer;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectQuizOption(opt)}
                    className={`p-4 sm:p-5 rounded-2xl border-3 text-center transition-all flex flex-col items-center justify-center gap-2 shadow-sm select-none active:scale-95 ${
                      isSelected && isCorrectAnswer
                        ? "bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-4 ring-emerald-200"
                        : isWrongSelection
                        ? "bg-rose-50 border-rose-400 text-rose-900"
                        : "bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50"
                    }`}
                  >
                    <div className="text-4xl sm:text-5xl">{opt.emoji}</div>
                    <div className="text-2xl sm:text-3xl font-black font-hindi">
                      {opt.devanagari || opt.text}
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">
                      {opt.englishMeaning || opt.meaning}
                    </div>

                    {isSelected && isCorrectAnswer && (
                      <span className="text-xs font-black text-emerald-700 flex items-center gap-1 mt-1">
                        <Check className="w-4 h-4" />
                        <span>शाबाश! सही उत्तर!</span>
                      </span>
                    )}

                    {isWrongSelection && (
                      <span className="text-xs font-black text-rose-600 flex items-center gap-1 mt-1">
                        <XCircle className="w-4 h-4" />
                        <span>गलत, दोबारा सुनो</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Bottom Controls: फिर से कोशिश करो & अगला शब्द */}
        <div className="mt-8 pt-5 border-t-2 border-slate-100 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            {onPrev && currentIndex > 0 && (
              <button
                type="button"
                onClick={onPrev}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              >
                ← पिछला शब्द
              </button>
            )}

            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>फिर से कोशिश करो</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleManualNext}
            className={`px-6 py-3 rounded-2xl text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-md active:scale-95 transition-all ${
              hasSucceeded
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 ring-4 ring-emerald-200 animate-pulse scale-105"
                : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
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
