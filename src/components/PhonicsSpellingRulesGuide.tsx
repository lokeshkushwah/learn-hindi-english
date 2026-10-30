"use client";

import React, { useState } from 'react';
import { SOUND_SPELLING_RULES, SoundSpellingRule } from '@/data/soundWordBuilderData';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import {
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle,
  Lightbulb,
  Music,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface PhonicsSpellingRulesGuideProps {
  onSelectPractice?: (ruleId: string) => void;
}

export function PhonicsSpellingRulesGuide({ onSelectPractice }: PhonicsSpellingRulesGuideProps) {
  const { speakEnglish, speakHindi } = useSpeech();
  const [selectedRuleId, setSelectedRuleId] = useState<string>('rule-cvc');

  const activeRule: SoundSpellingRule =
    SOUND_SPELLING_RULES.find((r) => r.id === selectedRuleId) || SOUND_SPELLING_RULES[0];

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 p-5 sm:p-7 shadow-xl space-y-6 animate-in fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Phonics Master Rules • ध्वनि से स्पेलिंग बनाने के नियम</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900">
            12 Magic Sound-to-Spelling Rules 📖
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-hindi font-medium">
            अंग्रेजी में जैसी आवाज़ आती है, वैसी स्पेलिंग कैसे बनाएं? जानें 12 जादुई नियम पूरे ऑडियो के साथ!
          </p>
        </div>

        <span className="px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-2xl text-xs font-black text-amber-900">
          12 Master Phonics Rules
        </span>
      </div>

      {/* 2. Horizontal Rule Switcher Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {SOUND_SPELLING_RULES.map((rule) => {
          const isSelected = selectedRuleId === rule.id;
          return (
            <button
              key={rule.id}
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setSelectedRuleId(rule.id);
                speakEnglish(rule.titleEnglish);
              }}
              className={`flex-shrink-0 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{rule.emoji}</span>
              <span>{rule.titleEnglish.split('.')[1] || rule.titleEnglish}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Rule Card */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-7 space-y-5 shadow-sm text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-2xl bg-white shadow-md border-2 border-amber-200 flex items-center justify-center text-3xl">
              {activeRule.emoji}
            </span>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-stone-900">
                {activeRule.titleEnglish}
              </h4>
              <p className="text-xs sm:text-sm font-hindi font-black text-amber-900">
                {activeRule.titleHindi}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <WordAudioButton
              text={activeRule.audioTipEnglish}
              label="English Summary"
              speechText={activeRule.audioTipEnglish}
              size="sm"
              className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border-amber-300"
            />
            <HindiAudioButton
              text={activeRule.audioTipHindi}
              label="हिंदी सारांश"
              speechText={activeRule.audioTipHindi}
              size="sm"
              className="bg-orange-100 hover:bg-orange-200 text-orange-950 font-bold border-orange-300"
            />
          </div>
        </div>

        {/* Formula Box with Audio */}
        <div className="bg-white border-2 border-amber-300 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-200 text-amber-900 rounded-lg text-xs font-black uppercase tracking-wider">
              Formula
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-stone-900">
              {activeRule.formula}
            </span>
          </div>
          <WordAudioButton
            text={activeRule.formula}
            label="Listen Formula 🔊"
            speechText={activeRule.formula.replace(/\+/g, 'plus').replace(/=/g, 'makes')}
            size="sm"
            className="bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 font-bold self-start sm:self-auto"
          />
        </div>

        {/* Bilingual Explanations with Full Audio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/90 p-4 rounded-2xl border-2 border-amber-200 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider">English Rule</span>
                <WordAudioButton
                  text={activeRule.explanationEnglish}
                  label="Listen English Rule 🔊"
                  speechText={activeRule.explanationEnglish}
                  size="sm"
                  className="bg-amber-200 hover:bg-amber-300 text-amber-950 font-black border-amber-400"
                />
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">
                {activeRule.explanationEnglish}
              </p>
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border-2 border-orange-200 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase text-orange-900 font-hindi tracking-wider">हिंदी में नियम</span>
                <HindiAudioButton
                  text={activeRule.explanationHindi}
                  label="पूरा नियम हिंदी में सुनें 🔊"
                  speechText={activeRule.explanationHindi}
                  size="sm"
                  className="bg-orange-200 hover:bg-orange-300 text-orange-950 font-black border-orange-400"
                />
              </div>
              <p className="text-xs sm:text-sm font-hindi font-bold text-stone-800 leading-relaxed">
                {activeRule.explanationHindi}
              </p>
            </div>
          </div>
        </div>

        {/* Real Example Words with Phonetic Breakdown & Individual Audio */}
        <div className="space-y-2.5 pt-2">
          <h5 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Sound Examples (उदाहरण और उच्चारण — हर शब्द व ध्वनि को बोलकर सुनें):</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {activeRule.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-2xl border-2 border-amber-200 shadow-sm flex flex-col justify-between gap-2.5 hover:border-amber-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-base font-black text-stone-900">{ex.word}</span>
                    <WordAudioButton text={ex.word} size="sm" />
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-hindi text-stone-700 font-bold block">
                      {ex.meaningHindi}
                    </span>
                    <HindiAudioButton text={ex.meaningHindi} size="sm" label="" className="p-1" />
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100 flex items-center justify-between gap-1">
                  <div className="text-[11px] font-mono font-bold text-amber-900 leading-tight">
                    {ex.breakdown}
                  </div>
                  <WordAudioButton
                    speechText={ex.breakdown}
                    text={ex.breakdown}
                    size="sm"
                    label=""
                    className="p-1 bg-amber-50 border-amber-200 text-amber-800"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

