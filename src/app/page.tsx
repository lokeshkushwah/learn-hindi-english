"use client";

import React, { useState } from 'react';
import { GRAMMAR_LESSONS, GRAMMAR_NOTES, VOCABULARY_LIST } from '@/data/lessons';
import { GRAMMAR_CHEAT_CODES } from '@/data/cheatCodes';
import { ALL_STAGES } from '@/data/stages';
import { GrammarLesson, StageId } from '@/types';
import { Navbar, MainNavTab } from '@/components/Navbar';
import { LessonProgressTracker } from '@/components/LessonProgressTracker';
import { CurriculumDashboard } from '@/components/CurriculumDashboard';
import { StageOverview } from '@/components/StageOverview';
import { PictureGrammarLesson } from '@/components/PictureGrammarLesson';
import { AlphabetView } from '@/components/AlphabetView';
import { PhonicsView } from '@/components/PhonicsView';
import { GrammarCheatCodeCard } from '@/components/GrammarCheatCodeCard';
import { CommonWordsExplorer } from '@/components/CommonWordsExplorer';
import { EnglishSoundSecretsExplorer } from '@/components/EnglishSoundSecretsExplorer';
import { KidsEssentialsExplorer } from '@/components/KidsEssentialsExplorer';
import { PlayGamesView } from '@/components/PlayGamesView';
import { MyStarsView } from '@/components/MyStarsView';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import { soundEffects } from '@/lib/sounds';
import { ArrowLeft, BookOpen, Sparkles, Layers, MessageSquare, Mic } from 'lucide-react';

export default function HomePage() {
  const { starsCount, completedLessons, completeLesson } = useEnglishProgress();

  const [activeTab, setActiveTab] = useState<MainNavTab>('home');
  const [activeStage, setActiveStage] = useState<StageId>('stage-1');
  const [activeLesson, setActiveLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);

  // Inside 'learn' tab: sub-modes to explore
  const [learnSubTab, setLearnSubTab] = useState<
    'lesson' | 'common-words' | 'kids-essentials' | 'sound-secrets' | 'cheat-codes' | 'phonics' | 'alphabet'
  >('lesson');

  const handleSelectStage = (stage: StageId) => {
    setActiveStage(stage);
    const stageLessons = GRAMMAR_LESSONS.filter((l) => l.stage === stage);
    if (stageLessons.length > 0) {
      setActiveLesson(stageLessons[0]);
    }
  };

  const handleSelectLesson = (lesson: GrammarLesson) => {
    setActiveLesson(lesson);
    setActiveStage(lesson.stage);
    setLearnSubTab('lesson');
    setActiveTab('learn');
  };

  const handleNextLesson = () => {
    const currentIdx = GRAMMAR_LESSONS.findIndex((l) => l.id === activeLesson.id);
    
    // 1. Award stars for current lesson
    completeLesson(activeLesson.id, 5, 5);

    // 2. Determine next lesson (advances to next, or loops back to first stage so game never gets stuck)
    if (currentIdx >= 0 && currentIdx < GRAMMAR_LESSONS.length - 1) {
      const next = GRAMMAR_LESSONS[currentIdx + 1];
      setActiveLesson(next);
      setActiveStage(next.stage);
      soundEffects.playPop();
    } else {
      // Reached the end of all 10 stages! Cycle back to stage 1 with celebration
      const next = GRAMMAR_LESSONS[0];
      setActiveLesson(next);
      setActiveStage(next.stage);
      soundEffects.playCelebration();
    }
  };

  const handleLessonCompleted = (score: number) => {
    completeLesson(activeLesson.id, score, 5);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] pb-20 md:pb-8">
      {/* 1. Simplified Kid-Friendly Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        starsCount={starsCount}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Progress Tracker Bar */}
        <LessonProgressTracker
          completedLessons={completedLessons}
          totalLessons={GRAMMAR_LESSONS.length}
          starsCount={starsCount}
        />

        {/* ========================================================
            TAB 1: HOME (DASHBOARD)
            ======================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Quick Play & Learn Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('learn');
                  setLearnSubTab('lesson');
                }}
                className="bg-gradient-to-br from-amber-400 to-orange-400 p-5 rounded-3xl text-stone-900 shadow-md cursor-pointer hover:scale-102 transition-transform flex items-center justify-between"
              >
                <div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase text-amber-950">
                    Step-by-Step
                  </span>
                  <h3 className="text-lg font-black mt-2">Start Learning 🎨</h3>
                  <p className="text-xs font-bold text-amber-950 mt-1">
                    Alphabet, Phonics & 16 Lessons
                  </p>
                </div>
                <span className="text-3xl">📚</span>
              </div>

              <div
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('learn');
                  setLearnSubTab('kids-essentials');
                }}
                className="bg-gradient-to-br from-emerald-400 to-teal-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex items-center justify-between ring-2 ring-emerald-300"
              >
                <div>
                  <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white">
                    Kids Essentials
                  </span>
                  <h3 className="text-lg font-black mt-2">Days & Numbers 🍎</h3>
                  <p className="text-xs font-bold text-emerald-100 mt-1">
                    Months, Veggies, 1 to Billion
                  </p>
                </div>
                <span className="text-3xl">🗓️</span>
              </div>

              <div
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('learn');
                  setLearnSubTab('common-words');
                }}
                className="bg-gradient-to-br from-rose-400 to-orange-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex items-center justify-between"
              >
                <div>
                  <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white">
                    Daily Vocabulary
                  </span>
                  <h3 className="text-lg font-black mt-2">5,000 Words 🗣️</h3>
                  <p className="text-xs font-bold text-rose-100 mt-1">
                    50 Core & 5,000 Word Bank
                  </p>
                </div>
                <span className="text-3xl">💬</span>
              </div>

              <div
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('learn');
                  setLearnSubTab('sound-secrets');
                }}
                className="bg-gradient-to-br from-teal-500 to-cyan-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex items-center justify-between"
              >
                <div>
                  <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white">
                    Secret of Sound
                  </span>
                  <h3 className="text-lg font-black mt-2">Sound Secrets 👄</h3>
                  <p className="text-xs font-bold text-teal-100 mt-1">
                    जीभ व मुँह की स्थिति
                  </p>
                </div>
                <span className="text-3xl">🎙️</span>
              </div>

              <div
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('play');
                }}
                className="bg-gradient-to-br from-pink-400 to-purple-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex items-center justify-between"
              >
                <div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase text-pink-100">
                    Fun & Games
                  </span>
                  <h3 className="text-lg font-black mt-2">Play Games 🎮</h3>
                  <p className="text-xs font-bold text-pink-100 mt-1">
                    Sound-to-Word & Sentence Map
                  </p>
                </div>
                <span className="text-3xl">🕹️</span>
              </div>
            </div>

            {/* Curriculum Roadmap */}
            <CurriculumDashboard
              lessons={GRAMMAR_LESSONS}
              completedLessons={completedLessons}
              starsCount={starsCount}
              currentLesson={activeLesson}
              onSelectLesson={handleSelectLesson}
              onSelectStage={handleSelectStage}
            />
          </div>
        )}

        {/* ========================================================
            TAB 2: LEARN (ALPHABET, SOUNDS, WORDS & GRAMMAR)
            ======================================================== */}
        {activeTab === 'learn' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Sub-modes Switcher (Simple, Big Buttons) */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/70 rounded-3xl border-2 border-amber-200 shadow-sm max-w-fit mx-auto">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('lesson');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'lesson'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>🎨 Active Lesson</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('kids-essentials');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'kids-essentials'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>🍎 Kids Essentials (महीने, दिन, संख्याएँ)</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('common-words');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'common-words'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>🗣️ 5,000 Words</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('sound-secrets');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'sound-secrets'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>👄 Sound Secrets (ध्वनि का रहस्य)</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('cheat-codes');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'cheat-codes'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>⚡ Cheat Codes</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('phonics');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'phonics'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>⭐ Phonics & Vowels</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setLearnSubTab('alphabet');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  learnSubTab === 'alphabet'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                <span>🔤 Alphabet A–Z</span>
              </button>
            </div>

            {/* Sub-view: Active Lesson */}
            {learnSubTab === 'lesson' && (
              <div className="space-y-6">
                {/* Stage Selector & Learning Path (Grouped without horizontal overflow) */}
                <StageOverview
                  currentStage={activeStage}
                  onSelectStage={handleSelectStage}
                  lessons={GRAMMAR_LESSONS}
                  activeLessonId={activeLesson.id}
                  onSelectLesson={handleSelectLesson}
                  completedLessons={completedLessons}
                />

                {/* Main Picture Grammar Lesson */}
                <div className="pt-2">
                  <PictureGrammarLesson
                    key={activeLesson.id}
                    lesson={activeLesson}
                    onNextLesson={handleNextLesson}
                    onBackToDashboard={() => setActiveTab('home')}
                    onComplete={handleLessonCompleted}
                  />
                </div>
              </div>
            )}

            {/* Sub-view: Kids Essentials (Months, Days, Fruits, Veggies, 1 to Billion) */}
            {learnSubTab === 'kids-essentials' && (
              <KidsEssentialsExplorer
                onBackToDashboard={() => {
                  setActiveTab('learn');
                  setLearnSubTab('lesson');
                }}
              />
            )}

            {/* Sub-view: Common Daily Words Explorer */}
            {learnSubTab === 'common-words' && (
              <CommonWordsExplorer
                onBackToDashboard={() => {
                  setActiveTab('learn');
                  setLearnSubTab('lesson');
                }}
              />
            )}

            {/* Sub-view: English Sound Secrets & Mouth Positions */}
            {learnSubTab === 'sound-secrets' && (
              <EnglishSoundSecretsExplorer
                onBackToDashboard={() => {
                  setActiveTab('learn');
                  setLearnSubTab('lesson');
                }}
              />
            )}

            {/* Sub-view: Alphabet View */}
            {learnSubTab === 'alphabet' && <AlphabetView />}

            {/* Sub-view: Phonics View */}
            {learnSubTab === 'phonics' && <PhonicsView />}

            {/* Sub-view: Cheat Codes */}
            {learnSubTab === 'cheat-codes' && (
              <GrammarCheatCodeCard cheatCodes={GRAMMAR_CHEAT_CODES} />
            )}
          </div>
        )}

        {/* ========================================================
            TAB 3: PLAY (INTERACTIVE LEARNING GAMES)
            ======================================================== */}
        {activeTab === 'play' && (
          <PlayGamesView
            onEarnStar={(count) => {
              completeLesson('game-play-' + Date.now(), count, count);
            }}
          />
        )}

        {/* ========================================================
            TAB 4: MY STARS (ACHIEVEMENTS & BADGES)
            ======================================================== */}
        {activeTab === 'stars' && (
          <MyStarsView
            starsCount={starsCount}
            completedLessonsCount={completedLessons.length}
            totalLessonsCount={GRAMMAR_LESSONS.length}
            onContinueLearning={() => {
              setActiveTab('learn');
              setLearnSubTab('lesson');
            }}
            onPlayGames={() => setActiveTab('play')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-100/60 border-t-2 border-amber-200 py-6 mt-12 text-center text-xs text-stone-600 space-y-1">
        <p className="font-bold text-stone-800">
          English Kids Learning Academy • Designed for 6-Year-Old Hindi-Speaking Children
        </p>
        <p className="font-hindi text-stone-500">
          हिंदी भाषी बच्चों के लिए चित्रों, आवाज़ों और खेलों के साथ सरल अंग्रेजी
        </p>
      </footer>
    </div>
  );
}
