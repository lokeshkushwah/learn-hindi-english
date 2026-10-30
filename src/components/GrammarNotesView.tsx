"use client";

import React from 'react';
import { GrammarNoteItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { BookOpen, Sparkles, Printer } from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface GrammarNotesViewProps {
  notes: GrammarNoteItem[];
  className?: string;
}

export function GrammarNotesView({
  notes,
  className = '',
}: GrammarNotesViewProps) {
  const { shouldShowHindi, boldEnglish, getEnglishClass } = useLanguage();
  const showHindi = shouldShowHindi();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 p-6 rounded-3xl border-3 border-purple-200">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-700">
            Quick Grammar Notes & Rules
          </span>
          <h2 className={`text-2xl md:text-3xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-semibold'}`}>
            Super Grammar Formulas
          </h2>
          {showHindi && (
            <p className="text-sm font-hindi text-stone-600 mt-1">
              याद रखने योग्य महत्वपूर्ण नियम और जादुई सूत्र
            </p>
          )}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-3xl p-5 md:p-6 border-3 border-purple-200 shadow-bubbly hover:border-purple-400 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full border border-purple-200">
                  {note.category}
                </span>
                {note.isDifficult && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Special Tip
                  </span>
                )}
              </div>

              <h3 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
                {note.titleEnglish}
              </h3>

              {showHindi && (
                <p className="text-xs font-hindi text-stone-600">
                  {note.titleHindi}
                </p>
              )}

              {/* Formula Card */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                    Formula:
                  </span>
                  <WordAudioButton text={note.formulaEnglish} size="sm" />
                </div>
                <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-medium'}`}>
                  {note.formulaEnglish}
                </p>
                {shouldShowHindi(note.isDifficult) && (
                  <p className="text-xs font-hindi text-stone-700 pt-1 border-t border-amber-200/60">
                    {note.formulaHindi}
                  </p>
                )}
              </div>

              {/* Core Rule */}
              <div className="text-xs text-stone-700">
                <p className={boldEnglish ? 'font-bold' : 'font-normal'}>
                  📌 {note.coreRuleEnglish}
                </p>
                {shouldShowHindi(note.isDifficult) && (
                  <p className="font-hindi text-stone-500 mt-0.5">
                    📌 {note.coreRuleHindi}
                  </p>
                )}
              </div>

              {/* Examples */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase text-stone-500">
                  Examples:
                </span>
                {note.examples.map((ex, i) => (
                  <div key={i} className="p-2 bg-stone-50 rounded-xl text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className={`text-stone-900 ${boldEnglish ? 'font-bold' : 'font-normal'}`}>
                        "{ex.english}"
                      </p>
                      <WordAudioButton text={ex.english} size="sm" />
                    </div>
                    {shouldShowHindi(note.isDifficult) && (
                      <p className="text-[11px] font-hindi text-stone-500">
                        {ex.hindi}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Child Tip */}
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900">
              <span className="font-bold block mb-0.5">💡 Kid Memory Secret:</span>
              <p className={boldEnglish ? 'font-bold' : 'font-normal'}>
                {note.childTipEnglish}
              </p>
              {shouldShowHindi(note.isDifficult) && (
                <p className="font-hindi text-purple-700 mt-0.5">
                  {note.childTipHindi}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
