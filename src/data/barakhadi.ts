import { HindiItem } from "./types";

export interface VowelPattern {
  suffix: string;
  vowelName: string;
  vowelSign: string;
  romanSuffix: string;
  tip: string;
  emoji: string;
}

export const VOWEL_PATTERNS: VowelPattern[] = [
  { suffix: "", vowelName: "अ", vowelSign: "अ (मूल)", romanSuffix: "a", tip: "बिना मात्रा की मूल ध्वनि", emoji: "🌱" },
  { suffix: "ा", vowelName: "आ", vowelSign: "ा", romanSuffix: "aa", tip: "आ की मात्रा - मुँह पूरा खोलो", emoji: "🎋" },
  { suffix: "ि", vowelName: "इ", vowelSign: "ि", romanSuffix: "i", tip: "छोटी इ की मात्रा - तुरंत बोलो", emoji: "⚡" },
  { suffix: "ी", vowelName: "ई", vowelSign: "ी", romanSuffix: "ee", tip: "बड़ी ई की मात्रा - लंबी तान", emoji: "🗝️" },
  { suffix: "ु", vowelName: "उ", vowelSign: "ु", romanSuffix: "u", tip: "छोटे उ की मात्रा - होंठ गोल करो", emoji: "🐥" },
  { suffix: "ू", vowelName: "ऊ", vowelSign: "ू", romanSuffix: "oo", tip: "बड़े ऊ की मात्रा - लंबी ध्वनि", emoji: "🕊️" },
  { suffix: "ृ", vowelName: "ऋ", vowelSign: "ृ", romanSuffix: "ri", tip: "ऋ की मात्रा - जीभ तालू के पास", emoji: "🧘" },
  { suffix: "े", vowelName: "ए", vowelSign: "े", romanSuffix: "e", tip: "ए की मात्रा - ऊपर एक मात्रा", emoji: "🍌" },
  { suffix: "ै", vowelName: "ऐ", vowelSign: "ै", romanSuffix: "ai", tip: "ऐ की मात्रा - ऊपर दो मात्राएँ", emoji: "📷" },
  { suffix: "ो", vowelName: "ओ", vowelSign: "ो", romanSuffix: "o", tip: "ओ की मात्रा - एक डंडा और मात्रा", emoji: "🐦" },
  { suffix: "ौ", vowelName: "औ", vowelSign: "ौ", romanSuffix: "au", tip: "औ की मात्रा - एक डंडा दो मात्राएँ", emoji: "🦅" },
  { suffix: "ं", vowelName: "अं", vowelSign: "ं", romanSuffix: "am", tip: "अनुस्वार - नाक से गूंज", emoji: "🪷" },
  { suffix: "ः", vowelName: "अः", vowelSign: "ः", romanSuffix: "ah", tip: "विसर्ग - हल्की ह की ध्वनि", emoji: "✨" },
];

export interface ConsonantMeta {
  root: string;
  name: string;
  prefixId: string;
  roman: string;
  varga: string;
}

export const ALL_BARAKHADI_CONSONANTS: ConsonantMeta[] = [
  // 1. क-वर्ग (Velars)
  { root: "क", name: "क की बारहखड़ी", prefixId: "bar-k", roman: "K", varga: "क-वर्ग" },
  { root: "ख", name: "ख की बारहखड़ी", prefixId: "bar-kh", roman: "Kh", varga: "क-वर्ग" },
  { root: "ग", name: "ग की बारहखड़ी", prefixId: "bar-g", roman: "G", varga: "क-वर्ग" },
  { root: "घ", name: "घ की बारहखड़ी", prefixId: "bar-gh", roman: "Gh", varga: "क-वर्ग" },

  // 2. च-वर्ग (Palatals)
  { root: "च", name: "च की बारहखड़ी", prefixId: "bar-ch", roman: "Ch", varga: "च-वर्ग" },
  { root: "छ", name: "छ की बारहखड़ी", prefixId: "bar-chh", roman: "Chh", varga: "च-वर्ग" },
  { root: "ज", name: "ज की बारहखड़ी", prefixId: "bar-j", roman: "J", varga: "च-वर्ग" },
  { root: "झ", name: "झ की बारहखड़ी", prefixId: "bar-jh", roman: "Jh", varga: "च-वर्ग" },

  // 3. ट-वर्ग (Retroflexes)
  { root: "ट", name: "ट की बारहखड़ी", prefixId: "bar-t_ret", roman: "T", varga: "ट-वर्ग" },
  { root: "ठ", name: "ठ की बारहखड़ी", prefixId: "bar-th_ret", roman: "Th", varga: "ट-वर्ग" },
  { root: "ड", name: "ड की बारहखड़ी", prefixId: "bar-d_ret", roman: "D", varga: "ट-वर्ग" },
  { root: "ढ", name: "ढ की बारहखड़ी", prefixId: "bar-dh_ret", roman: "Dh", varga: "ट-वर्ग" },
  { root: "ण", name: "ण की बारहखड़ी", prefixId: "bar-n_ret", roman: "N", varga: "ट-वर्ग" },

  // 4. त-वर्ग (Dentals)
  { root: "त", name: "त की बारहखड़ी", prefixId: "bar-t_den", roman: "T", varga: "त-वर्ग" },
  { root: "थ", name: "थ की बारहखड़ी", prefixId: "bar-th_den", roman: "Th", varga: "त-वर्ग" },
  { root: "द", name: "द की बारहखड़ी", prefixId: "bar-d_den", roman: "D", varga: "त-वर्ग" },
  { root: "ध", name: "ध की बारहखड़ी", prefixId: "bar-dh_den", roman: "Dh", varga: "त-वर्ग" },
  { root: "न", name: "न की बारहखड़ी", prefixId: "bar-n", roman: "N", varga: "त-वर्ग" },

  // 5. प-वर्ग (Labials)
  { root: "प", name: "प की बारहखड़ी", prefixId: "bar-p", roman: "P", varga: "प-वर्ग" },
  { root: "फ", name: "फ की बारहखड़ी", prefixId: "bar-ph", roman: "Ph", varga: "प-वर्ग" },
  { root: "ब", name: "ब की बारहखड़ी", prefixId: "bar-b", roman: "B", varga: "प-वर्ग" },
  { root: "भ", name: "भ की बारहखड़ी", prefixId: "bar-bh", roman: "Bh", varga: "प-वर्ग" },
  { root: "म", name: "म की बारहखड़ी", prefixId: "bar-m", roman: "M", varga: "प-वर्ग" },

  // 6. अन्तस्थ (Semivowels)
  { root: "य", name: "य की बारहखड़ी", prefixId: "bar-y", roman: "Y", varga: "अन्तस्थ" },
  { root: "र", name: "र की बारहखड़ी", prefixId: "bar-r", roman: "R", varga: "अन्तस्थ" },
  { root: "ल", name: "ल की बारहखड़ी", prefixId: "bar-l", roman: "L", varga: "अन्तस्थ" },
  { root: "व", name: "व की बारहखड़ी", prefixId: "bar-v", roman: "V", varga: "अन्तस्थ" },

  // 7. ऊष्म (Sibilants & Aspirate)
  { root: "श", name: "श की बारहखड़ी", prefixId: "bar-sh_pal", roman: "Sh", varga: "ऊष्म" },
  { root: "ष", name: "ष की बारहखड़ी", prefixId: "bar-sh_ret", roman: "Sh", varga: "ऊष्म" },
  { root: "स", name: "स की बारहखड़ी", prefixId: "bar-s", roman: "S", varga: "ऊष्म" },
  { root: "ह", name: "ह की बारहखड़ी", prefixId: "bar-h", roman: "H", varga: "ऊष्म" },

  // 8. संयुक्ताक्षर (Conjuncts)
  { root: "क्ष", name: "क्ष की बारहखड़ी", prefixId: "bar-ksh", roman: "Ksh", varga: "संयुक्ताक्षर" },
  { root: "त्र", name: "त्र की बारहखड़ी", prefixId: "bar-tr", roman: "Tr", varga: "संयुक्ताक्षर" },
  { root: "ज्ञ", name: "ज्ञ की बारहखड़ी", prefixId: "bar-gy", roman: "Gy", varga: "संयुक्ताक्षर" },
];

/**
 * Builds linguistically accurate syllable string, handling special cases like 'र' + 'ु' = 'रु' and 'र' + 'ू' = 'रू'
 */
function makeBarakhadiSyllable(root: string, vowelSign: string): string {
  if (root === "र") {
    if (vowelSign === "ु") return "रु";
    if (vowelSign === "ू") return "रू";
  }
  return root + vowelSign;
}

let lessonCounter = 50;

export const BARAKHADI_ITEMS: HindiItem[] = ALL_BARAKHADI_CONSONANTS.flatMap((cons) => {
  return VOWEL_PATTERNS.filter((pattern) => {
    // In Hindi linguistics, 'र' does not take vocalic 'ऋ' (ृ)
    if (cons.root === "र" && pattern.vowelName === "ऋ") {
      return false;
    }
    return true;
  }).map((pattern, idx) => {
    const syllable = makeBarakhadiSyllable(cons.root, pattern.suffix);
    const translit = cons.roman + pattern.romanSuffix;
    const order = lessonCounter++;

    return {
      id: `${cons.prefixId}-${idx + 1}`,
      category: "barakhadi",
      devanagari: syllable,
      text: syllable,
      transliteration: translit,
      romanization: translit,
      exampleWord: syllable,
      meaning: `बारहखड़ी: ${cons.root} + ${pattern.vowelName} = ${syllable}`,
      englishMeaning: `Syllable ${syllable} (${cons.root} + ${pattern.vowelName})`,
      imagePath: `/images/hindi/barakhadi/${cons.prefixId}-${idx + 1}.png`,
      expectedSpeech: syllable,
      audioPath: `/audio/hindi/barakhadi/${cons.prefixId}-${idx + 1}.mp3`,
      difficulty: idx < 6 ? "beginner" : "intermediate",
      lessonOrder: order,
      emoji: pattern.emoji,
      soundTipHindi: `${cons.root} + ${pattern.vowelName} (${pattern.vowelSign}): ${pattern.tip}`,
      subCategory: cons.name,
      consonantRoot: cons.root,
      vowelSign: pattern.vowelSign,
      vowelName: pattern.vowelName,
    };
  });
});

/**
 * Helper to get all Barakhadi syllables for a given consonant
 */
export function getBarakhadiForConsonant(root: string): HindiItem[] {
  return BARAKHADI_ITEMS.filter((item) => item.consonantRoot === root);
}
