"use client";

import { useCallback, useEffect, useState } from "react";
import { CategoryId } from "@/data/hindiContent";

export interface ProgressHistoryItem {
  id: string;
  itemId: string;
  word: string;
  category: CategoryId;
  recognized: string;
  isCorrect: boolean;
  retries: number;
  timestamp: number;
}

export interface Badge {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  descriptionHindi: string;
  icon: string;
  earnedAt?: number;
}

export interface UserProgress {
  wordsAttempted: number;
  correctCount: number;
  retriesCount: number;
  starsEarned: number;
  completedLessons: string[]; // item IDs mastered
  categoryProgress: Record<CategoryId, number>;
  history: ProgressHistoryItem[];
  badges: string[]; // badge IDs earned
}

const DEFAULT_PROGRESS: UserProgress = {
  wordsAttempted: 0,
  correctCount: 0,
  retriesCount: 0,
  starsEarned: 0,
  completedLessons: [],
  categoryProgress: {
    swar: 0,
    vyanjan: 0,
    barakhadi: 0,
    "two-letter": 0,
    "three-letter": 0,
    "four-letter": 0,
    "matra-words": 0,
    "similar-sounds": 0,
  },
  history: [],
  badges: [],
};

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: "first_word",
    titleHindi: "पहला कदम 🌟",
    titleEnglish: "First Step",
    descriptionHindi: "पहला हिंदी शब्द सफलतापूर्वक बोला!",
    icon: "🌱",
  },
  {
    id: "five_stars",
    titleHindi: "पाँच सितारे ⭐",
    titleEnglish: "5 Stars",
    descriptionHindi: "5 सितारे कमा लिए!",
    icon: "⭐",
  },
  {
    id: "swar_master",
    titleHindi: "स्वर सम्राट 👑",
    titleEnglish: "Vowel Master",
    descriptionHindi: "5 स्वरों का सही उच्चारण किया!",
    icon: "🔤",
  },
  {
    id: "vyanjan_hero",
    titleHindi: "व्यंजन विजेता 🏆",
    titleEnglish: "Consonant Hero",
    descriptionHindi: "10 व्यंजनों का सही उच्चारण पूरा किया!",
    icon: "🎨",
  },
  {
    id: "word_whiz",
    titleHindi: "शब्द उस्ताद 📚",
    titleEnglish: "Word Whiz",
    descriptionHindi: "10 शब्द सही बोले!",
    icon: "📖",
  },
  {
    id: "sound_sharp",
    titleHindi: "ध्वनि पारखी 👂",
    titleEnglish: "Sound Detective",
    descriptionHindi: "मिलती-जुलती ध्वनियों में अंतर पहचान लिया!",
    icon: "🔍",
  },
  {
    id: "word_builder_champ",
    titleHindi: "शब्द शिल्पी 🧩",
    titleEnglish: "Word Builder Champ",
    descriptionHindi: "चित्र देखकर सही अक्षर जोड़कर 5 शब्द बनाए!",
    icon: "🧩",
  },
];

const STORAGE_KEY = "hindi_kids_learning_progress_v1";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [newBadgeEarned, setNewBadgeEarned] = useState<Badge | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setProgress({
            ...DEFAULT_PROGRESS,
            ...parsed,
            categoryProgress: {
              ...DEFAULT_PROGRESS.categoryProgress,
              ...(parsed.categoryProgress || {}),
            },
          });
        }
      } catch (e) {
        console.warn("Failed to load progress from localStorage:", e);
      }
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = (updated: UserProgress) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save progress:", e);
      }
    }
  };

  const checkBadgeUnlocks = useCallback((updated: UserProgress) => {
    const newlyUnlocked: string[] = [];

    if (updated.wordsAttempted >= 1 && !updated.badges.includes("first_word")) {
      newlyUnlocked.push("first_word");
    }
    if (updated.starsEarned >= 5 && !updated.badges.includes("five_stars")) {
      newlyUnlocked.push("five_stars");
    }
    if ((updated.categoryProgress.swar || 0) >= 5 && !updated.badges.includes("swar_master")) {
      newlyUnlocked.push("swar_master");
    }
    if ((updated.categoryProgress.vyanjan || 0) >= 10 && !updated.badges.includes("vyanjan_hero")) {
      newlyUnlocked.push("vyanjan_hero");
    }
    if (
      ((updated.categoryProgress["two-letter"] || 0) +
        (updated.categoryProgress["three-letter"] || 0) +
        (updated.categoryProgress["matra-words"] || 0)) >=
        10 &&
      !updated.badges.includes("word_whiz")
    ) {
      newlyUnlocked.push("word_whiz");
    }
    if (
      (updated.categoryProgress["similar-sounds"] || 0) >= 4 &&
      !updated.badges.includes("sound_sharp")
    ) {
      newlyUnlocked.push("sound_sharp");
    }
    const builderCount = updated.history.filter((h) => h.recognized?.includes("builder")).length;
    if (
      (builderCount >= 5 || updated.correctCount >= 5) &&
      !updated.badges.includes("word_builder_champ")
    ) {
      newlyUnlocked.push("word_builder_champ");
    }

    if (newlyUnlocked.length > 0) {
      const badgeId = newlyUnlocked[0];
      const badgeObj = AVAILABLE_BADGES.find((b) => b.id === badgeId) || null;
      if (badgeObj) {
        setNewBadgeEarned(badgeObj);
      }
      updated.badges = [...updated.badges, ...newlyUnlocked];
    }
  }, []);

  const recordAttempt = useCallback(
    (
      itemId: string,
      word: string,
      category: CategoryId,
      recognized: string,
      isCorrect: boolean,
      retries: number
    ) => {
      setProgress((prev) => {
        const isNewMastery = isCorrect && !prev.completedLessons.includes(itemId);
        const updatedStars = isCorrect ? prev.starsEarned + (isNewMastery ? 2 : 1) : prev.starsEarned;
        const updatedCompleted = isNewMastery ? [...prev.completedLessons, itemId] : prev.completedLessons;

        const catCount = (prev.categoryProgress[category] || 0) + (isCorrect ? 1 : 0);

        const newHistoryItem: ProgressHistoryItem = {
          id: `${Date.now()}-${Math.random()}`,
          itemId,
          word,
          category,
          recognized,
          isCorrect,
          retries,
          timestamp: Date.now(),
        };

        const updated: UserProgress = {
          ...prev,
          wordsAttempted: prev.wordsAttempted + 1,
          correctCount: prev.correctCount + (isCorrect ? 1 : 0),
          retriesCount: prev.retriesCount + retries,
          starsEarned: updatedStars,
          completedLessons: updatedCompleted,
          categoryProgress: {
            ...prev.categoryProgress,
            [category]: catCount,
          },
          history: [newHistoryItem, ...prev.history.slice(0, 49)], // keep last 50
        };

        checkBadgeUnlocks(updated);
        saveToStorage(updated);
        return updated;
      });
    },
    [checkBadgeUnlocks]
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const dismissBadge = useCallback(() => {
    setNewBadgeEarned(null);
  }, []);

  return {
    progress,
    isLoaded,
    recordAttempt,
    resetProgress,
    newBadgeEarned,
    dismissBadge,
  };
}

