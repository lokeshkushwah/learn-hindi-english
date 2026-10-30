"use client";

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_STARS = 'english_kids_stars';
const STORAGE_KEY_COMPLETED = 'english_kids_completed_lessons';
const STORAGE_KEY_SCORES = 'english_kids_scores';

export interface EnglishBadge {
  id: string;
  emoji: string;
  titleEnglish: string;
  titleHindi: string;
  description: string;
  unlockedAtStars: number;
}

export const ENGLISH_BADGES: EnglishBadge[] = [
  {
    id: 'badge-starter',
    emoji: '🌱',
    titleEnglish: 'Curious Starter',
    titleHindi: 'पहला कदम',
    description: 'Began your English learning adventure!',
    unlockedAtStars: 5,
  },
  {
    id: 'badge-phonics',
    emoji: '🔤',
    titleEnglish: 'Phonics Explorer',
    titleHindi: 'आवाज़ों के जादूगर',
    description: 'Mastered letters, sounds, and vowels!',
    unlockedAtStars: 20,
  },
  {
    id: 'badge-word-wizard',
    emoji: '✨',
    titleEnglish: 'Word Builder Wizard',
    titleHindi: 'शब्द उस्ताद',
    description: 'Built and spelled words all by yourself!',
    unlockedAtStars: 40,
  },
  {
    id: 'badge-grammar-champ',
    emoji: '🏆',
    titleEnglish: 'Grammar Champion',
    titleHindi: 'व्याकरण विजेता',
    description: 'Conquered naming words, actions, and sentences!',
    unlockedAtStars: 70,
  },
  {
    id: 'badge-superstar',
    emoji: '🌟',
    titleEnglish: 'English Superstar',
    titleHindi: 'इंग्लिश सुपरस्टार',
    description: 'Earned 100+ stars! You are amazing!',
    unlockedAtStars: 100,
  },
];

export function useEnglishProgress() {
  const [starsCount, setStarsCount] = useState<number>(35);
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    'lesson-alphabet-vowels',
    'lesson-first-words',
  ]);
  const [lessonScores, setLessonScores] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedStars = localStorage.getItem(STORAGE_KEY_STARS);
      if (savedStars !== null) {
        const parsed = parseInt(savedStars, 10);
        if (!isNaN(parsed)) setStarsCount(parsed);
      }

      const savedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (savedCompleted !== null) {
        const parsed = JSON.parse(savedCompleted);
        if (Array.isArray(parsed)) setCompletedLessons(parsed);
      }

      const savedScores = localStorage.getItem(STORAGE_KEY_SCORES);
      if (savedScores !== null) {
        const parsed = JSON.parse(savedScores);
        if (typeof parsed === 'object') setLessonScores(parsed);
      }
    } catch (e) {
      // localStorage error fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, score: number, starsToAdd: number = 5) => {
      setLessonScores((prevScores) => {
        const updated = { ...prevScores, [lessonId]: Math.max(score, prevScores[lessonId] || 0) };
        try {
          localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });

      setCompletedLessons((prev) => {
        const alreadyDone = prev.includes(lessonId);
        if (!alreadyDone) {
          const updated = [...prev, lessonId];
          try {
            localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
          } catch (e) {}

          // Only award new stars once for this completion event!
          setStarsCount((s) => {
            const nextStars = s + starsToAdd;
            try {
              localStorage.setItem(STORAGE_KEY_STARS, String(nextStars));
            } catch (e) {}
            return nextStars;
          });

          return updated;
        }
        return prev;
      });
    },
    []
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => completedLessons.includes(lessonId),
    [completedLessons]
  );

  const resetProgress = useCallback(() => {
    setStarsCount(0);
    setCompletedLessons([]);
    setLessonScores({});
    try {
      localStorage.removeItem(STORAGE_KEY_STARS);
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem(STORAGE_KEY_SCORES);
    } catch (e) {}
  }, []);

  return {
    starsCount,
    completedLessons,
    lessonScores,
    isLoaded,
    completeLesson,
    isLessonCompleted,
    resetProgress,
    badges: ENGLISH_BADGES,
  };
}

