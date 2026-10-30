"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  BookOpen,
  Puzzle,
  Mic,
  Headphones,
  Volume2,
  Trophy,
  Star,
  Settings,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { soundEffects } from "@/lib/sounds";

interface NavbarProps {
  onOpenSettings?: () => void;
}

export function HindiNavbar({ onOpenSettings }: NavbarProps) {
  const pathname = usePathname();
  const { progress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary navigation tabs (clean, single-line, kid-friendly)
  const primaryTabs = [
    { href: "/hindi", label: "होम", icon: Home, emoji: "🏠" },
    { href: "/barakhadi", label: "बारहखड़ी", icon: Sparkles, emoji: "🔤" },
    { href: "/sound-reading", label: "शब्द-पठन", icon: BookOpen, emoji: "📖" },
    { href: "/word-builder", label: "शब्द बनाओ", icon: Puzzle, emoji: "🎮" },
    { href: "/practice", label: "सुनो-बोलो", icon: Mic, emoji: "🎙️" },
  ];

  // Secondary activities in "और भी" (More) dropdown
  const moreItems = [
    {
      href: "/my-voice",
      label: "मेरी आवाज़ सुनो",
      desc: "अपनी आवाज़ रिकॉर्ड करें व सुनें",
      icon: Headphones,
      emoji: "🎧",
    },
    {
      href: "/similar-sounds",
      label: "मिलती-जुलती ध्वनियाँ",
      desc: "श/ष/स, ब/व में अंतर पहचानें",
      icon: Volume2,
      emoji: "🔊",
    },
    {
      href: "/progress",
      label: "प्रगति व सितारे",
      desc: "कुल कमाए सितारे और बैज",
      icon: Trophy,
      emoji: "🏆",
    },
  ];

  const isMoreActive = moreItems.some((item) => pathname === item.href);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* 1. Compact Brand Logo */}
            <Link
              href="/hindi"
              onClick={() => soundEffects.playPop()}
              className="flex items-center gap-2 group focus:outline-none rounded-2xl p-1 flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-pink-500 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform select-none">
                🎈
              </div>
              <div className="leading-tight">
                <div className="text-lg sm:text-xl font-black text-slate-800 tracking-tight flex items-center gap-1">
                  <span>बोलो</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
                    हिंदी
                  </span>
                  <span className="px-1.5 py-0.2 bg-amber-200 text-amber-950 text-[10px] font-black rounded-md uppercase hidden sm:inline-block">
                    Kids
                  </span>
                </div>
                <div className="text-[10px] font-semibold text-slate-400 hidden sm:block">
                  हिंदी बोलना सीखें
                </div>
              </div>
            </Link>

            {/* 2. Simplified Desktop Navigation Bar */}
            <nav className="hidden md:flex items-center gap-1 bg-amber-50/90 p-1 rounded-2xl border-2 border-amber-200">
              {primaryTabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    onClick={() => soundEffects.playPop()}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs lg:text-sm whitespace-nowrap transition-all select-none active:scale-95 ${
                      isActive
                        ? "bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-300 scale-102"
                        : "text-slate-700 hover:bg-white/80 hover:text-slate-900"
                    }`}
                  >
                    <span className="text-base">{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </Link>
                );
              })}

              {/* "और" (More Activities) Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setMoreDropdownOpen(!moreDropdownOpen);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-black text-xs lg:text-sm whitespace-nowrap transition-all select-none active:scale-95 ${
                    isMoreActive
                      ? "bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-300"
                      : "text-slate-700 hover:bg-white/80 hover:text-slate-900"
                  }`}
                >
                  <span>⋯ और</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border-2 border-amber-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[11px] font-black uppercase text-amber-800 tracking-wider">
                      अन्य अभ्यास व खेल
                    </div>
                    {moreItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            soundEffects.playPop();
                            setMoreDropdownOpen(false);
                          }}
                          className={`flex items-start gap-2.5 px-3.5 py-2 hover:bg-amber-50 transition-colors ${
                            isActive ? "bg-amber-100/70 font-black text-amber-950" : "text-slate-700"
                          }`}
                        >
                          <span className="text-xl mt-0.5">{item.emoji}</span>
                          <div>
                            <div className="font-bold text-sm text-slate-900">{item.label}</div>
                            <div className="text-[11px] text-slate-500 font-normal leading-tight">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* 3. Right Action Area */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Switch to English Academy */}
              <Link
                href="/"
                onClick={() => soundEffects.playPop()}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-stone-900 rounded-2xl font-black text-xs shadow-sm hover:scale-105 active:scale-95 transition-all select-none"
                title="English Kids Academy"
              >
                <span>🇬🇧</span>
                <span className="hidden sm:inline">English</span>
              </Link>

              {/* Stars Counter Pill (Links to /progress) */}
              <Link
                href="/progress"
                onClick={() => soundEffects.playPop()}
                className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 hover:border-amber-400 px-2.5 sm:px-3 py-1 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all select-none"
                title="कुल कमाए सितारे"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce-gentle" />
                <span className="font-black text-amber-950 text-xs sm:text-sm">
                  {progress.starsEarned}
                </span>
                <span className="text-[11px] text-amber-700 font-bold hidden md:inline">
                  सितारे
                </span>
              </Link>

              {/* Settings Button */}
              {onOpenSettings && (
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onOpenSettings();
                  }}
                  className="p-2 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 transition-colors active:scale-95"
                  title="अभिभावक सेटिंग्स"
                  aria-label="सेटिंग्स"
                >
                  <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95"
                aria-label="मेनू खोलें"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-200 px-4 pt-2 pb-6 space-y-1.5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="text-[11px] font-black uppercase text-amber-800 tracking-wider px-2 py-1">
              मुख्य मेनू
            </div>
            {primaryTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => {
                    soundEffects.playPop();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-2xl font-bold text-sm transition-colors ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-xl">{tab.emoji}</span>
                  <span>{tab.label}</span>
                </Link>
              );
            })}

            <div className="text-[11px] font-black uppercase text-amber-800 tracking-wider px-2 pt-3 pb-1">
              अन्य गतिविधियाँ
            </div>
            {moreItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    soundEffects.playPop();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl font-bold text-sm transition-colors ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-amber-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* 5. Mobile Thumb-Friendly Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {primaryTabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => soundEffects.playPop()}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all select-none ${
                isActive ? "text-amber-600 scale-105 font-black" : "text-slate-500 font-semibold"
              }`}
            >
              <span className="text-lg">{tab.emoji}</span>
              <span className="text-[10px] leading-tight mt-0.5">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
