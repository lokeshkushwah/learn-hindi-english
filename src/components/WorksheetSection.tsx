"use client";

import React, { useState } from 'react';
import { GrammarLesson } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Printer, Download, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface WorksheetSectionProps {
  lessons: GrammarLesson[];
  className?: string;
}

export function WorksheetSection({
  lessons,
  className = '',
}: WorksheetSectionProps) {
  const { shouldShowHindi, boldEnglish, getEnglishClass } = useLanguage();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || '');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  const currentLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];

  const handleSelectOption = (questionId: string, option: string) => {
    soundEffects.playPop();
    setUserAnswers({
      ...userAnswers,
      [questionId]: option,
    });
  };

  const englishBoldClass = boldEnglish ? 'font-bold' : 'font-normal';

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 p-6 rounded-3xl border-3 border-amber-300">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-800">
            Interactive Practice Worksheets
          </span>
          <h2 className={`text-2xl md:text-3xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-semibold'}`}>
            Printable & Practice Worksheets
          </h2>
          {shouldShowHindi() && (
            <p className="text-sm font-hindi text-stone-600 mt-1">
              अभ्यास पत्रक: प्रश्नों को हल करें
            </p>
          )}
        </div>
      </div>

      {/* Lesson Selector for Worksheet */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {lessons.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              soundEffects.playPop();
              setSelectedLessonId(l.id);
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedLessonId === l.id
                ? 'bg-amber-400 text-stone-900 shadow-sm ring-2 ring-amber-200'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50'
            }`}
          >
            <span>{l.heroIllustration.emoji}</span>
            <span>{l.titleEnglish}</span>
          </button>
        ))}
      </div>

      {/* Worksheet Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-3 border-amber-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-stone-100 gap-4">
          <div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
              Worksheet • {currentLesson.titleEnglish}
            </span>
            <h3 className={`text-xl md:text-2xl text-stone-900 mt-2 ${boldEnglish ? 'font-black' : 'font-semibold'}`}>
              Solve & Practice
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl border border-stone-300 transition-all"
            >
              {showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {currentLesson.worksheetQuestions.map((q, idx) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const showHindi = shouldShowHindi(q.isDifficult);

            return (
              <div
                key={q.id}
                className="p-5 bg-stone-50 rounded-2xl border-2 border-stone-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className={`text-base text-stone-900 ${englishBoldClass}`}>
                      <span className="font-bold mr-2">Q{idx + 1}.</span>
                      {q.questionEnglish}
                    </p>
                    {showHindi && (
                      <p className="text-xs font-hindi text-stone-600">
                        {q.questionHindi}
                      </p>
                    )}
                  </div>
                  {q.emoji && <span className="text-3xl">{q.emoji}</span>}
                </div>

                {/* Option selector */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = userAnswer === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`p-3 rounded-xl border-2 text-left text-sm transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-200 border-amber-400 text-stone-900 font-bold ring-2 ring-amber-300'
                              : 'bg-white border-stone-200 text-stone-700 hover:bg-amber-50'
                          }`}
                        >
                          <span className={englishBoldClass}>{opt}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-amber-700" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Answer reveal when enabled */}
                {showAnswerKey && (
                  <div className="mt-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                    <span className="font-bold text-emerald-950">
                      Correct Answer: <span className={englishBoldClass}>{q.correctAnswer}</span>
                    </span>
                    {showHindi && (
                      <span className="font-hindi text-emerald-700 block mt-0.5">
                        {q.hindiExplanation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
