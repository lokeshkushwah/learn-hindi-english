"use client";

import React from 'react';
import Link from 'next/link';
import { soundEffects } from '@/lib/sounds';
import { Sparkles, Star } from 'lucide-react';

export type MainNavTab = 'home' | 'learn' | 'play' | 'stars';

interface NavbarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  starsCount: number;
}

export function Navbar({
  activeTab,
  onTabChange,
  starsCount,
}: NavbarProps) {
  const navItems: { id: MainNavTab; label: string; hindi: string; emoji: string }[] = [
    { id: 'home', label: 'Home', hindi: 'डैशबोर्ड', emoji: '🏠' },
    { id: 'learn', label: 'Learn', hindi: 'सीखें', emoji: '🎨' },
    { id: 'play', label: 'Play', hindi: 'खेलें', emoji: '🎮' },
    { id: 'stars', label: 'My Stars', hindi: 'सितारे', emoji: '⭐' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-3 border-amber-200 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo & Brand */}
            <div
              onClick={() => {
                soundEffects.playPop();
                onTabChange('home');
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-2xl sm:text-3xl shadow-md transform group-hover:rotate-6 transition-transform">
                🎒
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">
                    English Kids
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-amber-200 text-stone-900 rounded-md">
                    Age 6+
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-stone-500 font-hindi">
                  खेल-खेल में इंग्लिश सीखें
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2 bg-amber-50/80 p-1.5 rounded-2xl border-2 border-amber-200">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEffects.playPop();
                      onTabChange(item.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all active:scale-95 ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <div className="text-left leading-none">
                      <div className="font-extrabold">{item.label}</div>
                      <div className="text-[10px] font-hindi text-stone-600 font-medium">{item.hindi}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Right: Hindi Academy Link + Stars Counter */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/hindi"
                className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-950 font-black text-xs rounded-2xl border border-orange-300 shadow-sm transition-all active:scale-95"
                title="Visit Hindi Learning Platform"
              >
                <span>🇮🇳 Hindi</span>
              </Link>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange('stars');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 rounded-2xl border-2 border-amber-300 text-stone-900 font-black text-xs sm:text-sm shadow-sm transition-all active:scale-95"
              >
                <span className="text-base sm:text-lg animate-bounce">⭐</span>
                <span>{starsCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly for 6-Year-Olds) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 shadow-lg px-2 py-1.5">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange(item.id);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-black shadow-sm ring-1 ring-amber-300'
                    : 'text-stone-600 hover:bg-amber-50'
                }`}
              >
                <span className="text-xl leading-none">{item.emoji}</span>
                <span className="text-[11px] font-extrabold mt-0.5">{item.label}</span>
                <span className="text-[9px] font-hindi text-stone-500 leading-none">{item.hindi}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
