"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { SettingsModal } from "@/components/SettingsModal";
import { useProgress, AVAILABLE_BADGES } from "@/hooks/useProgress";
import { CATEGORIES } from "@/data/hindiContent";
import { ToleranceMode } from "@/lib/comparison";
import {
  Trophy,
  Star,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Trash2,
} from "lucide-react";

export default function ProgressPage() {
  const { progress, isLoaded, resetProgress } = useProgress();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const accuracy =
    progress.wordsAttempted > 0
      ? Math.round((progress.correctCount / progress.wordsAttempted) * 100)
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        tolerance={tolerance}
        onToleranceChange={setTolerance}
        speechRate={speechRate}
        onSpeechRateChange={setSpeechRate}
        showParentOverride={showParentOverride}
        onToggleParentOverride={setShowParentOverride}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs uppercase mb-2">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>प्रगति रिपोर्ट व मेडल</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800">
              मेरी प्रगति और सितारे ⭐
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              तुम्हारी सीखने की यात्रा और कमाए हुए मेडल यहाँ सुरक्षित हैं
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm shadow flex items-center gap-2"
            >
              <span>अभ्यास जारी रखें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
              title="प्रगति रीसेट करें"
              aria-label="रीसेट करें"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        {showConfirmReset && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 flex items-center justify-between">
            <div className="text-sm font-bold">
              क्या आप सचमुच प्रगति और सितारे रीसेट करना चाहते हैं?
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                हाँ, रीसेट करें
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
              >
                रद्द करें
              </button>
            </div>
          </div>
        )}

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {/* Card 1: Total Stars */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-3xl shadow-lg border-2 border-amber-300 relative overflow-hidden">
            <div className="text-xs uppercase font-black tracking-wider text-amber-100 mb-1">
              कमाए गए सितारे
            </div>
            <div className="text-4xl sm:text-5xl font-black flex items-center gap-2">
              <Star className="w-8 h-8 fill-yellow-200 text-yellow-200" />
              <span>{progress.starsEarned}</span>
            </div>
            <div className="text-xs text-amber-100 mt-2 font-semibold">
              हर सही शब्द पर नए सितारे!
            </div>
          </div>

          {/* Card 2: Words Attempted */}
          <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-slate-200">
            <div className="text-xs uppercase font-black tracking-wider text-slate-400 mb-1">
              बोले गए कुल शब्द
            </div>
            <div className="text-4xl sm:text-5xl font-black text-slate-800">
              {progress.wordsAttempted}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              अभ्यास की कुल संख्या
            </div>
          </div>

          {/* Card 3: Correct Count & Accuracy */}
          <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-emerald-200 bg-emerald-50/20">
            <div className="text-xs uppercase font-black tracking-wider text-emerald-600 mb-1">
              सही उच्चारण सफलता
            </div>
            <div className="text-4xl sm:text-5xl font-black text-emerald-600 flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <span>{accuracy}%</span>
            </div>
            <div className="text-xs text-emerald-700 mt-2 font-semibold">
              {progress.correctCount} शब्द पहली या अगली कोशिश में सही
            </div>
          </div>

          {/* Card 4: Retries Count */}
          <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-sky-200">
            <div className="text-xs uppercase font-black tracking-wider text-sky-600 mb-1">
              प्रयास और सुधार
            </div>
            <div className="text-4xl sm:text-5xl font-black text-sky-600 flex items-center gap-2">
              <RotateCcw className="w-8 h-8 text-sky-500" />
              <span>{progress.retriesCount}</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              फिर से कोशिश करके सीखा!
            </div>
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>उपलब्धियाँ और मेडल (Badges)</span>
            </h2>
            <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
              {progress.badges.length} / {AVAILABLE_BADGES.length} अनलॉक
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_BADGES.map((badge) => {
              const isUnlocked = progress.badges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                    isUnlocked
                      ? "bg-white border-amber-300 shadow-md ring-2 ring-amber-100"
                      : "bg-slate-100/70 border-slate-200 opacity-60 grayscale"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                      isUnlocked
                        ? "bg-gradient-to-tr from-amber-300 to-orange-400 text-white shadow-sm"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-800 text-base">
                      {badge.titleHindi}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 mb-1">
                      {badge.titleEnglish}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {badge.descriptionHindi}
                    </p>

                    {isUnlocked && (
                      <span className="inline-block mt-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ प्राप्त हुआ!
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">
            श्रेणीवार दक्षता 📊
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => {
              const count = progress.categoryProgress[cat.id] || 0;
              return (
                <div
                  key={cat.id}
                  className="bg-white p-5 rounded-3xl border-2 border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {cat.nameHindi}
                      </h4>
                      <p className="text-xs text-slate-400">{cat.nameEnglish}</p>
                    </div>
                  </div>
                  <span className="font-black text-amber-600 text-base bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {count} सही
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

