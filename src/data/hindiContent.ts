import { CategoryId, CategoryInfo, HindiItem } from "./types";
import { SWAR_ITEMS } from "./swar";
import { VYANJAN_ITEMS } from "./vyanjan";
import { BARAKHADI_ITEMS, ALL_BARAKHADI_CONSONANTS, getBarakhadiForConsonant, VOWEL_PATTERNS } from "./barakhadi";
import { TWO_LETTER_ITEMS } from "./twoLetterWords";
import { THREE_LETTER_ITEMS } from "./threeLetterWords";
import { FOUR_LETTER_ITEMS } from "./fourLetterWords";
import { MATRA_WORD_ITEMS, MATRA_DEFINITIONS, getWordsByMatraSign } from "./matraWords";
import { SIMILAR_SOUNDS_ITEMS } from "./similarSounds";

export * from "./types";
export { SWAR_ITEMS } from "./swar";
export { VYANJAN_ITEMS } from "./vyanjan";
export { BARAKHADI_ITEMS, ALL_BARAKHADI_CONSONANTS, getBarakhadiForConsonant, VOWEL_PATTERNS } from "./barakhadi";
export { TWO_LETTER_ITEMS } from "./twoLetterWords";
export { THREE_LETTER_ITEMS } from "./threeLetterWords";
export { FOUR_LETTER_ITEMS } from "./fourLetterWords";
export { MATRA_WORD_ITEMS, MATRA_DEFINITIONS, getWordsByMatraSign } from "./matraWords";
export { SIMILAR_SOUNDS_ITEMS } from "./similarSounds";
export {
  BARAKHADI_WORD_ITEMS,
  getBarakhadiWordsForConsonant,
  BARAKHADI_WORD_CONSONANTS,
} from "./barakhadiWords";

/**
 * Complete, unified Hindi Learning Dataset
 * Contains 820+ unique learning items across all 8 categories
 */
export const HINDI_DATASET: HindiItem[] = [
  ...SWAR_ITEMS,
  ...VYANJAN_ITEMS,
  ...BARAKHADI_ITEMS,
  ...TWO_LETTER_ITEMS,
  ...THREE_LETTER_ITEMS,
  ...FOUR_LETTER_ITEMS,
  ...MATRA_WORD_ITEMS,
  ...SIMILAR_SOUNDS_ITEMS,
];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "swar",
    nameHindi: "स्वर",
    nameEnglish: "Vowels",
    description: "अ से अः तक सभी 13 मानक स्वर ध्वनियाँ",
    icon: "🔤",
    color: "from-amber-400 to-orange-500",
    count: SWAR_ITEMS.length,
  },
  {
    id: "vyanjan",
    nameHindi: "व्यंजन",
    nameEnglish: "Consonants",
    description: "क से ज्ञ तक सभी 36 व्यंजन व संयुक्ताक्षर",
    icon: "🎨",
    color: "from-sky-400 to-blue-600",
    count: VYANJAN_ITEMS.length,
  },
  {
    id: "barakhadi",
    nameHindi: "संपूर्ण बारहखड़ी",
    nameEnglish: "Complete Barakhadi",
    description: "क से ज्ञ तक सभी 34 व्यंजनों की पूर्ण बारहखड़ी (441 अक्षर)",
    icon: "✨",
    color: "from-emerald-400 to-teal-600",
    count: BARAKHADI_ITEMS.length,
  },
  {
    id: "two-letter",
    nameHindi: "दो अक्षर वाले शब्द",
    nameEnglish: "2-Letter Words",
    description: "जल, फल, नल, घर, बस सहित 45 सरल शब्द",
    icon: "💧",
    color: "from-pink-400 to-rose-500",
    count: TWO_LETTER_ITEMS.length,
  },
  {
    id: "three-letter",
    nameHindi: "तीन अक्षर वाले शब्द",
    nameEnglish: "3-Letter Words",
    description: "कमल, महल, गगन, मटर, शहद सहित 55 शब्द",
    icon: "🪷",
    color: "from-purple-400 to-indigo-600",
    count: THREE_LETTER_ITEMS.length,
  },
  {
    id: "four-letter",
    nameHindi: "चार अक्षर वाले शब्द",
    nameEnglish: "4-Letter Words",
    description: "अजगर, अदरक, शलगम, बरगद, खटमल सहित 40 शब्द",
    icon: "🐍",
    color: "from-teal-400 to-emerald-600",
    count: FOUR_LETTER_ITEMS.length,
  },
  {
    id: "matra-words",
    nameHindi: "मात्रा वाले शब्द",
    nameEnglish: "Words with Matras",
    description: "ा, ि, ी, ु, ू, ृ, े, ै, ो, ौ, ं, ँ, ः, ् के 163 शब्द",
    icon: "📖",
    color: "from-yellow-400 to-amber-600",
    count: MATRA_WORD_ITEMS.length,
  },
  {
    id: "similar-sounds",
    nameHindi: "मिलती-जुलती ध्वनियाँ",
    nameEnglish: "Similar Sounds",
    description: "त/ट, द/ड, स/श, ब/व, प/फ व अल्पप्राण/महाप्राण (28 तुलनाएं)",
    icon: "👂",
    color: "from-cyan-400 to-blue-500",
    count: SIMILAR_SOUNDS_ITEMS.length,
  },
];

export interface SimilarSoundPair {
  id: string;
  title: string;
  letterA: {
    letter: string;
    mouthShapeHindi: string;
    soundType: string;
    exampleWord: string;
    exampleEmoji: string;
    tip: string;
  };
  letterB: {
    letter: string;
    mouthShapeHindi: string;
    soundType: string;
    exampleWord: string;
    exampleEmoji: string;
    tip: string;
  };
  contrastExplanation: string;
  practiceWords: {
    wordA: string;
    emojiA: string;
    wordB: string;
    emojiB: string;
  }[];
}

export const SIMILAR_SOUND_PAIRS: SimilarSoundPair[] = [
  {
    id: "ta-vs-ta",
    title: "त (Dental) बनाम ट (Retroflex)",
    contrastExplanation: "त बोलते समय जीभ आगे के दाँतों को छूती है (नरम ध्वनि)। ट बोलते समय जीभ ऊपर तालू की ओर मुड़कर झटके से गिरती है (कड़क ध्वनि)।",
    letterA: {
      letter: "त",
      mouthShapeHindi: "जीभ दाँतों के पीछे",
      soundType: "दंत्य (Dental)",
      exampleWord: "तोता",
      exampleEmoji: "🦜",
      tip: "मुस्कुराओ और जीभ को ऊपर वाले आगे के दाँतों पर हल्के से छुओ: त!",
    },
    letterB: {
      letter: "ट",
      mouthShapeHindi: "जीभ ऊपर तालू की तरफ मुड़ी हुई",
      soundType: "मूर्धन्य (Retroflex)",
      exampleWord: "टमाटर",
      exampleEmoji: "🍅",
      tip: "जीभ की नोक को ऊपर छत (तालू) की ओर मोड़ो और झटके से बोलो: ट!",
    },
    practiceWords: [
      { wordA: "तोता", emojiA: "🦜", wordB: "टोपी", emojiB: "🧢" },
      { wordA: "तितली", emojiA: "🦋", wordB: "टमाटर", emojiB: "🍅" },
      { wordA: "तराज़ू", emojiA: "⚖️", wordB: "टब", emojiB: "🛁" },
      { wordA: "ताला", emojiA: "🔒", wordB: "टोकरी", emojiB: "🧺" },
    ],
  },
  {
    id: "da-vs-da",
    title: "द (Dental) बनाम ड (Retroflex)",
    contrastExplanation: "द बोलते समय जीभ सामने दाँतों पर लगती है। ड बोलते समय जीभ तालू पर मुड़कर नीचे गिरती है।",
    letterA: {
      letter: "द",
      mouthShapeHindi: "जीभ दाँतों को छूती है",
      soundType: "दंत्य (Dental)",
      exampleWord: "दवात",
      exampleEmoji: "🖋️",
      tip: "जीभ को ऊपर के दाँतों के पीछे रखो और बोलो: द!",
    },
    letterB: {
      letter: "ड",
      mouthShapeHindi: "जीभ तालू पर टकराती है",
      soundType: "मूर्धन्य (Retroflex)",
      exampleWord: "डमरू",
      exampleEmoji: "🥁",
      tip: "जीभ को ऊपर मोड़कर तालू पर हल्का सा थपथपाओ: ड!",
    },
    practiceWords: [
      { wordA: "दवात", emojiA: "🖋️", wordB: "डमरू", emojiB: "🥁" },
      { wordA: "दरवाजा", emojiA: "🚪", wordB: "डिब्बा", emojiB: "📦" },
      { wordA: "दीपक", emojiA: "🪔", wordB: "डाली", emojiB: "🌿" },
      { wordA: "दूध", emojiA: "🥛", wordB: "डक", emojiB: "🦆" },
    ],
  },
  {
    id: "sa-vs-sha",
    title: "स (Dental S) बनाम श (Palatal Sh)",
    contrastExplanation: "स में दाँतों के बीच से सीटी जैसी पतली हवा निकलती है। श में जीभ तालू के पास चौड़ी होती है और गहरी 'शशश' हवा निकलती है।",
    letterA: {
      letter: "स",
      mouthShapeHindi: "दाँत हल्के बंद, पतली सीटी",
      soundType: "दंत्य (Dental S)",
      exampleWord: "सूरज",
      exampleEmoji: "☀️",
      tip: "दाँत मिलाकर सीटी जैसी पतली हवा निकालो: स!",
    },
    letterB: {
      letter: "श",
      mouthShapeHindi: "होंठ थोड़े आगे, गहरी हवा",
      soundType: "तालव्य (Palatal Sh)",
      exampleWord: "शेर",
      exampleEmoji: "🦁",
      tip: "जैसे किसी को चुप कराते हैं 'शशश...', वैसे बोलो: श!",
    },
    practiceWords: [
      { wordA: "सूरज", emojiA: "☀️", wordB: "शेर", emojiB: "🦁" },
      { wordA: "सीटी", emojiA: "🎺", wordB: "शंख", emojiB: "🐚" },
      { wordA: "सेब", emojiA: "🍎", wordB: "शीशा", emojiB: "🪞" },
      { wordA: "सड़क", emojiA: "🛣️", wordB: "शहद", emojiB: "🍯" },
    ],
  },
  {
    id: "ba-vs-va",
    title: "ब (Bilabial B) बनाम व (Labiodental V)",
    contrastExplanation: "ब बोलते समय दोनों होंठ आपस में पूरे मिलते हैं। व बोलते समय ऊपर के दाँत हल्के से नीचे के होंठ को छूते हैं।",
    letterA: {
      letter: "ब",
      mouthShapeHindi: "दोनों होंठ पूरे मिलते हैं",
      soundType: "ओष्ठ्य (Bilabial)",
      exampleWord: "बस",
      exampleEmoji: "🚌",
      tip: "दोनों होंठों को आपस में दबाकर खोलो: ब!",
    },
    letterB: {
      letter: "व",
      mouthShapeHindi: "ऊपर के दाँत + नीचे का होंठ",
      soundType: "दंतोष्ठ्य (Labiodental)",
      exampleWord: "वन",
      exampleEmoji: "🌳",
      tip: "ऊपर के दाँत नीचे वाले होंठ पर हल्के से टिकाओ और हवा निकालो: व!",
    },
    practiceWords: [
      { wordA: "बस", emojiA: "🚌", wordB: "वन", emojiB: "🌳" },
      { wordA: "बत्तख", emojiA: "🦆", wordB: "वक", emojiB: "🦩" },
      { wordA: "बंदर", emojiA: "🐒", wordB: "वर्षा", emojiB: "🌧️" },
      { wordA: "बादल", emojiA: "☁️", wordB: "विमान", emojiB: "✈️" },
    ],
  },
  {
    id: "pa-vs-pha",
    title: "प (Unaspirated) बनाम फ (Aspirated)",
    contrastExplanation: "प बोलते समय होंठों से बिना हवा का साफ़ विस्फोट होता है। फ बोलते समय होंठों से हवा का तेज़ झोंका निकलता है।",
    letterA: {
      letter: "प",
      mouthShapeHindi: "हवा के बिना होंठों का झटका",
      soundType: "अल्पप्राण (Unaspirated)",
      exampleWord: "पतंग",
      exampleEmoji: "🪁",
      tip: "हथेली आगे रखो - हवा का झोंका नहीं आना चाहिए: प!",
    },
    letterB: {
      letter: "फ",
      mouthShapeHindi: "हवा के झोंके के साथ होंठ",
      soundType: "महाप्राण (Aspirated)",
      exampleWord: "फल",
      exampleEmoji: "🍎",
      tip: "हथेली आगे रखो - तेज़ हवा बाहर आनी चाहिए: फ!",
    },
    practiceWords: [
      { wordA: "पतंग", emojiA: "🪁", wordB: "फल", emojiB: "🍎" },
      { wordA: "पूल", emojiA: "🏊", wordB: "फूल", emojiB: "🌺" },
      { wordA: "पल", emojiA: "⏱️", wordB: "फल", emojiB: "🍇" },
    ],
  },
];

export function getItemsByCategory(category: CategoryId): HindiItem[] {
  switch (category) {
    case "swar":
      return SWAR_ITEMS;
    case "vyanjan":
      return VYANJAN_ITEMS;
    case "barakhadi":
      return BARAKHADI_ITEMS;
    case "two-letter":
      return TWO_LETTER_ITEMS;
    case "three-letter":
      return THREE_LETTER_ITEMS;
    case "four-letter":
      return FOUR_LETTER_ITEMS;
    case "matra-words":
      return MATRA_WORD_ITEMS;
    case "similar-sounds":
      return SIMILAR_SOUNDS_ITEMS;
    default:
      return SWAR_ITEMS;
  }
}

export function getItemsInLessonOrder(): HindiItem[] {
  return [...HINDI_DATASET].sort((a, b) => a.lessonOrder - b.lessonOrder);
}

export function getItemById(id: string): HindiItem | undefined {
  return HINDI_DATASET.find((item) => item.id === id);
}

export function getTotalItemsCount(): number {
  return HINDI_DATASET.length;
}

/**
 * Generates 3-4 options for a Listening Quiz, prioritizing similar-sounding words
 * e.g., for "कमल", prioritizes "कलम", "महल", etc.
 * e.g., for "जल", prioritizes "फल", "नल", "कल".
 * e.g., for "अजगर", prioritizes "अदरक", "बरगद", "शलगम".
 */
export function getQuizOptionsForWord(target: HindiItem): HindiItem[] {
  const categoryItems = getItemsByCategory(target.category);

  // 1. Prioritize words in the same similar-sounding group
  const similarItems = target.similarGroup
    ? categoryItems.filter(
        (it) => it.id !== target.id && it.similarGroup === target.similarGroup
      )
    : [];

  // 2. Other words in the same category
  const otherItems = categoryItems.filter(
    (it) => it.id !== target.id && !similarItems.some((s) => s.id === it.id)
  );

  const distractors: HindiItem[] = [];
  for (const it of similarItems) {
    if (distractors.length < 3) distractors.push(it);
  }
  for (const it of otherItems) {
    if (distractors.length < 3) distractors.push(it);
  }

  // Combine and shuffle
  const options = [target, ...distractors];
  return options.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
