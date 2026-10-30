"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { CategoryPicker } from "@/components/CategoryPicker";
import { SpeechPracticeCard } from "@/components/SpeechPracticeCard";
import { SettingsModal } from "@/components/SettingsModal";
import { BadgeModal } from "@/components/BadgeModal";
import {
  CategoryId,
  getItemsByCategory,
  getItemsInLessonOrder,
  HindiItem,
  HINDI_DATASET,
  MATRA_DEFINITIONS,
} from "@/data/hindiContent";
import { ToleranceMode } from "@/lib/comparison";
import { useProgress } from "@/hooks/useProgress";
import {
  Check,
  Sparkles,
  BookOpen,
  Layers,
  Filter,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PracticeMode = "category" | "lesson-order";

function PracticeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as CategoryId | null;
  const modeParam = searchParams.get("mode") as PracticeMode | null;

  const [practiceMode, setPracticeMode] = useState<PracticeMode>(modeParam || "category");
  const [category, setCategory] = useState<CategoryId>(categoryParam || "three-letter");
  const [selectedMatraSign, setSelectedMatraSign] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [jumpInput, setJumpInput] = useState<string>("");

  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  const { progress, recordAttempt, newBadgeEarned, dismissBadge } = useProgress();

  // Compute active list based on practiceMode & difficulty & matra sign
  const baseItems = useMemo(() => {
    if (practiceMode === "lesson-order") {
      return getItemsInLessonOrder();
    }
    const catItems = getItemsByCategory(category);
    if (category === "matra-words" && selectedMatraSign !== "all") {
      return catItems.filter((it) => it.matraSign === selectedMatraSign);
    }
    return catItems;
  }, [practiceMode, category, selectedMatraSign]);

  const items = useMemo(() => {
    if (difficultyFilter === "all") return baseItems;
    return baseItems.filter((it) => it.difficulty === difficultyFilter);
  }, [baseItems, difficultyFilter]);

  const currentItem = items[currentIndex] || items[0];

  // Carousel scroll & drag refs
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const activeCardRef = React.useRef<HTMLButtonElement | null>(null);
  const isDraggingRef = React.useRef(false);
  const dragStartX = React.useRef(0);
  const dragScrollLeft = React.useRef(0);

  // Matra filter bar scroll refs
  const matraScrollRef = React.useRef<HTMLDivElement | null>(null);
  const activeMatraRef = React.useRef<HTMLButtonElement | null>(null);
  const consonantJumpRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-scroll active card to center whenever currentIndex changes
  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Auto-scroll active matra button into view
  useEffect(() => {
    if (activeMatraRef.current) {
      activeMatraRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedMatraSign]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const offset = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollMatras = (direction: "left" | "right") => {
    if (matraScrollRef.current) {
      const offset = direction === "left" ? -220 : 220;
      matraScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleMatraWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const handleConsonantJumpWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const handleCarouselWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    dragStartX.current = e.pageX - carouselRef.current.offsetLeft;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    carouselRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleJumpBy = (delta: number) => {
    setCurrentIndex((prev) => {
      const next = prev + delta;
      return Math.max(0, Math.min(items.length - 1, next));
    });
  };

  // For Barakhadi: get list of unique consonants to provide instant jump pills
  const availableConsonants = useMemo(() => {
    if (category !== "barakhadi") return [];
    const roots: string[] = [];
    items.forEach((it) => {
      const root = (it as any).consonantRoot;
      if (root && !roots.includes(root)) {
        roots.push(root);
      }
    });
    return roots;
  }, [category, items]);

  const handleJumpToConsonant = (root: string) => {
    const idx = items.findIndex((it) => (it as any).consonantRoot === root);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  };

  // Update category when query param changes
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
      setPracticeMode("category");
      setCurrentIndex(0);
    }
  }, [categoryParam]);

  const handleCategoryChange = (catId: CategoryId) => {
    setCategory(catId);
    setPracticeMode("category");
    setCurrentIndex(0);
  };

  const handleModeChange = (newMode: PracticeMode) => {
    setPracticeMode(newMode);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start of lesson sequence
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleAttemptCompleted = (
    item: HindiItem,
    isCorrect: boolean,
    retries: number
  ) => {
    recordAttempt(item.id, item.devanagari || item.text, item.category, item.devanagari || item.text, isCorrect, retries);
  };

  const handleJumpToLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = parseInt(jumpInput, 10);
    if (!isNaN(orderNum)) {
      const foundIdx = items.findIndex((it) => it.lessonOrder === orderNum);
      if (foundIdx !== -1) {
        setCurrentIndex(foundIdx);
        setJumpInput("");
      } else {
        // Fallback to clamped index
        const clamped = Math.max(0, Math.min(items.length - 1, orderNum - 1));
        setCurrentIndex(clamped);
        setJumpInput("");
      }
    }
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

      {/* New Badge Modal popup */}
      <BadgeModal badge={newBadgeEarned} onClose={dismissBadge} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex flex-col items-center">
        {/* Practice Mode Selector & Quick Jump Bar */}
        <div className="w-full max-w-4xl mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-amber-50 rounded-2xl border border-amber-200">
            <button
              type="button"
              onClick={() => handleModeChange("category")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                practiceMode === "category"
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>श्रेणी अनुसार (Categories)</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange("lesson-order")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                practiceMode === "lesson-order"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>क्रमवार पाठ (1 to 322)</span>
            </button>
          </div>

          {/* Jump to Lesson Number Input */}
          <form onSubmit={handleJumpToLesson} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="322"
                placeholder="पाठ #"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-24 px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 font-bold text-xs"
            >
              जाएँ
            </button>

            {/* Total dataset counter badge */}
            <span className="text-[11px] font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl">
              कुल {HINDI_DATASET.length} पाठ
            </span>
          </form>
        </div>

        {/* Category Picker Tabs (when in Category Mode) */}
        {practiceMode === "category" && (
          <div className="w-full mb-4">
            <CategoryPicker
              selectedCategory={category}
              onSelectCategory={handleCategoryChange}
            />
          </div>
        )}

        {/* Dedicated Sound-Based Reading banner for 2, 3, 4 letter words */}
        {practiceMode === "category" &&
          (category === "two-letter" || category === "three-letter" || category === "four-letter") && (
            <div className="w-full max-w-4xl mb-4 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 border-2 border-amber-300 p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <div>
                  <div className="text-xs sm:text-sm font-black text-amber-950">
                    ध्वनि-आधारित शब्द पठन (Sound-Based Reading)
                  </div>
                  <div className="text-[11px] sm:text-xs text-amber-800">
                    अलग-अलग अक्षर सुनो, ध्वनियाँ जोड़कर पढ़ो, चित्र पहचानो और अपनी आवाज़ मिलाओ!
                  </div>
                </div>
              </div>
              <Link
                href={`/sound-reading?category=${category}`}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-sm flex items-center gap-1.5 transition active:scale-95 shrink-0"
              >
                <span>शब्द पठन खोलें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

        {/* Dedicated Matra Filter Bar when viewing Matra Words */}
        {practiceMode === "category" && category === "matra-words" && (
          <div className="w-full max-w-4xl mb-6 bg-white p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
              <span>मात्रा चुनें (14 मानक मात्राएँ व चिह्न) — तीर दबाएं या स्क्रॉल करें</span>
              <span className="text-amber-700 font-bold">
                {selectedMatraSign === "all" ? "सभी मात्राएँ" : `मात्रा: '${selectedMatraSign}'`}
              </span>
            </div>

            <div className="relative flex items-center gap-1.5">
              {/* Scroll Left Button */}
              <button
                type="button"
                onClick={() => scrollMatras("left")}
                className="p-1.5 sm:p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs active:scale-90 transition shrink-0 z-10"
                title="बाईं ओर स्क्रॉल करें"
                aria-label="Scroll Matras Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={matraScrollRef}
                onWheel={handleMatraWheel}
                className="kids-scrollbar flex-1 flex items-center gap-1.5 overflow-x-auto pb-2 scroll-smooth"
              >
                <button
                  type="button"
                  ref={selectedMatraSign === "all" ? activeMatraRef : undefined}
                  onClick={() => {
                    setSelectedMatraSign("all");
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    selectedMatraSign === "all"
                      ? "bg-amber-400 text-slate-900 border-amber-500 shadow-sm ring-2 ring-amber-300"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50"
                  }`}
                >
                  सभी (163 शब्द)
                </button>

                {MATRA_DEFINITIONS.map((m) => {
                  const isSelected = selectedMatraSign === m.sign;
                  return (
                    <button
                      key={m.sign}
                      ref={isSelected ? activeMatraRef : undefined}
                      type="button"
                      onClick={() => {
                        setSelectedMatraSign(m.sign);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1 shrink-0 ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-amber-300"
                          : "bg-white text-slate-800 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                      }`}
                      title={m.name}
                    >
                      <span className="font-hindi text-base">{m.sign}</span>
                      <span className="text-[10px] opacity-75">{m.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scroll Right Button */}
              <button
                type="button"
                onClick={() => scrollMatras("right")}
                className="p-1.5 sm:p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs active:scale-90 transition shrink-0 z-10"
                title="दाईं ओर स्क्रॉल करें"
                aria-label="Scroll Matras Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* When in Lesson Order Mode, show sequence banner */}
        {practiceMode === "lesson-order" && (
          <div className="w-full max-w-4xl mb-6 p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 font-black flex items-center justify-center text-lg">
                📖
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black">
                  क्रमवार हिंदी पाठ्यक्रम (Lesson Order Mode)
                </h3>
                <p className="text-xs text-slate-300">
                  स्वर ➔ व्यंजन ➔ बारहखड़ी ➔ 2-अक्षर ➔ 3-अक्षर ➔ मात्राएँ ➔ ध्वनि भेद
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-amber-300 font-bold">
                पाठ {currentIndex + 1} / {items.length}
              </span>
            </div>
          </div>
        )}

        {/* The Core Speech Practice Card */}
        {currentItem && (
          <div className="w-full my-auto py-2">
            <SpeechPracticeCard
              key={currentItem.id}
              item={currentItem}
              currentIndex={currentIndex}
              totalItems={items.length}
              onNext={handleNext}
              onPrev={handlePrev}
              tolerance={tolerance}
              speechRate={speechRate}
              showParentOverride={showParentOverride}
              autoAdvance={autoAdvance}
              onAttemptCompleted={handleAttemptCompleted}
            />
          </div>
        )}

        {/* Word Strip Carousel / Selector for Child */}
        <div className="w-full max-w-3xl mt-8 pt-4 border-t-2 border-amber-200">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {practiceMode === "lesson-order"
                  ? `संपूर्ण पाठ्यक्रम (${items.length} पाठ)`
                  : `इस श्रेणी के सभी शब्द/अक्षर (${items.length})`}
              </span>
            </span>

            {/* Quick +/- 10 jump controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleJumpBy(-10)}
                disabled={currentIndex === 0}
                className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 disabled:opacity-40 text-amber-900 font-bold text-xs flex items-center gap-1 transition"
                title="10 पाठ पीछे जाएं"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
                <span>-10</span>
              </button>

              <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl">
                {currentIndex + 1} / {items.length}
              </span>

              <button
                type="button"
                onClick={() => handleJumpBy(10)}
                disabled={currentIndex >= items.length - 1}
                className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 disabled:opacity-40 text-amber-900 font-bold text-xs flex items-center gap-1 transition"
                title="10 पाठ आगे जाएं"
              >
                <span>+10</span>
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl ml-2">
                {progress.completedLessons.length} पूरे
              </span>
            </div>
          </div>

          {/* If Barakhadi category: Quick Consonant Jump Pills */}
          {category === "barakhadi" && availableConsonants.length > 0 && (
            <div className="mb-3 p-2 bg-amber-50/70 rounded-2xl border border-amber-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 px-1 flex items-center justify-between">
                <span>व्यंजन चुनें (सीधे उस बारहखड़ी पर जाएं):</span>
                <span className="text-amber-800 font-bold">
                  {(currentItem as any)?.consonantRoot ? `${(currentItem as any).consonantRoot} की बारहखड़ी` : ""}
                </span>
              </div>
              <div
                ref={consonantJumpRef}
                onWheel={handleConsonantJumpWheel}
                className="flex items-center gap-1 overflow-x-auto pb-1 kids-scrollbar scroll-smooth"
              >
                {availableConsonants.map((root) => {
                  const isCurrentConsonant = (currentItem as any)?.consonantRoot === root;
                  return (
                    <button
                      key={root}
                      type="button"
                      onClick={() => handleJumpToConsonant(root)}
                      className={`min-w-[32px] h-8 px-2 rounded-xl text-xs font-black font-hindi transition-all shrink-0 ${
                        isCurrentConsonant
                          ? "bg-slate-900 text-amber-300 shadow-sm scale-105 ring-2 ring-amber-400"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-amber-100"
                      }`}
                      title={`${root} की बारहखड़ी पर जाएं`}
                    >
                      {root}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Carousel with Left/Right Buttons and Drag-to-Scroll */}
          <div className="relative flex items-center gap-2">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-md active:scale-90 transition shrink-0 z-10"
              title="बाईं ओर स्क्रॉल करें"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scroll Container */}
            <div
              ref={carouselRef}
              onWheel={handleCarouselWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="kids-scrollbar flex-1 flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 select-none cursor-grab active:cursor-grabbing scroll-smooth"
            >
              {items.map((it, idx) => {
                const isSelected = idx === currentIndex;
                const isCompleted = progress.completedLessons.includes(it.id);

                return (
                  <button
                    key={it.id}
                    ref={isSelected ? activeCardRef : undefined}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex flex-col items-center justify-center min-w-[68px] h-[72px] rounded-2xl border-2 transition-all shrink-0 select-none ${
                      isSelected
                        ? "bg-amber-400 border-amber-600 text-slate-900 font-black shadow-lg scale-105 ring-4 ring-amber-200"
                        : isCompleted
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold hover:border-emerald-400"
                        : "bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/40"
                    }`}
                    title={`${it.devanagari || it.text} (पाठ #${it.lessonOrder})`}
                  >
                    <span className="text-base font-black font-hindi">
                      {it.devanagari || it.text}
                    </span>
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-1" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                        #{it.lessonOrder}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-md active:scale-90 transition shrink-0 z-10"
              title="दाईं ओर स्क्रॉल करें"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">लोड हो रहा है...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
