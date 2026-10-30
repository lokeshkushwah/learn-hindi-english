"use client";

import React, { useRef, useEffect } from "react";
import { CATEGORIES, CategoryId } from "@/data/hindiContent";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryPickerProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function CategoryPicker({
  selectedCategory,
  onSelectCategory,
}: CategoryPickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeCatRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active category into view
  useEffect(() => {
    if (activeCatRef.current) {
      activeCatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedCategory]);

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

  return (
    <div className="w-full relative flex items-center gap-1.5 py-1">
      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="p-1.5 sm:p-2 rounded-2xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-xs active:scale-90 transition shrink-0 z-10"
        title="बाईं ओर स्क्रॉल करें"
        aria-label="Scroll Categories Left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Categories Scroll Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="kids-scrollbar flex-1 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 scroll-smooth"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              ref={isSelected ? activeCatRef : undefined}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 border-2 shrink-0 ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105 ring-2 ring-amber-300"
                  : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50"
              }`}
            >
              <span className="text-base sm:text-lg">{cat.icon}</span>
              <span>{cat.nameHindi}</span>
              {cat.count !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-amber-400 text-slate-900"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {cat.count}
                </span>
              )}
              <span className="text-[10px] font-normal opacity-70 hidden lg:inline">
                ({cat.nameEnglish})
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className="p-1.5 sm:p-2 rounded-2xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-xs active:scale-90 transition shrink-0 z-10"
        title="दाईं ओर स्क्रॉल करें"
        aria-label="Scroll Categories Right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

