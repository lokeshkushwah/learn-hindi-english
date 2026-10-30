"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { GrammarLesson } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useSpeech } from '@/hooks/useSpeech';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { LESSON_STEP_CONFIGS, LessonStepConfig } from '@/data/lessonStepConfigs';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Star,
  Award,
  Volume2,
  HeartHandshake,
  Wand2,
} from 'lucide-react';

interface StepByStepGrammarLessonProps {
  lesson: GrammarLesson;
  onNextLesson?: () => void;
}

export function StepByStepGrammarLesson({
  lesson,
  onNextLesson,
}: StepByStepGrammarLessonProps) {
  const { mode, boldEnglish, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();
  const { speakEnglish, speakHindi } = useSpeech();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Dynamic lesson step config for Step 5 & Step 7
  const config: LessonStepConfig = useMemo(() => {
    if (LESSON_STEP_CONFIGS[lesson.id]) {
      return LESSON_STEP_CONFIGS[lesson.id];
    }
    // Smart fallback if a custom lesson ID is passed
    return {
      step5: {
        headingEnglish: `Step 5: The 4 Core Patterns of ${lesson.titleEnglish}`,
        headingHindi: `${lesson.titleHindi} के 4 मुख्य प्रकार`,
        subheadingEnglish: `Explore the key building blocks of ${lesson.titleEnglish}!`,
        subheadingHindi: `इस पाठ के मुख्य उदाहरणों को समझें!`,
        cards: lesson.examples.slice(0, 4).map((ex, i) => ({
          tagEnglish: ex.categoryTag || `Type ${i + 1}`,
          tagHindi: ex.categoryTag || `प्रकार ${i + 1}`,
          emoji: ex.illustration.emoji,
          word: ex.englishWord,
          hindiWord: ex.hindiWord,
          bgColor: i === 0 ? 'bg-pink-50' : i === 1 ? 'bg-blue-50' : i === 2 ? 'bg-amber-50' : 'bg-emerald-50',
          borderColor: i === 0 ? 'border-pink-300' : i === 1 ? 'border-blue-300' : i === 2 ? 'border-amber-300' : 'border-emerald-300',
          tagBgColor: i === 0 ? 'bg-pink-200' : i === 1 ? 'bg-blue-200' : i === 2 ? 'bg-amber-200' : 'bg-emerald-200',
          tagTextColor: i === 0 ? 'text-pink-900' : i === 1 ? 'text-blue-900' : i === 2 ? 'text-amber-900' : 'text-emerald-900',
        })),
      },
      step7: {
        headingEnglish: 'Step 7: Check Your Understanding',
        headingHindi: 'अपनी समझ की जाँच करें',
        subheadingEnglish: `Let's test what you learned about ${lesson.titleEnglish}!`,
        emoji: lesson.examples[0]?.illustration.emoji || '🎯',
        questionEnglish: lesson.quiz[0]?.promptEnglish || `Choose the correct answer for ${lesson.titleEnglish}:`,
        questionHindi: lesson.quiz[0]?.promptHindi || `${lesson.titleHindi} के लिए सही विकल्प चुनें:`,
        options: lesson.quiz[0]?.options.map((o) => o.textEnglish) || ['Option 1', 'Option 2'],
        correctAnswer: lesson.quiz[0]?.options.find((o) => o.isCorrect)?.textEnglish || '',
        successEnglish: 'Super Job! You solved it correctly!',
        successHindi: 'शाबाश! आपने बिल्कुल सही उत्तर दिया!',
        hintEnglish: lesson.quiz[0]?.explanationEnglish || 'Think about the rule we just learned!',
        hintHindi: lesson.quiz[0]?.explanationHindi || 'अभी सीखे गए नियम को याद करें!',
      },
    };
  }, [lesson]);

  // Step 7: Check understanding state
  const [step7Answer, setStep7Answer] = useState<string | null>(null);
  const [step7Submitted, setStep7Submitted] = useState<boolean>(false);

  // Step 8: Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Reset all states when lesson changes
  useEffect(() => {
    setCurrentStep(1);
    setStep7Answer(null);
    setStep7Submitted(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [lesson.id]);

  const stepsList = [
    { num: 1, title: 'Look at Pictures', emoji: '👀' },
    { num: 2, title: 'Listen to Words', emoji: '👂' },
    { num: 3, title: 'English Rule', emoji: '🗣️' },
    { num: 4, title: 'हिंदी में समझें', emoji: '🇮🇳' },
    { num: 5, title: 'Categories', emoji: '🗂️' },
    { num: 6, title: 'Sentences', emoji: '💬' },
    { num: 7, title: 'Quick Check', emoji: '🎯' },
    { num: 8, title: 'Quiz & Finish', emoji: '🏆' },
  ];

  const handleStepChange = (step: number) => {
    soundEffects.playPop();
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    if (currentStep < 8) {
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

  // Step 7 logic using dynamic config
  const checkOptions = config.step7.options;
  const checkCorrectAnswer = config.step7.correctAnswer;
  const isStep7Correct = step7Answer === checkCorrectAnswer;

  const handleSelectStep7 = (opt: string) => {
    setStep7Answer(opt);
    setStep7Submitted(true);
    if (opt === checkCorrectAnswer) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playPop();
    }
  };

  const handleResetStep7 = () => {
    setStep7Answer(null);
    setStep7Submitted(false);
  };

  // Step 8 Quiz evaluation
  const handleSelectQuizOption = (qId: string, optId: string) => {
    soundEffects.playPop();
    setQuizAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const calculateScore = () => {
    let score = 0;
    lesson.quiz.forEach((q) => {
      const selected = quizAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected && correctOpt && selected === correctOpt.id) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-xl overflow-hidden animate-in fade-in">
      {/* 1. Header Banner & Stepper Navigation */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-5 md:p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <span>🚀 8-Step Interactive Teaching</span>
              <span>•</span>
              <span>Step {currentStep} of 8</span>
            </div>
            <h2
              className={`text-2xl md:text-3xl drop-shadow ${
                boldEnglish ? 'font-black' : 'font-bold'
              }`}
            >
              {lesson.titleEnglish}
            </h2>
            {showHindi && (
              <p className="text-base md:text-lg font-hindi font-medium text-amber-100">
                {lesson.titleHindi}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl">
              {stepsList[currentStep - 1].emoji}
            </span>
            <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-2xl text-xs font-extrabold">
              {stepsList[currentStep - 1].title}
            </div>
          </div>
        </div>

        {/* Stepper Dots Bar */}
        <div className="mt-5 grid grid-cols-4 sm:grid-cols-8 gap-2">
          {stepsList.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;
            return (
              <button
                key={step.num}
                onClick={() => handleStepChange(step.num)}
                className={`py-2 px-1 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-lg ring-2 ring-white scale-105'
                    : isCompleted
                    ? 'bg-amber-600/50 text-white hover:bg-white/30'
                    : 'bg-black/20 text-white/70 hover:bg-black/30'
                }`}
              >
                <span className="text-sm">{step.emoji}</span>
                <span className="text-[10px] leading-tight">Step {step.num}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Step Body Content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* ========================================================
            STEP 1: LOOK AT THE PICTURE
            ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-5xl block animate-bounce">👀</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Step 1: Look at the Pictures
              </h3>
              <p className="text-stone-600 text-sm">
                Take a close look at these wonderful pictures. Can you name them?
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  इन सुंदर चित्रों को ध्यान से देखें। क्या आप इन्हें पहचानते हैं?
                </p>
              )}
            </div>

            {/* Helper Banner for Sound */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 text-center flex items-center justify-center gap-2 max-w-lg mx-auto shadow-sm">
              <Volume2 className="w-5 h-5 text-amber-600 animate-bounce" />
              <span className="text-xs sm:text-sm font-bold text-amber-900 font-hindi">
                💡 किसी भी चित्र पर टैप करके उसकी आवाज़ सुनें! (Tap picture or button to listen)
              </span>
            </div>

            {/* Large Picture Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-2">
              {lesson.examples.slice(0, 4).map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => speakEnglish(ex.englishWord)}
                  role="button"
                  tabIndex={0}
                  title={`Click to listen: "${ex.englishWord}"`}
                  className="cursor-pointer bg-white border-3 border-amber-300 hover:border-amber-500 rounded-3xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:scale-103 transition-all justify-between group active:scale-95"
                >
                  <div
                    className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br ${ex.illustration.bgGradient} flex items-center justify-center text-5xl md:text-6xl shadow-md select-none mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <span className="drop-shadow">{ex.illustration.emoji}</span>
                  </div>
                  <div className="space-y-1">
                    <h4
                      className={`text-xl md:text-2xl text-stone-900 ${
                        boldEnglish ? 'font-black' : 'font-bold'
                      }`}
                    >
                      {ex.englishWord}
                    </h4>
                    {showHindi && (
                      <p className="font-hindi text-sm font-semibold text-stone-600">
                        {ex.hindiWord}
                      </p>
                    )}
                    {ex.categoryTag && (
                      <span className="inline-block text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-amber-100 text-stone-900 rounded-full border border-amber-300 mt-1">
                        {ex.categoryTag}
                      </span>
                    )}
                  </div>
                  {/* Dedicated Dual Audio Buttons Row */}
                  <div
                    className="mt-3 flex items-center justify-center gap-2 w-full pt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WordAudioButton
                      text={ex.englishWord}
                      speechText={ex.englishWord}
                      size="sm"
                      label="Listen"
                      className="flex-1 justify-center bg-amber-50 hover:bg-amber-100 border-amber-300 font-bold"
                    />
                    {showHindi && (
                      <HindiAudioButton
                        text={ex.hindiWord}
                        size="sm"
                        label="हिंदी"
                        className="flex-1 justify-center"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: LISTEN TO THE ENGLISH WORD
            ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-5xl block animate-bounce">👂</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Step 2: Listen to the English Word
              </h3>
              <p className="text-stone-600 text-sm">
                Tap each speaker button below to hear the exact English pronunciation clearly!
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  हर शब्द की साफ़ अंग्रेजी आवाज़ सुनने के लिए स्पीकर बटन दबाएं!
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {lesson.examples.slice(0, 4).map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white border-3 border-amber-300 rounded-3xl p-5 flex flex-col items-center text-center shadow-md hover:border-amber-400 transition-all space-y-3"
                >
                  <span className="text-5xl">{ex.illustration.emoji}</span>
                  <div>
                    <h4
                      className={`text-xl text-stone-950 ${
                        boldEnglish ? 'font-black' : 'font-bold'
                      }`}
                    >
                      {ex.englishWord}
                    </h4>
                    {showHindi && (
                      <p className="font-hindi text-xs text-stone-500 mt-0.5">
                        {ex.hindiWord}
                      </p>
                    )}
                  </div>
                  <WordAudioButton
                    text={ex.englishWord}
                    speechText={ex.englishWord}
                    label={`Play "${ex.englishWord}"`}
                    size="md"
                    showSparkle
                    className="w-full justify-center"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: EXPLAIN IN ENGLISH
            ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-5xl block animate-bounce">🗣️</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Step 3: What is a {lesson.titleEnglish}?
              </h3>
              <p className="text-stone-600 text-sm">
                Here is the simple English definition for young superstars!
              </p>
            </div>

            {/* English Definition Card */}
            <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-6 md:p-8 space-y-4 shadow-bubbly text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-400 text-stone-950 flex items-center justify-center text-3xl mx-auto shadow-md">
                💡
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200 px-3 py-1 rounded-full">
                  Golden English Rule
                </span>
                <p
                  className={`text-2xl md:text-3xl text-stone-950 leading-relaxed ${
                    boldEnglish ? 'font-black' : 'font-bold'
                  }`}
                >
                  "{lesson.ruleEnglish}"
                </p>
                <p className="text-sm md:text-base text-stone-600 font-medium">
                  {lesson.childExplanationEnglish}
                </p>

                {showHindi && (
                  <div className="mt-3 p-3 bg-orange-100/70 border border-orange-300 rounded-2xl text-stone-900 font-hindi">
                    <p className="text-base font-bold">
                      🇮🇳 हिंदी में अर्थ: "{lesson.ruleHindi}"
                    </p>
                    {lesson.childExplanationHindi && (
                      <p className="text-xs text-stone-700 mt-1">
                        👉 {lesson.childExplanationHindi}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <WordAudioButton
                  text={`${lesson.titleEnglish}. ${lesson.ruleEnglish}`}
                  speechText={lesson.ruleEnglish}
                  label="Listen English Rule 🔊"
                  size="md"
                  showSparkle
                  className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold"
                />
                {showHindi && (
                  <HindiAudioButton
                    text={lesson.ruleHindi}
                    speechText={lesson.ruleHindi}
                    label="हिंदी में सुनें 🔊"
                    size="md"
                    showSparkle
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: EXPLAIN IN HINDI
            ======================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-5xl block animate-bounce">🇮🇳</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Step 4: हिंदी में समझें (Listen & Read in Hindi)
              </h3>
              <p className="text-stone-600 text-sm">
                Understand the rule in simple Hindi with your own dedicated Hindi audio voice!
              </p>
            </div>

            {/* Hindi Explanation Card */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-3 border-orange-300 rounded-3xl p-6 md:p-8 space-y-4 shadow-bubbly text-center font-hindi">
              <div className="w-16 h-16 rounded-3xl bg-orange-500 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
                🇮🇳
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-800 bg-orange-200 px-3 py-1 rounded-full">
                  हिंदी में नियम
                </span>
                <p className="text-2xl md:text-3xl text-stone-900 leading-relaxed font-bold">
                  "{lesson.ruleHindi}"
                </p>
                <p className="text-base text-stone-700 font-medium">
                  {lesson.childExplanationHindi}
                </p>
                {lesson.difficultyNoteHindi && (
                  <p className="text-xs text-amber-900 bg-amber-100 p-2.5 rounded-2xl border border-amber-200 inline-block mt-2">
                    💡 जादुई तरकीब: {lesson.difficultyNoteHindi}
                  </p>
                )}
              </div>

              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <HindiAudioButton
                  text={lesson.ruleHindi}
                  label="हिंदी में सुनें"
                  size="lg"
                  showSparkle
                />
                <WordAudioButton
                  text={lesson.ruleEnglish}
                  label="Listen in English"
                  size="lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 5: SHOW THE CATEGORIES WITH PICTURES (DYNAMIC PER LESSON)
            ======================================================== */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-5xl block animate-bounce">🗂️</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                {config.step5.headingEnglish}
              </h3>
              <p className="text-stone-600 text-sm">
                {config.step5.subheadingEnglish}
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  {config.step5.subheadingHindi}
                </p>
              )}
            </div>

            {/* Special Vowel Guide: When is a sound Short vs Long? */}
            {config.step5.vowelGuide && (
              <div className="space-y-6">
                {/* 3 Golden Rules Explanation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Rule 1: Short Sound */}
                  <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🔤</span>
                      <h4 className="font-black text-amber-950 text-base">
                        1. Short Sound (CVC)
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-stone-800 leading-relaxed">
                      {config.step5.vowelGuide.shortRuleEn}
                    </p>
                    {showHindi && (
                      <p className="text-xs font-hindi text-amber-900 font-medium leading-relaxed pt-1 border-t border-amber-200">
                        {config.step5.vowelGuide.shortRuleHi}
                      </p>
                    )}
                  </div>

                  {/* Rule 2: Magic E */}
                  <div className="bg-pink-50 border-3 border-pink-300 rounded-3xl p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🪄</span>
                      <h4 className="font-black text-pink-950 text-base">
                        2. Magic 'E' Rule
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-stone-800 leading-relaxed">
                      {config.step5.vowelGuide.magicERuleEn}
                    </p>
                    {showHindi && (
                      <p className="text-xs font-hindi text-pink-900 font-medium leading-relaxed pt-1 border-t border-pink-200">
                        {config.step5.vowelGuide.magicERuleHi}
                      </p>
                    )}
                  </div>

                  {/* Rule 3: Two Vowels Walking */}
                  <div className="bg-emerald-50 border-3 border-emerald-300 rounded-3xl p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🚶‍♂️🚶‍♀️</span>
                      <h4 className="font-black text-emerald-950 text-base">
                        3. Two Vowels Walking
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-stone-800 leading-relaxed">
                      {config.step5.vowelGuide.twoVowelsRuleEn}
                    </p>
                    {showHindi && (
                      <p className="text-xs font-hindi text-emerald-900 font-medium leading-relaxed pt-1 border-t border-emerald-200">
                        {config.step5.vowelGuide.twoVowelsRuleHi}
                      </p>
                    )}
                  </div>
                </div>

                {/* Comparative Pairs: Short Word vs Magic E Long Word */}
                <div className="bg-stone-50 border-3 border-amber-300 rounded-3xl p-5 md:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
                    <div>
                      <h4 className="text-lg font-black text-stone-900 flex items-center gap-2">
                        <span>🪄</span>
                        <span>Listen to the Magic Difference! (Short vs Long)</span>
                      </h4>
                      <p className="text-xs font-hindi text-amber-800 font-bold">
                        दोनों बटनों को दबाकर Short और Long आवाज़ का अंतर खुद सुनें!
                      </p>
                    </div>
                    <span className="text-xs font-black text-stone-500">
                      5 Magic Transformation Pairs
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {config.step5.vowelGuide.pairs.map((pair, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-4 shadow-sm space-y-3 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 bg-amber-100 text-stone-900 rounded-full font-black text-[11px]">
                            Vowel {pair.vowel}
                          </span>
                          <span className="font-extrabold text-[11px] text-pink-700 bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-200">
                            {pair.transformationFormula}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 items-stretch">
                          {/* Short Word */}
                          <div
                            onClick={() => speakEnglish(pair.shortWord)}
                            role="button"
                            tabIndex={0}
                            title={`Listen short sound: ${pair.shortWord}`}
                            className="cursor-pointer bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-center hover:scale-102 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-3xl block">{pair.shortEmoji}</span>
                              <h5 className="text-lg font-black text-stone-900 mt-1">
                                {pair.shortWord}
                              </h5>
                              <p className="text-[11px] font-hindi font-semibold text-stone-600 line-clamp-1">
                                {pair.shortHindi}
                              </p>
                            </div>
                            <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                              <WordAudioButton
                                text={pair.shortWord}
                                speechText={pair.shortWord}
                                size="sm"
                                label="Short"
                                className="w-full justify-center"
                              />
                            </div>
                          </div>

                          {/* Long Word with Magic E */}
                          <div
                            onClick={() => speakEnglish(pair.longWord)}
                            role="button"
                            tabIndex={0}
                            title={`Listen long sound: ${pair.longWord}`}
                            className="cursor-pointer bg-pink-50/70 p-2.5 rounded-xl border border-pink-200 text-center hover:scale-102 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-3xl block">{pair.longEmoji}</span>
                              <h5 className="text-lg font-black text-pink-700 mt-1">
                                {pair.longWord}
                              </h5>
                              <p className="text-[11px] font-hindi font-semibold text-stone-600 line-clamp-1">
                                {pair.longHindi}
                              </p>
                            </div>
                            <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                              <WordAudioButton
                                text={pair.longWord}
                                speechText={pair.longWord}
                                size="sm"
                                label="Long"
                                className="w-full justify-center bg-pink-100 hover:bg-pink-200 border-pink-300 text-pink-900"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Standard Category / Sound Family Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {config.step5.cards.map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => speakEnglish(card.word)}
                  role="button"
                  tabIndex={0}
                  title={`Click to listen: "${card.word}"`}
                  className={`cursor-pointer ${card.bgColor} border-3 ${card.borderColor} hover:border-amber-500 rounded-3xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:scale-102 transition-all space-y-2`}
                >
                  <span
                    className={`px-3 py-1 ${card.tagBgColor} ${card.tagTextColor} font-black text-xs uppercase rounded-full`}
                  >
                    {card.tagEnglish}
                  </span>
                  <span className="text-6xl my-2 select-none">{card.emoji}</span>
                  <h4
                    className={`text-xl md:text-2xl text-stone-950 ${
                      boldEnglish ? 'font-black' : 'font-bold'
                    }`}
                  >
                    {card.word}
                  </h4>
                  {showHindi && (
                    <p className="text-xs text-stone-600 font-hindi">{card.hindiWord}</p>
                  )}
                  <div className="pt-1 w-full" onClick={(e) => e.stopPropagation()}>
                    <WordAudioButton
                      text={card.word}
                      speechText={card.word}
                      size="sm"
                      label="Listen"
                      className="w-full justify-center font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 6: TEACH EXAMPLE SENTENCES
            ======================================================== */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-5xl block animate-bounce">💬</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Step 6: Example Sentences in Action
              </h3>
              <p className="text-stone-600 text-sm">
                Listen to the full English sentence, then listen to the Hindi translation!
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  अंग्रेजी वाक्य सुनें, और फिर अलग से हिंदी अनुवाद सुनें!
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {lesson.examples.slice(0, 4).map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white border-3 border-stone-200 rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-amber-400 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-5xl flex-shrink-0">{ex.illustration.emoji}</span>
                    <div className="space-y-1">
                      <h4
                        className={`text-xl text-stone-900 ${
                          boldEnglish ? 'font-black' : 'font-bold'
                        }`}
                      >
                        {ex.englishSentence}
                      </h4>
                      {showHindi && (
                        <p className="font-hindi text-base text-stone-600 font-medium">
                          {ex.hindiSentence}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
                    <WordAudioButton
                      text={ex.englishSentence}
                      speechText={ex.englishSentence}
                      label="English Voice"
                      size="sm"
                    />
                    <HindiAudioButton
                      text={ex.hindiSentence}
                      label="हिंदी आवाज़"
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 7: CHECK UNDERSTANDING (DYNAMIC PER LESSON)
            ======================================================== */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-5xl block animate-bounce">🎯</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                {config.step7.headingEnglish}
              </h3>
              <p className="text-stone-600 text-sm">
                {config.step7.subheadingEnglish}
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  {config.step7.headingHindi}
                </p>
              )}
            </div>

            {/* Dynamic Challenge Card */}
            <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-6 md:p-8 space-y-5 text-center shadow-bubbly">
              <div className="w-28 h-28 rounded-3xl bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-6xl md:text-7xl mx-auto shadow-md">
                {config.step7.emoji}
              </div>

              <div className="space-y-1">
                <h4
                  className={`text-xl md:text-2xl text-stone-950 ${
                    boldEnglish ? 'font-black' : 'font-bold'
                  }`}
                >
                  {config.step7.questionEnglish}
                </h4>
                {showHindi && (
                  <p className="font-hindi text-base text-stone-700 font-semibold">
                    {config.step7.questionHindi}
                  </p>
                )}
              </div>

              {/* Dynamic Selectable Options */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {checkOptions.map((opt) => {
                  const isSelected = step7Answer === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectStep7(opt)}
                      disabled={step7Submitted && isStep7Correct}
                      className={`py-3.5 px-4 rounded-2xl font-black text-sm md:text-base transition-all border-3 active:scale-95 ${
                        isSelected
                          ? isStep7Correct
                            ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg'
                            : 'bg-rose-500 border-rose-600 text-white shadow-lg'
                          : 'bg-white border-amber-200 text-stone-800 hover:bg-amber-100 hover:border-amber-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Retry Area */}
              {step7Submitted && (
                <div
                  className={`p-4 rounded-2xl border-2 text-center space-y-3 animate-in zoom-in-95 ${
                    isStep7Correct
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                      : 'bg-rose-100 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">
                      {isStep7Correct ? '🎉' : '🤔'}
                    </span>
                    <p className="font-black text-lg">
                      {isStep7Correct
                        ? config.step7.successEnglish
                        : 'Oops! Not quite. Try again!'}
                    </p>
                  </div>

                  {showHindi && (
                    <p className="font-hindi text-sm">
                      {isStep7Correct
                        ? config.step7.successHindi
                        : config.step7.hintHindi}
                    </p>
                  )}

                  <div className="flex justify-center gap-3 pt-1">
                    {!isStep7Correct && (
                      <button
                        onClick={handleResetStep7}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-stone-900 font-black text-xs rounded-xl border border-stone-300 shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    )}
                    {isStep7Correct && (
                      <button
                        onClick={handleNextStep}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md"
                      >
                        <span>Go to Step 8: Quiz!</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 8: PRACTICE AND FINISH (QUIZ & SCORE)
            ======================================================== */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-5xl block animate-bounce">🏆</span>
              <h3
                className={`text-2xl md:text-3xl text-stone-900 ${
                  boldEnglish ? 'font-black' : 'font-bold'
                }`}
              >
                Step 8: Practice and Finish!
              </h3>
              <p className="text-stone-600 text-sm">
                Answer {lesson.quiz.length} fun questions to earn your shining stars!
              </p>
              {showHindi && (
                <p className="font-hindi text-amber-800 text-sm font-semibold">
                  सितारे जीतने के लिए {lesson.quiz.length} प्रश्नों के उत्तर दें!
                </p>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {lesson.quiz.map((q, idx) => {
                const selectedOptId = quizAnswers[q.id];
                const isAnswered = Boolean(selectedOptId);

                return (
                  <div
                    key={q.id}
                    className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-5 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{q.imageEmoji}</span>
                          <h4
                            className={`text-lg text-stone-900 ${
                              boldEnglish ? 'font-black' : 'font-bold'
                            }`}
                          >
                            {q.promptEnglish}
                          </h4>
                        </div>
                        {showHindi && (
                          <p className="font-hindi text-xs text-stone-500 mt-1">
                            {q.promptHindi}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isChosen = selectedOptId === opt.id;
                        let btnStyle =
                          'bg-white border-stone-200 text-stone-800 hover:bg-amber-50';

                        if (quizSubmitted) {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-black';
                          } else if (isChosen && !opt.isCorrect) {
                            btnStyle = 'bg-rose-500 border-rose-600 text-white font-black';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-amber-400 border-amber-500 text-stone-950 font-black';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectQuizOption(q.id, opt.id)}
                            className={`p-3 rounded-2xl border-2 text-sm font-bold flex items-center justify-center gap-2 transition-all ${btnStyle}`}
                          >
                            {opt.emoji && <span>{opt.emoji}</span>}
                            <span>{opt.textEnglish}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit & Results */}
            <div className="pt-2 text-center space-y-4">
              {!quizSubmitted ? (
                <button
                  onClick={() => {
                    soundEffects.playSuccess();
                    setQuizSubmitted(true);
                  }}
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-base md:text-lg rounded-2xl shadow-lg transform active:scale-95 transition-all"
                >
                  ⭐ Check My Score!
                </button>
              ) : (
                <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-pink-100 border-3 border-amber-400 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl animate-in zoom-in-95">
                  <div className="text-6xl animate-bounce">🌟</div>
                  <h4 className="text-3xl font-black text-stone-900">
                    You Scored: {score} / {lesson.quiz.length}!
                  </h4>

                  <p className="text-lg font-black text-amber-900">
                    {lesson.encouragingMessage.english}
                  </p>
                  {showHindi && (
                    <p className="font-hindi text-base text-stone-700 font-semibold">
                      {lesson.encouragingMessage.hindi}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-stone-800 font-extrabold text-sm rounded-2xl border-2 border-stone-300 shadow-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Try Quiz Again</span>
                    </button>

                    {onNextLesson && (
                      <button
                        onClick={onNextLesson}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-black text-white font-black text-base rounded-2xl shadow-lg transition-transform active:scale-95"
                      >
                        <span>Next Lesson 🚀</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Footer Bottom Nav: Previous Step / Next Step */}
      <div className="bg-stone-50 border-t-2 border-stone-200 p-4 md:p-5 flex items-center justify-between">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
            currentStep === 1
              ? 'opacity-40 cursor-not-allowed text-stone-400'
              : 'bg-white border-2 border-stone-300 text-stone-800 hover:bg-stone-100 shadow-sm active:scale-95'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <div className="text-xs font-black text-stone-500 hidden sm:block">
          Step {currentStep} of 8: {stepsList[currentStep - 1].title}
        </div>

        {currentStep < 8 ? (
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs md:text-sm rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : onNextLesson ? (
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-black text-white font-black text-xs md:text-sm rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
