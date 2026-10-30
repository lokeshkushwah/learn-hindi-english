// ============================================================================
// KIDS ESSENTIAL FOUNDATIONS:
// Days of the Week, Months of the Year, Fruits, Vegetables,
// Numbers & How to Write Numbers (1 to Billion / Million)
// ============================================================================

export interface DayOfWeekItem {
  id: string;
  dayNumber: number; // 1 to 7 (Monday = 1)
  nameEnglish: string;
  nameHindi: string;
  pronunciationHindi: string; // e.g. "मन-डे"
  isWeekend: boolean;
  emoji: string;
  bgGradient: string;
  schoolRoutine: string;
  schoolRoutineHindi: string;
  kidTipEnglish: string;
  kidTipHindi: string;
  rhyme: string;
  audioPhrase: string;
}

export interface MonthItem {
  id: string;
  monthNumber: number; // 1 to 12
  nameEnglish: string;
  nameHindi: string;
  pronunciationHindi: string; // e.g. "जैन-यू-अरी"
  daysCount: number | string; // 31, 30, "28 or 29"
  season: string;
  seasonHindi: string;
  festivalEnglish: string;
  festivalHindi: string;
  emoji: string;
  bgGradient: string;
  isKnuckleHigh: boolean; // Knuckle trick: High knuckle = 31 days, Valley = 30/28 days
  funFactEnglish: string;
  funFactHindi: string;
  audioPhrase: string;
}

export interface FruitItem {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  pronunciationHindi: string;
  emoji: string;
  color: string;
  taste: string;
  tasteHindi: string;
  bgGradient: string;
  superpowerEnglish: string;
  superpowerHindi: string;
  sentenceEnglish: string;
  sentenceHindi: string;
}

export interface VegetableItem {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  pronunciationHindi: string;
  emoji: string;
  color: string;
  bgGradient: string;
  healthBenefitEnglish: string;
  healthBenefitHindi: string;
  cookingStyleEnglish: string;
  cookingStyleHindi: string;
  sentenceEnglish: string;
  sentenceHindi: string;
}

export interface NumberScaleItem {
  scaleValue: number | bigint;
  formattedInternational: string;
  formattedIndian: string;
  nameInternational: string;
  nameIndian: string;
  nameHindi: string;
  zerosCount: number;
  emoji: string;
  bgGradient: string;
  childRealWorldExampleEnglish: string;
  childRealWorldExampleHindi: string;
}

// ============================================================================
// 1. DAYS OF THE WEEK (सप्ताह के 7 दिन)
// ============================================================================
export const DAYS_OF_WEEK: DayOfWeekItem[] = [
  {
    id: 'day-mon',
    dayNumber: 1,
    nameEnglish: 'Monday',
    nameHindi: 'सोमवार',
    pronunciationHindi: 'मन-डे',
    isWeekend: false,
    emoji: '🎒',
    bgGradient: 'from-amber-400 to-yellow-500',
    schoolRoutine: 'New week starts! School assembly and fresh lessons.',
    schoolRoutineHindi: 'नया हफ्ता शुरू! सुबह की प्रार्थना और नई पढ़ाई।',
    kidTipEnglish: 'Named after the Moon ("Moon-day")! Shine bright like the moon!',
    kidTipHindi: 'इसे चाँद (Moon) का दिन माना जाता है। मुस्कुराते हुए हफ्ता शुरू करो!',
    rhyme: 'Monday packs the school bag tight!',
    audioPhrase: 'Monday. School starts on Monday with a big smile.',
  },
  {
    id: 'day-tue',
    dayNumber: 2,
    nameEnglish: 'Tuesday',
    nameHindi: 'मंगलवार',
    pronunciationHindi: 'ट्यूज़-डे',
    isWeekend: false,
    emoji: '🎨',
    bgGradient: 'from-rose-400 to-pink-500',
    schoolRoutine: 'Art, craft, and joyful story reading time.',
    schoolRoutineHindi: 'रंग-बिरंगी ड्राइंग, क्राफ्ट और मजेदार कहानियों का दिन।',
    kidTipEnglish: 'Remember: Tue + s + day = Tuesday! Say "Tyooz-day".',
    kidTipHindi: 'स्पेलिंग ट्रिक: T-U-E-S-D-A-Y। आवाज़ निकलती है "ट्यूज़-डे"।',
    rhyme: 'Tuesday paints with colors bright!',
    audioPhrase: 'Tuesday. We paint joyful pictures on Tuesday.',
  },
  {
    id: 'day-wed',
    dayNumber: 3,
    nameEnglish: 'Wednesday',
    nameHindi: 'बुधवार',
    pronunciationHindi: 'वेन्ज़-डे',
    isWeekend: false,
    emoji: '🐪',
    bgGradient: 'from-emerald-400 to-teal-500',
    schoolRoutine: 'Mid-week hump day! Science experiments and math games.',
    schoolRoutineHindi: 'हफ्ते का बीच! गणित के खेल और विज्ञान के प्रयोग।',
    kidTipEnglish: 'Super Magic Tip: The letter "d" is silent! Say "Wenz-day", not "Wed-nes-day"!',
    kidTipHindi: 'जादुई नियम: इसमें "d" चुप (silent) रहता है! इसे "वेन्ज़-डे" बोलते हैं!',
    rhyme: 'Wednesday climbs the middle height!',
    audioPhrase: 'Wednesday. Remember the letter D is silent: Wednesday.',
  },
  {
    id: 'day-thu',
    dayNumber: 4,
    nameEnglish: 'Thursday',
    nameHindi: 'गुरुवार / बृहस्पतिवार',
    pronunciationHindi: 'थर्ज़-डे',
    isWeekend: false,
    emoji: '⚡',
    bgGradient: 'from-blue-400 to-cyan-500',
    schoolRoutine: 'Music, singing, and library book borrowing.',
    schoolRoutineHindi: 'गाना-बजाना और लाइब्रेरी से नई किताबें लेने का दिन।',
    kidTipEnglish: 'Starts with "Th" sound (/θ/). Blow soft air through your teeth!',
    kidTipHindi: 'शुरुआत "Th" (थ) से होती है। आवाज़ है "थर्ज़-डे"।',
    rhyme: 'Thursday reads by morning light!',
    audioPhrase: 'Thursday. We borrow story books on Thursday.',
  },
  {
    id: 'day-fri',
    dayNumber: 5,
    nameEnglish: 'Friday',
    nameHindi: 'शुक्रवार',
    pronunciationHindi: 'फ़्राइ-डे',
    isWeekend: false,
    emoji: '⚽',
    bgGradient: 'from-purple-400 to-indigo-500',
    schoolRoutine: 'Sports, playground games, and preparing for the weekend.',
    schoolRoutineHindi: 'मैदान में खेलकूद और सप्ताहांत की तैयारी का दिन।',
    kidTipEnglish: 'The happiest school day! "Fri" rhymes with "Fly" and "Sky"!',
    kidTipHindi: '"Fri" की आवाज़ "फ़्लाई" जैसी होती है। वीकेंड आने की खुशी!',
    rhyme: 'Friday plays with all its might!',
    audioPhrase: 'Friday. We play sports in the school ground on Friday.',
  },
  {
    id: 'day-sat',
    dayNumber: 6,
    nameEnglish: 'Saturday',
    nameHindi: 'शनिवार',
    pronunciationHindi: 'सैटर्-डे',
    isWeekend: true,
    emoji: '🎪',
    bgGradient: 'from-orange-400 to-amber-500',
    schoolRoutine: 'Weekend fun! Park visits, cycling, and family outing.',
    schoolRoutineHindi: 'छुट्टी का दिन! पार्क की सैर, साइकिल चलाना और मस्ती।',
    kidTipEnglish: 'Named after Saturn the planet with rings! Saturday = Sat + ur + day!',
    kidTipHindi: 'शनि ग्रह (Saturn) के नाम पर। वीकेंड का पहला मजेदार दिन!',
    rhyme: 'Saturday flies a paper kite!',
    audioPhrase: 'Saturday. Saturday is the first day of our joyful weekend.',
  },
  {
    id: 'day-sun',
    dayNumber: 7,
    nameEnglish: 'Sunday',
    nameHindi: 'रविवार',
    pronunciationHindi: 'सन्-डे',
    isWeekend: true,
    emoji: '☀️',
    bgGradient: 'from-yellow-400 to-amber-400',
    schoolRoutine: 'Full family holiday! Delicious breakfast and relaxing bedtime.',
    schoolRoutineHindi: 'पूरी छुट्टी! स्वादिष्ट नाश्ता, आराम और परिवार के साथ समय।',
    kidTipEnglish: 'Named after the glorious Sun ("Sun-day")! Soak in the warm sunshine!',
    kidTipHindi: 'सूरज (Sun) का दिन! पूरे परिवार के साथ खुशियाँ मनाने का दिन!',
    rhyme: 'Sunday rests in warm delight!',
    audioPhrase: 'Sunday. Sunday is a happy holiday for the whole family.',
  },
];

// ============================================================================
// 2. MONTHS OF THE YEAR (साल के 12 महीने)
// ============================================================================
export const MONTHS_OF_YEAR: MonthItem[] = [
  {
    id: 'month-jan',
    monthNumber: 1,
    nameEnglish: 'January',
    nameHindi: 'जनवरी',
    pronunciationHindi: 'जैन-यू-अरी',
    daysCount: 31,
    season: 'Winter',
    seasonHindi: 'सर्दी (Winter)',
    festivalEnglish: 'New Year & Republic Day (26 Jan)',
    festivalHindi: 'नया साल और गणतंत्र दिवस (26 जनवरी)',
    emoji: '❄️🎉',
    bgGradient: 'from-blue-400 to-cyan-500',
    isKnuckleHigh: true,
    funFactEnglish: 'First month of the year! Named after Janus, the god of beginnings.',
    funFactHindi: 'साल का पहला महीना! कड़ाके की ठंड और नए साल की शुरुआत!',
    audioPhrase: 'January. January has thirty-one days and brings the New Year.',
  },
  {
    id: 'month-feb',
    monthNumber: 2,
    nameEnglish: 'February',
    nameHindi: 'फ़रवरी',
    pronunciationHindi: 'फ़ैब-रू-अरी',
    daysCount: '28 or 29',
    season: 'Late Winter / Spring',
    seasonHindi: 'गुलाबी ठंड व बसंत',
    festivalEnglish: 'Basant Panchami & Saraswati Puja',
    festivalHindi: 'बसंत पंचमी और माँ सरस्वती पूजा',
    emoji: '🌸🐣',
    bgGradient: 'from-pink-400 to-rose-500',
    isKnuckleHigh: false,
    funFactEnglish: 'The shortest month! It has 28 days, but 29 days in a Leap Year (every 4 years)!',
    funFactHindi: 'सबसे छोटा महीना! 28 दिन होते हैं, लेकिन Leap Year में 29 दिन होते हैं!',
    audioPhrase: 'February. February is the shortest month with twenty-eight or twenty-nine days.',
  },
  {
    id: 'month-mar',
    monthNumber: 3,
    nameEnglish: 'March',
    nameHindi: 'मार्च',
    pronunciationHindi: 'मार्च',
    daysCount: 31,
    season: 'Spring',
    seasonHindi: 'बसंत ऋतु (Spring)',
    festivalEnglish: 'Holi - Festival of Colors!',
    festivalHindi: 'होली - रंगों का पावन त्योहार!',
    emoji: '🎨🌺',
    bgGradient: 'from-emerald-400 to-teal-500',
    isKnuckleHigh: true,
    funFactEnglish: 'Flowers bloom everywhere, and sweet breezy winds blow!',
    funFactHindi: 'फूल खिलते हैं, हवा खुशगवार होती है और होली पर गुलाल उड़ता है!',
    audioPhrase: 'March. March brings thirty-one days and the colorful festival of Holi.',
  },
  {
    id: 'month-apr',
    monthNumber: 4,
    nameEnglish: 'April',
    nameHindi: 'अप्रैल',
    pronunciationHindi: 'ए-प्रिल्',
    daysCount: 30,
    season: 'Early Summer',
    seasonHindi: 'हल्की गर्मी (Warm)',
    festivalEnglish: 'Earth Day & Baisakhi',
    festivalHindi: 'पृथ्वी दिवस और बैसाखी',
    emoji: '🌍🌾',
    bgGradient: 'from-amber-400 to-yellow-500',
    isKnuckleHigh: false,
    funFactEnglish: 'Golden wheat harvests happen across farms!',
    funFactHindi: 'खेतों में सुनहरी फसलें पकती हैं और नया स्कूल सत्र शुरू होता है!',
    audioPhrase: 'April. April has thirty days and marks the start of the new school term.',
  },
  {
    id: 'month-may',
    monthNumber: 5,
    nameEnglish: 'May',
    nameHindi: 'मई',
    pronunciationHindi: 'मे',
    daysCount: 31,
    season: 'Summer',
    seasonHindi: 'गर्मी (Hot Summer)',
    festivalEnglish: 'Mother\'s Day & Summer Vacation starts!',
    festivalHindi: 'मदर्स डे और गर्मियों की छुट्टियाँ!',
    emoji: '☀️🏖️',
    bgGradient: 'from-orange-400 to-red-500',
    isKnuckleHigh: true,
    funFactEnglish: 'Sunny, bright, and delicious yellow mangoes arrive in markets!',
    funFactHindi: 'मीठे-मीठे रसीले आम और ठंडी-ठंडी आइसक्रीम का महीना!',
    audioPhrase: 'May. May brings thirty-one days and warm summer vacations.',
  },
  {
    id: 'month-jun',
    monthNumber: 6,
    nameEnglish: 'June',
    nameHindi: 'जून',
    pronunciationHindi: 'जून',
    daysCount: 30,
    season: 'Peak Summer / Early Rain',
    seasonHindi: 'भीषण गर्मी व पहली फुहार',
    festivalEnglish: 'International Yoga Day & World Environment Day',
    festivalHindi: 'योग दिवस और पर्यावरण दिवस',
    emoji: '🧘‍♂️🌱',
    bgGradient: 'from-amber-500 to-rose-500',
    isKnuckleHigh: false,
    funFactEnglish: 'June 21 has the longest daylight of the year (Summer Solstice)!',
    funFactHindi: '21 जून साल का सबसे लंबा दिन होता है!',
    audioPhrase: 'June. June has thirty days and the longest sunny day of the year.',
  },
  {
    id: 'month-jul',
    monthNumber: 7,
    nameEnglish: 'July',
    nameHindi: 'जुलाई',
    pronunciationHindi: 'जू-लाई',
    daysCount: 31,
    season: 'Monsoon',
    seasonHindi: 'वर्षा ऋतु (Monsoon)',
    festivalEnglish: 'Paper Boat Day & Monsoon Raindrops',
    festivalHindi: 'कागज़ की नाव और सावन की रिमझिम',
    emoji: '🌧️⛵',
    bgGradient: 'from-blue-500 to-indigo-600',
    isKnuckleHigh: true,
    funFactEnglish: 'July and August both have 31 days back to back!',
    funFactHindi: 'जुलाई और अगस्त दोनों में लगातार 31-31 दिन होते हैं!',
    audioPhrase: 'July. July has thirty-one days and brings cool monsoon rain.',
  },
  {
    id: 'month-aug',
    monthNumber: 8,
    nameEnglish: 'August',
    nameHindi: 'अगस्त',
    pronunciationHindi: 'ऑ-गस्ट',
    daysCount: 31,
    season: 'Monsoon',
    seasonHindi: 'वर्षा ऋतु (Monsoon)',
    festivalEnglish: 'Independence Day (15 Aug) & Raksha Bandhan',
    festivalHindi: 'स्वतंत्रता दिवस (15 अगस्त) और रक्षाबंधन',
    emoji: '🇮🇳🎈',
    bgGradient: 'from-emerald-500 to-teal-600',
    isKnuckleHigh: true,
    funFactEnglish: 'Named after Roman Emperor Augustus. Tricolor flags flutter everywhere!',
    funFactHindi: 'तिरंगा फहराया जाता है और भाई-बहन का पवित्र त्योहार रक्षाबंधन आता है!',
    audioPhrase: 'August. August has thirty-one days and we celebrate Independence Day.',
  },
  {
    id: 'month-sep',
    monthNumber: 9,
    nameEnglish: 'September',
    nameHindi: 'सितंबर',
    pronunciationHindi: 'सैप-टैम-बर',
    daysCount: 30,
    season: 'Autumn / Pleasant',
    seasonHindi: 'शरद ऋतु (Autumn)',
    festivalEnglish: 'Teachers\' Day (5 Sep) & Ganesh Chaturthi',
    festivalHindi: 'शिक्षक दिवस (5 सितंबर) और गणेश उत्सव',
    emoji: '👩‍🏫🐘',
    bgGradient: 'from-purple-400 to-indigo-500',
    isKnuckleHigh: false,
    funFactEnglish: 'We thank our teachers with flowers and greeting cards!',
    funFactHindi: 'गुरुओं का सम्मान करने और गणपति बप्पा का स्वागत करने का महीना!',
    audioPhrase: 'September. September has thirty days and we thank our wonderful teachers.',
  },
  {
    id: 'month-oct',
    monthNumber: 10,
    nameEnglish: 'October',
    nameHindi: 'अक्टूबर',
    pronunciationHindi: 'ऑक-टो-बर',
    daysCount: 31,
    season: 'Autumn / Mild Winter',
    seasonHindi: 'हल्की ठंड (Pleasant)',
    festivalEnglish: 'Gandhi Jayanti (2 Oct) & Dussehra',
    festivalHindi: 'गांधी जयंती और बुराई पर अच्छाई की जीत (दशहरा)',
    emoji: '🏹✨',
    bgGradient: 'from-amber-400 to-orange-500',
    isKnuckleHigh: true,
    funFactEnglish: 'Pleasant evening breeze and giant festive melas!',
    funFactHindi: 'शामें सुहावनी होने लगती हैं और मेलों की रौनक छा जाती है!',
    audioPhrase: 'October. October brings thirty-one days and the grand festival of Dussehra.',
  },
  {
    id: 'month-nov',
    monthNumber: 11,
    nameEnglish: 'November',
    nameHindi: 'नवंबर',
    pronunciationHindi: 'नो-वैम-बर',
    daysCount: 30,
    season: 'Early Winter',
    seasonHindi: 'गुलाबी सर्दी (Early Winter)',
    festivalEnglish: 'Diwali (Festival of Lights) & Children\'s Day (14 Nov)',
    festivalHindi: 'दीपावली (रोशनी का पर्व) और बाल दिवस (14 नवंबर)',
    emoji: '🪔🧒',
    bgGradient: 'from-yellow-400 to-amber-500',
    isKnuckleHigh: false,
    funFactEnglish: 'Children\'s Day celebrates every single kid\'s joyful dreams!',
    funFactHindi: 'दीयों की जगमगाहट, मिठाइयाँ और बच्चों का अपना बाल दिवस!',
    audioPhrase: 'November. November has thirty days, shining diyas for Diwali, and Children\'s Day.',
  },
  {
    id: 'month-dec',
    monthNumber: 12,
    nameEnglish: 'December',
    nameHindi: 'दिसंबर',
    pronunciationHindi: 'डि-सैम्-बर',
    daysCount: 31,
    season: 'Winter',
    seasonHindi: 'कड़ाके की ठंड (Chilly Winter)',
    festivalEnglish: 'Christmas (25 Dec) & Year End Holidays',
    festivalHindi: 'क्रिसमस (25 दिसंबर) और साल की विदाई',
    emoji: '🎄🎅',
    bgGradient: 'from-rose-500 to-red-600',
    isKnuckleHigh: true,
    funFactEnglish: 'Cozy blankets, warm hot chocolate, Santa Claus, and ringing bells!',
    funFactHindi: 'साल का आखिरी महीना! गर्म स्वेटर, सांता क्लॉज़ और नए साल की तैयारी!',
    audioPhrase: 'December. December has thirty-one days and brings Christmas cheer and year-end celebrations.',
  },
];

// ============================================================================
// 3. FRUITS (फलों के नाम - 24 सचित्र फल)
// ============================================================================
export const FRUITS_LIST: FruitItem[] = [
  {
    id: 'fruit-apple',
    nameEnglish: 'Apple',
    nameHindi: 'सेब',
    pronunciationHindi: 'एप्पल',
    emoji: '🍎',
    color: 'Red / Green',
    taste: 'Sweet & Crunchy',
    tasteHindi: 'मीठा और कुरकुरा',
    bgGradient: 'from-red-400 to-rose-500',
    superpowerEnglish: 'An apple a day keeps the doctor away!',
    superpowerHindi: 'रोजाना एक सेब खाने से बीमारियाँ दूर भागती हैं!',
    sentenceEnglish: 'I crunch a fresh sweet red apple.',
    sentenceHindi: 'मैं एक ताज़ा मीठा लाल सेब खाता हूँ।',
  },
  {
    id: 'fruit-banana',
    nameEnglish: 'Banana',
    nameHindi: 'केला',
    pronunciationHindi: 'बनाना',
    emoji: '🍌',
    color: 'Yellow',
    taste: 'Sweet & Soft',
    tasteHindi: 'मीठा और मुलायम',
    bgGradient: 'from-yellow-400 to-amber-400',
    superpowerEnglish: 'Instant energy booster for running and sports!',
    superpowerHindi: 'खेलकूद और दौड़ने के लिए तुरंत ऊर्जा देता है!',
    sentenceEnglish: 'Monkeys love peeling ripe yellow bananas.',
    sentenceHindi: 'बंदर पके पीले केले छीलकर खाना पसंद करते हैं।',
  },
  {
    id: 'fruit-mango',
    nameEnglish: 'Mango',
    nameHindi: 'आम',
    pronunciationHindi: 'मैंगो',
    emoji: '🥭',
    color: 'Golden Yellow',
    taste: 'Juicy & Sweet',
    tasteHindi: 'रसीला और बेहद मीठा',
    bgGradient: 'from-amber-400 to-orange-500',
    superpowerEnglish: 'The King of Fruits! Full of Vitamin A for sharp eyesight.',
    superpowerHindi: 'फलों का राजा! आँखों की तेज़ रोशनी के लिए विटामिन A से भरपूर।',
    sentenceEnglish: 'Mango is the delicious king of fruits in summer.',
    sentenceHindi: 'गर्मियों में आम सबसे स्वादिष्ट फलों का राजा है।',
  },
  {
    id: 'fruit-orange',
    nameEnglish: 'Orange',
    nameHindi: 'संतरा',
    pronunciationHindi: 'ऑरेंज',
    emoji: '🍊',
    color: 'Bright Orange',
    taste: 'Sweet & Tangy',
    tasteHindi: 'खट्टा-मीठा रसीला',
    bgGradient: 'from-orange-400 to-amber-500',
    superpowerEnglish: 'Packed with Vitamin C to fight cold and cough!',
    superpowerHindi: 'विटामिन C से भरपूर, जो सर्दी-जुकाम से बचाता है!',
    sentenceEnglish: 'Drinking orange juice makes us strong and active.',
    sentenceHindi: 'संतरे का जूस पीने से हम तरोताज़ा और मज़बूत बनते हैं।',
  },
  {
    id: 'fruit-grapes',
    nameEnglish: 'Grapes',
    nameHindi: 'अंगूर',
    pronunciationHindi: 'ग्रेप्स',
    emoji: '🍇',
    color: 'Green & Purple',
    taste: 'Juicy & Pop-in-mouth',
    tasteHindi: 'रसीले छोटे दाने',
    bgGradient: 'from-purple-400 to-indigo-500',
    superpowerEnglish: 'Tiny pearls of antioxidants for glowing skin!',
    superpowerHindi: 'गुच्छों में उगने वाले जादुई छोटे रसीले फल!',
    sentenceEnglish: 'The bunch of sweet green grapes is on the plate.',
    sentenceHindi: 'मीठे हरे अंगूरों का गुच्छा प्लेट में रखा है।',
  },
  {
    id: 'fruit-papaya',
    nameEnglish: 'Papaya',
    nameHindi: 'पपीता',
    pronunciationHindi: 'पपाया',
    emoji: '🧡',
    color: 'Orange Inside',
    taste: 'Soft & Sweet',
    tasteHindi: 'मुलायम और मीठा',
    bgGradient: 'from-orange-500 to-amber-600',
    superpowerEnglish: 'Super friendly for healthy digestion and tummy!',
    superpowerHindi: 'पेट को स्वस्थ और हाज़मे को दुरुस्त रखने वाला फल!',
    sentenceEnglish: 'Sweet ripe papaya is healthy for our tummy.',
    sentenceHindi: 'मीठा पका पपीता हमारे पेट के लिए बहुत गुणकारी है।',
  },
  {
    id: 'fruit-watermelon',
    nameEnglish: 'Watermelon',
    nameHindi: 'तरबूज',
    pronunciationHindi: 'वॉटरमेलन',
    emoji: '🍉',
    color: 'Green outside, Red inside',
    taste: 'Crisp & Super Juicy',
    tasteHindi: 'ठंडा-मीठा पानी से भरपूर',
    bgGradient: 'from-emerald-400 to-red-500',
    superpowerEnglish: '92% pure refreshing water to beat summer heat!',
    superpowerHindi: '92% पानी से भरा, जो गर्मी में शरीर को ठंडा रखता है!',
    sentenceEnglish: 'A big red slice of watermelon cools us in summer.',
    sentenceHindi: 'तरबूज का बड़ा लाल टुकड़ा गर्मी में हमें ठंडक देता है।',
  },
  {
    id: 'fruit-pineapple',
    nameEnglish: 'Pineapple',
    nameHindi: 'अनानास',
    pronunciationHindi: 'पाइनएप्पल',
    emoji: '🍍',
    color: 'Yellow with Crown',
    taste: 'Tangy & Sweet',
    tasteHindi: 'चटपटा और रसीला',
    bgGradient: 'from-yellow-500 to-amber-600',
    superpowerEnglish: 'Wears a green leafy crown like a royal fruit!',
    superpowerHindi: 'सिर पर मुकुट पहनने वाला राजा फल, जो पाचन शक्ति बढ़ाता है!',
    sentenceEnglish: 'The pineapple wears a spiky green crown.',
    sentenceHindi: 'अनानास के सिर पर कांटेदार हरा मुकुट होता है।',
  },
  {
    id: 'fruit-strawberry',
    nameEnglish: 'Strawberry',
    nameHindi: 'स्ट्रॉबेरी',
    pronunciationHindi: 'स्ट्रॉबेरी',
    emoji: '🍓',
    color: 'Ruby Red',
    taste: 'Sweet & Aromatic',
    tasteHindi: 'मीठा और खुशबूदार',
    bgGradient: 'from-pink-500 to-rose-600',
    superpowerEnglish: 'The only fruit that wears its tiny seeds on the outside!',
    superpowerHindi: 'अनोखा फल जिसके नन्हे बीज फल के बाहर होते हैं!',
    sentenceEnglish: 'She topped her ice cream with fresh red strawberries.',
    sentenceHindi: 'उसने अपनी आइसक्रीम पर ताज़ा लाल स्ट्रॉबेरी रखी।',
  },
  {
    id: 'fruit-guava',
    nameEnglish: 'Guava',
    nameHindi: 'अमरूद',
    pronunciationHindi: 'ग्वावा',
    emoji: '🍈',
    color: 'Green outside, Pink/White inside',
    taste: 'Sweet with Crunchy Seeds',
    tasteHindi: 'मीठा और सुगंधित',
    bgGradient: 'from-emerald-400 to-teal-500',
    superpowerEnglish: 'Has 4 times more Vitamin C than an orange!',
    superpowerHindi: 'संतरे से भी 4 गुना ज्यादा विटामिन C होता है!',
    sentenceEnglish: 'Sprinkling black salt on fresh guava tastes amazing.',
    sentenceHindi: 'ताज़ा अमरूद पर काला नमक छिड़क कर खाने में बहुत मज़ा आता है।',
  },
  {
    id: 'fruit-pomegranate',
    nameEnglish: 'Pomegranate',
    nameHindi: 'अनार',
    pronunciationHindi: 'पोमेग्रेनेट',
    emoji: '🍎',
    color: 'Ruby Red Jewels',
    taste: 'Sweet & Tart Seeds',
    tasteHindi: 'लाल मोतियों जैसे दाने',
    bgGradient: 'from-red-500 to-rose-700',
    superpowerEnglish: 'Builds red blood cells and keeps heart dancing!',
    superpowerHindi: 'शरीर में खून की कमी को दूर कर ताकत बढ़ाता है!',
    sentenceEnglish: 'The pomegranate is filled with shiny ruby seeds.',
    sentenceHindi: 'अनार चमकदार लाल मोतियों जैसे दानों से भरा होता है।',
  },
  {
    id: 'fruit-coconut',
    nameEnglish: 'Coconut',
    nameHindi: 'नारियल',
    pronunciationHindi: 'कोकोनट',
    emoji: '🥥',
    color: 'Brown Shell, Snow White Inside',
    taste: 'Sweet Water & Creamy Flesh',
    tasteHindi: 'मीठा पानी और मलाई',
    bgGradient: 'from-amber-600 to-stone-700',
    superpowerEnglish: 'Coconut water is nature\'s pure energy drink!',
    superpowerHindi: 'नारियल पानी कुदरत का सबसे शुद्ध एनर्जी ड्रिंक है!',
    sentenceEnglish: 'Sipping sweet green coconut water on a sunny beach.',
    sentenceHindi: 'धूप वाले दिन मीठा नारियल पानी पीना सेहतमंद है।',
  },
  {
    id: 'fruit-cherry',
    nameEnglish: 'Cherry',
    nameHindi: 'चेरी',
    pronunciationHindi: 'चेरी',
    emoji: '🍒',
    color: 'Deep Red',
    taste: 'Sweet & Juicy',
    tasteHindi: 'मीठी और रसीली',
    bgGradient: 'from-rose-500 to-red-600',
    superpowerEnglish: 'Helps children sleep peacefully and happily!',
    superpowerHindi: 'रात को गहरी और शांत नींद लाने में मदद करती है!',
    sentenceEnglish: 'The red cherry was sitting right on top of the birthday cake.',
    sentenceHindi: 'लाल चेरी बर्थडे केक के बिल्कुल ऊपर रखी हुई थी।',
  },
  {
    id: 'fruit-lemon',
    nameEnglish: 'Lemon',
    nameHindi: 'नींबू',
    pronunciationHindi: 'लेमन',
    emoji: '🍋',
    color: 'Sunny Yellow',
    taste: 'Super Sour & Fresh',
    tasteHindi: 'खट्टा और ताज़गी भरा',
    bgGradient: 'from-yellow-300 to-amber-400',
    superpowerEnglish: 'A few drops turn plain water into delicious lemonade!',
    superpowerHindi: 'इसकी कुछ बूँदें पानी को स्वादिष्ट शिकंजी में बदल देती हैं!',
    sentenceEnglish: 'Mom made chilled sweet lemonade with a fresh lemon.',
    sentenceHindi: 'माँ ने ताज़ा नींबू से ठंडी और मीठी शिकंजी बनाई।',
  },
  {
    id: 'fruit-kiwi',
    nameEnglish: 'Kiwi',
    nameHindi: 'कीवी',
    pronunciationHindi: 'कीवी',
    emoji: '🥝',
    color: 'Fuzzy Brown Outside, Emerald Green Inside',
    taste: 'Tangy & Sweet',
    tasteHindi: 'हल्का खट्टा-मीठा',
    bgGradient: 'from-lime-500 to-emerald-600',
    superpowerEnglish: 'Super immunity booster full of Vitamin C & E!',
    superpowerHindi: 'रोग प्रतिरोधक क्षमता (Immunity) को कई गुना बढ़ाने वाला फल!',
    sentenceEnglish: 'A sliced kiwi shows beautiful tiny black seeds inside.',
    sentenceHindi: 'कीवी काटने पर अंदर सुंदर नन्हें काले बीज दिखाई देते हैं।',
  },
  {
    id: 'fruit-pear',
    nameEnglish: 'Pear',
    nameHindi: 'नाशपाती',
    pronunciationHindi: 'पेयर',
    emoji: '🍐',
    color: 'Light Green',
    taste: 'Sweet & Mild Crunch',
    tasteHindi: 'मीठा और रसदार',
    bgGradient: 'from-emerald-300 to-lime-400',
    superpowerEnglish: 'Gentle fiber that keeps heart and belly happy!',
    superpowerHindi: 'हल्के रेशे जो पेट और दिल दोनों को सेहतमंद रखते हैं!',
    sentenceEnglish: 'The green pear is sweet and juicy to bite.',
    sentenceHindi: 'हरी नाशपाती खाने में मीठी और रसदार होती है।',
  },
  {
    id: 'fruit-peach',
    nameEnglish: 'Peach',
    nameHindi: 'आड़ू',
    pronunciationHindi: 'पीच',
    emoji: '🍑',
    color: 'Velvety Pinkish Orange',
    taste: 'Sweet & Fragrant',
    tasteHindi: 'मीठा और सुगंधित',
    bgGradient: 'from-orange-300 to-rose-400',
    superpowerEnglish: 'Velvety soft skin and sweet aroma!',
    superpowerHindi: 'मखमली मुलायम छिलके वाला खुशबूदार मीठा फल!',
    sentenceEnglish: 'The ripe peach smells wonderful and tastes so sweet.',
    sentenceHindi: 'पका हुआ आड़ू बहुत अच्छी महक और मीठा स्वाद देता है।',
  },
  {
    id: 'fruit-plum',
    nameEnglish: 'Plum',
    nameHindi: 'आलूबुखारा',
    pronunciationHindi: 'प्लम',
    emoji: '🫐',
    color: 'Deep Purple',
    taste: 'Sweet with Tangy Skin',
    tasteHindi: 'खट्टा-मीठा',
    bgGradient: 'from-purple-500 to-pink-600',
    superpowerEnglish: 'Great for bone strength and active muscles!',
    superpowerHindi: 'हड्डियों को मज़बूत और मांसपेशियों को फुर्तीला बनाता है!',
    sentenceEnglish: 'Plums turn from sour green to sweet deep purple.',
    sentenceHindi: 'आलूबुखारा पकने पर हरे से गहरा बैंगनी और मीठा हो जाता है।',
  },
  {
    id: 'fruit-lychee',
    nameEnglish: 'Lychee',
    nameHindi: 'लीची',
    pronunciationHindi: 'लीची',
    emoji: '🍬',
    color: 'Rough Pink Outside, Translucent White Inside',
    taste: 'Floral Sweet & Juicy',
    tasteHindi: 'गुलाब जैसी खुशबूदार और मीठी',
    bgGradient: 'from-rose-400 to-pink-500',
    superpowerEnglish: 'Tastes like sweet candy made naturally by nature!',
    superpowerHindi: 'प्रकृति द्वारा बनाई गई कुदरती मीठी टॉफ़ी जैसी!',
    sentenceEnglish: 'Peeling a pink lychee reveals a juicy white pearl.',
    sentenceHindi: 'गुलाबी छिलका हटाने पर लीची का रसीला सफेद मोती जैसा भाग निकलता है।',
  },
  {
    id: 'fruit-custard-apple',
    nameEnglish: 'Custard Apple',
    nameHindi: 'शरीफ़ा / सीताफल',
    pronunciationHindi: 'कस्टर्ड एप्पल',
    emoji: '🍈',
    color: 'Bumpy Green',
    taste: 'Creamy & Custard Sweet',
    tasteHindi: 'मलाई जैसा मीठा',
    bgGradient: 'from-teal-400 to-emerald-500',
    superpowerEnglish: 'Rich in magnesium and natural sweetness!',
    superpowerHindi: 'कुदरती कस्टर्ड जैसा मलाईदार और मीठा स्वाद!',
    sentenceEnglish: 'Custard apple is as creamy and sweet as ice cream.',
    sentenceHindi: 'शरीफ़ा आइसक्रीम की तरह मलाईदार और मीठा होता है।',
  },
  {
    id: 'fruit-chikoo',
    nameEnglish: 'Chikoo (Sapodilla)',
    nameHindi: 'चीकू',
    pronunciationHindi: 'चीकू',
    emoji: '🥔',
    color: 'Earthy Brown',
    taste: 'Caramel Brown Sugar Sweet',
    tasteHindi: 'गुड़ और शहद जैसा मीठा',
    bgGradient: 'from-amber-600 to-yellow-700',
    superpowerEnglish: 'Rich in dietary fiber and natural healthy sugars!',
    superpowerHindi: 'शहद जैसा मीठा और तुरंत ताकत देने वाला फल!',
    sentenceEnglish: 'Chikoo milkshake is thick, sweet, and yummy.',
    sentenceHindi: 'चीकू का मिल्कशेक गाढ़ा, मीठा और बहुत स्वादिष्ट होता है।',
  },
  {
    id: 'fruit-fig',
    nameEnglish: 'Fig',
    nameHindi: 'अंजीर',
    pronunciationHindi: 'फ़िग',
    emoji: '🪻',
    color: 'Purple Brown',
    taste: 'Honey Sweet with Tiny Seeds',
    tasteHindi: 'शहद जैसा मीठा',
    bgGradient: 'from-purple-600 to-rose-700',
    superpowerEnglish: 'Loaded with iron and calcium for growing bones!',
    superpowerHindi: 'आयरन और कैल्शियम से भरपूर, बच्चों के विकास के लिए उत्तम!',
    sentenceEnglish: 'Sweet figs give us lots of calcium for strong bones.',
    sentenceHindi: 'मीठे अंजीर हड्डियों की मजबूती के लिए भरपूर कैल्शियम देते हैं।',
  },
  {
    id: 'fruit-apricot',
    nameEnglish: 'Apricot',
    nameHindi: 'खुबानी',
    pronunciationHindi: 'एप्रिकॉट',
    emoji: '🍑',
    color: 'Golden Orange',
    taste: 'Sweet & Velvety',
    tasteHindi: 'मीठा और सुहावना',
    bgGradient: 'from-amber-400 to-orange-500',
    superpowerEnglish: 'Protects children\'s skin and vision!',
    superpowerHindi: 'आँखों और त्वचा की सुरक्षा करने वाला गुणकारी फल!',
    sentenceEnglish: 'The golden apricot is soft, sweet, and sunny.',
    sentenceHindi: 'सुनहरी खुबानी मुलायम, मीठी और बहुत स्वादिष्ट होती है।',
  },
  {
    id: 'fruit-dragon',
    nameEnglish: 'Dragon Fruit',
    nameHindi: 'ड्रैगन फ्रूट (कमलम)',
    pronunciationHindi: 'ड्रैगन फ्रूट',
    emoji: '🐉',
    color: 'Hot Pink Outside, White/Red Speckled Inside',
    taste: 'Mild Sweet & Refreshing',
    tasteHindi: 'हल्का मीठा और ताज़गी भरा',
    bgGradient: 'from-pink-500 to-purple-600',
    superpowerEnglish: 'Looks like dragon scales! Full of iron and Vitamin C.',
    superpowerHindi: 'ड्रैगन की पंखुड़ियों जैसा दिखने वाला अनोखा और पोषक फल!',
    sentenceEnglish: 'Dragon fruit looks magical with bright pink scales.',
    sentenceHindi: 'ड्रैगन फ्रूट अपनी गुलाबी पंखुड़ियों के साथ जादुई दिखता है।',
  },
];

// ============================================================================
// 4. VEGETABLES (सब्ज़ियों के नाम - 24 सचित्र सब्ज़ियाँ)
// ============================================================================
export const VEGETABLES_LIST: VegetableItem[] = [
  {
    id: 'veg-potato',
    nameEnglish: 'Potato',
    nameHindi: 'आलू',
    pronunciationHindi: 'पोटैटो',
    emoji: '🥔',
    color: 'Earthy Brown',
    bgGradient: 'from-amber-500 to-yellow-600',
    healthBenefitEnglish: 'The King of Vegetables! Provides energy to run and play all day.',
    healthBenefitHindi: 'सब्ज़ियों का राजा! पूरे दिन खेलने-कूदने की भरपूर ऊर्जा देता है।',
    cookingStyleEnglish: 'Mashed, boiled, crispy fries, and curries.',
    cookingStyleHindi: 'उबालकर, भूनकर या पराठों में खाया जाता है।',
    sentenceEnglish: 'Potatoes grow hidden safe inside the fertile soil.',
    sentenceHindi: 'आलू उपजाऊ मिट्टी के अंदर सुरक्षित बड़े होते हैं।',
  },
  {
    id: 'veg-tomato',
    nameEnglish: 'Tomato',
    nameHindi: 'टमाटर',
    pronunciationHindi: 'टमैटो',
    emoji: '🍅',
    color: 'Glossy Red',
    bgGradient: 'from-red-500 to-rose-600',
    healthBenefitEnglish: 'Rich in lycopene and Vitamin C for a sparkling immune system!',
    healthBenefitHindi: 'लाइकोपीन और विटामिन C से भरपूर, जो गालों को लाल और स्वस्थ रखता है!',
    cookingStyleEnglish: 'Juicy in salads, tomato soup, and rich gravies.',
    cookingStyleHindi: 'सलाद में कच्चा, सूप में या सब्ज़ी की ग्रेवी में।',
    sentenceEnglish: 'The juicy red tomato adds color to fresh salads.',
    sentenceHindi: 'रसीला लाल टमाटर ताज़े सलाद की शान बढ़ाता है।',
  },
  {
    id: 'veg-onion',
    nameEnglish: 'Onion',
    nameHindi: 'प्याज़',
    pronunciationHindi: 'अनियन',
    emoji: '🧅',
    color: 'Purplish Pink',
    bgGradient: 'from-pink-400 to-purple-500',
    healthBenefitEnglish: 'Natural antiseptic that protects from heat strokes in summer!',
    healthBenefitHindi: 'गर्मियों में लू से बचाता है और भोजन का स्वाद बढ़ाता है!',
    cookingStyleEnglish: 'Chopped for tempering, raw rings in salad.',
    cookingStyleHindi: 'तड़के में भूनकर और सलाद में छल्लेदार काटकर।',
    sentenceEnglish: 'Chopping an onion makes joyful little tears in our eyes.',
    sentenceHindi: 'प्याज़ काटते समय आँखों से हल्के से आँसू निकल आते हैं।',
  },
  {
    id: 'veg-peas',
    nameEnglish: 'Green Peas',
    nameHindi: 'हरी मटर',
    pronunciationHindi: 'ग्रीन पीज़',
    emoji: '🟢',
    color: 'Bright Green',
    bgGradient: 'from-emerald-400 to-green-500',
    healthBenefitEnglish: 'Tiny sweet pearls of plant protein and fiber!',
    healthBenefitHindi: 'पौधों से मिलने वाले प्रोटीन और फाइबर के मीठे नन्हें दाने!',
    cookingStyleEnglish: 'Steamed, in pulao, and paired with paneer.',
    cookingStyleHindi: 'पुलाव में, मटर पनीर में और गरमा-गरम कचौड़ी में।',
    sentenceEnglish: 'Opening a green pea pod reveals five sweet round peas.',
    sentenceHindi: 'मटर की फली खोलने पर पाँच प्यारे गोल दाने निकलते हैं।',
  },
  {
    id: 'veg-carrot',
    nameEnglish: 'Carrot',
    nameHindi: 'गाजर',
    pronunciationHindi: 'कैरट',
    emoji: '🥕',
    color: 'Vibrant Orange',
    bgGradient: 'from-orange-400 to-amber-500',
    healthBenefitEnglish: 'Beta-carotene superpower gives children sharp eagle vision!',
    healthBenefitHindi: 'बीटा-कैरोटीन से भरपूर, जो आँखों को बाज़ जैसी तेज़ नज़र देता है!',
    cookingStyleEnglish: 'Crunchy raw, sweet gajar ka halwa, fresh juice.',
    cookingStyleHindi: 'सलाद में कच्ची, स्वादिष्ट गाजर का हलवा या ताज़ा जूस।',
    sentenceEnglish: 'Rabbits munch on crunchy orange carrots all morning.',
    sentenceHindi: 'खरगोश सुबह-सुबह कुरकुरी नारंगी गाजर मजे से खाते हैं।',
  },
  {
    id: 'veg-spinach',
    nameEnglish: 'Spinach',
    nameHindi: 'पालक',
    pronunciationHindi: 'स्पिनच',
    emoji: '🥬',
    color: 'Deep Green',
    bgGradient: 'from-green-500 to-emerald-600',
    healthBenefitEnglish: 'Popeye\'s secret! Full of iron for super strong muscles.',
    healthBenefitHindi: 'पोपाय का सुपर सीक्रेट! मजबूत मांसपेशियों के लिए आयरन का खजाना।',
    cookingStyleEnglish: 'Palak paneer, wholesome soups, and healthy rotis.',
    cookingStyleHindi: 'पालक पनीर, स्वादिष्ट सूप और हरी पौष्टिक रोटियाँ।',
    sentenceEnglish: 'Eating fresh green spinach makes our muscles super strong.',
    sentenceHindi: 'ताज़ा हरा पालक खाने से हमारी मांसपेशियाँ बहुत ताकतवर बनती हैं।',
  },
  {
    id: 'veg-cauliflower',
    nameEnglish: 'Cauliflower',
    nameHindi: 'फूलगोभी',
    pronunciationHindi: 'कॉलीफ़्लॉवर',
    emoji: '🥦',
    color: 'Snow White Florets',
    bgGradient: 'from-stone-300 to-emerald-400',
    healthBenefitEnglish: 'Looks like a bouquet of flowers! Rich in Vitamin C and fiber.',
    healthBenefitHindi: 'सफेद फूलों के गुलदस्ते जैसी! विटामिन C और फाइबर से भरपूर।',
    cookingStyleEnglish: 'Aloo-gobi curry, parathas, and vegetable roast.',
    cookingStyleHindi: 'आलू-गोभी की सब्ज़ी और गरमा-गरम गोभी के पराठे।',
    sentenceEnglish: 'The cauliflower looks just like a bouquet of white flowers.',
    sentenceHindi: 'फूलगोभी सफेद फूलों के खूबसूरत गुलदस्ते जैसी लगती है।',
  },
  {
    id: 'veg-cabbage',
    nameEnglish: 'Cabbage',
    nameHindi: 'पत्तागोभी',
    pronunciationHindi: 'कैबेज',
    emoji: '🥗',
    color: 'Layered Light Green',
    bgGradient: 'from-emerald-300 to-green-400',
    healthBenefitEnglish: 'Layers and layers of crisp leaves that cleanse the body!',
    healthBenefitHindi: 'परत-दर-परत पत्तों वाली, जो शरीर को साफ और स्वस्थ रखती है!',
    cookingStyleEnglish: 'Crispy stir fry, coleslaw salads, and veggie momos.',
    cookingStyleHindi: 'कुरकुरी सूखी सब्ज़ी, सलाद और वेज मोमोज में।',
    sentenceEnglish: 'Peeling each layer of cabbage reveals another green leaf.',
    sentenceHindi: 'पत्तागोभी की हर परत हटाने पर एक और हरा पत्ता दिखाई देता है।',
  },
  {
    id: 'veg-brinjal',
    nameEnglish: 'Brinjal / Eggplant',
    nameHindi: 'बैंगन',
    pronunciationHindi: 'ब्रिंजल / एगप्लांट',
    emoji: '🍆',
    color: 'Glossy Royal Purple',
    bgGradient: 'from-purple-500 to-indigo-600',
    healthBenefitEnglish: 'Wears a green royal crown! Full of brain-boosting nutrients.',
    healthBenefitHindi: 'हरे मुकुट वाली बैंगनी सब्ज़ी, जो दिमाग को तेज़ रखती है!',
    cookingStyleEnglish: 'Smoky baingan bharta, roasted slices, stuffed curries.',
    cookingStyleHindi: 'गरमा-गरम बैंगन का भर्ता और भरवां बैंगन की सब्ज़ी।',
    sentenceEnglish: 'The shiny purple brinjal wears a little green crown.',
    sentenceHindi: 'चमकदार बैंगनी बैंगन अपने सिर पर एक छोटा सा हरा ताज पहनता है।',
  },
  {
    id: 'veg-ladyfinger',
    nameEnglish: 'Ladyfinger / Okra',
    nameHindi: 'भिंडी',
    pronunciationHindi: 'लेडीफ़िंगर / ओकरा',
    emoji: '🟢',
    color: 'Slender Green',
    bgGradient: 'from-green-400 to-emerald-500',
    healthBenefitEnglish: 'Contains five-pointed star seeds! Great for sharp math memory.',
    healthBenefitHindi: 'अंदर पाँच कोनों वाले सितारे जैसे बीज! याददाश्त तेज़ करने वाली!',
    cookingStyleEnglish: 'Crispy kurkuri bhindi and spiced pan fry.',
    cookingStyleHindi: 'कुरकुरी तली भिंडी और प्याज वाली मसालेदार भिंडी।',
    sentenceEnglish: 'Slicing a ladyfinger shows cute little star patterns inside.',
    sentenceHindi: 'भिंडी को बीच से काटने पर अंदर प्यारे नन्हें सितारे दिखाई देते हैं।',
  },
  {
    id: 'veg-pumpkin',
    nameEnglish: 'Pumpkin',
    nameHindi: 'कद्दू',
    pronunciationHindi: 'पम्पकिन',
    emoji: '🎃',
    color: 'Golden Orange',
    bgGradient: 'from-amber-500 to-orange-600',
    healthBenefitEnglish: 'The gentle giant! Packed with Vitamin A and healthy antioxidants.',
    healthBenefitHindi: 'सब्ज़ियों का सबसे बड़ा फल! विटामिन A और चमक देने वाले पोषक तत्वों से भरा।',
    cookingStyleEnglish: 'Sweet and sour sabzi, velvety soups, and roasted seeds.',
    cookingStyleHindi: 'खट्टा-मीठा कद्दू, स्वादिष्ट सूप और पौष्टिक भुने बीज।',
    sentenceEnglish: 'The big orange pumpkin sits happily in the vegetable patch.',
    sentenceHindi: 'बड़ा नारंगी कद्दू बगीचे में आराम से बैठा दिखाई देता है।',
  },
  {
    id: 'veg-radish',
    nameEnglish: 'Radish',
    nameHindi: 'मूली',
    pronunciationHindi: 'रैडिश',
    emoji: '⚪',
    color: 'Snow White with Green Tops',
    bgGradient: 'from-stone-200 to-emerald-300',
    healthBenefitEnglish: 'Peppery crunch that cleanses liver and boosts digestion!',
    healthBenefitHindi: 'तीखी और कुरकुरी, जो लिवर को साफ और पेट को हल्का रखती है!',
    cookingStyleEnglish: 'Raw with lemon in salads, stuffed mooli parathas.',
    cookingStyleHindi: 'नींबू के साथ सलाद में और स्वादिष्ट मूली के पराठे।',
    sentenceEnglish: 'Pulling a white radish fresh from the ground is so exciting.',
    sentenceHindi: 'ज़मीन से ताज़ा सफेद मूली उखाड़ना बहुत रोमांचक लगता है।',
  },
  {
    id: 'veg-cucumber',
    nameEnglish: 'Cucumber',
    nameHindi: 'खीरा',
    pronunciationHindi: 'क्यूकम्बर',
    emoji: '🥒',
    color: 'Cool Green',
    bgGradient: 'from-emerald-400 to-teal-400',
    healthBenefitEnglish: '"Cool as a cucumber!" 96% hydrating water keeps body cool.',
    healthBenefitHindi: 'गर्मियों में ठंडक देने वाला, 96% शुद्ध पानी से भरपूर!',
    cookingStyleEnglish: 'Cooling salads, raita, and refreshing sandwich slices.',
    cookingStyleHindi: 'सलाद में, खीरे के रायते में और सैंडविच के बीच में।',
    sentenceEnglish: 'A crunchy slice of cucumber keeps us cool on hot afternoons.',
    sentenceHindi: 'खीरे का ठंडा टुकड़ा दोपहर की गर्मी में राहत देता है।',
  },
  {
    id: 'veg-capsicum',
    nameEnglish: 'Capsicum / Bell Pepper',
    nameHindi: 'शिमला मिर्च',
    pronunciationHindi: 'कैप्सिकम',
    emoji: '🫑',
    color: 'Green, Red & Yellow',
    bgGradient: 'from-green-500 to-emerald-600',
    healthBenefitEnglish: 'Looks like shiny bells! Packed with Vitamin C for bright energy.',
    healthBenefitHindi: 'घंटी जैसी सुंदर दिखने वाली! विटामिन C से भरपूर और स्वादिष्ट।',
    cookingStyleEnglish: 'Noodles, pizza toppings, and stuffed paneer capsicum.',
    cookingStyleHindi: 'नूडल्स में, पिज्जा पर और भरवां शिमला मिर्च में।',
    sentenceEnglish: 'Bright red, yellow, and green capsicums look like colorful bells.',
    sentenceHindi: 'लाल, पीली और हरी शिमला मिर्च रंग-बिरंगी घंटियों जैसी दिखती हैं।',
  },
  {
    id: 'veg-corn',
    nameEnglish: 'Corn / Maize',
    nameHindi: 'मक्का / भुट्टा',
    pronunciationHindi: 'कॉर्न',
    emoji: '🌽',
    color: 'Golden Yellow',
    bgGradient: 'from-yellow-400 to-amber-500',
    healthBenefitEnglish: 'Golden pearls that give fiber and long-lasting playtime energy!',
    healthBenefitHindi: 'सुनहरे दाने जो भरपूर फाइबर और ऊर्जा देते हैं!',
    cookingStyleEnglish: 'Roasted on coal with lemon-chili, steamed sweet corn.',
    cookingStyleHindi: 'नींबू-मसाला लगा भुना भुट्टा और उबले मीठे मक्के के दाने।',
    sentenceEnglish: 'Roasted sweet corn with lemon and black salt smells heavenly.',
    sentenceHindi: 'नींबू और नमक लगा भुना हुआ भुट्टा बारिश में बहुत अच्छा लगता है।',
  },
  {
    id: 'veg-bottle-gourd',
    nameEnglish: 'Bottle Gourd',
    nameHindi: 'लौकी / घिया',
    pronunciationHindi: 'बॉटल गॉर्ड',
    emoji: '🥒',
    color: 'Pale Green',
    bgGradient: 'from-lime-300 to-emerald-400',
    healthBenefitEnglish: 'Extremely light, cool, and super hydrating for the heart!',
    healthBenefitHindi: 'हल्की, सुपाच्य और दिल को ठंडा व स्वस्थ रखने वाली सब्ज़ी!',
    cookingStyleEnglish: 'Light curries, healthy soups, and sweet lauki kheer.',
    cookingStyleHindi: 'हल्की तरीदार सब्ज़ी, पौष्टिक सूप और मीठी लौकी की खीर।',
    sentenceEnglish: 'Bottle gourd juice is cooling and healthy for the whole body.',
    sentenceHindi: 'लौकी का रस पूरे शरीर को ठंडक और ताज़गी देता है।',
  },
  {
    id: 'veg-bitter-gourd',
    nameEnglish: 'Bitter Gourd',
    nameHindi: 'करेला',
    pronunciationHindi: 'बिटर गॉर्ड',
    emoji: '🥬',
    color: 'Spiky Dark Green',
    bgGradient: 'from-emerald-600 to-teal-700',
    healthBenefitEnglish: 'Bitter in taste, but pure magic for cleaning blood and fighting germs!',
    healthBenefitHindi: 'स्वाद में कड़वा, लेकिन खून साफ करने और कीटाणुओं को भगाने में नंबर वन!',
    cookingStyleEnglish: 'Stuffed bharwa karela, crispy shallow fry.',
    cookingStyleHindi: 'मसालेदार भरवां करेला और कुरकुरे भुने चिप्स।',
    sentenceEnglish: 'Bitter gourd is nature’s strongest natural body purifier.',
    sentenceHindi: 'करेला कुदरत का सबसे असरदार खून साफ करने वाला उपहार है।',
  },
  {
    id: 'veg-ginger',
    nameEnglish: 'Ginger',
    nameHindi: 'अदरक',
    pronunciationHindi: 'जिंजर',
    emoji: '🫚',
    color: 'Golden Knobby Root',
    bgGradient: 'from-amber-500 to-yellow-600',
    healthBenefitEnglish: 'Soothes throat irritation, warms the body, and fights cold!',
    healthBenefitHindi: 'गले की खराश को ठीक करता है और सर्दी-जुकाम से लड़ता है!',
    cookingStyleEnglish: 'Crushed in tea, spiced vegetable tadka, honey ginger drops.',
    cookingStyleHindi: 'मसाला चाय में कूटकर, सब्ज़ियों के तड़के में और शहद के साथ।',
    sentenceEnglish: 'Warm ginger tea with honey soothes a sore throat instantly.',
    sentenceHindi: 'शहद के साथ अदरक की गर्म चाय गले को तुरंत राहत देती है।',
  },
  {
    id: 'veg-garlic',
    nameEnglish: 'Garlic',
    nameHindi: 'लहसुन',
    pronunciationHindi: 'गार्लिक',
    emoji: '🧄',
    color: 'White Cloves',
    bgGradient: 'from-stone-200 to-amber-300',
    healthBenefitEnglish: 'Nature\'s antibiotic! Protects heart and keeps viruses away.',
    healthBenefitHindi: 'कुदरत का प्राकृतिक एंटीबायोटिक, जो बीमारियों से ढाल बनकर बचाता है!',
    cookingStyleEnglish: 'Crushed in soups, garlic bread, dal tadka.',
    cookingStyleHindi: 'दाल के तड़के में, गार्लिक ब्रेड में और सूप में।',
    sentenceEnglish: 'A clove of garlic gives curries a rich and mouthwatering aroma.',
    sentenceHindi: 'लहसुन की एक कली सब्ज़ी को लाजवाब खुशबू और स्वाद देती है।',
  },
  {
    id: 'veg-mint',
    nameEnglish: 'Mint',
    nameHindi: 'पुदीना',
    pronunciationHindi: 'मिंट',
    emoji: '🌿',
    color: 'Bright Green Leaves',
    bgGradient: 'from-emerald-400 to-teal-500',
    healthBenefitEnglish: 'A burst of cool freshness that calms upset tummies!',
    healthBenefitHindi: 'ताज़गी से भरपूर, जो पेट को ठंडक और आराम पहुँचाता है!',
    cookingStyleEnglish: 'Cooling pudina chutney, jaljeera, mint lemonade.',
    cookingStyleHindi: 'हरी चटनी, जलजीरा और पुदीने की ताज़गी भरी शिकंजी।',
    sentenceEnglish: 'Fresh mint chutney makes evening snacks taste so refreshing.',
    sentenceHindi: 'ताज़ा पुदीने की चटनी शाम के नाश्ते का स्वाद दोगुना कर देती है।',
  },
  {
    id: 'veg-coriander',
    nameEnglish: 'Coriander / Cilantro',
    nameHindi: 'धनिया',
    pronunciationHindi: 'कोरिएंडर',
    emoji: '🌱',
    color: 'Fresh Green Leaves',
    bgGradient: 'from-green-400 to-emerald-500',
    healthBenefitEnglish: 'Gives cooling freshness and rich vitamins to every meal!',
    healthBenefitHindi: 'भोजन की खुशबू बढ़ाता है और भरपूर विटामिन्स देता है!',
    cookingStyleEnglish: 'Garnished on hot dal, fresh chutneys, curries.',
    cookingStyleHindi: 'गरमा-गरम दाल पर छिड़क कर और हरी चटनी बनाकर।',
    sentenceEnglish: 'Mom sprinkles chopped fresh green coriander over the hot curry.',
    sentenceHindi: 'माँ गरमा-गरम सब्ज़ी पर ताज़ा कटा हरा धनिया छिड़कती हैं।',
  },
  {
    id: 'veg-beetroot',
    nameEnglish: 'Beetroot',
    nameHindi: 'चुकंदर',
    pronunciationHindi: 'बीटरूट',
    emoji: '🔴',
    color: 'Ruby Magenta',
    bgGradient: 'from-rose-600 to-red-700',
    healthBenefitEnglish: 'Makes cheeks rosy red! Fills your blood with hemoglobin & iron.',
    healthBenefitHindi: 'गालों को गुलाबी बनाता है और शरीर में हीमोग्लोबिन बढ़ाता है!',
    cookingStyleEnglish: 'Raw in salad slices, vibrant red juice, vegetable tikki.',
    cookingStyleHindi: 'सलाद में, पौष्टिक लाल जूस में और कटलेट में।',
    sentenceEnglish: 'Beetroot juice turns everything a lovely deep magenta pink.',
    sentenceHindi: 'चुकंदर का रस हर चीज़ को प्यारा गहरा गुलाबी रंग दे देता है।',
  },
  {
    id: 'veg-sweet-potato',
    nameEnglish: 'Sweet Potato',
    nameHindi: 'शकरकंद',
    pronunciationHindi: 'स्वीट पोटैटो',
    emoji: '🍠',
    color: 'Purple Skin, Orange Inside',
    bgGradient: 'from-orange-500 to-amber-600',
    healthBenefitEnglish: 'Superfuel for brain and eyes, packed with natural sweet energy!',
    healthBenefitHindi: 'दिमाग और आँखों का सुपरफूड, जो मीठी और सेहतमंद ताकत देता है!',
    cookingStyleEnglish: 'Roasted with lemon-chaat masala, baked sweet chips.',
    cookingStyleHindi: 'नींबू और चाट मसाले के साथ भूनकर चाट बनाकर।',
    sentenceEnglish: 'Warm roasted sweet potato with lemon is a favorite winter treat.',
    sentenceHindi: 'सर्दियों में नींबू और चाट मसाले वाली भुनी शकरकंद बहुत स्वादिष्ट लगती है।',
  },
  {
    id: 'veg-mushroom',
    nameEnglish: 'Mushroom',
    nameHindi: 'मशरूम (कुकुरमुत्ता)',
    pronunciationHindi: 'मशरूम',
    emoji: '🍄',
    color: 'Creamy White Umbrella',
    bgGradient: 'from-stone-300 to-amber-400',
    healthBenefitEnglish: 'Tiny umbrellas of Vitamin D and plant protein for strong bones!',
    healthBenefitHindi: 'नन्हीं छतरियों जैसी, जो हड्डियों को विटामिन D और प्रोटीन देती हैं!',
    cookingStyleEnglish: 'Mushroom tikka, cream of mushroom soup, pizza toppings.',
    cookingStyleHindi: 'मटर मशरूम की सब्ज़ी में, सूप में और पिज्जा पर।',
    sentenceEnglish: 'The little white mushroom looks like a fairy tale umbrella.',
    sentenceHindi: 'छोटा सफेद मशरूम परियों की कहानी की नन्हीं छतरी जैसा लगता है।',
  },
];

// ============================================================================
// 5. NUMBERS FOUNDATION & SCALES (1 TO BILLION / MILLION)
// ============================================================================

export const NUMBER_SCALES: NumberScaleItem[] = [
  {
    scaleValue: 1,
    formattedInternational: '1',
    formattedIndian: '1',
    nameInternational: 'One',
    nameIndian: 'One',
    nameHindi: 'एक',
    zerosCount: 0,
    emoji: '☝️',
    bgGradient: 'from-amber-400 to-yellow-500',
    childRealWorldExampleEnglish: '1 bright glowing Sun in the sky.',
    childRealWorldExampleHindi: 'आसमान में 1 चमकता हुआ सूरज।',
  },
  {
    scaleValue: 10,
    formattedInternational: '10',
    formattedIndian: '10',
    nameInternational: 'Ten',
    nameIndian: 'Ten',
    nameHindi: 'दस',
    zerosCount: 1,
    emoji: '👐',
    bgGradient: 'from-orange-400 to-amber-500',
    childRealWorldExampleEnglish: '10 fingers on our two happy hands!',
    childRealWorldExampleHindi: 'हमारे दोनों हाथों की 10 प्यारी उँगलियाँ!',
  },
  {
    scaleValue: 100,
    formattedInternational: '100',
    formattedIndian: '100',
    nameInternational: 'One Hundred',
    nameIndian: 'One Hundred',
    nameHindi: 'एक सौ',
    zerosCount: 2,
    emoji: '💯',
    bgGradient: 'from-rose-400 to-pink-500',
    childRealWorldExampleEnglish: 'A full century in cricket or 100 colorful building blocks.',
    childRealWorldExampleHindi: 'क्रिकेट में पूरा शतक या 100 रंग-बिरंगे खिलौने।',
  },
  {
    scaleValue: 1000,
    formattedInternational: '1,000',
    formattedIndian: '1,000',
    nameInternational: 'One Thousand',
    nameIndian: 'One Thousand',
    nameHindi: 'एक हज़ार',
    zerosCount: 3,
    emoji: '📚',
    bgGradient: 'from-purple-400 to-indigo-500',
    childRealWorldExampleEnglish: 'Pages in a giant fairytale encyclopedia book.',
    childRealWorldExampleHindi: 'कहानियों की एक बहुत बड़ी मोटी किताब के पन्ने।',
  },
  {
    scaleValue: 10000,
    formattedInternational: '10,000',
    formattedIndian: '10,000',
    nameInternational: 'Ten Thousand',
    nameIndian: 'Ten Thousand',
    nameHindi: 'दस हज़ार',
    zerosCount: 4,
    emoji: '🏟️',
    bgGradient: 'from-blue-400 to-cyan-500',
    childRealWorldExampleEnglish: 'Cheering children in a packed sports stadium.',
    childRealWorldExampleHindi: 'एक बड़े खेल स्टेडियम में तालियाँ बजाते 10,000 बच्चे।',
  },
  {
    scaleValue: 100000,
    formattedInternational: '100,000',
    formattedIndian: '1,00,000',
    nameInternational: 'One Hundred Thousand',
    nameIndian: 'One Lakh',
    nameHindi: 'एक लाख (1 Lakh)',
    zerosCount: 5,
    emoji: '⭐',
    bgGradient: 'from-teal-400 to-emerald-500',
    childRealWorldExampleEnglish: 'Number of twinkling stars visible with a telescope at night.',
    childRealWorldExampleHindi: 'रात के समय दूरबीन से दिखने वाले जगमगाते तारे।',
  },
  {
    scaleValue: 1000000,
    formattedInternational: '1,000,000',
    formattedIndian: '10,00,000',
    nameInternational: 'One Million (1M)',
    nameIndian: 'Ten Lakhs',
    nameHindi: 'दस लाख (1 Million = 10 Lakhs)',
    zerosCount: 6,
    emoji: '🚀',
    bgGradient: 'from-amber-500 to-red-500',
    childRealWorldExampleEnglish: 'Popular video with 1 Million views on YouTube!',
    childRealWorldExampleHindi: 'यूट्यूब पर 10 लाख (1 Million) बच्चों का पसंदीदा गाना!',
  },
  {
    scaleValue: 10000000,
    formattedInternational: '10,000,000',
    formattedIndian: '1,00,00,000',
    nameInternational: 'Ten Million (10M)',
    nameIndian: 'One Crore',
    nameHindi: 'एक करोड़ (1 Crore = 10 Million)',
    zerosCount: 7,
    emoji: '👑',
    bgGradient: 'from-violet-500 to-purple-600',
    childRealWorldExampleEnglish: 'Population of a great bustling mega-city like Mumbai or London.',
    childRealWorldExampleHindi: 'मुंबई या दिल्ली जैसे बड़े महानगर की पूरी आबादी।',
  },
  {
    scaleValue: 100000000,
    formattedInternational: '100,000,000',
    formattedIndian: '10,00,00,000',
    nameInternational: 'One Hundred Million (100M)',
    nameIndian: 'Ten Crores',
    nameHindi: 'दस करोड़ (10 Crores)',
    zerosCount: 8,
    emoji: '💎',
    bgGradient: 'from-pink-500 to-rose-600',
    childRealWorldExampleEnglish: '100 Million kilometers: distance towards inner solar planets.',
    childRealWorldExampleHindi: 'सौरमंडल के ग्रहों के बीच की विशाल दूरी।',
  },
  {
    scaleValue: 1000000000,
    formattedInternational: '1,000,000,000',
    formattedIndian: '1,00,00,00,000',
    nameInternational: 'One Billion (1B)',
    nameIndian: 'One Arab (100 Crores)',
    nameHindi: 'एक अरब (1 Billion = 100 करोड़ / 1 अरब)',
    zerosCount: 9,
    emoji: '🌍🌟',
    bgGradient: 'from-amber-400 via-orange-500 to-purple-600',
    childRealWorldExampleEnglish: 'Over 8 Billion people live together on our beautiful planet Earth!',
    childRealWorldExampleHindi: 'हमारी पृथ्वी पर 8 अरब (8 Billion) से अधिक लोग रहते हैं!',
  },
];

// ============================================================================
// NUMBER CONVERSION ALGORITHMS (UP TO 999 BILLION)
// ============================================================================

const BELOW_20_EN = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS_EN = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

const HINDI_NUMBER_WORDS = [
  'शून्य', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस',
  'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस', 'बीस',
  'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाइस', 'उनतीस', 'तीस',
  'इकतीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस', 'चालीस',
  'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
  'इक्यावन', 'बावन', 'तिरेपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ', 'साठ',
  'इकसठ', 'बासठ', 'तिरेसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सरसठ', 'अड़सठ', 'उनहत्तर', 'सत्तर',
  'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्नासी', 'अस्सी',
  'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सत्तासी', 'अट्ठासी', 'नवासी', 'नब्बे',
  'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पंचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे'
];

function convertThreeDigitsEn(n: number): string {
  let res = '';
  if (n >= 100) {
    res += BELOW_20_EN[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n >= 20) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    res += TENS_EN[t] + (u > 0 ? '-' + BELOW_20_EN[u] : '');
  } else if (n > 0) {
    res += BELOW_20_EN[n];
  }
  return res.trim();
}

function convertTwoDigitsEn(n: number): string {
  if (n >= 20) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    return (TENS_EN[t] + (u > 0 ? '-' + BELOW_20_EN[u] : '')).trim();
  }
  return BELOW_20_EN[n] || '';
}

/**
 * Converts any number (0 to 999,999,999,999) to International English Words
 * e.g. 1,234,567 -> "One Million Two Hundred Thirty-Four Thousand Five Hundred Sixty-Seven"
 */
export function numberToInternationalWords(num: number): string {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToInternationalWords(Math.abs(num));
  if (!Number.isFinite(num)) return 'Infinity';

  const units = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  let chunkIdx = 0;
  const words: string[] = [];
  let current = Math.floor(num);

  while (current > 0) {
    const chunk = current % 1000;
    if (chunk !== 0) {
      const chunkStr = convertThreeDigitsEn(chunk);
      const unit = units[chunkIdx];
      words.unshift((chunkStr + (unit ? ' ' + unit : '')).trim());
    }
    current = Math.floor(current / 1000);
    chunkIdx++;
  }

  return words.join(' ');
}

/**
 * Converts any number (0 to 999,999,999,999) to Indian System English Words
 * e.g. 10,000,000 -> "One Crore"
 */
export function numberToIndianWords(num: number): string {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToIndianWords(Math.abs(num));

  let current = Math.floor(num);
  const res: string[] = [];

  const arab = Math.floor(current / 1000000000);
  current %= 1000000000;
  const crore = Math.floor(current / 10000000);
  current %= 10000000;
  const lakh = Math.floor(current / 100000);
  current %= 100000;
  const thousand = Math.floor(current / 1000);
  current %= 1000;
  const hundred = Math.floor(current / 100);
  const remainder = current % 100;

  if (arab > 0) res.push(convertTwoDigitsEn(arab) + ' Arab');
  if (crore > 0) res.push(convertTwoDigitsEn(crore) + ' Crore');
  if (lakh > 0) res.push(convertTwoDigitsEn(lakh) + ' Lakh');
  if (thousand > 0) res.push(convertTwoDigitsEn(thousand) + ' Thousand');
  if (hundred > 0) res.push(BELOW_20_EN[hundred] + ' Hundred');
  if (remainder > 0) res.push(convertTwoDigitsEn(remainder));

  return res.join(' ');
}

/**
 * Converts any number (0 to 999,999,999,999) to Hindi Devanagari Words
 * e.g. 50,00,000 -> "पचास लाख"
 */
export function numberToHindiWords(num: number): string {
  if (num === 0) return 'शून्य';
  if (num < 0) return 'ऋण ' + numberToHindiWords(Math.abs(num));

  let current = Math.floor(num);
  const res: string[] = [];

  const arab = Math.floor(current / 1000000000);
  current %= 1000000000;
  const crore = Math.floor(current / 10000000);
  current %= 10000000;
  const lakh = Math.floor(current / 100000);
  current %= 100000;
  const thousand = Math.floor(current / 1000);
  current %= 1000;
  const hundred = Math.floor(current / 100);
  const remainder = current % 100;

  if (arab > 0) res.push((HINDI_NUMBER_WORDS[arab] || arab) + ' अरब');
  if (crore > 0) res.push((HINDI_NUMBER_WORDS[crore] || crore) + ' करोड़');
  if (lakh > 0) res.push((HINDI_NUMBER_WORDS[lakh] || lakh) + ' लाख');
  if (thousand > 0) res.push((HINDI_NUMBER_WORDS[thousand] || thousand) + ' हज़ार');
  if (hundred > 0) res.push((HINDI_NUMBER_WORDS[hundred] || hundred) + ' सौ');
  if (remainder > 0) res.push(HINDI_NUMBER_WORDS[remainder] || String(remainder));

  return res.join(' ');
}

/**
 * Formats a number with International 3-digit comma periods: e.g. "1,000,000"
 */
export function formatInternational(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Formats a number with Indian 2-digit comma periods: e.g. "10,00,000"
 */
export function formatIndian(num: number): string {
  return num.toLocaleString('en-IN');
}
