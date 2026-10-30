"use client";

import React, { useState } from 'react';
import { VocabularyItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { Printer, Sparkles, Filter } from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface VocabularyViewProps {
  vocabulary: VocabularyItem[];
  className?: string;
}

export function VocabularyView({
  vocabulary,
  className = '',
}: VocabularyViewProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string>('All');

  const themes = ['All', ...Array.from(new Set(vocabulary.map((v) => v.theme)))];

  const filtered = selectedTheme === 'All'
    ? vocabulary
    : vocabulary.filter((v) => v.theme === selectedTheme);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-100 via-teal-100 to-sky-100 p-6 rounded-3xl border-3 border-emerald-200">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
            Interactive Flashcards
          </span>
          <h2 className={`text-2xl md:text-3xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-semibold'}`}>
            Young Learners Word Bank
          </h2>
          {shouldShowHindi() && (
            <p className="text-sm font-hindi text-stone-600 mt-1">
              चित्र, उच्चारण और हिंदी अर्थ सहित नए शब्द
            </p>
          )}
        </div>
      </div>

      {/* Theme Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-500 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => {
              soundEffects.playPop();
              setSelectedTheme(theme);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-2xl transition-all ${selectedTheme === theme
                ? 'bg-amber-400 text-stone-900 shadow-sm scale-102 ring-2 ring-amber-200'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
              }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const showHindi = shouldShowHindi(item.isDifficult);

          return (
            <div
              key={item.id}
              onClick={() => soundEffects.playPop()}
              className="bg-white rounded-3xl p-5 border-3 border-amber-200 hover:border-amber-400 shadow-bubbly hover:shadow-bubbly-hover transition-all space-y-3 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-stone-100 text-stone-600 rounded-full">
                    {item.partOfSpeech}
                  </span>
                  {item.isDifficult && (
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Special
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 my-2">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div>
                    <h3 className={`text-2xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-medium'}`}>
                      {item.word}
                    </h3>
                    <p className="text-xs font-mono text-amber-800">
                      /{item.phonetic}/
                    </p>
                  </div>
                </div>

                {showHindi && (
                  <div className="p-2.5 bg-amber-50 rounded-xl font-hindi border border-amber-200/60 mb-2">
                    <span className="text-xs font-bold text-stone-500 block">हिंदी अर्थ:</span>
                    <span className="text-sm font-bold text-stone-800">{item.meaningHindi}</span>
                  </div>
                )}

                <div className="text-xs text-stone-700 space-y-1">
                  <p className={boldEnglish ? 'font-bold' : 'font-normal'}>
                    📖 {item.explanationEnglish}
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-stone-500">
                      {item.explanationHindi}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 bg-stone-50/80 p-3 rounded-2xl">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-xs text-stone-900 ${boldEnglish ? 'font-bold' : 'font-normal'}`}>
                    "{item.exampleSentenceEnglish}"
                  </p>
                  <WordAudioButton text={item.exampleSentenceEnglish} size="sm" />
                </div>
                {showHindi && (
                  <p className="text-[11px] font-hindi text-stone-500 mt-1">
                    {item.exampleSentenceHindi}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
