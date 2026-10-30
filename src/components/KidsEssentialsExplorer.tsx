"use client";

import React, { useState, useMemo } from 'react';
import {
  DAYS_OF_WEEK,
  MONTHS_OF_YEAR,
  FRUITS_LIST,
  VEGETABLES_LIST,
  NUMBER_SCALES,
  numberToInternationalWords,
  numberToIndianWords,
  numberToHindiWords,
  formatInternational,
  formatIndian,
  DayOfWeekItem,
  MonthItem,
  FruitItem,
  VegetableItem,
} from '@/data/kidsEssentials';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/context/LanguageContext';
import {
  Calendar,
  Sun,
  Apple,
  Carrot,
  Binary,
  Volume2,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Heart,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface KidsEssentialsExplorerProps {
  onBackToDashboard?: () => void;
}

type EssentialTab = 'months' | 'days' | 'fruits' | 'vegetables' | 'numbers';

export function KidsEssentialsExplorer({ onBackToDashboard }: KidsEssentialsExplorerProps) {
  const { boldEnglish, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();
  const { speakEnglish, speakHindi } = useSpeech();

  const [activeTab, setActiveTab] = useState<EssentialTab>('months');

  // Interactive Number Converter State
  const [inputNumberStr, setInputNumberStr] = useState<string>('1525000');

  const numericValue = useMemo(() => {
    const clean = inputNumberStr.replace(/[^0-9]/g, '');
    if (!clean) return 0;
    const n = parseInt(clean, 10);
    return isNaN(n) ? 0 : Math.min(n, 999999999999);
  }, [inputNumberStr]);

  const convertedInternational = useMemo(() => {
    return numberToInternationalWords(numericValue);
  }, [numericValue]);

  const convertedIndian = useMemo(() => {
    return numberToIndianWords(numericValue);
  }, [numericValue]);

  const convertedHindi = useMemo(() => {
    return numberToHindiWords(numericValue);
  }, [numericValue]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 1. Hero Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider">
            <span>🎒 Kids Essential Foundations • बुनियादी ज्ञान</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl drop-shadow ${boldEnglish ? 'font-black' : 'font-bold'}`}>
            Kids Essentials (महीने, दिन, फल, सब्जियां व संख्याएं)
          </h2>
          <p className="text-amber-100 font-hindi text-base sm:text-lg font-medium">
            साल के 12 महीने, सप्ताह के 7 दिन, मीठे फल, पौष्टिक सब्जियां और 1 से 1 अरब (Billion) तक संख्याओं को शब्दों में लिखना सीखें!
          </p>
        </div>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-sm max-w-fit mx-auto">
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('months');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'months'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-700" />
          <span>🗓️ 12 Months (महीने)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('days');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'days'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-700" />
          <span>📅 7 Days (दिन)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('fruits');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'fruits'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <Apple className="w-4 h-4 text-rose-600" />
          <span>🍎 Fruits (फल)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('vegetables');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'vegetables'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <Carrot className="w-4 h-4 text-orange-600" />
          <span>🥕 Vegetables (सब्जियां)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('numbers');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'numbers'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <Binary className="w-4 h-4 text-indigo-700" />
          <span>🔢 Numbers 1 to Billion</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: MONTHS OF THE YEAR (12 महीने)
          ======================================================== */}
      {activeTab === 'months' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Knuckle Trick Banner (हाथ की मुट्ठी का जादुई नियम) */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 text-left space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-blue-900 font-black text-base sm:text-lg">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>The Hand Knuckle Trick (मुट्ठी से 31 दिनों वाले महीने याद रखने का नियम) ✊</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-hindi leading-relaxed">
              अपनी मुट्ठी बंद करें: जो महीना <strong>ऊँचे पोर (Knuckle Ridge)</strong> पर आता है, उसमें पूरे <strong>31 दिन</strong> होते हैं (January, March, May, July, August, October, December)। जो महीना <strong>गड्ढे (Valley)</strong> में आता है, उसमें <strong>30 दिन</strong> होते हैं (और February में 28 या 29 दिन)!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONTHS_OF_YEAR.map((m: MonthItem) => (
              <div
                key={m.id}
                className={`p-5 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 bg-white border-amber-200`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
                        {m.emoji}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Month {m.monthNumber}
                          </span>
                          {m.isKnuckleHigh && (
                            <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                              ✊ 31 Days
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-stone-900 mt-0.5">
                          {m.nameEnglish}
                        </h4>
                        <span className="text-xs font-hindi text-stone-600 font-bold block">
                          {m.nameHindi} [{m.pronunciationHindi}]
                        </span>
                      </div>
                    </div>

                    <WordAudioButton text={m.nameEnglish} speechText={m.audioPhrase} size="sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-stone-100">
                    <div className="bg-stone-50 p-2 rounded-xl">
                      <span className="text-[10px] font-black uppercase text-stone-400 block">Season (मौसम)</span>
                      <span className="font-hindi font-bold text-stone-800">{m.seasonHindi}</span>
                    </div>
                    <div className="bg-stone-50 p-2 rounded-xl">
                      <span className="text-[10px] font-black uppercase text-stone-400 block">Festival (पर्व)</span>
                      <span className="font-hindi font-bold text-stone-800">{m.festivalHindi}</span>
                    </div>
                  </div>

                  <p className="text-xs font-hindi text-stone-600 bg-amber-50/60 p-2 rounded-xl">
                    🌟 <strong>रोचक तथ्य:</strong> {m.funFactHindi}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-mono font-black text-amber-800">{m.daysCount} Days</span>
                  <HindiAudioButton text={`${m.nameHindi}, ${m.daysCount} दिन, ${m.seasonHindi}`} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: DAYS OF THE WEEK (7 दिन)
          ======================================================== */}
      {activeTab === 'days' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS_OF_WEEK.map((d: DayOfWeekItem) => (
              <div
                key={d.id}
                className="p-5 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 bg-white border-amber-200"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
                        {d.emoji}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Day {d.dayNumber}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              d.isWeekend
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {d.isWeekend ? '🎉 Weekend / छुट्टी' : '🎒 School Day'}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-stone-900 mt-0.5">
                          {d.nameEnglish}
                        </h4>
                        <span className="text-xs font-hindi text-stone-600 font-bold block">
                          {d.nameHindi} [{d.pronunciationHindi}]
                        </span>
                      </div>
                    </div>

                    <WordAudioButton text={d.nameEnglish} speechText={d.audioPhrase} size="sm" />
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-2xl text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-stone-400 block font-hindi">
                      स्कूल दिनचर्या (School Routine)
                    </span>
                    <p className="font-hindi font-bold text-stone-800">{d.schoolRoutineHindi}</p>
                  </div>

                  <div className="bg-amber-50 p-2.5 rounded-2xl text-xs space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-amber-800 font-hindi">
                      🎶 याद रखने की तुकबंदी (Rhyme)
                    </span>
                    <p className="font-semibold text-stone-800 italic">"{d.rhyme}"</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-hindi text-[11px] text-stone-500">{d.kidTipHindi}</span>
                  <HindiAudioButton text={`${d.nameHindi}, ${d.schoolRoutineHindi}`} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: FRUITS (मीठे व रसीले फल)
          ======================================================== */}
      {activeTab === 'fruits' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FRUITS_LIST.map((f: FruitItem) => (
              <div
                key={f.id}
                className="p-5 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 bg-white border-rose-200"
              >
                <div className="space-y-2 text-center">
                  <span className="w-16 h-16 mx-auto rounded-3xl bg-rose-50 flex items-center justify-center text-4xl shadow-inner">
                    {f.emoji}
                  </span>

                  <div>
                    <h4 className="text-lg font-black text-stone-900">{f.nameEnglish}</h4>
                    <span className="text-xs font-hindi text-rose-800 font-bold block">
                      {f.nameHindi} [{f.pronunciationHindi}]
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <WordAudioButton text={f.nameEnglish} size="sm" />
                    <HindiAudioButton text={f.nameHindi} size="sm" />
                  </div>

                  <div className="bg-stone-50 p-2 rounded-xl text-left text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-stone-400 block font-hindi">
                      स्वाद व सुपरपावर (Taste & Superpower)
                    </span>
                    <p className="font-hindi text-stone-800 text-[11px]">
                      😋 {f.tasteHindi} • 💪 {f.superpowerHindi}
                    </p>
                  </div>

                  <p className="text-[11px] text-stone-600 italic bg-amber-50/60 p-2 rounded-xl text-left">
                    "{f.sentenceEnglish}"
                    <span className="block font-hindi text-stone-700 not-italic font-medium mt-0.5">
                      {f.sentenceHindi}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: VEGETABLES (सेहतमंद सब्जियां)
          ======================================================== */}
      {activeTab === 'vegetables' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VEGETABLES_LIST.map((v: VegetableItem) => (
              <div
                key={v.id}
                className="p-5 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 bg-white border-emerald-200"
              >
                <div className="space-y-2 text-center">
                  <span className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 flex items-center justify-center text-4xl shadow-inner">
                    {v.emoji}
                  </span>

                  <div>
                    <h4 className="text-lg font-black text-stone-900">{v.nameEnglish}</h4>
                    <span className="text-xs font-hindi text-emerald-800 font-bold block">
                      {v.nameHindi} [{v.pronunciationHindi}]
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <WordAudioButton text={v.nameEnglish} size="sm" />
                    <HindiAudioButton text={v.nameHindi} size="sm" />
                  </div>

                  <div className="bg-stone-50 p-2 rounded-xl text-left text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-stone-400 block font-hindi">
                      सेहत लाभ (Health Benefit)
                    </span>
                    <p className="font-hindi text-stone-800 text-[11px]">
                      💪 {v.healthBenefitHindi}
                    </p>
                    <p className="font-hindi text-stone-600 text-[10px]">
                      🍳 {v.cookingStyleHindi}
                    </p>
                  </div>

                  <p className="text-[11px] text-stone-600 italic bg-emerald-50/50 p-2 rounded-xl text-left">
                    "{v.sentenceEnglish}"
                    <span className="block font-hindi text-stone-700 not-italic font-medium mt-0.5">
                      {v.sentenceHindi}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: NUMBERS 1 TO BILLION & INTERACTIVE CONVERTER
          ======================================================== */}
      {activeTab === 'numbers' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Interactive Real-Time Number to Words Converter */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-3 border-indigo-300 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full text-xs font-black uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Real-time Voice Converter • संख्या से शब्द परिवर्तक</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  Write ANY Number: 1 to 999 Billion / Arab 🔢
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-hindi">
                  कोई भी संख्या लिखें, यह तुरंत International (Million/Billion), Indian (Lakh/Crore) और हिंदी शब्दों में बोलकर सुनाएगा!
                </p>
              </div>

              {/* Quick Sample Numbers */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[7, 45, 100, 1500, 100000, 1000000, 1000000000].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      soundEffects.playPop();
                      setInputNumberStr(String(num));
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-mono font-bold text-indigo-900 transition-all cursor-pointer"
                  >
                    {num.toLocaleString('en-US')}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box */}
            <div className="max-w-xl mx-auto space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600 block">
                Enter Number (संख्या दर्ज करें):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputNumberStr}
                  onChange={(e) => setInputNumberStr(e.target.value)}
                  placeholder="e.g. 1500000"
                  className="w-full text-2xl sm:text-4xl font-mono font-black text-center text-indigo-950 bg-white border-3 border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-2xl py-3 px-4 shadow-inner outline-none transition-all"
                />
              </div>
            </div>

            {/* Conversion Display Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Card 1: International System (Million / Billion) */}
              <div className="bg-white rounded-2xl p-5 border-2 border-indigo-200 shadow-sm space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    🌍 International System
                  </span>
                  <WordAudioButton text={convertedInternational} size="sm" />
                </div>
                <div className="font-mono text-sm text-stone-500 font-bold">
                  Format: {formatInternational(numericValue)}
                </div>
                <p className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                  “{convertedInternational}”
                </p>
                <span className="text-[11px] text-stone-500 block font-hindi">
                  (Million और Billion में 3-3 अंकों पर कॉमा लगता है)
                </span>
              </div>

              {/* Card 2: Indian Number System (Lakh / Crore) */}
              <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    🇮🇳 Indian System
                  </span>
                  <WordAudioButton text={convertedIndian} size="sm" />
                </div>
                <div className="font-mono text-sm text-stone-500 font-bold">
                  Format: {formatIndian(numericValue)}
                </div>
                <p className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                  “{convertedIndian}”
                </p>
                <span className="text-[11px] text-stone-500 block font-hindi">
                  (Lakh और Crore में पहले 3 अंक, फिर 2-2 अंकों पर कॉमा)
                </span>
              </div>

              {/* Card 3: Hindi Words (देवनागरी उच्चारण) */}
              <div className="bg-white rounded-2xl p-5 border-2 border-rose-200 shadow-sm space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-hindi">
                    🗣️ हिंदी में शब्द
                  </span>
                  <HindiAudioButton text={convertedHindi} size="sm" />
                </div>
                <div className="font-mono text-sm text-stone-500 font-bold">
                  हिंदी गणना
                </div>
                <p className="text-base sm:text-lg font-black font-hindi text-stone-900 leading-snug">
                  “{convertedHindi}”
                </p>
                <span className="text-[11px] text-stone-500 block font-hindi">
                  (लाख, करोड़, अरब का शुद्ध उच्चारण)
                </span>
              </div>
            </div>
          </div>

          {/* Scale Reference Guide (1 to 1 Billion Comparison Table) */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 space-y-4 shadow-sm text-left">
            <h4 className="font-black text-stone-900 text-lg flex items-center gap-2">
              <Binary className="w-5 h-5 text-indigo-600" />
              <span>Indian vs International Number Scales Reference Table</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead>
                  <tr className="border-b-2 border-stone-200 text-stone-500 uppercase text-[11px]">
                    <th className="py-2.5 px-3">Digits</th>
                    <th className="py-2.5 px-3">International (Million/Billion)</th>
                    <th className="py-2.5 px-3">Indian (Lakh/Crore)</th>
                    <th className="py-2.5 px-3">Real World Example</th>
                    <th className="py-2.5 px-3 text-right">Listen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {NUMBER_SCALES.map((s, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-stone-900">
                        {String(s.scaleValue)}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-black text-indigo-900">{s.nameInternational}</span>
                        <span className="text-xs text-stone-400 block font-mono">
                          {s.formattedInternational}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-hindi">
                        <span className="font-black text-amber-900">{s.nameIndian}</span>
                        <span className="text-xs text-stone-400 block font-mono">
                          {s.formattedIndian}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-xs text-stone-600">
                        {s.childRealWorldExampleEnglish}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <WordAudioButton text={s.nameInternational} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
