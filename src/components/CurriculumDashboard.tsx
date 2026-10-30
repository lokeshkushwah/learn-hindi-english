"use client";

import React, { useState } from 'react';
import { ALL_STAGES } from '@/data/stages';
import { GrammarLesson, StageId } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import {
  Trophy,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  BookOpen,
  Compass,
  Award,
} from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface CurriculumDashboardProps {
  lessons: GrammarLesson[];
  completedLessons: string[];
  starsCount: number;
  currentLesson: GrammarLesson;
  onSelectLesson: (lesson: GrammarLesson) => void;
  onSelectStage: (stage: StageId) => void;
  className?: string;
}

export function CurriculumDashboard({
  lessons,
  completedLessons,
  starsCount,
  currentLesson,
  onSelectLesson,
  onSelectStage,
  className = '',
}: CurriculumDashboardProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  const [filterStage, setFilterStage] = useState<string>('all');

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  // Find the next incomplete lesson
  const nextLesson = lessons.find((l) => !completedLessons.includes(l.id)) || lessons[0];
  const nextStageInfo = ALL_STAGES.find((s) => s.id === nextLesson.stage);

  return (
    <div className={`space-y-8 ${className}`}>
      {/* 1. Header & Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-400 p-5 rounded-3xl text-stone-900 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-950">
              Curriculum Mastery
            </span>
            <h3 className="text-3xl font-black">{progressPercent}%</h3>
            <p className="text-xs font-bold text-amber-950 mt-1">
              {completedCount} of {totalLessons} Lessons Done
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-inner">
            🏆
          </div>
        </div>

        {/* Stars Earned */}
        <div className="bg-gradient-to-br from-yellow-300 to-amber-400 p-5 rounded-3xl text-stone-900 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-950">
              Total Stars
            </span>
            <h3 className="text-3xl font-black">{starsCount}</h3>
            <p className="text-xs font-bold text-amber-950 mt-1">
              Super Learner Streak!
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-inner">
            ⭐
          </div>
        </div>

        {/* Learning Stages */}
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-5 rounded-3xl text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-100">
              Total Stages
            </span>
            <h3 className="text-3xl font-black">10 Levels</h3>
            <p className="text-xs font-bold text-emerald-100 mt-1">
              Age 5 to 8+ Roadmap
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-inner">
            🗺️
          </div>
        </div>

        {/* Current Active Topic */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-3xl text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-200">
              Current Focus
            </span>
            <h3 className="text-xl font-black truncate max-w-[140px]">
              {currentLesson.titleEnglish}
            </h3>
            <p className="text-xs text-purple-200 mt-1">
              {currentLesson.topicBadge}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-inner">
            {currentLesson.heroIllustration.emoji}
          </div>
        </div>
      </div>

      {/* 2. Recommended Next Lesson Banner */}
      {nextLesson && (
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 p-6 md:p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black tracking-wide border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
              <span>RECOMMENDED NEXT ADVENTURE</span>
            </div>

            <h2 className={`text-2xl md:text-3xl ${boldEnglish ? 'font-black' : 'font-bold'}`}>
              Level {nextStageInfo?.levelNumber}: {nextLesson.titleEnglish}
            </h2>

            {showHindi && (
              <p className="text-lg font-hindi text-amber-100 font-bold">
                {nextLesson.titleHindi}
              </p>
            )}

            <div className="space-y-1 max-w-xl">
              <p className="text-sm text-white/95">
                {nextLesson.summaryEnglish}
              </p>
              {nextLesson.summaryHindi && showHindi && (
                <p className="text-xs text-amber-100 font-hindi font-bold bg-black/20 p-2 rounded-xl border border-white/20">
                  🇮🇳 {nextLesson.summaryHindi}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <HindiAudioButton
                text={`${nextLesson.titleHindi}। ${nextLesson.ruleHindi}`}
                speechText={`${nextLesson.titleHindi}। ${nextLesson.ruleHindi}`}
                label="हिंदी में समझें 🔊"
                size="sm"
                className="bg-amber-300 text-stone-950 font-bold"
              />
              <WordAudioButton
                text={`${nextLesson.titleEnglish}. ${nextLesson.ruleEnglish}`}
                label="English 🔊"
                size="sm"
                className="bg-white text-stone-900 font-bold"
              />
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playPop();
              onSelectLesson(nextLesson);
              onSelectStage(nextLesson.stage);
            }}
            className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-amber-100 text-stone-900 font-black text-base rounded-2xl shadow-xl transition-all active:scale-95 flex-shrink-0 animate-bounce"
          >
            <Play className="w-5 h-5 fill-stone-900" />
            <span>Continue Learning Now!</span>
          </button>
        </div>
      )}

      {/* 3. 10 Learning Levels Roadmap */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className={`text-2xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-semibold'}`}>
              The 10-Stage English Journey
            </h3>
            <p className="text-xs text-stone-500">
              Age-appropriate progression from letter sounds to complete mastery
            </p>
          </div>

          {/* Quick Stage Filter (No horizontal scroll, child-friendly 4 groups) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterStage('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStage === 'all'
                  ? 'bg-amber-400 text-stone-900 shadow-sm ring-2 ring-amber-200'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              All Levels (1–10)
            </button>
            <button
              onClick={() => setFilterStage('foundation')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStage === 'foundation'
                  ? 'bg-amber-400 text-stone-900 shadow-sm ring-2 ring-amber-200'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              🔤 Alphabet & Words (L1–2)
            </button>
            <button
              onClick={() => setFilterStage('grammar')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStage === 'grammar'
                  ? 'bg-amber-400 text-stone-900 shadow-sm ring-2 ring-amber-200'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              🎒 Core Grammar (L3–5)
            </button>
            <button
              onClick={() => setFilterStage('advanced')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStage === 'advanced'
                  ? 'bg-amber-400 text-stone-900 shadow-sm ring-2 ring-amber-200'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              🚀 Growing Skills (L6–10)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_STAGES.filter((s) => {
            if (filterStage === 'all') return true;
            if (filterStage === 'foundation') return ['stage-1', 'stage-2'].includes(s.id);
            if (filterStage === 'grammar') return ['stage-3', 'stage-4', 'stage-5'].includes(s.id);
            if (filterStage === 'advanced') return ['stage-6', 'stage-7', 'stage-8', 'stage-9', 'stage-10'].includes(s.id);
            return s.id === filterStage;
          }).map((stage) => {
            const stageLessons = lessons
              .filter((l) => l.stage === stage.id)
              .sort((a, b) => a.order - b.order);
            const stageCompleted = stageLessons.filter((l) => completedLessons.includes(l.id));
            const isStageDone = stageLessons.length > 0 && stageCompleted.length === stageLessons.length;

            return (
              <div
                key={stage.id}
                className={`bg-white rounded-3xl p-5 border-3 transition-all flex flex-col justify-between shadow-bubbly hover:shadow-bubbly-hover ${
                  isStageDone
                    ? 'border-emerald-300 ring-2 ring-emerald-100'
                    : 'border-amber-200 hover:border-amber-400'
                }`}
              >
                <div>
                  {/* Top Level Badge & Emoji */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                      Level {stage.levelNumber} • {stage.targetAge}
                    </span>
                    <span className="text-3xl">{stage.emoji}</span>
                  </div>

                  <h4 className={`text-xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                    {stage.title}
                  </h4>

                  {showHindi && (
                    <p className="text-xs font-hindi text-stone-500 font-semibold mb-2">
                      {stage.hindiTitle}
                    </p>
                  )}

                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    {stage.description}
                  </p>

                  {/* Concepts Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stage.conceptsSummary.map((concept, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md"
                      >
                        • {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Lessons list */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                    <span>{stageCompleted.length} / {stageLessons.length} Completed</span>
                    {isStageDone && <span className="text-emerald-600 flex items-center gap-1">✅ Mastered</span>}
                  </div>

                  {stageLessons.map((l) => {
                    const isDone = completedLessons.includes(l.id);
                    return (
                      <button
                        key={l.id}
                        onClick={() => {
                          soundEffects.playPop();
                          onSelectLesson(l);
                          onSelectStage(l.stage);
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                          currentLesson.id === l.id
                            ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-sm'
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{l.heroIllustration.emoji}</span>
                          <div className="truncate">
                            <span className="truncate block font-bold text-stone-900">{l.titleEnglish}</span>
                            <span className="text-[10px] text-stone-600 font-hindi font-medium block truncate">
                              {l.titleHindi}
                            </span>
                          </div>
                        </div>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

