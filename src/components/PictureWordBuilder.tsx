"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  Volume1,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Delete,
  Trophy,
  Zap,
  Star,
  Check,
  Undo2,
  HelpCircle,
  Layers,
  Heart,
} from "lucide-react";
import { HindiItem } from "@/data/types";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useKidSounds } from "@/hooks/useKidSounds";
import { useProgress } from "@/hooks/useProgress";
import {
  getWordLetterSequence,
  generateWordBuilderOptions,
  SWAR_OPTIONS,
  VYANJAN_OPTIONS,
  MATRA_OPTIONS,
  combineBaseAndMatra,
  splitGraphemeIntoBaseAndMatra,
  isMatraSign,
} from "@/lib/wordBuilderUtils";
import { ConfettiCelebration } from "./ConfettiCelebration";

interface PictureWordBuilderProps {
  item: HindiItem;
  category: string;
  currentIndex: number;
  totalItems: number;
  levelNumber?: number;
  levelTitle?: string;
  onNext: () => void;
  onPrev?: () => void;
  speechRate?: number;
  autoAdvance?: boolean;
  onAttemptCompleted?: (item: HindiItem, isCorrect: boolean, attempts: number) => void;
}

type LetterSelectionTab = "quick" | "vyanjan" | "swar" | "matras";

export function PictureWordBuilder({
  item,
  category,
  currentIndex,
  totalItems,
  levelNumber = 1,
  levelTitle = "शब्द बनाओ",
  onNext,
  onPrev,
  speechRate = 0.82,
  autoAdvance = true,
  onAttemptCompleted,
}: PictureWordBuilderProps) {
  const targetWord = (item.devanagari || item.text || "").trim();
  const letterSequence = getWordLetterSequence(item);
  const slotsCount = letterSequence.length;

  // Selected letters in each slot
  const [slots, setSlots] = useState<string[]>(() => Array(slotsCount).fill(""));
  const [slotOptionIndices, setSlotOptionIndices] = useState<(number | null)[]>(() =>
    Array(slotsCount).fill(null)
  );
  const [activeSlotIdx, setActiveSlotIdx] = useState<number>(0);

  // Available multiple-choice options (Quick Choices)
  const [options, setOptions] = useState<string[]>([]);
  const [usedOptionIndices, setUsedOptionIndices] = useState<number[]>([]);

  // Active keyboard tab
  const [activeTab, setActiveTab] = useState<LetterSelectionTab>("quick");

  // Interaction & Validation states
  const [attempts, setAttempts] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState<boolean>(autoAdvance);
  const [hintActive, setHintActive] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { speak, stop: stopTts } = useSpeechSynthesis();
  const { playPopSound, playCorrectSound, playRetrySound, playStarSound } = useKidSounds();
  const { recordAttempt } = useProgress();

  // Clear auto-advance timer
  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

  // Initialize or reset state when word item changes
  useEffect(() => {
    clearAutoAdvance();
    stopTts();
    setSlots(Array(letterSequence.length).fill(""));
    setSlotOptionIndices(Array(letterSequence.length).fill(null));
    setActiveSlotIdx(0);
    setAttempts(0);
    setIsCorrect(null);
    setShowConfetti(false);
    setHintActive(false);
    setImageError(false);

    // Generate options: 3 to 6 choices including correct letters and smart distractors
    const generated = generateWordBuilderOptions(item, Math.max(4, letterSequence.length + 2));
    setOptions(generated);
    setUsedOptionIndices([]);

    // Default to quick choices tab
    setActiveTab("quick");

    // Optional subtle introductory pronunciation
    const timer = setTimeout(() => {
      speak(targetWord, { rate: speechRate });
    }, 450);

    return () => {
      clearTimeout(timer);
      clearAutoAdvance();
      stopTts();
    };
  }, [item.id, clearAutoAdvance, letterSequence.length, speak, speechRate, stopTts, targetWord, item]);

  // Handle word completion validation
  const validateWord = useCallback(
    (currentSlots: string[]) => {
      const builtWord = currentSlots.join("");
      const isMatch = builtWord === targetWord;

      if (isMatch) {
        setIsCorrect(true);
        setShowConfetti(true);
        playCorrectSound();
        playStarSound();

        // Speak congratulatory feedback & full word
        speak(`बहुत बढ़िया! ${targetWord}`, { rate: speechRate });

        // Record progress
        recordAttempt(
          item.id,
          targetWord,
          item.category,
          "picture-word-builder",
          true,
          attempts
        );

        if (onAttemptCompleted) {
          onAttemptCompleted(item, true, attempts);
        }

        // Auto-advance if enabled
        if (autoAdvanceEnabled) {
          clearAutoAdvance();
          autoAdvanceTimerRef.current = setTimeout(() => {
            clearAutoAdvance();
            playPopSound();
            onNext();
          }, 1800);
        }
      } else {
        setIsCorrect(false);
        setAttempts((prev) => prev + 1);
        playRetrySound();

        // Gentle reminder without revealing the answer immediately
        speak("लगभग पहुँच गए! एक बार फिर सोचो और सही क्रम में अक्षर चुनो।", { rate: 0.85 });

        if (onAttemptCompleted) {
          onAttemptCompleted(item, false, attempts + 1);
        }
      }
    },
    [attempts, autoAdvanceEnabled, clearAutoAdvance, item, onAttemptCompleted, onNext, playCorrectSound, playPopSound, playRetrySound, playStarSound, recordAttempt, speechRate, speak, targetWord]
  );

  // 1. Insert a letter into the currently active slot
  const handleSelectLetter = (letterChar: string, optionIndex?: number) => {
    if (isCorrect) return; // Already solved

    playPopSound();
    speak(letterChar, { rate: 0.75 });

    // Update slots
    const newSlots = [...slots];
    newSlots[activeSlotIdx] = letterChar;
    setSlots(newSlots);

    // Track which option index was placed into this slot
    const newSlotOptions = [...slotOptionIndices];
    const prevOptionIdx = newSlotOptions[activeSlotIdx];
    if (prevOptionIdx !== null && prevOptionIdx !== undefined && prevOptionIdx !== optionIndex) {
      setUsedOptionIndices((prev) => prev.filter((i) => i !== prevOptionIdx));
    }
    newSlotOptions[activeSlotIdx] = optionIndex ?? null;
    setSlotOptionIndices(newSlotOptions);

    // Track used option if clicked from Quick Choices
    if (optionIndex !== undefined && !usedOptionIndices.includes(optionIndex)) {
      setUsedOptionIndices((prev) => [...prev, optionIndex]);
    }

    // Find next empty slot
    const nextEmptyIdx = newSlots.findIndex((s, idx) => idx > activeSlotIdx && !s);
    if (nextEmptyIdx !== -1) {
      setActiveSlotIdx(nextEmptyIdx);
    } else {
      // Check if all slots are now filled
      const allFilled = newSlots.every((s) => Boolean(s));
      if (allFilled) {
        validateWord(newSlots);
      } else {
        // Move to the first empty slot anywhere
        const firstEmpty = newSlots.findIndex((s) => !s);
        if (firstEmpty !== -1) setActiveSlotIdx(firstEmpty);
      }
    }
  };

  // 2. Attach a matra to the letter in the current active slot (or previous slot)
  const handleAttachMatra = (matraSign: string) => {
    if (isCorrect) return;

    playPopSound();

    // Determine target slot: either current active slot (if filled) or previous slot
    let targetIdx = activeSlotIdx;
    if (!slots[targetIdx] && targetIdx > 0 && slots[targetIdx - 1]) {
      targetIdx = targetIdx - 1;
    }

    const currentSlotChar = slots[targetIdx];
    if (!currentSlotChar) {
      // If empty, cannot attach a matra standalone
      speak("पहले कोई व्यंजन अक्षर चुनें, फिर मात्रा लगाएं।", { rate: 0.85 });
      return;
    }

    const combined = combineBaseAndMatra(currentSlotChar, matraSign);
    speak(combined, { rate: 0.75 });

    const newSlots = [...slots];
    newSlots[targetIdx] = combined;
    setSlots(newSlots);

    // If all slots are filled, re-validate
    if (newSlots.every((s) => Boolean(s))) {
      validateWord(newSlots);
    }
  };

  // 3. Clear or change a specific slot by clicking on it
  const handleSlotClick = (idx: number) => {
    playPopSound();
    setActiveSlotIdx(idx);

    // If slot has a letter, clear it so child can replace it
    if (slots[idx]) {
      const newSlots = [...slots];
      newSlots[idx] = "";
      setSlots(newSlots);
      setIsCorrect(null);

      // Free the exact option index that was used for this slot
      const usedOpt = slotOptionIndices[idx];
      if (usedOpt !== null && usedOpt !== undefined) {
        setUsedOptionIndices((prev) => prev.filter((i) => i !== usedOpt));
        const newSlotOptions = [...slotOptionIndices];
        newSlotOptions[idx] = null;
        setSlotOptionIndices(newSlotOptions);
      }
    }
  };

  // 4. Backspace: remove last filled letter
  const handleBackspace = () => {
    playPopSound();
    setIsCorrect(null);

    // Find the rightmost filled slot
    let lastFilledIdx = -1;
    for (let i = slots.length - 1; i >= 0; i--) {
      if (slots[i]) {
        lastFilledIdx = i;
        break;
      }
    }

    if (lastFilledIdx !== -1) {
      const newSlots = [...slots];
      newSlots[lastFilledIdx] = "";
      setSlots(newSlots);
      setActiveSlotIdx(lastFilledIdx);

      const usedOpt = slotOptionIndices[lastFilledIdx];
      if (usedOpt !== null && usedOpt !== undefined) {
        setUsedOptionIndices((prev) => prev.filter((i) => i !== usedOpt));
        const newSlotOptions = [...slotOptionIndices];
        newSlotOptions[lastFilledIdx] = null;
        setSlotOptionIndices(newSlotOptions);
      }
    }
  };

  // 5. Reset all slots (फिर से कोशिश करो)
  const handleResetSlots = () => {
    playPopSound();
    clearAutoAdvance();
    stopTts();
    setSlots(Array(letterSequence.length).fill(""));
    setSlotOptionIndices(Array(letterSequence.length).fill(null));
    setActiveSlotIdx(0);
    setIsCorrect(null);
    setUsedOptionIndices([]);
  };

  // 6. Sound Replay
  const handleListenWord = (slow = false) => {
    playPopSound();
    stopTts();
    speak(targetWord, { rate: slow ? 0.52 : speechRate });
  };

  // 7. Hint Button: speaks the expected letter for active slot
  const handleProvideHint = () => {
    playPopSound();
    setHintActive(true);
    const expected = letterSequence[activeSlotIdx] || letterSequence[0];
    speak(`यहाँ अक्षर '${expected}' आएगा।`, { rate: 0.8 });
    setTimeout(() => setHintActive(false), 2500);
  };

  // 8. Manual Next
  const handleManualNext = () => {
    clearAutoAdvance();
    stopTts();
    playPopSound();
    onNext();
  };

  // Check if word contains matras to highlight matra learning
  const wordHasMatras = letterSequence.some((l) => isMatraSign(l) || l.length > 1);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <ConfettiCelebration trigger={showConfetti} />

      {/* Main Builder Card Container */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-8 shadow-xl border-4 border-amber-300 relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-100/60 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-orange-100/40 rounded-full pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white shadow-xs flex items-center gap-1.5">
              <span>{item.emoji}</span>
              <span>
                {levelTitle} ({levelNumber})
              </span>
            </span>

            {/* Auto-Advance Toggle */}
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
            <span className="text-xs sm:text-sm font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              शब्द {currentIndex + 1} / {totalItems}
            </span>
          </div>
        </div>

        {/* Success Banner */}
        {isCorrect === true && (
          <div className="my-4 p-4 rounded-3xl bg-emerald-50 border-3 border-emerald-400 shadow-md text-center animate-fade-in relative z-10">
            <div className="text-xl sm:text-2xl font-black text-emerald-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              <span>बहुत बढ़िया! आपने सही शब्द बनाया! 🎉</span>
            </div>

            {/* Word Assembly Formula: क + म + ल = कमल */}
            <div className="mt-2 text-lg sm:text-2xl font-black text-emerald-950 font-hindi bg-white/80 py-2 px-4 rounded-2xl border border-emerald-200 inline-block shadow-xs">
              {letterSequence.join(" + ")} = <span className="text-orange-600 font-extrabold">{targetWord}</span>
            </div>

            <p className="text-xs text-emerald-700 font-bold mt-2">
              {autoAdvanceEnabled ? "अगला शब्द अपने आप आ रहा है..." : "नीचे 'अगला शब्द' दबाएं ➡️"}
            </p>
          </div>
        )}

        {/* Incorrect Hint Alert */}
        {isCorrect === false && (
          <div className="my-4 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center animate-fade-in relative z-10 flex flex-col items-center gap-1">
            <div className="text-sm font-black text-amber-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>लगभग पहुँच गए! एक बार फिर सोचो और सही क्रम में अक्षर चुनो। 💡</span>
            </div>
            <p className="text-xs text-amber-700">
              किसी अक्षर को बदलने के लिए उस पर क्लिक करें, या नीचे 'फिर से कोशिश करो' दबाएं।
            </p>
          </div>
        )}

        {/* 1. Picture & Replay Card */}
        <div className="my-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-amber-50/70 to-orange-50/40 border-2 border-amber-200 text-center shadow-inner relative z-10 flex flex-col items-center">
          {/* Main Picture Display */}
          <div className="relative mb-3">
            {item.imagePath && !imageError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imagePath}
                alt={targetWord}
                onError={() => setImageError(true)}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-3xl bg-white p-3 border-3 border-amber-300 shadow-md transition-transform hover:scale-105"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white border-3 border-amber-300 flex items-center justify-center text-7xl sm:text-8xl shadow-md select-none transition-transform hover:scale-105">
                {item.emoji}
              </div>
            )}
          </div>

          {/* Meaning / English Hint */}
          <div className="text-base sm:text-lg font-bold text-slate-600 mb-3">
            {item.englishMeaning || item.meaning}{" "}
            {item.romanization && <span className="text-slate-400">({item.romanization})</span>}
          </div>

          {/* Audio Replay Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleListenWord(false)}
              className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              title="पूरा शब्द सुनें"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 शब्द सुनो</span>
            </button>

            <button
              type="button"
              onClick={() => handleListenWord(true)}
              className="px-3.5 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 transition-all"
              title="धीमी गति में स्पष्ट सुनें"
            >
              <Volume1 className="w-4 h-4 text-amber-700" />
              <span>🐢 धीरे सुनो</span>
            </button>

            <button
              type="button"
              onClick={handleProvideHint}
              className={`px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1 transition-all border ${
                hintActive
                  ? "bg-amber-300 text-slate-900 border-amber-400"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
              title="अक्षर का संकेत लें"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>संकेत</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Letter Slots (The Canvas) */}
        <div className="my-6 relative z-10">
          <div className="text-center text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
            नीचे दिए गए अक्षरों से शब्द पूरा करें:
          </div>

          <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
            {slots.map((char, idx) => {
              const isActiveSlot = idx === activeSlotIdx && !isCorrect;
              const isFilled = Boolean(char);

              return (
                <button
                  key={`slot-${idx}`}
                  type="button"
                  onClick={() => handleSlotClick(idx)}
                  className={`min-w-[64px] sm:min-w-[80px] h-18 sm:h-22 rounded-3xl font-black text-3xl sm:text-4xl font-hindi transition-all border-3 flex flex-col items-center justify-center relative shadow-sm select-none active:scale-95 ${
                    isFilled
                      ? isCorrect === true
                        ? "bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md ring-4 ring-emerald-200"
                        : isCorrect === false
                        ? "bg-rose-50 border-rose-400 text-rose-900 animate-shake"
                        : "bg-white border-amber-400 text-slate-900 hover:border-amber-500 hover:bg-amber-50"
                      : isActiveSlot
                      ? "bg-amber-50 border-amber-500 border-dashed text-slate-400 ring-4 ring-amber-200/80 animate-pulse scale-105"
                      : "bg-slate-50 border-slate-300 border-dashed text-slate-300 hover:border-slate-400"
                  }`}
                  title={isFilled ? `बदलने या हटाने के लिए क्लिक करें: '${char}'` : `अक्षर स्लॉट #${idx + 1}`}
                >
                  {isFilled ? (
                    <>
                      <span>{char}</span>
                      <span className="text-[10px] text-slate-400 font-sans font-bold -mt-1 opacity-70">
                        × हटाएं
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-sans text-slate-300 font-normal">_</span>
                  )}

                  {/* Slot Number Badge */}
                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center border border-white">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slot Tools (Backspace & Clear All) */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleBackspace}
              disabled={slots.every((s) => !s) || isCorrect === true}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:pointer-events-none font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Undo2 className="w-3.5 h-3.5 text-slate-500" />
              <span>⌫ पिछला मिटाएं</span>
            </button>

            <button
              type="button"
              onClick={handleResetSlots}
              disabled={slots.every((s) => !s) || isCorrect === true}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:pointer-events-none font-bold text-xs flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>🔄 सब साफ़ करें</span>
            </button>
          </div>
        </div>

        {/* 3. Selection Keypad & Tabs (Swar, Vyanjan, Matras) */}
        <div className="my-6 p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 relative z-10">
          {/* Group Switcher Tabs */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 mb-3 flex-wrap border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              {/* Tab 1: Quick Choices (3-6 options) */}
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveTab("quick");
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1 ${
                  activeTab === "quick"
                    ? "bg-amber-400 text-slate-900 shadow-sm"
                    : "bg-white text-slate-600 hover:bg-amber-50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🌟 सुझाए गए अक्षर ({options.length})</span>
              </button>

              {/* Tab 2: Vyanjan (Consonants) */}
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveTab("vyanjan");
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  activeTab === "vyanjan"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                🔤 व्यंजन (क-ह)
              </button>

              {/* Tab 3: Swar (Vowels) */}
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveTab("swar");
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  activeTab === "swar"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                🔤 स्वर (अ-अः)
              </button>

              {/* Tab 4: Matras (Vowel Signs) */}
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveTab("matras");
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
                  activeTab === "matras"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-white text-purple-700 hover:bg-purple-50"
                }`}
              >
                <span>🎋 मात्राएँ (ा, ि, ी...)</span>
                {wordHasMatras && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
            </div>
          </div>

          {/* TAB 1: QUICK CHOICES (Multiple Choice 3-6 Tiles) */}
          {activeTab === "quick" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap py-2">
                {options.map((opt, idx) => {
                  const isUsed = usedOptionIndices.includes(idx);
                  return (
                    <button
                      key={`opt-${opt}-${idx}`}
                      type="button"
                      onClick={() => handleSelectLetter(opt, idx)}
                      disabled={isCorrect === true}
                      className={`min-w-[62px] sm:min-w-[74px] h-16 sm:h-18 rounded-2xl font-black text-2xl sm:text-3xl font-hindi border-2 shadow-sm transition-all active:scale-95 flex items-center justify-center ${
                        isUsed
                          ? "bg-slate-100 text-slate-400 border-slate-200 opacity-60"
                          : "bg-white text-slate-900 border-amber-300 hover:border-amber-500 hover:bg-amber-50 hover:scale-105"
                      }`}
                      title={`अक्षर '${opt}' जोड़ें`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {wordHasMatras && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("matras");
                    }}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 underline inline-flex items-center gap-1"
                  >
                    <span>💡 मात्रा जोड़कर बनाना चाहते हैं? यहाँ मात्राएँ चुनें ➔</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VYANJAN GRID (Consonants) */}
          {activeTab === "vyanjan" && (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 font-semibold mb-1">
                व्यंजन चुनें (Consonants) — किसी भी अक्षर पर क्लिक करें:
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-11 gap-1.5 sm:gap-2 max-h-56 overflow-y-auto p-1">
                {VYANJAN_OPTIONS.map((v) => (
                  <button
                    key={`vyanjan-${v}`}
                    type="button"
                    onClick={() => handleSelectLetter(v)}
                    disabled={isCorrect === true}
                    className="h-12 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-800 font-hindi font-black text-xl flex items-center justify-center shadow-xs active:scale-95 transition"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SWAR GRID (Vowels) */}
          {activeTab === "swar" && (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 font-semibold mb-1">
                स्वर चुनें (Vowels) — शब्द के प्रारंभ में आने वाले स्वर:
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-1">
                {SWAR_OPTIONS.map((sw) => (
                  <button
                    key={`swar-${sw}`}
                    type="button"
                    onClick={() => handleSelectLetter(sw)}
                    disabled={isCorrect === true}
                    className="h-12 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-800 font-hindi font-black text-xl flex items-center justify-center shadow-xs active:scale-95 transition"
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MATRAS (Vowel Signs & Combining Marks) */}
          {activeTab === "matras" && (
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 leading-relaxed">
                <span className="font-bold">💡 मात्रा लगाने का नियम:</span> हिंदी व्यंजनों में पहले से &apos;अ&apos; की ध्वनि होती है। व्यंजन चुनने के बाद यहाँ से मात्रा (ा, ि, ी, ु, ू) जोड़ें!
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 p-1">
                {MATRA_OPTIONS.map((m) => (
                  <button
                    key={`matra-${m.sign}`}
                    type="button"
                    onClick={() => handleAttachMatra(m.sign)}
                    disabled={isCorrect === true}
                    className="p-2 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-slate-800 flex flex-col items-center justify-center shadow-xs active:scale-95 transition"
                    title={m.soundTip}
                  >
                    <span className="text-2xl font-black font-hindi text-purple-700 leading-none mb-1">
                      क{m.sign}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Bottom Controls */}
        <div className="mt-6 pt-5 border-t-2 border-slate-100 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            {onPrev && currentIndex > 0 && (
              <button
                type="button"
                onClick={onPrev}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              >
                ← पिछला
              </button>
            )}

            <button
              type="button"
              onClick={handleResetSlots}
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
              isCorrect
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 ring-4 ring-emerald-200 animate-pulse scale-105"
                : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            }`}
          >
            <span>अगला शब्द {isCorrect && "➡️"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

