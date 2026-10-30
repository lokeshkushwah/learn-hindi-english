"use client";

import React, { useState } from 'react';
import {
  ENGLISH_SOUND_SECRETS,
  EnglishSoundSecretPair,
  EnglishPracticeWordPair,
} from '@/data/englishSoundSecrets';
import { useSpeech } from '@/hooks/useSpeech';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useKidSounds } from '@/hooks/useKidSounds';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { ConfettiCelebration } from './ConfettiCelebration';
import {
  Volume2,
  Mic,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Star,
} from 'lucide-react';

interface EnglishSoundSecretsExplorerProps {
  onBackToDashboard?: () => void;
}

export function EnglishSoundSecretsExplorer({
  onBackToDashboard,
}: EnglishSoundSecretsExplorerProps) {
  const { boldEnglish, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();

  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [targetWordChoice, setTargetWordChoice] = useState<'A' | 'B'>('A');

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [speechSuccess, setSpeechSuccess] = useState<boolean | null>(null);
  const [lastSpokenWord, setLastSpokenWord] = useState<string>('');

  const { speakEnglish, speakHindi } = useSpeech();
  const {
    playCorrectSound,
    playRetrySound,
    playPopSound,
    playStarSound,
    playMicChime,
  } = useKidSounds();

  const currentPair: EnglishSoundSecretPair =
    ENGLISH_SOUND_SECRETS[selectedPairIndex] || ENGLISH_SOUND_SECRETS[0];

  const currentWordPair: EnglishPracticeWordPair =
    currentPair.practiceWords[activeWordIndex] || currentPair.practiceWords[0];

  const targetWord =
    targetWordChoice === 'A' ? currentWordPair.wordA : currentWordPair.wordB;

  // Compare English recognized speech with target word
  const checkSpokenEnglish = (recognizedText: string) => {
    if (!recognizedText) return;
    const cleanTarget = targetWord.toLowerCase().trim();
    const cleanSpoken = recognizedText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

    setLastSpokenWord(recognizedText);

    // Exact or substring match (e.g. child says "van" or "a van")
    const words = cleanSpoken.split(/\s+/);
    const isMatch = cleanSpoken === cleanTarget || words.includes(cleanTarget);

    if (isMatch) {
      setSpeechSuccess(true);
      setShowConfetti(true);
      playCorrectSound();
      playStarSound();

      // Auto advance
      setTimeout(() => {
        if (targetWordChoice === 'A') {
          setTargetWordChoice('B');
          setSpeechSuccess(null);
          setShowConfetti(false);
          resetTranscript();
        } else if (activeWordIndex < currentPair.practiceWords.length - 1) {
          setActiveWordIndex((prev) => prev + 1);
          setTargetWordChoice('A');
          setSpeechSuccess(null);
          setShowConfetti(false);
          resetTranscript();
        }
      }, 1400);
    } else {
      setSpeechSuccess(false);
      playRetrySound();
    }
  };

  const {
    isListening,
    transcript,
    isSupported: isMicSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    lang: 'en-US',
    onInterimResult: (text) => {
      if (text) checkSpokenEnglish(text);
    },
    onFinalResult: (text) => {
      playMicChime(false);
      stopListening();
      checkSpokenEnglish(text);
    },
    onError: () => playMicChime(false),
  });

  const handleSelectPair = (index: number) => {
    playPopSound();
    setSelectedPairIndex(index);
    setActiveWordIndex(0);
    setTargetWordChoice('A');
    setSpeechSuccess(null);
    setShowConfetti(false);
    resetTranscript();
  };

  const handleSelectWordChoice = (choice: 'A' | 'B') => {
    playPopSound();
    setTargetWordChoice(choice);
    setSpeechSuccess(null);
    setShowConfetti(false);
    resetTranscript();
    const word = choice === 'A' ? currentWordPair.wordA : currentWordPair.wordB;
    speakEnglish(word);
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      playPopSound();
      playMicChime(true);
      setSpeechSuccess(null);
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      <ConfettiCelebration trigger={showConfetti} />

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur rounded-full border border-white/30">
              👄 English Sound Secrets
            </span>
            <h2
              className={`text-3xl md:text-4xl drop-shadow ${
                boldEnglish ? 'font-black' : 'font-bold'
              }`}
            >
              ध्वनि का रहस्य (Secret of the Sound)
            </h2>
            <p className="text-base md:text-lg font-hindi text-cyan-100 font-medium">
              English बोलते समय जीभ, दाँत और होंठ कहाँ रखने हैं? सही उच्चारण का सीक्रेट जानें!
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2">
            <span>✨</span>
            <span>8 Master Sound Contrasts</span>
          </div>
        </div>
      </div>

      {/* 2. Contrast Pair Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/70 rounded-3xl border-2 border-amber-200 shadow-xs">
        {ENGLISH_SOUND_SECRETS.map((p, idx) => {
          const isSelected = selectedPairIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPair(idx)}
              className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                  : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{p.titleHindi.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Top Highlight Banner: ध्वनि का रहस्य (Secret of the Sound) */}
      <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-5 md:p-6 shadow-sm space-y-2">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <Lightbulb className="w-6 h-6 text-emerald-600 animate-pulse flex-shrink-0" />
          <h3 className="text-lg md:text-xl font-black font-hindi">
            ध्वनि का रहस्य (Secret of the Sound):
          </h3>
        </div>
        <p className="text-sm md:text-base font-hindi text-stone-800 font-medium leading-relaxed pl-8">
          {currentPair.contrastExplanationHindi}
        </p>
        <p className="text-xs text-stone-600 pl-8 font-medium">
          {currentPair.contrastExplanationEnglish}
        </p>
      </div>

      {/* 4. The Two Side-by-Side Sound Cards (Matching the Hindi style in user's image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <div className="bg-amber-50/50 border-3 border-amber-300 hover:border-amber-400 rounded-3xl p-6 shadow-md flex flex-col items-center text-center justify-between space-y-4">
          <div className="w-full flex items-center justify-center">
            <span className="px-3.5 py-1 bg-amber-200 text-amber-950 text-xs font-black rounded-full border border-amber-300">
              {currentPair.letterA.soundTag}
            </span>
          </div>

          {/* Big Letter Display */}
          <div className="space-y-1">
            <h3 className="text-6xl md:text-7xl font-black text-stone-900 tracking-tight">
              {currentPair.letterA.letter}
            </h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full inline-block">
              {currentPair.letterA.soundTagEnglish}
            </span>
          </div>

          {/* Mouth / Tongue Position */}
          <div className="space-y-1">
            <p className="text-sm md:text-base font-black text-stone-850 font-hindi">
              मुँह की स्थिति: {currentPair.letterA.mouthShapeHindi}
            </p>
            <p className="text-xs text-stone-500 font-medium">
              ({currentPair.letterA.mouthShapeEnglish})
            </p>
          </div>

          {/* Secret Tip Bubble */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-3 w-full shadow-xs">
            <p className="text-xs sm:text-sm font-hindi text-amber-950 font-bold leading-relaxed">
              {currentPair.letterA.tipHindi}
            </p>
          </div>

          {/* Example Word */}
          <div className="flex items-center gap-2 pt-1 text-base font-black text-stone-800">
            <span className="font-hindi text-stone-600">उदाहरण:</span>
            <span className="text-2xl">{currentPair.letterA.exampleEmoji}</span>
            <span className="text-amber-800">{currentPair.letterA.exampleWord}</span>
            <span className="text-xs font-hindi text-stone-500">
              ({currentPair.letterA.exampleHindi})
            </span>
          </div>

          {/* Audio Button */}
          <button
            onClick={() => speakEnglish(currentPair.letterA.exampleWord)}
            className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-500 active:scale-98 text-stone-950 font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Volume2 className="w-5 h-5 text-stone-900" />
            <span>'{currentPair.letterA.letter}' की आवाज़ सुनो (Listen)</span>
          </button>
        </div>

        {/* Card B */}
        <div className="bg-sky-50/50 border-3 border-sky-300 hover:border-sky-400 rounded-3xl p-6 shadow-md flex flex-col items-center text-center justify-between space-y-4">
          <div className="w-full flex items-center justify-center">
            <span className="px-3.5 py-1 bg-sky-200 text-sky-950 text-xs font-black rounded-full border border-sky-300">
              {currentPair.letterB.soundTag}
            </span>
          </div>

          {/* Big Letter Display */}
          <div className="space-y-1">
            <h3 className="text-6xl md:text-7xl font-black text-stone-900 tracking-tight">
              {currentPair.letterB.letter}
            </h3>
            <span className="text-xs font-bold text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full inline-block">
              {currentPair.letterB.soundTagEnglish}
            </span>
          </div>

          {/* Mouth / Tongue Position */}
          <div className="space-y-1">
            <p className="text-sm md:text-base font-black text-stone-850 font-hindi">
              मुँह की स्थिति: {currentPair.letterB.mouthShapeHindi}
            </p>
            <p className="text-xs text-stone-500 font-medium">
              ({currentPair.letterB.mouthShapeEnglish})
            </p>
          </div>

          {/* Secret Tip Bubble */}
          <div className="bg-white border-2 border-sky-200 rounded-2xl p-3 w-full shadow-xs">
            <p className="text-xs sm:text-sm font-hindi text-sky-950 font-bold leading-relaxed">
              {currentPair.letterB.tipHindi}
            </p>
          </div>

          {/* Example Word */}
          <div className="flex items-center gap-2 pt-1 text-base font-black text-stone-800">
            <span className="font-hindi text-stone-600">उदाहरण:</span>
            <span className="text-2xl">{currentPair.letterB.exampleEmoji}</span>
            <span className="text-sky-800">{currentPair.letterB.exampleWord}</span>
            <span className="text-xs font-hindi text-stone-500">
              ({currentPair.letterB.exampleHindi})
            </span>
          </div>

          {/* Audio Button */}
          <button
            onClick={() => speakEnglish(currentPair.letterB.exampleWord)}
            className="w-full py-3.5 px-4 bg-sky-400 hover:bg-sky-500 active:scale-98 text-stone-950 font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Volume2 className="w-5 h-5 text-stone-900" />
            <span>'{currentPair.letterB.letter}' की आवाज़ सुनो (Listen)</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          5. SPEAKING CHALLENGE (बोलकर अंतर परखो - MATCHING IMAGE)
          ======================================================== */}
      <div className="bg-white border-3 border-stone-200 rounded-3xl p-6 md:p-8 shadow-lg space-y-6 text-center">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-stone-900 font-black text-xl md:text-2xl font-hindi">
            <span>🎯</span>
            <span>बोलकर अंतर परखो (Speaking Challenge)</span>
          </div>
          <p className="text-stone-600 text-sm font-hindi">
            एक शब्द चुनो, सुनो और माइक से बोलकर दोनों का फ़र्क दिखाओ!
          </p>
        </div>

        {/* Word Pair Chips Selector (जोड़ी 1, जोड़ी 2, जोड़ी 3...) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {currentPair.practiceWords.map((item, idx) => {
            const isWordActive = activeWordIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  playPopSound();
                  setActiveWordIndex(idx);
                  setTargetWordChoice('A');
                  setSpeechSuccess(null);
                  setShowConfetti(false);
                  resetTranscript();
                }}
                className={`px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                  isWordActive
                    ? 'bg-stone-900 text-white shadow-md scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>जोड़ी {idx + 1}: </span>
                <span>
                  {item.wordA} / {item.wordB}
                </span>
              </button>
            );
          })}
        </div>

        {/* Large Word Pair Choice Buttons */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
          {/* Choice A */}
          <button
            onClick={() => handleSelectWordChoice('A')}
            className={`p-4 md:p-5 rounded-3xl border-3 transition-all flex flex-col items-center gap-2 shadow-sm ${
              targetWordChoice === 'A'
                ? 'bg-amber-100 border-amber-400 ring-4 ring-amber-200 scale-103'
                : 'bg-white hover:bg-stone-50 border-stone-200'
            }`}
          >
            <span className="text-4xl">{currentWordPair.emojiA}</span>
            <span className="text-2xl md:text-3xl font-black text-stone-900">
              {currentWordPair.wordA}
            </span>
            <span className="font-hindi text-xs text-stone-600 font-bold">
              {currentWordPair.meaningA}
            </span>
            <div className="pt-1">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </span>
            </div>
          </button>

          {/* Choice B */}
          <button
            onClick={() => handleSelectWordChoice('B')}
            className={`p-4 md:p-5 rounded-3xl border-3 transition-all flex flex-col items-center gap-2 shadow-sm ${
              targetWordChoice === 'B'
                ? 'bg-sky-100 border-sky-400 ring-4 ring-sky-200 scale-103'
                : 'bg-white hover:bg-stone-50 border-stone-200'
            }`}
          >
            <span className="text-4xl">{currentWordPair.emojiB}</span>
            <span className="text-2xl md:text-3xl font-black text-stone-900">
              {currentWordPair.wordB}
            </span>
            <span className="font-hindi text-xs text-stone-600 font-bold">
              {currentWordPair.meaningB}
            </span>
            <div className="pt-1">
              <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </span>
            </div>
          </button>
        </div>

        {/* Selected Target Word Practice & Microphone */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-6 max-w-md mx-auto space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
              बोलने के लिए चुना गया शब्द (Target Word):
            </span>
            <h4 className="text-4xl font-black text-stone-900 tracking-wide">
              {targetWord}
            </h4>
          </div>

          {/* Listen First Button */}
          <div className="flex items-center justify-center gap-2">
            <WordAudioButton
              text={targetWord}
              speechText={targetWord}
              size="md"
              label={`Listen "${targetWord}"`}
              className="bg-white border-2 border-amber-300 font-bold shadow-xs"
            />
          </div>

          {/* Microphone Speaking Action */}
          <div className="pt-2">
            {isMicSupported ? (
              <button
                onClick={handleMicToggle}
                className={`px-6 py-4 rounded-3xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-3 mx-auto ${
                  isListening
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                    : 'bg-stone-900 hover:bg-black text-amber-300 hover:scale-103'
                }`}
              >
                <Mic className={`w-6 h-6 ${isListening ? 'animate-bounce' : ''}`} />
                <span>
                  {isListening
                    ? 'सुन रहे हैं... बोलिए! (Listening...)'
                    : `माइक दबाकर बोलें: "${targetWord}"`}
                </span>
              </button>
            ) : (
              <div className="text-xs text-stone-500 font-hindi">
                (माइक आपके ब्राउज़र में उपलब्ध नहीं है। आप Listen बटन दबाकर आवाज़ का अभ्यास कर सकते हैं।)
              </div>
            )}
          </div>

          {/* Recognized transcript feedback */}
          {transcript && (
            <p className="text-xs text-stone-600 italic">
              आपने बोला: <span className="font-bold text-stone-900">"{transcript}"</span>
            </p>
          )}

          {/* Success / Retry Celebration Messages */}
          {speechSuccess === true && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl font-black text-sm font-hindi flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>🎉 शाबाश! आपने "{targetWord}" एकदम सही और स्पष्ट बोला!</span>
            </div>
          )}

          {speechSuccess === false && (
            <div className="p-3 bg-amber-100 border border-amber-300 text-amber-900 rounded-2xl font-bold text-xs font-hindi space-y-1 animate-in fade-in">
              <p>💡 कोई बात नहीं, फिर से कोशिश करें!</p>
              <p className="text-[11px] text-stone-600">
                ऊपर दिए गए "मुँह की स्थिति" नियम को ध्यान में रखकर बोलें।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

