import { HindiItem } from "./types";

interface TwoLetterRaw {
  word: string;
  roman: string;
  meaning: string;
  emoji: string;
  tip: string;
}

const RAW_TWO_LETTER: TwoLetterRaw[] = [
  { word: "जल", roman: "Jal", meaning: "Water", emoji: "💧", tip: "ज + ल = जल (पानी)" },
  { word: "फल", roman: "Phal", meaning: "Fruit", emoji: "🍎", tip: "फ + ल = फल (मीठे फल)" },
  { word: "नल", roman: "Nal", meaning: "Water Tap", emoji: "🚰", tip: "न + ल = नल (पानी का नल)" },
  { word: "घर", roman: "Ghar", meaning: "House / Home", emoji: "🏠", tip: "घ + र = घर (हमारा प्यारा घर)" },
  { word: "बस", roman: "Bas", meaning: "Bus", emoji: "🚌", tip: "ब + स = बस (स्कूल बस)" },
  { word: "रथ", roman: "Rath", meaning: "Chariot", emoji: "🛞", tip: "र + थ = रथ" },
  { word: "दस", roman: "Das", meaning: "Ten", emoji: "🔟", tip: "द + स = दस (गिनती का १०)" },
  { word: "जग", roman: "Jag", meaning: "Jug / World", emoji: "🥛", tip: "ज + ग = जग (पानी का जग)" },
  { word: "खत", roman: "Khat", meaning: "Letter", emoji: "✉️", tip: "ख + त = खत (चिट्ठी)" },
  { word: "मन", roman: "Man", meaning: "Mind / Heart", emoji: "🧠", tip: "म + न = मन" },
  { word: "धन", roman: "Dhan", meaning: "Wealth", emoji: "💰", tip: "ध + न = धन" },
  { word: "वन", roman: "Van", meaning: "Forest", emoji: "🌳", tip: "व + न = वन (जंगल)" },
  { word: "कप", roman: "Kap", meaning: "Cup", emoji: "☕", tip: "क + प = कप (चाय का कप)" },
  { word: "हल", roman: "Hal", meaning: "Plough / Solution", emoji: "🌾", tip: "ह + ल = हल (किसान का हल)" },
  { word: "सच", roman: "Sach", meaning: "Truth", emoji: "⭐", tip: "स + च = सच (सदा सच बोलो)" },
  { word: "डर", roman: "Dar", meaning: "Fear", emoji: "😨", tip: "ड + र = डर (डरना मना है)" },
  { word: "नर", roman: "Nar", meaning: "Man / Human", emoji: "👨", tip: "न + र = नर (मनुष्य)" },
  { word: "कल", roman: "Kal", meaning: "Tomorrow / Yesterday", emoji: "📅", tip: "क + ल = कल" },
  { word: "पल", roman: "Pal", meaning: "Moment", emoji: "⏱️", tip: "प + ल = पल (एक पल)" },
  { word: "तन", roman: "Tan", meaning: "Body", emoji: "🧘", tip: "त + न = तन (शरीर)" },
  { word: "मग", roman: "Mag", meaning: "Mug", emoji: "🍺", tip: "म + ग = मग" },
  { word: "गज", roman: "Gaj", meaning: "Elephant", emoji: "🐘", tip: "ग + ज = गज (हाथी)" },
  { word: "दल", roman: "Dal", meaning: "Group / Leaf", emoji: "👥", tip: "द + ल = दल" },
  { word: "बल", roman: "Bal", meaning: "Strength / Power", emoji: "💪", tip: "ब + ल = बल (ताकत)" },
  { word: "मत", roman: "Mat", meaning: "Do not / Opinion", emoji: "🚫", tip: "म + त = मत" },
  { word: "छत", roman: "Chhat", meaning: "Roof", emoji: "🏠", tip: "छ + त = छत" },
  { word: "खग", roman: "Khag", meaning: "Bird", emoji: "🐦", tip: "ख + ग = खग (पक्षी)" },
  { word: "नभ", roman: "Nabh", meaning: "Sky", emoji: "☁️", tip: "न + भ = नभ (आकाश)" },
  { word: "रस", roman: "Ras", meaning: "Juice / Essence", emoji: "🧃", tip: "र + स = रस (मीठा रस)" },
  { word: "पथ", roman: "Path", meaning: "Path / Road", emoji: "🛤️", tip: "प + थ = पथ (रास्ता)" },
  { word: "घट", roman: "Ghat", meaning: "Pitcher / Pot", emoji: "🏺", tip: "घ + ट = घट (मटका)" },
  { word: "नथ", roman: "Nath", meaning: "Nose Ring", emoji: "💍", tip: "न + थ = नथ" },
  { word: "पर", roman: "Par", meaning: "Feather / But", emoji: "🪶", tip: "प + र = पर (पंख)" },
  { word: "भर", roman: "Bhar", meaning: "Fill", emoji: "🪣", tip: "भ + र = भर (पानी भरो)" },
  { word: "चढ़", roman: "Chadh", meaning: "Climb", emoji: "🧗", tip: "च + ढ़ = चढ़ (ऊपर चढ़)" },
  { word: "पढ़", roman: "Padh", meaning: "Read / Study", emoji: "📖", tip: "प + ढ़ = पढ़ (किताब पढ़)" },
  { word: "जड़", roman: "Jad", meaning: "Root", emoji: "🌱", tip: "ज + ड़ = जड़ (पेड़ की जड़)" },
  { word: "धड़", roman: "Dhad", meaning: "Torso", emoji: "🧍", tip: "ध + ड़ = धड़" },
  { word: "थल", roman: "Thal", meaning: "Land / Ground", emoji: "🌍", tip: "थ + ल = थल (धरती)" },
  { word: "टब", roman: "Tab", meaning: "Tub", emoji: "🛁", tip: "ट + ब = टब (नहाने का टब)" },
  { word: "पत्र", roman: "Patra", meaning: "Letter / Leaf", emoji: "💌", tip: "प + त्र = पत्र" },
  { word: "यज्ञ", roman: "Yagya", meaning: "Sacred Fire Ritual", emoji: "🔥", tip: "य + ज्ञ = यज्ञ" },
  { word: "तप", roman: "Tap", meaning: "Penance", emoji: "🧘‍♂️", tip: "त + प = तप" },
  { word: "शम", roman: "Sham", meaning: "Calmness / Peace", emoji: "🕊️", tip: "श + म = शम (शांति)" },
  { word: "श्रम", roman: "Shram", meaning: "Hard Work / Labor", emoji: "⛏️", tip: "श्र + म = श्रम (मेहनत)" },
];

export const TWO_LETTER_ITEMS: HindiItem[] = RAW_TWO_LETTER.map((item, index) => {
  const order = 122 + index;
  const chars = Array.from(item.word);
  return {
    id: `two-${index + 1}`,
    category: "two-letter",
    devanagari: item.word,
    text: item.word,
    transliteration: item.roman,
    romanization: item.roman,
    exampleWord: item.word,
    meaning: item.meaning,
    englishMeaning: item.meaning,
    imagePath: `/images/hindi/two-letter/${item.word}.png`,
    expectedSpeech: item.word,
    audioPath: `/audio/hindi/two-letter/${item.word}.mp3`,
    difficulty: "beginner",
    lessonOrder: order,
    emoji: item.emoji,
    soundTipHindi: item.tip,
    subCategory: "दो अक्षर वाले अमात्रिक शब्द",
    level: 1,
    letters: chars,
    blendSteps: [chars[0], item.word],
    similarGroup:
      ["जल", "फल", "नल", "कल", "पल", "बल", "हल", "दल", "थल"].includes(item.word)
        ? "जल-फल-नल-पल"
        : ["घर", "पर", "भर", "नर", "डर"].includes(item.word)
        ? "घर-पर-भर-नर"
        : ["मन", "धन", "वन", "तन"].includes(item.word)
        ? "मन-धन-वन-तन"
        : ["दस", "बस", "रस"].includes(item.word)
        ? "दस-बस-रस"
        : "दो-अक्षर-सामान्य",
  };
});

