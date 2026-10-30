"use client";

import React from "react";
import { Badge } from "@/hooks/useProgress";
import { Trophy, Sparkles, X } from "lucide-react";

interface BadgeModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export function BadgeModal({ badge, onClose }: BadgeModalProps) {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden animate-bounce-gentle">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          aria-label="बंद करें"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-300 via-yellow-400 to-orange-400 flex items-center justify-center text-4xl shadow-lg mb-4 ring-8 ring-amber-100">
          <span>{badge.icon}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-xs uppercase mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>नया मेडल मिला!</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-1">
          {badge.titleHindi}
        </h3>
        <p className="text-xs text-slate-400 font-semibold mb-3">
          {badge.titleEnglish}
        </p>

        <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          {badge.descriptionHindi}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-black rounded-2xl shadow-md text-base transition-transform active:scale-95"
        >
          शाबाश! आगे बढ़ें ✨
        </button>
      </div>
    </div>
  );
}

