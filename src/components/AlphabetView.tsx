"use client";

import React, { useState } from 'react';
import { ALPHABET_DATA } from '@/data/alphabet';
import { AlphabetLetter } from '@/types/alphabet';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Volume2, CheckCircle, RotateCcw, ArrowRight } from 'lucide-react';

export function AlphabetView() {
  const { boldEnglish, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();

  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter>(ALPHABET_DATA[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'vowels' | 'consonants'>('all');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const filteredLetters = ALPHABET_DATA.filter((item) => {
    if (filterMode === 'vowels') return item.isVowel;
    if (filterMode === 'consonants') return !item.isVowel;
    return true;
  });

  const handleSelectLetter = (letter: AlphabetLetter) => {
    soundEffects.playPop();
    setSelectedLetter(letter);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleSelectQuiz = (opt: string) => {
    setQuizAnswer(opt);
    setQuizSubmitted(true);
    if (opt === selectedLetter.quiz.correct) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playPop();
    }
  };

  const isQuizCorrect = quizAnswer === selectedLetter.quiz.correct;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur rounded-full border border-white/30 mb-2">
              Stage 1 • Foundation
            </span>
            <h2
              className={`text-3xl md:text-4xl drop-shadow ${
                boldEnglish ? 'font-black' : 'font-bold'
              }`}
            >
              Alphabet & Letter Sounds (A to Z)
            </h2>
            {showHindi && (
              <p className="text-lg md:text-xl font-hindi font-medium text-amber-100 mt-1">
                26 अक्षर: नाम, सही उच्चारण, चित्र और हिंदी अर्थ
              </p>
            )}
            <p className="text-sm text-white/90 mt-1">
              Tap any letter to hear its name, phonetic sound, and learn with fun picture words!
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur p-1.5 rounded-2xl border border-white/30">
            <button
              onClick={() => {
                soundEffects.playPop();
                setFilterMode('all');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              All (26)
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setFilterMode('vowels');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                filterMode === 'vowels'
                  ? 'bg-amber-300 text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Vowels (5)
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setFilterMode('consonants');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                filterMode === 'consonants'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Consonants (21)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Letter Grid (A to Z) */}
      <div className="bg-amber-50/60 p-4 md:p-6 rounded-3xl border-2 border-amber-200">
        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-2 sm:gap-2.5">
          {filteredLetters.map((item) => {
            const isSelected = selectedLetter.letter === item.letter;
            return (
              <button
                key={item.letter}
                onClick={() => handleSelectLetter(item)}
                className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-90 border-2 ${
                  isSelected
                    ? 'bg-amber-400 border-amber-500 text-stone-950 shadow-md scale-105 ring-2 ring-amber-300'
                    : item.isVowel
                    ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
                    : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-800'
                }`}
              >
                <span className="text-xl sm:text-2xl font-black leading-none">
                  {item.letter}
                  <span className="text-xs font-semibold ml-0.5 opacity-70">
                    {item.lowercase}
                  </span>
                </span>
                <span className="text-base sm:text-lg mt-0.5">
                  {item.primaryWord.emoji}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Selected Letter Spotlight Card */}
      <div className="bg-white rounded-3xl border-3 border-amber-300 p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-stone-100">
          {/* Big Letter Badge */}
          <div className="flex items-center gap-5">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 text-white flex flex-col items-center justify-center shadow-lg border-4 border-amber-200">
              <span className="text-5xl md:text-6xl font-black leading-none">
                {selectedLetter.letter}
              </span>
              <span className="text-2xl md:text-3xl font-extrabold opacity-90">
                {selectedLetter.lowercase}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    selectedLetter.isVowel
                      ? 'bg-pink-100 text-pink-900 border border-pink-300'
                      : 'bg-blue-100 text-blue-900 border border-blue-300'
                  }`}
                >
                  {selectedLetter.isVowel ? '⭐ Magical Vowel' : 'Consonant'}
                </span>
              </div>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Letter {selectedLetter.letter}
              </h3>
              <p className="text-stone-600 font-medium text-sm">
                {selectedLetter.soundDescription}
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  {selectedLetter.soundTeachingHindi}
                </p>
              )}
            </div>
          </div>

          {/* Audio Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WordAudioButton
              text={selectedLetter.letterNameAudio}
              speechText={`Letter ${selectedLetter.letter}`}
              label="1. Letter Name"
              size="md"
              showSparkle
            />
            <WordAudioButton
              text={selectedLetter.primaryWord.word}
              speechText={selectedLetter.primaryWord.word}
              label="2. Sound Word"
              size="md"
            />
            <HindiAudioButton
              text={selectedLetter.soundTeachingHindi}
              label="3. हिंदी आवाज़"
              size="md"
            />
          </div>
        </div>

        {/* Primary Word Card & Sentence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Picture Word */}
          <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200 px-3 py-1 rounded-full w-fit">
              Primary Picture Word
            </span>

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-3xl bg-white border-2 border-amber-200 flex items-center justify-center text-6xl shadow-sm">
                {selectedLetter.primaryWord.emoji}
              </div>
              <div>
                <h4
                  className={`text-3xl text-stone-950 ${
                    boldEnglish ? 'font-black' : 'font-bold'
                  }`}
                >
                  {selectedLetter.primaryWord.word}
                </h4>
                {showHindi && (
                  <p className="font-hindi text-lg font-bold text-stone-600">
                    {selectedLetter.primaryWord.hindi}
                  </p>
                )}
                <div className="pt-2">
                  <WordAudioButton
                    text={selectedLetter.primaryWord.word}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* Sentence */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1">
              <p
                className={`text-base text-stone-900 ${
                  boldEnglish ? 'font-bold' : 'font-medium'
                }`}
              >
                "{selectedLetter.primaryWord.sentence}"
              </p>
              {showHindi && (
                <p className="font-hindi text-sm text-stone-600">
                  {selectedLetter.primaryWord.hindiSentence}
                </p>
              )}
              <div className="pt-2 flex items-center gap-2">
                <WordAudioButton
                  text={selectedLetter.primaryWord.sentence}
                  label="Play Sentence"
                  size="sm"
                />
                <HindiAudioButton
                  text={selectedLetter.primaryWord.hindiSentence}
                  label="हिंदी अनुवाद"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Secondary Words & Quiz */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Secondary Words */}
            <div className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-5 space-y-3">
              <h5 className="text-xs font-black uppercase tracking-wider text-stone-600">
                More Words with Letter {selectedLetter.letter}
              </h5>
              <div className="grid grid-cols-3 gap-2">
                {selectedLetter.secondaryWords.map((sw) => (
                  <div
                    key={sw.word}
                    className="bg-white p-3 rounded-2xl border border-stone-200 flex flex-col items-center text-center shadow-xs space-y-1"
                  >
                    <span className="text-3xl">{sw.emoji}</span>
                    <span
                      className={`text-sm text-stone-900 ${
                        boldEnglish ? 'font-black' : 'font-bold'
                      }`}
                    >
                      {sw.word}
                    </span>
                    {showHindi && (
                      <span className="font-hindi text-[11px] text-stone-500">
                        {sw.hindi}
                      </span>
                    )}
                    <WordAudioButton text={sw.word} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Letter Mini Quiz */}
            <div className="bg-amber-100/60 border-2 border-amber-300 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <h5
                    className={`text-sm text-stone-900 ${
                      boldEnglish ? 'font-black' : 'font-bold'
                    }`}
                  >
                    {selectedLetter.quiz.prompt}
                  </h5>
                  {showHindi && (
                    <p className="font-hindi text-xs text-stone-600">
                      {selectedLetter.quiz.promptHindi}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {selectedLetter.quiz.options.map((opt) => {
                  const isSelected = quizAnswer === opt;
                  let style = 'bg-white border-amber-200 text-stone-800 hover:bg-white';
                  if (quizSubmitted) {
                    if (opt === selectedLetter.quiz.correct) {
                      style = 'bg-emerald-500 border-emerald-600 text-white font-black';
                    } else if (isSelected) {
                      style = 'bg-rose-500 border-rose-600 text-white font-black';
                    }
                  } else if (isSelected) {
                    style = 'bg-amber-400 border-amber-500 text-stone-900 font-black';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectQuiz(opt)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <span
                    className={
                      isQuizCorrect
                        ? 'text-emerald-700 font-bold'
                        : 'text-rose-700 font-bold'
                    }
                  >
                    {isQuizCorrect ? '🎉 Great job! Correct!' : 'Try again!'}
                  </span>
                  {!isQuizCorrect && (
                    <button
                      onClick={() => {
                        setQuizAnswer(null);
                        setQuizSubmitted(false);
                      }}
                      className="text-stone-600 hover:text-stone-900 underline font-bold"
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
