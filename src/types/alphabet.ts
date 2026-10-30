export interface AlphabetLetter {
  letter: string;
  lowercase: string;
  isVowel: boolean;
  letterNameAudio: string;
  soundDescription: string;
  soundTeachingEnglish: string;
  soundTeachingHindi: string;
  primaryWord: {
    word: string;
    emoji: string;
    hindi: string;
    sentence: string;
    hindiSentence: string;
  };
  secondaryWords: {
    word: string;
    emoji: string;
    hindi: string;
  }[];
  quiz: {
    prompt: string;
    promptHindi: string;
    options: string[];
    correct: string;
  };
}

export interface VowelLessonData {
  vowel: 'A' | 'E' | 'I' | 'O' | 'U';
  lowercase: string;
  letterName: string;
  shortSoundLabel: string;
  shortSoundHindi: string;
  shortSoundExamples: {
    word: string;
    emoji: string;
    hindi: string;
    cvc: string; // e.g. "c-a-t"
  }[];
  longSoundLabel: string;
  longSoundHindi: string;
  longSoundExamples: {
    word: string;
    emoji: string;
    hindi: string;
  }[];
  hindiGuidance: string;
  wordBuilding: {
    letters: string[];
    word: string;
    emoji: string;
    hindi: string;
  }[];
  quiz: {
    prompt: string;
    promptHindi: string;
    options: string[];
    correct: string;
    explanation: string;
    hindiExplanation: string;
  };
}

export interface ConsonantLessonData {
  letter: string;
  lowercase: string;
  letterName: string;
  commonSound: string;
  soundTipHindi: string;
  examples: {
    word: string;
    emoji: string;
    hindi: string;
  }[];
  specialPattern?: {
    title: string;
    english: string;
    hindi: string;
  };
  quiz: {
    prompt: string;
    promptHindi: string;
    options: string[];
    correct: string;
  };
}

export interface BlendingLessonData {
  id: string;
  word: string;
  emoji: string;
  hindiMeaning: string;
  letters: string[];
  steps: string[];
  sentence: string;
  hindiSentence: string;
}
