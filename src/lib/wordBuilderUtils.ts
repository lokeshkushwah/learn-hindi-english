import { HindiItem } from "@/data/types";

// Standard Swar (Vowels) in Hindi
export const SWAR_OPTIONS = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
];

// Standard Vyanjan (Consonants & Conjuncts) in Hindi
export const VYANJAN_OPTIONS = [
  "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श",
  "ष", "स", "ह", "क्ष", "त्र", "ज्ञ",
];

// Standard Matras (Vowel signs / Combining marks)
export interface MatraOption {
  sign: string;
  name: string;
  vowel: string;
  sample: string;
  soundTip: string;
}

export const MATRA_OPTIONS: MatraOption[] = [
  { sign: "ा", name: "आ की मात्रा", vowel: "आ", sample: "का", soundTip: "लंबी 'आ' ध्वनि — मुँह पूरा खोलो" },
  { sign: "ि", name: "छोटी इ की मात्रा", vowel: "इ", sample: "कि", soundTip: "हल्की व तुरंत 'इ' ध्वनि" },
  { sign: "ी", name: "बड़ी ई की मात्रा", vowel: "ई", sample: "की", soundTip: "मुस्कुराते हुए लंबी 'ई' ध्वनि" },
  { sign: "ु", name: "छोटे उ की मात्रा", vowel: "उ", sample: "कु", soundTip: "होंठ गोल करके तुरंत 'उ'" },
  { sign: "ू", name: "बड़े ऊ की मात्रा", vowel: "ऊ", sample: "कू", soundTip: "होंठ गोल करके लंबी 'ऊ' ध्वनि" },
  { sign: "ृ", name: "ऋ की मात्रा", vowel: "ऋ", sample: "कृ", soundTip: "जीभ तालू के पास — 'रि' जैसी ध्वनि" },
  { sign: "े", name: "ए की मात्रा", vowel: "ए", sample: "के", soundTip: "आधा मुँह खोलकर 'ए' ध्वनि" },
  { sign: "ै", name: "ऐ की मात्रा", vowel: "ऐ", sample: "कै", soundTip: "चौड़ा मुँह खोलकर 'ऐ' ध्वनि" },
  { sign: "ो", name: "ओ की मात्रा", vowel: "ओ", sample: "को", soundTip: "होंठ गोल करके 'ओ' ध्वनि" },
  { sign: "ौ", name: "औ की मात्रा", vowel: "औ", sample: "कौ", soundTip: "बड़ा मुँह खोलते हुए 'औ' ध्वनि" },
  { sign: "ं", name: "अनुस्वार", vowel: "अं", sample: "कं", soundTip: "नाक से हल्की नासिक्य ध्वनि" },
  { sign: "ँ", name: "चंद्रबिंदु", vowel: "अँ", sample: "कँ", soundTip: "नाक और मुँह दोनों से गूंज" },
  { sign: "ः", name: "विसर्ग", vowel: "अः", sample: "कः", soundTip: "हल्की 'ह' की सांस" },
];

const DEVANAGARI_MATRA_REGEX = /[\u093E-\u094C\u0962\u0963\u0901-\u0903]/;

/**
 * Returns true if the character is a combining Devanagari vowel sign/matra.
 */
export function isMatraSign(char: string): boolean {
  return DEVANAGARI_MATRA_REGEX.test(char);
}

/**
 * Decomposes any Hindi word into its orthographic syllables/graphemes.
 * For example:
 * "कमल"  -> ["क", "म", "ल"]
 * "किताब" -> ["कि", "ता", "ब"]
 * "गुलाब" -> ["गु", "ला", "ब"]
 * "अजगर" -> ["अ", "ज", "ग", "र"]
 */
export function getWordLetterSequence(item: HindiItem): string[] {
  if (item.letterSequence && item.letterSequence.length > 0) {
    return item.letterSequence;
  }
  if (item.letters && item.letters.length > 0) {
    return item.letters;
  }

  const word = (item.devanagari || item.text || "").trim();
  if (!word) return [];

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("hi", { granularity: "grapheme" });
    return Array.from(segmenter.segment(word), (s) => s.segment);
  }

  // Fallback regex if Intl.Segmenter is unavailable
  const match = word.match(/[\u0900-\u097F][\u093E-\u094D\u0901-\u0903]*/g);
  return match || Array.from(word);
}

/**
 * Splits a Devanagari grapheme into its root base consonant/vowel and attached matra sign.
 * e.g. "कि" -> { base: "क", matra: "ि" }
 *      "ता" -> { base: "त", matra: "ा" }
 *      "ब"  -> { base: "ब", matra: "" }
 */
export function splitGraphemeIntoBaseAndMatra(grapheme: string): { base: string; matra: string } {
  if (!grapheme) return { base: "", matra: "" };
  const chars = Array.from(grapheme);
  const base = chars[0];
  const matras = chars.slice(1).filter((c) => DEVANAGARI_MATRA_REGEX.test(c)).join("");
  return { base, matra: matras };
}

/**
 * Combines a base consonant with a matra sign safely.
 * e.g. combineBaseAndMatra("क", "ि") -> "कि"
 *      combineBaseAndMatra("का", "ि") -> "कि" (replaces previous matra)
 */
export function combineBaseAndMatra(baseChar: string, matraSign: string): string {
  if (!baseChar) return "";
  const { base } = splitGraphemeIntoBaseAndMatra(baseChar);
  if (!matraSign) return base;
  return `${base}${matraSign}`;
}

/**
 * Extracts all matras present in a word.
 */
export function extractMatrasFromWord(word: string): string[] {
  const chars = Array.from(word);
  return Array.from(new Set(chars.filter((c) => DEVANAGARI_MATRA_REGEX.test(c))));
}

// Pool of smart distractors for amatrik and matrik words
const AMATRIK_DISTRACTORS = ["न", "र", "स", "प", "च", "ह", "ट", "द", "व", "म", "ल", "ख"];
const MATRIK_DISTRACTORS = ["का", "ती", "दू", "मे", "रो", "ना", "सी", "पा", "ला", "के", "गु", "दी"];

/**
 * Generates 4 to 6 multiple choice options for the Picture-to-Word Builder.
 * Includes all correct letters/syllables plus smart distractors, shuffled.
 */
export function generateWordBuilderOptions(item: HindiItem, maxOptions = 6): string[] {
  if (item.correctOptions && item.distractorOptions) {
    const combined = [...item.correctOptions, ...item.distractorOptions];
    return Array.from(new Set(combined)).slice(0, maxOptions);
  }

  const correctLetters = getWordLetterSequence(item);
  const correctSet = new Set(correctLetters);

  const hasMatras = correctLetters.some((l) => DEVANAGARI_MATRA_REGEX.test(l));
  const candidatePool = hasMatras ? MATRIK_DISTRACTORS : AMATRIK_DISTRACTORS;

  // Filter distractors so none collide with correct letters
  const validDistractors = candidatePool.filter((d) => !correctSet.has(d));

  // Deterministic shuffle based on item ID
  const seed = item.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const shuffledDistractors = [...validDistractors].sort((a, b) => {
    const aVal = (a.charCodeAt(0) * seed) % 100;
    const bVal = (b.charCodeAt(0) * seed) % 100;
    return aVal - bVal;
  });

  const neededDistractorsCount = Math.max(2, maxOptions - correctLetters.length);
  const pickedDistractors = shuffledDistractors.slice(0, neededDistractorsCount);

  // Preserve all constituent letters with their exact multiplicity so words with repeated
  // letters (like गगन with two ग's, टमटम with two ट's and two म's, चमचम, etc.) have all required tiles
  const allOptions = [...correctLetters, ...pickedDistractors];

  // Shuffle the final options deterministically while preserving duplicate letters cleanly
  return allOptions
    .map((char, idx) => ({
      char,
      sortKey: ((char.charCodeAt(0) * 17 + idx * 37 + seed) % 97),
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((x) => x.char);
}
