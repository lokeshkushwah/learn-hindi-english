"use client";

import React from 'react';
import { Star, Trophy, Sparkles, Award } from 'lucide-react';

interface LessonProgressTrackerProps {
  completedLessons: string[];
  totalLessons: number;
  starsCount: number;
  className?: string;
}

export function LessonProgressTracker({
  completedLessons,
  totalLessons,
  starsCount,
  className = '',
}: LessonProgressTrackerProps) {
  const percent = Math.min(100, Math.round((completedLessons.length / totalLessons) * 100));

  return (
    <div className={`bg-white rounded-3xl p-4 md:p-5 border-3 border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Stars and Level Badge */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-900 flex items-center justify-center font-black text-2xl shadow-sm">
          ⭐
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Explorer Progress
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-black text-stone-900">
              {starsCount} Stars Earned!
            </span>
            <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
              {completedLessons.length} / {totalLessons} Done
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full sm:w-48 md:w-64 space-y-1">
        <div className="flex justify-between text-xs font-bold text-stone-600">
          <span>Curriculum Mastery</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden p-0.5 border border-amber-200">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
