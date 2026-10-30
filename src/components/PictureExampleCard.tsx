"use client";

import React from 'react';
import { PictureExample } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { Sparkles, HelpCircle } from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface PictureExampleCardProps {
  example: PictureExample;
  className?: string;
}

export function PictureExampleCard({ example, className = '' }: PictureExampleCardProps) {
  const { shouldShowHindi, boldEnglish, getEnglishClass } = useLanguage();
  const showHindi = shouldShowHindi(example.isDifficult);

  const handleCardClick = () => {
    soundEffects.playPop();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-white rounded-3xl p-4 md:p-5 border-3 border-amber-200 hover:border-amber-400 shadow-bubbly hover:shadow-bubbly-hover transition-all duration-200 transform hover:-translate-y-1 cursor-pointer overflow-hidden ${className}`}
    >
      {/* Category Tag & Difficulty Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {example.categoryTag && (
          <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
            {example.categoryTag}
          </span>
        )}
        {example.isDifficult && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold bg-purple-100 text-purple-700 rounded-full border border-purple-200">
            <Sparkles className="w-3 h-3" />
            Special Word
          </span>
        )}
      </div>

      {/* Large Colorful Picture / Illustration */}
      <div
        className={`w-full aspect-square max-h-48 rounded-2xl bg-gradient-to-br ${example.illustration.bgGradient} flex flex-col items-center justify-center p-4 shadow-inner mb-4 transition-transform duration-200 group-hover:scale-105 select-none`}
      >
        <span className="text-6xl md:text-7xl drop-shadow-md animate-pulse">
          {example.illustration.emoji}
        </span>
        <span className="text-xs text-white/90 font-medium text-center mt-2 px-2 drop-shadow">
          {example.illustration.description}
        </span>
      </div>

      {/* English Word & Audio */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <h4
          className={`text-xl md:text-2xl text-stone-900 ${
            boldEnglish ? 'font-extrabold tracking-tight' : 'font-medium'
          }`}
        >
          {example.englishWord}
        </h4>
        <WordAudioButton
          text={example.englishWord}
          speechText={example.speechText}
          size="sm"
          showSparkle
        />
      </div>

      {/* Phonetic Pronunciation Hint */}
      {example.phoneticHint && (
        <p className="text-xs text-amber-700 font-mono mb-2">
          🗣️ Sounds like: <span className="font-semibold">{example.phoneticHint}</span>
        </p>
      )}

      {/* Hindi Word / Translation (Controlled by Language Mode) */}
      {showHindi && (
        <div className="mt-1 pt-2 border-t border-amber-100 font-hindi">
          <p className="text-sm font-semibold text-stone-700">
            {example.hindiWord}
          </p>
        </div>
      )}

      {/* Example Sentence Section */}
      <div className="mt-3 p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm text-stone-900 leading-snug ${
              boldEnglish ? 'font-bold' : 'font-normal'
            }`}
          >
            "{example.englishSentence}"
          </p>
          <WordAudioButton text={example.englishSentence} size="sm" />
        </div>

        {/* Hindi Translation of Sentence */}
        {showHindi && (
          <p className="text-xs font-hindi text-stone-600 mt-1.5 pt-1.5 border-t border-amber-200/50">
            {example.hindiSentence}
          </p>
        )}
      </div>
    </div>
  );
}
