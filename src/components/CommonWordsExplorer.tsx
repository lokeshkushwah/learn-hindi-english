"use client";

import React, { useState, useMemo } from 'react';
import { COMMON_DAILY_WORDS, CommonWordItem } from '@/data/commonDailyWords';
import raw5000Words from '@/data/common5000Words.json';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/context/LanguageContext';
import {
  Volume2,
  Sparkles,
  Search,
  BookOpen,
  Gamepad2,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Filter,
} from 'lucide-react';

export interface WordItem5000 {
  id: string;
  word: string;
  hindiMeaning: string;
  pronunciationHindi: string;
  category: string;
  categoryLabelEnglish: string;
  categoryLabelHindi: string;
  partOfSpeech: string;
  level: string;
  emoji: string;
  exampleSentenceEnglish: string;
  exampleSentenceHindi: string;
}

const ALL_5000_WORDS = raw5000Words as WordItem5000[];

type FilterCategoryCore =
  | 'all'
  | 'pronoun'
  | 'helper-verb'
  | 'pointer'
  | 'daily-action'
  | 'polite-chat'
  | 'preposition';

interface CommonWordsExplorerProps {
  onBackToDashboard?: () => void;
}

const ALPHABET_LETTERS = [
  'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export function CommonWordsExplorer({ onBackToDashboard }: CommonWordsExplorerProps) {
  const { boldEnglish, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();
  const { speakEnglish, speakHindi } = useSpeech();

  // Mode: Core 50 vs 5,000 Mega Bank
  const [activeMode, setActiveMode] = useState<'core50' | 'bank5000'>('core50');

  // --- STATE FOR CORE 50 ---
  const [activeCoreCategory, setActiveCoreCategory] = useState<FilterCategoryCore>('all');
  const [searchQueryCore, setSearchQueryCore] = useState('');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // --- STATE FOR 5,000 WORDS BANK ---
  const [searchQuery5000, setSearchQuery5000] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedCategory5000, setSelectedCategory5000] = useState('all');
  const [selectedLevel5000, setSelectedLevel5000] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 48;

  // Filtered Core 50
  const filteredCoreWords = useMemo(() => {
    return COMMON_DAILY_WORDS.filter((item) => {
      const matchesCategory =
        activeCoreCategory === 'all' || item.category === activeCoreCategory;
      const q = searchQueryCore.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.word.toLowerCase().includes(q) ||
        item.hindiMeaning.toLowerCase().includes(q) ||
        item.pronunciationHindi.toLowerCase().includes(q) ||
        item.exampleSentenceEnglish.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCoreCategory, searchQueryCore]);

  // Quiz items
  const quizList = useMemo(() => {
    return [...COMMON_DAILY_WORDS].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [isQuizMode]);

  const currentQuizItem = quizList[quizIndex] || quizList[0];

  const quizOptions = useMemo(() => {
    if (!currentQuizItem) return [];
    const wrong = COMMON_DAILY_WORDS.filter((w) => w.id !== currentQuizItem.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((w) => w.hindiMeaning);
    const all = [currentQuizItem.hindiMeaning, ...wrong];
    return all.sort(() => 0.5 - Math.random());
  }, [currentQuizItem]);

  const handleSelectQuizOption = (opt: string) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(opt);
    setQuizSubmitted(true);
    if (opt === currentQuizItem.hindiMeaning) {
      soundEffects.playSuccess();
      setQuizScore((s) => s + 1);
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < quizList.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedQuizOption(null);
      setQuizSubmitted(false);
    } else {
      soundEffects.playCelebration();
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // 5,000 Category metadata map
  const categories5000List = useMemo(() => {
    const set = new Set<string>();
    ALL_5000_WORDS.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered 5,000 Words
  const filtered5000Words = useMemo(() => {
    const q = searchQuery5000.toLowerCase().trim();
    return ALL_5000_WORDS.filter((it) => {
      // Search
      if (q) {
        const matchesWord = it.word.toLowerCase().includes(q);
        const matchesHindi = it.hindiMeaning.toLowerCase().includes(q);
        const matchesPron = it.pronunciationHindi?.toLowerCase().includes(q);
        if (!matchesWord && !matchesHindi && !matchesPron) return false;
      }
      // Letter
      if (selectedLetter !== 'ALL') {
        if (!it.word.toUpperCase().startsWith(selectedLetter)) return false;
      }
      // Category
      if (selectedCategory5000 !== 'all' && it.category !== selectedCategory5000) {
        return false;
      }
      // Level
      if (selectedLevel5000 !== 'all' && it.level !== selectedLevel5000) {
        return false;
      }
      return true;
    });
  }, [searchQuery5000, selectedLetter, selectedCategory5000, selectedLevel5000]);

  // Pagination calculation
  const totalPages = Math.ceil(filtered5000Words.length / ITEMS_PER_PAGE) || 1;
  const paginatedWords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered5000Words.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered5000Words, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      soundEffects.playPop();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const coreCategoryChips: { id: FilterCategoryCore; labelEn: string; labelHi: string; emoji: string }[] = [
    { id: 'all', labelEn: 'All Words', labelHi: 'सभी शब्द (50)', emoji: '🌟' },
    { id: 'pronoun', labelEn: 'Pronouns', labelHi: 'सर्वनाम (He, She, You...)', emoji: '👉' },
    { id: 'helper-verb', labelEn: 'Helping Verbs', labelHi: 'सहायक शब्द (Is, Will, Can...)', emoji: '⚡' },
    { id: 'pointer', labelEn: 'Pointers', labelHi: 'इशारे (This, That, These...)', emoji: '📍' },
    { id: 'daily-action', labelEn: 'Daily Actions', labelHi: 'दैनिक काम (Go, Eat, Play...)', emoji: '🏃' },
    { id: 'polite-chat', labelEn: 'Polite & Chat', labelHi: 'बातचीत (Hello, Please, Thanks...)', emoji: '💬' },
    { id: 'preposition', labelEn: 'Where Words', labelHi: 'स्थिति (In, On, Under, To...)', emoji: '📦' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 1. Hero Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider">
              <span>🗣️ Daily English Vocabulary Bank</span>
              <span>•</span>
              <span>5,000 Words With Hindi & Audio</span>
            </div>
            <h2
              className={`text-3xl md:text-5xl drop-shadow ${
                boldEnglish ? 'font-black' : 'font-bold'
              }`}
            >
              50 Daily Words & 5,000 Vocabulary Bank
            </h2>
            <p className="text-amber-100 font-hindi text-lg md:text-xl font-medium">
              रोज़ बोले जाने वाले 50 सबसे ज़रूरी शब्द (नियम और आवाज़ सहित) और 5,000 संपूर्ण शब्दकोश!
            </p>
            <p className="text-white/90 text-sm">
              Explore 50 foundational words with speaking rules in Hindi/English, or search through all 5,000 everyday words with clear pronunciations!
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-stone-900/40 p-1.5 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveMode('core50');
              }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 ${
                activeMode === 'core50'
                  ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-white scale-102'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <span>🌟 50 Core Words</span>
              <span className="text-[10px] bg-amber-900/40 text-amber-100 px-1.5 py-0.5 rounded-full">
                Rules & Help
              </span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveMode('bank5000');
              }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 ${
                activeMode === 'bank5000'
                  ? 'bg-rose-400 text-stone-950 shadow-md ring-2 ring-white scale-102'
                  : 'text-rose-200 hover:text-white'
              }`}
            >
              <span>📚 5,000 Words Bank</span>
              <span className="text-[10px] bg-rose-950/40 text-rose-100 px-1.5 py-0.5 rounded-full">
                Full Bank
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODE 1: 50 CORE DAILY WORDS WITH SOUND RULES & QUIZ
          ======================================================== */}
      {activeMode === 'core50' && (
        <div className="space-y-6">
          {/* Top Bar: Practice Quiz Toggle */}
          <div className="flex items-center justify-between bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-amber-950 text-sm md:text-base">
                  50 Spoken English Foundations (नियम और बोलकर अभ्यास)
                </h4>
                <p className="text-xs text-amber-800 font-hindi">
                  हर कार्ड में नियम हिंदी और अंग्रेजी दोनों में बोलकर सुनें!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                setIsQuizMode(!isQuizMode);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs md:text-sm shadow-md transition-all ${
                isQuizMode
                  ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400'
                  : 'bg-stone-900 text-amber-300 hover:bg-black'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>{isQuizMode ? '📖 Explore 50 Words' : '🎮 Play Meaning Quiz'}</span>
            </button>
          </div>

          {/* Quiz Mode */}
          {isQuizMode ? (
            <div className="bg-white rounded-3xl border-3 border-amber-300 p-6 md:p-8 shadow-xl max-w-2xl mx-auto space-y-6 text-center animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Question {quizIndex + 1} of {quizList.length}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>Score: {quizScore}</span>
                </div>
              </div>

              {/* Flashcard to test */}
              <div className="space-y-3">
                <span className="text-7xl block animate-bounce">{currentQuizItem.emoji}</span>
                <div className="inline-block px-4 py-1.5 bg-amber-100 rounded-2xl">
                  <h3 className="text-4xl md:text-5xl font-black text-stone-900 tracking-wide">
                    {currentQuizItem.word}
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <WordAudioButton
                    text={currentQuizItem.word}
                    speechText={currentQuizItem.word}
                    size="md"
                    label="Listen English"
                  />
                </div>
                <p className="text-stone-700 font-semibold text-base">
                  What does <span className="text-amber-600 font-bold">"{currentQuizItem.word}"</span> mean in Hindi?
                </p>
                <p className="text-stone-500 font-hindi text-sm">
                  "{currentQuizItem.word}" का सही हिंदी अर्थ क्या है?
                </p>
              </div>

              {/* 3 Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-3 max-w-md mx-auto pt-2">
                {quizOptions.map((opt, i) => {
                  const isSelected = selectedQuizOption === opt;
                  const isCorrect = opt === currentQuizItem.hindiMeaning;
                  return (
                    <button
                      key={i}
                      disabled={quizSubmitted}
                      onClick={() => handleSelectQuizOption(opt)}
                      className={`p-4 rounded-2xl font-hindi text-lg font-bold border-3 transition-all flex items-center justify-between ${
                        quizSubmitted
                          ? isCorrect
                            ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                            : isSelected
                            ? 'bg-rose-500 border-rose-600 text-white'
                            : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
                          : 'bg-white hover:bg-amber-50 border-amber-200 text-stone-800 hover:border-amber-400 active:scale-98'
                      }`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {quizSubmitted && (
                <div className="space-y-4 pt-2 animate-in fade-in">
                  <div
                    className={`p-4 rounded-2xl text-sm font-semibold ${
                      selectedQuizOption === currentQuizItem.hindiMeaning
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    <p className="font-bold">
                      {selectedQuizOption === currentQuizItem.hindiMeaning
                        ? '🎉 Excellent! बिलकुल सही जवाब!'
                        : `💡 Keep learning! "${currentQuizItem.word}" means: ${currentQuizItem.hindiMeaning}`}
                    </p>
                    <p className="text-xs text-stone-600 mt-1 font-hindi">
                      उदाहरण: {currentQuizItem.exampleSentenceEnglish} ({currentQuizItem.exampleSentenceHindi})
                    </p>
                    <div className="mt-2 pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-xs font-hindi">
                      <span className="font-bold text-amber-950">
                        💡 नियम: {currentQuizItem.usageRuleHindi}
                      </span>
                      <HindiAudioButton
                        text={currentQuizItem.usageRuleHindi}
                        speechText={currentQuizItem.usageRuleHindi}
                        size="sm"
                        label="नियम सुनें"
                        className="flex-shrink-0"
                      />
                    </div>
                  </div>

                  {quizIndex < quizList.length - 1 ? (
                    <button
                      onClick={handleNextQuiz}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-2xl shadow-md inline-flex items-center gap-2 transition-all hover:scale-102"
                    >
                      <span>Next Word (अगला शब्द)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-lg font-black text-amber-800">
                        🏆 Quiz Complete! You scored {quizScore} out of {quizList.length}!
                      </p>
                      <button
                        onClick={handleRestartQuiz}
                        className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-stone-900 font-black rounded-2xl shadow-md inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Play Again (फिर से खेलें)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Cards View */
            <div className="space-y-6">
              {/* Controls: Search Bar & Filter Chips */}
              <div className="bg-white rounded-3xl p-5 border-3 border-amber-200 shadow-sm space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    value={searchQueryCore}
                    onChange={(e) => setSearchQueryCore(e.target.value)}
                    placeholder="Search 50 core words (e.g. You, He, Will, तुम, खाना)..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-stone-50 border-2 border-stone-200 focus:border-amber-400 focus:bg-white text-stone-900 font-medium placeholder-stone-400 outline-none transition-all"
                  />
                  {searchQueryCore && (
                    <button
                      onClick={() => setSearchQueryCore('')}
                      className="absolute right-4 top-3.5 text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-0.5 rounded-full"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {coreCategoryChips.map((chip) => {
                    const isActive = activeCoreCategory === chip.id;
                    return (
                      <button
                        key={chip.id}
                        onClick={() => {
                          soundEffects.playPop();
                          setActiveCoreCategory(chip.id);
                        }}
                        className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <span>{chip.emoji}</span>
                        <span>{chip.labelEn}</span>
                        <span className="font-hindi text-[11px] opacity-80 hidden sm:inline">
                          ({chip.labelHi})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between px-2 text-xs font-bold text-stone-500">
                <span>Showing {filteredCoreWords.length} Core Spoken Words</span>
                <span>💡 Click rules to hear spoken Hindi & English explanation!</span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCoreWords.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => speakEnglish(item.word)}
                    className="cursor-pointer bg-white border-3 border-amber-200 hover:border-amber-400 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:scale-102 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.bgGradient} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <span>{item.emoji}</span>
                      </div>

                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
                        {item.categoryLabelEnglish}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <h3
                          className={`text-2xl md:text-3xl text-stone-900 ${
                            boldEnglish ? 'font-black' : 'font-bold'
                          }`}
                        >
                          {item.word}
                        </h3>
                        <span className="text-xs font-bold text-amber-700 font-hindi">
                          [{item.pronunciationHindi}]
                        </span>
                      </div>

                      <p className="font-hindi text-lg font-black text-amber-800">
                        {item.hindiMeaning}
                      </p>
                    </div>

                    {/* Rule Help Box */}
                    <div
                      className="bg-amber-50/90 hover:bg-amber-100/90 border border-amber-300 rounded-2xl p-3 space-y-2 transition-all shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span>💡</span>
                          <span>प्रयोग का नियम (Rule Help):</span>
                        </span>

                        <div className="flex items-center gap-1">
                          <HindiAudioButton
                            text={item.usageRuleHindi}
                            speechText={item.usageRuleHindi}
                            size="sm"
                            label="नियम सुनें (Hindi)"
                            className="text-[10px] py-0.5 px-2 font-bold"
                          />
                          {item.usageRuleEnglish && (
                            <WordAudioButton
                              text={item.usageRuleEnglish}
                              speechText={item.usageRuleEnglish}
                              size="sm"
                              label="English Rule"
                              className="text-[10px] py-0.5 px-2 font-bold bg-white"
                            />
                          )}
                        </div>
                      </div>

                      <p className="font-hindi text-xs font-bold text-stone-900 leading-snug">
                        👉 {item.usageRuleHindi}
                      </p>

                      {item.usageRuleEnglish && (
                        <p className="text-[11px] font-medium text-stone-700 leading-snug font-sans bg-white/70 p-1.5 rounded-lg border border-amber-200/60">
                          💬 "{item.usageRuleEnglish}"
                        </p>
                      )}
                    </div>

                    {/* Sentence */}
                    <div
                      className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-stone-800">
                          "{item.exampleSentenceEnglish}"
                        </p>
                        <WordAudioButton
                          text={item.exampleSentenceEnglish}
                          speechText={item.exampleSentenceEnglish}
                          size="sm"
                        />
                      </div>

                      {showHindi && (
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200">
                          <p className="text-xs font-hindi text-stone-600">
                            {item.exampleSentenceHindi}
                          </p>
                          <HindiAudioButton text={item.exampleSentenceHindi} size="sm" />
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div
                      className="flex items-center gap-2 pt-2 border-t border-stone-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WordAudioButton
                        text={item.word}
                        speechText={item.word}
                        size="sm"
                        label="English"
                        className="flex-1 justify-center bg-amber-50 hover:bg-amber-100 border-amber-300 font-bold"
                      />
                      {showHindi && (
                        <HindiAudioButton
                          text={item.hindiMeaning}
                          size="sm"
                          label="हिंदी अर्थ"
                          className="flex-1 justify-center"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          MODE 2: 5,000 WORDS MEGA VOCABULARY BANK
          ======================================================== */}
      {activeMode === 'bank5000' && (
        <div className="space-y-6">
          {/* Controls Panel */}
          <div className="bg-white rounded-3xl p-5 border-3 border-rose-200 shadow-sm space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery5000}
                onChange={(e) => {
                  setSearchQuery5000(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search across 5,000 words (e.g. Apple, School, Solar, पानी, किताब, डाकिया)..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-stone-50 border-2 border-stone-200 focus:border-rose-400 focus:bg-white text-stone-900 font-medium placeholder-stone-400 outline-none transition-all"
              />
              {searchQuery5000 && (
                <button
                  onClick={() => {
                    setSearchQuery5000('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-4 top-3.5 text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>

            {/* A to Z Filter Bar */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Alphabet Quick Jump (A–Z):
              </span>
              <div className="flex flex-wrap items-center gap-1 overflow-x-auto pb-1">
                {ALPHABET_LETTERS.map((letter) => {
                  const isSel = selectedLetter === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedLetter(letter);
                        setCurrentPage(1);
                      }}
                      className={`px-2 py-1 text-xs font-black rounded-lg transition-all ${
                        isSel
                          ? 'bg-rose-500 text-white shadow ring-2 ring-rose-300 scale-105'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories & Level Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-rose-500" />
                  Category:
                </span>
                <select
                  value={selectedCategory5000}
                  onChange={(e) => {
                    setSelectedCategory5000(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 outline-none focus:border-rose-400"
                >
                  <option value="all">All 20+ Categories</option>
                  {categories5000List.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600">Level:</span>
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                  {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedLevel5000(lvl);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        selectedLevel5000 === lvl
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {lvl === 'all' ? 'All' : lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Controls Top */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-bold text-stone-600">
            <div>
              Found <span className="text-rose-600 font-black">{filtered5000Words.length}</span> words{' '}
              (Page {currentPage} of {totalPages})
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-lg text-stone-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 rounded text-rose-700 font-black">
                {currentPage}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-lg text-stone-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5,000 Words Grid (48 per page) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedWords.map((item) => (
              <div
                key={item.id}
                onClick={() => speakEnglish(item.word)}
                className="cursor-pointer bg-white border-2 border-stone-200 hover:border-rose-400 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-101 transition-all flex flex-col justify-between gap-3 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl p-1 bg-rose-50 rounded-xl group-hover:scale-110 transition-transform">
                    {item.emoji || '📖'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                      {item.partOfSpeech || 'Noun'}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded-md">
                      {item.level}
                    </span>
                  </div>
                </div>

                {/* Word & Hindi */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl font-black text-stone-900 group-hover:text-rose-600 transition-colors">
                      {item.word}
                    </h4>
                    <span className="text-[11px] font-bold text-amber-700 font-hindi">
                      [{item.pronunciationHindi}]
                    </span>
                  </div>
                  <p className="font-hindi text-base font-bold text-stone-800 line-clamp-1">
                    {item.hindiMeaning}
                  </p>
                </div>

                {/* Example Sentences */}
                <div
                  className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 space-y-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] font-semibold text-stone-700 line-clamp-2">
                      "{item.exampleSentenceEnglish}"
                    </p>
                    <WordAudioButton
                      text={item.exampleSentenceEnglish}
                      speechText={item.exampleSentenceEnglish}
                      size="sm"
                    />
                  </div>
                  {showHindi && item.exampleSentenceHindi && (
                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-stone-200">
                      <p className="text-[11px] font-hindi text-stone-500 line-clamp-2">
                        {item.exampleSentenceHindi}
                      </p>
                      <HindiAudioButton text={item.exampleSentenceHindi} size="sm" />
                    </div>
                  )}
                </div>

                {/* Audio Buttons */}
                <div
                  className="flex items-center gap-1.5 pt-1 border-t border-stone-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WordAudioButton
                    text={item.word}
                    speechText={item.word}
                    size="sm"
                    label="English"
                    className="flex-1 justify-center bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-900 font-bold text-xs py-1"
                  />
                  {showHindi && (
                    <HindiAudioButton
                      text={item.hindiMeaning}
                      size="sm"
                      label="हिंदी"
                      className="flex-1 justify-center text-xs py-1"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls Bottom */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-xl text-xs font-bold text-stone-800 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, idx) => {
                  let p = idx + 1;
                  if (totalPages > 7) {
                    if (currentPage > 4 && currentPage < totalPages - 3) {
                      p = currentPage - 3 + idx;
                    } else if (currentPage >= totalPages - 3) {
                      p = totalPages - 6 + idx;
                    }
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                        currentPage === p
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-xl text-xs font-bold text-stone-800 flex items-center gap-1"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
