"use client";

import React from 'react';
import { ALL_STAGES } from '@/data/stages';
import { GrammarLesson, StageId } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface StageOverviewProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  lessons: GrammarLesson[];
  activeLessonId: string;
  onSelectLesson: (lesson: GrammarLesson) => void;
  completedLessons: string[];
}

export function StageOverview({
  currentStage,
  onSelectStage,
  lessons,
  activeLessonId,
  onSelectLesson,
  completedLessons,
}: StageOverviewProps) {
  const { shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();

  const currentStageLessons = lessons.filter((l) => l.stage === currentStage);
  const activeStageInfo = ALL_STAGES.find((s) => s.id === currentStage) || ALL_STAGES[0];

  return (
    <div className="space-y-6">
      {/* 1. Grouped Vertical/Grid Learning Level Cards (No horizontal overflow) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Choose Learning Level (1 to 10) • स्तर चुनें
          </span>
          <span className="text-xs font-bold text-stone-600">
            Active: Level {activeStageInfo.levelNumber}
          </span>
        </div>

        {/* Clean 2-to-5 column responsive grid with no horizontal scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {ALL_STAGES.map((st) => {
            const isSelected = currentStage === st.id;
            const stageLessons = lessons.filter((l) => l.stage === st.id);
            const isDone =
              stageLessons.length > 0 &&
              stageLessons.every((l) => completedLessons.includes(l.id));

            return (
              <button
                key={st.id}
                onClick={() => {
                  soundEffects.playPop();
                  onSelectStage(st.id);
                  if (stageLessons.length > 0) {
                    onSelectLesson(stageLessons[0]);
                  }
                }}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-md ring-3 ring-amber-200 scale-102'
                    : 'bg-white hover:bg-amber-50 text-stone-800 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-black/10 rounded-full">
                    L{st.levelNumber}
                  </span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>

                <span className="text-3xl my-0.5">{st.emoji}</span>

                <div>
                  <h4 className="text-xs font-black leading-tight text-stone-900">
                    {st.title}
                  </h4>
                  {showHindi && (
                    <span className="text-[10px] font-hindi text-stone-600 font-semibold block mt-0.5 leading-tight">
                      {st.hindiTitle}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Level Lesson Selector */}
      <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{activeStageInfo.emoji}</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                Level {activeStageInfo.levelNumber}: {activeStageInfo.title}
              </h3>
              {showHindi && (
                <p className="text-xs font-hindi text-stone-600 font-medium">
                  {activeStageInfo.hindiTitle} • {activeStageInfo.hindiDescription}
                </p>
              )}
            </div>
          </div>
          <span className="text-xs font-black px-3 py-1 bg-white rounded-full border border-amber-300 text-amber-900">
            {currentStageLessons.length} {currentStageLessons.length === 1 ? 'Lesson' : 'Lessons'}
          </span>
        </div>

        {/* Lessons in Current Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {currentStageLessons.map((lesson) => {
            const isActive = lesson.id === activeLessonId;
            const isDone = completedLessons.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  soundEffects.playPop();
                  onSelectLesson(lesson);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 active:scale-95 ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-md font-bold ring-2 ring-amber-300'
                    : 'bg-white hover:bg-amber-100/60 text-stone-800 border-amber-200 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl flex-shrink-0">
                    {lesson.heroIllustration.emoji}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">
                      {lesson.titleEnglish}
                    </h4>
                    {showHindi && (
                      <span className="text-xs font-hindi text-stone-600 font-semibold block">
                        {lesson.titleHindi}
                      </span>
                    )}
                  </div>
                </div>

                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
