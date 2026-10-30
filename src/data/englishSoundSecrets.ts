export interface EnglishSoundCard {
  letter: string;
  soundTag: string; // e.g. "दंतोष्ठ्य (Labiodental)"
  soundTagEnglish: string;
  mouthShapeHindi: string; // e.g. "ऊपर के दाँत + नीचे का होंठ"
  mouthShapeEnglish: string;
  tipHindi: string; // e.g. "💡 ऊपर के दाँत नीचे वाले होंठ पर हल्का सा दबाओ और बोलो: Van!"
  tipEnglish: string;
  exampleWord: string;
  exampleEmoji: string;
  exampleHindi: string;
  phoneticHint: string;
}

export interface EnglishPracticeWordPair {
  wordA: string;
  emojiA: string;
  meaningA: string;
  wordB: string;
  emojiB: string;
  meaningB: string;
}

export interface EnglishSoundSecretPair {
  id: string;
  title: string;
  titleHindi: string;
  contrastExplanationHindi: string;
  contrastExplanationEnglish: string;
  letterA: EnglishSoundCard;
  letterB: EnglishSoundCard;
  practiceWords: EnglishPracticeWordPair[];
}

export const ENGLISH_SOUND_SECRETS: EnglishSoundSecretPair[] = [
  // ==========================================
  // 1. V vs W (दंतोष्ठ्य बनाम ओष्ठ्य)
  // ==========================================
  {
    id: 'v-vs-w',
    title: 'V vs W (Labiodental vs Bilabial Round)',
    titleHindi: 'V (दाँत + होंठ) बनाम W (गोल चक्र होंठ)',
    contrastExplanationHindi:
      'V बोलते समय ऊपर के दाँत नीचे वाले होंठ को हल्के से छूते हैं और हवा में मक्खी जैसी भिनभिनाहट (buzz) होती है। W बोलते समय होंठ सीटी की तरह एकदम गोल (O-shape) बनते हैं और दाँत होंठ को बिल्कुल नहीं छूते!',
    contrastExplanationEnglish:
      'For V, your top teeth touch your bottom lip with a gentle buzz. For W, your lips round into a tight circle like whistling, and teeth never touch your lips!',
    letterA: {
      letter: 'V',
      soundTag: 'दंतोष्ठ्य (Labiodental)',
      soundTagEnglish: 'Teeth + Lower Lip',
      mouthShapeHindi: 'ऊपर के दाँत नीचे के होंठ को छूते हैं',
      mouthShapeEnglish: 'Top front teeth rest on lower lip',
      tipHindi: '💡 ऊपर के दाँत नीचे वाले होंठ पर हल्का सा दबाओ और मधुमक्खी जैसी गूँज के साथ बोलो: Van!',
      tipEnglish: 'Press top teeth onto lower lip and buzz like a bee: Van!',
      exampleWord: 'Van',
      exampleEmoji: '🚐',
      exampleHindi: 'वैन (गाड़ी)',
      phoneticHint: 'Vvv-an',
    },
    letterB: {
      letter: 'W',
      soundTag: 'ओष्ठ्य गोल चक्र (Bilabial Round)',
      soundTagEnglish: 'Rounded Lips (O-Shape)',
      mouthShapeHindi: 'होंठ एकदम गोल (O-आकार) चक्र बनाते हैं',
      mouthShapeEnglish: 'Lips form a tight round circle (O)',
      tipHindi: '💡 जैसे सीटी बजाते हैं या मोमबत्ती बुझाते हैं, होंठों को गोल करके बोलो: Water!',
      tipEnglish: 'Make a small round circle with your lips like blowing a candle: Water!',
      exampleWord: 'Water',
      exampleEmoji: '💧',
      exampleHindi: 'पानी (वॉटर)',
      phoneticHint: 'Www-ater',
    },
    practiceWords: [
      { wordA: 'Van', emojiA: '🚐', meaningA: 'वैन', wordB: 'Water', emojiB: '💧', meaningB: 'पानी' },
      { wordA: 'Vase', emojiA: '🏺', meaningA: 'गुलदस्ता', wordB: 'Watch', emojiB: '⌚', meaningB: 'घड़ी' },
      { wordA: 'Vine', emojiA: '🍇', meaningA: 'बेल/अंगूर', wordB: 'Wine', emojiB: '🍷', meaningB: 'जूस' },
      { wordA: 'Vest', emojiA: '🦺', meaningA: 'बनियान', wordB: 'West', emojiB: '🧭', meaningB: 'पश्चिम दिशा' },
      { wordA: 'Volley', emojiA: '🏐', meaningA: 'वॉलीबॉल', wordB: 'Wall', emojiB: '🧱', meaningB: 'दीवार' },
    ],
  },

  // ==========================================
  // 2. TH Soft (/θ/) vs TH Hard (/ð/)
  // ==========================================
  {
    id: 'th-soft-vs-th-hard',
    title: 'TH Soft (/θ/ like Three) vs TH Hard (/ð/ like This)',
    titleHindi: 'TH (नरम फूँक थ) बनाम TH (गले की गूँज द)',
    contrastExplanationHindi:
      'English में TH के दो जादुई रूप होते हैं! "Three" में जीभ दाँतों के बीच से केवल हल्की फूँक बाहर निकालती है (थ जैसा)। "This" में जीभ दाँतों के पीछे रखकर गले में गूँज और कंपन (vibration) के साथ बोला जाता है (द जैसा)।',
    contrastExplanationEnglish:
      'In "Three", air gently puffs through tongue and teeth without throat buzz (Soft TH). In "This", your vocal cords vibrate with a humming sound (Hard TH)!',
    letterA: {
      letter: 'TH (Soft)',
      soundTag: 'अघोष दंत्य (Voiceless /θ/)',
      soundTagEnglish: 'Puff of Air through Teeth',
      mouthShapeHindi: 'जीभ की नोक दाँतों के बीच हल्की बाहर',
      mouthShapeEnglish: 'Tip of tongue peaks between teeth',
      tipHindi: '💡 जीभ की नोक को दोनों दाँतों के बीच थोड़ा सा निकालो और फूँक मारो: Three!',
      tipEnglish: 'Put tongue between teeth and blow soft air without voice: Three!',
      exampleWord: 'Three',
      exampleEmoji: '3️⃣',
      exampleHindi: 'तीन (थ्री)',
      phoneticHint: 'Th-ree',
    },
    letterB: {
      letter: 'TH (Hard)',
      soundTag: 'सघोष दंत्य (Voiced /ð/)',
      soundTagEnglish: 'Throat Buzz + Teeth',
      mouthShapeHindi: 'जीभ दाँतों के पीछे + गले में कंपन',
      mouthShapeEnglish: 'Tongue on back of teeth with throat buzz',
      tipHindi: '💡 गले पर उंगली रखो - बोलते समय गले में थरथराहट (vibration) महसूस होनी चाहिए: This!',
      tipEnglish: 'Touch your throat and feel the buzz as you speak: This!',
      exampleWord: 'This',
      exampleEmoji: '👉',
      exampleHindi: 'यह (दिस)',
      phoneticHint: 'Th-is',
    },
    practiceWords: [
      { wordA: 'Three', emojiA: '3️⃣', meaningA: 'तीन', wordB: 'This', emojiB: '👉', meaningB: 'यह' },
      { wordA: 'Thin', emojiA: '🧵', meaningA: 'पतला', wordB: 'That', emojiB: '🔭', meaningB: 'वह' },
      { wordA: 'Thumb', emojiA: '👍', meaningA: 'अंगूठा', wordB: 'They', emojiB: '👫', meaningB: 'वे सब' },
      { wordA: 'Think', emojiA: '💭', meaningA: 'सोचना', wordB: 'There', emojiB: '🏡', meaningB: 'वहाँ' },
      { wordA: 'Tooth', emojiA: '🦷', meaningA: 'दाँत', wordB: 'Then', emojiB: '⏳', meaningB: 'तब/फिर' },
    ],
  },

  // ==========================================
  // 3. B vs P (गले की गूँज बनाम हवा का पफ़)
  // ==========================================
  {
    id: 'b-vs-p',
    title: 'B vs P (Voiced /b/ vs Voiceless Puff /p/)',
    titleHindi: 'B (गले की गूँज) बनाम P (हवा का पफ़)',
    contrastExplanationHindi:
      'B और P दोनों ही दोनों होंठ मिलाकर बोले जाते हैं! फ़र्क सिर्फ इतना है: B में गले से आवाज़ गूँजती है (Ball), जबकि P में केवल मुँह से हवा का तेज़ पफ़ बाहर निकलता है (Pen)!',
    contrastExplanationEnglish:
      'Both B and P use two closed lips. B vibrates your vocal cords (Voiced). P releases a strong burst of air without throat vibration (Voiceless)!',
    letterA: {
      letter: 'B',
      soundTag: 'सघोष ओष्ठ्य (Voiced Bilabial)',
      soundTagEnglish: 'Throat Buzz + Lips',
      mouthShapeHindi: 'दोनों होंठ चिपकाओ + गले से आवाज़',
      mouthShapeEnglish: 'Lips press together with throat sound',
      tipHindi: '💡 गले पर हाथ रखो - "ब" बोलते समय गले में कंपन महसूस होगा: Ball!',
      tipEnglish: 'Feel the rumble in your throat as your lips pop open: Ball!',
      exampleWord: 'Ball',
      exampleEmoji: '⚽',
      exampleHindi: 'गेंद (बॉल)',
      phoneticHint: 'B-all',
    },
    letterB: {
      letter: 'P',
      soundTag: 'अघोष हवा का पफ़ (Air Puff)',
      soundTagEnglish: 'Puff of Air without Voice',
      mouthShapeHindi: 'दोनों होंठ दबाओ + हवा का तेज़ झोंका',
      mouthShapeEnglish: 'Lips press and release a burst of air',
      tipHindi: '💡 हथेली मुँह के आगे रखो - "पेन" बोलते समय हवा का हल्का थपेड़ा हथेली पर लगेगा: Pen!',
      tipEnglish: 'Hold hand before mouth, feel the strong air puff: Pen!',
      exampleWord: 'Pen',
      exampleEmoji: '🖊️',
      exampleHindi: 'कलम (पेन)',
      phoneticHint: 'P-en',
    },
    practiceWords: [
      { wordA: 'Ball', emojiA: '⚽', meaningA: 'गेंद', wordB: 'Pen', emojiB: '🖊️', meaningB: 'कलम' },
      { wordA: 'Bat', emojiA: '🦇', meaningA: 'बल्ला', wordB: 'Pig', emojiB: '🐷', meaningB: 'सुअर' },
      { wordA: 'Bear', emojiA: '🐻', meaningA: 'भालू', wordB: 'Pear', emojiB: '🍐', meaningB: 'नाशपाती' },
      { wordA: 'Bee', emojiA: '🐝', meaningA: 'मधुमक्खी', wordB: 'Pea', emojiB: '🫛', meaningB: 'मटर' },
      { wordA: 'Bus', emojiA: '🚌', meaningA: 'बस', wordB: 'Pup', emojiB: '🐶', meaningB: 'पिल्ला' },
    ],
  },

  // ==========================================
  // 4. S vs SH (सीटी बनाम चुप कराने की आवाज़)
  // ==========================================
  {
    id: 's-vs-sh',
    title: 'S vs SH (Dental Sibilant vs Palatal Hush)',
    titleHindi: 'S (सीटी की आवाज़) बनाम SH (शांत कराने की आवाज़)',
    contrastExplanationHindi:
      'S बोलते समय होंठ मुस्कुराते हैं और दाँतों के बीच से पतली सीटी "स्स्स" निकलती है। SH बोलते समय होंठ आगे गोल होते हैं जैसे किसी को "शशश... चुप रहो" कहते हैं!',
    contrastExplanationEnglish:
      'For S, smile wide and let air hiss through closed teeth like a snake. For SH, push your lips forward and blow gentle air like soothing a baby to sleep!',
    letterA: {
      letter: 'S',
      soundTag: 'दंत्य सीटी (Dental Sibilant)',
      soundTagEnglish: 'Smiling Teeth Hiss',
      mouthShapeHindi: 'दाँत बंद + मुस्कुराते हुए होंठ',
      mouthShapeEnglish: 'Teeth lightly closed with a smile',
      tipHindi: '💡 दाँत मिलाकर साँप जैसी पतली "स्स्स" सीटी की हवा निकालो: Sun!',
      tipEnglish: 'Smile wide and make a sharp snake hiss: Sun!',
      exampleWord: 'Sun',
      exampleEmoji: '☀️',
      exampleHindi: 'सूरज (सन)',
      phoneticHint: 'Sss-un',
    },
    letterB: {
      letter: 'SH',
      soundTag: 'तालव्य शश (Palatal Hush)',
      soundTagEnglish: 'Round Lips Forward',
      mouthShapeHindi: 'होंठों को आगे निकालकर गोल करो',
      mouthShapeEnglish: 'Lips pushed forward in a hush shape',
      tipHindi: '💡 जैसे किसी को प्यार से "शशश... शांत" कराते हैं, वैसे बोलो: Ship!',
      tipEnglish: 'Make the quiet "shhh" sound with rounded lips: Ship!',
      exampleWord: 'Ship',
      exampleEmoji: '🚢',
      exampleHindi: 'जहाज़ (शिप)',
      phoneticHint: 'Shhh-ip',
    },
    practiceWords: [
      { wordA: 'Sun', emojiA: '☀️', meaningA: 'सूरज', wordB: 'Ship', emojiB: '🚢', meaningB: 'जहाज़' },
      { wordA: 'Seat', emojiA: '💺', meaningA: 'सीट/बैठक', wordB: 'Sheet', emojiB: '📄', meaningB: 'चादर/पन्ना' },
      { wordA: 'Sea', emojiA: '🌊', meaningA: 'समुद्र', wordB: 'Shoe', emojiB: '👟', meaningB: 'जूता' },
      { wordA: 'Sock', emojiA: '🧦', meaningA: 'मोज़ा', wordB: 'Shark', emojiB: '🦈', meaningB: 'शार्क मछली' },
      { wordA: 'Soup', emojiA: '🥣', meaningA: 'सूप', wordB: 'Shop', emojiB: '🏬', meaningB: 'दुकान' },
    ],
  },

  // ==========================================
  // 5. F vs P (फैन बनाम पैन - दाँत बनाम दोनों होंठ)
  // ==========================================
  {
    id: 'f-vs-p',
    title: 'F vs P (Labiodental Air vs Bilabial Pop)',
    titleHindi: 'F (दाँत + होंठ) बनाम P (दोनों होंठ चिपके)',
    contrastExplanationHindi:
      'F बोलते समय ऊपर के दाँत नीचे वाले होंठ पर टिकते हैं और हवा लगातार बाहर बहती है (Fan)। P बोलते समय दोनों होंठ आपस में पूरे मिलते हैं और फिर अचानक पफ़ के साथ खुलते हैं (Pan)।',
    contrastExplanationEnglish:
      'For F, your top teeth touch your bottom lip as air flows continuously. For P, both lips seal tight then pop open with air!',
    letterA: {
      letter: 'F',
      soundTag: 'दंतोष्ठ्य हवा (Teeth + Lip)',
      soundTagEnglish: 'Teeth on Lower Lip',
      mouthShapeHindi: 'ऊपर के दाँत नीचे के होंठ पर',
      mouthShapeEnglish: 'Top front teeth touch lower lip',
      tipHindi: '💡 दाँत नीचे के होंठ को छुएँ और फूँक जैसी हवा लगातार बाहर निकालो: Fan!',
      tipEnglish: 'Rest top teeth on bottom lip and blow air: Fan!',
      exampleWord: 'Fan',
      exampleEmoji: '🪭',
      exampleHindi: 'पंखा (फैन)',
      phoneticHint: 'Fff-an',
    },
    letterB: {
      letter: 'P',
      soundTag: 'ओष्ठ्य पफ़ (Two Lips Pop)',
      soundTagEnglish: 'Both Lips Seal & Pop',
      mouthShapeHindi: 'दोनों होंठ आपस में पूरे मिलते हैं',
      mouthShapeEnglish: 'Both lips press together tightly',
      tipHindi: '💡 दोनों होंठ एक साथ दबाकर झटके से हवा छोड़ो: Pan!',
      tipEnglish: 'Press two lips tight and release a quick pop: Pan!',
      exampleWord: 'Pan',
      exampleEmoji: '🍳',
      exampleHindi: 'तवा/पैन',
      phoneticHint: 'P-an',
    },
    practiceWords: [
      { wordA: 'Fan', emojiA: '🪭', meaningA: 'पंखा', wordB: 'Pan', emojiB: '🍳', meaningB: 'तवा/पैन' },
      { wordA: 'Fish', emojiA: '🐟', meaningA: 'मछली', wordB: 'Pig', emojiB: '🐷', meaningB: 'सुअर' },
      { wordA: 'Foot', emojiA: '🦶', meaningA: 'पैर', wordB: 'Pot', emojiB: '🍲', meaningB: 'बर्तन' },
      { wordA: 'Fox', emojiA: '🦊', meaningA: 'लोमड़ी', wordB: 'Box', emojiB: '📦', meaningB: 'डिब्बा' },
      { wordA: 'Fry', emojiA: '🍟', meaningA: 'तलना', wordB: 'Pie', emojiB: '🥧', meaningB: 'पाई/केक' },
    ],
  },

  // ==========================================
  // 6. Short A vs Long A (जादुई E का कमाल)
  // ==========================================
  {
    id: 'short-a-vs-long-a',
    title: 'Short A (/æ/) vs Long A (/eɪ/ Magic E)',
    titleHindi: 'Short A (चौड़ा जबड़ा) बनाम Long A (मुस्कुराता असली नाम)',
    contrastExplanationHindi:
      'Hat में जबड़ा नीचे गिरता है और मुँह बहुत चौड़ा खुलता है (/æ/)! Hate में अंत में जादुई "E" आता है, जो A को अपना असली नाम मुस्कुराते हुए (/eɪ/) बोलने की जादुई शक्ति देता है!',
    contrastExplanationEnglish:
      'For Short A (Hat), drop your jaw wide open. For Long A (Hate), the Magic E makes the letter A say its real alphabet name with a wide smile!',
    letterA: {
      letter: 'Short A',
      soundTag: 'चौड़ा खुला जबड़ा (Wide Jaw)',
      soundTagEnglish: 'Drop Chin Wide Open',
      mouthShapeHindi: 'जबड़ा नीचे गिराकर मुँह चौड़ा खोलो',
      mouthShapeEnglish: 'Drop your jaw wide open',
      tipHindi: '💡 जैसे बड़ा सेब खाने के लिए मुँह बड़ा खोलते हैं: Hat!',
      tipEnglish: 'Open mouth wide like biting an apple: Hat!',
      exampleWord: 'Hat',
      exampleEmoji: '🎩',
      exampleHindi: 'टोपी (हैट)',
      phoneticHint: 'H-æ-t',
    },
    letterB: {
      letter: 'Long A',
      soundTag: 'जादुई E मुस्कान (Magic E Name)',
      soundTagEnglish: 'Says Letter Name "A"',
      mouthShapeHindi: 'मुँह खोलकर मुस्कुराते हुए "एई"',
      mouthShapeEnglish: 'Start open and glide to a smile',
      tipHindi: '💡 अंत में शांत "E" है, इसलिए A का पूरा वर्णमाला नाम बोलो: Hate!',
      tipEnglish: 'Magic E is at the end, so say the letter name: Hate!',
      exampleWord: 'Hate',
      exampleEmoji: '😡',
      exampleHindi: 'नापसंद (हेट)',
      phoneticHint: 'H-ay-t',
    },
    practiceWords: [
      { wordA: 'Hat', emojiA: '🎩', meaningA: 'टोपी', wordB: 'Hate', emojiB: '😡', meaningB: 'नापसंद' },
      { wordA: 'Cap', emojiA: '🧢', meaningA: 'टोपी', wordB: 'Cape', emojiB: '🦸', meaningB: 'केप/लबादा' },
      { wordA: 'Mad', emojiA: '😠', meaningA: 'गुस्सा', wordB: 'Made', emojiB: '🏗️', meaningB: 'बनाया' },
      { wordA: 'Tap', emojiA: '🚰', meaningA: 'नल', wordB: 'Tape', emojiB: '📼', meaningB: 'टेप' },
      { wordA: 'Rat', emojiA: '🐀', meaningA: 'चूहा', wordB: 'Rate', emojiB: '🏷️', meaningB: 'कीमत' },
    ],
  },

  // ==========================================
  // 7. Short I vs Long I (पिन बनाम पाइन)
  // ==========================================
  {
    id: 'short-i-vs-long-i',
    title: 'Short I (/ɪ/) vs Long I (/aɪ/ Magic E)',
    titleHindi: 'Short I (त्वरित छोटी इ) बनाम Long I (ऊँचाई वाला आई)',
    contrastExplanationHindi:
      'Pin में पेट से बहुत छोटी और त्वरित "इ" आवाज़ निकलती है। Pine में अंत में शांत "E" आता है, जिससे I अपना असली नाम "आई" बोलता है!',
    contrastExplanationEnglish:
      'Short I is a quick, crisp sound from the middle of the mouth (Pin). Long I glides wide open from "Ah" to "Ee" as it says its own alphabet name (Pine)!',
    letterA: {
      letter: 'Short I',
      soundTag: 'त्वरित छोटी ध्वनि (Quick Short I)',
      soundTagEnglish: 'Quick Relaxed Jaw',
      mouthShapeHindi: 'मुँह हल्का सा खुला, छोटी इ',
      mouthShapeEnglish: 'Mouth relaxed and slightly open',
      tipHindi: '💡 पेट से एकदम छोटी और तेज़ "इ" आवाज़ निकालो: Pin!',
      tipEnglish: 'Make a very quick and relaxed short sound: Pin!',
      exampleWord: 'Pin',
      exampleEmoji: '📌',
      exampleHindi: 'पिन (आलपिन)',
      phoneticHint: 'P-i-n',
    },
    letterB: {
      letter: 'Long I',
      soundTag: 'जादुई E नाम (Says "I")',
      soundTagEnglish: 'Glides Open to Smile',
      mouthShapeHindi: 'मुँह "आ" से "ई" की ओर मुस्कान में',
      mouthShapeEnglish: 'Opens wide then moves to a smile',
      tipHindi: '💡 जैसे हाथ उठाकर "आई" (I का असली नाम) बोलते हैं, पूरा नाम बोलो: Pine!',
      tipEnglish: 'Magic E makes it say the full letter name: Pine!',
      exampleWord: 'Pine',
      exampleEmoji: '🌲',
      exampleHindi: 'पाइन (चीड़ का पेड़)',
      phoneticHint: 'P-eye-n',
    },
    practiceWords: [
      { wordA: 'Pin', emojiA: '📌', meaningA: 'पिन', wordB: 'Pine', emojiB: '🌲', meaningB: 'चीड़ का पेड़' },
      { wordA: 'Kit', emojiA: '🧰', meaningA: 'टूलकिट', wordB: 'Kite', emojiB: '🪁', meaningB: 'पतंग' },
      { wordA: 'Bit', emojiA: '🤏', meaningA: 'थोड़ा', wordB: 'Bite', emojiB: '🍏', meaningB: 'काटना' },
      { wordA: 'Sit', emojiA: '🪑', meaningA: 'बैठना', wordB: 'Site', emojiB: '🌐', meaningB: 'स्थान/वेबसाइट' },
      { wordA: 'Rip', emojiA: '📜', meaningA: 'फाड़ना', wordB: 'Ripe', emojiB: '🍌', meaningB: 'पका हुआ' },
    ],
  },

  // ==========================================
  // 8. Short O vs Long O (हॉप बनाम होप)
  // ==========================================
  {
    id: 'short-o-vs-long-o',
    title: 'Short O (/ɒ/) vs Long O (/oʊ/ Magic E)',
    titleHindi: 'Short O (अंडाकार ऑ) बनाम Long O (छोटा गोल छल्ला ओउ)',
    contrastExplanationHindi:
      'Hop में जबड़ा नीचे आकर मुँह को खुला अंडाकार (Oval) बनाता है "ऑ"। Hope में होंठ आगे आकर एक छोटा गोल छल्ला बनाते हैं और O का पूरा नाम "ओउ" बोलते हैं!',
    contrastExplanationEnglish:
      'For Short O, open your mouth into a tall vertical oval. For Long O, purse your lips forward into a small round circle and say the letter name!',
    letterA: {
      letter: 'Short O',
      soundTag: 'अंडाकार खुला मुँह (Tall Oval)',
      soundTagEnglish: 'Open Tall Oval',
      mouthShapeHindi: 'मुँह को लंबा अंडाकार खोलो',
      mouthShapeEnglish: 'Jaw drops into an open oval shape',
      tipHindi: '💡 मुँह को लंबा अंडाकार खोलकर "ऑ" बोलो: Hop!',
      tipEnglish: 'Open mouth in a tall oval and say the short sound: Hop!',
      exampleWord: 'Hop',
      exampleEmoji: '🦘',
      exampleHindi: 'कूदना (हॉप)',
      phoneticHint: 'H-o-p',
    },
    letterB: {
      letter: 'Long O',
      soundTag: 'छोटा गोल चक्र (Tight Circle)',
      soundTagEnglish: 'Says Letter Name "O"',
      mouthShapeHindi: 'होंठ आगे लाकर छोटा गोल चक्र',
      mouthShapeEnglish: 'Lips push forward into a round circle',
      tipHindi: '💡 होंठों का गोल छल्ला बनाकर O का पूरा नाम बोलो: Hope!',
      tipEnglish: 'Round your lips and say the full letter name: Hope!',
      exampleWord: 'Hope',
      exampleEmoji: '🌟',
      exampleHindi: 'उम्मीद (होप)',
      phoneticHint: 'H-oh-p',
    },
    practiceWords: [
      { wordA: 'Hop', emojiA: '🦘', meaningA: 'कूदना', wordB: 'Hope', emojiB: '🌟', meaningB: 'उम्मीद' },
      { wordA: 'Pot', emojiA: '🍲', meaningA: 'बर्तन', wordB: 'Boat', emojiB: '⛵', meaningB: 'नाव' },
      { wordA: 'Mop', emojiA: '🧹', meaningA: 'पोंछा', wordB: 'Soap', emojiB: '🧼', meaningB: 'साबुन' },
      { wordA: 'Not', emojiA: '🚫', meaningA: 'नहीं', wordB: 'Note', emojiB: '📝', meaningB: 'नोट' },
      { wordA: 'Rob', emojiA: '🦹', meaningA: 'लूटना', wordB: 'Robe', emojiB: '👘', meaningB: 'लबादा' },
    ],
  },
];

