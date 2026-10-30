"use client";

import React, { useState } from 'react';
import { VOWELS_DATA } from '@/data/vowels';
import { CONSONANTS_DATA, DIGRAPH_PATTERNS } from '@/data/consonants';
import { BLENDING_LESSONS } from '@/data/blending';
import { VowelLessonData, ConsonantLessonData, BlendingLessonData } from '@/types/alphabet';
import { EnglishSoundSecretsExplorer } from './EnglishSoundSecretsExplorer';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  Volume2,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Music,
  Zap,
} from 'lucide-react';

export function PhonicsView() {
  const { boldEnglish, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();

  const [activePhonicsTab, setActivePhonicsTab] = useState<
    'vowels' | 'consonants' | 'blending' | 'secrets'
  >('vowels');

  // Vowels state
  const [selectedVowel, setSelectedVowel] = useState<VowelLessonData>(VOWELS_DATA[0]);
  const [vowelQuizAnswer, setVowelQuizAnswer] = useState<string | null>(null);
  const [vowelQuizSubmitted, setVowelQuizSubmitted] = useState<boolean>(false);

  // Consonants state
  const [selectedConsonant, setSelectedConsonant] = useState<ConsonantLessonData>(CONSONANTS_DATA[0]);
  const [consonantQuizAnswer, setConsonantQuizAnswer] = useState<string | null>(null);
  const [consonantQuizSubmitted, setConsonantQuizSubmitted] = useState<boolean>(false);

  // Blending state
  const [selectedBlend, setSelectedBlend] = useState<BlendingLessonData>(BLENDING_LESSONS[0]);
  const [blendStep, setBlendStep] = useState<number>(0);

  const handleSelectVowel = (v: VowelLessonData) => {
    soundEffects.playPop();
    setSelectedVowel(v);
    setVowelQuizAnswer(null);
    setVowelQuizSubmitted(false);
  };

  const handleSelectConsonant = (c: ConsonantLessonData) => {
    soundEffects.playPop();
    setSelectedConsonant(c);
    setConsonantQuizAnswer(null);
    setConsonantQuizSubmitted(false);
  };

  const handleSelectBlend = (b: BlendingLessonData) => {
    soundEffects.playPop();
    setSelectedBlend(b);
    setBlendStep(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur rounded-full border border-white/30 mb-2">
              Stage 1 • Sound Master
            </span>
            <h2
              className={`text-3xl md:text-4xl drop-shadow ${
                boldEnglish ? 'font-black' : 'font-bold'
              }`}
            >
              Phonics, Vowels, Consonants & Blending
            </h2>
            {showHindi && (
              <p className="text-lg md:text-xl font-hindi font-medium text-amber-100 mt-1">
                स्वर (Vowels), व्यंजन (Consonants), डिग्राफ्स और ध्वनि जोड़ (Blending)
              </p>
            )}
            <p className="text-sm text-white/90 mt-1">
              Master short & long vowel sounds, CVC word building, consonants, and blending letters into words!
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur p-1.5 rounded-2xl border border-white/30">
            <button
              onClick={() => {
                soundEffects.playPop();
                setActivePhonicsTab('vowels');
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-1.5 ${
                activePhonicsTab === 'vowels'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span>⭐ 5 Vowels</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActivePhonicsTab('consonants');
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-1.5 ${
                activePhonicsTab === 'consonants'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span>🔔 21 Consonants</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActivePhonicsTab('blending');
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-1.5 ${
                activePhonicsTab === 'blending'
                  ? 'bg-amber-300 text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span>🧩 Sound Blending</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActivePhonicsTab('secrets');
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-1.5 ${
                activePhonicsTab === 'secrets'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span>👄 Sound Secrets</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          TAB 1: VOWELS (A, E, I, O, U)
          ======================================================== */}
      {activePhonicsTab === 'vowels' && (
        <div className="space-y-6">
          {/* 5 Vowel Selector Buttons */}
          <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto">
            {VOWELS_DATA.map((v) => {
              const isSelected = selectedVowel.vowel === v.vowel;
              return (
                <button
                  key={v.vowel}
                  onClick={() => handleSelectVowel(v)}
                  className={`py-4 px-2 rounded-3xl flex flex-col items-center justify-center transition-all border-3 ${
                    isSelected
                      ? 'bg-amber-400 border-amber-500 text-stone-950 shadow-lg scale-105 ring-4 ring-amber-200'
                      : 'bg-white hover:bg-amber-50 border-amber-200 text-stone-800'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl font-black leading-none">
                    {v.vowel}
                  </span>
                  <span className="text-sm font-bold opacity-80 mt-1">
                    {v.lowercase}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Vowel Details Card */}
          <div className="bg-white rounded-3xl border-3 border-amber-300 p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-stone-100">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 text-white flex items-center justify-center text-4xl font-black shadow-md">
                  {selectedVowel.vowel}
                </div>
                <div>
                  <h3
                    className={`text-2xl md:text-3xl text-stone-900 ${
                      boldEnglish ? 'font-black' : 'font-bold'
                    }`}
                  >
                    Vowel {selectedVowel.vowel} ({selectedVowel.lowercase})
                  </h3>
                  <p className="text-stone-600 font-medium text-sm">
                    {selectedVowel.shortSoundLabel}
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-amber-800 text-sm font-semibold">
                      {selectedVowel.shortSoundHindi}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <WordAudioButton
                  text={`Letter ${selectedVowel.vowel}`}
                  speechText={`Letter ${selectedVowel.vowel}`}
                  label="Letter Name"
                  size="md"
                />
                <HindiAudioButton
                  text={selectedVowel.hindiGuidance}
                  label="हिंदी मार्गदर्शन"
                  size="md"
                />
              </div>
            </div>

            {/* Hindi Guidance Bubble */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">💡</span>
              <div>
                <h5 className="text-xs font-black uppercase text-amber-800">
                  Phonics Rule for 6-Year-Olds
                </h5>
                <p className="font-hindi text-stone-800 font-medium text-sm md:text-base mt-0.5">
                  {selectedVowel.hindiGuidance}
                </p>
              </div>
            </div>

            {/* Secret Rule: When is it Short vs Long? */}
            <div className="bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 border-2 border-amber-300 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🪄</span>
                <div>
                  <h4 className="text-base font-black text-stone-900">
                    The Magic 'E' Rule: When is a Sound Short vs Long?
                  </h4>
                  <p className="font-hindi text-xs font-bold text-amber-900">
                    कब Short Sound होती है और कब Long Sound? (जादुई E का नियम)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-white/80 backdrop-blur p-3 rounded-2xl border border-amber-200 text-xs text-stone-800 space-y-1">
                  <p className="font-black text-emerald-800">
                    🟢 Short Sound (CVC - बंद स्वर):
                  </p>
                  <p>
                    When a single vowel is trapped between consonants (like <strong>Hat</strong>, <strong>Pin</strong>, <strong>Hop</strong>, <strong>Tub</strong>), it makes a quick short sound!
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-stone-600">
                      जब vowel दो अक्षरों के बीच बंद हो, तो वह छोटी आवाज़ निकालता है!
                    </p>
                  )}
                </div>

                <div className="bg-white/80 backdrop-blur p-3 rounded-2xl border border-pink-200 text-xs text-stone-800 space-y-1">
                  <p className="font-black text-pink-800">
                    🟣 Long Sound (Magic 'E' - स्वर अपना नाम बोलता है):
                  </p>
                  <p>
                    When silent <strong>"E"</strong> is at the end (like <strong>Hat ➔ Hate</strong>, <strong>Pin ➔ Pine</strong>), "E" is quiet and makes the vowel say its <strong>own alphabet name</strong>!
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-stone-600">
                      अंत में आया जादुई 'E' शांत रहता है और vowel से उसका असली नाम बुलवाता है!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Short vs Long Sound Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Short Sound (CVC) */}
              <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-emerald-200 text-emerald-950 px-3 py-1 rounded-full">
                    Short Vowel Sound
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    CVC Words
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {selectedVowel.shortSoundExamples.map((ex) => (
                    <div
                      key={ex.word}
                      className="bg-white p-3 rounded-2xl border border-emerald-200 flex flex-col items-center text-center shadow-xs space-y-1"
                    >
                      <span className="text-3xl">{ex.emoji}</span>
                      <span
                        className={`text-base text-stone-900 ${
                          boldEnglish ? 'font-black' : 'font-bold'
                        }`}
                      >
                        {ex.word}
                      </span>
                      {showHindi && (
                        <span className="font-hindi text-xs text-stone-500">
                          {ex.hindi}
                        </span>
                      )}
                      <WordAudioButton text={ex.word} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Sound */}
              <div className="bg-pink-50/70 border-2 border-pink-200 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-pink-200 text-pink-950 px-3 py-1 rounded-full">
                    Long Vowel Sound
                  </span>
                  <span className="text-xs font-bold text-pink-700">
                    Says its own name!
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {selectedVowel.longSoundExamples.map((ex) => (
                    <div
                      key={ex.word}
                      className="bg-white p-3 rounded-2xl border border-pink-200 flex flex-col items-center text-center shadow-xs space-y-1"
                    >
                      <span className="text-3xl">{ex.emoji}</span>
                      <span
                        className={`text-base text-stone-900 ${
                          boldEnglish ? 'font-black' : 'font-bold'
                        }`}
                      >
                        {ex.word}
                      </span>
                      {showHindi && (
                        <span className="font-hindi text-xs text-stone-500">
                          {ex.hindi}
                        </span>
                      )}
                      <WordAudioButton text={ex.word} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Word Building Block */}
            <div className="bg-purple-50/70 border-2 border-purple-200 rounded-3xl p-5 space-y-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-purple-900">
                🧩 Word Building with Vowel {selectedVowel.vowel}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedVowel.wordBuilding.map((wb) => (
                  <div
                    key={wb.word}
                    className="bg-white p-4 rounded-2xl border border-purple-200 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{wb.emoji}</span>
                      <div>
                        <div className="flex items-center gap-1 font-mono font-black text-lg text-purple-900">
                          {wb.letters.map((ltr, i) => (
                            <span
                              key={i}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                                ltr.toLowerCase() === selectedVowel.lowercase
                                  ? 'bg-amber-300 text-stone-950 font-black ring-2 ring-amber-400'
                                  : 'bg-stone-100 text-stone-800'
                              }`}
                            >
                              {ltr}
                            </span>
                          ))}
                        </div>
                        <span
                          className={`text-base text-stone-900 mt-1 block ${
                            boldEnglish ? 'font-black' : 'font-bold'
                          }`}
                        >
                          = {wb.word}
                        </span>
                        {showHindi && (
                          <span className="font-hindi text-xs text-stone-500">
                            {wb.hindi}
                          </span>
                        )}
                      </div>
                    </div>
                    <WordAudioButton text={wb.word} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Vowel Quiz */}
            <div className="bg-amber-100/70 border-2 border-amber-300 rounded-3xl p-5 space-y-3 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4
                    className={`text-base text-stone-900 ${
                      boldEnglish ? 'font-black' : 'font-bold'
                    }`}
                  >
                    {selectedVowel.quiz.prompt}
                  </h4>
                  {showHindi && (
                    <p className="font-hindi text-xs text-stone-600">
                      {selectedVowel.quiz.promptHindi}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {selectedVowel.quiz.options.map((opt) => {
                  const isSelected = vowelQuizAnswer === opt;
                  let style = 'bg-white border-amber-200 text-stone-800 hover:bg-white';
                  if (vowelQuizSubmitted) {
                    if (opt === selectedVowel.quiz.correct) {
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
                      onClick={() => {
                        setVowelQuizAnswer(opt);
                        setVowelQuizSubmitted(true);
                        if (opt === selectedVowel.quiz.correct) {
                          soundEffects.playSuccess();
                        } else {
                          soundEffects.playPop();
                        }
                      }}
                      className={`p-3 rounded-2xl border-2 text-sm font-bold transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {vowelQuizSubmitted && (
                <div className="p-3 bg-white rounded-2xl border border-amber-200 text-xs space-y-1">
                  <p className="font-bold text-stone-900">
                    {selectedVowel.quiz.explanation}
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-stone-600">
                      {selectedVowel.quiz.hindiExplanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: CONSONANTS (21 LETTERS & DIGRAPHS)
          ======================================================== */}
      {activePhonicsTab === 'consonants' && (
        <div className="space-y-6">
          {/* Consonants Grid */}
          <div className="bg-blue-50/60 p-4 md:p-6 rounded-3xl border-2 border-blue-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-3">
              Select any of the 21 Consonants (व्यंजन):
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-11 gap-2">
              {CONSONANTS_DATA.map((c) => {
                const isSelected = selectedConsonant.letter === c.letter;
                return (
                  <button
                    key={c.letter}
                    onClick={() => handleSelectConsonant(c)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                      isSelected
                        ? 'bg-blue-500 border-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300'
                        : 'bg-white hover:bg-blue-100 border-stone-200 text-stone-900'
                    }`}
                  >
                    <span className="text-xl font-black leading-none">{c.letter}</span>
                    <span className="text-xs opacity-75">{c.lowercase}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consonant Spotlight Card */}
          <div className="bg-white rounded-3xl border-3 border-blue-300 p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-stone-100">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-black shadow-md">
                  {selectedConsonant.letter}
                </div>
                <div>
                  <h3
                    className={`text-2xl md:text-3xl text-stone-900 ${
                      boldEnglish ? 'font-black' : 'font-bold'
                    }`}
                  >
                    Consonant {selectedConsonant.letter} ({selectedConsonant.lowercase})
                  </h3>
                  <p className="text-stone-600 font-medium text-sm">
                    {selectedConsonant.commonSound}
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-blue-900 text-sm font-semibold">
                      💡 ध्वनि नियम: {selectedConsonant.soundTipHindi}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <WordAudioButton
                  text={`Letter ${selectedConsonant.letter}`}
                  speechText={`Letter ${selectedConsonant.letter}`}
                  label="Letter Name"
                  size="md"
                />
                <HindiAudioButton
                  text={selectedConsonant.soundTipHindi}
                  label="हिंदी टिप"
                  size="md"
                />
              </div>
            </div>

            {/* Special Pattern Notice (if any, like C or G) */}
            {selectedConsonant.specialPattern && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">✨</span>
                <div>
                  <h5 className="text-xs font-black uppercase text-amber-800">
                    {selectedConsonant.specialPattern.title}
                  </h5>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">
                    {selectedConsonant.specialPattern.english}
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-xs text-stone-600 mt-0.5">
                      {selectedConsonant.specialPattern.hindi}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Consonant Examples Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectedConsonant.examples.map((ex) => (
                <div
                  key={ex.word}
                  className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-5 flex flex-col items-center text-center shadow-xs space-y-2 hover:border-blue-300 transition-all"
                >
                  <span className="text-5xl">{ex.emoji}</span>
                  <h4
                    className={`text-xl text-stone-900 ${
                      boldEnglish ? 'font-black' : 'font-bold'
                    }`}
                  >
                    {ex.word}
                  </h4>
                  {showHindi && (
                    <p className="font-hindi text-sm text-stone-600">
                      {ex.hindi}
                    </p>
                  )}
                  <WordAudioButton text={ex.word} size="sm" />
                </div>
              ))}
            </div>

            {/* Digraphs Section (sh, ch, th, ph, wh) */}
            <div className="bg-indigo-50/70 border-3 border-indigo-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-black text-indigo-950">
                    🤝 Special Digraph Friends (2 Letters = 1 Sound)
                  </h4>
                  <p className="text-xs text-stone-600">
                    When these two letters stand together, they make one brand-new sound!
                  </p>
                </div>
                <span className="px-3 py-1 bg-indigo-200 text-indigo-900 font-bold text-xs rounded-full">
                  5 Key Digraphs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {DIGRAPH_PATTERNS.map((dg) => (
                  <div
                    key={dg.pattern}
                    className="bg-white p-4 rounded-2xl border-2 border-indigo-200 flex flex-col items-center text-center space-y-2 shadow-xs"
                  >
                    <span className="text-4xl">{dg.emoji}</span>
                    <span className="text-2xl font-black text-indigo-700 tracking-tight">
                      /{dg.pattern}/
                    </span>
                    <p className="text-xs font-bold text-stone-900">{dg.example}</p>
                    {showHindi && (
                      <p className="font-hindi text-[11px] text-stone-500">
                        {dg.soundHindi}
                      </p>
                    )}
                    <WordAudioButton text={dg.example} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: SOUND BLENDING (C + A + T -> CAT)
          ======================================================== */}
      {activePhonicsTab === 'blending' && (
        <div className="space-y-6">
          {/* Blend Words Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {BLENDING_LESSONS.map((bl) => {
              const isSelected = selectedBlend.id === bl.id;
              return (
                <button
                  key={bl.id}
                  onClick={() => handleSelectBlend(bl)}
                  className={`px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all border-2 ${
                    isSelected
                      ? 'bg-amber-400 border-amber-500 text-stone-950 shadow-md scale-105'
                      : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-800'
                  }`}
                >
                  <span className="text-xl">{bl.emoji}</span>
                  <span>{bl.word}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Blending Stage */}
          <div className="bg-white rounded-3xl border-3 border-amber-300 p-6 md:p-8 shadow-xl space-y-6 text-center max-w-3xl mx-auto">
            <span className="text-6xl block animate-bounce">{selectedBlend.emoji}</span>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200 px-3 py-1 rounded-full">
                Sound Blending Laboratory
              </span>
              <h3
                className={`text-3xl md:text-4xl text-stone-950 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                {selectedBlend.letters.join(' + ')} = {selectedBlend.word}!
              </h3>
              {showHindi && (
                <p className="font-hindi text-lg font-bold text-stone-600">
                  {selectedBlend.hindiMeaning}
                </p>
              )}
            </div>

            {/* Big Interactive Sound Blocks */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-4">
              {selectedBlend.letters.map((ltr, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-100 border-3 border-amber-300 flex flex-col items-center justify-center shadow-md text-3xl font-black text-stone-900 transform hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => soundEffects.playPop()}
                >
                  <span>{ltr}</span>
                  <span className="text-[10px] font-bold text-amber-800 opacity-70">
                    Step {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Guided Step-by-Step Box */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-left space-y-2">
              <h5 className="text-xs font-black uppercase text-amber-800 tracking-wider">
                Sound by Sound Guide:
              </h5>
              <div className="space-y-1.5">
                {selectedBlend.steps.map((st, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm md:text-base font-semibold text-stone-800">
                    <span className="w-5 h-5 rounded-full bg-amber-300 text-stone-900 text-xs font-black flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Word Sentence */}
            <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-left">
              <div>
                <p
                  className={`text-base text-stone-900 ${
                    boldEnglish ? 'font-black' : 'font-bold'
                  }`}
                >
                  "{selectedBlend.sentence}"
                </p>
                {showHindi && (
                  <p className="font-hindi text-sm text-stone-600">
                    {selectedBlend.hindiSentence}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <WordAudioButton
                  text={selectedBlend.sentence}
                  label="Play Sentence"
                  size="sm"
                />
                <HindiAudioButton
                  text={selectedBlend.hindiSentence}
                  label="हिंदी आवाज़"
                  size="sm"
                />
              </div>
            </div>

            {/* Play Word Aloud Button */}
            <div className="pt-2 flex justify-center">
              <WordAudioButton
                text={selectedBlend.word}
                speechText={selectedBlend.word}
                label={`Blend & Speak "${selectedBlend.word}"`}
                size="lg"
                showSparkle
                className="bg-amber-400 hover:bg-amber-500 text-stone-950"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: SOUND SECRETS (ध्वनि का रहस्य - MOUTH & TONGUE POSITIONS)
          ======================================================== */}
      {activePhonicsTab === 'secrets' && <EnglishSoundSecretsExplorer />}
    </div>
  );
}
