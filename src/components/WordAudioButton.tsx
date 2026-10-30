"use client";

import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface WordAudioButtonProps {
  text: string;
  speechText?: string; // Explicitly separates display text from spoken audio
  sampleWord?: string; // Optional sample word for phonics
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  pitch?: number;
  className?: string;
  showSparkle?: boolean;
}

export function WordAudioButton({
  text,
  speechText,
  sampleWord,
  label,
  size = 'md',
  rate = 0.82,
  pitch = 1.1,
  className = '',
  showSparkle = false,
}: WordAudioButtonProps) {
  const { speak, isSpeaking, speakingText } = useSpeech();
  const textToPlay = speechText || text;
  const currentlyPlayingThis = isSpeaking && speakingText === textToPlay;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(textToPlay, { rate, pitch, sampleWord });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1 rounded-xl',
    md: 'px-3 py-1.5 text-sm gap-2 rounded-2xl',
    lg: 'px-4 py-2.5 text-base gap-2.5 rounded-3xl font-semibold',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Listen to ${textToPlay}`}
      title={`Listen to English pronunciation: "${textToPlay}"`}
      className={`inline-flex items-center justify-center font-display transition-all duration-200 active:scale-95 shadow-sm select-none ${
        currentlyPlayingThis
          ? 'bg-amber-400 text-stone-900 ring-4 ring-amber-200 animate-pulse'
          : 'bg-white hover:bg-amber-50 text-amber-700 hover:text-amber-900 border-2 border-amber-300 hover:border-amber-400'
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2
        className={`${
          size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
        } ${currentlyPlayingThis ? 'animate-bounce text-stone-900' : 'text-amber-600'}`}
      />
      {label && <span className="font-semibold">{label}</span>}
      {showSparkle && <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />}
    </button>
  );
}
