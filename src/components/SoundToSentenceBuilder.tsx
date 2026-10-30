"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  SOUND_SENTENCES_DATA,
  SoundSentenceItem,
  SentenceWordToken,
  SentenceCategory,
} from '@/data/soundWordBuilderData';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  Undo2,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Clock,
  Compass,
  Zap,
} from 'lucide-react';

interface SoundToSentenceBuilderProps {
  onEarnStar?: (count: number) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SoundToSentenceBuilder({ onEarnStar }: SoundToSentenceBuilderProps) {
  const { speakEnglish, speakHindi } = useSpeech();
  const [selectedCategory, setSelectedCategory] = useState<SentenceCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtered dataset based on selected category (Present, Past, Future, Modals, or All)
  const filteredSentences = useMemo(() => {
    if (selectedCategory === 'all') return SOUND_SENTENCES_DATA;
    return SOUND_SENTENCES_DATA.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const currentSentence: SoundSentenceItem =
    filteredSentences[currentIndex % filteredSentences.length] || filteredSentences[0];

  // Game state
  const [placedWords, setPlacedWords] = useState<SentenceWordToken[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; token: SentenceWordToken }[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [selectedInspectToken, setSelectedInspectToken] = useState<SentenceWordToken | null>(null);

  // Initialize word tiles on sentence change
  useEffect(() => {
    if (!currentSentence) return;
    setPlacedWords([]);
    setIsSolved(false);
    setSelectedInspectToken(null);

    const tiles = shuffle(currentSentence.tokens).map((token, idx) => ({
      id: `${token.word}-${idx}-${Math.random()}`,
      token,
    }));

    setAvailableTiles(tiles);
    // Speak full sentence automatically
    speakEnglish(currentSentence.fullSentenceEnglish);
  }, [currentSentence]);

  // Handle category tab change
  const handleCategoryChange = (cat: SentenceCategory) => {
    soundEffects.playPop();
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  // Click on available word tile
  const handleSelectWord = (tile: { id: string; token: SentenceWordToken }) => {
    if (isSolved || placedWords.length >= currentSentence.tokens.length) return;

    soundEffects.playPop();
    const newPlaced = [...placedWords, tile.token];
    setPlacedWords(newPlaced);
    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));

    // Check completion
    if (newPlaced.length === currentSentence.tokens.length) {
      const correct = newPlaced.every((t, idx) => t.word === currentSentence.tokens[idx].word);
      if (correct) {
        setIsSolved(true);
        soundEffects.playCelebration();
        setSelectedInspectToken(currentSentence.tokens[0]); // inspect first word by default
        if (onEarnStar) onEarnStar(2);
      } else {
        soundEffects.playTryAgain();
      }
    }
  };

  // Undo last word
  const handleUndo = () => {
    if (placedWords.length === 0 || isSolved) return;
    soundEffects.playPop();
    const lastToken = placedWords[placedWords.length - 1];
    setPlacedWords((prev) => prev.slice(0, -1));
    setAvailableTiles((prev) => [...prev, { id: `${lastToken.word}-${Date.now()}`, token: lastToken }]);
  };

  // Reset current sentence tiles
  const handleReset = () => {
    if (!currentSentence) return;
    soundEffects.playPop();
    setPlacedWords([]);
    setIsSolved(false);
    setSelectedInspectToken(null);
    setAvailableTiles(
      shuffle(currentSentence.tokens).map((token, idx) => ({
        id: `${token.word}-${idx}-${Math.random()}`,
        token,
      }))
    );
  };

  // Previous sentence
  const handlePrevSentence = () => {
    soundEffects.playPop();
    setCurrentIndex((i) => (i - 1 + filteredSentences.length) % filteredSentences.length);
  };

  // Next sentence
  const handleNextSentence = () => {
    soundEffects.playPop();
    setCurrentIndex((i) => (i + 1) % filteredSentences.length);
  };

  // Category counts
  const presentCount = SOUND_SENTENCES_DATA.filter((s) => s.category === 'present').length;
  const pastCount = SOUND_SENTENCES_DATA.filter((s) => s.category === 'past').length;
  const futureCount = SOUND_SENTENCES_DATA.filter((s) => s.category === 'future').length;
  const modalsCount = SOUND_SENTENCES_DATA.filter((s) => s.category === 'modals').length;

  return (
    <div className="bg-white rounded-3xl border-3 border-teal-300 p-5 sm:p-7 shadow-xl space-y-6 animate-in fade-in">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-teal-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Sound-to-Sentence & Grammar Detective • सुनो और वाक्य बनाओ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900">
            Build Sentences & Identify Parts of Speech 🧩
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-hindi font-medium">
            पूरा वाक्य सुनें, शब्दों को सही क्रम में लगाएं और जानें कौन सा शब्द Noun, Pronoun, Verb, Modal या Helping Verb है!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-teal-50 border border-teal-300 rounded-2xl text-xs font-black text-teal-900">
            Sentence {(currentIndex % filteredSentences.length) + 1} of {filteredSentences.length}
          </span>
          <span className="px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-2xl text-xs font-black text-amber-900 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>{currentSentence.tenseLabelEnglish}</span>
          </span>
        </div>
      </div>

      {/* 1.5 CATEGORY FILTER TABS: All, Present, Past, Future, Modals */}
      <div className="bg-stone-50 border-2 border-stone-200 p-2 rounded-2xl flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider px-2 font-hindi">
          विषय चुनें (Choose Tense / Mode):
        </span>

        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white shadow-md scale-102'
              : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
          }`}
        >
          <span>🌟 All Sentences</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {SOUND_SENTENCES_DATA.length}
          </span>
        </button>

        <button
          onClick={() => handleCategoryChange('present')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            selectedCategory === 'present'
              ? 'bg-emerald-600 text-white shadow-md scale-102'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
          }`}
        >
          <span>☀️ Present Tense (वर्तमान)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">
            {presentCount}
          </span>
        </button>

        <button
          onClick={() => handleCategoryChange('past')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            selectedCategory === 'past'
              ? 'bg-amber-600 text-white shadow-md scale-102'
              : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-300'
          }`}
        >
          <span>📜 Past Tense (भूतकाल)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">
            {pastCount}
          </span>
        </button>

        <button
          onClick={() => handleCategoryChange('future')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            selectedCategory === 'future'
              ? 'bg-purple-600 text-white shadow-md scale-102'
              : 'bg-white text-purple-800 hover:bg-purple-50 border border-purple-300'
          }`}
        >
          <span>🚀 Future Tense (भविष्यत्)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">
            {futureCount}
          </span>
        </button>

        <button
          onClick={() => handleCategoryChange('modals')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            selectedCategory === 'modals'
              ? 'bg-fuchsia-600 text-white shadow-md scale-102'
              : 'bg-white text-fuchsia-800 hover:bg-fuchsia-50 border border-fuchsia-300'
          }`}
        >
          <span>🪄 Modals (Can, Should, Must...)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">
            {modalsCount}
          </span>
        </button>
      </div>

      {/* 2. Audio & Sentence Cue Card */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border-2 border-teal-200 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-md border-2 border-teal-200 flex items-center justify-center text-4xl sm:text-5xl">
            {currentSentence.emoji}
          </div>

          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  speakEnglish(currentSentence.fullSentenceEnglish);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white rounded-2xl font-black text-sm shadow-md transition-all"
              >
                <Volume2 className="w-5 h-5 text-teal-100" />
                <span>🔊 Listen to Full Sentence (पूरा वाक्य सुनें)</span>
              </button>
              <HindiAudioButton text={currentSentence.fullSentenceHindi} size="md" />
            </div>

            <p className="font-hindi text-base sm:text-lg font-bold text-teal-950 mt-1">
              हिंदी अर्थ: {currentSentence.fullSentenceHindi}
            </p>
            <p className="text-xs text-teal-800 font-semibold font-hindi">
              💡 {currentSentence.dailyContextHindi}
            </p>
          </div>
        </div>

        {/* Word Slot Builder Area */}
        <div className="min-h-[70px] bg-white border-2 border-dashed border-teal-300 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-2 shadow-inner">
          {placedWords.length === 0 ? (
            <span className="text-stone-400 font-bold text-sm italic font-hindi">
              नीचे दिए गए शब्दों पर क्लिक करके वाक्य बनाएं...
            </span>
          ) : (
            placedWords.map((token, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-xl border-2 font-black text-base shadow-sm flex items-center gap-1.5 ${
                  isSolved
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 animate-in zoom-in-95'
                    : 'bg-teal-50 border-teal-300 text-teal-950'
                }`}
              >
                <span>{token.word}</span>
                {isSolved && (
                  <span className="text-[10px] font-sans px-1.5 py-0.2 rounded-md bg-white/80 border text-stone-700">
                    {token.posLabelHindi.split(' ')[0]}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Available Word Tiles */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {isSolved ? '🎉 Perfect Sentence Order!' : 'Click words in the right speaking order:'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {availableTiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleSelectWord(tile)}
                disabled={isSolved}
                className="px-4 py-2 rounded-2xl bg-white hover:bg-teal-100 active:scale-95 border-2 border-teal-300 hover:border-teal-500 text-stone-900 font-black text-sm sm:text-base shadow-md transition-all select-none cursor-pointer disabled:opacity-40"
              >
                {tile.token.word}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-teal-200">
          <button
            onClick={handlePrevSentence}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-xl font-bold text-xs transition-all active:scale-95"
            title="Previous sentence"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous (पिछला)</span>
          </button>

          <button
            onClick={handleUndo}
            disabled={placedWords.length === 0 || isSolved}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold text-xs disabled:opacity-40 transition-all active:scale-95"
          >
            <Undo2 className="w-4 h-4" />
            <span>Undo / वापस</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-bold text-xs transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset / दोबारा</span>
          </button>

          <button
            onClick={handleNextSentence}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 ${
              isSolved
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-bounce'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            <span>Next Sentence (अगला वाक्य)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. PARTS OF SPEECH & GRAMMAR DETECTIVE BREAKDOWN */}
      {isSolved && (
        <div className="bg-white rounded-3xl border-3 border-emerald-400 p-5 sm:p-6 space-y-4 shadow-md animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-black text-stone-900 text-base sm:text-lg">
                  Grammar Detective Map (व्याकरण पहचान नक्शा) 🕵️
                </h4>
                <p className="text-xs text-stone-500 font-hindi">
                  हर शब्द पर क्लिक करें और देखें कि वह Noun, Pronoun, Verb, Modal या Helping Verb क्यों है!
                </p>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black text-xs rounded-full">
              {currentSentence.tenseLabelHindi}
            </span>
          </div>

          {/* Color-coded Word Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 py-2">
            {currentSentence.tokens.map((token, idx) => {
              const isSelected = selectedInspectToken?.word === token.word;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundEffects.playPop();
                    setSelectedInspectToken(token);
                    speakEnglish(token.word);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1 shadow-sm ${token.colorBg} ${token.colorBorder} ${
                    isSelected ? 'ring-3 ring-stone-900 scale-105 shadow-md' : 'hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-base font-black ${token.colorText}`}>{token.word}</span>
                    <span className="text-base">{token.emoji}</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-stone-700">
                    {token.posLabelHindi}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inspected Word Detail Card */}
          {selectedInspectToken && (
            <div className="bg-stone-50 border-2 border-stone-300 rounded-2xl p-4 text-left space-y-2 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedInspectToken.emoji}</span>
                  <div>
                    <h5 className="text-base font-black text-stone-900">
                      Word: "{selectedInspectToken.word}" ➡️ {selectedInspectToken.posLabelEnglish}
                    </h5>
                    <span className="text-xs font-hindi font-black text-amber-800">
                      {selectedInspectToken.posLabelHindi}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <WordAudioButton text={selectedInspectToken.word} size="sm" />
                </div>
              </div>

              <p className="text-xs sm:text-sm font-hindi text-stone-800 font-semibold bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
                🔍 <strong>भूमिका:</strong> {selectedInspectToken.roleExplanationHindi}
              </p>
            </div>
          )}

          {/* Formula & Tense Breakdown Note */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs font-hindi text-stone-800 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>काल और वाक्य संरचना (Sentence Structure & Pattern):</span>
            </div>
            <p className="font-mono font-bold text-stone-900 text-xs sm:text-sm bg-white p-2.5 rounded-xl border border-amber-200">
              {currentSentence.formulaPattern || currentSentence.tenseLabelEnglish}
            </p>
            <p className="text-[11px] text-stone-600">
              💡 {currentSentence.dailyContextHindi}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
