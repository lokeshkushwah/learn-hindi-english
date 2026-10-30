"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { SOUND_WORDS_DATA, SoundWordItem } from '@/data/soundWordBuilderData';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  Undo2,
  CheckCircle2,
  Lightbulb,
  Music,
  ArrowRight,
  Filter,
  Star,
  Award,
} from 'lucide-react';

interface SoundToWordBuilderProps {
  onEarnStar?: (count: number) => void;
}

type LengthFilter =
  | 'all'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SoundToWordBuilder({ onEarnStar }: SoundToWordBuilderProps) {
  const { speakEnglish, speakHindi } = useSpeech();
  const [selectedLength, setSelectedLength] = useState<LengthFilter>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter words by selected letter count (2 to 15)
  const filteredWords = useMemo(() => {
    if (selectedLength === 'all') return SOUND_WORDS_DATA;
    const len = parseInt(selectedLength, 10);
    return SOUND_WORDS_DATA.filter((w) => w.lettersCount === len);
  }, [selectedLength]);

  const currentItem: SoundWordItem = filteredWords[currentIndex % filteredWords.length] || filteredWords[0];

  // Game state
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string }[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showSyllables, setShowSyllables] = useState<boolean>(false);
  const [showRule, setShowRule] = useState<boolean>(true);

  // Initialize letter tiles with random distractors
  useEffect(() => {
    if (!currentItem) return;
    setPlacedLetters([]);
    setIsSolved(false);
    setShowSyllables(false);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((c) => !currentItem.letters.includes(c));
    const distractorCount = currentItem.lettersCount <= 4 ? 2 : currentItem.lettersCount <= 8 ? 3 : 2;
    const distractors = shuffle(alphabet).slice(0, distractorCount);

    const tiles = shuffle([...currentItem.letters, ...distractors]).map((letter, idx) => ({
      id: `${letter}-${idx}-${Math.random()}`,
      letter,
    }));

    setAvailableTiles(tiles);
    // Auto speak the word when new challenge appears
    speakEnglish(currentItem.word);
  }, [currentItem]);

  // Handle letter click
  const handleSelectTile = (tile: { id: string; letter: string }) => {
    if (isSolved || placedLetters.length >= currentItem.letters.length) return;

    soundEffects.playPop();
    const newPlaced = [...placedLetters, tile.letter];
    setPlacedLetters(newPlaced);
    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));

    // Check if word is complete
    if (newPlaced.length === currentItem.letters.length) {
      if (newPlaced.join('') === currentItem.word) {
        setIsSolved(true);
        soundEffects.playCelebration();
        if (onEarnStar) onEarnStar(currentItem.lettersCount >= 10 ? 3 : 1);
      } else {
        soundEffects.playTryAgain();
      }
    }
  };

  // Undo last letter
  const handleUndo = () => {
    if (placedLetters.length === 0 || isSolved) return;
    soundEffects.playPop();
    const lastLetter = placedLetters[placedLetters.length - 1];
    setPlacedLetters((prev) => prev.slice(0, -1));
    setAvailableTiles((prev) => [...prev, { id: `${lastLetter}-${Date.now()}`, letter: lastLetter }]);
  };

  // Reset current word
  const handleReset = () => {
    if (!currentItem) return;
    soundEffects.playPop();
    setPlacedLetters([]);
    setIsSolved(false);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((c) => !currentItem.letters.includes(c));
    const distractorCount = currentItem.lettersCount <= 4 ? 2 : 3;
    const distractors = shuffle(alphabet).slice(0, distractorCount);
    setAvailableTiles(
      shuffle([...currentItem.letters, ...distractors]).map((letter, idx) => ({
        id: `${letter}-${idx}-${Math.random()}`,
        letter,
      }))
    );
  };

  // Advance to next or previous word
  const handleNextWord = () => {
    soundEffects.playPop();
    setCurrentIndex((i) => (i + 1) % filteredWords.length);
  };

  const handlePrevWord = () => {
    soundEffects.playPop();
    setCurrentIndex((i) => (i - 1 + filteredWords.length) % filteredWords.length);
  };

  const filterButtons: { id: LengthFilter; label: string; badge: string }[] = [
    { id: 'all', label: 'All Words', badge: '392 Words' },
    { id: '2', label: '2 Letters', badge: '28 Words' },
    { id: '3', label: '3 Letters', badge: '28 Words' },
    { id: '4', label: '4 Letters', badge: '28 Words' },
    { id: '5', label: '5 Letters', badge: '28 Words' },
    { id: '6', label: '6 Letters', badge: '28 Words' },
    { id: '7', label: '7 Letters', badge: '28 Words' },
    { id: '8', label: '8 Letters', badge: '28 Words' },
    { id: '9', label: '9 Letters', badge: '28 Words' },
    { id: '10', label: '10 Letters', badge: '28 Words' },
    { id: '11', label: '11 Letters', badge: '28 Words' },
    { id: '12', label: '12 Letters', badge: '28 Words' },
    { id: '13', label: '13 Letters', badge: '28 Words' },
    { id: '14', label: '14 Letters', badge: '28 Words' },
    { id: '15', label: '15 Letters', badge: '28 Words' },
  ];

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 p-5 sm:p-7 shadow-xl space-y-6 animate-in fade-in">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Sound-to-Word Builder • सुनो और स्पेलिंग बनाओ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900">
            Build Words by Sound (2 to 15 Letters) 🎧
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-hindi font-medium">
            आवाज़ को ध्यान से सुनें, अक्षरों को सही क्रम में जोड़ें और ध्वनि का जादुई नियम सीखें!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs font-black text-amber-800">
            Word {currentIndex + 1} of {filteredWords.length}
          </span>
          <span className="px-3 py-1.5 bg-purple-100 border border-purple-300 rounded-2xl text-xs font-black text-purple-900">
            {currentItem.lettersCount} Letters 📏
          </span>
        </div>
      </div>

      {/* 2. Length Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-amber-600 flex-shrink-0 mr-1" />
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => {
              soundEffects.playPop();
              setSelectedLength(btn.id);
              setCurrentIndex(0);
            }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
              selectedLength === btn.id
                ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <span>{btn.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                selectedLength === btn.id ? 'bg-amber-500 text-stone-950' : 'bg-white text-stone-500'
              }`}
            >
              {btn.badge}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Central Interactive Sound Board */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-3 border-amber-200 rounded-3xl p-5 sm:p-7 text-center space-y-5 shadow-inner">
        {/* Emoji & Audio Prompts */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-md border-2 border-amber-200 flex items-center justify-center text-5xl sm:text-6xl animate-bounce">
            {currentItem.emoji}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                soundEffects.playPop();
                speakEnglish(currentItem.word);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 active:scale-95 text-stone-950 rounded-2xl font-black text-sm shadow-md transition-all"
            >
              <Volume2 className="w-5 h-5 text-stone-900" />
              <span>🔊 Listen Word ({currentItem.word})</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                // Speak slowly by breaking syllables
                speakEnglish(currentItem.syllables.join(' ... '));
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-amber-100 active:scale-95 text-amber-900 border-2 border-amber-300 rounded-2xl font-bold text-xs shadow-sm transition-all"
              title="Speak slowly by syllable breaks"
            >
              <span>🐢 Slow Pronunciation</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                setShowSyllables(!showSyllables);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-100 hover:bg-purple-200 active:scale-95 text-purple-950 border-2 border-purple-300 rounded-2xl font-bold text-xs shadow-sm transition-all"
            >
              <Music className="w-4 h-4 text-purple-700" />
              <span>{showSyllables ? 'Hide Syllable Beats' : '👏 Syllables (तालियां)'}</span>
            </button>
          </div>

          {/* Hindi Meaning & Pronunciation Display */}
          <div className="space-y-0.5">
            <div className="text-lg sm:text-xl font-black font-hindi text-amber-950">
              {currentItem.meaningHindi}
            </div>
            <div className="text-xs font-semibold text-stone-500 font-hindi">
              उच्चारण: <span className="font-bold text-stone-800">[{currentItem.pronunciationHindi}]</span>
            </div>
          </div>

          {/* Syllable Clap Beats (Interactive hint for long words) */}
          {showSyllables && (
            <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-2xl px-4 py-2 text-xs font-black text-purple-900 flex items-center gap-2 animate-in fade-in">
              <span>👏 Clapping Chunks ({currentItem.syllables.length} beats):</span>
              <div className="flex items-center gap-1.5 font-mono uppercase">
                {currentItem.syllables.map((syl, i) => (
                  <span key={i} className="px-2 py-0.5 bg-purple-200 rounded-lg">
                    {syl}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Word Construction Slots */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-2xl mx-auto py-2">
          {currentItem.letters.map((_, idx) => {
            const letter = placedLetters[idx];
            const isFilled = letter !== undefined;
            const isLastWrong = isFilled && letter !== currentItem.letters[idx] && placedLetters.length === currentItem.letters.length;

            return (
              <div
                key={idx}
                className={`w-10 h-12 sm:w-13 sm:h-16 rounded-2xl font-black text-xl sm:text-3xl flex items-center justify-center border-3 transition-all ${
                  isFilled
                    ? isSolved
                      ? 'bg-emerald-400 text-white border-emerald-500 shadow-md animate-bounce'
                      : isLastWrong
                      ? 'bg-rose-400 text-white border-rose-500 shadow-md'
                      : 'bg-white text-stone-900 border-amber-400 shadow-md'
                    : 'bg-white/60 text-stone-300 border-dashed border-stone-300'
                }`}
              >
                {letter || ''}
              </div>
            );
          })}
        </div>

        {/* Available Clickable Letter Tiles */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {isSolved ? '🎉 Great Job! All letters matched!' : 'Click letters below to build the word:'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {availableTiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleSelectTile(tile)}
                disabled={isSolved}
                className="w-11 h-12 sm:w-13 sm:h-14 rounded-2xl bg-white hover:bg-amber-100 active:scale-90 border-2 sm:border-3 border-amber-300 hover:border-amber-400 text-stone-900 font-black text-xl sm:text-2xl shadow-md transition-all select-none cursor-pointer disabled:opacity-50"
              >
                {tile.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls: Undo, Reset, Next */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-amber-200">
          <button
            onClick={handleUndo}
            disabled={placedLetters.length === 0 || isSolved}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold text-xs disabled:opacity-40 transition-all"
          >
            <Undo2 className="w-4 h-4" />
            <span>Undo / वापस</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold text-xs transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset / दोबारा</span>
          </button>

          <button
            onClick={handlePrevWord}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl font-bold text-xs transition-all"
          >
            <span>⬅️ Previous</span>
          </button>

          <button
            onClick={handleNextWord}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-stone-950 rounded-xl font-black text-xs transition-all shadow-sm"
          >
            <span>Next Word ➡️</span>
          </button>

          {isSolved && (
            <button
              onClick={handleNextWord}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-sm rounded-xl shadow-lg transition-all animate-bounce"
            >
              <span>🎉 Solved! Next Word ➡️</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. SOUND & PHONICS RULE EXPLAINER (Requirement: "English me sound ke according word kaise banaye uske rule Hindi or English me") */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h4 className="font-black text-stone-900 text-sm sm:text-base">
              Sound & Spelling Rule (ध्वनि से स्पेलिंग का नियम)
            </h4>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-xs font-black">
            {currentItem.soundRuleTitleEn}
          </span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
            <div>
              <p className="text-xs sm:text-sm font-black text-stone-900">
                {currentItem.soundRuleTitleHi}
              </p>
              <span className="text-[11px] font-bold text-amber-800">
                {currentItem.soundRuleTitleEn}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <HindiAudioButton
                text={currentItem.soundRuleHindi}
                size="sm"
                label="हिंदी नियम"
                className="text-[11px] py-1 px-2.5 font-bold"
              />
              <WordAudioButton
                text={currentItem.soundRuleEnglish}
                speechText={`${currentItem.syllables.join(', ')} makes ${currentItem.word}.`}
                size="sm"
                label="English Rule"
                className="text-[11px] py-1 px-2.5 font-bold bg-white"
              />
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <p className="text-xs text-stone-700 font-medium">
              {currentItem.soundRuleEnglish}
            </p>
            <p className="text-xs font-hindi text-stone-900 font-semibold">
              👉 {currentItem.soundRuleHindi}
            </p>
          </div>

          <div className="pt-2 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-amber-900">
            <div className="flex items-center gap-2">
              <span className="bg-amber-200 px-2 py-0.5 rounded text-[11px] font-sans">
                Sound Formula
              </span>
              <span>{currentItem.exampleSoundTip}</span>
            </div>

            <WordAudioButton
              text={currentItem.exampleSoundTip}
              speechText={`${currentItem.syllables.join(', ')} makes ${currentItem.word}`}
              size="sm"
              label="Formula"
              className="text-[10px] py-0.5 px-2 bg-amber-100 border-amber-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
