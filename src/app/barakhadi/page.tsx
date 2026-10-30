"use client";

import React, { useState, Suspense } from "react";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { BarakhadiTable } from "@/components/BarakhadiTable";
import { SettingsModal } from "@/components/SettingsModal";
import { BadgeModal } from "@/components/BadgeModal";
import { ToleranceMode } from "@/lib/comparison";
import { useProgress } from "@/hooks/useProgress";
import { HindiItem } from "@/data/types";
import { Sparkles, Trophy } from "lucide-react";

function BarakhadiPageContent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  const { recordAttempt, newBadgeEarned, dismissBadge } = useProgress();

  const handleAttemptCompleted = (
    item: HindiItem,
    isCorrect: boolean,
    retries: number
  ) => {
    recordAttempt(item.id, item.devanagari || item.text, "barakhadi", item.devanagari || item.text, isCorrect, retries);
  };

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
        autoAdvance={autoAdvance}
        onToggleAutoAdvance={setAutoAdvance}
      />

      <BadgeModal badge={newBadgeEarned} onClose={dismissBadge} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-center">
        {/* Title Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>संपूर्ण बारहखड़ी अभ्यास (Complete Barakhadi)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-800">
            क से ज्ञ तक सभी व्यंजनों की बारहखड़ी ✨
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
            व्यंजन चुनें, किसी भी मात्रा वाले अक्षर पर क्लिक करके उसकी ध्वनि सुनें और बोलकर अभ्यास करें!
          </p>
        </div>

        {/* Complete Interactive Barakhadi Table Component */}
        <BarakhadiTable
          initialConsonant="क"
          tolerance={tolerance}
          speechRate={speechRate}
          showParentOverride={showParentOverride}
          autoAdvance={autoAdvance}
          onAttemptCompleted={handleAttemptCompleted}
        />
      </main>
    </div>
  );
}

export default function BarakhadiPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">बारहखड़ी लोड हो रही है...</div>}>
      <BarakhadiPageContent />
    </Suspense>
  );
}

