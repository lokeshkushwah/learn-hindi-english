import { HindiItem } from "./types";

export interface MatraDefinition {
  sign: string;
  name: string;
  description: string;
  codepoint: string;
  tip: string;
  emoji: string;
}

export const MATRA_DEFINITIONS: MatraDefinition[] = [
  { sign: "ा", name: "आ की मात्रा (ा)", description: "दाहिने एक खड़ी डंडी", codepoint: "\\u093E", tip: "मुँह पूरा खोलकर लंबी 'आ' आवाज़", emoji: "🎋" },
  { sign: "ि", name: "छोटी इ की मात्रा (ि)", description: "बाएँ से ऊपर मुड़ती डंडी", codepoint: "\\u093F", tip: "हल्की और तुरंत बोली जाने वाली 'इ'", emoji: "⚡" },
  { sign: "ी", name: "बड़ी ई की मात्रा (ी)", description: "दाएँ से ऊपर मुड़ती डंडी", codepoint: "\\u0940", tip: "मुस्कुराते हुए लंबी 'ई' आवाज़", emoji: "🗝️" },
  { sign: "ु", name: "छोटे उ की मात्रा (ु)", description: "नीचे बाईं ओर मुड़ता घुमाव", codepoint: "\\u0941", tip: "होंठ गोल करके तुरंत बोलो 'उ'", emoji: "🐥" },
  { sign: "ू", name: "बड़े ऊ की मात्रा (ू)", description: "नीचे दाईं ओर लटकती पूंछ", codepoint: "\\u0942", tip: "होंठ गोल करके लंबी 'ऊ' आवाज़", emoji: "🕊️" },
  { sign: "ृ", name: "ऋ की मात्रा (ृ)", description: "अक्षर के नीचे छोटा 'c' घुमाव", codepoint: "\\u0943", tip: "जीभ तालू के पास ले जाकर 'रि'", emoji: "🧘" },
  { sign: "े", name: "ए की मात्रा (े)", description: "शिरोरेखा के ऊपर एक तिरछी मात्रा", codepoint: "\\u0947", tip: "मुँह आधा खोलकर 'ए'", emoji: "🍌" },
  { sign: "ै", name: "ऐ की मात्रा (ै)", description: "शिरोरेखा के ऊपर दो तिरछी मात्राएँ", codepoint: "\\u0948", tip: "मुँह थोड़ा चौड़ा करके 'ऐ'", emoji: "📷" },
  { sign: "ो", name: "ओ की मात्रा (ो)", description: "एक खड़ी डंडी और ऊपर एक मात्रा", codepoint: "\\u094B", tip: "होंठ पूरी तरह गोल करके 'ओ'", emoji: "🐦" },
  { sign: "ौ", name: "औ की मात्रा (ौ)", description: "एक खड़ी डंडी और ऊपर दो मात्राएँ", codepoint: "\\u094C", tip: "होंठ गोल रखते हुए बड़ा मुँह खोलकर 'औ'", emoji: "🦅" },
  { sign: "ं", name: "अनुस्वार (ं)", description: "शिरोरेखा के ऊपर एक बिंदी", codepoint: "\\u0902", tip: "नाक से हल्की नासिक्य गूंज", emoji: "🪷" },
  { sign: "ँ", name: "चंद्रबिंदु (ँ)", description: "शिरोरेखा के ऊपर आधा चाँद और बिंदी", codepoint: "\\u0901", tip: "मुँह और नाक दोनों से कोमल गूंज", emoji: "🌙" },
  { sign: "ः", name: "विसर्ग (ः)", description: "अक्षर के आगे दो खड़ी बिंदियाँ", codepoint: "\\u0903", tip: "हल्की 'ह' की सांस छोड़ते हुए", emoji: "✨" },
  { sign: "्", name: "हलन्त / संयुक्ताक्षर (्)", description: "अक्षर के नीचे तिरछी लकीर (आधा अक्षर)", codepoint: "\\u094D", tip: "बिना स्वर के आधा अक्षर जोड़कर बोलो", emoji: "🔗" },
];

interface MatraWordRaw {
  word: string;
  roman: string;
  meaning: string;
  emoji: string;
  matraSign: string;
  matraName: string;
  tip: string;
}

const RAW_MATRA_WORDS: MatraWordRaw[] = [
  // 1. आ की मात्रा (ा) - 12 words (including राम, राजा, माला)
  { word: "राम", roman: "Raam", meaning: "Lord Rama / Name", emoji: "🏹", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "र पर 'ा' की मात्रा: राम" },
  { word: "राजा", roman: "Raaja", meaning: "King", emoji: "👑", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "र और ज दोनों पर 'ा': राजा" },
  { word: "माला", roman: "Maala", meaning: "Garland / Necklace", emoji: "📿", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "म और ल दोनों पर 'ा': माला" },
  { word: "ताला", roman: "Taala", meaning: "Lock", emoji: "🔒", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "त और ल दोनों पर 'ा': ताला" },
  { word: "कान", roman: "Kaan", meaning: "Ear", emoji: "👂", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "क पर 'ा' की मात्रा: कान" },
  { word: "नाक", roman: "Naak", meaning: "Nose", emoji: "👃", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "न पर 'ा' की मात्रा: नाक" },
  { word: "हाथ", roman: "Haath", meaning: "Hand", emoji: "✋", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "ह पर 'ा' की मात्रा: हाथ" },
  { word: "रात", roman: "Raat", meaning: "Night", emoji: "🌙", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "र पर 'ा' की मात्रा: रात" },
  { word: "बात", roman: "Baat", meaning: "Talk / Matter", emoji: "💬", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "ब पर 'ा' की मात्रा: बात" },
  { word: "बाजा", roman: "Baaja", meaning: "Musical Instrument", emoji: "🎺", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "ब और ज दोनों पर 'ा': बाजा" },
  { word: "छाता", roman: "Chhaata", meaning: "Umbrella", emoji: "☂️", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "छ और त दोनों पर 'ा': छाता" },
  { word: "गाजर", roman: "Gaajar", meaning: "Carrot", emoji: "🥕", matraSign: "ा", matraName: "आ की मात्रा (ा)", tip: "ग पर 'ा' की मात्रा: गाजर" },

  // 2. छोटी इ की मात्रा (ि) - 12 words (including दिन, किताब, किसान)
  { word: "दिन", roman: "Din", meaning: "Day", emoji: "☀️", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "द पर 'ि' की मात्रा: दिन" },
  { word: "किताब", roman: "Kitaab", meaning: "Book", emoji: "📖", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "क पर 'ि', त पर 'ा': किताब" },
  { word: "किसान", roman: "Kisaan", meaning: "Farmer", emoji: "🌾", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "क पर 'ि', स पर 'ा': किसान" },
  { word: "सिर", roman: "Sir", meaning: "Head", emoji: "🧒", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "स पर 'ि' की मात्रा: सिर" },
  { word: "कवि", roman: "Kavi", meaning: "Poet", emoji: "✍️", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "व पर 'ि' की मात्रा: कवि" },
  { word: "रवि", roman: "Ravi", meaning: "Sun", emoji: "🌞", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "व पर 'ि' की मात्रा: रवि" },
  { word: "हिरण", roman: "Hiran", meaning: "Deer", emoji: "🦌", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "ह पर 'ि' की मात्रा: हिरण" },
  { word: "डाकिया", roman: "Daakiya", meaning: "Postman", emoji: "📮", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "क पर 'ि', य पर 'ा': डाकिया" },
  { word: "चिड़िया", roman: "Chidiya", meaning: "Bird / Sparrow", emoji: "🐦", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "च और ड़ दोनों पर 'ि': चिड़िया" },
  { word: "पहिया", roman: "Pahiya", meaning: "Wheel", emoji: "🛞", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "ह पर 'ि', य पर 'ा': पहिया" },
  { word: "धनिया", roman: "Dhaniya", meaning: "Coriander", emoji: "🌿", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "न पर 'ि', य पर 'ा': धनिया" },
  { word: "टिकट", roman: "Tikat", meaning: "Ticket", emoji: "🎟️", matraSign: "ि", matraName: "छोटी इ की मात्रा (ि)", tip: "ट पर 'ि' की मात्रा: टिकट" },

  // 3. बड़ी ई की मात्रा (ी) - 12 words (including दीपक, खीर, नीला)
  { word: "दीपक", roman: "Deepak", meaning: "Earthen Lamp", emoji: "🪔", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "द पर 'ी' की लंबी मात्रा: दीपक" },
  { word: "खीर", roman: "Kheer", meaning: "Rice Pudding", emoji: "🥣", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "ख पर 'ी' की लंबी मात्रा: खीर" },
  { word: "नीला", roman: "Neela", meaning: "Blue Color", emoji: "💙", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "न पर 'ी', ल पर 'ा': नीला" },
  { word: "पानी", roman: "Paani", meaning: "Water", emoji: "💧", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "प पर 'ा', न पर 'ी': पानी" },
  { word: "चाबी", roman: "Chaabi", meaning: "Key", emoji: "🗝️", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "च पर 'ा', ब पर 'ी': चाबी" },
  { word: "नदी", roman: "Nadi", meaning: "River", emoji: "🏞️", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "द पर 'ी' की मात्रा: नदी" },
  { word: "तितली", roman: "Titli", meaning: "Butterfly", emoji: "🦋", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "त पर 'ि', ल पर 'ी': तितली" },
  { word: "हाथी", roman: "Haathi", meaning: "Elephant", emoji: "🐘", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "ह पर 'ा', थ पर 'ी': हाथी" },
  { word: "रानी", roman: "Raani", meaning: "Queen", emoji: "👸", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "र पर 'ा', न पर 'ी': रानी" },
  { word: "दादी", roman: "Daadi", meaning: "Paternal Grandmother", emoji: "👵", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "द पर 'ा', द पर 'ी': दादी" },
  { word: "मछली", roman: "Machhli", meaning: "Fish", emoji: "🐟", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "ल पर 'ी' की मात्रा: मछली" },
  { word: "सीटी", roman: "Seeti", meaning: "Whistle", emoji: "🎺", matraSign: "ी", matraName: "बड़ी ई की मात्रा (ी)", tip: "स और ट दोनों पर 'ी': सीटी" },

  // 4. छोटे उ की मात्रा (ु) - 12 words (including पुल, गुलाब, मुकुट)
  { word: "पुल", roman: "Pul", meaning: "Bridge", emoji: "🌉", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "प पर 'ु' की मात्रा: पुल" },
  { word: "गुलाब", roman: "Gulaab", meaning: "Rose Flower", emoji: "🌹", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "ग पर 'ु', ल पर 'ा': गुलाब" },
  { word: "मुकुट", roman: "Mukut", meaning: "Crown", emoji: "👑", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "म और क दोनों पर 'ु': मुकुट" },
  { word: "धनुष", roman: "Dhanush", meaning: "Bow", emoji: "🏹", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "न पर 'ु' की मात्रा: धनुष" },
  { word: "साबुन", roman: "Saabun", meaning: "Soap", emoji: "🧼", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "ब पर 'ु' की मात्रा: साबुन" },
  { word: "गुड़िया", roman: "Gudiya", meaning: "Doll", emoji: "🪆", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "ग पर 'ु', ड़ पर 'ि', य पर 'ा': गुड़िया" },
  { word: "बुलबुल", roman: "Bulbul", meaning: "Nightingale Bird", emoji: "🐦", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "ब पर 'ु' की मात्रा: बुलबुल" },
  { word: "धुन", roman: "Dhun", meaning: "Tune / Melody", emoji: "🎵", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "ध पर 'ु' की मात्रा: धुन" },
  { word: "सुख", roman: "Sukh", meaning: "Happiness", emoji: "😊", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "स पर 'ु' की मात्रा: सुख" },
  { word: "मुख", roman: "Mukh", meaning: "Face", emoji: "😃", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "म पर 'ु' की मात्रा: मुख" },
  { word: "चुन", roman: "Chun", meaning: "Choose / Select", emoji: "👉", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "च पर 'ु' की मात्रा: चुन" },
  { word: "कुर्ता", roman: "Kurta", meaning: "Kurta / Shirt", emoji: "👔", matraSign: "ु", matraName: "छोटे उ की मात्रा (ु)", tip: "क पर 'ु', त पर 'ा': कुर्ता" },

  // 5. बड़े ऊ की मात्रा (ू) - 12 words (including फूल, झूला, सूरज)
  { word: "फूल", roman: "Phool", meaning: "Flower", emoji: "🌺", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "फ पर 'ू' की लंबी मात्रा: फूल" },
  { word: "झूला", roman: "Jhoola", meaning: "Swing", emoji: "🎪", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "झ पर 'ू', ल पर 'ा': झूला" },
  { word: "सूरज", roman: "Sooraj", meaning: "Sun", emoji: "🌞", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "स पर 'ू' की लंबी मात्रा: सूरज" },
  { word: "दूध", roman: "Doodh", meaning: "Milk", emoji: "🥛", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "द पर 'ू' की लंबी मात्रा: दूध" },
  { word: "चूहा", roman: "Chooha", meaning: "Mouse", emoji: "🐭", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "च पर 'ू', ह पर 'ा': चूहा" },
  { word: "भालू", roman: "Bhaloo", meaning: "Bear", emoji: "🐻", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "भ पर 'ा', ल पर 'ू': भालू" },
  { word: "तराजू", roman: "Taraazoo", meaning: "Balance Scale", emoji: "⚖️", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "ज पर 'ू' की मात्रा: तराजू" },
  { word: "कबूतर", roman: "Kabootar", meaning: "Pigeon", emoji: "🕊️", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "ब पर 'ू' की मात्रा: कबूतर" },
  { word: "धूप", roman: "Dhoop", meaning: "Sunlight", emoji: "☀️", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "ध पर 'ू' की मात्रा: धूप" },
  { word: "तरबूज", roman: "Tarbooj", meaning: "Watermelon", emoji: "🍉", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "ब पर 'ू' की मात्रा: तरबूज" },
  { word: "आलू", roman: "Aaloo", meaning: "Potato", emoji: "🥔", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "ल पर 'ू' की मात्रा: आलू" },
  { word: "मूली", roman: "Moolee", meaning: "Radish", emoji: "🥕", matraSign: "ू", matraName: "बड़े ऊ की मात्रा (ू)", tip: "म पर 'ू', ल पर 'ी': मूली" },

  // 6. ऋ की मात्रा (ृ) - 10 words
  { word: "गृह", roman: "Grih", meaning: "Home / House", emoji: "🏡", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "ग पर 'ृ' की मात्रा: गृह" },
  { word: "मृग", roman: "Mrig", meaning: "Deer", emoji: "🦌", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "म पर 'ृ' की मात्रा: मृग" },
  { word: "वृक्ष", roman: "Vriksh", meaning: "Tree", emoji: "🌳", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "व पर 'ृ' की मात्रा: वृक्ष" },
  { word: "कृपा", roman: "Kripa", meaning: "Grace / Kindness", emoji: "🙏", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "क पर 'ृ', प पर 'ा': कृपा" },
  { word: "नृप", roman: "Nrip", meaning: "King / Monarch", emoji: "👑", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "न पर 'ृ' की मात्रा: नृप (राजा)" },
  { word: "कृषक", roman: "Krishak", meaning: "Farmer", emoji: "👨‍🌾", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "क पर 'ृ' की मात्रा: कृषक" },
  { word: "घृत", roman: "Ghrit", meaning: "Ghee / Clarified Butter", emoji: "🧈", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "घ पर 'ृ' की मात्रा: घृत (घी)" },
  { word: "अमृत", roman: "Amrit", meaning: "Nectar / Elixir", emoji: "🍯", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "म पर 'ृ' की मात्रा: अमृत" },
  { word: "हृदय", roman: "Hriday", meaning: "Heart", emoji: "❤️", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "ह पर 'ृ' की मात्रा: हृदय" },
  { word: "तृण", roman: "Trin", meaning: "Blade of Grass", emoji: "🌱", matraSign: "ृ", matraName: "ऋ की मात्रा (ृ)", tip: "त पर 'ृ' की मात्रा: तृण" },

  // 7. ए की मात्रा (े) - 12 words (including केला, सेब, मेज)
  { word: "केला", roman: "Kela", meaning: "Banana", emoji: "🍌", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "क पर 'े', ल पर 'ा': केला" },
  { word: "सेब", roman: "Seb", meaning: "Apple", emoji: "🍎", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "स पर 'े' की मात्रा: सेब" },
  { word: "मेज", roman: "Mej", meaning: "Table", emoji: "🪑", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "म पर 'े' की मात्रा: मेज" },
  { word: "शेर", roman: "Sher", meaning: "Lion", emoji: "🦁", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "श पर 'े' की मात्रा: शेर" },
  { word: "पेड़", roman: "Ped", meaning: "Tree", emoji: "🌴", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "प पर 'े' की मात्रा: पेड़" },
  { word: "रेल", roman: "Rel", meaning: "Train", emoji: "🚆", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "र पर 'े' की मात्रा: रेल" },
  { word: "खेल", roman: "Khel", meaning: "Game / Play", emoji: "⚽", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "ख पर 'े' की मात्रा: खेल" },
  { word: "सवेरा", roman: "Savera", meaning: "Morning / Dawn", emoji: "🌅", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "व पर 'े', र पर 'ा': सवेरा" },
  { word: "जलेबी", roman: "Jalebee", meaning: "Jalebi Sweet", emoji: "🥨", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "ल पर 'े', ब पर 'ी': जलेबी" },
  { word: "बेलन", roman: "Belan", meaning: "Rolling Pin", emoji: "🥖", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "ब पर 'े' की मात्रा: बेलन" },
  { word: "करेला", roman: "Karela", meaning: "Bitter Gourd", emoji: "🥒", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "र पर 'े', ल पर 'ा': करेला" },
  { word: "चमेली", roman: "Chamelee", meaning: "Jasmine Flower", emoji: "🌼", matraSign: "े", matraName: "ए की मात्रा (े)", tip: "म पर 'े', ल पर 'ी': चमेली" },

  // 8. ऐ की मात्रा (ै) - 12 words (including मैना, पैसा, बैल)
  { word: "मैना", roman: "Maina", meaning: "Myna Bird", emoji: "🐦", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "म पर 'ै', न पर 'ा': मैना" },
  { word: "पैसा", roman: "Paisa", meaning: "Money / Coin", emoji: "🪙", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "प पर 'ै', स पर 'ा': पैसा" },
  { word: "बैल", roman: "Bail", meaning: "Bull / Ox", emoji: "🐂", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "ब पर 'ै' की मात्रा: बैल" },
  { word: "पैर", roman: "Pair", meaning: "Foot", emoji: "🦶", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "प पर 'ै' की मात्रा: पैर" },
  { word: "सैर", roman: "Sair", meaning: "Stroll / Walk", emoji: "🚶", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "स पर 'ै' की मात्रा: सैर" },
  { word: "थैला", roman: "Thaila", meaning: "Bag", emoji: "👜", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "थ पर 'ै', ल पर 'ा': थैला" },
  { word: "कैमरा", roman: "Camera", meaning: "Camera", emoji: "📷", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "क पर 'ै', र पर 'ा': कैमरा" },
  { word: "सैनिक", roman: "Sainik", meaning: "Soldier", emoji: "🪖", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "स पर 'ै', न पर 'ि': सैनिक" },
  { word: "मैदान", roman: "Maidaan", meaning: "Playground / Field", emoji: "🏟️", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "म पर 'ै', द पर 'ा': मैदान" },
  { word: "भैया", roman: "Bhaiya", meaning: "Elder Brother", emoji: "👦", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "भ पर 'ै', य पर 'ा': भैया" },
  { word: "नैया", roman: "Naiya", meaning: "Small Boat", emoji: "⛵", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "न पर 'ै', य पर 'ा': नैया" },
  { word: "तैरना", roman: "Tairna", meaning: "To Swim", emoji: "🏊", matraSign: "ै", matraName: "ऐ की मात्रा (ै)", tip: "त पर 'ै', न पर 'ा': तैरना" },

  // 9. ओ की मात्रा (ो) - 12 words (including मोर, तोता, टोपी)
  { word: "मोर", roman: "Mor", meaning: "Peacock", emoji: "🦚", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "म पर 'ो' की मात्रा: मोर" },
  { word: "तोता", roman: "Tota", meaning: "Parrot", emoji: "🦜", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "त पर 'ो', त पर 'ा': तोता" },
  { word: "टोपी", roman: "Topi", meaning: "Cap / Hat", emoji: "🧢", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "ट पर 'ो', प पर 'ी': टोपी" },
  { word: "कोट", roman: "Kot", meaning: "Coat", emoji: "🧥", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "क पर 'ो' की मात्रा: कोट" },
  { word: "ढोल", roman: "Dhol", meaning: "Drum", emoji: "🥁", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "ढ पर 'ो' की मात्रा: ढोल" },
  { word: "बोतल", roman: "Botal", meaning: "Bottle", emoji: "🍾", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "ब पर 'ो' की मात्रा: बोतल" },
  { word: "कोयल", roman: "Koyal", meaning: "Cuckoo Bird", emoji: "🐦", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "क पर 'ो' की मात्रा: कोयल" },
  { word: "समोसा", roman: "Samosa", meaning: "Samosa Snack", emoji: "🥟", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "म पर 'ो', स पर 'ा': समोसा" },
  { word: "चोर", roman: "Chor", meaning: "Thief", emoji: "🕵️", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "च पर 'ो' की मात्रा: चोर" },
  { word: "नोट", roman: "Not", meaning: "Currency Note", emoji: "💵", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "न पर 'ो' की मात्रा: नोट" },
  { word: "जोकर", roman: "Joker", meaning: "Joker / Clown", emoji: "🤡", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "ज पर 'ो' की मात्रा: जोकर" },
  { word: "धोबी", roman: "Dhobi", meaning: "Washerman", emoji: "🧺", matraSign: "ो", matraName: "ओ की मात्रा (ो)", tip: "ध पर 'ो', ब पर 'ी': धोबी" },

  // 10. औ की मात्रा (ौ) - 12 words (including कौआ, नौका, पौधा)
  { word: "कौआ", roman: "Kaua", meaning: "Crow", emoji: "🦅", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "क पर 'ौ' की मात्रा: कौआ" },
  { word: "नौका", roman: "Nauka", meaning: "Boat", emoji: "⛵", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "न पर 'ौ', क पर 'ा': नौका" },
  { word: "पौधा", roman: "Paudha", meaning: "Plant", emoji: "🪴", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "प पर 'ौ', ध पर 'ा': पौधा" },
  { word: "खिलौना", roman: "Khilauna", meaning: "Toy", emoji: "🧸", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "ल पर 'ौ', न पर 'ा': खिलौना" },
  { word: "तौलिया", roman: "Tauliya", meaning: "Towel", emoji: "🧖", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "त पर 'ौ', ल पर 'ि', य पर 'ा': तौलिया" },
  { word: "मौसम", roman: "Mausam", meaning: "Weather", emoji: "⛅", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "म पर 'ौ' की मात्रा: मौसम" },
  { word: "चौकी", roman: "Chauki", meaning: "Low Stool", emoji: "🪑", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "च पर 'ौ', क पर 'ी': चौकी" },
  { word: "हथौड़ा", roman: "Hathauda", meaning: "Hammer", emoji: "🔨", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "थ पर 'ौ', ड़ पर 'ा': हथौड़ा" },
  { word: "पकौड़ा", roman: "Pakauda", meaning: "Pakora Fritter", emoji: "🧆", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "क पर 'ौ', ड़ पर 'ा': पकौड़ा" },
  { word: "नौकर", roman: "Naukar", meaning: "Helper / Servant", emoji: "🧑‍💼", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "न पर 'ौ' की मात्रा: नौकर" },
  { word: "चौराहा", roman: "Chauraha", meaning: "Crossroads", emoji: "🚦", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "च पर 'ौ', र पर 'ा', ह पर 'ा': चौराहा" },
  { word: "दौलत", roman: "Daulat", meaning: "Wealth / Treasure", emoji: "💎", matraSign: "ौ", matraName: "औ की मात्रा (ौ)", tip: "द पर 'ौ' की मात्रा: दौलत" },

  // 11. अनुस्वार (ं) - 12 words (including अंगूर, बंदर, संतरा)
  { word: "अंगूर", roman: "Angoor", meaning: "Grapes", emoji: "🍇", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "अ पर बिंदी 'ं': अंगूर" },
  { word: "बंदर", roman: "Bandar", meaning: "Monkey", emoji: "🐒", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "ब पर बिंदी 'ं': बंदर" },
  { word: "संतरा", roman: "Santara", meaning: "Orange Fruit", emoji: "🍊", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "स पर बिंदी 'ं': संतरा" },
  { word: "पंख", roman: "Pankh", meaning: "Wing / Feather", emoji: "🪶", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "प पर बिंदी 'ं': पंख" },
  { word: "शंख", roman: "Shankh", meaning: "Conch Shell", emoji: "🐚", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "श पर बिंदी 'ं': शंख" },
  { word: "रंग", roman: "Rang", meaning: "Color", emoji: "🎨", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "र पर बिंदी 'ं': रंग" },
  { word: "पतंग", roman: "Patang", meaning: "Kite", emoji: "🪁", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "त पर बिंदी 'ं': पतंग" },
  { word: "कंगन", roman: "Kangan", meaning: "Bangle", emoji: "💍", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "क पर बिंदी 'ं': कंगन" },
  { word: "चंदन", roman: "Chandan", meaning: "Sandalwood", emoji: "🪵", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "च पर बिंदी 'ं': चंदन" },
  { word: "घंटा", roman: "Ghanta", meaning: "Bell / Hour", emoji: "🔔", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "घ पर बिंदी 'ं', ट पर 'ा': घंटा" },
  { word: "अंडा", roman: "Anda", meaning: "Egg", emoji: "🥚", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "अ पर बिंदी 'ं', ड पर 'ा': अंडा" },
  { word: "तिरंगा", roman: "Tiranga", meaning: "Tricolor Flag", emoji: "🇮🇳", matraSign: "ं", matraName: "अनुस्वार (ं)", tip: "र पर बिंदी 'ं', ग पर 'ा': तिरंगा" },

  // 12. चंद्रबिंदु (ँ) - 12 words (including माँ, चाँद, हँसी)
  { word: "माँ", roman: "Maa", meaning: "Mother", emoji: "👩", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "म पर 'ा' और चंद्रबिंदु 'ँ': माँ" },
  { word: "चाँद", roman: "Chaand", meaning: "Moon", emoji: "🌙", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "च पर 'ा' और चंद्रबिंदु 'ँ': चाँद" },
  { word: "हँसी", roman: "Hansee", meaning: "Laughter / Smile", emoji: "😄", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "ह पर चंद्रबिंदु 'ँ', स पर 'ी': हँसी" },
  { word: "आँख", roman: "Aankh", meaning: "Eye", emoji: "👁️", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "आ पर चंद्रबिंदु 'ँ': आँख" },
  { word: "ऊँट", roman: "Oont", meaning: "Camel", emoji: "🐪", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "ऊ पर चंद्रबिंदु 'ँ': ऊँट" },
  { word: "दाँत", roman: "Daant", meaning: "Tooth / Teeth", emoji: "🦷", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "द पर 'ा' और चंद्रबिंदु 'ँ': दाँत" },
  { word: "गाँव", roman: "Gaanv", meaning: "Village", emoji: "🏡", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "ग पर 'ा' और चंद्रबिंदु 'ँ': गाँव" },
  { word: "बाँसुरी", roman: "Baansuri", meaning: "Flute", emoji: "🪈", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "ब पर 'ा' और चंद्रबिंदु 'ँ': बाँसुरी" },
  { word: "तितलियाँ", roman: "Titliyaan", meaning: "Butterflies", emoji: "🦋", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "य पर 'ा' और चंद्रबिंदु 'ँ': तितलियाँ" },
  { word: "चिड़ियाँ", roman: "Chidiyaan", meaning: "Birds", emoji: "🐦", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "य पर 'ा' और चंद्रबिंदु 'ँ': चिड़ियाँ" },
  { word: "बूँद", roman: "Boond", meaning: "Water Drop", emoji: "💧", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "ब पर 'ू' और चंद्रबिंदु 'ँ': बूँद" },
  { word: "झाँझर", roman: "Jhaanjhar", meaning: "Anklet", emoji: "📿", matraSign: "ँ", matraName: "चंद्रबिंदु (ँ)", tip: "झ पर 'ा' और चंद्रबिंदु 'ँ': झाँझर" },

  // 13. विसर्ग (ः) - 9 words
  { word: "प्रातः", roman: "Praatah", meaning: "Early Morning / Dawn", emoji: "🌅", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "त के आगे विसर्ग 'ः': प्रातः" },
  { word: "नमः", roman: "Namah", meaning: "Salutation / Bow", emoji: "🙏", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "म के आगे विसर्ग 'ः': नमः" },
  { word: "पुनः", roman: "Punah", meaning: "Again", emoji: "🔁", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "न के आगे विसर्ग 'ः': पुनः" },
  { word: "फलतः", roman: "Phalatah", meaning: "Consequently", emoji: "🎯", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "त के आगे विसर्ग 'ः': फलतः" },
  { word: "अतः", roman: "Atah", meaning: "Therefore", emoji: "👉", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "त के आगे विसर्ग 'ः': अतः" },
  { word: "स्वतः", roman: "Svatah", meaning: "Automatically / By self", emoji: "⚙️", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "त के आगे विसर्ग 'ः': स्वतः" },
  { word: "प्रायः", roman: "Praayah", meaning: "Often / Usually", emoji: "⏱️", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "य के आगे विसर्ग 'ः': प्रायः" },
  { word: "क्रमशः", roman: "Kramashah", meaning: "Gradually / Step by step", emoji: "🪜", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "श के आगे विसर्ग 'ः': क्रमशः" },
  { word: "दुःख", roman: "Duhkh", meaning: "Sorrow / Sadness", emoji: "😔", matraSign: "ः", matraName: "विसर्ग (ः)", tip: "द पर 'ु' और विसर्ग 'ः': दुःख" },

  // 14. हलन्त / संयुक्ताक्षर (्) - 12 words (including शब्द, भक्त, शक्ति)
  { word: "शब्द", roman: "Shabd", meaning: "Word", emoji: "💬", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा ब और द: शब्द" },
  { word: "भक्त", roman: "Bhakt", meaning: "Devotee", emoji: "🙏", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा क और त: भक्त" },
  { word: "शक्ति", roman: "Shakti", meaning: "Power / Strength", emoji: "⚡", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा क और त पर 'ि': शक्ति" },
  { word: "पुस्तक", roman: "Pustak", meaning: "Book", emoji: "📖", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा स और त: पुस्तक" },
  { word: "बच्चा", roman: "Bachcha", meaning: "Child", emoji: "👶", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा च और पूरा च पर 'ा': बच्चा" },
  { word: "पत्ता", roman: "Patta", meaning: "Leaf", emoji: "🍃", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा त और पूरा त पर 'ा': पत्ता" },
  { word: "चम्मच", roman: "Chammach", meaning: "Spoon", emoji: "🥄", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा म और पूरा म: चम्मच" },
  { word: "मक्खी", roman: "Makkhi", meaning: "Housefly", emoji: "🪰", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा क और ख पर 'ी': मक्खी" },
  { word: "दोस्त", roman: "Dost", meaning: "Friend", emoji: "🤝", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा स और त: दोस्त" },
  { word: "गुब्बारा", roman: "Gubbara", meaning: "Balloon", emoji: "🎈", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा ब और ब पर 'ा': गुब्बारा" },
  { word: "प्यार", roman: "Pyaar", meaning: "Love / Affection", emoji: "💖", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा प और य पर 'ा': प्यार" },
  { word: "ध्यान", roman: "Dhyaan", meaning: "Attention / Focus", emoji: "🧘", matraSign: "्", matraName: "हलन्त / संयुक्ताक्षर (्)", tip: "आधा ध और य पर 'ा': ध्यान" },
];

let matraOrderCounter = 500;

export const MATRA_WORD_ITEMS: HindiItem[] = RAW_MATRA_WORDS.map((item, index) => {
  const order = matraOrderCounter++;
  return {
    id: `mat-${index + 1}`,
    category: "matra-words",
    devanagari: item.word,
    text: item.word,
    transliteration: item.roman,
    romanization: item.roman,
    exampleWord: item.word,
    meaning: item.meaning,
    englishMeaning: item.meaning,
    imagePath: `/images/hindi/matra/${item.word}.png`,
    expectedSpeech: item.word,
    audioPath: `/audio/hindi/matra/${item.word}.mp3`,
    difficulty: "intermediate",
    lessonOrder: order,
    emoji: item.emoji,
    soundTipHindi: item.tip,
    subCategory: item.matraName,
    matraSign: item.matraSign,
    matraName: item.matraName,
  };
});

/**
 * Filter matra words by their specific matra sign
 */
export function getWordsByMatraSign(sign: string): HindiItem[] {
  return MATRA_WORD_ITEMS.filter((item) => item.matraSign === sign);
}
