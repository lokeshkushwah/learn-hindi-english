"use client";

import React, { useState } from "react";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { SettingsModal } from "@/components/SettingsModal";
import { SIMILAR_SOUND_PAIRS, SimilarSoundPair } from "@/data/hindiContent";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { compareHindiSpeech, CompareResult, ToleranceMode } from "@/lib/comparison";
import { useKidSounds } from "@/hooks/useKidSounds";
import { ConfettiCelebration } from "@/components/ConfettiCelebration";
import { useProgress } from "@/hooks/useProgress";
import {
  Volume2,
  Mic,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function SimilarSoundsPage() {
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [targetWordChoice, setTargetWordChoice] = useState<"A" | "B">("A");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);

  const { speak, isSpeaking } = useSpeechSynthesis();
  const { playCorrectSound, playRetrySound, playPopSound, playStarSound, playMicChime } = useKidSounds();
  const { recordAttempt } = useProgress();

  const pair: SimilarSoundPair = SIMILAR_SOUND_PAIRS[selectedPairIndex];
  const currentPairWord = pair.practiceWords[activeWordIndex] || pair.practiceWords[0];
  const targetWord = targetWordChoice === "A" ? currentPairWord.wordA : currentPairWord.wordB;

  const handleRecognized = (transcriptText: string) => {
    playMicChime(false);
    stopListening();
    const comparison = compareHindiSpeech(targetWord, transcriptText, tolerance);
    setResult(comparison);

    if (comparison.isMatch) {
      setShowConfetti(true);
      playCorrectSound();
      playStarSound();
      recordAttempt(
        `similar-${pair.id}-${targetWord}`,
        targetWord,
        "similar-sounds",
        transcriptText,
        true,
        0
      );

      // Automatically advance to the next challenge upon match!
      setTimeout(() => {
        if (targetWordChoice === "A") {
          // Switch to word B of the pair
          setTargetWordChoice("B");
          setResult(null);
          setShowConfetti(false);
          resetTranscript();
        } else if (activeWordIndex < pair.practiceWords.length - 1) {
          // Next word pair in this contrast
          setActiveWordIndex((prev) => prev + 1);
          setTargetWordChoice("A");
          setResult(null);
          setShowConfetti(false);
          resetTranscript();
        } else if (selectedPairIndex < SIMILAR_SOUND_PAIRS.length - 1) {
          // Next contrast pair (e.g. त/ट ➔ द/ड)
          setSelectedPairIndex((prev) => prev + 1);
          setActiveWordIndex(0);
          setTargetWordChoice("A");
          setResult(null);
          setShowConfetti(false);
          resetTranscript();
        }
      }, 1300);
    } else {
      playRetrySound();
    }
  };

  const handleInterim = (text: string) => {
    if (!text) return;
    const comparison = compareHindiSpeech(targetWord, text, tolerance);
    if (comparison.isMatch) {
      handleRecognized(text);
    }
  };

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    lang: "hi-IN",
    onInterimResult: handleInterim,
    onFinalResult: handleRecognized,
    onError: () => playMicChime(false),
  });

  const handleSelectWord = (choice: "A" | "B") => {
    playPopSound();
    setTargetWordChoice(choice);
    setResult(null);
    resetTranscript();
    setShowConfetti(false);
    const word = choice === "A" ? currentPairWord.wordA : currentPairWord.wordB;
    speak(word, { rate: speechRate });
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      playPopSound();
      playMicChime(true);
      setResult(null);
      startListening();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <ConfettiCelebration trigger={showConfetti} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        tolerance={tolerance}
        onToleranceChange={setTolerance}
        speechRate={speechRate}
        onSpeechRateChange={setSpeechRate}
        showParentOverride={showParentOverride}
        onToggleParentOverride={setShowParentOverride}
        autoAdvance={true}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs uppercase mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>ध्वनि भेद अभ्यास (Phonetic Contrast)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800">
            मिलती-जुलती ध्वनियों में अंतर 👂
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1">
            त और ट, द और ड, स और श, ब और व — सही जीभ और होंठ की स्थिति सीखें!
          </p>
        </div>

        {/* Pair Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {SIMILAR_SOUND_PAIRS.map((p, idx) => {
            const isSelected = idx === selectedPairIndex;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setSelectedPairIndex(idx);
                  setActiveWordIndex(0);
                  setTargetWordChoice("A");
                  setResult(null);
                  resetTranscript();
                  setShowConfetti(false);
                }}
                className={`px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all border-2 flex items-center gap-2 ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-teal-300"
                }`}
              >
                <span>{p.letterA.exampleEmoji}</span>
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pair Contrast Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-teal-300 max-w-4xl mx-auto mb-10">
          {/* Contrast Explanation Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-black text-teal-900 text-base mb-1">
                ध्वनि का रहस्य (Secret of the Sound):
              </h3>
              <p className="text-sm text-teal-800 leading-relaxed">
                {pair.contrastExplanation}
              </p>
            </div>
          </div>

          {/* Side-by-side Letter comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Letter A */}
            <div className="p-6 rounded-3xl bg-amber-50/60 border-2 border-amber-200 text-center flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-900 mb-2">
                  {pair.letterA.soundType}
                </span>
                <div className="text-7xl font-black text-slate-900 my-2 font-hindi">
                  {pair.letterA.letter}
                </div>
                <div className="text-sm font-bold text-slate-700 mb-1">
                  मुँह की स्थिति: {pair.letterA.mouthShapeHindi}
                </div>
                <p className="text-xs text-slate-500 bg-white/70 p-3 rounded-xl border border-amber-100 my-3">
                  💡 {pair.letterA.tip}
                </p>
                <div className="text-base font-bold text-amber-900 flex items-center justify-center gap-1.5">
                  <span>उदाहरण:</span>
                  <span className="text-xl">{pair.letterA.exampleEmoji}</span>
                  <span className="font-hindi text-lg">{pair.letterA.exampleWord}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => speak(pair.letterA.letter, { rate: speechRate })}
                className="mt-4 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 '{pair.letterA.letter}' की आवाज़ सुनो</span>
              </button>
            </div>

            {/* Letter B */}
            <div className="p-6 rounded-3xl bg-sky-50/60 border-2 border-sky-200 text-center flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-200 text-sky-900 mb-2">
                  {pair.letterB.soundType}
                </span>
                <div className="text-7xl font-black text-slate-900 my-2 font-hindi">
                  {pair.letterB.letter}
                </div>
                <div className="text-sm font-bold text-slate-700 mb-1">
                  मुँह की स्थिति: {pair.letterB.mouthShapeHindi}
                </div>
                <p className="text-xs text-slate-500 bg-white/70 p-3 rounded-xl border border-sky-100 my-3">
                  💡 {pair.letterB.tip}
                </p>
                <div className="text-base font-bold text-sky-900 flex items-center justify-center gap-1.5">
                  <span>उदाहरण:</span>
                  <span className="text-xl">{pair.letterB.exampleEmoji}</span>
                  <span className="font-hindi text-lg">{pair.letterB.exampleWord}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => speak(pair.letterB.letter, { rate: speechRate })}
                className="mt-4 w-full py-2.5 rounded-xl bg-sky-400 hover:bg-sky-500 text-slate-900 font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 '{pair.letterB.letter}' की आवाज़ सुनो</span>
              </button>
            </div>
          </div>

          {/* Minimal Pairs Speaking Test */}
          <div className="border-t-2 border-slate-100 pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-black text-slate-800">
                🎯 बोलकर अंतर परखो (Speaking Challenge)
              </h3>
              <p className="text-xs text-slate-500">
                एक शब्द चुनो, सुनो और माइक से बोलकर दोनों का फ़र्क दिखाओ!
              </p>
            </div>

            {/* Practice Words Switcher */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {pair.practiceWords.map((pw, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setActiveWordIndex(i);
                    setResult(null);
                    resetTranscript();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    activeWordIndex === i
                      ? "bg-slate-800 text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  जोड़ी {i + 1}: {pw.wordA} / {pw.wordB}
                </button>
              ))}
            </div>

            {/* Target choice buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
              <button
                type="button"
                onClick={() => handleSelectWord("A")}
                className={`p-4 rounded-2xl border-4 text-center transition-all ${
                  targetWordChoice === "A"
                    ? "bg-amber-400 border-amber-600 text-slate-900 shadow-md scale-105"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300"
                }`}
              >
                <div className="text-3xl mb-1">{currentPairWord.emojiA}</div>
                <div className="text-2xl font-black font-hindi">
                  {currentPairWord.wordA}
                </div>
                <span className="text-[11px] font-bold block mt-1">
                  ({pair.letterA.letter} वाला शब्द)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectWord("B")}
                className={`p-4 rounded-2xl border-4 text-center transition-all ${
                  targetWordChoice === "B"
                    ? "bg-sky-400 border-sky-600 text-slate-900 shadow-md scale-105"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300"
                }`}
              >
                <div className="text-3xl mb-1">{currentPairWord.emojiB}</div>
                <div className="text-2xl font-black font-hindi">
                  {currentPairWord.wordB}
                </div>
                <span className="text-[11px] font-bold block mt-1">
                  ({pair.letterB.letter} वाला शब्द)
                </span>
              </button>
            </div>

            {/* Speaking Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <button
                type="button"
                onClick={() => speak(targetWord, { rate: speechRate })}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-sm text-slate-800 flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5 text-slate-600" />
                <span>🔊 सुनो: '{targetWord}'</span>
              </button>

              <button
                type="button"
                onClick={handleMicClick}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                  isListening
                    ? "bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                }`}
              >
                <Mic className="w-5 h-5" />
                <span>{isListening ? "सुन रहे हैं... बोलो!" : `🎤 बोलो: '${targetWord}'`}</span>
              </button>
            </div>

            {/* Speaking Result */}
            {result && (
              <div
                className={`mt-6 p-4 rounded-2xl max-w-lg mx-auto flex items-center gap-3 animate-fade-in ${
                  result.isMatch
                    ? "bg-emerald-100 border-2 border-emerald-400 text-emerald-950"
                    : "bg-rose-100 border-2 border-rose-300 text-rose-950"
                }`}
              >
                {result.isMatch ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-500 shrink-0" />
                )}
                <div>
                  <div className="font-black text-base">{result.feedbackHindi}</div>
                  <div className="text-xs opacity-80 mt-0.5">
                    लक्ष्य: {targetWord} | हमने सुना: {result.recognized || "—"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

