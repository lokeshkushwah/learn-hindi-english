"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';

interface AnimatedSentenceBuilderProps {
  targetSentence: string;
  hindiMeaning: string;
  initialCards: string[];
  correctOrder: string[];
  className?: string;
}

export function AnimatedSentenceBuilder({
  targetSentence,
  hindiMeaning,
  initialCards,
  correctOrder,
  className = '',
}: AnimatedSentenceBuilderProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  const [availableCards, setAvailableCards] = useState<string[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleCardClick = (card: string) => {
    soundEffects.playPop();
    const newSelected = [...selectedCards, card];
    const newAvailable = availableCards.filter((c, idx) => {
      // remove first matching occurrence
      const firstIdx = availableCards.indexOf(card);
      return idx !== firstIdx;
    });

    setSelectedCards(newSelected);
    setAvailableCards(newAvailable);

    // If all cards chosen, check answer
    if (newSelected.length === correctOrder.length) {
      const isCorrect = newSelected.every((item, i) => item === correctOrder[i]);
      if (isCorrect) {
        setIsSuccess(true);
        soundEffects.playSuccess();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } else {
        setIsSuccess(false);
        soundEffects.playTryAgain();
      }
    }
  };

  const handleRemoveCard = (card: string, index: number) => {
    soundEffects.playPop();
    const newSelected = selectedCards.filter((_, idx) => idx !== index);
    const newAvailable = [...availableCards, card];
    setSelectedCards(newSelected);
    setAvailableCards(newAvailable);
    setIsSuccess(null);
  };

  const handleReset = () => {
    soundEffects.playPop();
    setAvailableCards(initialCards);
    setSelectedCards([]);
    setIsSuccess(null);
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-50 via-sky-50 to-pink-50 rounded-3xl p-5 md:p-6 border-3 border-indigo-200 shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Sentence Builder Puzzle</span>
          <h4 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
            Arrange the Words in Order!
          </h4>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-stone-600 hover:text-indigo-600 rounded-xl text-xs font-bold border border-stone-200 shadow-sm"
          title="Reset cards"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Picture Hint / Illustration */}
      <div className="flex items-center justify-center p-3 bg-white/70 rounded-2xl mb-4 border border-indigo-100">
        <span className="text-5xl drop-shadow">👧🍎😋</span>
      </div>

      {/* Sentence Drop Zone / Completed sentence */}
      <div className="p-4 bg-white rounded-3xl border-2 border-dashed border-indigo-300 min-h-[90px] flex flex-wrap items-center justify-center gap-2 mb-4">
        {selectedCards.length === 0 ? (
          <span className="text-stone-400 text-sm font-medium animate-pulse">
            👆 Click the word cards below to build the sentence!
          </span>
        ) : (
          selectedCards.map((card, idx) => (
            <button
              key={`${card}-${idx}`}
              onClick={() => handleRemoveCard(card, idx)}
              className="px-4 py-2.5 bg-amber-300 hover:bg-rose-200 text-stone-900 font-extrabold text-base md:text-lg rounded-2xl border-2 border-amber-400 shadow-bubbly active:scale-95 transition-all animate-in fade-in zoom-in-90"
              title="Click to remove"
            >
              {card}
            </button>
          ))
        )}
      </div>

      {/* Available Word Cards */}
      <div className="space-y-2 mb-4">
        <p className="text-xs font-bold text-stone-600 uppercase tracking-wide text-center">
          Tap Word Cards:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {availableCards.map((card, idx) => (
            <button
              key={`${card}-${idx}`}
              onClick={() => handleCardClick(card)}
              className="px-5 py-3 bg-white hover:bg-indigo-500 hover:text-white text-stone-900 font-bold text-base md:text-lg rounded-2xl border-2 border-indigo-300 shadow-bubbly hover:shadow-bubbly-hover transition-all active:scale-95 cursor-pointer"
            >
              {card}
            </button>
          ))}
        </div>
      </div>

      {/* Result & Encouragement */}
      {isSuccess === true && (
        <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-300 flex flex-col md:flex-row items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0 animate-bounce" />
            <div>
              <p className={`text-base md:text-lg text-emerald-950 ${boldEnglish ? 'font-extrabold' : 'font-bold'}`}>
                "{targetSentence}"
              </p>
              {showHindi && (
                <p className="text-sm font-hindi text-emerald-800 mt-0.5">
                  {hindiMeaning}
                </p>
              )}
            </div>
          </div>
          <WordAudioButton text={targetSentence} label="Listen Aloud" size="md" showSparkle />
        </div>
      )}

      {isSuccess === false && (
        <div className="p-3 bg-rose-50 rounded-2xl border-2 border-rose-300 text-center text-sm font-bold text-rose-700 animate-in shake">
          Almost there! Try arranging the cards again! You can do it! 🌟
        </div>
      )}
    </div>
  );
}
