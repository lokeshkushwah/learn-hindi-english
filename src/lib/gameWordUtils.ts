/**
 * Utility functions for kid-friendly interactive word games
 */

export interface BlankChallenge {
  displayWord: string; // e.g. "A _ P L E"
  hiddenLetter: string; // e.g. "P"
  hiddenIndex: number;
  options: string[]; // e.g. ["P", "B", "T"]
  fullWord: string;
}

export interface WordBuilderChallenge {
  fullWord: string;
  targetLetters: string[];
  tiles: { id: string; letter: string }[];
}

const COMMON_DISTRACTORS = ['B', 'P', 'T', 'D', 'M', 'S', 'N', 'R', 'K', 'L'];

/**
 * Dynamically generates a fill-in-the-blank challenge from any English word.
 * Guarantees that the hidden letter is from the actual word, and options include
 * the correct letter plus distinct distractors.
 */
export function generateBlankChallenge(rawWord: string): BlankChallenge {
  const clean = rawWord.toUpperCase().replace(/[^A-Z]/g, '');
  const word = clean.length > 0 ? clean : 'CAT';

  // Choose a sensible letter index to hide (prefer middle, avoid first letter if length > 2)
  let hideIdx = 1;
  if (word.length <= 2) {
    hideIdx = word.length - 1;
  } else {
    hideIdx = Math.floor(word.length / 2);
  }

  const hiddenLetter = word[hideIdx];
  const displayChars = word.split('').map((char, i) => (i === hideIdx ? '_' : char));
  const displayWord = displayChars.join(' ');

  // Generate 2 unique distractors not equal to the hidden letter
  const shuffledDistractors = [...COMMON_DISTRACTORS]
    .filter((d) => d !== hiddenLetter)
    .sort(() => Math.random() - 0.5);
  const pickedDistractors = shuffledDistractors.slice(0, 2);

  // Combine and shuffle options
  const options = [hiddenLetter, ...pickedDistractors].sort(() => Math.random() - 0.5);

  return {
    displayWord,
    hiddenLetter,
    hiddenIndex: hideIdx,
    options,
    fullWord: word,
  };
}

/**
 * Generates shuffled word-builder tiles with distractors.
 */
export function generateWordBuilderChallenge(rawWord: string): WordBuilderChallenge {
  const clean = rawWord.toUpperCase().replace(/[^A-Z]/g, '');
  const word = clean.length > 0 ? clean : 'CAT';
  const targetLetters = word.split('');

  // Pick 2 distractors that are not excessively duplicate
  const availableDistractors = COMMON_DISTRACTORS.filter((d) => !targetLetters.includes(d));
  const distractor1 = availableDistractors[0] || 'B';
  const distractor2 = availableDistractors[1] || 'P';

  const allLetters = [...targetLetters, distractor1, distractor2];

  // Shuffle with unique IDs
  const tiles = allLetters
    .map((letter, idx) => ({ id: `${letter}-${idx}-${Math.random()}`, letter }))
    .sort(() => Math.random() - 0.5);

  return {
    fullWord: word,
    targetLetters,
    tiles,
  };
}
