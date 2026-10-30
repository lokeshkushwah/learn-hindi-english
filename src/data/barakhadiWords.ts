import { HindiItem } from "./types";

export interface BarakhadiWordRaw {
  consonant: string;
  word: string;
  roman: string;
  meaning: string;
  emoji: string;
  vowelSign: string;
  vowelName: string;
}

export const RAW_BARAKHADI_WORDS: BarakhadiWordRaw[] = [
  // 1. क की बारहखड़ी
  { consonant: "क", word: "कमल", roman: "Kamal", meaning: "Lotus Flower", emoji: "🪷", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "क", word: "कार", roman: "Kaar", meaning: "Car", emoji: "🚗", vowelSign: "ा", vowelName: "आ" },
  { consonant: "क", word: "कान", roman: "Kaan", meaning: "Ear", emoji: "👂", vowelSign: "ा", vowelName: "आ" },
  { consonant: "क", word: "किताब", roman: "Kitaab", meaning: "Book", emoji: "📖", vowelSign: "ि", vowelName: "इ" },
  { consonant: "क", word: "कील", roman: "Keel", meaning: "Nail", emoji: "🔩", vowelSign: "ी", vowelName: "ई" },
  { consonant: "क", word: "कुर्ता", roman: "Kurta", meaning: "Shirt / Kurta", emoji: "👔", vowelSign: "ु", vowelName: "उ" },
  { consonant: "क", word: "कूद", roman: "Kood", meaning: "Jump", emoji: "🦘", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "क", word: "कृपा", roman: "Kripa", meaning: "Kindness / Grace", emoji: "🙏", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "क", word: "केला", roman: "Kela", meaning: "Banana", emoji: "🍌", vowelSign: "े", vowelName: "ए" },
  { consonant: "क", word: "कैमरा", roman: "Camera", meaning: "Camera", emoji: "📷", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "क", word: "कोयल", roman: "Koyal", meaning: "Cuckoo Bird", emoji: "🐦", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "क", word: "कौआ", roman: "Kaua", meaning: "Crow", emoji: "🦅", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "क", word: "कंगन", roman: "Kangan", meaning: "Bangle", emoji: "📿", vowelSign: "ं", vowelName: "अं" },

  // 2. ख की बारहखड़ी
  { consonant: "ख", word: "खत", roman: "Khat", meaning: "Letter", emoji: "✉️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ख", word: "खाना", roman: "Khaana", meaning: "Food", emoji: "🍲", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ख", word: "खिलौना", roman: "Khilauna", meaning: "Toy", emoji: "🧸", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ख", word: "खीर", roman: "Kheer", meaning: "Rice Pudding", emoji: "🥣", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ख", word: "खुशबू", roman: "Khushboo", meaning: "Fragrance", emoji: "🌸", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ख", word: "खून", roman: "Khoon", meaning: "Blood", emoji: "🩸", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ख", word: "खेल", roman: "Khel", meaning: "Game / Play", emoji: "⚽", vowelSign: "े", vowelName: "ए" },
  { consonant: "ख", word: "खोज", roman: "Khoj", meaning: "Search / Discovery", emoji: "🔍", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ख", word: "खौफ", roman: "Khauf", meaning: "Fear", emoji: "😨", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "ख", word: "खंभा", roman: "Khambha", meaning: "Pillar", emoji: "🏛️", vowelSign: "ं", vowelName: "अं" },

  // 3. ग की बारहखड़ी
  { consonant: "ग", word: "गगन", roman: "Gagan", meaning: "Sky", emoji: "☁️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ग", word: "गमला", roman: "Gamla", meaning: "Flowerpot", emoji: "🪴", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ग", word: "गाजर", roman: "Gaajar", meaning: "Carrot", emoji: "🥕", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ग", word: "गिलास", roman: "Gilaas", meaning: "Drinking Glass", emoji: "🥛", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ग", word: "गीत", roman: "Geet", meaning: "Song", emoji: "🎵", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ग", word: "गुलाब", roman: "Gulaab", meaning: "Rose", emoji: "🌹", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ग", word: "गूगल", roman: "Google", meaning: "Google Search", emoji: "🌐", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ग", word: "गृह", roman: "Grih", meaning: "Home", emoji: "🏡", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "ग", word: "गेंद", roman: "Gend", meaning: "Ball", emoji: "⚽", vowelSign: "े", vowelName: "ए" },
  { consonant: "ग", word: "गैस", roman: "Gas", meaning: "Gas", emoji: "🎈", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "ग", word: "गोभी", roman: "Gobhi", meaning: "Cauliflower", emoji: "🥦", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ग", word: "गौतम", roman: "Gautam", meaning: "Lord Buddha / Gautam", emoji: "🧘", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "ग", word: "गंगा", roman: "Ganga", meaning: "River Ganga", emoji: "🌊", vowelSign: "ं", vowelName: "अं" },

  // 4. घ की बारहखड़ी
  { consonant: "घ", word: "घर", roman: "Ghar", meaning: "House", emoji: "🏠", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "घ", word: "घास", roman: "Ghaas", meaning: "Grass", emoji: "🌿", vowelSign: "ा", vowelName: "आ" },
  { consonant: "घ", word: "घी", roman: "Ghee", meaning: "Clarified Butter", emoji: "🧈", vowelSign: "ी", vowelName: "ई" },
  { consonant: "घ", word: "घुटना", roman: "Ghutna", meaning: "Knee", emoji: "🦵", vowelSign: "ु", vowelName: "उ" },
  { consonant: "घ", word: "घूमना", roman: "Ghoomna", meaning: "Roam / Spin", emoji: "🎡", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "घ", word: "घृत", roman: "Ghrit", meaning: "Ghee / Clarified Butter", emoji: "🍯", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "घ", word: "घेवर", roman: "Ghevar", meaning: "Ghevar Sweet", emoji: "🥮", vowelSign: "े", vowelName: "ए" },
  { consonant: "घ", word: "घोड़ा", roman: "Ghodaa", meaning: "Horse", emoji: "🐎", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "घ", word: "घोंसला", roman: "Ghonsla", meaning: "Bird Nest", emoji: "🪺", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "घ", word: "घंटी", roman: "Ghanti", meaning: "Bell", emoji: "🔔", vowelSign: "ं", vowelName: "अं" },

  // 5. च की बारहखड़ी
  { consonant: "च", word: "चम्मच", roman: "Chammach", meaning: "Spoon", emoji: "🥄", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "च", word: "चाबी", roman: "Chaabi", meaning: "Key", emoji: "🗝️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "च", word: "चित्र", roman: "Chitra", meaning: "Picture", emoji: "🖼️", vowelSign: "ि", vowelName: "इ" },
  { consonant: "च", word: "चील", roman: "Cheel", meaning: "Eagle", emoji: "🦅", vowelSign: "ी", vowelName: "ई" },
  { consonant: "च", word: "चींटी", roman: "Cheenti", meaning: "Ant", emoji: "🐜", vowelSign: "ी", vowelName: "ई" },
  { consonant: "च", word: "चुंबक", roman: "Chumbak", meaning: "Magnet", emoji: "🧲", vowelSign: "ु", vowelName: "उ" },
  { consonant: "च", word: "चूहा", roman: "Chooha", meaning: "Mouse", emoji: "🐭", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "च", word: "चेहरा", roman: "Chehra", meaning: "Face", emoji: "😊", vowelSign: "े", vowelName: "ए" },
  { consonant: "च", word: "चैन", roman: "Chain", meaning: "Peace / Chain", emoji: "⛓️", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "च", word: "चोर", roman: "Chor", meaning: "Thief", emoji: "🕵️", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "च", word: "चौकी", roman: "Chauki", meaning: "Low Stool", emoji: "🪑", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "च", word: "चंदन", roman: "Chandan", meaning: "Sandalwood", emoji: "🪵", vowelSign: "ं", vowelName: "अं" },

  // 6. छ की बारहखड़ी
  { consonant: "छ", word: "छत", roman: "Chhat", meaning: "Roof", emoji: "🏠", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "छ", word: "छाता", roman: "Chhaata", meaning: "Umbrella", emoji: "☂️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "छ", word: "छिपा", roman: "Chhipa", meaning: "Hidden", emoji: "🙈", vowelSign: "ि", vowelName: "इ" },
  { consonant: "छ", word: "छींक", roman: "Chheenk", meaning: "Sneeze", emoji: "🤧", vowelSign: "ी", vowelName: "ई" },
  { consonant: "छ", word: "छुरी", roman: "Chhuri", meaning: "Small Knife", emoji: "🔪", vowelSign: "ु", vowelName: "उ" },
  { consonant: "छ", word: "छूट", roman: "Chhoot", meaning: "Discount", emoji: "🏷️", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "छ", word: "छेद", roman: "Chhed", meaning: "Hole", emoji: "🕳️", vowelSign: "े", vowelName: "ए" },
  { consonant: "छ", word: "छोटा", roman: "Chhota", meaning: "Small", emoji: "🤏", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "छ", word: "छंद", roman: "Chhand", meaning: "Rhyme / Verse", emoji: "📜", vowelSign: "ं", vowelName: "अं" },

  // 7. ज की बारहखड़ी
  { consonant: "ज", word: "जल", roman: "Jal", meaning: "Water", emoji: "💧", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ज", word: "जाल", roman: "Jaal", meaning: "Net", emoji: "🕸️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ज", word: "जिराफ़", roman: "Giraffe", meaning: "Giraffe", emoji: "🦒", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ज", word: "जीत", roman: "Jeet", meaning: "Victory", emoji: "🏆", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ज", word: "जीभ", roman: "Jeebh", meaning: "Tongue", emoji: "👅", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ज", word: "जुराब", roman: "Juraab", meaning: "Socks", emoji: "🧦", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ज", word: "जूता", roman: "Joota", meaning: "Shoe", emoji: "👞", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ज", word: "जेब", roman: "Jeb", meaning: "Pocket", emoji: "👖", vowelSign: "े", vowelName: "ए" },
  { consonant: "ज", word: "जैसा", roman: "Jaisa", meaning: "Like / As", emoji: "⚖️", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "ज", word: "जोकर", roman: "Joker", meaning: "Clown", emoji: "🤡", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ज", word: "जौहरी", roman: "Jauhari", meaning: "Jeweler", emoji: "💎", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "ज", word: "जंगल", roman: "Jangal", meaning: "Forest", emoji: "🌲", vowelSign: "ं", vowelName: "अं" },

  // 8. झ की बारहखड़ी
  { consonant: "झ", word: "झंडा", roman: "Jhanda", meaning: "Flag", emoji: "🇮🇳", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "झ", word: "झाड़ू", roman: "Jhaadoo", meaning: "Broom", emoji: "🧹", vowelSign: "ा", vowelName: "आ" },
  { consonant: "झ", word: "झील", roman: "Jheel", meaning: "Lake", emoji: "🏞️", vowelSign: "ी", vowelName: "ई" },
  { consonant: "झ", word: "झुमका", roman: "Jhumka", meaning: "Earring", emoji: "👂", vowelSign: "ु", vowelName: "उ" },
  { consonant: "झ", word: "झूला", roman: "Jhoola", meaning: "Swing", emoji: "🎪", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "झ", word: "झोला", roman: "Jhola", meaning: "Bag", emoji: "🎒", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "झ", word: "झोपड़ी", roman: "Jhopdi", meaning: "Hut", emoji: "🛖", vowelSign: "ो", vowelName: "ओ" },

  // 9. ट की बारहखड़ी
  { consonant: "ट", word: "टब", roman: "Tab", meaning: "Tub", emoji: "🛁", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ट", word: "टमाटर", roman: "Tamatar", meaning: "Tomato", emoji: "🍅", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ट", word: "टापू", roman: "Taapoo", meaning: "Island", emoji: "🏝️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ट", word: "टिकट", roman: "Tikat", meaning: "Ticket", emoji: "🎟️", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ट", word: "टीला", roman: "Teela", meaning: "Mound / Hill", emoji: "⛰️", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ट", word: "टुकड़ा", roman: "Tukda", meaning: "Piece", emoji: "🧩", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ट", word: "टूथपेस्ट", roman: "Toothpaste", meaning: "Toothpaste", emoji: "🪥", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ट", word: "टेबल", roman: "Table", meaning: "Table", emoji: "🪑", vowelSign: "े", vowelName: "ए" },
  { consonant: "ट", word: "टोपी", roman: "Topi", meaning: "Cap", emoji: "🧢", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ट", word: "टोकरी", roman: "Tokri", meaning: "Basket", emoji: "🧺", vowelSign: "ो", vowelName: "ओ" },

  // 10. ठ की बारहखड़ी
  { consonant: "ठ", word: "ठग", roman: "Thag", meaning: "Cheat / Thief", emoji: "🕵️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ठ", word: "ठाठ", roman: "Thaath", meaning: "Splendor", emoji: "👑", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ठ", word: "ठिकाना", roman: "Thikaana", meaning: "Destination", emoji: "📍", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ठ", word: "ठीक", roman: "Theek", meaning: "Fine / Correct", emoji: "✅", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ठ", word: "ठुमका", roman: "Thumka", meaning: "Dance Move", emoji: "💃", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ठ", word: "ठेला", roman: "Thela", meaning: "Handcart", emoji: "🛒", vowelSign: "े", vowelName: "ए" },
  { consonant: "ठ", word: "ठोकर", roman: "Thokar", meaning: "Stumble", emoji: "🪨", vowelSign: "ो", vowelName: "ओ" },

  // 11. ड की बारहखड़ी
  { consonant: "ड", word: "डमरू", roman: "Damroo", meaning: "Small Drum", emoji: "🥁", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ड", word: "डाकिया", roman: "Daakiya", meaning: "Postman", emoji: "📮", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ड", word: "डिबिया", roman: "Dibiya", meaning: "Small Box", emoji: "📦", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ड", word: "डीजल", roman: "Diesel", meaning: "Diesel Fuel", emoji: "⛽", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ड", word: "डुबकी", roman: "Dubki", meaning: "Dip / Dive", emoji: "🏊", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ड", word: "डूबना", roman: "Doobna", meaning: "Sink / Submerge", emoji: "🌊", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ड", word: "डेरा", roman: "Dera", meaning: "Camp / Tent", emoji: "⛺", vowelSign: "े", vowelName: "ए" },
  { consonant: "ड", word: "डोर", roman: "Dor", meaning: "Thread / String", emoji: "🧵", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ड", word: "डंक", roman: "Dank", meaning: "Sting", emoji: "🦂", vowelSign: "ं", vowelName: "अं" },
  { consonant: "ड", word: "डंडा", roman: "Danda", meaning: "Stick", emoji: "🦯", vowelSign: "ं", vowelName: "अं" },

  // 12. ढ की बारहखड़ी
  { consonant: "ढ", word: "ढक्कन", roman: "Dhakkan", meaning: "Lid / Cover", emoji: "🫙", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ढ", word: "ढाल", roman: "Dhaal", meaning: "Shield", emoji: "🛡️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ढ", word: "ढीला", roman: "Dheela", meaning: "Loose", emoji: "👕", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ढ", word: "ढूंढना", roman: "Dhoondhna", meaning: "Search", emoji: "🔎", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ढ", word: "ढोलक", roman: "Dholak", meaning: "Drum", emoji: "🪘", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ढ", word: "ढोंगी", roman: "Dhongi", meaning: "Pretender", emoji: "🎭", vowelSign: "ं", vowelName: "अं" },

  // 13. त की बारहखड़ी
  { consonant: "त", word: "तरबूज", roman: "Tarbooj", meaning: "Watermelon", emoji: "🍉", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "त", word: "ताला", roman: "Taala", meaning: "Lock", emoji: "🔒", vowelSign: "ा", vowelName: "आ" },
  { consonant: "त", word: "तारा", roman: "Taara", meaning: "Star", emoji: "⭐", vowelSign: "ा", vowelName: "आ" },
  { consonant: "त", word: "तितली", roman: "Titli", meaning: "Butterfly", emoji: "🦋", vowelSign: "ि", vowelName: "इ" },
  { consonant: "त", word: "तीर", roman: "Teer", meaning: "Arrow", emoji: "🏹", vowelSign: "ी", vowelName: "ई" },
  { consonant: "त", word: "तुला", roman: "Tula", meaning: "Balance Scale", emoji: "⚖️", vowelSign: "ु", vowelName: "उ" },
  { consonant: "त", word: "तूफान", roman: "Toofaan", meaning: "Storm", emoji: "🌪️", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "त", word: "तृण", roman: "Trin", meaning: "Blade of Grass", emoji: "🌱", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "त", word: "तेज", roman: "Tej", meaning: "Fast / Sharp", emoji: "⚡", vowelSign: "े", vowelName: "ए" },
  { consonant: "त", word: "तैरना", roman: "Tairna", meaning: "Swim", emoji: "🏊", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "त", word: "तोता", roman: "Tota", meaning: "Parrot", emoji: "🦜", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "त", word: "तौलिया", roman: "Tauliya", meaning: "Towel", emoji: "🧖", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "त", word: "तंबू", roman: "Tamboo", meaning: "Tent", emoji: "⛺", vowelSign: "ं", vowelName: "अं" },

  // 14. थ की बारहखड़ी
  { consonant: "थ", word: "थर्मस", roman: "Thermas", meaning: "Flask", emoji: "🍶", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "थ", word: "थाली", roman: "Thaali", meaning: "Plate", emoji: "🍽️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "थ", word: "थाना", roman: "Thaana", meaning: "Police Station", emoji: "🚓", vowelSign: "ा", vowelName: "आ" },
  { consonant: "थ", word: "थिरकना", roman: "Thirakna", meaning: "Dance Tapping", emoji: "🩰", vowelSign: "ि", vowelName: "इ" },
  { consonant: "थ", word: "थैला", roman: "Thaila", meaning: "Bag", emoji: "👜", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "थ", word: "थोड़ा", roman: "Thoda", meaning: "Little", emoji: "🤏", vowelSign: "ो", vowelName: "ओ" },

  // 15. द की बारहखड़ी
  { consonant: "द", word: "दवात", roman: "Dawaat", meaning: "Inkpot", emoji: "🖋️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "द", word: "दर्पण", roman: "Darpan", meaning: "Mirror", emoji: "🪞", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "द", word: "दादी", roman: "Daadi", meaning: "Grandmother", emoji: "👵", vowelSign: "ा", vowelName: "आ" },
  { consonant: "द", word: "दादा", roman: "Daada", meaning: "Grandfather", emoji: "👴", vowelSign: "ा", vowelName: "आ" },
  { consonant: "द", word: "दिन", roman: "Din", meaning: "Day", emoji: "☀️", vowelSign: "ि", vowelName: "इ" },
  { consonant: "द", word: "दीपक", roman: "Deepak", meaning: "Earthen Lamp", emoji: "🪔", vowelSign: "ी", vowelName: "ई" },
  { consonant: "द", word: "दुकान", roman: "Dukaan", meaning: "Shop", emoji: "🏪", vowelSign: "ु", vowelName: "उ" },
  { consonant: "द", word: "दूध", roman: "Doodh", meaning: "Milk", emoji: "🥛", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "द", word: "दृष्टि", roman: "Drishti", meaning: "Vision", emoji: "👁️", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "द", word: "देश", roman: "Desh", meaning: "Country", emoji: "🗺️", vowelSign: "े", vowelName: "ए" },
  { consonant: "द", word: "दोस्त", roman: "Dost", meaning: "Friend", emoji: "🤝", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "द", word: "दौड़", roman: "Daud", meaning: "Race / Run", emoji: "🏃", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "द", word: "दंगल", roman: "Dangal", meaning: "Wrestling Arena", emoji: "🤼", vowelSign: "ं", vowelName: "अं" },

  // 16. ध की बारहखड़ी
  { consonant: "ध", word: "धनुष", roman: "Dhanush", meaning: "Bow", emoji: "🏹", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ध", word: "धागा", roman: "Dhaaga", meaning: "Thread", emoji: "🧵", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ध", word: "धान", roman: "Dhaan", meaning: "Paddy Crop", emoji: "🌾", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ध", word: "धनिया", roman: "Dhaniya", meaning: "Coriander", emoji: "🌿", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ध", word: "धीरज", roman: "Dheeraj", meaning: "Patience", emoji: "🧘", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ध", word: "धुआं", roman: "Dhuaan", meaning: "Smoke", emoji: "💨", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ध", word: "धूप", roman: "Dhoop", meaning: "Sunlight", emoji: "☀️", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ध", word: "धेनु", roman: "Dhenu", meaning: "Cow", emoji: "🐄", vowelSign: "े", vowelName: "ए" },
  { consonant: "ध", word: "धोबी", roman: "Dhobi", meaning: "Washerman", emoji: "🧺", vowelSign: "ो", vowelName: "ओ" },

  // 17. न की बारहखड़ी
  { consonant: "न", word: "नल", roman: "Nal", meaning: "Tap", emoji: "🚰", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "न", word: "नाव", roman: "Naav", meaning: "Boat", emoji: "⛵", vowelSign: "ा", vowelName: "आ" },
  { consonant: "न", word: "नाक", roman: "Naak", meaning: "Nose", emoji: "👃", vowelSign: "ा", vowelName: "आ" },
  { consonant: "न", word: "नियम", roman: "Niyam", meaning: "Rule / Law", emoji: "📜", vowelSign: "ि", vowelName: "इ" },
  { consonant: "न", word: "नीम", roman: "Neem", meaning: "Neem Tree", emoji: "🌿", vowelSign: "ी", vowelName: "ई" },
  { consonant: "न", word: "नीला", roman: "Neela", meaning: "Blue Color", emoji: "💙", vowelSign: "ी", vowelName: "ई" },
  { consonant: "न", word: "नुकीला", roman: "Nukeela", meaning: "Pointed / Sharp", emoji: "🗡️", vowelSign: "ु", vowelName: "उ" },
  { consonant: "न", word: "नूपुर", roman: "Noopur", meaning: "Anklet", emoji: "🔔", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "न", word: "नृप", roman: "Nrip", meaning: "King", emoji: "👑", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "न", word: "नेता", roman: "Neta", meaning: "Leader", emoji: "🎙️", vowelSign: "े", vowelName: "ए" },
  { consonant: "न", word: "नैनीताल", roman: "Nainital", meaning: "Nainital City", emoji: "🏞️", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "न", word: "नोट", roman: "Not", meaning: "Currency Note", emoji: "💵", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "न", word: "नौका", roman: "Nauka", meaning: "Boat", emoji: "🚣", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "न", word: "नंदन", roman: "Nandan", meaning: "Joyous Child", emoji: "👶", vowelSign: "ं", vowelName: "अं" },

  // 18. प की बारहखड़ी
  { consonant: "प", word: "पतंग", roman: "Patang", meaning: "Kite", emoji: "🪁", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "प", word: "पानी", roman: "Paani", meaning: "Water", emoji: "💧", vowelSign: "ा", vowelName: "आ" },
  { consonant: "प", word: "पान", roman: "Paan", meaning: "Betel Leaf", emoji: "🍃", vowelSign: "ा", vowelName: "आ" },
  { consonant: "प", word: "पहिया", roman: "Pahiya", meaning: "Wheel", emoji: "🛞", vowelSign: "ि", vowelName: "इ" },
  { consonant: "प", word: "पिंजरा", roman: "Pinjra", meaning: "Bird Cage", emoji: "🪤", vowelSign: "ि", vowelName: "इ" },
  { consonant: "प", word: "पीला", roman: "Peela", meaning: "Yellow Color", emoji: "💛", vowelSign: "ी", vowelName: "ई" },
  { consonant: "प", word: "पुल", roman: "Pul", meaning: "Bridge", emoji: "🌉", vowelSign: "ु", vowelName: "उ" },
  { consonant: "प", word: "पूजा", roman: "Pooja", meaning: "Worship", emoji: "🪔", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "प", word: "पृथ्वी", roman: "Prithvi", meaning: "Earth Planet", emoji: "🌍", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "प", word: "पेड़", roman: "Ped", meaning: "Tree", emoji: "🌳", vowelSign: "े", vowelName: "ए" },
  { consonant: "प", word: "पैसा", roman: "Paisa", meaning: "Money / Coin", emoji: "🪙", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "प", word: "पौधा", roman: "Paudha", meaning: "Plant", emoji: "🪴", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "प", word: "पंखा", roman: "Pankha", meaning: "Fan", emoji: "🪭", vowelSign: "ं", vowelName: "अं" },

  // 19. फ की बारहखड़ी
  { consonant: "फ", word: "फल", roman: "Phal", meaning: "Fruits", emoji: "🍎", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "फ", word: "फावड़ा", roman: "Phaawda", meaning: "Spade", emoji: "⛏️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "फ", word: "फिरकी", roman: "Phirki", meaning: "Pinwheel", emoji: "🌀", vowelSign: "ि", vowelName: "इ" },
  { consonant: "फ", word: "फीता", roman: "Pheeta", meaning: "Ribbon / Tape", emoji: "🎗️", vowelSign: "ी", vowelName: "ई" },
  { consonant: "फ", word: "फुटबॉल", roman: "Football", meaning: "Football", emoji: "⚽", vowelSign: "ु", vowelName: "उ" },
  { consonant: "फ", word: "फूल", roman: "Phool", meaning: "Flower", emoji: "🌺", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "फ", word: "फेफड़ा", roman: "Phepda", meaning: "Lungs", emoji: "🫁", vowelSign: "े", vowelName: "ए" },
  { consonant: "फ", word: "फैशन", roman: "Fashion", meaning: "Fashion", emoji: "👗", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "फ", word: "फोन", roman: "Phone", meaning: "Telephone", emoji: "📱", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "फ", word: "फौजी", roman: "Fauji", meaning: "Soldier", emoji: "🪖", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "फ", word: "फंदा", roman: "Fanda", meaning: "Loop / Trap", emoji: "🪢", vowelSign: "ं", vowelName: "अं" },

  // 20. ब की बारहखड़ी
  { consonant: "ब", word: "बस", roman: "Bas", meaning: "Bus", emoji: "🚌", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ब", word: "बत्तख", roman: "Battakh", meaning: "Duck", emoji: "🦆", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ब", word: "बादल", roman: "Baadal", meaning: "Cloud", emoji: "☁️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ब", word: "बाजा", roman: "Baaja", meaning: "Musical Horn", emoji: "🎺", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ब", word: "बिल्ली", roman: "Billi", meaning: "Cat", emoji: "🐱", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ब", word: "बीज", roman: "Beej", meaning: "Seed", emoji: "🌱", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ब", word: "बुखार", roman: "Bukhaar", meaning: "Fever", emoji: "🤒", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ब", word: "बुलबुल", roman: "Bulbul", meaning: "Nightingale", emoji: "🐦", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ब", word: "बूट", roman: "Boot", meaning: "Boot", emoji: "👢", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ब", word: "बेलन", roman: "Belan", meaning: "Rolling Pin", emoji: "🥖", vowelSign: "े", vowelName: "ए" },
  { consonant: "ब", word: "बैल", roman: "Bail", meaning: "Bull / Ox", emoji: "🐂", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "ब", word: "बोतल", roman: "Botal", meaning: "Bottle", emoji: "🍾", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ब", word: "बौना", roman: "Bauna", meaning: "Dwarf", emoji: "🧝", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "ब", word: "बंदर", roman: "Bandar", meaning: "Monkey", emoji: "🐒", vowelSign: "ं", vowelName: "अं" },

  // 21. भ की बारहखड़ी
  { consonant: "भ", word: "भगत", roman: "Bhagat", meaning: "Devotee", emoji: "🧘", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "भ", word: "भालू", roman: "Bhaloo", meaning: "Bear", emoji: "🐻", vowelSign: "ा", vowelName: "आ" },
  { consonant: "भ", word: "भारत", roman: "Bhaarat", meaning: "India", emoji: "🇮🇳", vowelSign: "ा", vowelName: "आ" },
  { consonant: "भ", word: "भिखारी", roman: "Bhikhaari", meaning: "Beggar", emoji: "🤲", vowelSign: "ि", vowelName: "इ" },
  { consonant: "भ", word: "भिंडी", roman: "Bhindi", meaning: "Lady Finger / Okra", emoji: "🥦", vowelSign: "ि", vowelName: "इ" },
  { consonant: "भ", word: "भीड़", roman: "Bheed", meaning: "Crowd", emoji: "👥", vowelSign: "ी", vowelName: "ई" },
  { consonant: "भ", word: "भुट्टा", roman: "Bhutta", meaning: "Corn on Cob", emoji: "🌽", vowelSign: "ु", vowelName: "उ" },
  { consonant: "भ", word: "भूत", roman: "Bhoot", meaning: "Ghost", emoji: "👻", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "भ", word: "भेड़", roman: "Bhed", meaning: "Sheep", emoji: "🐑", vowelSign: "े", vowelName: "ए" },
  { consonant: "भ", word: "भैया", roman: "Bhaiya", meaning: "Elder Brother", emoji: "👦", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "भ", word: "भैंस", roman: "Bhains", meaning: "Buffalo", emoji: "🐃", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "भ", word: "भोजन", roman: "Bhojan", meaning: "Meal / Food", emoji: "🍛", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "भ", word: "भौंकना", roman: "Bhaunkna", meaning: "Bark", emoji: "🐕", vowelSign: "ौ", vowelName: "औ" },

  // 22. म की बारहखड़ी
  { consonant: "म", word: "मटर", roman: "Matar", meaning: "Green Peas", emoji: "🫛", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "म", word: "मगर", roman: "Magar", meaning: "Crocodile", emoji: "🐊", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "म", word: "माला", roman: "Maala", meaning: "Garland", emoji: "📿", vowelSign: "ा", vowelName: "आ" },
  { consonant: "म", word: "मामा", roman: "Maama", meaning: "Maternal Uncle", emoji: "👨", vowelSign: "ा", vowelName: "आ" },
  { consonant: "म", word: "मिठाई", roman: "Mithaai", meaning: "Indian Sweets", emoji: "🍬", vowelSign: "ि", vowelName: "इ" },
  { consonant: "म", word: "मिर्च", roman: "Mirch", meaning: "Chili Pepper", emoji: "🌶️", vowelSign: "ि", vowelName: "इ" },
  { consonant: "म", word: "मीनार", roman: "Meenaar", meaning: "Minaret / Tower", emoji: "🗼", vowelSign: "ी", vowelName: "ई" },
  { consonant: "म", word: "मुकुट", roman: "Mukut", meaning: "Crown", emoji: "👑", vowelSign: "ु", vowelName: "उ" },
  { consonant: "म", word: "मूली", roman: "Moolee", meaning: "Radish", emoji: "🥕", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "म", word: "मृग", roman: "Mrig", meaning: "Deer", emoji: "🦌", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "म", word: "मेला", roman: "Mela", meaning: "Carnival / Fair", emoji: "🎡", vowelSign: "े", vowelName: "ए" },
  { consonant: "म", word: "मेज", roman: "Mej", meaning: "Table", emoji: "🪑", vowelSign: "े", vowelName: "ए" },
  { consonant: "म", word: "मैना", roman: "Maina", meaning: "Myna Bird", emoji: "🐦", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "म", word: "मोर", roman: "Mor", meaning: "Peacock", emoji: "🦚", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "म", word: "मोती", roman: "Moti", meaning: "Pearl", emoji: "🦪", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "म", word: "मौसम", roman: "Mausam", meaning: "Weather", emoji: "⛅", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "म", word: "मौसी", roman: "Mausi", meaning: "Maternal Aunt", emoji: "👩", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "म", word: "मंदिर", roman: "Mandir", meaning: "Temple", emoji: "🛕", vowelSign: "ं", vowelName: "अं" },

  // 23. य की बारहखड़ी
  { consonant: "य", word: "यज्ञ", roman: "Yagya", meaning: "Sacred Fire Ritual", emoji: "🔥", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "य", word: "याक", roman: "Yaak", meaning: "Yak Animal", emoji: "🐂", vowelSign: "ा", vowelName: "आ" },
  { consonant: "य", word: "यात्रा", roman: "Yaatra", meaning: "Journey", emoji: "🧳", vowelSign: "ा", vowelName: "आ" },
  { consonant: "य", word: "योग", roman: "Yog", meaning: "Yoga", emoji: "🧘", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "य", word: "योद्धा", roman: "Yoddha", meaning: "Warrior", emoji: "⚔️", vowelSign: "ो", vowelName: "ओ" },

  // 24. र की बारहखड़ी
  { consonant: "र", word: "रथ", roman: "Rath", meaning: "Chariot", emoji: "🏎️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "र", word: "रस", roman: "Ras", meaning: "Juice", emoji: "🍹", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "र", word: "राजा", roman: "Raaja", meaning: "King", emoji: "👑", vowelSign: "ा", vowelName: "आ" },
  { consonant: "र", word: "रानी", roman: "Raani", meaning: "Queen", emoji: "👸", vowelSign: "ा", vowelName: "आ" },
  { consonant: "र", word: "रात", roman: "Raat", meaning: "Night", emoji: "🌙", vowelSign: "ा", vowelName: "आ" },
  { consonant: "र", word: "रवि", roman: "Ravi", meaning: "Sun", emoji: "🌞", vowelSign: "ि", vowelName: "इ" },
  { consonant: "र", word: "रीछ", roman: "Reechh", meaning: "Sloth Bear", emoji: "🐻", vowelSign: "ी", vowelName: "ई" },
  { consonant: "र", word: "रुमाल", roman: "Rumaal", meaning: "Handkerchief", emoji: "🧣", vowelSign: "ु", vowelName: "उ" },
  { consonant: "र", word: "रुपया", roman: "Rupya", meaning: "Rupee Coin", emoji: "🪙", vowelSign: "ु", vowelName: "उ" },
  { consonant: "र", word: "रूई", roman: "Rooi", meaning: "Cotton", emoji: "☁️", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "र", word: "रेल", roman: "Rel", meaning: "Train", emoji: "🚆", vowelSign: "े", vowelName: "ए" },
  { consonant: "र", word: "रोटी", roman: "Roti", meaning: "Bread / Roti", emoji: "🫓", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "र", word: "रौनक", roman: "Raunak", meaning: "Liveliness", emoji: "✨", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "र", word: "रंग", roman: "Rang", meaning: "Colors", emoji: "🎨", vowelSign: "ं", vowelName: "अं" },

  // 25. ल की बारहखड़ी
  { consonant: "ल", word: "लड़का", roman: "Ladka", meaning: "Boy", emoji: "👦", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ल", word: "लड़की", roman: "Ladki", meaning: "Girl", emoji: "👧", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ल", word: "लट्टू", roman: "Lattoo", meaning: "Spinning Top", emoji: "🪀", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ल", word: "लाल", roman: "Laal", meaning: "Red Color", emoji: "❤️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ल", word: "लाठी", roman: "Laathi", meaning: "Stick", emoji: "🦯", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ल", word: "लिफाफा", roman: "Lifafa", meaning: "Envelope", emoji: "✉️", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ल", word: "लीची", roman: "Leechi", meaning: "Lychee Fruit", emoji: "🍒", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ल", word: "लुहार", roman: "Luhaar", meaning: "Blacksmith", emoji: "⚒️", vowelSign: "ु", vowelName: "उ" },
  { consonant: "ल", word: "लूट", roman: "Loot", meaning: "Treasure / Loot", emoji: "💰", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "ल", word: "लेखक", roman: "Lekhak", meaning: "Author", emoji: "✍️", vowelSign: "े", vowelName: "ए" },
  { consonant: "ल", word: "लोमड़ी", roman: "Lomdi", meaning: "Fox", emoji: "🦊", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ल", word: "लोटा", roman: "Lota", meaning: "Round Pot", emoji: "🏺", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ल", word: "लौकी", roman: "Lauki", meaning: "Bottle Gourd", emoji: "🥒", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "ल", word: "लंगूर", roman: "Langoor", meaning: "Langur Monkey", emoji: "🐒", vowelSign: "ं", vowelName: "अं" },

  // 26. व की बारहखड़ी
  { consonant: "व", word: "वन", roman: "Van", meaning: "Forest", emoji: "🌲", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "व", word: "वानर", roman: "Vaanar", meaning: "Monkey", emoji: "🐒", vowelSign: "ा", vowelName: "आ" },
  { consonant: "व", word: "विमान", roman: "Vimaan", meaning: "Airplane", emoji: "✈️", vowelSign: "ि", vowelName: "इ" },
  { consonant: "व", word: "वीणा", roman: "Veena", meaning: "Veena Instrument", emoji: "🪕", vowelSign: "ी", vowelName: "ई" },
  { consonant: "व", word: "वृक्ष", roman: "Vriksh", meaning: "Tree", emoji: "🌳", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "व", word: "वेद", roman: "Ved", meaning: "Vedas", emoji: "📜", vowelSign: "े", vowelName: "ए" },
  { consonant: "व", word: "वैभव", roman: "Vaibhav", meaning: "Glory / Grandeur", emoji: "🏰", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "व", word: "वोट", roman: "Vot", meaning: "Vote", emoji: "🗳️", vowelSign: "ो", vowelName: "ओ" },

  // 27. श की बारहखड़ी
  { consonant: "श", word: "शलगम", roman: "Shalgam", meaning: "Turnip", emoji: "🧅", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "श", word: "शहद", roman: "Shahad", meaning: "Honey", emoji: "🍯", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "श", word: "शार्क", roman: "Shark", meaning: "Shark Fish", emoji: "🦈", vowelSign: "ा", vowelName: "आ" },
  { consonant: "श", word: "शाखा", roman: "Shaakha", meaning: "Branch", emoji: "🌿", vowelSign: "ा", vowelName: "आ" },
  { consonant: "श", word: "शिकार", roman: "Shikaar", meaning: "Hunting", emoji: "🎯", vowelSign: "ि", vowelName: "इ" },
  { consonant: "श", word: "शीशा", roman: "Sheesha", meaning: "Mirror", emoji: "🪞", vowelSign: "ी", vowelName: "ई" },
  { consonant: "श", word: "शीशी", roman: "Sheeshi", meaning: "Small Bottle", emoji: "🧪", vowelSign: "ी", vowelName: "ई" },
  { consonant: "श", word: "शुभ", roman: "Shubh", meaning: "Auspicious", emoji: "🌟", vowelSign: "ु", vowelName: "उ" },
  { consonant: "श", word: "शून्य", roman: "Shoonya", meaning: "Zero", emoji: "0️⃣", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "श", word: "शेर", roman: "Sher", meaning: "Lion", emoji: "🦁", vowelSign: "े", vowelName: "ए" },
  { consonant: "श", word: "शैतान", roman: "Shaitaan", meaning: "Naughty / Devil", emoji: "😈", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "श", word: "शोर", roman: "Shor", meaning: "Noise", emoji: "📢", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "श", word: "शौक", roman: "Shauk", meaning: "Hobby", emoji: "🎨", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "श", word: "शंख", roman: "Shankh", meaning: "Conch Shell", emoji: "🐚", vowelSign: "ं", vowelName: "अं" },

  // 28. ष की बारहखड़ी
  { consonant: "ष", word: "षट्कोण", roman: "Shatkon", meaning: "Hexagon", emoji: "⬡", vowelSign: "अ (मूल)", vowelName: "अ" },

  // 29. स की बारहखड़ी
  { consonant: "स", word: "सड़क", roman: "Sadak", meaning: "Road", emoji: "🛣️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "स", word: "साबुन", roman: "Saabun", meaning: "Soap", emoji: "🧼", vowelSign: "ा", vowelName: "आ" },
  { consonant: "स", word: "साइकिल", roman: "Cycle", meaning: "Bicycle", emoji: "🚲", vowelSign: "ा", vowelName: "आ" },
  { consonant: "स", word: "सांप", roman: "Saanp", meaning: "Snake", emoji: "🐍", vowelSign: "ा", vowelName: "आ" },
  { consonant: "स", word: "सितार", roman: "Sitaar", meaning: "Sitar Instrument", emoji: "🪕", vowelSign: "ि", vowelName: "इ" },
  { consonant: "स", word: "सिर", roman: "Sir", meaning: "Head", emoji: "🧒", vowelSign: "ि", vowelName: "इ" },
  { consonant: "स", word: "सीटी", roman: "Seeti", meaning: "Whistle", emoji: "🎺", vowelSign: "ी", vowelName: "ई" },
  { consonant: "स", word: "सीढ़ी", roman: "Seedhi", meaning: "Stairs / Ladder", emoji: "🪜", vowelSign: "ी", vowelName: "ई" },
  { consonant: "स", word: "सुबह", roman: "Subah", meaning: "Morning", emoji: "🌅", vowelSign: "ु", vowelName: "उ" },
  { consonant: "स", word: "सुराही", roman: "Suraahi", meaning: "Clay Jug", emoji: "🏺", vowelSign: "ु", vowelName: "उ" },
  { consonant: "स", word: "सूरज", roman: "Sooraj", meaning: "Sun", emoji: "🌞", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "स", word: "सूई", roman: "Sooi", meaning: "Needle", emoji: "🪡", vowelSign: "ू", vowelName: "ऊ" },
  { consonant: "स", word: "सृष्टि", roman: "Srishti", meaning: "Creation / Cosmos", emoji: "🌌", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "स", word: "सेब", roman: "Seb", meaning: "Apple", emoji: "🍎", vowelSign: "े", vowelName: "ए" },
  { consonant: "स", word: "सेना", roman: "Sena", meaning: "Army", emoji: "🪖", vowelSign: "े", vowelName: "ए" },
  { consonant: "स", word: "सैनिक", roman: "Sainik", meaning: "Soldier", emoji: "💂", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "स", word: "सैर", roman: "Sair", meaning: "Stroll", emoji: "🚶", vowelSign: "ै", vowelName: "ऐ" },
  { consonant: "स", word: "सोना", roman: "Sona", meaning: "Gold", emoji: "🥇", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "स", word: "सौदा", roman: "Sauda", meaning: "Trade / Deal", emoji: "🤝", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "स", word: "संतरा", roman: "Santra", meaning: "Orange Fruit", emoji: "🍊", vowelSign: "ं", vowelName: "अं" },

  // 30. ह की बारहखड़ी
  { consonant: "ह", word: "हल", roman: "Hal", meaning: "Plough", emoji: "🚜", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ह", word: "हवन", roman: "Havan", meaning: "Sacred Fire", emoji: "🔥", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "ह", word: "हाथ", roman: "Haath", meaning: "Hand", emoji: "✋", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ह", word: "हाथी", roman: "Haathi", meaning: "Elephant", emoji: "🐘", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ह", word: "हिरण", roman: "Hiran", meaning: "Deer", emoji: "🦌", vowelSign: "ि", vowelName: "इ" },
  { consonant: "ह", word: "हीरा", roman: "Heera", meaning: "Diamond", emoji: "💎", vowelSign: "ी", vowelName: "ई" },
  { consonant: "ह", word: "हृदय", roman: "Hriday", meaning: "Heart", emoji: "❤️", vowelSign: "ृ", vowelName: "ऋ" },
  { consonant: "ह", word: "हेलमेट", roman: "Helmet", meaning: "Helmet", emoji: "⛑️", vowelSign: "े", vowelName: "ए" },
  { consonant: "ह", word: "होटल", roman: "Hotel", meaning: "Hotel", emoji: "🏨", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ह", word: "होली", roman: "Holi", meaning: "Holi Festival", emoji: "🎨", vowelSign: "ो", vowelName: "ओ" },
  { consonant: "ह", word: "हौसला", roman: "Hausla", meaning: "Courage", emoji: "💪", vowelSign: "ौ", vowelName: "औ" },
  { consonant: "ह", word: "हंस", roman: "Hans", meaning: "Swan Bird", emoji: "🦢", vowelSign: "ं", vowelName: "अं" },

  // 31. क्ष की बारहखड़ी
  { consonant: "क्ष", word: "क्षत्रिय", roman: "Kshatriya", meaning: "Warrior", emoji: "⚔️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "क्ष", word: "क्षमा", roman: "Kshama", meaning: "Forgiveness", emoji: "🕊️", vowelSign: "अ (मूल)", vowelName: "अ" },
  { consonant: "क्ष", word: "क्षीर", roman: "Ksheer", meaning: "Milk / Sweet Rice", emoji: "🥣", vowelSign: "ी", vowelName: "ई" },
  { consonant: "क्ष", word: "क्षेत्र", roman: "Kshetra", meaning: "Field / Area", emoji: "🌾", vowelSign: "े", vowelName: "ए" },

  // 32. त्र की बारहखड़ी
  { consonant: "त्र", word: "त्रिशूल", roman: "Trishool", meaning: "Trident", emoji: "🔱", vowelSign: "ि", vowelName: "इ" },
  { consonant: "त्र", word: "त्रिकोण", roman: "Trikon", meaning: "Triangle", emoji: "📐", vowelSign: "ि", vowelName: "इ" },
  { consonant: "त्र", word: "त्रिभुज", roman: "Tribhuj", meaning: "Triangle Shape", emoji: "🔺", vowelSign: "ि", vowelName: "इ" },

  // 33. ज्ञ की बारहखड़ी
  { consonant: "ज्ञ", word: "ज्ञानी", roman: "Gyaani", meaning: "Scholar / Wise Person", emoji: "🧙‍♂️", vowelSign: "ा", vowelName: "आ" },
  { consonant: "ज्ञ", word: "ज्ञान", roman: "Gyaan", meaning: "Wisdom / Knowledge", emoji: "💡", vowelSign: "ा", vowelName: "आ" },
];

let barakhadiWordOrderCounter = 1200;

export const BARAKHADI_WORD_ITEMS: HindiItem[] = RAW_BARAKHADI_WORDS.map((w, idx) => {
  return {
    id: `bw-${w.consonant}-${idx + 1}`,
    category: "barakhadi",
    devanagari: w.word,
    text: w.word,
    transliteration: w.roman,
    romanization: w.roman,
    exampleWord: w.word,
    meaning: w.meaning,
    englishMeaning: w.meaning,
    imagePath: `/images/hindi/barakhadi-words/${w.word}.png`,
    expectedSpeech: w.word,
    audioPath: `/audio/hindi/barakhadi-words/${w.word}.mp3`,
    difficulty: w.word.length <= 2 ? "beginner" : w.word.length === 3 ? "intermediate" : "advanced",
    lessonOrder: barakhadiWordOrderCounter++,
    emoji: w.emoji,
    soundTipHindi: `${w.consonant} की बारहखड़ी: '${w.word}' (${w.vowelName} - ${w.vowelSign})`,
    subCategory: `${w.consonant} की बारहखड़ी शब्द`,
    consonantRoot: w.consonant,
    vowelSign: w.vowelSign,
    vowelName: w.vowelName,
  };
});

/**
 * Filter barakhadi words by consonant root
 */
export function getBarakhadiWordsForConsonant(root: string): HindiItem[] {
  if (!root || root === "all") return BARAKHADI_WORD_ITEMS;
  return BARAKHADI_WORD_ITEMS.filter((item) => item.consonantRoot === root);
}

/**
 * List of consonants that have words in the barakhadi words dataset
 */
export const BARAKHADI_WORD_CONSONANTS = Array.from(
  new Set(RAW_BARAKHADI_WORDS.map((w) => w.consonant))
);

