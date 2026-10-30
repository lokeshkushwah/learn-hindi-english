"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageMode, LanguageSettings } from '@/types';

interface LanguageContextType {
  mode: LanguageMode;
  boldEnglish: boolean;
  setMode: (mode: LanguageMode) => void;
  setBoldEnglish: (bold: boolean) => void;
  toggleBoldEnglish: () => void;
  shouldShowHindi: (isDifficult?: boolean) => boolean;
  getEnglishClass: (baseWeight?: 'normal' | 'medium' | 'semibold' | 'bold') => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY_MODE = 'english_kid_language_mode';
const STORAGE_KEY_BOLD = 'english_kid_bold_english';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<LanguageMode>('english-hindi');
  const [boldEnglish, setBoldEnglishState] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as LanguageMode;
      if (savedMode && ['english-only', 'english-hindi', 'hindi-needed'].includes(savedMode)) {
        setModeState(savedMode);
      }
      const savedBold = localStorage.getItem(STORAGE_KEY_BOLD);
      if (savedBold !== null) {
        setBoldEnglishState(savedBold === 'true');
      }
    } catch (e) {
      // localStorage not accessible
    }
  }, []);

  const setMode = (newMode: LanguageMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY_MODE, newMode);
    } catch (e) {}
  };

  const setBoldEnglish = (bold: boolean) => {
    setBoldEnglishState(bold);
    try {
      localStorage.setItem(STORAGE_KEY_BOLD, String(bold));
    } catch (e) {}
  };

  const toggleBoldEnglish = () => {
    setBoldEnglish(!boldEnglish);
  };

  // Rule 1: English Only -> Hide Hindi explanations and translations
  // Rule 2: English + Hindi -> Show Hindi explanations or translations underneath
  // Rule 3: Hindi Support Only Where Needed -> Show Hindi explanations only for difficult concepts
  const shouldShowHindi = (isDifficult?: boolean): boolean => {
    if (mode === 'english-only') return false;
    if (mode === 'english-hindi') return true;
    if (mode === 'hindi-needed') return Boolean(isDifficult);
    return true;
  };

  // Rule: English words, headings, grammar formulas, example sentences, questions, and correct answers must be bold when the English-bold option is enabled
  const getEnglishClass = (baseWeight: 'normal' | 'medium' | 'semibold' | 'bold' = 'medium'): string => {
    if (boldEnglish) {
      return 'font-bold tracking-tight';
    }
    switch (baseWeight) {
      case 'bold': return 'font-bold';
      case 'semibold': return 'font-semibold';
      case 'normal': return 'font-normal';
      default: return 'font-medium';
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        mode,
        boldEnglish,
        setMode,
        setBoldEnglish,
        toggleBoldEnglish,
        shouldShowHindi,
        getEnglishClass,
      }}
    >
      <div
        data-language-mode={mode}
        data-bold-english={boldEnglish ? 'true' : 'false'}
        className={`contents ${boldEnglish ? 'english-bold-active' : ''}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
