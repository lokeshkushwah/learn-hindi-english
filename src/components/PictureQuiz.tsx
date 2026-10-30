"use client";

import React, { useState } from 'react';
import { QuizQuestion } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';

interface PictureQuizProps {
  questions: QuizQuestion[];
  topicTitle: string;
  className?: string;
  onComplete?: () => void;
}

export function PictureQuiz({
  questions,
  topicTitle,
  className = '',
  onComplete,
}: PictureQuizProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];
  const showHindiPrompt = shouldShowHindi(currentQ.isDifficult);

  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked) return;
    soundEffects.playPop();
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerChecked) return;

    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    setIsAnswerChecked(true);

    if (chosen?.isCorrect) {
      soundEffects.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundEffects.playTryAgain();
    }
  };

  const handleNext = () => {
    soundEffects.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    soundEffects.playPop();
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className={`bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-3xl p-6 md:p-8 border-4 border-amber-300 text-center shadow-lg ${className}`}>
        <div className="w-20 h-20 mx-auto mb-4 bg-amber-400 rounded-full flex items-center justify-center text-4xl shadow-md animate-bounce">
          🏆
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">
          Quiz Completed!
        </h3>
        <p className="text-base md:text-lg font-bold text-amber-900 mb-4">
          You scored {score} out of {questions.length} Stars! ⭐
        </p>

        <div className="p-4 bg-white/90 rounded-2xl border border-amber-200 mb-6 max-w-sm mx-auto">
          <p className="text-sm font-semibold text-stone-700">
            {score === questions.length
              ? '🌟 Perfect score! You are a true Grammar Superhero!'
              : '🎉 Super effort! Practice makes you even stronger!'}
          </p>
          {shouldShowHindi() && (
            <p className="text-xs font-hindi text-stone-500 mt-1">
              बहुत बढ़िया! ऐसे ही अभ्यास करते रहें!
            </p>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  const selectedOpt = currentQ.options.find((o) => o.id === selectedOptionId);

  return (
    <div className={`bg-white rounded-3xl p-5 md:p-6 border-3 border-amber-200 shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-stone-900 font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Picture Quiz • {topicTitle}
          </span>
        </div>
        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Picture & Question Prompt */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200/80 mb-5">
        <div
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${currentQ.imageBg} flex items-center justify-center flex-shrink-0 shadow-inner`}
        >
          <span className="text-5xl drop-shadow">{currentQ.imageEmoji}</span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h4
              className={`text-lg md:text-xl text-stone-900 ${
                boldEnglish ? 'font-extrabold' : 'font-semibold'
              }`}
            >
              {currentQ.promptEnglish}
            </h4>
            <WordAudioButton text={currentQ.promptEnglish} size="sm" />
          </div>

          {showHindiPrompt && (
            <p className="text-sm font-hindi text-stone-600">
              {currentQ.promptHindi}
            </p>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let btnClass = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-amber-50 hover:border-amber-300';

          if (isSelected && !isAnswerChecked) {
            btnClass = 'bg-amber-200 border-amber-400 text-stone-900 ring-2 ring-amber-300 font-bold';
          } else if (isAnswerChecked) {
            if (opt.isCorrect) {
              btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300';
            } else if (isSelected && !opt.isCorrect) {
              btnClass = 'bg-rose-100 border-rose-400 text-rose-950';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswerChecked}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all active:scale-98 shadow-sm ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                <div>
                  <span
                    className={`text-base ${
                      boldEnglish || (isAnswerChecked && opt.isCorrect) ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {opt.textEnglish}
                  </span>
                  {shouldShowHindi() && (
                    <span className="block text-xs font-hindi text-stone-500">
                      {opt.textHindi}
                    </span>
                  )}
                </div>
              </div>

              {isAnswerChecked && opt.isCorrect && (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 animate-bounce" />
              )}
              {isAnswerChecked && isSelected && !opt.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Next Button */}
      {isAnswerChecked && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 mb-4 animate-in fade-in">
          <p
            className={`text-sm text-stone-800 ${
              boldEnglish ? 'font-bold' : 'font-medium'
            }`}
          >
            {currentQ.explanationEnglish}
          </p>
          {shouldShowHindi(currentQ.isDifficult) && (
            <p className="text-xs font-hindi text-stone-600 mt-1">
              {currentQ.explanationHindi}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {!isAnswerChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedOptionId}
            className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              selectedOptionId
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 animate-pulse"
          >
            {currentIdx < questions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
          </button>
        )}
      </div>
    </div>
  );
}
