import { HindiItem } from "./types";

interface ThreeLetterRaw {
  word: string;
  roman: string;
  meaning: string;
  emoji: string;
  tip: string;
}

const RAW_THREE_LETTER: ThreeLetterRaw[] = [
  { word: "कमल", roman: "Kamal", meaning: "Lotus Flower", emoji: "🪷", tip: "क + म + ल = कमल (राष्ट्रीय फूल)" },
  { word: "महल", roman: "Mahal", meaning: "Palace", emoji: "🏰", tip: "म + ह + ल = महल (सुंदर महल)" },
  { word: "गगन", roman: "Gagan", meaning: "Sky", emoji: "☁️", tip: "ग + ग + न = गगन (नीला आकाश)" },
  { word: "बटन", roman: "Batan", meaning: "Button", emoji: "🔘", tip: "ब + ट + न = बटन (शर्ट का बटन)" },
  { word: "कलम", roman: "Kalam", meaning: "Pen", emoji: "🖊️", tip: "क + ल + म = कलम (लिखने वाली)" },
  { word: "मटर", roman: "Matar", meaning: "Green Peas", emoji: "🫛", tip: "म + ट + र = मटर (मीठी मटर)" },
  { word: "सड़क", roman: "Sadak", meaning: "Road", emoji: "🛣️", tip: "स + ड़ + क = सड़क (चौड़ी सड़क)" },
  { word: "भवन", roman: "Bhavan", meaning: "Building", emoji: "🏢", tip: "भ + व + न = भवन" },
  { word: "शहद", roman: "Shahad", meaning: "Honey", emoji: "🍯", tip: "श + ह + द = शहद (मीठा शहद)" },
  { word: "मगर", roman: "Magar", meaning: "Crocodile", emoji: "🐊", tip: "म + ग + र = मगर (पानी का मगर)" },
  { word: "पवन", roman: "Pavan", meaning: "Wind / Air", emoji: "💨", tip: "प + व + न = पवन (शीतल पवन)" },
  { word: "नमन", roman: "Naman", meaning: "Salutation / Bow", emoji: "🙏", tip: "न + म + न = नमन (हाथ जोड़कर)" },
  { word: "चमन", roman: "Chaman", meaning: "Garden", emoji: "🌷", tip: "च + म + न = चमन (फूलों का चमन)" },
  { word: "चमक", roman: "Chamak", meaning: "Sparkle / Shine", emoji: "✨", tip: "च + म + क = चमक (तारे की चमक)" },
  { word: "दमक", roman: "Damak", meaning: "Glow / Radiance", emoji: "🌟", tip: "द + म + क = दमक (चेहरे की दमक)" },
  { word: "महक", roman: "Mahak", meaning: "Fragrance", emoji: "🌸", tip: "म + ह + क = महक (फूल की महक)" },
  { word: "चहक", roman: "Chahak", meaning: "Chirp / Joyful twitter", emoji: "🐦", tip: "च + ह + क = चहक (चिड़िया की चहक)" },
  { word: "लहर", roman: "Lahar", meaning: "Wave", emoji: "🌊", tip: "ल + ह + र = लहर (समुद्र की लहर)" },
  { word: "शहर", roman: "Shahar", meaning: "City", emoji: "🏙️", tip: "श + ह + र = शहर (बड़ा शहर)" },
  { word: "नहर", roman: "Nahar", meaning: "Canal", emoji: "🏞️", tip: "न + ह + र = नहर (पानी की नहर)" },
  { word: "पहर", roman: "Pahar", meaning: "Watch / Period of day", emoji: "⏳", tip: "प + ह + र = पहर (दोपहर)" },
  { word: "कहर", roman: "Kahar", meaning: "Fury / Havoc", emoji: "⚡", tip: "क + ह + र = कहर" },
  { word: "ठहर", roman: "Thahar", meaning: "Pause / Stay", emoji: "🛑", tip: "ठ + ह + र = ठहर (रुक जाओ)" },
  { word: "अमर", roman: "Amar", meaning: "Immortal", emoji: "💫", tip: "अ + म + र = अमर" },
  { word: "कमर", roman: "Kamar", meaning: "Waist", emoji: "🧍", tip: "क + म + र = कमर" },
  { word: "समर", roman: "Samar", meaning: "Battle / War", emoji: "🛡️", tip: "स + म + र = समर" },
  { word: "असर", roman: "Asar", meaning: "Effect / Impact", emoji: "🎯", tip: "अ + स + र = असर" },
  { word: "कसम", roman: "Kasam", meaning: "Promise / Oath", emoji: "🤝", tip: "क + स + म = कसम" },
  { word: "गरम", roman: "Garam", meaning: "Hot / Warm", emoji: "🔥", tip: "ग + र + म = गरम (गरम दूध)" },
  { word: "नरम", roman: "Naram", meaning: "Soft", emoji: "🧸", tip: "न + र + म = नरम (नरम तकिया)" },
  { word: "परम", roman: "Param", meaning: "Supreme", emoji: "👑", tip: "प + र + म = परम (परम सत्य)" },
  { word: "करम", roman: "Karam", meaning: "Deed / Action", emoji: "🤲", tip: "क + र + म = करम (नेक करम)" },
  { word: "सरस", roman: "Saras", meaning: "Juicy / Charming", emoji: "🍇", tip: "स + र + स = सरस" },
  { word: "चरण", roman: "Charan", meaning: "Feet", emoji: "🦶", tip: "च + र + ण = चरण (माता-पिता के चरण)" },
  { word: "शरण", roman: "Sharan", meaning: "Shelter / Refuge", emoji: "🏡", tip: "श + र + ण = शरण" },
  { word: "हरण", roman: "Haran", meaning: "Take away / Deer", emoji: "🦌", tip: "ह + र + ण = हरण" },
  { word: "मरण", roman: "Maran", meaning: "Death / Passing", emoji: "🍂", tip: "म + र + ण = मरण" },
  { word: "तरण", roman: "Taran", meaning: "Crossing / Raft", emoji: "⛵", tip: "त + र + ण = तरण" },
  { word: "भगत", roman: "Bhagat", meaning: "Devotee", emoji: "🧘", tip: "भ + ग + त = भगत (ईश्वर का भगत)" },
  { word: "जगत", roman: "Jagat", meaning: "World / Universe", emoji: "🌐", tip: "ज + ग + त = जगत (संसार)" },
  { word: "रजत", roman: "Rajat", meaning: "Silver", emoji: "🥈", tip: "र + ज + त = रजत (चाँदी)" },
  { word: "जनक", roman: "Janak", meaning: "Father / Originator", emoji: "🧔", tip: "ज + न + क = जनक (राजा जनक)" },
  { word: "कनक", roman: "Kanak", meaning: "Gold / Wheat", emoji: "🌾", tip: "क + न + क = कनक (सोना/गेहूं)" },
  { word: "भनक", roman: "Bhanak", meaning: "Inkling / Whisper", emoji: "👂", tip: "भ + न + क = भनक (खबर लगना)" },
  { word: "खनक", roman: "Khanak", meaning: "Jingle / Clink", emoji: "🔔", tip: "ख + न + क = खनक (चूड़ियों की खनक)" },
  { word: "पलक", roman: "Palak", meaning: "Eyelid", emoji: "👁️", tip: "प + ल + क = पलक (आँख की पलक)" },
  { word: "झलक", roman: "Jhalak", meaning: "Glimpse", emoji: "👀", tip: "झ + ल + क = झलक (एक झलक)" },
  { word: "कलश", roman: "Kalash", meaning: "Sacred Urn / Pitcher", emoji: "🏺", tip: "क + ल + श = कलश (पूजा का कलश)" },
  { word: "हवन", roman: "Havan", meaning: "Fire Ritual", emoji: "🔥", tip: "ह + व + न = हवन" },
  { word: "वजन", roman: "Vajan", meaning: "Weight", emoji: "⚖️", tip: "व + ज + न = वजन" },
  { word: "वतन", roman: "Vatan", meaning: "Homeland / Nation", emoji: "🇮🇳", tip: "व + त + न = वतन (हमारा प्यारा वतन)" },
  { word: "जतन", roman: "Jatan", meaning: "Careful Effort", emoji: "💪", tip: "ज + त + न = जतन (कोशिश करना)" },
  { word: "रतन", roman: "Ratan", meaning: "Precious Jewel", emoji: "💎", tip: "र + त + न = रतन (अनमोल रतन)" },
  { word: "नयन", roman: "Nayan", meaning: "Eyes", emoji: "👁️", tip: "न + य + न = नयन (सुंदर आँखें)" },
  { word: "चयन", roman: "Chayan", meaning: "Selection / Choice", emoji: "✅", tip: "च + य + न = चयन (सही चुनाव)" },
];

export const THREE_LETTER_ITEMS: HindiItem[] = RAW_THREE_LETTER.map((item, index) => {
  const order = 167 + index;
  const chars = Array.from(item.word);
  return {
    id: `three-${index + 1}`,
    category: "three-letter",
    devanagari: item.word,
    text: item.word,
    transliteration: item.roman,
    romanization: item.roman,
    exampleWord: item.word,
    meaning: item.meaning,
    englishMeaning: item.meaning,
    imagePath: `/images/hindi/three-letter/${item.word}.png`,
    expectedSpeech: item.word,
    audioPath: `/audio/hindi/three-letter/${item.word}.mp3`,
    difficulty: "intermediate",
    lessonOrder: order,
    emoji: item.emoji,
    soundTipHindi: item.tip,
    subCategory: "तीन अक्षर वाले अमात्रिक शब्द",
    level: 2,
    letters: chars,
    blendSteps: [chars[0], chars.slice(0, 2).join(""), item.word],
    similarGroup:
      ["कमल", "कलम"].includes(item.word)
        ? "कमल-कलम"
        : ["नगर", "मगर", "डगर"].includes(item.word)
        ? "नगर-मगर"
        : ["पवन", "भवन", "चमन", "नमन", "हवन"].includes(item.word)
        ? "पवन-भवन-चमन-नमन"
        : ["चमक", "दमक", "महक", "चहक", "पलक", "झलक"].includes(item.word)
        ? "चमक-दमक-महक"
        : ["लहर", "शहर", "नहर", "पहर", "कहर", "ठहर"].includes(item.word)
        ? "लहर-शहर-नहर"
        : ["गरम", "नरम", "परम", "करम"].includes(item.word)
        ? "गरम-नरम-परम"
        : ["चरण", "शरण", "हरण", "मरण", "तरण"].includes(item.word)
        ? "चरण-शरण-हरण"
        : "तीन-अक्षर-सामान्य",
  };
});

