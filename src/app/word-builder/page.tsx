"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { PictureWordBuilder } from "@/components/PictureWordBuilder";
import { SettingsModal } from "@/components/SettingsModal";
import { BadgeModal } from "@/components/BadgeModal";
import {
  getItemsByCategory,
  TWO_LETTER_ITEMS,
  THREE_LETTER_ITEMS,
  FOUR_LETTER_ITEMS,
  MATRA_WORD_ITEMS,
  BARAKHADI_WORD_ITEMS,
  getBarakhadiWordsForConsonant,
  BARAKHADI_WORD_CONSONANTS,
  HindiItem,
} from "@/data/hindiContent";
import { ToleranceMode } from "@/lib/comparison";
import { useProgress } from "@/hooks/useProgress";
import { useKidSounds } from "@/hooks/useKidSounds";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  Puzzle,
  Filter,
} from "lucide-react";

export type BuilderLevelId =
  | "level-1"
  | "level-2"
  | "level-3"
  | "level-4"
  | "level-5"
  | "level-6";

interface LevelMeta {
  id: BuilderLevelId;
  levelNumber: number;
  labelHindi: string;
  labelEng: string;
  categoryTag: string;
  icon: string;
  badgeColor: string;
  borderColor: string;
  description: string;
}

const BUILDER_LEVELS: LevelMeta[] = [
  {
    id: "level-1",
    levelNumber: 1,
    labelHindi: "Level 1: दो अक्षर (Two Letters)",
    labelEng: "Two-Letter Amatrik",
    categoryTag: "two-letter",
    icon: "🌱",
    badgeColor: "bg-emerald-500",
    borderColor: "border-emerald-400",
    description: "बिना मात्रा वाले सरल 2 अक्षर शब्द: जल, फल, नल, घर, बस...",
  },
  {
    id: "level-2",
    levelNumber: 2,
    labelHindi: "Level 2: तीन अक्षर (Three Letters)",
    labelEng: "Three-Letter Amatrik",
    categoryTag: "three-letter",
    icon: "🌸",
    badgeColor: "bg-amber-500",
    borderColor: "border-amber-400",
    description: "बिना मात्रा वाले 3 अक्षर शब्द: कमल, कलम, नगर, मगर, पवन...",
  },
  {
    id: "level-3",
    levelNumber: 3,
    labelHindi: "Level 3: चार अक्षर (Four Letters)",
    labelEng: "Four-Letter Amatrik",
    categoryTag: "four-letter",
    icon: "🐅",
    badgeColor: "bg-rose-500",
    borderColor: "border-rose-400",
    description: "चार अक्षर वाले शब्द: अजगर, अदरक, शलगम, बरगद, खटमल...",
  },
  {
    id: "level-4",
    levelNumber: 4,
    labelHindi: "Level 4: मात्रा वाले शब्द (With Matras)",
    labelEng: "Matra-Based Words",
    categoryTag: "matra-words",
    icon: "🎋",
    badgeColor: "bg-purple-600",
    borderColor: "border-purple-400",
    description: "विभिन्न मात्राओं वाले शब्द: किताब, केला, मोर, गुलाब, सेब...",
  },
  {
    id: "level-5",
    levelNumber: 5,
    labelHindi: "Level 5: बारहखड़ी शब्द (Barakhadi Words)",
    labelEng: "Barakhadi Words",
    categoryTag: "barakhadi",
    icon: "✨",
    badgeColor: "bg-teal-600",
    borderColor: "border-teal-400",
    description: "क से ज्ञ तक सभी 33 व्यंजनों की बारहखड़ी से बने 270+ शब्द!",
  },
  {
    id: "level-6",
    levelNumber: 6,
    labelHindi: "Level 6: मिश्रित चित्र क्विज़ (Mixed Quiz)",
    labelEng: "Mixed Picture Quiz",
    categoryTag: "mixed",
    icon: "🎲",
    badgeColor: "bg-indigo-600",
    borderColor: "border-indigo-400",
    description: "सभी स्तरों के 2, 3, 4 अक्षर, मात्रा व बारहखड़ी शब्दों का मिला-जुला अभ्यास!",
  },
];

// Curated selection of words across all levels for Level 6 (Mixed Quiz)
const MIXED_BUILDER_ITEMS: HindiItem[] = [
  ...TWO_LETTER_ITEMS.slice(0, 8),
  ...THREE_LETTER_ITEMS.slice(0, 8),
  ...FOUR_LETTER_ITEMS.slice(0, 8),
  ...MATRA_WORD_ITEMS.slice(0, 10),
  ...BARAKHADI_WORD_ITEMS.slice(0, 20),
];

function WordBuilderContent() {
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level") as BuilderLevelId | null;
  const consonantParam = searchParams.get("consonant") || "all";

  const [activeLevelId, setActiveLevelId] = useState<BuilderLevelId>(
    levelParam && BUILDER_LEVELS.some((l) => l.id === levelParam) ? levelParam : "level-1"
  );
  const [selectedConsonant, setSelectedConsonant] = useState<string>(consonantParam);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  const { progress, recordAttempt, newBadgeEarned, dismissBadge } = useProgress();
  const { playPopSound } = useKidSounds();

  const currentLevel = BUILDER_LEVELS.find((l) => l.id === activeLevelId) || BUILDER_LEVELS[0];

  const items: HindiItem[] = useMemo(() => {
    switch (activeLevelId) {
      case "level-1":
        return getItemsByCategory("two-letter");
      case "level-2":
        return getItemsByCategory("three-letter");
      case "level-3":
        return getItemsByCategory("four-letter");
      case "level-4":
        return getItemsByCategory("matra-words");
      case "level-5":
        return getBarakhadiWordsForConsonant(selectedConsonant);
      case "level-6":
        return MIXED_BUILDER_ITEMS;
      default:
        return getItemsByCategory("two-letter");
    }
  }, [activeLevelId, selectedConsonant]);

  const currentItem = items[currentIndex] || items[0];

  // Carousel refs
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const consonantBarRef = useRef<HTMLDivElement | null>(null);
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

  const handleSelectLevel = (lvlId: BuilderLevelId) => {
    playPopSound();
    setActiveLevelId(lvlId);
    setCurrentIndex(0);
  };

  const handleSelectConsonant = (consonant: string) => {
    playPopSound();
    setSelectedConsonant(consonant);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
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

  const scrollConsonants = (direction: "left" | "right") => {
    if (consonantBarRef.current) {
      const offset = direction === "left" ? -240 : 240;
      consonantBarRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

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
        <div className="bg-gradient-to-r from-orange-400 via-amber-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -top-6 -right-6 text-7xl opacity-20 pointer-events-none select-none">
            🧩
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-bold mb-2">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>चित्र देखकर शब्द बनाओ (Picture-to-Word Builder)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mb-2">
              चित्र देखो, अक्षर जोड़ो और सही शब्द बनाओ!
            </h1>
            <p className="text-xs sm:text-base text-amber-50 leading-relaxed">
              चित्र पहचानें, नीचे दिए गए विकल्पों में से सही अक्षर क्रम से चुनें और पूरा शब्द बनाकर उच्चारण सुनें।
              क से ज्ञ तक सभी बारहखड़ी अक्षरों के 270+ शब्द उपलब्ध हैं!
            </p>
          </div>
        </div>

        {/* 6 Difficulty Levels Switcher */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-sm border-2 border-amber-200 space-y-2">
          <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>कठिनाई स्तर (Difficulty Levels):</span>
            </span>
            <span className="text-slate-400 text-[11px] font-bold">
              {currentLevel.description}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {BUILDER_LEVELS.map((lvl) => {
              const isSelected = activeLevelId === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleSelectLevel(lvl.id)}
                  className={`px-3.5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
                    isSelected
                      ? `${lvl.badgeColor} text-white ${lvl.borderColor} shadow-md scale-105 ring-2 ring-amber-300`
                      : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-base">{lvl.icon}</span>
                  <span>{lvl.labelHindi}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 5 Consonant Filter Toolbar (क से ज्ञ) */}
        {activeLevelId === "level-5" && (
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-3 sm:p-4 shadow-sm border-2 border-teal-300 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-teal-600" />
                <span>व्यंजन चुनें (Consonant Filter - क से ज्ञ):</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollConsonants("left")}
                  className="p-1 rounded-lg bg-white/80 hover:bg-white text-teal-700 border border-teal-200 active:scale-95 transition"
                  title="बाएं स्क्रॉल करें"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollConsonants("right")}
                  className="p-1 rounded-lg bg-white/80 hover:bg-white text-teal-700 border border-teal-200 active:scale-95 transition"
                  title="दाएं स्क्रॉल करें"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div
              ref={consonantBarRef}
              onWheel={handleWheel}
              className="kids-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scroll-smooth"
            >
              <button
                type="button"
                onClick={() => handleSelectConsonant("all")}
                className={`px-3 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all border ${
                  selectedConsonant === "all"
                    ? "bg-teal-600 text-white border-teal-700 shadow-sm scale-105"
                    : "bg-white text-teal-900 border-teal-200 hover:bg-teal-100"
                }`}
              >
                सभी ({BARAKHADI_WORD_ITEMS.length})
              </button>
              {BARAKHADI_WORD_CONSONANTS.map((c) => {
                const count = BARAKHADI_WORD_ITEMS.filter((w) => w.consonantRoot === c).length;
                const isSelected = selectedConsonant === c;
                return (
                  <button
                    key={`cons-filter-${c}`}
                    type="button"
                    onClick={() => handleSelectConsonant(c)}
                    className={`px-2.5 py-1.5 rounded-xl font-hindi font-black text-sm shrink-0 transition-all border flex items-center gap-1 ${
                      isSelected
                        ? "bg-teal-600 text-white border-teal-700 shadow-sm scale-105"
                        : "bg-white text-slate-800 border-teal-200 hover:bg-teal-100"
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[10px] font-sans opacity-70 font-semibold">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Word Quick-Selector Horizontal Carousel */}
        <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-sm border-2 border-amber-200">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <span>{currentLevel.icon}</span>
              <span>
                {currentLevel.labelHindi}
                {activeLevelId === "level-5" && selectedConsonant !== "all" && (
                  <span className="text-teal-700 font-hindi font-black ml-1">
                    ({selectedConsonant} वर्ग)
                  </span>
                )}
                {" "}— {items.length} शब्द
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
                  key={`carousel-${wordItem.id}-${idx}`}
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

        {/* PictureWordBuilder Reusable Component */}
        {currentItem && (
          <PictureWordBuilder
            key={`pwb-${currentItem.id}-${currentIndex}`}
            item={currentItem}
            category={currentLevel.categoryTag}
            currentIndex={currentIndex}
            totalItems={items.length}
            levelNumber={currentLevel.levelNumber}
            levelTitle={currentLevel.labelHindi}
            onNext={handleNext}
            onPrev={handlePrev}
            speechRate={speechRate}
            autoAdvance={autoAdvance}
            onAttemptCompleted={(it, isCorrect, att) => {
              recordAttempt(
                it.id,
                it.devanagari || it.text,
                it.category,
                "picture-word-builder",
                isCorrect,
                att
              );
            }}
          />
        )}
      </main>
    </div>
  );
}

export default function WordBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
          <div className="text-center font-bold text-amber-700 animate-pulse text-lg">
            लोड हो रहा है... 🧩
          </div>
        </div>
      }
    >
      <WordBuilderContent />
    </Suspense>
  );
}
