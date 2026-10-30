"use client";

import React, { useState, useEffect } from 'react';
import { GrammarLesson, PictureExample } from '@/types';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { generateBlankChallenge, generateWordBuilderChallenge } from '@/lib/gameWordUtils';
import { useSpeech } from '@/hooks/useSpeech';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Star,
  Trophy,
  Volume2,
  Check,
  Undo2,
  Award,
} from 'lucide-react';

interface InteractiveLearningGameProps {
  lesson: GrammarLesson;
  onNextLesson?: () => void;
  onBackToDashboard?: () => void;
  onComplete?: (score: number) => void;
}

export function InteractiveLearningGame({
  lesson,
  onNextLesson,
  onBackToDashboard,
  onComplete,
}: InteractiveLearningGameProps) {
  const { speakEnglish, speakHindi } = useSpeech();

  // Current active step (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Lesson primary example word
  const primaryExample: PictureExample = lesson.examples[0] || {
    id: 'default-ex',
    englishWord: 'Apple',
    hindiWord: 'सेब',
    englishSentence: 'This is an apple.',
    hindiSentence: 'यह एक सेब है।',
    illustration: { emoji: '🍎', bgGradient: 'from-red-400 to-rose-500', description: 'Red apple' },
  };

  const secondExample: PictureExample = lesson.examples[1] || primaryExample;
  const thirdExample: PictureExample = lesson.examples[2] || primaryExample;

  // STEP 2: Listen & Choose State
  const [listenChosen, setListenChosen] = useState<string | null>(null);
  const [listenCorrect, setListenCorrect] = useState<boolean | null>(null);

  // STEP 3: Fill in Blank State
  const [blankChallenge, setBlankChallenge] = useState(() =>
    generateBlankChallenge(primaryExample.englishWord)
  );
  const [selectedBlankLetter, setSelectedBlankLetter] = useState<string | null>(null);
  const [blankSolved, setBlankSolved] = useState<boolean>(false);

  // STEP 4: Build a Word State
  const wordToBuild = lesson.examples[1]?.englishWord || 'CAT';
  const [wordChallenge, setWordChallenge] = useState(() =>
    generateWordBuilderChallenge(wordToBuild)
  );
  const [builtLetters, setBuiltLetters] = useState<{ id: string; letter: string }[]>([]);
  const [buildSolved, setBuildSolved] = useState<boolean>(false);

  // STEP 5: Grammar Game State
  const [grammarAnswer1, setGrammarAnswer1] = useState<string | null>(null);
  const [grammarSubmitted1, setGrammarSubmitted1] = useState<boolean>(false);
  const [selectedSentenceWord, setSelectedSentenceWord] = useState<string | null>(null);
  const [grammarSentenceSolved, setGrammarSentenceSolved] = useState<boolean>(false);

  // STEP 6: Stars and Score State
  const [score, setScore] = useState<number>(5);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  // Step metadata
  const stepsMeta = [
    { num: 1, title: 'Look & Read', hindi: 'देखें और पढ़ें', emoji: '👀' },
    { num: 2, title: 'Listen & Choose', hindi: 'सुनें और चुनें', emoji: '👂' },
    { num: 3, title: 'Fill in the Blank', hindi: 'अक्षर भरें', emoji: '✏️' },
    { num: 4, title: 'Build a Word', hindi: 'शब्द बनाएं', emoji: '🧩' },
    { num: 5, title: 'Grammar Game', hindi: 'व्याकरण का खेल', emoji: '🎯' },
    { num: 6, title: 'Win & Stars', hindi: 'जीत और सितारे', emoji: '🏆' },
  ];

  // Auto-pronounce on Step 1 load
  useEffect(() => {
    if (currentStep === 1) {
      speakEnglish(primaryExample.englishWord);
    }
  }, [currentStep, primaryExample.englishWord, speakEnglish]);

  // Reset all game step state when lesson changes
  useEffect(() => {
    setCurrentStep(1);
    setListenChosen(null);
    setListenCorrect(null);
    setSelectedBlankLetter(null);
    setBlankSolved(false);
    setBuiltLetters([]);
    setBuildSolved(false);
    setGrammarAnswer1(null);
    setGrammarSubmitted1(false);
    setSelectedSentenceWord(null);
    setGrammarSentenceSolved(false);
    setHasCompleted(false);
    setBlankChallenge(generateBlankChallenge(primaryExample.englishWord));
    setWordChallenge(generateWordBuilderChallenge(lesson.examples[1]?.englishWord || 'CAT'));
  }, [lesson.id, primaryExample.englishWord, lesson.examples]);

  const handleNextStep = () => {
    if (currentStep < 6) {
      soundEffects.playSuccess();
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      soundEffects.playPop();
      setCurrentStep((s) => s - 1);
    }
  };

  // Step 2 Listen & Choose handler
  const handleSelectListenOption = (word: string) => {
    setListenChosen(word);
    if (word.toLowerCase() === primaryExample.englishWord.toLowerCase()) {
      soundEffects.playSuccess();
      setListenCorrect(true);
    } else {
      soundEffects.playPop();
      setListenCorrect(false);
    }
  };

  // Step 3 Fill in blank handler
  const handleChooseBlankLetter = (letter: string) => {
    setSelectedBlankLetter(letter);
    speakEnglish(letter); // Speak selected letter out loud!
    if (letter === blankChallenge.hiddenLetter) {
      soundEffects.playSuccess();
      setBlankSolved(true);
      setTimeout(() => speakEnglish(blankChallenge.fullWord), 350);
    } else {
      soundEffects.playPop();
      setBlankSolved(false);
    }
  };

  // Step 4 Build a word handlers
  const handleTapTile = (tile: { id: string; letter: string }) => {
    if (buildSolved) return;
    if (builtLetters.some((b) => b.id === tile.id)) return;

    soundEffects.playPop();
    speakEnglish(tile.letter); // Speak the tapped letter tile out loud!
    const newBuilt = [...builtLetters, tile];
    setBuiltLetters(newBuilt);

    const builtWord = newBuilt.map((b) => b.letter).join('');
    if (builtWord === wordChallenge.fullWord) {
      soundEffects.playSuccess();
      setBuildSolved(true);
      setTimeout(() => speakEnglish(wordChallenge.fullWord), 350);
    }
  };

  const handleUndoBuild = () => {
    if (builtLetters.length > 0 && !buildSolved) {
      soundEffects.playPop();
      setBuiltLetters(builtLetters.slice(0, -1));
    }
  };

  const handleResetBuild = () => {
    soundEffects.playPop();
    setBuiltLetters([]);
    setBuildSolved(false);
  };

  // STEP 5: Dynamic Grammar Sentence Configuration
  const grammarConfig = React.useMemo(() => {
    if (lesson.id === 'lesson-noun') {
      return {
        sentenceWords: ['The', 'dog', 'runs'],
        correctWord: 'dog',
        promptEnglish: 'Tap the Noun in this sentence:',
        promptHindi: 'इस वाक्य में Noun (नाम वाले शब्द) पर टैप करें:',
        explanation: '🎉 Yes! "dog" is an animal, so it is a Noun! (कुत्ता एक जानवर यानी Noun है!)',
      };
    }
    if (lesson.id === 'lesson-pronouns') {
      return {
        sentenceWords: ['She', 'is', 'a', 'kind', 'girl'],
        correctWord: 'She',
        promptEnglish: 'Tap the Pronoun (She):',
        promptHindi: 'इस वाक्य में Pronoun (सर्वनाम: She) पर टैप करें:',
        explanation: '🎉 Correct! "She" is a pronoun used in place of a girl\'s name! (लड़की के लिए She)',
      };
    }
    if (lesson.id === 'lesson-verbs') {
      return {
        sentenceWords: ['The', 'puppy', 'can', 'jump', 'high'],
        correctWord: 'jump',
        promptEnglish: 'Tap the Action Verb (Doing Word):',
        promptHindi: 'इस वाक्य में काम दर्शाने वाले शब्द (Action Verb: jump) पर टैप करें:',
        explanation: '🎉 Super! "jump" is the action that the puppy does! (कूदना एक क्रिया है)',
      };
    }
    if (lesson.id === 'lesson-articles') {
      return {
        sentenceWords: ['I', 'eat', 'an', 'apple'],
        correctWord: 'an',
        promptEnglish: 'Tap the vowel-sound article (an):',
        promptHindi: 'स्वर ध्वनि से पहले आने वाले आर्टिकल (an) पर टैप करें:',
        explanation: '🎉 Perfect! "an" comes before vowel sounds like apple! (An apple)',
      };
    }
    if (lesson.id === 'lesson-singular-plural') {
      return {
        sentenceWords: ['Three', 'cats', 'are', 'playing'],
        correctWord: 'cats',
        promptEnglish: 'Tap the Plural Word (Many):',
        promptHindi: 'एक से अधिक (Plural) शब्द पर टैप करें:',
        explanation: '🎉 Yes! "cats" has -s at the end because there are three cats! (तीन बिल्लियाँ)',
      };
    }
    if (lesson.id === 'lesson-this-that') {
      return {
        sentenceWords: ['These', 'are', 'sweet', 'apples'],
        correctWord: 'These',
        promptEnglish: 'Tap the near-pointing plural word (These):',
        promptHindi: 'पास में रखी कई चीज़ों के शब्द (These) पर टैप करें:',
        explanation: '🎉 Correct! "These" is used for many things close to your hand! (पास में कई चीज़ें = These)',
      };
    }
    if (lesson.id === 'lesson-simple-sentences') {
      return {
        sentenceWords: ['I', 'am', 'very', 'happy'],
        correctWord: 'am',
        promptEnglish: 'Tap the helping verb for "I":',
        promptHindi: '"I" के साथ आने वाले शब्द पर टैप करें:',
        explanation: '🎉 Perfect! "I am" always go together! (मैं हूँ)',
      };
    }
    if (lesson.id === 'lesson-sentence-builder') {
      return {
        sentenceWords: ['She', 'plays', 'cricket'],
        correctWord: 'plays',
        promptEnglish: 'Tap the action verb:',
        promptHindi: 'इस वाक्य में क्रिया (Action Verb) पर टैप करें:',
        explanation: '🎉 Super! "plays" is the action what she is doing! (खेलना क्रिया है)',
      };
    }
    if (lesson.id === 'lesson-tenses') {
      return {
        sentenceWords: ['I', 'played', 'yesterday'],
        correctWord: 'yesterday',
        promptEnglish: 'Tap the past time clue:',
        promptHindi: 'बीते हुए कल के शब्द (yesterday) पर टैप करें:',
        explanation: '🎉 Yes! "yesterday" means the day that has passed! (बीता हुआ कल)',
      };
    }
    if (lesson.id === 'lesson-prepositions') {
      return {
        sentenceWords: ['Rohan', 'walks', 'from', 'school', 'to', 'home'],
        correctWord: 'from',
        promptEnglish: 'Tap the preposition (from):',
        promptHindi: 'शुरुआत की जगह दर्शाने वाले शब्द (from = से) पर टैप करें:',
        explanation: '🎉 Exactly! "from" shows starting place (school से) and "to" shows destination (home को)! Prepositions: In, On, Under, From, To!',
      };
    }
    // Generic fallback
    const rawSentence = lesson.examples[0]?.englishSentence || 'The girl is happy.';
    const cleanWords = rawSentence.replace(/[.!?]/g, '').split(' ');
    const target = lesson.examples[0]?.englishWord || cleanWords[1] || cleanWords[0];
    return {
      sentenceWords: cleanWords,
      correctWord: target,
      promptEnglish: `Tap "${target}" in this sentence:`,
      promptHindi: `इस वाक्य में "${target}" पर टैप करें:`,
      explanation: `🎉 Wonderful job! You found "${target}"!`,
    };
  }, [lesson]);

  const handleTapSentenceWord = (w: string) => {
    setSelectedSentenceWord(w);
    if (w.toLowerCase() === grammarConfig.correctWord.toLowerCase()) {
      soundEffects.playSuccess();
      setGrammarSentenceSolved(true);
    } else {
      soundEffects.playPop();
    }
  };

  // Step 6: Completion event
  useEffect(() => {
    if (currentStep === 6 && !hasCompleted) {
      setHasCompleted(true);
      if (onComplete) {
        onComplete(5);
      }
    }
  }, [currentStep, hasCompleted, onComplete]);

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* 1. Header Bar: Back Button, Title, and Step Progress */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-md flex items-center justify-between gap-3">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-amber-100 hover:bg-amber-200 text-stone-800 rounded-2xl font-black text-xs sm:text-sm border border-amber-300 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Center Progress Stepper */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {stepsMeta.map((st) => (
            <div
              key={st.num}
              onClick={() => {
                soundEffects.playPop();
                setCurrentStep(st.num);
              }}
              title={`${st.title} (${st.hindi})`}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm cursor-pointer transition-all ${
                currentStep === st.num
                  ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-105'
                  : currentStep > st.num
                  ? 'bg-emerald-400 text-white'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              <span>{currentStep > st.num ? '✓' : st.emoji}</span>
            </div>
          ))}
        </div>

        {/* Step Counter Label */}
        <div className="text-right">
          <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider block">
            Step {currentStep} of 6
          </span>
          <span className="text-xs font-bold text-stone-700 hidden sm:inline">
            {stepsMeta[currentStep - 1].title}
          </span>
        </div>
      </div>

      {/* 2. Main Game Activity Card (Single focus at a time) */}
      <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-xl p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
        {/* ==========================================================
            STEP 1: LOOK AND READ
            ========================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 my-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-black text-amber-900 uppercase">
              Step 1: Look & Read • देखें और पढ़ें
            </div>

            {/* Giant Picture Card */}
            <div className="w-40 h-40 sm:w-52 sm:h-52 mx-auto rounded-3xl bg-gradient-to-br from-amber-200 via-orange-100 to-amber-300 border-4 border-amber-300 flex items-center justify-center text-7xl sm:text-8xl shadow-lg transform hover:scale-105 transition-transform select-none">
              {primaryExample.illustration.emoji}
            </div>

            {/* Big English Word & Hindi Meaning */}
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl font-black text-stone-950 tracking-tight">
                {primaryExample.englishWord.toUpperCase()}
              </h2>
              <p className="font-hindi text-2xl sm:text-3xl font-bold text-stone-600">
                {primaryExample.hindiWord}
              </p>
            </div>

            {/* Audio Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <WordAudioButton
                text={primaryExample.englishWord}
                speechText={primaryExample.englishWord}
                label="Listen"
                size="lg"
                showSparkle
                className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-black shadow-md"
              />
              <HindiAudioButton
                text={primaryExample.hindiWord}
                label="हिंदी में समझें"
                size="lg"
              />
            </div>
          </div>
        )}

        {/* ==========================================================
            STEP 2: LISTEN AND CHOOSE
            ========================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 my-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 border border-blue-300 text-xs font-black text-blue-900 uppercase">
              Step 2: Listen & Choose • सुनें और पहचानें
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                Which picture did you hear?
              </h3>
              <p className="font-hindi text-base text-stone-600 font-medium">
                आवाज़ सुनें और सही चित्र पर टैप करें:
              </p>

              {/* Play Audio Button */}
              <div className="pt-2">
                <WordAudioButton
                  text={primaryExample.englishWord}
                  speechText={primaryExample.englishWord}
                  label={`Listen to Word`}
                  size="lg"
                  showSparkle
                  className="bg-blue-500 hover:bg-blue-600 text-white font-black mx-auto"
                />
              </div>
            </div>

            {/* 3 Picture Choices */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto pt-2">
              {[primaryExample, secondExample, thirdExample].map((ex, idx) => {
                const isSelected = listenChosen === ex.englishWord;
                const isCorrect = ex.englishWord.toLowerCase() === primaryExample.englishWord.toLowerCase();

                let cardStyle = 'bg-stone-50 border-stone-200 text-stone-900 hover:bg-amber-50';
                if (isSelected) {
                  cardStyle = isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 scale-105'
                    : 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200';
                }

                return (
                  <button
                    key={`${ex.englishWord}-${idx}`}
                    onClick={() => handleSelectListenOption(ex.englishWord)}
                    className={`p-4 sm:p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all shadow-sm active:scale-95 ${cardStyle}`}
                  >
                    <span className="text-5xl sm:text-6xl mb-2">{ex.illustration.emoji}</span>
                    <span className="text-base sm:text-lg font-black">{ex.englishWord}</span>
                    <span className="font-hindi text-xs text-stone-500">{ex.hindiWord}</span>
                  </button>
                );
              })}
            </div>

            {/* Immediate Feedback Notice */}
            {listenChosen && (
              <div
                className={`p-3 rounded-2xl max-w-sm mx-auto font-black text-sm flex items-center justify-center gap-2 ${
                  listenCorrect
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                <span>{listenCorrect ? '🎉 Super! That is correct!' : '🤔 Try again! Listen carefully!'}</span>
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
            STEP 3: FILL IN THE BLANK
            ========================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 my-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs font-black text-purple-900 uppercase">
              Step 3: Fill in the Blank • छूटा हुआ अक्षर चुनें
            </div>

            {/* Picture Badge */}
            <div
              onClick={() => speakEnglish(primaryExample.englishWord)}
              role="button"
              tabIndex={0}
              title={`Click to listen: "${primaryExample.englishWord}"`}
              className="cursor-pointer w-28 h-28 mx-auto rounded-3xl bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 hover:border-amber-400 flex items-center justify-center text-6xl shadow-md transition-all hover:scale-105 active:scale-95 group select-none"
            >
              <span className="group-hover:scale-110 transition-transform">{primaryExample.illustration.emoji}</span>
            </div>

            {/* Audio Buttons Row */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <WordAudioButton
                text={primaryExample.englishWord}
                speechText={primaryExample.englishWord}
                label={`Listen "${primaryExample.englishWord}"`}
                size="sm"
                className="bg-amber-100 hover:bg-amber-200 border-amber-300 font-bold"
              />
              <HindiAudioButton text={primaryExample.hindiWord} size="sm" label="हिंदी अर्थ" />
            </div>

            {/* Word Display with Blank */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-5xl font-black font-mono tracking-wider">
                {blankChallenge.fullWord.split('').map((char, i) => {
                  const isHidden = i === blankChallenge.hiddenIndex;
                  return (
                    <div
                      key={i}
                      className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl border-3 flex items-center justify-center ${
                        isHidden
                          ? blankSolved
                            ? 'bg-emerald-400 border-emerald-500 text-white animate-bounce'
                            : 'bg-amber-100 border-amber-400 text-amber-900 ring-4 ring-amber-200'
                          : 'bg-stone-50 border-stone-300 text-stone-800'
                      }`}
                    >
                      {isHidden ? (blankSolved ? char : '_') : char}
                    </div>
                  );
                })}
              </div>

              <p className="font-hindi text-base text-stone-600 font-semibold pt-1">
                खाली स्थान में कौन सा अक्षर आएगा?
              </p>
            </div>

            {/* Options */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
              {blankChallenge.options.map((opt) => {
                const isSelected = selectedBlankLetter === opt;
                let btnStyle = 'bg-white border-amber-300 text-stone-900 hover:bg-amber-100';
                if (isSelected) {
                  btnStyle =
                    opt === blankChallenge.hiddenLetter
                      ? 'bg-emerald-500 border-emerald-600 text-white font-black ring-4 ring-emerald-300'
                      : 'bg-rose-500 border-rose-600 text-white font-black ring-4 ring-rose-300';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleChooseBlankLetter(opt)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 text-2xl sm:text-3xl font-black shadow-md transition-all active:scale-95 ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {blankSolved && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl max-w-sm mx-auto text-emerald-950 font-black text-sm animate-in zoom-in-95">
                🌟 Perfect! {blankChallenge.fullWord} = {primaryExample.hindiWord}
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
            STEP 4: BUILD A WORD
            ========================================================== */}
        {currentStep === 4 && (
          <div className="space-y-5 text-center animate-in zoom-in-95 my-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-900 uppercase">
              Step 4: Build a Word • अक्षरों से शब्द बनाएं
            </div>

            {/* Target Word Picture */}
            <div
              onClick={() => speakEnglish(wordChallenge.fullWord)}
              role="button"
              tabIndex={0}
              title={`Click to listen: "${wordChallenge.fullWord}"`}
              className="cursor-pointer w-24 h-24 mx-auto rounded-3xl bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 hover:border-amber-400 flex items-center justify-center text-6xl shadow-md transition-all hover:scale-105 active:scale-95 group select-none"
            >
              <span className="group-hover:scale-110 transition-transform">{secondExample.illustration.emoji}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Spell the word: "{wordChallenge.fullWord}"
              </h3>
              <p className="font-hindi text-sm text-stone-600 font-bold">
                {secondExample.hindiWord}
              </p>
            </div>

            {/* Audio Buttons Row */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <WordAudioButton
                text={wordChallenge.fullWord}
                speechText={wordChallenge.fullWord}
                label={`Listen "${wordChallenge.fullWord}"`}
                size="sm"
                className="bg-amber-100 hover:bg-amber-200 border-amber-300 font-bold"
              />
              <HindiAudioButton text={secondExample.hindiWord} size="sm" label="हिंदी अर्थ" />
            </div>

            <p className="font-hindi text-xs text-stone-500">
              नीचे दिए गए अक्षरों को सही क्रम में टैप करें:
            </p>

            {/* Word Slots */}
            <div className="flex items-center justify-center gap-2 py-1">
              {wordChallenge.targetLetters.map((_, i) => {
                const filled = builtLetters[i];
                return (
                  <div
                    key={i}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-3 flex items-center justify-center text-2xl font-black ${
                      filled
                        ? buildSolved
                          ? 'bg-emerald-400 border-emerald-500 text-white'
                          : 'bg-amber-300 border-amber-400 text-stone-950 shadow-sm'
                        : 'bg-stone-100 border-dashed border-stone-300 text-stone-400'
                    }`}
                  >
                    {filled ? filled.letter : ''}
                  </div>
                );
              })}
            </div>

            {/* Shuffled Letter Tiles */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-md mx-auto pt-2">
              {wordChallenge.tiles.map((t) => {
                const isUsed = builtLetters.some((b) => b.id === t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTapTile(t)}
                    disabled={isUsed || buildSolved}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-3 text-xl sm:text-2xl font-black transition-all active:scale-95 ${
                      isUsed
                        ? 'opacity-30 bg-stone-200 border-stone-300 cursor-not-allowed'
                        : 'bg-white border-amber-300 text-stone-900 hover:bg-amber-100 shadow-md'
                    }`}
                  >
                    {t.letter}
                  </button>
                );
              })}
            </div>

            {/* Undo & Reset buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleUndoBuild}
                disabled={builtLetters.length === 0 || buildSolved}
                className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl border border-stone-300 disabled:opacity-40"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>
              <button
                onClick={handleResetBuild}
                className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl border border-stone-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================
            STEP 5: LEARN GRAMMAR THROUGH A GAME
            ========================================================== */}
        {currentStep === 5 && (
          <div className="space-y-5 text-center animate-in zoom-in-95 my-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-100 border border-pink-300 text-xs font-black text-pink-900 uppercase">
              Step 5: Grammar Game • खेल में सीखें व्याकरण
            </div>

            {/* Visual Pictures for the Rule */}
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {lesson.examples.slice(0, 4).map((ex) => (
                <div
                  key={ex.id}
                  className="bg-amber-50 p-2 sm:p-3 rounded-2xl border-2 border-amber-200 text-center"
                >
                  <span className="text-3xl sm:text-4xl block mb-1">{ex.illustration.emoji}</span>
                  <span className="text-xs font-black text-stone-900">{ex.englishWord}</span>
                </div>
              ))}
            </div>

            {/* Simple Grammar Explanation */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-4 max-w-lg mx-auto space-y-2">
              <p className="text-xl sm:text-2xl font-black text-stone-950">
                "{lesson.ruleEnglish}"
              </p>
              <p className="font-hindi text-sm sm:text-base font-bold text-stone-700">
                {lesson.ruleHindi}
              </p>
              <div className="pt-1 flex items-center justify-center gap-2">
                <WordAudioButton text={lesson.ruleEnglish} label="Rule Audio" size="sm" />
                <HindiAudioButton text={lesson.ruleHindi} label="हिंदी में समझें" size="sm" />
              </div>
            </div>

            {/* Sentence Tap Game */}
            <div className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-4 sm:p-5 max-w-lg mx-auto space-y-3">
              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg font-black text-stone-900">
                  🎮 {grammarConfig.promptEnglish}
                </h4>
                <p className="font-hindi text-xs sm:text-sm text-stone-600 font-semibold">
                  {grammarConfig.promptHindi}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {grammarConfig.sentenceWords.map((w) => {
                  const isChosen = selectedSentenceWord === w;
                  const isCorrect = w.toLowerCase() === grammarConfig.correctWord.toLowerCase();
                  let style = 'bg-white border-stone-300 text-stone-900 hover:bg-amber-100';
                  if (isChosen) {
                    style = isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white font-black'
                      : 'bg-rose-500 border-rose-600 text-white font-black';
                  }

                  return (
                    <button
                      key={w}
                      onClick={() => handleTapSentenceWord(w)}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-3 text-lg sm:text-xl font-black shadow-sm transition-all active:scale-95 ${style}`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>

              {grammarSentenceSolved && (
                <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-950 font-black text-xs sm:text-sm animate-in zoom-in-95">
                  {grammarConfig.explanation}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================================
            STEP 6: WIN AND CONTINUE
            ========================================================== */}
        {currentStep === 6 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 my-auto">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-6xl shadow-xl animate-bounce">
              🏆
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-4xl sm:text-5xl">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-stone-950">
                You Won 5 Stars! ⭐
              </h2>

              <p className="text-base sm:text-lg font-bold text-amber-900">
                {lesson.encouragingMessage.english}
              </p>
              <p className="font-hindi text-sm sm:text-base font-semibold text-stone-600">
                {lesson.encouragingMessage.hindi}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setCurrentStep(1);
                  setListenChosen(null);
                  setBlankSolved(false);
                  setBuildSolved(false);
                  setBuiltLetters([]);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-white text-stone-800 font-black text-sm rounded-2xl border-2 border-stone-300 shadow-sm active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again 🔄</span>
              </button>

              {onNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-black text-white font-black text-base rounded-2xl shadow-xl transition-transform active:scale-95"
                >
                  <span>Next Game 🚀</span>
                  <ArrowRight className="w-5 h-5 text-amber-300" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3. Footer Bottom Nav: Simple Back and Next Buttons */}
        <div className="border-t-2 border-stone-100 pt-4 mt-6 flex items-center justify-between gap-3">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
              currentStep === 1
                ? 'opacity-30 cursor-not-allowed text-stone-400'
                : 'bg-white border-2 border-stone-300 text-stone-800 hover:bg-stone-50 active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep < 6 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-sm sm:text-base rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : onNextLesson ? (
            <button
              onClick={onNextLesson}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-stone-900 hover:bg-black text-white font-black text-sm sm:text-base rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Next Game 🚀</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
