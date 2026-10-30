import { HindiItem } from "./types";

export interface FourLetterRaw {
  word: string;
  roman: string;
  meaning: string;
  emoji: string;
  tip: string;
  similarGroup: string;
}

const RAW_FOUR_LETTER: FourLetterRaw[] = [
  { word: "अजगर", roman: "Ajgar", meaning: "Python Snake", emoji: "🐍", tip: "अ + ज + ग + र = अजगर (अज-गर)", similarGroup: "अदरक-अजगर" },
  { word: "अदरक", roman: "Adrak", meaning: "Fresh Ginger", emoji: "🫚", tip: "अ + द + र + क = अदरक (अद-रक)", similarGroup: "अदरक-अजगर" },
  { word: "शलगम", roman: "Shalgam", meaning: "Turnip Vegetable", emoji: "🧅", tip: "श + ल + ग + म = शलगम (शल-गम)", similarGroup: "शलगम-शरबत" },
  { word: "शरबत", roman: "Sharbat", meaning: "Sweet Refreshing Drink", emoji: "🍹", tip: "श + र + ब + त = शरबत (शर-बत)", similarGroup: "शलगम-शरबत" },
  { word: "बरगद", roman: "Bargad", meaning: "Banyan Tree", emoji: "🌳", tip: "ब + र + ग + द = बरगद (बर-गद)", similarGroup: "बरगद-बर्तन-बचपन" },
  { word: "बर्तन", roman: "Bartan", meaning: "Kitchen Utensil", emoji: "🍽️", tip: "ब + र + त + न = बर्तन (बर-तन)", similarGroup: "बरगद-बर्तन-बचपन" },
  { word: "बचपन", roman: "Bachpan", meaning: "Childhood Days", emoji: "🧸", tip: "ब + च + प + न = बचपन (बच-पन)", similarGroup: "बरगद-बर्तन-बचपन" },
  { word: "खटमल", roman: "Khatmal", meaning: "Bedbug Insect", emoji: "🪲", tip: "ख + ट + म + ल = खटमल (खट-मल)", similarGroup: "खटमल-खटपट-झटपट" },
  { word: "खटपट", roman: "Khatpat", meaning: "Clattering Sound", emoji: "💥", tip: "ख + ट + प + ट = खटपट (खट-पट)", similarGroup: "खटमल-खटपट-झटपट" },
  { word: "झटपट", roman: "Jhatpat", meaning: "In a Jiffy / Quickly", emoji: "⚡", tip: "झ + ट + प + ट = झटपट (झट-पट)", similarGroup: "खटमल-खटपट-झटपट" },
  { word: "सरपट", roman: "Sarpat", meaning: "Galloping Fast", emoji: "🏇", tip: "स + र + प + ट = सरपट (सर-पट)", similarGroup: "खटमल-खटपट-झटपट" },
  { word: "नटखट", roman: "Natkhat", meaning: "Naughty / Mischievous", emoji: "👶", tip: "न + ट + ख + ट = नटखट (नट-खट)", similarGroup: "पनघट-नटखट" },
  { word: "पनघट", roman: "Panghat", meaning: "Village Water Well", emoji: "🚰", tip: "प + न + घ + ट = पनघट (पन-घट)", similarGroup: "पनघट-नटखट" },
  { word: "कसरत", roman: "Kasrat", meaning: "Physical Exercise", emoji: "🏋️", tip: "क + स + र + त = कसरत (कस-रत)", similarGroup: "कसरत-सर्कस" },
  { word: "सर्कस", roman: "Sarkas", meaning: "Circus Show", emoji: "🎪", tip: "स + र + क + स = सर्कस (सर-कस)", similarGroup: "कसरत-सर्कस" },
  { word: "थर्मस", roman: "Thermos", meaning: "Insulated Flask", emoji: "🍶", tip: "थ + र + म + स = थर्मस (थर-मस)", similarGroup: "कसरत-सर्कस" },
  { word: "अचकन", roman: "Achkan", meaning: "Long Traditional Coat", emoji: "🧥", tip: "अ + च + क + न = अचकन (अच-कन)", similarGroup: "अचकन-अनबन" },
  { word: "अनबन", roman: "Anban", meaning: "Minor Disagreement", emoji: "🤨", tip: "अ + न + ब + न = अनबन (अन-बन)", similarGroup: "अचकन-अनबन" },
  { word: "उपवन", roman: "Upvan", meaning: "Beautiful Garden", emoji: "🌺", tip: "उ + प + व + न = उपवन (उप-वन)", similarGroup: "उपवन-पलटन" },
  { word: "पलटन", roman: "Paltan", meaning: "Army Platoon", emoji: "🪖", tip: "प + ल + ट + न = पलटन (पल-टन)", similarGroup: "उपवन-पलटन" },
  { word: "मखमल", roman: "Makhmal", meaning: "Soft Velvet Cloth", emoji: "🧣", tip: "म + ख + म + ल = मखमल (मख-मल)", similarGroup: "मखमल-मलमल-दमकल" },
  { word: "मलमल", roman: "Malmal", meaning: "Fine Muslin Fabric", emoji: "🥻", tip: "म + ल + म + ल = मलमल (मल-मल)", similarGroup: "मखमल-मलमल-दमकल" },
  { word: "दमकल", roman: "Damkal", meaning: "Fire Brigade Engine", emoji: "🚒", tip: "द + म + क + ल = दमकल (दम-कल)", similarGroup: "मखमल-मलमल-दमकल" },
  { word: "कटहल", roman: "Kathal", meaning: "Large Jackfruit", emoji: "🍈", tip: "क + ट + ह + ल = कटहल (कट-हल)", similarGroup: "कटहल-हलधर" },
  { word: "हलधर", roman: "Haldhar", meaning: "Plough-holder Farmer", emoji: "🌾", tip: "ह + ल + ध + र = हलधर (हल-धर)", similarGroup: "कटहल-हलधर" },
  { word: "हलचल", roman: "Halchal", meaning: "Commotion & Activity", emoji: "🏃", tip: "ह + ल + च + ल = हलचल (हल-चल)", similarGroup: "हलचल-दलदल" },
  { word: "दलदल", roman: "Daldal", meaning: "Swamp / Quagmire", emoji: "🌾", tip: "द + ल + द + ल = दलदल (दल-दल)", similarGroup: "हलचल-दलदल" },
  { word: "टमटम", roman: "Tamtam", meaning: "Horse-drawn Carriage", emoji: "🐎", tip: "ट + म + ट + म = टमटम (टम-टम)", similarGroup: "चमचम-टमटम" },
  { word: "चमचम", roman: "Chamcham", meaning: "Sweet Juicy Mithai", emoji: "🍬", tip: "च + म + च + म = चमचम (चम-चम)", similarGroup: "चमचम-टमटम" },
  { word: "परवल", roman: "Parwal", meaning: "Pointed Gourd Vegetable", emoji: "🥒", tip: "प + र + व + ल = परवल (पर-वल)", similarGroup: "परवल-करवट" },
  { word: "करवट", roman: "Karwat", meaning: "Turn on Sleeping Side", emoji: "🛌", tip: "क + र + व + ट = करवट (कर-वट)", similarGroup: "परवल-करवट" },
  { word: "तरकश", roman: "Tarkash", meaning: "Quiver of Arrows", emoji: "🏹", tip: "त + र + क + श = तरकश (तर-कश)", similarGroup: "तरकश-जलचर" },
  { word: "गपशप", roman: "Gapshap", meaning: "Casual Friendly Chat", emoji: "💬", tip: "ग + प + श + प = गपशप (गप-शप)", similarGroup: "गपशप-भगदड़" },
  { word: "जलचर", roman: "Jalchar", meaning: "Water Creature / Fish", emoji: "🐟", tip: "ज + ल + च + र = जलचर (जल-चर)", similarGroup: "जलचर-नभचर-थलचर" },
  { word: "नभचर", roman: "Nabhchar", meaning: "Flying Bird / Sky creature", emoji: "🦅", tip: "न + भ + च + र = नभचर (नभ-चर)", similarGroup: "जलचर-नभचर-थलचर" },
  { word: "थलचर", roman: "Thalchar", meaning: "Land Dwelling Animal", emoji: "🐅", tip: "थ + ल + च + र = थलचर (थल-चर)", similarGroup: "जलचर-नभचर-थलचर" },
  { word: "भगदड़", roman: "Bhagdad", meaning: "Stampede / Rushing Crowd", emoji: "🏃‍♂️", tip: "भ + ग + द + ड़ = भगदड़ (भग-दड़)", similarGroup: "भगदड़-गड़बड़" },
  { word: "गड़बड़", roman: "Gadbad", meaning: "Muddle / Confusion", emoji: "🤔", tip: "ग + ड़ + ब + ड़ = गड़बड़ (गड़-बड़)", similarGroup: "भगदड़-गड़बड़" },
  { word: "पतझड़", roman: "Patjhad", meaning: "Autumn Season", emoji: "🍂", tip: "प + त + झ + ड़ = पतझड़ (पत-झड़)", similarGroup: "पतझड़-गड़बड़" },
  { word: "अफ़सर", roman: "Afsar", meaning: "Respected Officer", emoji: "👨‍💼", tip: "अ + फ़ + स + र = अफ़सर (अफ़-सर)", similarGroup: "अचकन-अफ़सर" },
];

export const FOUR_LETTER_ITEMS: HindiItem[] = RAW_FOUR_LETTER.map((item, index) => {
  // Lesson order continues after 3-letter words (167 to 223)
  const order = 224 + index;
  const chars = Array.from(item.word);

  return {
    id: `four-${index + 1}`,
    category: "four-letter",
    devanagari: item.word,
    text: item.word,
    transliteration: item.roman,
    romanization: item.roman,
    exampleWord: item.word,
    meaning: item.meaning,
    englishMeaning: item.meaning,
    imagePath: `/images/hindi/four-letter/${item.word}.png`,
    expectedSpeech: item.word,
    audioPath: `/audio/hindi/four-letter/${item.word}.mp3`,
    difficulty: "advanced",
    lessonOrder: order,
    emoji: item.emoji,
    soundTipHindi: item.tip,
    subCategory: "चार अक्षर वाले अमात्रिक शब्द",
    level: 3,
    letters: chars,
    blendSteps: [chars[0], chars.slice(0, 2).join(""), chars.slice(0, 3).join(""), item.word],
    similarGroup: item.similarGroup,
  };
});
