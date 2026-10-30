"use client";

import React, { useState } from 'react';
import { GrammarLesson } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { PictureExampleCard } from './PictureExampleCard';
import { GrammarStory } from './GrammarStory';
import { InteractiveActivity } from './InteractiveActivity';
import { PictureQuiz } from './PictureQuiz';
import { StepByStepGrammarLesson } from './StepByStepGrammarLesson';
import { InteractiveLearningGame } from './InteractiveLearningGame';
import { AdvancedGrammarHub } from './AdvancedGrammarHub';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  BookOpen,
  Gamepad2,
  Star,
  RotateCcw,
} from 'lucide-react';
import { soundEffects } from '@/lib/sounds';

interface PictureGrammarLessonProps {
  lesson: GrammarLesson;
  onNextLesson?: () => void;
  onBackToDashboard?: () => void;
  onComplete?: (score: number) => void;
}

export function PictureGrammarLesson({
  lesson,
  onNextLesson,
  onBackToDashboard,
  onComplete,
}: PictureGrammarLessonProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  // If this is the Advanced Learning Path (Stage 10), render the full AdvancedGrammarHub
  if (lesson.stage === 'stage-10' || lesson.id === 'lesson-advanced-path') {
    return (
      <AdvancedGrammarHub
        onBackToDashboard={onBackToDashboard}
        onNextLesson={onNextLesson}
      />
    );
  }

  // Primary Kid-Friendly Actions: 8-Step Teaching (Default) | Interactive Game | Cards | Practice Quiz | Story
  const [activeAction, setActiveAction] = useState<
    'game' | 'step-by-step' | 'learn' | 'listen' | 'practice' | 'story'
  >('step-by-step');

  const handleActionChange = (
    action: 'game' | 'step-by-step' | 'learn' | 'listen' | 'practice' | 'story'
  ) => {
    soundEffects.playPop();
    setActiveAction(action);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Large, Friendly Picture Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur rounded-full border border-white/30">
              {lesson.topicBadge}
            </span>

            <h1
              className={`text-3xl md:text-5xl drop-shadow ${boldEnglish ? 'font-black tracking-tight' : 'font-semibold'
                }`}
            >
              {lesson.titleEnglish}
            </h1>

            {showHindi && (
              <p className="text-xl md:text-2xl font-hindi font-medium text-amber-100 drop-shadow">
                {lesson.titleHindi}
              </p>
            )}

            <div className="space-y-1.5">
              <p className="text-base text-white/95 leading-relaxed font-medium">
                {lesson.summaryEnglish}
              </p>
              {lesson.summaryHindi && showHindi && (
                <p className="text-sm text-amber-100 font-hindi font-bold leading-relaxed bg-black/20 p-2 rounded-xl border border-white/20">
                  🇮🇳 {lesson.summaryHindi}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <HindiAudioButton
                text={`${lesson.titleHindi}। ${lesson.ruleHindi}`}
                speechText={`${lesson.titleHindi}। ${lesson.ruleHindi}`}
                label="हिंदी में नियम सुनें"
                size="md"
                showSparkle
                className="bg-amber-300 text-stone-950 font-black border-2 border-white shadow-md hover:bg-amber-200"
              />
              <WordAudioButton
                text={`${lesson.titleEnglish}. ${lesson.ruleEnglish}`}
                label="Listen English Rule"
                size="md"
                className="bg-white text-stone-900 border-none shadow-md font-bold"
              />
              {onBackToDashboard && (
                <button
                  onClick={onBackToDashboard}
                  className="px-4 py-2 bg-black/20 hover:bg-black/30 text-white font-black text-xs rounded-2xl border border-white/30 backdrop-blur transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Levels</span>
                </button>
              )}
            </div>
          </div>

          {/* Hero Illustration Badge */}
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-3xl bg-white/20 backdrop-blur-md border-3 border-white/40 flex flex-col items-center justify-center p-4 shadow-2xl flex-shrink-0 animate-pulse">
            <span className="text-7xl md:text-8xl drop-shadow-lg select-none">
              {lesson.heroIllustration.emoji}
            </span>
            <span className="text-[11px] font-bold text-white text-center mt-2 px-2 bg-black/20 rounded-full py-0.5">
              {lesson.heroIllustration.subtitle}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Top-Level Bilingual Topic Explanation Banner (यह विषय क्या होता है?) */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-3xl p-5 md:p-7 border-3 border-amber-300 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xl shadow-sm">
              💡
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-stone-950 flex flex-wrap items-center gap-2">
                <span>यह विषय क्या होता है?</span>
                <span className="text-sm md:text-base font-extrabold text-amber-700 font-sans">
                  (What is {lesson.titleEnglish}?)
                </span>
              </h2>
              <p className="text-xs font-bold text-stone-600 font-hindi">
                नीचे आसान हिंदी में नियम व अर्थ पढ़ें और स्पीकर बटन दबाकर आवाज़ सुनें:
              </p>
            </div>
          </div>

          {/* Dual Audio Quick Buttons */}
          <div className="flex items-center gap-2">
            <HindiAudioButton
              text={`${lesson.titleHindi}। ${lesson.ruleHindi}`}
              speechText={`${lesson.titleHindi}। ${lesson.ruleHindi}`}
              label="हिंदी में पूरा नियम सुनें 🔊"
              size="sm"
              showSparkle
              className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-black shadow-sm"
            />
            <WordAudioButton
              text={lesson.ruleEnglish}
              speechText={lesson.ruleEnglish}
              label="English 🔊"
              size="sm"
              className="bg-white hover:bg-stone-50 text-stone-900 border-amber-300 font-bold"
            />
          </div>
        </div>

        {/* Bilingual Definitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hindi Definition Card */}
          <div className="bg-white/90 backdrop-blur rounded-2xl p-4 border-2 border-orange-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-block px-2.5 py-0.5 bg-orange-100 text-orange-950 rounded-full text-xs font-black font-hindi">
                🇮🇳 हिंदी में समझें (Hindi Definition):
              </span>
              <HindiAudioButton
                text={lesson.ruleHindi}
                label="सुनें"
                size="sm"
              />
            </div>
            <p className="font-hindi text-base md:text-lg font-bold text-stone-900 leading-relaxed">
              "{lesson.ruleHindi}"
            </p>
            {lesson.childExplanationHindi && (
              <p className="font-hindi text-xs md:text-sm text-stone-600 leading-normal pt-1 border-t border-orange-100">
                👉 {lesson.childExplanationHindi}
              </p>
            )}
          </div>

          {/* English Definition Card */}
          <div className="bg-white/90 backdrop-blur rounded-2xl p-4 border-2 border-amber-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-950 rounded-full text-xs font-black font-sans">
                🇬🇧 English Rule:
              </span>
              <WordAudioButton
                text={lesson.ruleEnglish}
                speechText={lesson.ruleEnglish}
                label="Listen"
                size="sm"
              />
            </div>
            <p className="text-base md:text-lg font-bold text-stone-900 leading-relaxed font-sans">
              "{lesson.ruleEnglish}"
            </p>
            {lesson.childExplanationEnglish && (
              <p className="text-xs md:text-sm text-stone-600 leading-normal pt-1 border-t border-amber-100 font-sans">
                👉 {lesson.childExplanationEnglish}
              </p>
            )}
          </div>
        </div>

        {/* Memory Trick / जादुई तरकीब */}
        {lesson.difficultyNoteHindi && (
          <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm font-hindi font-bold text-amber-950">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span>
                <strong>जादुई याद रखने की तरकीब:</strong> {lesson.difficultyNoteHindi}
              </span>
            </div>
            <HindiAudioButton
              text={`जादुई तरकीब: ${lesson.difficultyNoteHindi}`}
              size="sm"
              label="तरकीब सुनें"
              className="flex-shrink-0 self-end sm:self-auto"
            />
          </div>
        )}
      </section>

      {/* 2. Simplified Action Pills for 6-Year-Olds */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/70 rounded-3xl border-2 border-amber-200 shadow-sm max-w-fit mx-auto">
        <button
          onClick={() => handleActionChange('step-by-step')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base transition-all ${activeAction === 'step-by-step'
              ? 'bg-amber-400 text-stone-900 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
            }`}
        >
          <span>🚀 1. Learn Step-by-Step</span>
        </button>

        <button
          onClick={() => handleActionChange('game')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base transition-all ${activeAction === 'game'
              ? 'bg-amber-400 text-stone-900 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
            }`}
        >
          <span>🎮 2. Interactive Game</span>
        </button>

        <button
          onClick={() => handleActionChange('learn')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base transition-all ${activeAction === 'learn'
              ? 'bg-amber-400 text-stone-900 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
            }`}
        >
          <span>👀 3. Picture Cards</span>
        </button>

        <button
          onClick={() => handleActionChange('practice')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base transition-all ${activeAction === 'practice'
              ? 'bg-amber-400 text-stone-900 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
            }`}
        >
          <span>🎯 4. Practice Quiz</span>
        </button>

        {lesson.story && (
          <button
            onClick={() => handleActionChange('story')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base transition-all ${activeAction === 'story'
                ? 'bg-amber-400 text-stone-900 shadow-md ring-2 ring-amber-300 scale-102'
                : 'text-stone-700 hover:bg-white/60'
              }`}
          >
            <span>📖 5. Story</span>
          </button>
        )}
      </div>

      {/* 3. Action Views */}

      {/* INTERACTIVE LEARNING GAME (DEFAULT) */}
      {activeAction === 'game' && (
        <InteractiveLearningGame
          key={lesson.id}
          lesson={lesson}
          onNextLesson={onNextLesson}
          onBackToDashboard={onBackToDashboard}
          onComplete={onComplete}
        />
      )}

      {/* STEP-BY-STEP GUIDED TEACHING (DEFAULT) */}
      {activeAction === 'step-by-step' && (
        <StepByStepGrammarLesson
          key={lesson.id}
          lesson={lesson}
          onNextLesson={onNextLesson}
        />
      )}

      {/* LEARN TAB */}
      {activeAction === 'learn' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main Rule Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border-3 border-amber-300 shadow-bubbly space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-black text-sm">
                💡
              </span>
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-700">
                The Golden Grammar Rule
              </h3>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <p
                className={`text-xl md:text-2xl text-stone-950 ${boldEnglish ? 'font-black tracking-tight' : 'font-semibold'
                  }`}
              >
                "{lesson.ruleEnglish}"
              </p>
              <WordAudioButton text={lesson.ruleEnglish} size="md" showSparkle />
            </div>

            {showHindi && (
              <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200 font-hindi">
                <p className="text-base md:text-lg font-semibold text-stone-800">
                  {lesson.ruleHindi}
                </p>
              </div>
            )}

            <div className="pt-2 flex items-start gap-3 text-stone-700 text-sm">
              <span className="text-2xl">🧸</span>
              <div>
                <p className={boldEnglish ? 'font-bold' : 'font-medium'}>
                  {lesson.childExplanationEnglish}
                </p>
                {showHindi && (
                  <p className="font-hindi text-stone-500 mt-1">
                    {lesson.childExplanationHindi}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Picture Examples Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-black text-stone-900">
                Picture Cards (Tap to hear sound!)
              </h3>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                {lesson.examples.length} Cards
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lesson.examples.map((ex) => (
                <PictureExampleCard key={ex.id} example={ex} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LISTEN TAB */}
      {activeAction === 'listen' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-3xl border-3 border-teal-200 text-center space-y-2">
            <span className="text-5xl block animate-bounce">🎧</span>
            <h3 className="text-2xl font-black text-stone-900">Listen & Repeat Audio Practice</h3>
            <p className="text-xs text-stone-600">
              Clean spoken pronunciation with no technical symbols or slashes!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.examples.map((ex) => (
              <div
                key={ex.id}
                className="bg-white p-5 rounded-3xl border-2 border-stone-200 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{ex.illustration.emoji}</span>
                  <div>
                    <h4 className={`text-lg text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                      {ex.englishWord}
                    </h4>
                    <p className="text-xs text-stone-600">"{ex.englishSentence}"</p>
                    {showHindi && (
                      <p className="text-[11px] font-hindi text-stone-500 mt-0.5">
                        {ex.hindiWord}
                      </p>
                    )}
                  </div>
                </div>

                <WordAudioButton
                  text={ex.englishSentence}
                  speechText={ex.speechText || ex.englishSentence}
                  label="Listen"
                  size="md"
                  showSparkle
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRACTICE TAB */}
      {activeAction === 'practice' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Interactive Activity Game */}
          <InteractiveActivity activity={lesson.activity} />

          {/* Picture Quiz */}
          <PictureQuiz questions={lesson.quiz} topicTitle={lesson.titleEnglish} />
        </div>
      )}

      {/* STORY TAB */}
      {activeAction === 'story' && lesson.story && (
        <GrammarStory title={lesson.story.title} panels={lesson.story.panels} />
      )}

      {/* Bottom Navigation & Next Action Button */}
      <section className="bg-gradient-to-r from-emerald-100 via-teal-100 to-sky-100 p-6 rounded-3xl border-3 border-emerald-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-bounce">🌟</span>
          <div>
            <h4 className={`text-lg md:text-xl text-emerald-950 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
              {lesson.encouragingMessage.english}
            </h4>
            {showHindi && (
              <p className="text-sm font-hindi text-emerald-800">
                {lesson.encouragingMessage.hindi}
              </p>
            )}
          </div>
        </div>

        {onNextLesson && (
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Next Topic 🚀</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </section>
    </div>
  );
}
