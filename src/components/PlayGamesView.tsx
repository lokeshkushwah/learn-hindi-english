"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import {
  PLAY_TOPICS,
  TOPIC_PLAY_WORDS,
  TOPIC_DETECTIVE_QUESTIONS,
  TOPIC_SENTENCE_CHALLENGES,
  PlayTopic,
  PlayWordItem,
  DetectiveQuestion,
  SentenceChallenge,
} from '@/data/topicWisePlayData';
import {
  Sparkles,
  RotateCcw,
  Star,
  Trophy,
  CheckCircle2,
  Volume2,
  Undo2,
  ArrowRight,
  Puzzle,
  Headphones,
  Search,
  Filter,
  Check,
} from 'lucide-react';
import { SoundToWordBuilder } from './SoundToWordBuilder';
import { SoundToSentenceBuilder } from './SoundToSentenceBuilder';
import { PhonicsSpellingRulesGuide } from './PhonicsSpellingRulesGuide';

interface PlayGamesViewProps {
  onEarnStar?: (count: number) => void;
}

type GameMode =
  | 'sound-word-builder'
  | 'sound-sentence-builder'
  | 'phonics-rules'
  | 'word-builder'
  | 'listen-choose'
  | 'missing-letter'
  | 'grammar-detective'
  | 'sentence-master';

// Utility helper to safely shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function PlayGamesView({ onEarnStar }: PlayGamesViewProps) {
  const { speakEnglish, speakHindi } = useSpeech();
  const [activeGame, setActiveGame] = useState<GameMode>('sound-word-builder');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const topicScrollRef = React.useRef<HTMLDivElement>(null);

  const handleScrollTopics = (direction: 'left' | 'right') => {
    soundEffects.playPop();
    if (topicScrollRef.current) {
      topicScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  // Filter words by topic
  const activeWords = useMemo<PlayWordItem[]>(() => {
    if (selectedTopicId === 'all') return TOPIC_PLAY_WORDS;
    const filtered = TOPIC_PLAY_WORDS.filter((w) => w.topicId === selectedTopicId);
    return filtered.length > 0 ? filtered : TOPIC_PLAY_WORDS;
  }, [selectedTopicId]);

  // Filter detective questions by topic
  const activeQuestions = useMemo<DetectiveQuestion[]>(() => {
    if (selectedTopicId === 'all') return TOPIC_DETECTIVE_QUESTIONS;
    const filtered = TOPIC_DETECTIVE_QUESTIONS.filter((q) => q.topicId === selectedTopicId);
    return filtered.length > 0 ? filtered : TOPIC_DETECTIVE_QUESTIONS;
  }, [selectedTopicId]);

  // Filter sentence challenges by topic
  const activeSentences = useMemo<SentenceChallenge[]>(() => {
    if (selectedTopicId === 'all') return TOPIC_SENTENCE_CHALLENGES;
    const filtered = TOPIC_SENTENCE_CHALLENGES.filter((s) => s.topicId === selectedTopicId);
    return filtered.length > 0 ? filtered : TOPIC_SENTENCE_CHALLENGES;
  }, [selectedTopicId]);

  // ========================================================
  // GAME 1: WORD BUILDER
  // ========================================================
  const [wbIndex, setWbIndex] = useState<number>(0);
  const currentWb = activeWords[wbIndex % activeWords.length] || activeWords[0];
  const [wbPlaced, setWbPlaced] = useState<string[]>([]);
  const [wbSolved, setWbSolved] = useState<boolean>(false);
  const [wbTiles, setWbTiles] = useState<{ id: string; letter: string }[]>([]);

  // Refresh tiles with genuinely dynamic distractors whenever current word changes
  useEffect(() => {
    if (!currentWb) return;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((c) => !currentWb.letters.includes(c));
    const randomDistractors = shuffleArray(alphabet).slice(0, 2);
    const list = [...currentWb.letters, ...randomDistractors];
    setWbTiles(shuffleArray(list.map((l, i) => ({ id: `${l}-${i}-${Math.random()}`, letter: l }))));
    setWbPlaced([]);
    setWbSolved(false);
  }, [currentWb?.word, wbIndex]);

  const handleNextWbWord = () => {
    soundEffects.playPop();
    const nextIdx = (wbIndex + 1) % activeWords.length;
    setWbIndex(nextIdx);
    const nextWord = activeWords[nextIdx];
    if (nextWord) speakEnglish(nextWord.word);
  };

  const handlePrevWbWord = () => {
    soundEffects.playPop();
    const prevIdx = (wbIndex - 1 + activeWords.length) % activeWords.length;
    setWbIndex(prevIdx);
    const prevWord = activeWords[prevIdx];
    if (prevWord) speakEnglish(prevWord.word);
  };

  const handleSelectWbTile = (tile: { id: string; letter: string }) => {
    if (wbSolved) return;
    if (wbPlaced.length >= currentWb.letters.length) return;

    soundEffects.playPop();
    speakEnglish(tile.letter);
    const nextPlaced = [...wbPlaced, tile.letter];
    setWbPlaced(nextPlaced);

    if (nextPlaced.join('') === currentWb.word) {
      soundEffects.playSuccess();
      setWbSolved(true);
      setTimeout(() => speakEnglish(currentWb.word), 350);
      if (onEarnStar) onEarnStar(1);
    }
  };

  const handleUndoWb = () => {
    if (wbPlaced.length > 0 && !wbSolved) {
      soundEffects.playPop();
      setWbPlaced(wbPlaced.slice(0, -1));
    }
  };

  // ========================================================
  // GAME 2: LISTEN & CHOOSE (RANDOM NON-REPEATING DISTRACTORS)
  // ========================================================
  const [lcIndex, setLcIndex] = useState<number>(0);
  const currentLc = activeWords[lcIndex % activeWords.length] || activeWords[0];
  const [lcSelected, setLcSelected] = useState<string | null>(null);
  const [lcCorrect, setLcCorrect] = useState<boolean | null>(null);

  // Generate 3 random options: current word + 2 genuinely random other words
  const lcOptions = useMemo(() => {
    if (!currentLc) return [];
    const others = activeWords.filter((w) => w.word !== currentLc.word);
    const randomOthers = shuffleArray(others).slice(0, 2);
    return shuffleArray([currentLc, ...randomOthers]);
  }, [currentLc?.word, lcIndex, activeWords]);

  const handleSelectLc = (w: PlayWordItem) => {
    setLcSelected(w.word);
    speakEnglish(w.word);
    if (w.word === currentLc.word) {
      soundEffects.playSuccess();
      setLcCorrect(true);
      if (onEarnStar) onEarnStar(1);
    } else {
      soundEffects.playPop();
      setLcCorrect(false);
    }
  };

  const handleNextLc = () => {
    soundEffects.playPop();
    const nextIdx = (lcIndex + 1) % activeWords.length;
    setLcIndex(nextIdx);
    setLcSelected(null);
    setLcCorrect(null);
    const nextWord = activeWords[nextIdx];
    if (nextWord) setTimeout(() => speakEnglish(nextWord.word), 300);
  };

  const handlePrevLc = () => {
    soundEffects.playPop();
    const prevIdx = (lcIndex - 1 + activeWords.length) % activeWords.length;
    setLcIndex(prevIdx);
    setLcSelected(null);
    setLcCorrect(null);
    const prevWord = activeWords[prevIdx];
    if (prevWord) setTimeout(() => speakEnglish(prevWord.word), 300);
  };

  // ========================================================
  // GAME 3: MISSING LETTER (DYNAMIC RANDOM ALPHABET DISTRACTORS)
  // ========================================================
  const [mlIndex, setMlIndex] = useState<number>(0);
  const currentMl = activeWords[mlIndex % activeWords.length] || activeWords[0];
  const targetCharIndex = Math.min(1, currentMl.letters.length - 1);
  const mlTargetChar = currentMl.letters[targetCharIndex] || currentMl.letters[0];
  const [mlChosen, setMlChosen] = useState<string | null>(null);
  const [mlSolved, setMlSolved] = useState<boolean>(false);

  // Pick 2 random alphabet distractors (never static 'B' & 'P')
  const mlOptions = useMemo(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((c) => c !== mlTargetChar);
    const randomDistractors = shuffleArray(alphabet).slice(0, 2);
    return shuffleArray([mlTargetChar, ...randomDistractors]);
  }, [mlTargetChar, mlIndex]);

  const handleSelectMl = (char: string) => {
    setMlChosen(char);
    speakEnglish(char);
    if (char === mlTargetChar) {
      soundEffects.playSuccess();
      setMlSolved(true);
      setTimeout(() => speakEnglish(currentMl.word), 350);
      if (onEarnStar) onEarnStar(1);
    } else {
      soundEffects.playPop();
      setMlSolved(false);
    }
  };

  const handleNextMl = () => {
    soundEffects.playPop();
    const nextIdx = (mlIndex + 1) % activeWords.length;
    setMlIndex(nextIdx);
    setMlChosen(null);
    setMlSolved(false);
    const nextWord = activeWords[nextIdx];
    if (nextWord) setTimeout(() => speakEnglish(nextWord.word), 300);
  };

  const handlePrevMl = () => {
    soundEffects.playPop();
    const prevIdx = (mlIndex - 1 + activeWords.length) % activeWords.length;
    setMlIndex(prevIdx);
    setMlChosen(null);
    setMlSolved(false);
    const prevWord = activeWords[prevIdx];
    if (prevWord) setTimeout(() => speakEnglish(prevWord.word), 300);
  };

  // ========================================================
  // GAME 4: GRAMMAR DETECTIVE (DYNAMIC TOPIC-WISE)
  // ========================================================
  const [gdIndex, setGdIndex] = useState<number>(0);
  const currentGd = activeQuestions[gdIndex % activeQuestions.length] || activeQuestions[0];
  const [gdSelected, setGdSelected] = useState<string | null>(null);
  const [gdCorrect, setGdCorrect] = useState<boolean | null>(null);

  const handleSelectGd = (opt: string) => {
    setGdSelected(opt);
    const englishWord = opt.split(' ')[0] || opt;
    speakEnglish(englishWord);

    if (opt === currentGd.correctAnswer) {
      soundEffects.playSuccess();
      setGdCorrect(true);
      if (onEarnStar) onEarnStar(1);
    } else {
      soundEffects.playPop();
      setGdCorrect(false);
    }
  };

  const handleNextGd = () => {
    soundEffects.playPop();
    const nextIdx = (gdIndex + 1) % activeQuestions.length;
    setGdIndex(nextIdx);
    setGdSelected(null);
    setGdCorrect(null);
    const nextQ = activeQuestions[nextIdx];
    if (nextQ?.targetWord) {
      setTimeout(() => speakEnglish(nextQ.targetWord || ''), 300);
    }
  };

  const handlePrevGd = () => {
    soundEffects.playPop();
    const prevIdx = (gdIndex - 1 + activeQuestions.length) % activeQuestions.length;
    setGdIndex(prevIdx);
    setGdSelected(null);
    setGdCorrect(null);
    const prevQ = activeQuestions[prevIdx];
    if (prevQ?.targetWord) {
      setTimeout(() => speakEnglish(prevQ.targetWord || ''), 300);
    }
  };

  // ========================================================
  // GAME 5: SENTENCE MASTER (NEW INTERACTIVE SENTENCE GAME)
  // ========================================================
  const [smIndex, setSmIndex] = useState<number>(0);
  const currentSm = activeSentences[smIndex % activeSentences.length] || activeSentences[0];
  const [smSelected, setSmSelected] = useState<string | null>(null);
  const [smCorrect, setSmCorrect] = useState<boolean | null>(null);

  const handleSelectSm = (opt: string) => {
    setSmSelected(opt);
    speakEnglish(opt);

    if (opt === currentSm.correctOption) {
      soundEffects.playSuccess();
      setSmCorrect(true);
      setTimeout(() => speakEnglish(currentSm.fullSentenceEnglish), 350);
      if (onEarnStar) onEarnStar(1);
    } else {
      soundEffects.playPop();
      setSmCorrect(false);
    }
  };

  const handleNextSm = () => {
    soundEffects.playPop();
    const nextIdx = (smIndex + 1) % activeSentences.length;
    setSmIndex(nextIdx);
    setSmSelected(null);
    setSmCorrect(null);
    const nextS = activeSentences[nextIdx];
    if (nextS) {
      setTimeout(() => speakEnglish(nextS.sentenceBefore || nextS.correctOption), 300);
    }
  };

  const handlePrevSm = () => {
    soundEffects.playPop();
    const prevIdx = (smIndex - 1 + activeSentences.length) % activeSentences.length;
    setSmIndex(prevIdx);
    setSmSelected(null);
    setSmCorrect(null);
    const prevS = activeSentences[prevIdx];
    if (prevS) {
      setTimeout(() => speakEnglish(prevS.sentenceBefore || prevS.correctOption), 300);
    }
  };

  // Topic change handler
  const handleSelectTopic = (topicId: string) => {
    soundEffects.playPop();
    setSelectedTopicId(topicId);

    // If currently on one of the 3 standalone labs, switch to topic word-builder
    if (
      activeGame === 'sound-word-builder' ||
      activeGame === 'sound-sentence-builder' ||
      activeGame === 'phonics-rules'
    ) {
      setActiveGame('word-builder');
    }

    setWbIndex(0);
    setWbPlaced([]);
    setWbSolved(false);
    setLcIndex(0);
    setLcSelected(null);
    setLcCorrect(null);
    setMlIndex(0);
    setMlChosen(null);
    setMlSolved(false);
    setGdIndex(0);
    setGdSelected(null);
    setGdCorrect(null);
    setSmIndex(0);
    setSmSelected(null);
    setSmCorrect(null);

    const topic = PLAY_TOPICS.find((t) => t.id === topicId);
    if (topic && topicId !== 'all') {
      speakEnglish(topic.nameEnglish);
    }
  };

  const currentTopic = useMemo(() => {
    return PLAY_TOPICS.find((t) => t.id === selectedTopicId) || PLAY_TOPICS[0];
  }, [selectedTopicId]);

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* 1. Header & Game Selector Tabs */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur rounded-full border border-white/30 mb-2">
                Play & Win • खेलें और सीखें
              </span>
              <h2 className="text-3xl font-black drop-shadow">Kids' Learning Games</h2>
              <p className="text-sm text-white/90">
                Select your favorite topic or phonics lab to practice words, sounds, and grammar!
              </p>
            </div>
          </div>

          {/* Group 1: 🌟 5 Topic Practice Games */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-black tracking-wider uppercase text-amber-100">
              <span>🌟 Topic Practice Games (विषय अनुसार खेलें):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-black/25 backdrop-blur p-1.5 rounded-2xl border border-white/30">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('word-builder');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'word-builder'
                    ? 'bg-white text-stone-900 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🔤 Topic Word Builder
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('listen-choose');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'listen-choose'
                    ? 'bg-blue-400 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                👂 Listen & Choose
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('missing-letter');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'missing-letter'
                    ? 'bg-purple-300 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                ✏️ Missing Letter
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('grammar-detective');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'grammar-detective'
                    ? 'bg-amber-300 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🕵️ Grammar Detective
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('sentence-master');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'sentence-master'
                    ? 'bg-emerald-400 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                📝 Sentence Master
              </button>
            </div>
          </div>

          {/* Group 2: 🚀 Master Phonics & Sentence Labs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black tracking-wider uppercase text-amber-100">
              <span>🚀 Master Phonics & Sentence Labs (स्पेशल ध्वनि व वाक्य लैब्स):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-black/25 backdrop-blur p-1.5 rounded-2xl border border-white/30">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('sound-word-builder');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'sound-word-builder'
                    ? 'bg-amber-400 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🎧 Sound-to-Word (2-15 Letters • 392 Words)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('sound-sentence-builder');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'sound-sentence-builder'
                    ? 'bg-teal-400 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🧩 Sentence & Grammar Map
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveGame('phonics-rules');
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeGame === 'phonics-rules'
                    ? 'bg-purple-300 text-stone-950 shadow-md scale-102 ring-2 ring-white'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                📖 12 Spelling Rules
              </button>
            </div>
          </div>
        </div>

        {/* TOPIC SELECTOR BAR (विषय चुनें) */}
        <div className="pt-3 border-t border-white/20 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs font-black tracking-wider uppercase text-amber-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-300" />
              <span>Select Learning Topic / विषय चुनें ({PLAY_TOPICS.length} Topics):</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-white/80 lowercase hidden sm:inline">
                (click topic to practice)
              </span>
              <button
                type="button"
                onClick={() => handleScrollTopics('left')}
                className="cursor-pointer px-2 py-0.5 rounded-lg bg-black/30 hover:bg-black/50 text-white text-xs font-black border border-white/20"
                title="Scroll Left"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={() => handleScrollTopics('right')}
                className="cursor-pointer px-2 py-0.5 rounded-lg bg-black/30 hover:bg-black/50 text-white text-xs font-black border border-white/20"
                title="Scroll Right"
              >
                ▶
              </button>
            </div>
          </div>

          <div
            ref={topicScrollRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {PLAY_TOPICS.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`cursor-pointer px-3.5 py-2 rounded-xl font-black text-xs whitespace-nowrap transition-all flex items-center gap-1.5 border shadow-sm ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 border-white ring-3 ring-white shadow-xl scale-105'
                      : 'bg-black/35 text-white/95 border-white/25 hover:bg-black/55 hover:text-white'
                  }`}
                >
                  <span className="text-base">{topic.emoji}</span>
                  <span>{topic.nameEnglish}</span>
                  <span className="opacity-80 text-[10px]">({topic.nameHindi})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Active Topic Indicator & Quick Switcher for Topic Games */}
      {['word-builder', 'listen-choose', 'missing-letter', 'grammar-detective', 'sentence-master'].includes(activeGame) && (
        <div className="bg-amber-100 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-300/80 border border-amber-400 flex items-center justify-center text-3xl shadow-sm">
              {currentTopic.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Active Topic • सक्रिय विषय:
                </span>
                <span className="px-2 py-0.5 bg-amber-400 text-stone-950 rounded-full font-black text-[11px]">
                  {selectedTopicId === 'all' ? `${TOPIC_PLAY_WORDS.length} Words` : `${activeWords.length} Words`}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-950">
                {currentTopic.nameEnglish}{' '}
                <span className="font-hindi text-base font-bold text-stone-700">
                  ({currentTopic.nameHindi})
                </span>
              </h3>
            </div>
          </div>

          {/* Quick Game Switcher for this topic */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/70 p-1.5 rounded-2xl border border-amber-300">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setActiveGame('word-builder');
              }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeGame === 'word-builder'
                  ? 'bg-amber-400 text-stone-950 shadow-sm ring-1 ring-amber-500'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              🔤 Speller
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setActiveGame('listen-choose');
              }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeGame === 'listen-choose'
                  ? 'bg-blue-500 text-white shadow-sm ring-1 ring-blue-600'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              👂 Listen & Choose
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setActiveGame('missing-letter');
              }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeGame === 'missing-letter'
                  ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-700'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              ✏️ Missing Letter
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setActiveGame('grammar-detective');
              }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeGame === 'grammar-detective'
                  ? 'bg-amber-500 text-stone-950 shadow-sm ring-1 ring-amber-600'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              🕵️ Detective
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setActiveGame('sentence-master');
              }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeGame === 'sentence-master'
                  ? 'bg-emerald-500 text-white shadow-sm ring-1 ring-emerald-600'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              📝 Sentence Master
            </button>
          </div>
        </div>
      )}

      {/* 2. Active Game Arena */}

      {/* NEW GAME A: SOUND-TO-WORD BUILDER (2 TO 15 LETTERS) */}
      {activeGame === 'sound-word-builder' && (
        <SoundToWordBuilder onEarnStar={onEarnStar} />
      )}

      {/* NEW GAME B: SOUND-TO-SENTENCE BUILDER & GRAMMAR DETECTIVE */}
      {activeGame === 'sound-sentence-builder' && (
        <SoundToSentenceBuilder onEarnStar={onEarnStar} />
      )}

      {/* NEW GAME C: 8 MAGIC PHONICS & SPELLING RULES GUIDE */}
      {activeGame === 'phonics-rules' && (
        <PhonicsSpellingRulesGuide />
      )}

      {/* GAME 1: WORD BUILDER */}
      {activeGame === 'word-builder' && currentWb && (
        <div className="bg-white rounded-3xl border-3 border-amber-300 p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-black">
              Topic: {selectedTopicId === 'all' ? `🌟 All Topics (${TOPIC_PLAY_WORDS.length} Words)` : `${currentTopic.emoji} ${currentTopic.nameEnglish} (${activeWords.length} Words)`}
            </span>
            <span>
              Word {((wbIndex % activeWords.length) + 1)} of {activeWords.length}
            </span>
          </div>

          <div
            onClick={() => speakEnglish(currentWb.word)}
            role="button"
            tabIndex={0}
            title={`Click to listen: "${currentWb.word}"`}
            className="cursor-pointer w-32 h-32 mx-auto rounded-3xl bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 hover:border-amber-400 flex items-center justify-center text-7xl shadow-md transition-all hover:scale-105 active:scale-95 group select-none"
          >
            <span className="group-hover:scale-110 transition-transform">{currentWb.emoji}</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-950">
              Build the word: "{currentWb.word}"
            </h3>
            <p className="font-hindi text-base text-stone-600 font-bold">
              {currentWb.hindi}
            </p>
          </div>

          {/* Audio Buttons Row */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <WordAudioButton
              text={currentWb.word}
              speechText={currentWb.word}
              label={`Listen "${currentWb.word}"`}
              size="sm"
              showSparkle
              className="bg-amber-100 hover:bg-amber-200 border-amber-300 font-bold"
            />
            <HindiAudioButton
              text={currentWb.hindi}
              size="sm"
              label="हिंदी अर्थ"
            />
          </div>

          {/* Helper Sound Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 max-w-sm mx-auto text-xs font-bold text-amber-900 font-hindi flex items-center justify-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>चित्र या किसी भी अक्षर पर टैप करके आवाज़ सुनें!</span>
          </div>

          {/* Slots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
            {currentWb.letters.map((_, i) => {
              const letter = wbPlaced[i];
              return (
                <div
                  key={i}
                  className={`w-14 h-16 sm:w-16 sm:h-18 rounded-2xl border-3 flex items-center justify-center text-3xl font-black ${
                    letter
                      ? wbSolved
                        ? 'bg-emerald-400 border-emerald-500 text-white animate-bounce'
                        : 'bg-amber-300 border-amber-400 text-stone-950 shadow-sm'
                      : 'bg-stone-50 border-dashed border-stone-300 text-stone-400'
                  }`}
                >
                  {letter || ''}
                </div>
              );
            })}
          </div>

          {/* Letter Tiles */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-sm mx-auto">
            {wbTiles.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectWbTile(t)}
                disabled={wbSolved}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 border-amber-300 bg-white hover:bg-amber-100 text-stone-900 text-2xl font-black shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {t.letter}
              </button>
            ))}
          </div>

          {/* Controls: Undo, Previous & Next Word */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            <button
              type="button"
              onClick={handleUndoWb}
              disabled={wbPlaced.length === 0 || wbSolved}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs rounded-xl border border-stone-300 disabled:opacity-30 transition-all"
            >
              <Undo2 className="w-4 h-4" />
              <span>Undo / वापस</span>
            </button>
            <button
              type="button"
              onClick={handlePrevWbWord}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xs sm:text-sm rounded-2xl border border-stone-300 shadow-sm transition-all"
            >
              <span>⬅️ Previous</span>
            </button>
            <button
              type="button"
              onClick={handleNextWbWord}
              className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Next Word ➡️</span>
            </button>
          </div>

          {wbSolved && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl max-w-sm mx-auto text-emerald-950 font-black text-sm animate-in zoom-in-95">
              🌟 Hooray! You spelled {currentWb.word}!
            </div>
          )}
        </div>
      )}

      {/* GAME 2: LISTEN & CHOOSE (DYNAMIC RANDOM OPTIONS) */}
      {activeGame === 'listen-choose' && currentLc && (
        <div className="bg-white rounded-3xl border-3 border-blue-300 p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-black">
              Topic: {selectedTopicId === 'all' ? `🌟 All Topics (${TOPIC_PLAY_WORDS.length} Words)` : `${currentTopic.emoji} ${currentTopic.nameEnglish} (${activeWords.length} Words)`}
            </span>
            <span>
              Sound {((lcIndex % activeWords.length) + 1)} of {activeWords.length}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-4xl block">🎧</span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
              Listen to the sound and choose the picture!
            </h3>
            <p className="font-hindi text-base text-stone-600 font-semibold">
              आवाज़ सुनें और सही चित्र चुनें:
            </p>

            <div className="pt-2">
              <WordAudioButton
                text={currentLc.word}
                speechText={currentLc.word}
                label="Play Sound 🔊"
                size="lg"
                showSparkle
                className="bg-blue-500 hover:bg-blue-600 text-white font-black mx-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto pt-2">
            {lcOptions.map((item, idx) => {
              const isSelected = lcSelected === item.word;
              const isCorrect = item.word === currentLc.word;
              let style = 'bg-stone-50 border-stone-200 hover:bg-amber-50';
              if (isSelected) {
                style = isCorrect
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 scale-105'
                  : 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200';
              }

              return (
                <button
                  key={`${item.word}-${idx}`}
                  onClick={() => handleSelectLc(item)}
                  className={`p-4 sm:p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all shadow-sm active:scale-95 ${style}`}
                >
                  <span className="text-5xl sm:text-6xl mb-2">{item.emoji}</span>
                  <span className="text-base font-black">{item.word}</span>
                  <span className="font-hindi text-xs text-stone-500">{item.hindi}</span>
                </button>
              );
            })}
          </div>

          {lcSelected && (
            <div className="pt-2 flex flex-col items-center gap-3">
              <div
                className={`p-3 rounded-2xl max-w-sm font-black text-sm ${
                  lcCorrect ? 'bg-emerald-100 text-emerald-950' : 'bg-rose-100 text-rose-950'
                }`}
              >
                {lcCorrect ? '🎉 Correct! Super ear!' : '🤔 Listen again and try!'}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevLc}
                  className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-sm rounded-2xl border border-stone-300 shadow-sm transition-all"
                >
                  <span>⬅️ Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextLc}
                  className="cursor-pointer flex items-center gap-1.5 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95"
                >
                  <span>Next Sound ➡️</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: MISSING LETTER (DYNAMIC RANDOM OPTIONS) */}
      {activeGame === 'missing-letter' && currentMl && (
        <div className="bg-white rounded-3xl border-3 border-purple-300 p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full font-black">
              Topic: {selectedTopicId === 'all' ? `🌟 All Topics (${TOPIC_PLAY_WORDS.length} Words)` : `${currentTopic.emoji} ${currentTopic.nameEnglish} (${activeWords.length} Words)`}
            </span>
            <span>
              Letter {((mlIndex % activeWords.length) + 1)} of {activeWords.length}
            </span>
          </div>

          <div
            onClick={() => speakEnglish(currentMl.word)}
            role="button"
            tabIndex={0}
            title={`Click to listen: "${currentMl.word}"`}
            className="cursor-pointer w-28 h-28 mx-auto rounded-3xl bg-purple-100 hover:bg-purple-200 border-3 border-purple-300 hover:border-purple-400 flex items-center justify-center text-6xl shadow-md transition-all hover:scale-105 active:scale-95 group select-none"
          >
            <span className="group-hover:scale-110 transition-transform">{currentMl.emoji}</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-black font-mono">
              {currentMl.word
                .split('')
                .map((c, i) => (i === targetCharIndex ? (mlSolved ? c : '_') : c))
                .join(' ')}
            </h3>
            <p className="font-hindi text-base text-stone-600 font-semibold">
              गायब अक्षर कौन सा है? ({currentMl.hindi})
            </p>
          </div>

          {/* Audio Buttons Row */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <WordAudioButton
              text={currentMl.word}
              speechText={currentMl.word}
              label={`Listen "${currentMl.word}"`}
              size="sm"
              className="bg-purple-100 hover:bg-purple-200 border-purple-300 font-bold"
            />
            <HindiAudioButton text={currentMl.hindi} size="sm" label="हिंदी अर्थ" />
          </div>

          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
            {mlOptions.map((opt) => {
              const isSelected = mlChosen === opt;
              let style = 'bg-white border-purple-300 text-stone-900 hover:bg-purple-50';
              if (isSelected) {
                style =
                  opt === mlTargetChar
                    ? 'bg-emerald-500 border-emerald-600 text-white font-black'
                    : 'bg-rose-500 border-rose-600 text-white font-black';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectMl(opt)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 text-2xl font-black shadow-md transition-all active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {mlSolved && (
            <div className="pt-2 flex flex-col items-center gap-3">
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-950 font-black text-sm">
                🌟 Awesome! {currentMl.word} = {currentMl.hindi}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevMl}
                  className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-sm rounded-2xl border border-stone-300 shadow-sm transition-all"
                >
                  <span>⬅️ Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextMl}
                  className="cursor-pointer flex items-center gap-1.5 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95"
                >
                  <span>Next Question ➡️</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 4: GRAMMAR DETECTIVE (DYNAMIC TOPIC-WISE) */}
      {activeGame === 'grammar-detective' && currentGd && (
        <div className="bg-white rounded-3xl border-3 border-amber-300 p-6 sm:p-8 shadow-xl text-center space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full text-xs font-black">
              <span>{currentTopic.emoji}</span>
              <span>{selectedTopicId === 'all' ? `All Topics (${TOPIC_DETECTIVE_QUESTIONS.length} Questions)` : `${currentTopic.nameEnglish} (${activeQuestions.length} Questions)`}</span>
              <span className="opacity-80 font-normal">({selectedTopicId === 'all' ? 'सभी विषय' : currentTopic.nameHindi})</span>
            </span>

            <span className="text-xs font-bold text-stone-500">
              Clue {((gdIndex % activeQuestions.length) + 1)} of {activeQuestions.length}
            </span>
          </div>

          {/* Emoji Avatar Card */}
          <div
            onClick={() => speakEnglish(currentGd.targetWord || currentGd.correctAnswer)}
            role="button"
            tabIndex={0}
            title="Click to pronounce"
            className="cursor-pointer w-28 h-28 mx-auto rounded-3xl bg-amber-100 hover:bg-amber-200 border-3 border-amber-300 hover:border-amber-400 flex items-center justify-center text-6xl shadow-md transition-all hover:scale-105 active:scale-95 group select-none"
          >
            <span className="group-hover:scale-110 transition-transform">{currentGd.emoji}</span>
          </div>

          {/* Target Word / Sentence Banner */}
          {currentGd.targetWord && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 inline-block mx-auto max-w-lg shadow-sm">
              <p className="text-xl sm:text-2xl font-black text-amber-950 font-mono tracking-wide">
                "{currentGd.targetWord}"
              </p>
              {currentGd.targetHindi && (
                <p className="text-xs sm:text-sm font-hindi font-bold text-amber-800 mt-1">
                  {currentGd.targetHindi}
                </p>
              )}
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-stone-950">
              {currentGd.questionEnglish}
            </h3>
            <p className="font-hindi text-base text-stone-600 font-bold">
              {currentGd.questionHindi}
            </p>
          </div>

          {/* Audio Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {currentGd.targetWord && (
              <WordAudioButton
                text={currentGd.targetWord}
                speechText={currentGd.targetWord}
                label="Listen Word 🔊"
                size="sm"
                className="bg-amber-100 hover:bg-amber-200 border-amber-300 font-bold"
              />
            )}
            <HindiAudioButton
              text={currentGd.questionHindi}
              size="sm"
              label="प्रश्न सुनें (Hindi)"
            />
          </div>

          {/* Options Grid (Dynamic from topic question) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {currentGd.options.map((opt) => {
              const isSelected = gdSelected === opt;
              const isCorrect = opt === currentGd.correctAnswer;
              let style = 'bg-stone-50 border-stone-200 text-stone-900 hover:bg-amber-50 hover:border-amber-300';
              if (isSelected) {
                style = isCorrect
                  ? 'bg-emerald-500 border-emerald-600 text-white font-black ring-4 ring-emerald-300'
                  : 'bg-rose-500 border-rose-600 text-white font-black ring-4 ring-rose-200';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectGd(opt)}
                  className={`p-3.5 rounded-2xl border-3 text-sm sm:text-base font-black shadow-sm transition-all active:scale-95 text-left flex items-center justify-between gap-2 ${style}`}
                >
                  <span className="leading-tight">{opt}</span>
                  {isSelected && (
                    <span className="text-lg flex-shrink-0">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detective Feedback & Explanation */}
          {gdSelected && (
            <div className="pt-2 flex flex-col items-center gap-3">
              <div
                className={`p-4 rounded-2xl max-w-xl font-bold text-sm space-y-1.5 text-left border-2 animate-in zoom-in-95 ${
                  gdCorrect
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-400'
                    : 'bg-rose-50 text-rose-950 border-rose-400'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-base">
                  <span>{gdCorrect ? '🎉 Great Detective Work!' : '🤔 Clue Helper:'}</span>
                </div>
                <p className="text-stone-800">
                  {gdCorrect ? currentGd.explanationEnglish : 'Think again and check the grammar rule carefully!'}
                </p>
                <p className="font-hindi text-xs sm:text-sm text-stone-700">
                  {gdCorrect ? currentGd.explanationHindi : 'दोबारा सोचें और सही उत्तर चुनें!'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevGd}
                  className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-sm rounded-2xl border border-stone-300 shadow-sm transition-all"
                >
                  <span>⬅️ Previous Clue</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextGd}
                  className="cursor-pointer flex items-center gap-1.5 px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-sm rounded-2xl shadow-md active:scale-95 transition-all"
                >
                  <span>Next Clue / अगला प्रश्न ➡️</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 5: SENTENCE MASTER (NEW) */}
      {activeGame === 'sentence-master' && currentSm && (
        <div className="bg-white rounded-3xl border-3 border-emerald-400 p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full font-black">
              Topic: {selectedTopicId === 'all' ? `🌟 All Topics (${TOPIC_SENTENCE_CHALLENGES.length} Sentences)` : `${currentTopic.emoji} ${currentTopic.nameEnglish} (${activeSentences.length} Sentences)`}
            </span>
            <span>
              Sentence {((smIndex % activeSentences.length) + 1)} of {activeSentences.length}
            </span>
          </div>

          <div
            onClick={() => speakEnglish(currentSm.fullSentenceEnglish)}
            role="button"
            tabIndex={0}
            title="Click to hear full sentence"
            className="cursor-pointer w-28 h-28 mx-auto rounded-3xl bg-emerald-100 hover:bg-emerald-200 border-3 border-emerald-300 hover:border-emerald-400 flex items-center justify-center text-6xl shadow-md transition-all hover:scale-105 active:scale-95 group select-none"
          >
            <span className="group-hover:scale-110 transition-transform">{currentSm.emoji}</span>
          </div>

          {/* Fill the Blank Display */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-5 max-w-xl mx-auto shadow-sm space-y-2">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 flex flex-wrap items-center justify-center gap-2">
              {currentSm.sentenceBefore && <span>{currentSm.sentenceBefore}</span>}
              <span
                className={`px-4 py-1 rounded-xl border-2 border-dashed font-mono text-2xl transition-all ${
                  smSelected
                    ? smCorrect
                      ? 'bg-emerald-400 text-white border-emerald-500 animate-bounce'
                      : 'bg-rose-400 text-white border-rose-500'
                    : 'bg-white text-stone-400 border-stone-400 min-w-[70px]'
                }`}
              >
                {smSelected || '___'}
              </span>
              {currentSm.sentenceAfter && <span>{currentSm.sentenceAfter}</span>}
            </div>

            <p className="font-hindi text-sm sm:text-base font-bold text-stone-600">
              {currentSm.fullSentenceHindi}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
            {currentSm.options.map((opt) => {
              const isSelected = smSelected === opt;
              const isCorrect = opt === currentSm.correctOption;
              let style = 'bg-white border-emerald-300 text-stone-900 hover:bg-emerald-50 hover:border-emerald-400';
              if (isSelected) {
                style = isCorrect
                  ? 'bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-300 scale-105'
                  : 'bg-rose-500 border-rose-600 text-white ring-4 ring-rose-300';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectSm(opt)}
                  className={`px-6 py-3 rounded-2xl border-3 text-lg font-black shadow-md transition-all active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {smSelected && (
            <div className="pt-2 flex flex-col items-center gap-3">
              <div
                className={`p-4 rounded-2xl max-w-lg font-bold text-sm text-left border-2 animate-in zoom-in-95 space-y-1 ${
                  smCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                }`}
              >
                <p className="font-black">
                  {smCorrect ? '🎉 Excellent Sentence Building!' : '🤔 Think about the rule:'}
                </p>
                <p className="text-stone-800">{currentSm.ruleTipEnglish}</p>
                <p className="font-hindi text-xs sm:text-sm text-stone-700">{currentSm.ruleTipHindi}</p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevSm}
                  className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-sm rounded-2xl border border-stone-300 shadow-sm transition-all"
                >
                  <span>⬅️ Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextSm}
                  className="cursor-pointer flex items-center gap-1.5 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-md active:scale-95 transition-all"
                >
                  <span>Next Sentence / अगला वाक्य ➡️</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
