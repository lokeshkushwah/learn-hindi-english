"use client";

import React, { useState } from 'react';
import { GrammarInteractiveActivity } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw, Gamepad2, Volume2 } from 'lucide-react';
import { AnimatedSentenceBuilder } from './AnimatedSentenceBuilder';

interface InteractiveActivityProps {
  activity: GrammarInteractiveActivity;
  className?: string;
}

export function InteractiveActivity({ activity, className = '' }: InteractiveActivityProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  // State for various games
  const [genericStep, setGenericStep] = useState(0);
  const [genericScore, setGenericScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // For classify / phonics
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [classifyScore, setClassifyScore] = useState(0);

  // For choose-verb
  const [verbStep, setVerbStep] = useState(0);

  // For article-sorter
  const [articleItemIdx, setArticleItemIdx] = useState(0);

  // For preposition-picker
  const [chosenPrep, setChosenPrep] = useState<string | null>(null);

  // If sentence arrange
  if (activity.type === 'sentence-arrange') {
    return (
      <AnimatedSentenceBuilder
        targetSentence={activity.data.targetSentence}
        hindiMeaning={activity.data.hindiMeaning}
        initialCards={activity.data.cards}
        correctOrder={activity.data.correctOrder}
        className={className}
      />
    );
  }

  // 1. CLASSIFY & PHONICS-MATCH
  if (activity.type === 'classify' || activity.type === 'phonics-match') {
    const cards = activity.data.cards || [];
    const currentCard = cards[currentCardIndex];
    const categories: string[] = activity.data.categories || [];
    const isCompleted = currentCardIndex >= cards.length;

    const handleCategoryPick = (cat: string) => {
      if (!currentCard || isCompleted) return;
      if (cat === currentCard.correct) {
        soundEffects.playSuccess();
        setClassifyScore((s) => s + 1);
        setFeedback(`🎉 Correct! ${currentCard.word} is a ${cat}!`);
        setTimeout(() => {
          setFeedback(null);
          if (currentCardIndex + 1 >= cards.length) {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
          }
          setCurrentCardIndex((i) => i + 1);
        }, 1100);
      } else {
        soundEffects.playTryAgain();
        setFeedback(`Try again! Hint: ${currentCard.hintHindi || 'Look closely!'}`);
      }
    };

    return (
      <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 md:p-6 border-3 border-amber-300 shadow-md ${className}`}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-amber-600" />
            <h4 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
              {activity.title}
            </h4>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white rounded-full border border-amber-200">
            {isCompleted ? 'Finished!' : `Card ${currentCardIndex + 1} of ${cards.length}`}
          </span>
        </div>

        <p className="text-sm text-stone-700 mb-1">{activity.instructionEnglish}</p>
        {showHindi && <p className="text-xs font-hindi text-stone-500 mb-4">{activity.instructionHindi}</p>}

        {isCompleted ? (
          <div className="p-6 bg-white rounded-3xl border-2 border-amber-200 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h5 className="text-xl font-extrabold text-stone-900">Champion Badge Earned!</h5>
            <p className="text-sm font-bold text-amber-700">You scored {classifyScore} out of {cards.length}!</p>
            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentCardIndex(0);
                setClassifyScore(0);
                setFeedback(null);
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-sm shadow-md"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-3xl border-2 border-amber-200 text-center shadow-inner max-w-sm mx-auto">
              <span className="text-7xl block mb-2 animate-bounce">{currentCard.emoji}</span>
              <div className="flex items-center justify-center gap-2">
                <span className={`text-2xl text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                  {currentCard.word}
                </span>
                <WordAudioButton text={currentCard.word} size="sm" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-lg mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryPick(cat)}
                  className="py-3 px-5 bg-white hover:bg-amber-400 hover:text-stone-900 text-stone-800 font-extrabold text-sm rounded-2xl border-2 border-amber-300 shadow-bubbly active:scale-95 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>

            {feedback && (
              <p className="text-center text-sm font-bold text-amber-900 bg-amber-100 p-2.5 rounded-2xl animate-in fade-in">
                {feedback}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 2. FIRST-WORDS-MATCH, THIS-THAT-PICKER, CHOOSE-VERB, SIMPLE-SENTENCE-BUILDER, STORY-COMPREHENSION
  if (
    activity.type === 'first-words-match' ||
    activity.type === 'this-that-picker' ||
    activity.type === 'choose-verb' ||
    activity.type === 'simple-sentence-builder' ||
    activity.type === 'story-comprehension'
  ) {
    const cards = activity.data.cards || (activity.data.question ? [{ prompt: activity.data.question, options: activity.data.options, correct: activity.data.correct, hintHindi: activity.data.hintHindi }] : []);
    const card = cards[genericStep];
    const isCompleted = genericStep >= cards.length;

    const handlePickOption = (chosen: string) => {
      if (chosen === card.correct) {
        soundEffects.playSuccess();
        setGenericScore((s) => s + 1);
        setFeedback(`✨ Great job! Correct answer!`);
        setTimeout(() => {
          setFeedback(null);
          if (genericStep + 1 >= cards.length) {
            confetti({ particleCount: 75, spread: 60 });
          }
          setGenericStep((s) => s + 1);
        }, 1100);
      } else {
        soundEffects.playTryAgain();
        setFeedback(`Try again! ${card.hintHindi || 'Check carefully!'}`);
      }
    };

    return (
      <div className={`bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-5 md:p-6 border-3 border-cyan-300 shadow-md ${className}`}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-cyan-600" />
            <h4 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
              {activity.title}
            </h4>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white rounded-full border border-cyan-200">
            {isCompleted ? 'Done!' : `Question ${genericStep + 1} of ${cards.length}`}
          </span>
        </div>

        <p className="text-sm font-semibold text-stone-700 mb-1">{activity.instructionEnglish}</p>
        {showHindi && <p className="text-xs font-hindi text-stone-500 mb-4">{activity.instructionHindi}</p>}

        {isCompleted ? (
          <div className="p-6 bg-white rounded-3xl border-2 border-cyan-200 text-center space-y-3">
            <span className="text-5xl">🎉</span>
            <h5 className="text-xl font-extrabold text-stone-900">Activity Complete!</h5>
            <p className="text-sm font-bold text-cyan-800">You scored {genericScore} out of {cards.length}!</p>
            <button
              onClick={() => {
                setGenericStep(0);
                setGenericScore(0);
                setFeedback(null);
              }}
              className="px-5 py-2.5 bg-cyan-600 text-white font-bold rounded-2xl"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-3xl border-2 border-cyan-200 text-center shadow-inner max-w-sm mx-auto">
              {card.emoji && <span className="text-7xl block mb-2 animate-bounce">{card.emoji}</span>}
              <p className={`text-lg text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                {card.prompt || card.word}
              </p>
              {card.meaning && showHindi && (
                <p className="text-xs font-hindi text-stone-500 mt-1">{card.meaning}</p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {card.options?.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => handlePickOption(opt)}
                  className="px-6 py-3 bg-white hover:bg-cyan-400 hover:text-stone-900 text-stone-900 font-extrabold text-base rounded-2xl border-2 border-cyan-300 shadow-bubbly active:scale-95 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>

            {feedback && (
              <p className="text-center text-sm font-bold text-cyan-950 bg-cyan-100 p-2.5 rounded-2xl animate-in fade-in">
                {feedback}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 3. SPEAKING-REPEAT (Stage 9)
  if (activity.type === 'speaking-repeat') {
    const phrases = activity.data.phrases || [];

    return (
      <div className={`bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-5 md:p-6 border-3 border-teal-300 shadow-md ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Volume2 className="w-6 h-6 text-teal-600" />
          <h4 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
            {activity.title}
          </h4>
        </div>
        <p className="text-sm font-semibold text-stone-700 mb-1">{activity.instructionEnglish}</p>
        {showHindi && <p className="text-xs font-hindi text-stone-500 mb-4">{activity.instructionHindi}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {phrases.map((ph: any, idx: number) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-2xl border-2 border-teal-200 shadow-sm flex items-center justify-between gap-3 hover:border-teal-400 transition-all"
            >
              <div>
                <p className={`text-base text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                  "{ph.text}"
                </p>
                {showHindi && <p className="text-xs font-hindi text-stone-500 mt-0.5">{ph.hindi}</p>}
              </div>
              <WordAudioButton text={ph.text} label="Listen & Repeat" size="sm" showSparkle />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. PREPOSITION PICKER (Box and Ball)
  if (activity.type === 'preposition-picker') {
    const options = activity.data.options || [];

    const handlePick = (opt: any) => {
      setChosenPrep(opt.id);
      if (opt.isCorrect) {
        soundEffects.playSuccess();
        confetti({ particleCount: 70, spread: 60 });
      } else {
        soundEffects.playTryAgain();
      }
    };

    return (
      <div className={`bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl p-5 md:p-6 border-3 border-amber-300 shadow-md ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Gamepad2 className="w-6 h-6 text-amber-600" />
          <h4 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
            {activity.title}
          </h4>
        </div>
        <p className="text-sm font-semibold text-stone-800 mb-4">
          👉 {activity.instructionEnglish}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.map((opt: any) => (
            <button
              key={opt.id}
              onClick={() => handlePick(opt)}
              className={`p-4 rounded-2xl border-2 text-center transition-all ${
                chosenPrep === opt.id
                  ? opt.isCorrect
                    ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300'
                    : 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                  : 'bg-white border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span className="text-4xl block mb-2">{opt.emoji}</span>
              <span className={`text-sm ${boldEnglish ? 'font-bold' : 'font-medium'}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 5. TIME TRAVELER (Yesterday, Today, Tomorrow)
  if (activity.type === 'time-traveler') {
    const timeline = activity.data.timeline || [];

    return (
      <div className={`bg-gradient-to-br from-indigo-50 to-pink-50 rounded-3xl p-5 md:p-6 border-3 border-indigo-300 shadow-md ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Gamepad2 className="w-6 h-6 text-indigo-600" />
          <h4 className={`text-lg md:text-xl text-stone-900 ${boldEnglish ? 'font-extrabold' : 'font-semibold'}`}>
            {activity.title}
          </h4>
        </div>
        <p className="text-sm font-semibold text-stone-700 mb-4">
          Click each time portal to hear how verbs travel through time!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {timeline.map((item: any, idx: number) => (
            <div
              key={item.time}
              onClick={() => soundEffects.playPop()}
              className="p-4 bg-white rounded-2xl border-2 border-indigo-200 shadow-sm cursor-pointer hover:border-indigo-400 text-center space-y-2"
            >
              <span className="text-3xl block">
                {item.time === 'Yesterday' ? '⏮️' : item.time === 'Today' ? '▶️' : '⏭️'}
              </span>
              <h5 className="font-extrabold text-indigo-900">{item.time}</h5>
              <div className="p-2 bg-indigo-50 rounded-xl">
                <span className={`text-sm text-stone-900 ${boldEnglish ? 'font-bold' : 'font-medium'}`}>
                  "{item.sentence}"
                </span>
                <div className="mt-1">
                  <WordAudioButton text={item.sentence} size="sm" />
                </div>
              </div>
              {showHindi && (
                <p className="text-xs font-hindi text-stone-500">{item.hindi}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
