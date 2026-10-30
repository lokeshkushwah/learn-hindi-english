"use client";

import React from 'react';
import { soundEffects } from '@/lib/sounds';
import { ENGLISH_BADGES } from '@/hooks/useEnglishProgress';
import { Star, Trophy, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface MyStarsViewProps {
  starsCount: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onContinueLearning: () => void;
  onPlayGames: () => void;
}

export function MyStarsView({
  starsCount,
  completedLessonsCount,
  totalLessonsCount,
  onContinueLearning,
  onPlayGames,
}: MyStarsViewProps) {
  const progressPercent = Math.min(
    100,
    Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100)
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
      {/* 1. Giant Stars Trophy Header */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 rounded-3xl p-8 sm:p-10 text-white text-center shadow-xl relative overflow-hidden">
        <div className="w-28 h-28 mx-auto rounded-3xl bg-white/20 backdrop-blur border-4 border-white/40 flex items-center justify-center text-7xl shadow-2xl animate-bounce">
          🏆
        </div>

        <div className="mt-4 space-y-1">
          <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur rounded-full border border-white/30">
            My Achievements • मेरे सितारे
          </span>
          <h2 className="text-4xl sm:text-5xl font-black drop-shadow">
            {starsCount} Stars Earned! ⭐
          </h2>
          <p className="font-hindi text-lg sm:text-xl text-amber-100 font-bold">
            शाबाश! आपने बहुत मेहनत की है!
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              soundEffects.playPop();
              onPlayGames();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-stone-900 font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            <span>Play Games 🎮</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              onContinueLearning();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-black text-white font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            <span>Learn Next Lesson 🎨</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>

      {/* 2. Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border-3 border-amber-300 shadow-sm text-center space-y-1">
          <span className="text-4xl block">⭐</span>
          <h4 className="text-3xl font-black text-stone-900">{starsCount}</h4>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Total Stars Won
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-3 border-emerald-300 shadow-sm text-center space-y-1">
          <span className="text-4xl block">📚</span>
          <h4 className="text-3xl font-black text-stone-900">
            {completedLessonsCount} / {totalLessonsCount}
          </h4>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Lessons Completed
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-3 border-purple-300 shadow-sm text-center space-y-1">
          <span className="text-4xl block">🏅</span>
          <h4 className="text-3xl font-black text-stone-900">
            {progressPercent}%
          </h4>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Curriculum Mastery
          </p>
        </div>
      </div>

      {/* 3. Badges Showcase */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-stone-900">
              Badges Showcase • मेडल और तमगे
            </h3>
            <p className="text-xs text-stone-500">
              Collect more stars to unlock shiny new badges!
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {ENGLISH_BADGES.filter((b) => starsCount >= b.unlockedAtStars).length} / {ENGLISH_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {ENGLISH_BADGES.map((badge) => {
            const isUnlocked = starsCount >= badge.unlockedAtStars;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border-2 flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/70 border-amber-300 text-stone-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs flex-shrink-0 ${
                    isUnlocked ? 'bg-amber-300' : 'bg-stone-200'
                  }`}
                >
                  {badge.emoji}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-sm text-stone-900">
                      {badge.titleEnglish}
                    </h4>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="font-hindi text-xs font-bold text-stone-600">
                    {badge.titleHindi}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    {badge.description}
                  </p>
                  <span className="text-[10px] font-bold text-amber-800 block pt-1">
                    {isUnlocked ? '⭐ Unlocked!' : `🔒 Needs ${badge.unlockedAtStars} stars`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

