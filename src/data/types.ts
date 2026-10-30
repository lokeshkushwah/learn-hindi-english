export type CategoryId =
  | "swar"
  | "vyanjan"
  | "barakhadi"
  | "two-letter"
  | "three-letter"
  | "four-letter"
  | "matra-words"
  | "similar-sounds";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface HindiItem {
  id: string;
  category: CategoryId;
  devanagari: string;
  transliteration: string;
  exampleWord?: string;
  meaning?: string;
  imagePath?: string;
  expectedSpeech: string;
  audioPath?: string;
  difficulty: DifficultyLevel;
  lessonOrder: number;

  // Visual & backward-compatible aliases for existing UI components
  text: string; // Alias for devanagari
  romanization: string; // Alias for transliteration
  englishMeaning?: string; // Alias for meaning
  emoji: string; // Kid-friendly icon
  soundTipHindi?: string; // Helpful child & parent pronunciation guidance
  subCategory?: string; // Specific subcategory label

  // Sound-based reading & blending practice fields (for two-letter, three-letter, four-letter)
  letters?: string[]; // Individual constituent letters (e.g. ["क", "म", "ल"])
  blendSteps?: string[]; // Step-by-step blending assembly (e.g. ["क", "कम", "कमल"])
  similarGroup?: string; // Similar-sounding peer group for listening quiz (e.g. "जल-फल-नल-पल")
  level?: 1 | 2 | 3; // Word length progression level (1 = two-letter, 2 = three-letter, 3 = four-letter)

  // Picture-to-Word Builder specific fields
  letterSequence?: string[]; // Correct sequence of letters/syllables to form the word
  correctOptions?: string[]; // Set of correct constituent letters/syllables
  distractorOptions?: string[]; // Plausible distractor options for multiple choice
  matras?: string[]; // Vowel signs/matras used in the word (e.g. ["ि", "ा"])

  // Barakhadi specific fields
  consonantRoot?: string; // e.g. "क", "ख", "ग"
  vowelSign?: string; // e.g. "ा", "ि", "ी" or "" for root
  vowelName?: string; // e.g. "आ", "इ", "ई"

  // Matra words specific fields
  matraSign?: string; // e.g. "ा", "ि", "ी", "ु", "ू", "ृ", "े", "ै", "ो", "ौ", "ं", "ँ", "ः", "्"
  matraName?: string; // e.g. "आ की मात्रा", "हलन्त"

  // Specific fields for similar-sounds records
  comparisonTarget?: string; // The contrast letter/word (e.g., "ट" for "त")
  comparisonGroup?: string; // The contrast pair label (e.g., "त vs ट")
  exampleWords?: string[]; // Example word pair (e.g., ["तोता", "टोपी"])
}

export interface CategoryInfo {
  id: CategoryId;
  nameHindi: string;
  nameEnglish: string;
  description: string;
  icon: string;
  color: string;
  count?: number;
}
