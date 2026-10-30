"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { WordSoundPractice } from "@/components/WordSoundPractice";
import { SettingsModal } from "@/components/SettingsModal";
import { BadgeModal } from "@/components/BadgeModal";
import { getItemsByCategory, HindiItem } from "@/data/hindiContent";
import { ToleranceMode } from "@/lib/comparison";
import { useProgress } from "@/hooks/useProgress";
import { useKidSounds } from "@/hooks/useKidSounds";
import {
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Layers,
  Volume2,
} from "lucide-react";

type SoundCategory = "two-letter" | "three-letter" | "four-letter";

interface CategoryMeta {
  id: SoundCategory;
  level: number;
  labelHindi: string;
  labelEng: string;
  icon: string;
  badgeColor: string;
  borderColor: string;
}

const SOUND_LEVELS: CategoryMeta[] = [
  {
    id: "two-letter",
    level: 1,
    labelHindi: "Level 1: दो अक्षर वाले शब्द",
    labelEng: "Two-Letter Words",
    icon: "🌱",
    badgeColor: "bg-emerald-500",
    borderColor: "border-emerald-400",
  },
  {
    id: "three-letter",
    level: 2,
    labelHindi: "Level 2: तीन अक्षर वाले शब्द",
    labelEng: "Three-Letter Words",
    icon: "🌸",
    badgeColor: "bg-amber-500",
    borderColor: "border-amber-400",
  },
  {
    id: "four-letter",
    level: 3,
    labelHindi: "Level 3: चार अक्षर वाले शब्द",
    labelEng: "Four-Letter Words",
    icon: "🐅",
    badgeColor: "bg-rose-500",
    borderColor: "border-rose-400",
  },
];

function SoundReadingContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category") as SoundCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<SoundCategory>(
    catParam && ["two-letter", "three-letter", "four-letter"].includes(catParam)
      ? catParam
      : "two-letter"
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  const { progress, recordAttempt, newBadgeEarned, dismissBadge } = useProgress();
  const { playPopSound } = useKidSounds();

  const items: HindiItem[] = useMemo(() => {
    return getItemsByCategory(selectedCategory);
  }, [selectedCategory]);

  const currentItem = items[currentIndex] || items[0];

  // Carousel refs
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const activeWordRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active word card to center
  useEffect(() => {
    if (activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Reset index when category switches
  const handleSelectCategory = (cat: SoundCategory) => {
    playPopSound();
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop or prompt next level
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const offset = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const currentMeta = SOUND_LEVELS.find((l) => l.id === selectedCategory) || SOUND_LEVELS[0];

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30">
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

      {newBadgeEarned && <BadgeModal badge={newBadgeEarned} onClose={dismissBadge} />}

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -top-6 -right-6 text-7xl opacity-20 pointer-events-none select-none">
            📖
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-bold mb-2">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>ध्वनि-आधारित शब्द पठन अभ्यास (Sound-Based Reading)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mb-2">
              अक्षर जोड़ो और शब्द पढ़ो!
            </h1>
            <p className="text-xs sm:text-base text-amber-50">
              प्रत्येक अक्षर की अलग ध्वनि सुनो, अक्षरों को जोड़कर शब्द बनाओ, चित्र देखकर पहचानो और अपनी आवाज़ रिकॉर्ड करो।
            </p>
          </div>
        </div>

        {/* Level Switcher Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-3xl shadow-sm border-2 border-amber-200">
          <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>कक्षा स्तर (Learning Level):</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {SOUND_LEVELS.map((lvl) => {
              const isSelected = selectedCategory === lvl.id;
              const count = getItemsByCategory(lvl.id).length;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleSelectCategory(lvl.id)}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
                    isSelected
                      ? `${lvl.badgeColor} text-white ${lvl.borderColor} shadow-md scale-105 ring-2 ring-amber-300`
                      : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-base">{lvl.icon}</span>
                  <span>{lvl.labelHindi}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? "bg-white/30 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Word Quick-Selector Horizontal Carousel */}
        <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-sm border-2 border-amber-200">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <span>{currentMeta.icon}</span>
              <span>
                {currentMeta.labelHindi} ({items.length} शब्द)
              </span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-900 border border-slate-200 active:scale-95 transition"
                title="बाईं ओर स्क्रॉल करें"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-900 border border-slate-200 active:scale-95 transition"
                title="दाईं ओर स्क्रॉल करें"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            onWheel={handleWheel}
            className="kids-scrollbar flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth"
          >
            {items.map((wordItem, idx) => {
              const isSelected = idx === currentIndex;
              const isCompleted = progress.completedLessons.includes(wordItem.id);
              const displayText = wordItem.devanagari || wordItem.text;

              return (
                <button
                  key={wordItem.id}
                  ref={isSelected ? activeWordRef : undefined}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setCurrentIndex(idx);
                  }}
                  className={`min-w-[76px] sm:min-w-[88px] p-2 sm:p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center shrink-0 relative ${
                    isSelected
                      ? "bg-amber-400 border-amber-500 text-slate-900 shadow-md scale-105 ring-2 ring-amber-200"
                      : isCompleted
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300"
                  }`}
                  title={`${displayText} - ${wordItem.englishMeaning || ""}`}
                >
                  {isCompleted && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-xs">
                      ✓
                    </span>
                  )}
                  <span className="text-xl sm:text-2xl mb-0.5">{wordItem.emoji}</span>
                  <span className="font-hindi text-base sm:text-lg font-black leading-none">
                    {displayText}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1">#{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* WordSoundPractice Reusable Core Component */}
        {currentItem && (
          <WordSoundPractice
            item={currentItem}
            category={selectedCategory}
            currentIndex={currentIndex}
            totalItems={items.length}
            onNext={handleNext}
            onPrev={handlePrev}
            speechRate={speechRate}
            autoAdvance={autoAdvance}
            onAttemptCompleted={(it, isCorrect, retries) => {
              recordAttempt(it.id, it.devanagari || it.text, selectedCategory, "sound-reading", isCorrect, retries);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default function SoundReadingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
          <div className="text-center font-bold text-amber-700 animate-pulse text-lg">
            लोड हो रहा है... 📖
          </div>
        </div>
      }
    >
      <SoundReadingContent />
    </Suspense>
  );
}
