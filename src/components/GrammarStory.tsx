"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { BookOpen, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface StoryPanel {
  imageEmoji: string;
  bgGradient: string;
  textEnglish: string;
  textHindi: string;
  audioPhrase: string;
  highlightWord?: string;
}

interface GrammarStoryProps {
  title: string;
  panels: StoryPanel[];
  className?: string;
}

export function GrammarStory({ title, panels, className = '' }: GrammarStoryProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  const handleNext = () => {
    if (currentStep < panels.length - 1) {
      soundEffects.playPop();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      soundEffects.playPop();
      setCurrentStep(currentStep - 1);
    }
  };

  const currentPanel = panels[currentStep];

  return (
    <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 md:p-6 border-3 border-amber-300 shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-400 text-stone-900 flex items-center justify-center font-bold shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Picture Story</span>
            <h3 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
              {title}
            </h3>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-amber-200">
          {panels.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundEffects.playPop();
                setCurrentStep(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentStep ? 'bg-amber-500 scale-125' : 'bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to story panel ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Story Panel Card */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-amber-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
        {/* Large Story Visual */}
        <div
          className={`w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br ${currentPanel.bgGradient} flex items-center justify-center shadow-inner flex-shrink-0`}
        >
          <span className="text-7xl md:text-8xl drop-shadow animate-bounce">
            {currentPanel.imageEmoji}
          </span>
        </div>

        {/* Story Content */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <p
              className={`text-xl md:text-2xl text-stone-900 leading-snug ${
                boldEnglish ? 'font-extrabold tracking-tight' : 'font-medium'
              }`}
            >
              {currentPanel.textEnglish}
            </p>
            <WordAudioButton text={currentPanel.audioPhrase} size="md" showSparkle />
          </div>

          {currentPanel.highlightWord && (
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
              Magic Word: <span className="underline">{currentPanel.highlightWord}</span>
            </div>
          )}

          {showHindi && (
            <p className="text-base md:text-lg font-hindi text-stone-700 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60">
              {currentPanel.textHindi}
            </p>
          )}
        </div>
      </div>

      {/* Story Navigation Controls */}
      <div className="flex items-center justify-between mt-4 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
            currentStep === 0
              ? 'opacity-40 cursor-not-allowed text-stone-400'
              : 'bg-white hover:bg-amber-100 text-stone-700 border border-amber-300 shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold text-stone-500">
          Page {currentStep + 1} of {panels.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentStep === panels.length - 1}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-2xl font-bold text-sm transition-all ${
            currentStep === panels.length - 1
              ? 'opacity-40 cursor-not-allowed text-stone-400'
              : 'bg-amber-400 hover:bg-amber-500 text-stone-900 shadow-sm ring-2 ring-amber-200'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
