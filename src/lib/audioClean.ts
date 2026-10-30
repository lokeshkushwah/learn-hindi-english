/**
 * Audio Pronunciation Sanitizer & Phonics Speech Resolver
 *
 * Prevents SpeechSynthesis from speaking "slash", "backslash", raw IPA symbols,
 * or garbled Devanagari in English voice mode.
 */

// Mapping of common phoneme notations to kid-friendly spoken equivalents
const PHONEME_SPOKEN_MAP: Record<string, string> = {
  // Short vowels
  'æ': 'short a',
  'e': 'short e',
  'ɪ': 'short i',
  'i': 'short i',
  'ɒ': 'short o',
  'o': 'short o',
  'ʌ': 'short u',
  'u': 'short u',
  'ʊ': 'short oo',
  'uː': 'long oo',
  'iː': 'long ee',
  'ɑː': 'ah',
  'ɑːr': 'ar',
  'ɔː': 'aw',
  'ɔːr': 'or',
  'ɜː': 'er',
  'ɜːr': 'er',
  'ə': 'uh',
  'eɪ': 'ay',
  'aɪ': 'eye',
  'oʊ': 'oh',
  'aʊ': 'ow',
  'ɔɪ': 'oy',
  'eə': 'air',
  'ɪə': 'ear',
  'ʊə': 'oor',
  'ʃən': 'shun',
  'tʃən': 'chun',
  // Consonants
  'b': 'b',
  'd': 'd',
  'f': 'f',
  'g': 'g',
  'ɡ': 'g',
  'h': 'h',
  'j': 'j',
  'k': 'k',
  'l': 'l',
  'm': 'm',
  'n': 'n',
  'p': 'p',
  'r': 'r',
  's': 's',
  't': 't',
  'v': 'v',
  'w': 'w',
  'z': 'z',
  'θ': 'th',
  'ð': 'th',
  'ʃ': 'sh',
  'ʒ': 'zh',
  'tʃ': 'ch',
  'dʒ': 'j',
  'ŋ': 'ng',
};

/**
 * Cleans and transforms any text before passing it to SpeechSynthesis.
 * 
 * Rules:
 * 1. If text is a standalone phoneme like "/b/" or "/æ/", converts to proper spoken sound or example.
 * 2. If text is a word with phonetic breakdown like "Cat (/k/ - /æ/ - /t/)", extracts "Cat".
 * 3. If text contains alternatives like "One cat / Three cats" or "He / She", converts slash to natural pause ("One cat. Three cats." or "He, She").
 * 4. Strips emojis and technical symbols so speech engine speaks only English words.
 * 5. Strips Hindi (Devanagari) characters when English voice is speaking, e.g. "Yesterday (बीता हुआ कल)" -> "Yesterday".
 * 6. Never produces the word "slash" or "backslash".
 */
export function cleanTextForSpeech(
  rawText: string,
  options?: {
    phonicsMode?: boolean;
    sampleWord?: string;
    lang?: 'en' | 'hi';
  }
): string {
  if (!rawText || typeof rawText !== 'string') return '';

  const lang = options?.lang || 'en';
  let text = rawText.trim();

  // 1. Remove emojis (surrogate pairs and symbols)
  text = text.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]/g, ' ');

  if (lang === 'en') {
    // 2. Remove parenthesized Hindi translations, e.g. "Yesterday (बीता हुआ कल)" -> "Yesterday"
    text = text.replace(/\([^)]*[\u0900-\u097F][^)]*\)/g, ' ');

    // 3. Remove any remaining Devanagari Unicode characters (U+0900 to U+097F)
    text = text.replace(/[\u0900-\u097F]+/g, ' ');

    // 4. Remove empty parentheses
    text = text.replace(/\(\s*\)/g, ' ');

    // 4. Handle "Word (/.../)" or "Word /.../" pattern: e.g. "Cat (/k/ - /æ/ - /t/)" -> "Cat"
    const wordWithPhoneticsMatch = text.match(/^([A-Za-z0-9\s'-]+?)\s*\(\s*\/.*?\/.*?\)$/);
    if (wordWithPhoneticsMatch && wordWithPhoneticsMatch[1].trim().length > 0) {
      return wordWithPhoneticsMatch[1].trim();
    }

    const wordWithSlashPhoneticsMatch = text.match(/^([A-Za-z0-9\s'-]+?)\s+\/.*?\/$/);
    if (wordWithSlashPhoneticsMatch && wordWithSlashPhoneticsMatch[1].trim().length > 0) {
      return wordWithSlashPhoneticsMatch[1].trim();
    }

    // 4b. Strip redundant visual IPA pronunciation guides directly following a token in formulas,
    // e.g. "CEL /sel/ + E /ə/ + BRA /breɪ/ + TION /ʃən/." -> "CEL + E + BRA + TION."
    // or "BA /bə/ + NA /nɑː/ + NA /nə/." -> "BA + NA + NA."
    // This stops SpeechSynthesis from speaking both the token AND the IPA guide twice!
    text = text.replace(/\b([A-Za-z]+)\s*\/[^\/\s]+\/\s*(?=[+,=.]|$)/g, (_m, token) => token + ' ');

    // 4c. Separate alternative letters or words joined by slashes without spaces, e.g. "ER/IR/UR" or "C/G"
    text = text.replace(/\b([A-Za-z]+)\/([A-Za-z]+)\b/g, (_m, a, b) => `${a} or ${b}`);
    text = text.replace(/\b([A-Za-z]+)\/([A-Za-z]+)\b/g, (_m, a, b) => `${a} or ${b}`);

    // 5. Handle standalone slash-delimited phoneme, e.g. "/b/" or "/æ/"
    const standalonePhonemeMatch = text.match(/^\s*[\/\\]([^\/\\]+)[\/\\]\s*$/);
    if (standalonePhonemeMatch) {
      const phoneme = standalonePhonemeMatch[1].trim();
      if (options?.sampleWord) {
        return options.sampleWord;
      }
      if (PHONEME_SPOKEN_MAP[phoneme]) {
        return PHONEME_SPOKEN_MAP[phoneme];
      }
      if (phoneme.length === 1 && /[a-zA-Z]/.test(phoneme)) {
        return phoneme;
      }
      return phoneme;
    }

    // 6. Handle slash-delimited phoneme inside a sentence: e.g. "Bird A sings: /æ/ like Apple."
    text = text.replace(/[\/\\]([^\s\/\\]+)[\/\\]/g, (match, inner) => {
      const trimmed = inner.trim();
      if (PHONEME_SPOKEN_MAP[trimmed]) {
        return PHONEME_SPOKEN_MAP[trimmed];
      }
      if (trimmed.length === 1 && /[a-zA-Z]/.test(trimmed)) {
        return trimmed;
      }
      return trimmed;
    });

    // 7. Handle slashes between alternative words/phrases, e.g. "One cat / Three cats"
    text = text.replace(/\s*[\/\\]\s*/g, () => '. ');

    // 8. Handle arrows "->" or "=>" or "➡️"
    text = text.replace(/\s*(?:->|=>|→|➡️)\s*/g, ' becomes ');

    // 9. Handle vertical bar "|"
    text = text.replace(/\s*\|\s*/g, ', ');

    // 10. Handle syllable formulas (e.g. "BA + NA + NA = BANANA" -> "BAH, NAH, NAH makes BANANA")
    text = text
      .replace(/\s*\+\s*/g, ', ')
      .replace(/\s*=\s*/g, ' makes ');

    // 11. Syllable acronym trap resolver:
    // Browser TTS engines spell out 2-letter syllables like "ba", "na", "pa", "da", "la", "ta"
    // as letters ("B-A", "N-A"). We convert them to natural phonetic spellings ("bah", "nah")
    // while strictly protecting valid standard 2-letter English words.
    const STANDARD_2LETTER_WORDS = new Set([
      'in', 'on', 'at', 'go', 'up', 'no', 'do', 'to', 'me', 'he',
      'we', 'my', 'by', 'so', 'if', 'is', 'am', 'as', 'it', 'us',
      'of', 'or', 'an', 'be', 'hi', 'ox', 'oh', 'ok'
    ]);

    const SYLLABLE_PHONETIC_FIX: Record<string, string> = {
      ba: 'bah', ca: 'kah', da: 'dah', fa: 'fah', ga: 'gah',
      ha: 'hah', ja: 'jah', ka: 'kah', la: 'lah', ma: 'mah',
      na: 'nah', pa: 'pah', ra: 'rah', sa: 'sah', ta: 'tah',
      va: 'vah', wa: 'wah', ya: 'yah', za: 'zah',
      de: 'deh', fe: 'feh', ge: 'jeh', le: 'leh', ne: 'neh',
      pe: 'peh', se: 'seh', te: 'teh', ve: 'veh', ze: 'zeh',
      bi: 'bih', ci: 'sih', di: 'dih', fi: 'fih', gi: 'jih',
      li: 'lee', mi: 'mee', ni: 'nee', pi: 'pee', ri: 'ree',
      si: 'see', ti: 'tee', vi: 'vee', zi: 'zee',
      bo: 'boh', co: 'koh', fo: 'foh', lo: 'loh', mo: 'moh',
      po: 'poh', ro: 'roh', vo: 'voh', zo: 'zoh',
      bu: 'buh', cu: 'kuh', du: 'duh', fu: 'fuh', gu: 'guh',
      lu: 'luh', mu: 'muh', nu: 'nuh', pu: 'puh', ru: 'ruh',
      su: 'suh', tu: 'tuh',
      cy: 'sye', dy: 'dye', ly: 'lee', ry: 'ree', ty: 'tee', xy: 'zye'
    };

    text = text.replace(/\b([A-Za-z]{2})\b/g, (match, token) => {
      const lower = token.toLowerCase();
      if (STANDARD_2LETTER_WORDS.has(lower)) {
        return match;
      }
      if (SYLLABLE_PHONETIC_FIX[lower]) {
        const replacement = SYLLABLE_PHONETIC_FIX[lower];
        if (token === token.toUpperCase()) return replacement.toUpperCase();
        if (token[0] === token[0].toUpperCase()) {
          return replacement[0].toUpperCase() + replacement.slice(1);
        }
        return replacement;
      }
      return match;
    });

    // 12. Handle hyphens between syllable chunks (e.g. "In - ter - nah - tion - al" -> "In, ter, nah, tion, al")
    text = text.replace(/\s+-\s+/g, ', ');
  } else {
    // For Hindi (lang === 'hi'):
    // Keep Devanagari intact. Clean technical brackets, slashes, and IPA phonetics.
    text = text.replace(/\(\s*\/.*?\/.*?\)/g, ' ');
    text = text.replace(/\/.*?\//g, ' ');
    text = text.replace(/\s*[\/\\]\s*/g, ' या ');
    text = text.replace(/\s*(?:->|=>|→)\s*/g, ' यानी ');
    text = text.replace(/\s*\|\s*/g, ', ');
  }

  // 10. Clean up extra punctuation, double dots, remaining empty brackets
  text = text
    .replace(/\(\s*\)/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.{2,}/g, '.')
    .replace(/,\s*,/g, ',')
    .trim();

  if (lang === 'en' && text.includes('. ') && !/[.!?]$/.test(text)) {
    text += '.';
  }

  return text;
}