"use client";

import React, { useState } from 'react';
import { Volume2, AlertCircle, Sparkles } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface HindiAudioButtonProps {
  text: string;
  speechText?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  pitch?: number;
  className?: string;
  showSparkle?: boolean;
}

export function HindiAudioButton({
  text,
  speechText,
  label = 'हिंदी में समझें',
  size = 'md',
  rate = 0.85,
  pitch = 1.0,
  className = '',
  showSparkle = false,
}: HindiAudioButtonProps) {
  const { speakHindi, isSpeaking, speakingText, speakingLang, isHindiVoiceAvailable, speechNotice } = useSpeech();
  const textToPlay = speechText || text;
  const currentlyPlayingThis = isSpeaking && speakingLang === 'hi' && speakingText === textToPlay;
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isHindiVoiceAvailable) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3500);
    }
    speakHindi(textToPlay, { rate, pitch });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1 rounded-xl',
    md: 'px-3.5 py-2 text-xs md:text-sm gap-2 rounded-2xl font-bold',
    lg: 'px-5 py-2.5 text-sm md:text-base gap-2.5 rounded-3xl font-extrabold',
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Listen in Hindi: ${textToPlay}`}
        title={`हिंदी में सुनें: "${textToPlay}"`}
        className={`inline-flex items-center justify-center font-hindi transition-all duration-200 active:scale-95 shadow-sm select-none ${
          currentlyPlayingThis
            ? 'bg-orange-500 text-white ring-4 ring-orange-200 animate-pulse'
            : 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-2 border-orange-300 hover:border-orange-400'
        } ${sizeClasses[size]} ${className}`}
      >
        <Volume2
          className={`${
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
          } ${currentlyPlayingThis ? 'animate-bounce text-white' : 'text-orange-600'}`}
        />
        <span>🇮🇳 {label}</span>
        {showSparkle && <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />}
      </button>

      {/* Fallback notice tooltip if device has no Hindi voice */}
      {(showTooltip || (currentlyPlayingThis && speechNotice)) && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-64 p-2.5 bg-stone-900 text-white text-xs rounded-xl shadow-xl border border-orange-400 animate-in fade-in">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="font-hindi text-[11px] leading-relaxed">
              हिंदी आवाज ब्राउज़र में नहीं मिली। कृपया नीचे दिया गया हिंदी विवरण पढ़ें।
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
