import { VowelLessonData } from '@/types/alphabet';

export const VOWELS_DATA: VowelLessonData[] = [
  // 1. VOWEL A
  {
    vowel: 'A',
    lowercase: 'a',
    letterName: 'A (Letter name)',
    shortSoundLabel: 'Short Sound: /æ/ like Apple',
    shortSoundHindi: 'A की छोटी ध्वनि: "ऐ" (जैसे Apple, Cat, Bag)',
    shortSoundExamples: [
      { word: 'Apple', emoji: '🍎', hindi: 'सेब', cvc: 'a-p-p-l-e' },
      { word: 'Ant', emoji: '🐜', hindi: 'चींटी', cvc: 'a-n-t' },
      { word: 'Cat', emoji: '🐱', hindi: 'बिल्ली', cvc: 'c-a-t' },
      { word: 'Bag', emoji: '🎒', hindi: 'बस्ता', cvc: 'b-a-g' },
      { word: 'Map', emoji: '🗺️', hindi: 'नक्शा', cvc: 'm-a-p' },
    ],
    longSoundLabel: 'Long Sound: /eɪ/ like Cake',
    longSoundHindi: 'A की लंबी ध्वनि: "एई" (जैसे Cake, Name)',
    longSoundExamples: [
      { word: 'Cake', emoji: '🎂', hindi: 'केक' },
      { word: 'Name', emoji: '🏷️', hindi: 'नाम' },
      { word: 'Lake', emoji: '🏞️', hindi: 'झील' },
    ],
    hindiGuidance: 'अक्षर का नाम "ए" है, लेकिन शब्दों में इसकी छोटी ध्वनि "ऐ" होती है जैसे c-a-t = cat!',
    wordBuilding: [
      { letters: ['c', 'a', 't'], word: 'cat', emoji: '🐱', hindi: 'बिल्ली' },
      { letters: ['b', 'a', 'g'], word: 'bag', emoji: '🎒', hindi: 'बस्ता' },
      { letters: ['m', 'a', 'p'], word: 'map', emoji: '🗺️', hindi: 'नक्शा' },
    ],
    quiz: {
      prompt: 'Which short-A word has the /æ/ sound?',
      promptHindi: 'इनमें से कौन से शब्द में A की छोटी ध्वनि /æ/ है?',
      options: ['Cat', 'Bike', 'Cup'],
      correct: 'Cat',
      explanation: '"Cat" has the short A sound (/æ/)!',
      hindiExplanation: 'Cat में A की छोटी आवाज़ (ऐ) आती है!',
    },
  },

  // 2. VOWEL E
  {
    vowel: 'E',
    lowercase: 'e',
    letterName: 'E (Letter name)',
    shortSoundLabel: 'Short Sound: /e/ like Egg',
    shortSoundHindi: 'E की छोटी ध्वनि: "ए" (जैसे Egg, Bed, Pen)',
    shortSoundExamples: [
      { word: 'Egg', emoji: '🥚', hindi: 'अंडा', cvc: 'e-g-g' },
      { word: 'Elephant', emoji: '🐘', hindi: 'हाथी', cvc: 'e-l-e-p-h-a-n-t' },
      { word: 'Bed', emoji: '🛏️', hindi: 'बिस्तर', cvc: 'b-e-d' },
      { word: 'Pen', emoji: '🖊️', hindi: 'कलम', cvc: 'p-e-n' },
      { word: 'Red', emoji: '🔴', hindi: 'लाल', cvc: 'r-e-d' },
    ],
    longSoundLabel: 'Long Sound: /iː/ like These',
    longSoundHindi: 'E की लंबी ध्वनि: "ई" (जैसे These, Theme, Tree)',
    longSoundExamples: [
      { word: 'These', emoji: '👉', hindi: 'ये सब' },
      { word: 'Tree', emoji: '🌳', hindi: 'पेड़' },
      { word: 'Bee', emoji: '🐝', hindi: 'मधुमक्खी' },
    ],
    hindiGuidance: 'E की छोटी आवाज़ "ए" होती है (b-e-d = bed), और दो E मिलकर लंबी आवाज़ "ई" बनाते हैं (t-r-e-e = tree)!',
    wordBuilding: [
      { letters: ['b', 'e', 'd'], word: 'bed', emoji: '🛏️', hindi: 'बिस्तर' },
      { letters: ['p', 'e', 'n'], word: 'pen', emoji: '🖊️', hindi: 'कलम' },
      { letters: ['r', 'e', 'd'], word: 'red', emoji: '🔴', hindi: 'लाल' },
    ],
    quiz: {
      prompt: 'What short vowel sound is in "PEN"?',
      promptHindi: '"PEN" में कौन सा स्वर है?',
      options: ['Short E', 'Short A', 'Short U'],
      correct: 'Short E',
      explanation: 'Pen has the short E sound (/e/)!',
      hindiExplanation: 'Pen में E की छोटी ध्वनि (ए) आती है!',
    },
  },

  // 3. VOWEL I
  {
    vowel: 'I',
    lowercase: 'i',
    letterName: 'I (Letter name)',
    shortSoundLabel: 'Short Sound: /ɪ/ like Igloo',
    shortSoundHindi: 'I की छोटी ध्वनि: "इ" (जैसे Sit, Pin, Fish)',
    shortSoundExamples: [
      { word: 'Igloo', emoji: '🧊', hindi: 'बर्फ का घर', cvc: 'i-g-l-o-o' },
      { word: 'Insect', emoji: '🦗', hindi: 'कीड़ा', cvc: 'i-n-s-e-c-t' },
      { word: 'Sit', emoji: '🪑', hindi: 'बैठना', cvc: 's-i-t' },
      { word: 'Pin', emoji: '📌', hindi: 'पिन', cvc: 'p-i-n' },
      { word: 'Fish', emoji: '🐟', hindi: 'मछली', cvc: 'f-i-s-h' },
    ],
    longSoundLabel: 'Long Sound: /aɪ/ like Kite',
    longSoundHindi: 'I की लंबी ध्वनि: "आई" (जैसे Bike, Kite, Ice)',
    longSoundExamples: [
      { word: 'Bike', emoji: '🚲', hindi: 'साइकिल' },
      { word: 'Kite', emoji: '🪁', hindi: 'पतंग' },
      { word: 'Ice', emoji: '🧊', hindi: 'बर्फ' },
    ],
    hindiGuidance: 'I की छोटी ध्वनि जल्दी बोली जाती है "इ" (s-i-t = sit), और लंबी ध्वनि में "आई" बोलते हैं (k-i-t-e = kite)!',
    wordBuilding: [
      { letters: ['s', 'i', 't'], word: 'sit', emoji: '🪑', hindi: 'बैठना' },
      { letters: ['p', 'i', 'n'], word: 'pin', emoji: '📌', hindi: 'पिन' },
      { letters: ['f', 'i', 's', 'h'], word: 'fish', emoji: '🐟', hindi: 'मछली' },
    ],
    quiz: {
      prompt: 'Which word has the short /ɪ/ sound?',
      promptHindi: 'इनमें से कौन से शब्द में I की छोटी ध्वनि /ɪ/ है?',
      options: ['Sit', 'Kite', 'Cake'],
      correct: 'Sit',
      explanation: '"Sit" uses the short I sound!',
      hindiExplanation: 'Sit में I की छोटी आवाज़ (इ) आती है!',
    },
  },

  // 4. VOWEL O
  {
    vowel: 'O',
    lowercase: 'o',
    letterName: 'O (Letter name)',
    shortSoundLabel: 'Short Sound: /ɒ/ like Orange',
    shortSoundHindi: 'O की छोटी ध्वनि: "ऑ" (जैसे Hot, Dog, Pot)',
    shortSoundExamples: [
      { word: 'Orange', emoji: '🍊', hindi: 'संतरा', cvc: 'o-r-a-n-g-e' },
      { word: 'Octopus', emoji: '🐙', hindi: 'ऑक्टोपस', cvc: 'o-c-t-o-p-u-s' },
      { word: 'Hot', emoji: '🔥', hindi: 'गर्म', cvc: 'h-o-t' },
      { word: 'Dog', emoji: '🐶', hindi: 'कुत्ता', cvc: 'd-o-g' },
      { word: 'Pot', emoji: '🏺', hindi: 'बर्तन', cvc: 'p-o-t' },
    ],
    longSoundLabel: 'Long Sound: /oʊ/ like Home',
    longSoundHindi: 'O की लंबी ध्वनि: "ओ" (जैसे Home, Nose, Rose)',
    longSoundExamples: [
      { word: 'Home', emoji: '🏠', hindi: 'घर' },
      { word: 'Nose', emoji: '👃', hindi: 'नाक' },
      { word: 'Rose', emoji: '🌹', hindi: 'गुलाब' },
    ],
    hindiGuidance: 'मुंह को गोल करके "ऑ" की आवाज निकालें (h-o-t = hot, d-o-g = dog)!',
    wordBuilding: [
      { letters: ['h', 'o', 't'], word: 'hot', emoji: '🔥', hindi: 'गर्म' },
      { letters: ['d', 'o', 'g'], word: 'dog', emoji: '🐶', hindi: 'कुत्ता' },
      { letters: ['p', 'o', 't'], word: 'pot', emoji: '🏺', hindi: 'बर्तन' },
    ],
    quiz: {
      prompt: 'Complete the word: d - _ - g (A pet that barks)',
      promptHindi: 'शब्द पूरा करें: d - _ - g',
      options: ['o', 'e', 'u'],
      correct: 'o',
      explanation: 'd - o - g makes Dog!',
      hindiExplanation: 'd - o - g मिलकर Dog बनता है!',
    },
  },

  // 5. VOWEL U
  {
    vowel: 'U',
    lowercase: 'u',
    letterName: 'U (Letter name)',
    shortSoundLabel: 'Short Sound: /ʌ/ like Umbrella',
    shortSoundHindi: 'U की छोटी ध्वनि: "अ" (जैसे Sun, Cup, Bus)',
    shortSoundExamples: [
      { word: 'Umbrella', emoji: '☂️', hindi: 'छाता', cvc: 'u-m-b-r-e-l-l-a' },
      { word: 'Up', emoji: '⬆️', hindi: 'ऊपर', cvc: 'u-p' },
      { word: 'Sun', emoji: '☀️', hindi: 'सूरज', cvc: 's-u-n' },
      { word: 'Cup', emoji: '☕', hindi: 'प्याला', cvc: 'c-u-p' },
      { word: 'Bus', emoji: '🚌', hindi: 'बस', cvc: 'b-u-s' },
    ],
    longSoundLabel: 'Long Sound: /juː/ like Cute',
    longSoundHindi: 'U की लंबी ध्वनि: "यू" (जैसे Cube, Cute, Music)',
    longSoundExamples: [
      { word: 'Cube', emoji: '🧊', hindi: 'घन' },
      { word: 'Cute', emoji: '🥰', hindi: 'प्यारा' },
      { word: 'Music', emoji: '🎵', hindi: 'संगीत' },
    ],
    hindiGuidance: 'U की छोटी आवाज़ "अ" होती है (s-u-n = sun, c-u-p = cup), और लंबी आवाज़ "यू" होती है (c-u-t-e = cute)!',
    wordBuilding: [
      { letters: ['s', 'u', 'n'], word: 'sun', emoji: '☀️', hindi: 'सूरज' },
      { letters: ['c', 'u', 'p'], word: 'cup', emoji: '☕', hindi: 'प्याला' },
      { letters: ['b', 'u', 's'], word: 'bus', emoji: '🚌', hindi: 'बस' },
    ],
    quiz: {
      prompt: 'Which vowel completes s - _ - n (The shining star)?',
      promptHindi: 's - _ - n को पूरा करने वाला स्वर कौन सा है?',
      options: ['u', 'a', 'e'],
      correct: 'u',
      explanation: 's - u - n spells Sun!',
      hindiExplanation: 's - u - n मिलकर Sun बनता है!',
    },
  },
];
