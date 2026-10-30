"use client";

import React, { useState, useMemo } from 'react';
import { GrammarCheatCode } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  KeyRound,
  Filter,
  Search,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

interface GrammarCheatCodeCardProps {
  cheatCodes: GrammarCheatCode[];
  initialCodeId?: string;
  className?: string;
}

export function GrammarCheatCodeCard({
  cheatCodes,
  initialCodeId,
  className = '',
}: GrammarCheatCodeCardProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    if (initialCodeId) {
      const found = cheatCodes.findIndex((c) => c.id === initialCodeId);
      if (found !== -1) return found;
    }
    return 0;
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>(['cc-noun', 'cc-plural-s', 'cc-articles-a-an']);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    cheatCodes.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ['All', ...Array.from(set)];
  }, [cheatCodes]);

  // Filter by category and search query
  const filteredCodes = useMemo(() => {
    return cheatCodes.filter((c) => {
      const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        c.title.toLowerCase().includes(query) ||
        c.hindiTitle.toLowerCase().includes(query) ||
        c.rememberMantra.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.number.toString() === query;
      return matchCategory && matchSearch;
    });
  }, [cheatCodes, selectedCategory, searchQuery]);

  const activeCode = filteredCodes[currentIdx] || filteredCodes[0] || cheatCodes[0];

  const handleNextCode = () => {
    soundEffects.playPop();
    if (currentIdx < filteredCodes.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handlePrevCode = () => {
    soundEffects.playPop();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      setCurrentIdx(filteredCodes.length - 1);
    }
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswerRevealed) return;
    soundEffects.playPop();
    setSelectedOption(opt);
  };

  const handleRevealAnswer = () => {
    if (!selectedOption) return;
    setIsAnswerRevealed(true);
    const isCorrect = selectedOption === activeCode.practiceQuestion.correctAnswer;
    if (isCorrect) {
      soundEffects.playSuccess();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      if (!unlockedCodes.includes(activeCode.id)) {
        setUnlockedCodes((prev) => [...prev, activeCode.id]);
      }
    } else {
      soundEffects.playTryAgain();
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-6 md:p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black tracking-wide border border-white/30">
            <KeyRound className="w-3.5 h-3.5 text-yellow-200" />
            <span>KIDS' GRAMMAR CHEAT CODES • ALL 35 RULES</span>
          </div>

          <h2 className={`text-2xl md:text-4xl drop-shadow ${boldEnglish ? 'font-black tracking-tight' : 'font-bold'}`}>
            Secret Rules & Memory Tricks! ⚡
          </h2>

          <p className="text-sm md:text-base text-white/95 max-w-xl">
            Short, super-memorable cheat codes covering ALL English grammar in both English and Hindi!
          </p>

          {showHindi && (
            <p className="text-xs font-hindi text-amber-100">
              आसान और जादुई फॉर्मूले: नियम, उदाहरण, आम गलतियाँ और सही रूप — हिन्दी व अंग्रेज़ी दोनों में!
            </p>
          )}
        </div>

        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/20 backdrop-blur border-3 border-white/40 flex items-center justify-center text-6xl shadow-inner flex-shrink-0 animate-pulse">
          🗝️
        </div>
      </div>

      {/* 2. Search & Jump Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border-2 border-stone-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIdx(0);
              setSelectedOption(null);
              setIsAnswerRevealed(false);
            }}
            placeholder="Search rules (e.g. Noun, Articles, Plural, Tenses, Preposition)..."
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-bold text-stone-600">
          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
            {filteredCodes.length} of {cheatCodes.length} Rules
          </span>
        </div>
      </div>

      {/* 3. Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-black uppercase text-stone-500 flex items-center gap-1 flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-amber-600" /> Filter:
        </span>
        {categories.map((cat) => {
          const count = cat === 'All' ? cheatCodes.length : cheatCodes.filter((c) => c.category === cat).length;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playPop();
                setSelectedCategory(cat);
                setCurrentIdx(0);
                setSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={`px-3.5 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-400 text-stone-950 shadow-sm ring-2 ring-amber-200 font-black scale-102'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Quick Jump Numbers Bar */}
      {filteredCodes.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-black uppercase text-stone-400 flex-shrink-0 mr-1">
            Jump to:
          </span>
          {filteredCodes.map((code, idx) => (
            <button
              key={code.id}
              onClick={() => {
                soundEffects.playPop();
                setCurrentIdx(idx);
                setSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-black transition-all flex items-center justify-center flex-shrink-0 ${
                currentIdx === idx
                  ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-200 scale-105'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
              }`}
              title={`#${code.number}: ${code.title}`}
            >
              {code.number}
            </button>
          ))}
        </div>
      )}

      {/* 5. The Main Cheat Code Card */}
      {activeCode ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-3 border-amber-300 shadow-bubbly hover:shadow-bubbly-hover transition-all space-y-6">
          {/* Top Badges & Navigation Bar */}
          <div className="flex items-center justify-between border-b-2 border-stone-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-stone-900 rounded-full text-xs font-black">
                Cheat Code #{activeCode.number}
              </span>
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-md text-[11px] font-bold">
                {activeCode.category}
              </span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {activeCode.level}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCode}
                className="p-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 transition-all active:scale-95"
                title="Previous Cheat Code"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-stone-500">
                {currentIdx + 1} of {filteredCodes.length}
              </span>
              <button
                onClick={handleNextCode}
                className="p-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 transition-all active:scale-95"
                title="Next Cheat Code"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Hero & Title */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 p-6 rounded-3xl border-2 border-amber-200">
            <div
              className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br ${activeCode.bgGradient} flex items-center justify-center text-5xl md:text-6xl shadow-md flex-shrink-0`}
            >
              <span className="drop-shadow animate-bounce">{activeCode.heroEmoji}</span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                Super Memory Rule:
              </span>
              <h3 className={`text-2xl md:text-3xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                {activeCode.title}
              </h3>

              {showHindi && (
                <p className="text-base font-hindi font-semibold text-stone-700">
                  {activeCode.hindiTitle}
                </p>
              )}

              {/* Remember Mantra */}
              <div className="p-3 bg-white/90 rounded-2xl border border-amber-300 mt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className={`text-sm md:text-base text-amber-950 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                  👉 Remember: "{activeCode.rememberMantra}"
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <WordAudioButton text={activeCode.rememberMantra} size="sm" showSparkle />
                  {showHindi && (
                    <HindiAudioButton
                      text={activeCode.hindiExplanation}
                      label="हिन्दी सुनें"
                      size="sm"
                    />
                  )}
                </div>
              </div>

              {showHindi && (
                <p className="text-xs md:text-sm font-hindi text-stone-600 pt-1">
                  {activeCode.hindiExplanation}
                </p>
              )}
            </div>
          </div>

          {/* Highlighted Parts / Pattern Formula */}
          {activeCode.highlights && activeCode.highlights.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
                Pattern Formula (जादुई पैटर्न):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {activeCode.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border-2 text-center font-bold text-xs ${hl.color}`}
                  >
                    <span className="block text-[10px] uppercase opacity-75 font-black">{hl.part}</span>
                    <span className="text-xs md:text-sm mt-0.5 block">{hl.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistake vs Correct Rule Box */}
          {activeCode.commonMistake && (
            <div className="p-4 bg-amber-50/70 rounded-2xl border-2 border-amber-200 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Common Mistake vs. Correct Rule (आम गलती और सही नियम):
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Wrong */}
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-700 block">❌ Wrong / गलती:</span>
                    <p className="text-xs md:text-sm font-bold text-rose-950 font-mono">
                      "{activeCode.commonMistake.wrong}"
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-700 block">✅ Right / सही नियम:</span>
                    <p className="text-xs md:text-sm font-bold text-emerald-950 font-mono">
                      "{activeCode.commonMistake.right}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-700 space-y-0.5 pt-1 border-t border-amber-200/60">
                <p className="font-semibold">{activeCode.commonMistake.explanationEnglish}</p>
                {showHindi && (
                  <p className="font-hindi text-stone-600">{activeCode.commonMistake.explanationHindi}</p>
                )}
              </div>
            </div>
          )}

          {/* Real Examples with Spoken Audio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                Click to Listen to Examples (उदाहरण सुनें):
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {activeCode.examples.length} Sentences
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeCode.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-4 bg-stone-50 hover:bg-amber-50 rounded-2xl border-2 border-stone-200 hover:border-amber-300 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    {ex.emoji && <span className="text-2xl block mb-1">{ex.emoji}</span>}
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs md:text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        "{ex.english}"
                      </p>
                      <WordAudioButton
                        text={ex.english}
                        speechText={ex.speechText}
                        size="sm"
                      />
                    </div>
                  </div>

                  {showHindi && (
                    <p className="text-xs font-hindi text-stone-500 pt-1 border-t border-stone-200">
                      {ex.hindi}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Memory Secret Tip */}
          <div className="p-4 bg-purple-50 rounded-2xl border-2 border-purple-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                Kid Secret Memory Tip (जादुई सीक्रेट ट्रिक):
              </span>
              <p className={`text-xs md:text-sm text-purple-950 ${boldEnglish ? 'font-black' : 'font-medium'}`}>
                {activeCode.memoryTrickEnglish}
              </p>
              {showHindi && (
                <p className="text-xs font-hindi text-purple-700">
                  {activeCode.memoryTrickHindi}
                </p>
              )}
            </div>
          </div>

          {/* Interactive Practice Question with Reveal-Answer */}
          <div className="p-5 bg-stone-50 rounded-3xl border-2 border-stone-300 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Quick Practice Test (खुद करके देखें)</span>
              </span>
              <span className="text-[11px] font-bold text-stone-500">
                Try It Yourself!
              </span>
            </div>

            <div>
              <h4 className={`text-sm md:text-base text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                {activeCode.practiceQuestion.promptEnglish}
              </h4>
              {showHindi && (
                <p className="text-xs font-hindi text-stone-500 mt-0.5">
                  {activeCode.practiceQuestion.promptHindi}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-2.5">
              {activeCode.practiceQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === activeCode.practiceQuestion.correctAnswer;

                let btnClass = 'bg-white border-stone-200 text-stone-800 hover:bg-amber-50';
                if (isSelected && !isAnswerRevealed) {
                  btnClass = 'bg-amber-300 border-amber-500 text-stone-950 font-black ring-2 ring-amber-200';
                } else if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnClass = 'bg-rose-100 border-rose-400 text-rose-950';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswerRevealed}
                    className={`px-5 py-2.5 rounded-2xl border-2 text-xs md:text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2 ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {/* Action to check or reveal */}
            <div className="flex items-center justify-between pt-2">
              {!isAnswerRevealed ? (
                <button
                  onClick={handleRevealAnswer}
                  disabled={!selectedOption}
                  className={`px-6 py-2.5 rounded-2xl font-black text-xs transition-all ${
                    selectedOption
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <div className="space-y-1 w-full">
                  <div className="p-3 bg-emerald-100 rounded-2xl border border-emerald-300 text-xs">
                    <span className="font-bold text-emerald-950 block">
                      🎉 Correct Answer: <span className="underline">{activeCode.practiceQuestion.correctAnswer}</span>
                    </span>
                    <p className="text-emerald-900 mt-0.5">
                      {activeCode.practiceQuestion.explanationEnglish}
                    </p>
                    {showHindi && (
                      <p className="font-hindi text-emerald-800 text-[11px] mt-0.5">
                        {activeCode.practiceQuestion.explanationHindi}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextCode}
                      className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-2xl shadow-md transition-all active:scale-95 animate-pulse"
                    >
                      <span>Next Cheat Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-stone-200 space-y-3">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-stone-700">No cheat codes found for "{searchQuery}"</h3>
          <p className="text-xs text-stone-500">Try searching another grammar keyword or clear your filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-amber-400 text-stone-900 font-bold text-xs rounded-xl hover:bg-amber-500"
          >
            Show All 35 Cheat Codes
          </button>
        </div>
      )}
    </div>
  );
}
