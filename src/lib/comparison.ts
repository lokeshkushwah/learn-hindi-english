/**
 * Hindi Speech Comparison and Normalization Utility
 * Designed for children's Hindi pronunciation & word recognition
 */

export type ToleranceMode = "strict" | "normal" | "relaxed";

export interface CompareOptions {
  tolerance?: ToleranceMode;
  transliteration?: string;
  category?: string;
  consonantRoot?: string;
  vowelName?: string;
  expectedSpeech?: string;
  alternatives?: string[];
}

export interface CompareResult {
  isMatch: boolean;
  target: string;
  recognized: string;
  normalizedTarget: string;
  normalizedRecognized: string;
  similarityPercent: number;
  feedbackKey: "correct" | "incorrect" | "empty" | "unclear";
  feedbackHindi: string;
  phonemeAssessmentReady: boolean;
  notes?: string;
}

/**
 * Normalizes Hindi Devanagari text:
 * - NFC Unicode normalization
 * - Strips punctuation (English and Devanagari purna viram । and ॥)
 * - Cleans zero-width characters (ZWJ, ZWNJ)
 * - Harmonizes common transcription variations (nuktas, anusvara/chandrabindu)
 * - Trims extra whitespace
 */
export function normalizeHindiText(input: string): string {
  if (!input) return "";

  let text = input.normalize("NFC").trim();

  // Remove zero-width characters and invisible format controls
  text = text.replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, "");

  // Remove English & Devanagari punctuation
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>।॥]/g, "");

  // Normalize chandrabindu (\u0901) to anusvara (\u0902) as STT often swaps them
  text = text.replace(/\u0901/g, "\u0902");

  // Nukta stripping for child recognition where child may pronounce standard consonant
  const nuktaMap: Record<string, string> = {
    "क़": "क",
    "ख़": "ख",
    "ग़": "ग",
    "ज़": "ज",
    "ड़": "ड",
    "ढ़": "ढ",
    "फ़": "फ",
  };
  for (const [nuktaChar, standardChar] of Object.entries(nuktaMap)) {
    text = text.replaceAll(nuktaChar, standardChar);
  }

  // Remove any remaining loose nukta (\u093C)
  text = text.replace(/\u093C/g, "");

  // Collapse multiple whitespaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/**
 * Standard Levenshtein distance
 */
export function levenshteinDistance(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));

  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  return matrix[bn][an];
}

/**
 * Percentage similarity
 */
export function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 100;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 100;
  const distance = levenshteinDistance(a, b);
  const similarity = Math.max(0, (1 - distance / maxLen) * 100);
  return Math.round(similarity);
}

/**
 * Common English/Roman phonetic transcription variants for Devanagari letters & syllables
 * Handles cases where Chrome STT outputs Latin text for Hindi sounds (e.g. "ki", "key" for "कि")
 */
const COMMON_ROMAN_VARIANTS: Record<string, string[]> = {
  // क series
  "क": ["k", "ka"],
  "का": ["ka", "kaa", "car"],
  "कि": ["ki", "key", "kee", "ke"],
  "की": ["ki", "key", "kee"],
  "कु": ["ku", "koo"],
  "कू": ["koo", "ku"],
  "कृ": ["kri", "kree"],
  "के": ["ke", "kay"],
  "कै": ["kai", "cai"],
  "को": ["ko", "co"],
  "कौ": ["kau", "cow", "kow"],
  "कं": ["kam", "kan"],
  "कः": ["kah", "kaha"],

  // ख series
  "ख": ["kh", "kha", "k"],
  "खा": ["kha", "khaa"],
  "खि": ["khi", "khee", "khey", "key", "ki"],
  "खी": ["khee", "khi", "key", "ki"],
  "खु": ["khu", "khoo", "hoo", "who", "hu"],
  "खू": ["khoo", "khu", "hoo", "who", "hu", "kho"],
  "खे": ["khe", "khey", "kay"],
  "खै": ["khai"],
  "खो": ["kho"],
  "खौ": ["khau"],
  "खं": ["kham", "khan"],
  "खः": ["khah"],

  // फ series
  "फ": ["ph", "pha", "f", "fa"],
  "फा": ["pha", "fa"],
  "फू": ["foo", "fu", "phoo", "phu", "hoo", "who"],
  "फु": ["fu", "foo", "phu", "hoo", "who"],

  // प series
  "प": ["p", "pa"],
  "पा": ["pa", "paa"],
  "पि": ["pi", "pee"],
  "पी": ["pee", "pi"],
  "पु": ["pu", "poo", "poopoo", "pupu"],
  "पू": ["poo", "pu", "poopoo", "pupu"],
  "पे": ["pe", "pay"],
  "पै": ["pai"],
  "पो": ["po"],
  "पौ": ["pau"],
  "पं": ["pam", "pan"],
  "पः": ["pah"],

  // म series
  "म": ["m", "ma"],
  "मा": ["ma", "maa"],
  "मि": ["mi", "mee"],
  "मी": ["mee", "mi"],
  "मु": ["mu", "moo"],
  "मू": ["moo", "mu"],
  "मे": ["me", "may"],
  "मै": ["mai"],
  "मो": ["mo"],
  "मौ": ["mau"],
  "मं": ["mam", "man"],

  // ब & भ series
  "ब": ["b", "ba"],
  "बा": ["ba", "baa"],
  "बु": ["bu", "boo"],
  "बू": ["boo", "bu"],
  "भ": ["bh", "bha"],
  "भा": ["bha", "bhaa"],
  "भु": ["bhu", "bhoo"],
  "भू": ["bhoo", "bhu"],

  // छू & झू series
  "छू": ["chhoo", "chhu", "choo", "chu", "shoo", "shu"],
  "झू": ["jhoo", "jhu", "joo", "ju"],
  "घू": ["ghoo", "ghu", "goo", "gu"],

  // ग series
  "ग": ["g", "ga"],
  "गा": ["ga", "gaa"],
  "गि": ["gi", "gee", "gey"],
  "गी": ["gee", "gi"],

  // त / ट contrast
  "त": ["t", "ta"],
  "ट": ["t", "ta", "taa"],

  // Vowels
  "अ": ["a", "uh"],
  "आ": ["aa", "a"],
  "इ": ["i", "ee"],
  "ई": ["ee", "i"],
  "उ": ["u", "oo"],
  "ऊ": ["oo", "u"],
  "ए": ["e", "ay"],
  "ऐ": ["ai"],
  "ओ": ["o"],
  "औ": ["au"],
  "अं": ["am", "an", "ang"],
  "अः": ["ah", "aha"],
};

/**
 * Acoustic & Glottal fricative substitutions made by Google Speech-to-Text
 * for isolated Hindi syllables (e.g. isolated "खू" spoken into mic is acoustically heard as "हू" / "हू हू...")
 */
const ACOUSTIC_SYLLABLE_SUBSTITUTIONS: Record<string, string[]> = {
  // ख series (frequently heard as ह due to glottal aspiration in isolated syllables)
  "ख": ["ह", "खा"],
  "खा": ["हा"],
  "खि": ["हि", "ही", "खी"],
  "खी": ["ही", "हि", "खि"],
  "खु": ["हु", "हू", "खू"],
  "खू": ["हू", "हु", "खु", "खून", "खूब"],
  "खे": ["हे", "खै"],
  "खै": ["है", "खे"],
  "खो": ["हो", "खौ"],
  "खौ": ["हौ", "खो"],

  // प series (repeated tokens & short/long swaps frequently produced by Chrome STT)
  "पु": ["पू", "पू पू", "पु पु", "पुल", "पूत", "पूरा"],
  "पू": ["पु", "पू पू", "पु पु", "पूल", "पूत", "पूरा"],
  "पा": ["पा पा", "पापा"],
  "पि": ["पी", "पी पी", "पि पि"],
  "पी": ["पि", "पी पी", "पि पि"],

  // म series
  "मु": ["मू", "मू मू", "मु मु", "मुख", "मुकुट"],
  "मू": ["मु", "मू मू", "मूल", "मूरत"],
  "मा": ["मा मा", "मम्मा", "मां", "माँ"],

  // ब series
  "बु": ["बू", "बू बू", "बु बु"],
  "बू": ["बु", "बू बू", "बु बु"],

  // फ series
  "फ": ["ह", "फा"],
  "फा": ["हा"],
  "फु": ["हु", "हू", "फू"],
  "फू": ["हू", "हु", "फु", "फूल"],

  // घ series
  "घ": ["ग", "ह"],
  "घा": ["गा", "हा"],
  "घु": ["गु", "हु", "घू"],
  "घू": ["गू", "हू", "घु"],

  // छ series
  "छ": ["श", "स", "छा"],
  "छू": ["शू", "सू", "छु"],

  // झ series
  "झ": ["ज"],
  "झू": ["जू", "झु", "झूला"],

  // स / श / ष interchange
  "श": ["स", "ष"],
  "ष": ["श", "स"],
  "स": ["श", "ष"],
};

/**
 * Evaluates whether a single candidate string matches the target word
 */
function evaluateSingleCandidate(
  targetClean: string,
  candidate: string,
  tolerance: ToleranceMode,
  options: CompareOptions
): { isMatch: boolean; similarity: number; note: string } {
  const recClean = normalizeHindiText(candidate);
  if (!recClean) {
    return { isMatch: false, similarity: 0, note: "खाली" };
  }

  // Deduplicate repeated identical syllables in spoken utterance
  // e.g. "हू हू हू हू हू हू हू" -> unique token "हू"
  // e.g. "क क क" -> unique token "क"
  const recWords = recClean.split(/\s+/).filter(Boolean);
  const uniqueRecWords = Array.from(new Set(recWords));
  const isAllSameToken = uniqueRecWords.length === 1 && recWords.length > 1;
  const singleToken = uniqueRecWords.length === 1 ? uniqueRecWords[0] : "";

  // 1. Exact match (or single repeated token matching target, or target word in words list)
  if (
    targetClean === recClean ||
    (singleToken && targetClean === singleToken) ||
    (targetClean.length <= 3 && recWords.includes(targetClean))
  ) {
    return { isMatch: true, similarity: 100, note: "हूबहू सही पहचान (Exact Match)" };
  }

  // 1b. Acoustic Substitution for isolated syllables (e.g. "खू" heard as "हू", "पु" heard as "पू पू")
  if (tolerance !== "strict") {
    const knownSubs = ACOUSTIC_SYLLABLE_SUBSTITUTIONS[targetClean];
    if (knownSubs) {
      if (
        knownSubs.includes(recClean) ||
        (singleToken && knownSubs.includes(singleToken)) ||
        recWords.some((w) => knownSubs.includes(w))
      ) {
        return {
          isMatch: true,
          similarity: 95,
          note: "अल्पप्राण/महाप्राण ध्वनि समानता स्वीकार",
        };
      }
    }
  }

  // 2. Multi-word phrase containing exact target
  const targetWords = targetClean.split(/\s+/).filter(Boolean);
  if (targetWords.length === 1 && recWords.includes(targetClean)) {
    return { isMatch: true, similarity: 100, note: "वाक्य में सही शब्द मिला" };
  }

  // 3. Roman / Transliteration Match (when STT outputs English text like "ki", "key", "pu", "poo")
  const recRoman = candidate.toLowerCase().replace(/[^a-z]/g, "");
  if (recRoman) {
    // Check against target's transliteration
    if (options.transliteration) {
      const targetTranslit = options.transliteration.toLowerCase().replace(/[^a-z]/g, "");
      if (recRoman === targetTranslit) {
        return { isMatch: true, similarity: 100, note: "रोमन उच्चारण सही पहचाना गया" };
      }
    }

    // Check against common phonetic variants for this Devanagari character
    const knownVariants = COMMON_ROMAN_VARIANTS[targetClean];
    if (knownVariants && knownVariants.includes(recRoman)) {
      return { isMatch: true, similarity: 100, note: "रोमन ध्वनि समानता स्वीकार" };
    }
  }

  // 4. Barakhadi Syllable Leniency:
  // In isolated single-syllable speech, Web Speech API cannot reliably differentiate short vs long vowel duration.
  // Short 'ि' vs Long 'ी': "कि" vs "की", "पि" vs "पी"
  // Short 'ु' vs Long 'ू': "कु" vs "कू", "पु" vs "पू"
  // 'े' vs 'ै': "के" vs "कै", "पे" vs "पै"
  // 'ो' vs 'ौ': "को" vs "कौ", "पो" vs "पौ"
  let vowelPairAlternate = "";
  if (tolerance !== "strict" && (options.category === "barakhadi" || targetClean.length <= 3)) {
    // Check vowel pair swap:
    if (targetClean.includes("ि")) {
      vowelPairAlternate = targetClean.replace(/ि/g, "ी");
    } else if (targetClean.includes("ी")) {
      vowelPairAlternate = targetClean.replace(/ी/g, "ि");
    } else if (targetClean.includes("ु")) {
      vowelPairAlternate = targetClean.replace(/ु/g, "ू");
    } else if (targetClean.includes("ू")) {
      vowelPairAlternate = targetClean.replace(/ू/g, "ु");
    } else if (targetClean.includes("े")) {
      vowelPairAlternate = targetClean.replace(/े/g, "ै");
    } else if (targetClean.includes("ै")) {
      vowelPairAlternate = targetClean.replace(/ै/g, "े");
    } else if (targetClean.includes("ो")) {
      vowelPairAlternate = targetClean.replace(/ो/g, "ौ");
    } else if (targetClean.includes("ौ")) {
      vowelPairAlternate = targetClean.replace(/ौ/g, "ो");
    }

    if (
      vowelPairAlternate &&
      (recClean === vowelPairAlternate ||
        (singleToken && singleToken === vowelPairAlternate) ||
        recWords.includes(vowelPairAlternate))
    ) {
      return {
        isMatch: true,
        similarity: 95,
        note: "बारहखड़ी स्वर ध्वनि स्वीकार (लघु/दीर्घ समानता)",
      };
    }
  }

  // 5. Example word prefix match for kids
  // e.g. child said "किताब" when practicing "कि", or "पुल" / "पूल" when practicing "पु"
  if (
    tolerance !== "strict" &&
    targetClean.length <= 2 &&
    recClean.length <= 6 &&
    (recClean.startsWith(targetClean) || (vowelPairAlternate && recClean.startsWith(vowelPairAlternate)))
  ) {
    return {
      isMatch: true,
      similarity: 90,
      note: "उदाहरण शब्द में अक्षर पहचाना गया",
    };
  }

  // 6. Levenshtein Distance & Similarity Calculation
  const distance = levenshteinDistance(targetClean, recClean);
  const similarity = calculateSimilarity(targetClean, recClean);
  const targetLength = targetClean.length;

  let isMatch = false;

  // Single letters (क, आ, त, ट): strict match required
  if (targetLength <= 2) {
    isMatch = false;
  } else if (targetLength === 3) {
    // 2-letter word without matra: e.g. "जल", "कम"
    if (tolerance === "relaxed" && distance === 1 && similarity >= 75) {
      isMatch = true;
    } else {
      isMatch = false;
    }
  } else {
    // Longer words (length >= 4): e.g. "कमल", "तितली"
    if (tolerance === "strict") {
      isMatch = distance === 0;
    } else if (tolerance === "normal") {
      isMatch = distance <= 1 && similarity >= 80;
    } else if (tolerance === "relaxed") {
      isMatch =
        (distance <= 1 && similarity >= 70) ||
        (targetLength >= 6 && distance <= 2 && similarity >= 70);
    }
  }

  return {
    isMatch,
    similarity,
    note: isMatch ? `समीप पहचान स्वीकार (${similarity}%)` : `भिन्न पहचान (${similarity}%)`,
  };
}

/**
 * Main sound and text comparison function.
 * Strictly verifies letters and syllables while supporting:
 * - Alternative candidate inspection
 * - Roman transliteration matching
 * - Child-friendly barakhadi short/long vowel duration equivalence
 * - Configurable tolerance for longer words
 */
export function compareHindiSpeech(
  targetWord: string,
  recognizedSpeech: string,
  toleranceOrOptions: ToleranceMode | CompareOptions = "normal"
): CompareResult {
  const options: CompareOptions =
    typeof toleranceOrOptions === "string"
      ? { tolerance: toleranceOrOptions }
      : toleranceOrOptions || { tolerance: "normal" };

  const tolerance = options.tolerance || "normal";
  const targetClean = normalizeHindiText(targetWord);
  const primaryClean = normalizeHindiText(recognizedSpeech);

  // Collect all candidate transcripts (primary + alternatives)
  const candidateList = [recognizedSpeech, ...(options.alternatives || [])]
    .map((s) => s?.trim())
    .filter(Boolean);

  if (candidateList.length === 0 || (!primaryClean && candidateList.length === 0)) {
    return {
      isMatch: false,
      target: targetWord,
      recognized: recognizedSpeech,
      normalizedTarget: targetClean,
      normalizedRecognized: primaryClean,
      similarityPercent: 0,
      feedbackKey: "unclear",
      feedbackHindi: "मुझे आवाज़ साफ़ नहीं सुनाई दी। धीरे से फिर बोलो।",
      phonemeAssessmentReady: true,
      notes: "खाली या अस्पष्ट आवाज़",
    };
  }

  // Evaluate all candidates — if ANY candidate matches, accept the match!
  let bestResult = {
    isMatch: false,
    similarity: 0,
    note: "भिन्न पहचान",
    matchingCandidate: recognizedSpeech,
  };

  for (const cand of candidateList) {
    const evalRes = evaluateSingleCandidate(targetClean, cand, tolerance, options);
    if (evalRes.isMatch) {
      bestResult = {
        isMatch: true,
        similarity: evalRes.similarity,
        note: evalRes.note,
        matchingCandidate: cand,
      };
      break;
    } else if (evalRes.similarity > bestResult.similarity) {
      bestResult = {
        isMatch: false,
        similarity: evalRes.similarity,
        note: evalRes.note,
        matchingCandidate: cand,
      };
    }
  }

  if (bestResult.isMatch) {
    return {
      isMatch: true,
      target: targetWord,
      recognized: bestResult.matchingCandidate || recognizedSpeech,
      normalizedTarget: targetClean,
      normalizedRecognized: normalizeHindiText(bestResult.matchingCandidate || recognizedSpeech),
      similarityPercent: bestResult.similarity,
      feedbackKey: "correct",
      feedbackHindi: "शाबाश! तुमने सही बोला!",
      phonemeAssessmentReady: true,
      notes: bestResult.note,
    };
  }

  return {
    isMatch: false,
    target: targetWord,
    recognized: recognizedSpeech,
    normalizedTarget: targetClean,
    normalizedRecognized: primaryClean,
    similarityPercent: bestResult.similarity,
    feedbackKey: "incorrect",
    feedbackHindi: "बहुत अच्छे! एक बार और कोशिश करो।",
    phonemeAssessmentReady: true,
    notes: bestResult.note,
  };
}

/**
 * Phoneme Feedback interface
 */
export interface PhonemeFeedback {
  phoneme: string;
  accuracyScore: number;
  isError: boolean;
  suggestedMouthMovement?: string;
}

export interface AdvancedPronunciationResult {
  overallScore: number;
  fluencyScore?: number;
  clarityScore?: number;
  phonemes: PhonemeFeedback[];
  acousticFeatures?: {
    pitchStability: number;
    durationMatch: number;
  };
}

export async function assessPronunciationPhonemes(
  _audioBlob: Blob,
  _targetWord: string
): Promise<AdvancedPronunciationResult | null> {
  return null;
}
