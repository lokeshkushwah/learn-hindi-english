"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ALL_BARAKHADI_CONSONANTS,
  getBarakhadiForConsonant,
  ConsonantMeta,
  VOWEL_PATTERNS,
} from "@/data/barakhadi";
import { HindiItem } from "@/data/types";
import { SpeechPracticeCard } from "./SpeechPracticeCard";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useKidSounds } from "@/hooks/useKidSounds";
import { ToleranceMode } from "@/lib/comparison";
import { Volume2, Sparkles, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface BarakhadiTableProps {
  initialConsonant?: string;
  tolerance?: ToleranceMode;
  speechRate?: number;
  showParentOverride?: boolean;
  autoAdvance?: boolean;
  onAttemptCompleted?: (item: HindiItem, isCorrect: boolean, retries: number) => void;
}

export function BarakhadiTable({
  initialConsonant = "क",
  tolerance = "normal",
  speechRate = 0.82,
  showParentOverride = true,
  autoAdvance = true,
  onAttemptCompleted,
}: BarakhadiTableProps) {
  const [selectedConsonant, setSelectedConsonant] = useState<string>(initialConsonant);
  const [selectedSyllableIndex, setSelectedSyllableIndex] = useState<number>(0);
  const [selectedVarga, setSelectedVarga] = useState<string>("all");

  const consonantsRef = useRef<HTMLDivElement | null>(null);
  const activeConsonantRef = useRef<HTMLButtonElement | null>(null);
  const vargasRef = useRef<HTMLDivElement | null>(null);
  const activeVargaRef = useRef<HTMLButtonElement | null>(null);

  // Drag-to-scroll refs for consonants
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const { speak } = useSpeechSynthesis();
  const { playPopSound } = useKidSounds();

  const syllables = getBarakhadiForConsonant(selectedConsonant);
  const currentSyllable = syllables[selectedSyllableIndex] || syllables[0];

  const filteredConsonants =
    selectedVarga === "all"
      ? ALL_BARAKHADI_CONSONANTS
      : ALL_BARAKHADI_CONSONANTS.filter((c) => c.varga === selectedVarga);

  // Auto-scroll active consonant into view smoothly
  useEffect(() => {
    if (activeConsonantRef.current) {
      activeConsonantRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedConsonant]);

  // Auto-scroll active varga filter pill into view
  useEffect(() => {
    if (activeVargaRef.current) {
      activeVargaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedVarga]);

  const scrollConsonants = (direction: "left" | "right") => {
    if (consonantsRef.current) {
      const amount = direction === "left" ? -260 : 260;
      consonantsRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollVargas = (direction: "left" | "right") => {
    if (vargasRef.current) {
      const amount = direction === "left" ? -200 : 200;
      vargasRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleConsonantsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const handleVargasWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!consonantsRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - consonantsRef.current.offsetLeft;
    scrollLeftStartRef.current = consonantsRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !consonantsRef.current) return;
    e.preventDefault();
    const x = e.pageX - consonantsRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    consonantsRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleSelectConsonant = (root: string) => {
    playPopSound();
    setSelectedConsonant(root);
    setSelectedSyllableIndex(0);
  };

  const handleSelectSyllable = (idx: number, syllableText: string) => {
    playPopSound();
    setSelectedSyllableIndex(idx);
    speak(syllableText, { rate: speechRate });
  };

  const handleNextSyllable = () => {
    if (selectedSyllableIndex < syllables.length - 1) {
      setSelectedSyllableIndex((prev) => prev + 1);
    } else {
      // Advance to next consonant's barakhadi!
      const currentConsIdx = ALL_BARAKHADI_CONSONANTS.findIndex((c) => c.root === selectedConsonant);
      if (currentConsIdx < ALL_BARAKHADI_CONSONANTS.length - 1) {
        setSelectedConsonant(ALL_BARAKHADI_CONSONANTS[currentConsIdx + 1].root);
        setSelectedSyllableIndex(0);
      } else {
        setSelectedSyllableIndex(0);
      }
    }
  };

  const handlePrevSyllable = () => {
    if (selectedSyllableIndex > 0) {
      setSelectedSyllableIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Varga Filter Pills with Horizontal Scroll & Arrows */}
      <div className="w-full relative flex items-center gap-1.5 mb-4">
        <button
          type="button"
          onClick={() => scrollVargas("left")}
          className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-xs active:scale-90 transition shrink-0 z-10"
          title="बाईं ओर स्क्रॉल करें"
          aria-label="Scroll Vargas Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={vargasRef}
          onWheel={handleVargasWheel}
          className="kids-scrollbar flex-1 flex items-center gap-1.5 overflow-x-auto pb-2 scroll-smooth"
        >
          {[
            { id: "all", label: "सभी व्यंजन (34)" },
            { id: "क-वर्ग", label: "क-वर्ग" },
            { id: "च-वर्ग", label: "च-वर्ग" },
            { id: "ट-वर्ग", label: "ट-वर्ग" },
            { id: "त-वर्ग", label: "त-वर्ग" },
            { id: "प-वर्ग", label: "प-वर्ग" },
            { id: "अन्तस्थ", label: "अन्तस्थ (य,र,ल,व)" },
            { id: "ऊष्म", label: "ऊष्म (श,ष,स,ह)" },
            { id: "संयुक्ताक्षर", label: "संयुक्ताक्षर (क्ष,त्र,ज्ञ)" },
          ].map((v) => {
            const isSelected = selectedVarga === v.id;
            return (
              <button
                key={v.id}
                ref={isSelected ? activeVargaRef : undefined}
                type="button"
                onClick={() => {
                  playPopSound();
                  setSelectedVarga(v.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-amber-300"
                    : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollVargas("right")}
          className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-xs active:scale-90 transition shrink-0 z-10"
          title="दाईं ओर स्क्रॉल करें"
          aria-label="Scroll Vargas Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Consonant Selector Buttons (क through ज्ञ) with Visible Scrollbar, Arrows & Drag */}
      <div className="w-full bg-white p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm mb-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>व्यंजन चुनें ({filteredConsonants.length}) — तीर दबाएं या माउस से स्क्रॉल करें ↔️</span>
          <span className="text-amber-700 font-hindi font-black">चयनित: '{selectedConsonant}'</span>
        </div>

        <div className="relative flex items-center gap-2">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollConsonants("left")}
            className="p-2 sm:p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-sm active:scale-90 transition shrink-0 z-10"
            title="बाईं ओर स्क्रॉल करें"
            aria-label="Scroll Consonants Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Consonants Container */}
          <div
            ref={consonantsRef}
            onWheel={handleConsonantsWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="kids-scrollbar flex-1 flex items-center gap-2 overflow-x-auto pb-3 pt-1 select-none cursor-grab active:cursor-grabbing scroll-smooth"
          >
            {filteredConsonants.map((c) => {
              const isSelected = c.root === selectedConsonant;
              return (
                <button
                  key={c.root}
                  ref={isSelected ? activeConsonantRef : undefined}
                  type="button"
                  onClick={() => handleSelectConsonant(c.root)}
                  className={`min-w-[48px] h-12 rounded-2xl font-black text-lg font-hindi transition-all border-2 shrink-0 flex items-center justify-center ${
                    isSelected
                      ? "bg-gradient-to-tr from-amber-400 to-orange-500 text-white border-orange-500 shadow-md scale-105 ring-2 ring-amber-300"
                      : "bg-slate-50 text-slate-800 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                  title={c.name}
                >
                  {c.root}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollConsonants("right")}
            className="p-2 sm:p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-sm active:scale-90 transition shrink-0 z-10"
            title="दाईं ओर स्क्रॉल करें"
            aria-label="Scroll Consonants Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Complete Interactive Barakhadi Table Grid for Selected Consonant */}
      <div className="w-full bg-white p-4 sm:p-6 rounded-3xl border-4 border-amber-300 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-hindi flex items-center gap-2">
              <span>{selectedConsonant} की संपूर्ण बारहखड़ी</span>
              <span className="text-sm font-normal text-slate-400">({syllables.length} रूप)</span>
            </h2>
            <p className="text-xs text-slate-500">
              किसी भी अक्षर पर क्लिक करके उसकी ध्वनि सुनें और नीचे अभ्यास करें
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>स्वर योग</span>
          </div>
        </div>

        {/* 13 Large Clickable Hindi Syllable Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
          {syllables.map((syl, idx) => {
            const isSelected = idx === selectedSyllableIndex;
            return (
              <button
                key={syl.id}
                type="button"
                onClick={() => handleSelectSyllable(idx, syl.devanagari)}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center relative group ${
                  isSelected
                    ? "bg-gradient-to-b from-amber-400 to-orange-400 text-slate-900 border-orange-500 shadow-lg scale-105 ring-4 ring-amber-200"
                    : "bg-amber-50/40 text-slate-800 border-amber-200 hover:border-amber-400 hover:bg-amber-100/60"
                }`}
              >
                <span className="text-[10px] font-bold opacity-75 mb-1">
                  {syl.vowelName} ({syl.vowelSign})
                </span>

                <div className="text-3xl sm:text-4xl font-black font-hindi my-1">
                  {syl.devanagari}
                </div>

                <div className="text-[10px] font-bold opacity-80 mt-1 flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  <span>{syl.transliteration}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice Flow Section for Current Syllable */}
      {currentSyllable && (
        <div className="w-full">
          <SpeechPracticeCard
            key={currentSyllable.id}
            item={currentSyllable}
            currentIndex={selectedSyllableIndex}
            totalItems={syllables.length}
            onNext={handleNextSyllable}
            onPrev={handlePrevSyllable}
            tolerance={tolerance}
            speechRate={speechRate}
            showParentOverride={showParentOverride}
            autoAdvance={autoAdvance}
            onAttemptCompleted={onAttemptCompleted}
          />
        </div>
      )}
    </div>
  );
}

