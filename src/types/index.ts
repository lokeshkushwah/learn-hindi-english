export type LanguageMode = 'english-only' | 'english-hindi' | 'hindi-needed';

export interface LanguageSettings {
  mode: LanguageMode;
  boldEnglish: boolean;
}

export type StageId =
  | 'stage-1'  // Alphabet and Sounds
  | 'stage-2'  // First Words
  | 'stage-3'  // First Grammar Concepts
  | 'stage-4'  // Simple Sentences
  | 'stage-5'  // Sentence Building
  | 'stage-6'  // Time and Tenses
  | 'stage-7'  // Growing Grammar Skills
  | 'stage-8'  // Reading and Writing
  | 'stage-9'  // Speaking and Listening
  | 'stage-10'; // Advanced Learning Path

export interface StageInfo {
  id: StageId;
  levelNumber: number;
  title: string;
  hindiTitle: string;
  tagline: string;
  description: string;
  hindiDescription: string;
  emoji: string;
  badgeGradient: string;
  targetAge: string;
  conceptsSummary: string[];
}

export interface PictureExample {
  id: string;
  englishWord: string;
  speechText?: string; // Explicitly separates display text from audio playback
  hindiWord: string;
  englishSentence: string;
  hindiSentence: string;
  categoryTag?: string; // e.g. "Thing", "Animal", "Person", "Place", "Action", "Phonics"
  illustration: {
    emoji: string;
    bgGradient: string;
    description: string;
    svgName?: string;
  };
  isDifficult?: boolean; // For "Hindi Support Only Where Needed" mode
  phoneticHint?: string;
}

export interface GrammarInteractiveActivity {
  id?: string;
  type:
    | 'classify'
    | 'choose-verb'
    | 'compare-adjective'
    | 'article-sorter'
    | 'singular-plural'
    | 'preposition-picker'
    | 'sentence-arrange'
    | 'time-traveler'
    | 'phonics-match'
    | 'first-words-match'
    | 'this-that-picker'
    | 'simple-sentence-builder'
    | 'speaking-repeat'
    | 'story-comprehension'
    | 'matching'
    | 'fill-blank'
    | 'categorization'
    | (string & {});
  title: string;
  instructionEnglish?: string;
  instructionHindi?: string;
  instructions?: string;
  data?: any;
  pairs?: any;
  items?: any;
  options?: any;
  blankItems?: any;
  categories?: any;
}

export interface QuizQuestion {
  id: string;
  promptEnglish: string;
  promptHindi: string;
  imageEmoji: string;
  imageBg?: string;
  options: {
    id: string;
    textEnglish: string;
    textHindi: string;
    isCorrect: boolean;
    emoji?: string;
  }[];
  explanationEnglish: string;
  explanationHindi: string;
  isDifficult?: boolean;
}

export interface GrammarLesson {
  id: string;
  slug: string;
  stage: StageId;
  order: number;
  titleEnglish: string;
  titleHindi: string;
  topicBadge: string;
  summaryEnglish: string;
  summaryHindi: string;
  heroIllustration: {
    emoji: string;
    bgGradient: string;
    title: string;
    subtitle: string;
  };
  ruleEnglish: string;
  ruleHindi: string;
  childExplanationEnglish: string;
  childExplanationHindi: string;
  difficultyNoteHindi?: string;
  story?: {
    title: string;
    panels: {
      imageEmoji: string;
      bgGradient: string;
      textEnglish: string;
      textHindi: string;
      audioPhrase: string;
      highlightWord?: string;
    }[];
  };
  examples: PictureExample[];
  activity: GrammarInteractiveActivity;
  quiz: QuizQuestion[];
  worksheetQuestions: {
    id: string;
    type: 'fill-blank' | 'mcq' | 'matching' | 'translate' | 'multiple-choice' | (string & {});
    questionEnglish: string;
    questionHindi: string;
    options?: string[];
    correctAnswer: string;
    hindiExplanation?: string;
    explanationHindi?: string;
    emoji?: string;
    isDifficult?: boolean;
  }[];
  encouragingMessage: {
    english: string;
    hindi: string;
  };
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaningHindi: string;
  explanationEnglish: string;
  explanationHindi: string;
  exampleSentenceEnglish: string;
  exampleSentenceHindi: string;
  emoji: string;
  theme: string;
  isDifficult?: boolean;
}

export interface GrammarNoteItem {
  id: string;
  titleEnglish: string;
  titleHindi: string;
  category: string;
  formulaEnglish: string;
  formulaHindi: string;
  coreRuleEnglish: string;
  coreRuleHindi: string;
  examples: {
    english: string;
    hindi: string;
    highlight?: string;
  }[];
  childTipEnglish: string;
  childTipHindi: string;
  isDifficult?: boolean;
}

export interface GrammarCheatCode {
  id: string;
  number: number;
  title: string;
  hindiTitle: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rememberMantra: string; // The short, memorable rule in English
  hindiExplanation: string;
  heroEmoji: string;
  bgGradient: string;
  storyNote?: string;
  highlights?: {
    part: string;
    label: string;
    color: string;
  }[];
  examples: {
    english: string;
    speechText?: string;
    hindi: string;
    highlight?: string;
    emoji?: string;
  }[];
  commonMistake?: {
    wrong: string;
    right: string;
    explanationEnglish: string;
    explanationHindi: string;
  };
  memoryTrickEnglish: string;
  memoryTrickHindi: string;
  practiceQuestion: {
    promptEnglish: string;
    promptHindi: string;
    options: string[];
    correctAnswer: string;
    explanationEnglish: string;
    explanationHindi: string;
  };
}

export interface StudentProgress {
  completedLessonIds: string[];
  starsCount: number;
  level: number;
  currentStreak: number;
  lastStudiedDate: string;
}
