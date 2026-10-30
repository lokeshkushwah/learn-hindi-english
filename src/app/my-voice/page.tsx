"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { VoiceRecorderCard } from "@/components/VoiceRecorderCard";
import { CategoryPicker } from "@/components/CategoryPicker";
import { SettingsModal } from "@/components/SettingsModal";
import { CategoryId, getItemsByCategory, HindiItem } from "@/data/hindiContent";
import { ToleranceMode } from "@/lib/comparison";
import { Headphones, Sparkles, Volume2, Mic, ChevronLeft, ChevronRight } from "lucide-react";

function VoiceContent() {
  const [category, setCategory] = useState<CategoryId>("three-letter");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);

  const items = getItemsByCategory(category);
  const currentItem = items[currentIndex] || items[0];

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const amount = direction === "left" ? -240 : 240;
      containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex flex-col items-center">
        {/* Mode Introduction Banner */}
        <div className="w-full max-w-2xl mb-6 p-4 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
              🎧
            </div>
            <div>
              <h1 className="text-xl font-black">मेरी आवाज़ सुनो (Sound Clarity)</h1>
              <p className="text-xs text-sky-100">
                अपनी आवाज़ रिकॉर्ड करके सही उच्चारण के साथ तुलना करें
              </p>
            </div>
          </div>
        </div>

        {/* Category Picker */}
        <div className="w-full mb-6">
          <CategoryPicker
            selectedCategory={category}
            onSelectCategory={(cat) => {
              setCategory(cat);
              setCurrentIndex(0);
            }}
          />
        </div>

        {/* Dedicated Voice Recorder Card */}
        {currentItem && (
          <div className="w-full my-auto py-2">
            <VoiceRecorderCard
              key={currentItem.id}
              item={currentItem}
              currentIndex={currentIndex}
              totalItems={items.length}
              onNext={handleNext}
              onPrev={handlePrev}
              speechRate={speechRate}
            />
          </div>
        )}

        {/* Word Quick Jump Carousel */}
        <div className="w-full max-w-2xl mt-8 pt-4 border-t-2 border-sky-200">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>अभ्यास के लिए शब्द चुनें ({items.length}) — तीर दबाएं या स्क्रॉल करें</span>
            </span>
          </div>

          <div className="relative flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-1.5 sm:p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 shadow-xs active:scale-90 transition shrink-0 z-10"
              title="बाईं ओर स्क्रॉल करें"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={containerRef}
              onWheel={handleWheel}
              className="kids-scrollbar flex-1 flex items-center gap-2 overflow-x-auto pb-3 pt-1 scroll-smooth"
            >
              {items.map((it, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={it.id}
                    ref={isSelected ? activeItemRef : undefined}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex flex-col items-center justify-center min-w-[56px] h-14 rounded-2xl border-2 transition-all shrink-0 ${
                      isSelected
                        ? "bg-sky-500 border-sky-700 text-white font-black shadow-md scale-105 ring-2 ring-sky-300"
                        : "bg-white border-slate-200 text-slate-700 hover:border-sky-300"
                    }`}
                  >
                    <span className="text-sm font-hindi">{it.text}</span>
                    <span className="text-[10px] opacity-70">{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-1.5 sm:p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 shadow-xs active:scale-90 transition shrink-0 z-10"
              title="दाईं ओर स्क्रॉल करें"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MyVoicePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">लोड हो रहा है...</div>}>
      <VoiceContent />
    </Suspense>
  );
}

