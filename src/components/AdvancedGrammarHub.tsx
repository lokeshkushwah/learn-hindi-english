"use client";

import React, { useState } from 'react';
import { WordAudioButton } from './WordAudioButton';
import { HindiAudioButton } from './HindiAudioButton';
import { soundEffects } from '@/lib/sounds';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  Clock,
  HelpCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Trophy,
  Layers,
  Volume2,
  FileText,
  Repeat,
  Lightbulb,
} from 'lucide-react';

interface AdvancedGrammarHubProps {
  onBackToDashboard?: () => void;
  onNextLesson?: () => void;
}

export function AdvancedGrammarHub({
  onBackToDashboard,
  onNextLesson,
}: AdvancedGrammarHubProps) {
  const { shouldShowHindi, boldEnglish } = useLanguage();
  const showHindi = shouldShowHindi();

  const [activeTab, setActiveTab] = useState<'tenses' | 'conditionals' | 'voice' | 'narration' | 'nonfinite' | 'writing' | 'modals'>('tenses');
  const [tenseFilter, setTenseFilter] = useState<'all' | 'present' | 'past' | 'future'>('all');

  // The 12 Standard English Tenses with Formulas, Examples and Hindi Meaning
  const tensesList = [
    // 1. Present
    {
      id: 'simple-present',
      tenseFamily: 'present',
      nameEnglish: 'Simple Present Tense',
      nameHindi: 'सामान्य वर्तमान काल (ता है, ती है, ते हैं)',
      formula: 'Subject + V1 (s/es) + Object',
      example: 'The boy plays football every day.',
      hindiExample: 'लड़का रोज फुटबॉल खेलता है।',
      speech: 'The boy plays football every day.',
      emoji: '⚽',
      dailyUseBadge: '🌅 Daily Activities / Routine (रोज़मर्रा की आदतें)',
      whenToUseHindi: 'रोज़ की आदतें (Habits), दिनचर्या (Routine) और हमेशा सच रहने वाली बातें (Universal Truth) बताने के लिए।',
      breakdown: {
        subject: 'The boy',
        verb: 'plays (V1 + s)',
        object: 'football',
        extra: 'every day',
        subjectHi: 'लड़का (काम करने वाला कर्ता / Subject)',
        verbHi: 'खेलता है (मुख्य क्रिया / Action Verb)',
        objectHi: 'फुटबॉल (जिस चीज़ से खेल रहा है / Object)',
        extraHi: 'रोज़ (समय / Extension)',
      },
      hint: 'आदतें (Habits) और सामान्य सच बताने के लिए इस्तेमाल होता है।',
    },
    {
      id: 'present-continuous',
      tenseFamily: 'present',
      nameEnglish: 'Present Continuous Tense',
      nameHindi: 'अपूर्ण वर्तमान काल (रहा है, रही है, रहे हैं)',
      formula: 'Subject + is / am / are + V-ing + Object',
      example: 'The girl is reading an interesting book.',
      hindiExample: 'लड़की एक दिलचस्प किताब पढ़ रही है।',
      speech: 'The girl is reading an interesting book.',
      emoji: '📖',
      dailyUseBadge: '🏃 Ongoing Work (काम अभी इसी पल चल रहा है)',
      whenToUseHindi: 'जो काम अभी, बोलते समय जारी है (Ongoing Action) — जैसे अभी किताब पढ़ रही है, अभी खेल रहा है।',
      breakdown: {
        subject: 'The girl',
        helpingVerb: 'is',
        verb: 'reading (V-ing)',
        object: 'an interesting book',
        subjectHi: 'लड़की (पढ़ने वाली / Subject)',
        helpingVerbHi: 'है (वर्तमान सहायक क्रिया / Helping Verb)',
        verbHi: 'पढ़ रही (चल रहा काम / Main Verb)',
        objectHi: 'एक रोचक किताब (कर्म / Object)',
      },
      hint: 'जो काम अभी इसी पल चल रहा है।',
    },
    {
      id: 'present-perfect',
      tenseFamily: 'present',
      nameEnglish: 'Present Perfect Tense',
      nameHindi: 'पूर्ण वर्तमान काल (चुका है, ली है, दिया है)',
      formula: 'Subject + has / have + V3 + Object',
      example: 'I have finished my delicious lunch.',
      hindiExample: 'मैं अपना स्वादिष्ट दोपहर का खाना खा चुका हूँ।',
      speech: 'I have finished my delicious lunch.',
      emoji: '🍱',
      dailyUseBadge: '✅ Just Finished (काम अभी-अभी पूरा हुआ है)',
      whenToUseHindi: 'जो काम अभी-अभी समाप्त हुआ हो और उसका असर या ताज़गी अभी भी मौजूद हो।',
      breakdown: {
        subject: 'I',
        helpingVerb: 'have',
        verb: 'finished (V3)',
        object: 'my delicious lunch',
        subjectHi: 'मैं (कर्ता / Subject)',
        helpingVerbHi: 'have (सहायक क्रिया)',
        verbHi: 'पूरा कर चुका (V3 Third Form)',
        objectHi: 'दोपहर का खाना (कर्म / Object)',
      },
      hint: 'काम अभी-अभी पूरा हुआ है और उसका असर मौजूद है।',
    },
    {
      id: 'present-perfect-cont',
      tenseFamily: 'present',
      nameEnglish: 'Present Perfect Continuous',
      nameHindi: 'पूर्णापूर्ण वर्तमान काल (से ... रहा है)',
      formula: 'Subject + has / have been + V-ing + since / for',
      example: 'It has been raining since morning.',
      hindiExample: 'सुबह से बारिश हो रही है।',
      speech: 'It has been raining since morning.',
      emoji: '🌧️',
      dailyUseBadge: '⏳ Past to Present (पहले शुरू होकर अभी भी जारी)',
      whenToUseHindi: 'जो काम भूतकाल में शुरू हुआ था और अभी भी लगातार चल रहा है।',
      breakdown: {
        subject: 'It',
        helpingVerb: 'has been',
        verb: 'raining (V-ing)',
        extra: 'since morning',
        subjectHi: 'मौसम / It (Subject)',
        helpingVerbHi: 'has been (सहायक क्रिया)',
        verbHi: 'बारिश हो रही (लगातार काम)',
        extraHi: 'सुबह से (समय / Time period)',
      },
      hint: 'काम पहले शुरू हुआ था और अभी भी जारी है।',
    },

    // 2. Past
    {
      id: 'simple-past',
      tenseFamily: 'past',
      nameEnglish: 'Simple Past Tense',
      nameHindi: 'सामान्य भूतकाल (आ, ई, ए / ता था)',
      formula: 'Subject + V2 (Past form) + Object',
      example: 'Yesterday, the dog barked loudly.',
      hindiExample: 'कल कुत्ता जोर से भौंका था।',
      speech: 'Yesterday, the dog barked loudly.',
      emoji: '🐕',
      dailyUseBadge: '⏪ Finished Action (बीता हुआ काम / कल किया था)',
      whenToUseHindi: 'जो काम बीते कल या पुराने समय में पूरी तरह खत्म हो चुका (Finished Action) — जैसे कल कुत्ता भौंका था।',
      breakdown: {
        extra: 'Yesterday',
        subject: 'the dog',
        verb: 'barked (V2)',
        object: 'loudly',
        extraHi: 'कल (बीता हुआ समय)',
        subjectHi: 'कुत्ता (भौंकने वाला कर्ता / Subject)',
        verbHi: 'भौंका था (V2 Past Verb)',
        objectHi: 'ज़ोर से (तरीका / Manner)',
      },
      hint: 'बीते समय में पूरा हो चुका कार्य।',
    },
    {
      id: 'past-continuous',
      tenseFamily: 'past',
      nameEnglish: 'Past Continuous Tense',
      nameHindi: 'अपूर्ण भूतकाल (रहा था, रही थी, रहे थे)',
      formula: 'Subject + was / were + V-ing + Object',
      example: 'The birds were singing in the tall tree.',
      hindiExample: 'चिड़ियाँ ऊँचे पेड़ पर गा रही थीं।',
      speech: 'The birds were singing in the tall tree.',
      emoji: '🌳',
      dailyUseBadge: '⏳ Past Ongoing (बीते समय में जब काम चल रहा था)',
      whenToUseHindi: 'बीते समय में किसी वक्त कोई काम लगातार जारी था — जैसे कल शाम चिड़ियाँ पेड़ पर गा रही थीं।',
      breakdown: {
        subject: 'The birds',
        helpingVerb: 'were',
        verb: 'singing (V-ing)',
        object: 'in the tall tree',
        subjectHi: 'चिड़ियाँ (बहुवचन कर्ता / Subject)',
        helpingVerbHi: 'were (भूतकाल सहायक क्रिया = थीं)',
        verbHi: 'गा रही (बीते समय का जारी काम)',
        objectHi: 'ऊँचे पेड़ पर (स्थान / Place)',
      },
      hint: 'बीते समय में कोई काम चल रहा था।',
    },
    {
      id: 'past-perfect',
      tenseFamily: 'past',
      nameEnglish: 'Past Perfect Tense',
      nameHindi: 'पूर्ण भूतकाल (चुका था, चुकी थी, चुके थे)',
      formula: 'Subject + had + V3 + Object',
      example: 'The train had left before we reached.',
      hindiExample: 'हमारे पहुँचने से पहले ट्रेन जा चुकी थी।',
      speech: 'The train had left before we reached.',
      emoji: '🚆',
      dailyUseBadge: '⏮️ Past before Past (भूतकाल के भी पहले हुआ काम)',
      whenToUseHindi: 'बीते समय के किसी दूसरे काम से पहले ही समाप्त हो चुका कार्य।',
      breakdown: {
        subject: 'The train',
        helpingVerb: 'had',
        verb: 'left (V3)',
        extra: 'before we reached',
        subjectHi: 'ट्रेन (Subject)',
        helpingVerbHi: 'had (सहायक क्रिया)',
        verbHi: 'जा चुकी थी (V3 Third Form)',
        extraHi: 'हमारे पहुँचने से पहले (दूसरी घटना)',
      },
      hint: 'बीते समय में किसी दूसरे काम से पहले समाप्त हुआ काम।',
    },
    {
      id: 'past-perfect-cont',
      tenseFamily: 'past',
      nameEnglish: 'Past Perfect Continuous',
      nameHindi: 'पूर्णापूर्ण भूतकाल (से ... रहा था)',
      formula: 'Subject + had been + V-ing + since / for',
      example: 'He had been studying for two hours.',
      hindiExample: 'वह दो घंटे से पढ़ाई कर रहा था।',
      speech: 'He had been studying for two hours.',
      emoji: '📚',
      dailyUseBadge: '⌛ Past Ongoing Duration (बीते समय में कितनी देर से चल रहा था)',
      whenToUseHindi: 'बीते समय में किसी निश्चित समय तक लगातार जारी रहने वाला कार्य।',
      breakdown: {
        subject: 'He',
        helpingVerb: 'had been',
        verb: 'studying (V-ing)',
        extra: 'for two hours',
        subjectHi: 'वह (Subject / Pronoun)',
        helpingVerbHi: 'had been (सहायक क्रिया)',
        verbHi: 'पढ़ाई कर रहा था (लगातार काम)',
        extraHi: 'दो घंटे से (अवधि / Duration)',
      },
      hint: 'बीते समय में किसी बिंदु तक जारी रहने वाला कार्य।',
    },

    // 3. Future
    {
      id: 'simple-future',
      tenseFamily: 'future',
      nameEnglish: 'Simple Future Tense',
      nameHindi: 'सामान्य भविष्यत् काल (गा, गी, गे)',
      formula: 'Subject + will + V1 + Object',
      example: 'Tomorrow, I will visit my grandmother.',
      hindiExample: 'कल मैं अपनी दादी से मिलने जाऊँगा।',
      speech: 'Tomorrow, I will visit my grandmother.',
      emoji: '👵',
      dailyUseBadge: '🔮 Future Plans (आने वाले कल में होने वाला काम)',
      whenToUseHindi: 'आने वाले कल में जो काम हम करने की योजना बना रहे हैं — जैसे कल मैं दादी के घर जाऊँगा।',
      breakdown: {
        extra: 'Tomorrow',
        subject: 'I',
        helpingVerb: 'will',
        verb: 'visit (V1)',
        object: 'my grandmother',
        extraHi: 'कल (आने वाला समय)',
        subjectHi: 'मैं (कर्ता / Subject)',
        helpingVerbHi: 'will (भविष्य की सहायक क्रिया)',
        verbHi: 'मिलने जाऊँगा (V1 Base Form)',
        objectHi: 'मेरी दादी (कर्म / Object)',
      },
      hint: 'आने वाले समय में होने वाला काम।',
    },
    {
      id: 'future-continuous',
      tenseFamily: 'future',
      nameEnglish: 'Future Continuous Tense',
      nameHindi: 'अपूर्ण भविष्यत् काल (रहा होगा, रही होगी)',
      formula: 'Subject + will be + V-ing + Object',
      example: 'At 5 PM, they will be playing football.',
      hindiExample: 'शाम 5 बजे वे फुटबॉल खेल रहे होंगे।',
      speech: 'At 5 PM, they will be playing football.',
      emoji: '🏃',
      dailyUseBadge: '⏰ Future Ongoing (भविष्य में उस समय चल रहा काम)',
      whenToUseHindi: 'भविष्य में किसी निश्चित समय पर जारी रहने वाला काम — जैसे शाम 5 बजे वे खेल रहे होंगे।',
      breakdown: {
        extra: 'At 5 PM',
        subject: 'they',
        helpingVerb: 'will be',
        verb: 'playing (V-ing)',
        object: 'football',
        extraHi: 'शाम 5 बजे (निश्चित समय)',
        subjectHi: 'वे (Subject / Pronoun)',
        helpingVerbHi: 'will be (सहायक क्रिया)',
        verbHi: 'खेल रहे होंगे (V-ing)',
        objectHi: 'फुटबॉल (Object)',
      },
      hint: 'भविष्य में किसी निश्चित समय पर जारी रहने वाला काम।',
    },
    {
      id: 'future-perfect',
      tenseFamily: 'future',
      nameEnglish: 'Future Perfect Tense',
      nameHindi: 'पूर्ण भविष्यत् काल (चुका होगा, चुकी होगी)',
      formula: 'Subject + will have + V3 + Object',
      example: 'By sunset, we will have completed the project.',
      hindiExample: 'सूर्यास्त तक हम प्रोजेक्ट पूरा कर चुके होंगे।',
      speech: 'By sunset, we will have completed the project.',
      emoji: '🌅',
      dailyUseBadge: '🏁 Future Completion (भविष्य में तय समय तक पूरा हो चुका काम)',
      whenToUseHindi: 'भविष्य के किसी समय तक समाप्त हो जाने वाला काम।',
      breakdown: {
        extra: 'By sunset',
        subject: 'we',
        helpingVerb: 'will have',
        verb: 'completed (V3)',
        object: 'the project',
        extraHi: 'सूर्यास्त तक (अंतिम सीमा)',
        subjectHi: 'हम (Subject)',
        helpingVerbHi: 'will have (सहायक क्रिया)',
        verbHi: 'पूरा कर चुके होंगे (V3 Form)',
        objectHi: 'प्रोजेक्ट (Object)',
      },
      hint: 'भविष्य के किसी समय तक समाप्त हो जाने वाला काम।',
    },
    {
      id: 'future-perfect-cont',
      tenseFamily: 'future',
      nameEnglish: 'Future Perfect Continuous',
      nameHindi: 'पूर्णापूर्ण भविष्यत् काल (से ... रहा होगा)',
      formula: 'Subject + will have been + V-ing + since / for',
      example: 'By next year, she will have been living here for 5 years.',
      hindiExample: 'अगले साल तक वह यहाँ 5 साल से रह रही होगी।',
      speech: 'By next year, she will have been living here for 5 years.',
      emoji: '🏡',
      dailyUseBadge: '📅 Future Continued Duration (भविष्य में समय अवधि)',
      whenToUseHindi: 'भविष्य के किसी समय तक किसी काम के जारी रहने की अवधि।',
      breakdown: {
        extra: 'By next year',
        subject: 'she',
        helpingVerb: 'will have been',
        verb: 'living (V-ing)',
        object: 'here for 5 years',
        extraHi: 'अगले साल तक (भविष्य की सीमा)',
        subjectHi: 'वह (Subject / She)',
        helpingVerbHi: 'will have been',
        verbHi: 'रह रही होगी',
        objectHi: 'यहाँ 5 वर्षों से (अवधि)',
      },
      hint: 'भविष्य के किसी बिंदु तक किसी समय अवधि से जारी रहने वाला काम।',
    },
  ];

  const filteredTenses =
    tenseFilter === 'all'
      ? tensesList
      : tensesList.filter((t) => t.tenseFamily === tenseFilter);

  // Conditionals Data
  const conditionalsList = [
    {
      type: 'Zero Conditional (General Truth - सामान्य सत्य)',
      rule: 'If + Simple Present, ... Simple Present',
      example: 'If you heat ice, it melts.',
      hindi: 'यदि आप बर्फ को गर्म करते हैं, तो वह पिघलती है।',
      speech: 'If you heat ice, it melts.',
      emoji: '🧊',
      badge: '100% Fact',
    },
    {
      type: 'First Conditional (Real Future - भविष्य की वास्तविक संभावना)',
      rule: 'If + Simple Present, ... will + V1',
      example: 'If it rains tomorrow, we will stay at home.',
      hindi: 'यदि कल बारिश होगी, तो हम घर पर ही रहेंगे।',
      speech: 'If it rains tomorrow, we will stay at home.',
      emoji: '🌧️',
      badge: 'Likely Future',
    },
    {
      type: 'Second Conditional (Imaginary Dream - काल्पनिक सपना)',
      rule: 'If + Simple Past, ... would + V1',
      example: 'If I were a bird, I would fly in the blue sky.',
      hindi: 'यदि मैं एक चिड़िया होता, तो नीले आसमान में उड़ता।',
      speech: 'If I were a bird, I would fly in the blue sky.',
      emoji: '🦅',
      badge: 'Dream / Wish',
    },
    {
      type: 'Third Conditional (Unreal Past - बीती हुई काल्पनिक शर्त)',
      rule: 'If + Past Perfect (had + V3), ... would have + V3',
      example: 'If you had studied hard, you would have passed.',
      hindi: 'यदि आपने कठिन पढ़ाई की होती, तो आप परीक्षा पास कर लेते।',
      speech: 'If you had studied hard, you would have passed.',
      emoji: '🎓',
      badge: 'Unreal Past',
    },
  ];

  // Direct vs Indirect Speech (Narration)
  const narrationPairs = [
    {
      topic: 'Statement 1: Present Simple ➔ Past Simple',
      directSentence: 'Rohan said, "I like ice cream."',
      directHindi: 'रोहन ने कहा, "मुझे आइसक्रीम पसंद है।" (Direct Speech)',
      indirectSentence: 'Rohan said that he liked ice cream.',
      indirectHindi: 'रोहन ने कहा कि उसे आइसक्रीम पसंद थी। (Indirect Speech)',
      emoji: '🍦',
      rule: 'like ➔ liked | Pronoun: I ➔ he',
    },
    {
      topic: 'Statement 2: Universal Truth (No change)',
      directSentence: 'The teacher said, "The sun rises in the east."',
      directHindi: 'अध्यापक ने कहा, "सूर्य पूर्व में उगता है।"',
      indirectSentence: 'The teacher said that the sun rises in the east.',
      indirectHindi: 'अध्यापक ने कहा कि सूर्य पूर्व में उगता है। (सत्य होने के कारण काल नहीं बदलता)',
      emoji: '🌅',
      rule: 'Universal facts remain in Present Tense',
    },
    {
      topic: 'Statement 3: Helping Verb Shift (am ➔ was)',
      directSentence: 'Kavya said, "I am reading a story."',
      directHindi: 'काव्या ने कहा, "मैं कहानी पढ़ रही हूँ।"',
      indirectSentence: 'Kavya said that she was reading a story.',
      indirectHindi: 'काव्या ने कहा कि वह कहानी पढ़ रही थी।',
      emoji: '📖',
      rule: 'am ➔ was | I ➔ she',
    },
  ];

  // Non-Finite Verbs (Infinitives, Gerunds, Participles)
  const nonFiniteList = [
    {
      term: 'Infinitives (to + Verb)',
      sub: 'जब क्रिया से पहले "to" लगाकर इच्छा या उद्देश्य बताया जाए',
      example: 'I want to dance with my friends.',
      hindi: 'मैं अपने दोस्तों के साथ नाचना (to dance) चाहता हूँ।',
      emoji: '💃',
      rule: 'to + V1 (to dance, to eat, to learn)',
    },
    {
      term: 'Gerunds (Verb + -ing acting as Noun)',
      sub: 'जब क्रिया में -ing लगकर वह संज्ञा (काम का नाम) बन जाए',
      example: 'Swimming is a healthy exercise for children.',
      hindi: 'तैरना (Swimming) बच्चों के लिए एक अच्छा व्यायाम है।',
      emoji: '🏊‍♂️',
      rule: 'V-ing as Subject / Noun (Reading, Swimming)',
    },
    {
      term: 'Participles (Verbal Adjectives)',
      sub: 'जब क्रिया किसी संज्ञा की विशेषता बताने वाला विशेषण बन जाए',
      example: 'We saw a singing bird in the tall tree.',
      hindi: 'हमने ऊँचे पेड़ पर एक गाती हुई चिड़िया (singing bird) देखी।',
      emoji: '🐦',
      rule: 'Present Participle (-ing) or Past Participle (-ed/-en)',
    },
  ];

  // Active vs Passive Voice Data
  const voicePairs = [
    {
      topic: 'Action 1: Kicking the ball',
      activeSentence: 'The energetic boy kicks the ball.',
      activeHindi: 'ऊर्जावान लड़का गेंद को किक मारता है। (Subject काम कर रहा है)',
      passiveSentence: 'The ball is kicked by the energetic boy.',
      passiveHindi: 'गेंद लड़के द्वारा किक की जाती है। (Object पर काम हो रहा है)',
      emoji: '⚽',
      rule: 'Active: Doer does the action | Passive: Action is received by object',
    },
    {
      topic: 'Action 2: Eating an apple',
      activeSentence: 'The happy girl eats a sweet apple.',
      activeHindi: 'खुश लड़की मीठा सेब खाती है।',
      passiveSentence: 'A sweet apple is eaten by the happy girl.',
      passiveHindi: 'मीठा सेब खुश लड़की द्वारा खाया जाता है।',
      emoji: '🍎',
      rule: 'is / am / are + V3 (eaten)',
    },
    {
      topic: 'Action 3: Writing a letter',
      activeSentence: 'Rahul wrote a beautiful letter yesterday.',
      activeHindi: 'राहुल ने कल एक सुंदर पत्र लिखा था।',
      passiveSentence: 'A beautiful letter was written by Rahul yesterday.',
      passiveHindi: 'राहुल द्वारा कल एक सुंदर पत्र लिखा गया था।',
      emoji: '✉️',
      rule: 'was / were + V3 (written)',
    },
  ];

  // Paragraph Writing 4-Step Formula
  const paragraphSteps = [
    {
      step: 'Step 1: Topic Sentence (शुरुआती मुख्य विचार)',
      english: 'My pet dog, Bruno, is my sweetest best friend.',
      hindi: 'मेरा पालतू कुत्ता, ब्रूनो, मेरा सबसे प्यारा सच्चा दोस्त है।',
      emoji: '🐶',
      tip: 'पहला वाक्य बताता है कि पैराग्राफ किस बारे में है।',
    },
    {
      step: 'Step 2: Detail Sentence 1 (पहला विवरण)',
      english: 'He has soft brown fur and loves to fetch colorful balls in the park.',
      hindi: 'उसके रेशमी भूरे बाल हैं और उसे पार्क में रंग-बिरंगी गेंदें लाना पसंद है।',
      emoji: '🎾',
      tip: 'अपने विषय के बारे में कोई ख़ास खूबी बताएं।',
    },
    {
      step: 'Step 3: Detail Sentence 2 (दूसरा विवरण)',
      english: 'Every afternoon, he wags his tail happily when I come home from school.',
      hindi: 'हर दोपहर जब मैं स्कूल से घर आता हूँ, तो वह खुशी से पूँछ हिलाता है।',
      emoji: '🎒',
      tip: 'एक और मज़ेदार बात या दैनिक आदत जोड़ें।',
    },
    {
      step: 'Step 4: Concluding Sentence (अंतिम निष्कर्ष)',
      english: 'I love Bruno very much because he always brings joy to our family.',
      hindi: 'मैं ब्रूनो से बहुत प्यार करता हूँ क्योंकि वह हमेशा हमारे परिवार में खुशियाँ लाता है।',
      emoji: '💖',
      tip: 'पैराग्राफ को एक सुंदर निष्कर्ष और भावना के साथ समाप्त करें।',
    },
  ];

  // Modal Verbs Reference Dataset (Can, Could, Should, Must, May, Would)
  const modalVerbsList = [
    {
      id: 'modal-can',
      nameEnglish: 'CAN (Ability & Power)',
      nameHindi: 'सकता है / कर सकता है (शारीरिक या मानसिक क्षमता)',
      emoji: '🦅',
      formula: 'Subject + CAN + V1 (Base Verb) + Object',
      example: 'Birds can fly high in the blue sky.',
      hindiExample: 'पक्षी नीले आकाश में ऊँचा उड़ सकते हैं।',
      dailyUseBadge: '💪 Physical & Mental Ability (क्षमता व सामर्थ्य)',
      whenToUseHindi: 'जब किसी काम को करने की शारीरिक क्षमता या हुनर बताना हो। CAN के बाद हमेशा V1 आता है।',
      goldenRuleHindi: 'नियम: I can swim (सही) • I can to swim (गलत)। कभी "to" न जोड़ें!',
      breakdown: {
        subject: 'Birds (पक्षी - कर्ता)',
        modal: 'can (सकते हैं - मोडल क्रिया)',
        verb: 'fly (उड़ना - V1 Base Verb)',
        object: 'high in the blue sky (स्थान व कर्म)',
      },
    },
    {
      id: 'modal-could',
      nameEnglish: 'COULD (Polite Request & Past Ability)',
      nameHindi: 'क्या आप... सकेंगे (अत्यधिक विनम्र निवेदन / भूतकाल की क्षमता)',
      emoji: '✨',
      formula: 'COULD + Subject + please + V1 + Object? (Polite Request)',
      example: 'Could you please pass the story book to me?',
      hindiExample: 'क्या आप कृपया वह कहानी की किताब मुझे दे सकते हैं?',
      dailyUseBadge: '🙏 Polite Request (आदरपूर्वक निवेदन)',
      whenToUseHindi: 'वर्तमान में किसी से अत्यधिक विनम्रता और आदर से कुछ माँगने या पूछने के लिए CAN की जगह COULD इस्तेमाल करें।',
      goldenRuleHindi: 'Could you please help me? (अत्यंत शिष्ट और सभ्य भाषा)।',
      breakdown: {
        modal: 'Could (विनम्र आग्रह)',
        subject: 'you (आप - कर्ता)',
        verb: 'pass (देना/आगे बढ़ाना - V1)',
        object: 'the story book to me (कर्म)',
      },
    },
    {
      id: 'modal-should',
      nameEnglish: 'SHOULD (Good Advice & Duty)',
      nameHindi: 'चाहिए (अच्छी सलाह, स्वास्थ्य व नैतिक कर्तव्य)',
      emoji: '💡',
      formula: 'Subject + SHOULD + V1 (Base Verb) + Object',
      example: 'You should brush your teeth every night.',
      hindiExample: 'तुम्हें हर रात अपने दाँत साफ़ करने चाहिए।',
      dailyUseBadge: '🩺 Good Advice & Healthy Habits (नेक सलाह)',
      whenToUseHindi: 'जब किसी को कोई अच्छी सलाह (Advice), स्वास्थ्य लाभ या नैतिक कर्तव्य बताना हो।',
      goldenRuleHindi: 'You should sleep early. (तुम्हें जल्दी सोना चाहिए)।',
      breakdown: {
        subject: 'You (तुम्हें - कर्ता)',
        modal: 'should (चाहिए - मोडल क्रिया)',
        verb: 'brush (साफ़ करना - V1)',
        object: 'your teeth every night (कर्म)',
      },
    },
    {
      id: 'modal-must',
      nameEnglish: 'MUST (Strict Rule & Law)',
      nameHindi: 'अवश्य चाहिए / हर हाल में (सख्त क़ानून व अनिवार्यता)',
      emoji: '🛑',
      formula: 'Subject + MUST + V1 (Base Verb) + Object',
      example: 'Drivers must stop at the red traffic light.',
      hindiExample: 'चालकों को लाल बत्ती पर अवश्य रुकना चाहिए।',
      dailyUseBadge: '⚖️ 100% Strict Rule & Law (सख्त नियम / नो ऑप्शन)',
      whenToUseHindi: 'जहाँ कोई विकल्प नहीं है—क़ानून, सुरक्षा या जीवन रक्षा का सख्त नियम है, वहाँ MUST लगता है।',
      goldenRuleHindi: 'We must wear a helmet on the road. (हेलमेट पहनना कोई सुझाव नहीं, पक्का नियम है)।',
      breakdown: {
        subject: 'Drivers (चालक - कर्ता)',
        modal: 'must (अवश्य - मोडल क्रिया)',
        verb: 'stop (रुकना - V1)',
        object: 'at the red traffic light (स्थान/नियम)',
      },
    },
    {
      id: 'modal-may',
      nameEnglish: 'MAY (Polite Permission & Possibility)',
      nameHindi: 'क्या मैं... सकूँ (कक्षा में शिष्ट आज्ञा व संभावना)',
      emoji: '🙋‍♂️',
      formula: 'MAY + Subject + V1 (Base Verb) + Object?',
      example: 'May I drink some cold water please?',
      hindiExample: 'क्या मैं थोड़ा ठंडा पानी पी सकता हूँ कृपया?',
      dailyUseBadge: '🏫 Classroom Permission (कक्षा में शिष्ट आज्ञा)',
      whenToUseHindi: 'स्कूल में शिक्षक से या घर में बड़ों से शिष्टाचारपूर्वक अनुमति (Permission) माँगने के लिए।',
      goldenRuleHindi: 'May I come in, sir? (क्या मैं अंदर आ सकता हूँ, सर?)।',
      breakdown: {
        modal: 'May (इजाज़त - मोडल क्रिया)',
        subject: 'I (मैं - कर्ता)',
        verb: 'drink (पीना - V1)',
        object: 'some cold water please',
      },
    },
    {
      id: 'modal-would',
      nameEnglish: 'WOULD / WOULD LIKE TO (Polite Wish)',
      nameHindi: 'चाहूँगा / पसंद करूँगा (सभ्य इच्छा व शिष्टाचार)',
      emoji: '👑',
      formula: 'Subject + WOULD LIKE TO + V1 + Object',
      example: 'I would like to eat a sweet mango today.',
      hindiExample: 'मैं आज एक मीठा आम खाना चाहूँगा।',
      dailyUseBadge: '🎩 Polite Expression (सभ्य इच्छा प्रकटीकरण)',
      whenToUseHindi: '“I want” (मुझे चाहिए) बोलने के बजाय “I would like” बोलना बहुत सभ्य और संस्कारी माना जाता है।',
      goldenRuleHindi: 'I would like a glass of water, please.',
      breakdown: {
        subject: 'I (मैं - कर्ता)',
        modal: 'would like to (चाहूँगा - मोडल क्रिया)',
        verb: 'eat (खाना - V1)',
        object: 'a sweet mango today (कर्म)',
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Hero Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-yellow-100 font-bold text-xs uppercase tracking-wider">
            <span>Level 10 • Comprehensive Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Advanced English Learning Hub 🎓
          </h2>
          <p className="text-sm sm:text-base font-semibold text-amber-100">
            {showHindi
              ? 'यहाँ सभी 12 काल (Tenses), शर्त वाले वाक्य (Conditionals), Active-Passive Voice और पैराग्राफ लिखना विस्तार से सीखें!'
              : 'Master all 12 tenses, conditionals, active/passive voice, and paragraph writing with audio and rules!'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onBackToDashboard();
              }}
              className="px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/30 transition-all active:scale-95"
            >
              ← All Levels
            </button>
          )}
          {onNextLesson && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onNextLesson();
              }}
              className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Next Game 🚀</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Mode Selector Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-amber-50 p-1.5 rounded-2xl border-2 border-amber-200">
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('tenses');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'tenses'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-900" />
          <span>1. The 12 Tenses Chart (12 काल)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('conditionals');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'conditionals'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>2. Conditionals (If... शर्त वाले वाक्य)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('voice');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'voice'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <Repeat className="w-4 h-4 text-purple-600" />
          <span>3. Active vs Passive Voice</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('narration');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'narration'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>4. Narration (Direct/Indirect)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('nonfinite');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'nonfinite'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <Layers className="w-4 h-4 text-pink-600" />
          <span>5. Non-Finite (Gerunds & Infinitives)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('writing');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'writing'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>6. Paragraph Writing (पैराग्राफ लेखन)</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveTab('modals');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'modals'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/80'
          }`}
        >
          <Sparkles className="w-4 h-4 text-fuchsia-600" />
          <span>7. Modal Verbs (Can, Could, Should, Must...)</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: THE 12 TENSES MASTER EXPLORER
          ======================================================== */}
      {activeTab === 'tenses' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Sub-filter: All / Present / Past / Future */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-stone-200">
            <div>
              <h3 className="text-base font-black text-stone-900">
                12 Tense Patterns Reference Guide ⏱️
              </h3>
              <p className="text-xs font-semibold text-stone-500 font-hindi">
                काल का प्रकार चुनें और बोलकर अभ्यास करें
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setTenseFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  tenseFilter === 'all'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                All 12 Tenses
              </button>
              <button
                onClick={() => setTenseFilter('present')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  tenseFilter === 'present'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                Present (4)
              </button>
              <button
                onClick={() => setTenseFilter('past')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  tenseFilter === 'past'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                Past (4)
              </button>
              <button
                onClick={() => setTenseFilter('future')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  tenseFilter === 'future'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                Future (4)
              </button>
            </div>
          </div>

          {/* Grid of Tense Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTenses.map((tense) => (
              <div
                key={tense.id}
                className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">
                        {tense.emoji}
                      </span>
                      <div>
                        <h4 className="text-base font-black text-stone-900 leading-tight">
                          {tense.nameEnglish}
                        </h4>
                        {showHindi && (
                          <span className="text-xs font-hindi text-amber-800 font-semibold block leading-tight">
                            {tense.nameHindi}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-stone-100 text-stone-600">
                      {tense.tenseFamily}
                    </span>
                  </div>

                  {/* Daily Activity / Use-Case Badge */}
                  {tense.dailyUseBadge && (
                    <div className="bg-amber-100/80 border border-amber-300 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs font-black text-amber-950">
                      <span>{tense.dailyUseBadge}</span>
                    </div>
                  )}

                  {/* When to use in simple Hindi */}
                  {showHindi && tense.whenToUseHindi && (
                    <p className="text-xs font-hindi text-stone-700 font-semibold bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                      🎯 <strong>कब इस्तेमाल करें?</strong> {tense.whenToUseHindi}
                    </p>
                  )}

                  {/* Formula Box */}
                  <div className="bg-amber-50 border border-amber-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-950 flex items-center gap-1.5">
                    <span className="text-[10px] font-sans font-black uppercase bg-amber-200 px-1.5 py-0.5 rounded text-amber-900">
                      Formula
                    </span>
                    <span>{tense.formula}</span>
                  </div>

                  {/* Example Sentence with Audio */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        “{tense.example}”
                      </p>
                      <WordAudioButton text={tense.speech} size="sm" />
                    </div>

                    {showHindi && (
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200/60">
                        <p className="text-xs font-hindi text-stone-600 font-medium">
                          {tense.hindiExample}
                        </p>
                        <HindiAudioButton text={tense.hindiExample} size="sm" />
                      </div>
                    )}
                  </div>

                  {/* S + V + O Breakdown (Subject, Verb, Object विश्लेषण) */}
                  {tense.breakdown && (
                    <div className="bg-white border-2 border-dashed border-amber-300 rounded-2xl p-3 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block font-hindi">
                        🔍 वाक्य विश्लेषण (कौन Subject है, कौन Verb, कौन Object?):
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {tense.breakdown.extra && (
                          <div className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-[11px] font-bold text-stone-800">
                            <span className="text-[9px] uppercase block text-stone-500">Time / Extra</span>
                            <span>{tense.breakdown.extra}</span>
                          </div>
                        )}
                        <div className="px-2.5 py-1 rounded-lg bg-blue-100 border border-blue-300 text-[11px] font-black text-blue-900">
                          <span className="text-[9px] uppercase block text-blue-600 font-sans">Subject (कर्ता)</span>
                          <span>{tense.breakdown.subject}</span>
                        </div>
                        {tense.breakdown.helpingVerb && (
                          <div className="px-2.5 py-1 rounded-lg bg-orange-100 border border-orange-300 text-[11px] font-black text-orange-900">
                            <span className="text-[9px] uppercase block text-orange-600 font-sans">Helping Verb (सहायक)</span>
                            <span>{tense.breakdown.helpingVerb}</span>
                          </div>
                        )}
                        <div className="px-2.5 py-1 rounded-lg bg-rose-100 border border-rose-300 text-[11px] font-black text-rose-900">
                          <span className="text-[9px] uppercase block text-rose-600 font-sans">Main Verb (क्रिया)</span>
                          <span>{tense.breakdown.verb}</span>
                        </div>
                        {tense.breakdown.object && (
                          <div className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-[11px] font-black text-emerald-900">
                            <span className="text-[9px] uppercase block text-emerald-600 font-sans">Object (कर्म)</span>
                            <span>{tense.breakdown.object}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] font-hindi text-stone-600 space-y-0.5 pt-1 border-t border-stone-100">
                        <p>🔵 <strong>Subject:</strong> {tense.breakdown.subjectHi}</p>
                        <p>🔴 <strong>Verb:</strong> {tense.breakdown.verbHi}</p>
                        {tense.breakdown.objectHi && <p>🟢 <strong>Object:</strong> {tense.breakdown.objectHi}</p>}
                      </div>
                    </div>
                  )}

                  {/* Kid-friendly tip */}
                  <div className="text-[11px] text-stone-500 font-hindi flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{tense.hint}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================
          TAB 2: CONDITIONALS (IF... THEN...)
          ======================================================== */}
      {activeTab === 'conditionals' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white p-5 rounded-3xl border-2 border-stone-200">
            <h3 className="text-lg font-black text-stone-900">
              Conditionals: "If..." शर्त वाले वाक्य 🔮
            </h3>
            <p className="text-xs font-hindi text-stone-600 mt-1 leading-relaxed">
              जब कोई काम किसी शर्त (condition) पर निर्भर करता है, तो हम 'If' का प्रयोग करते हैं। जैसे: यदि आप मेहनत करेंगे, तो सफल होंगे।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conditionalsList.map((cond, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border-2 border-orange-200 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{cond.emoji}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-orange-100 text-orange-900 rounded-full">
                      {cond.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-stone-900 leading-tight">
                    {cond.type}
                  </h4>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-orange-950">
                    {cond.rule}
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        “{cond.example}”
                      </p>
                      <WordAudioButton text={cond.speech} size="sm" />
                    </div>

                    {showHindi && (
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200">
                        <p className="text-xs font-hindi text-stone-600">
                          {cond.hindi}
                        </p>
                        <HindiAudioButton text={cond.hindi} size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================
          TAB 3: ACTIVE VS PASSIVE VOICE
          ======================================================== */}
      {activeTab === 'voice' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white p-5 rounded-3xl border-2 border-stone-200">
            <h3 className="text-lg font-black text-stone-900">
              Active vs Passive Voice (सक्रिय और कर्मवाच्य) 🔄
            </h3>
            <p className="text-xs font-hindi text-stone-600 mt-1 leading-relaxed">
              Active Voice में काम करने वाला (Subject) आगे होता है। Passive Voice में जिस चीज़ पर काम हुआ (Object), उसे आगे रखकर वाक्य बनाया जाता है।
            </p>
          </div>

          <div className="space-y-4">
            {voicePairs.map((pair, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{pair.emoji}</span>
                    <h4 className="text-sm font-black text-purple-950">{pair.topic}</h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-purple-100 text-purple-900 rounded-full">
                    {pair.rule}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* Active Card */}
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2">
                    <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase rounded-md">
                      Active Voice
                    </span>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        {pair.activeSentence}
                      </p>
                      <WordAudioButton text={pair.activeSentence} size="sm" />
                    </div>
                    {showHindi && (
                      <p className="text-xs font-hindi text-emerald-800 border-t border-emerald-200/60 pt-1">
                        {pair.activeHindi}
                      </p>
                    )}
                  </div>

                  {/* Passive Card */}
                  <div className="bg-purple-50 border border-purple-300 rounded-2xl p-4 space-y-2">
                    <span className="px-2 py-0.5 bg-purple-200 text-purple-900 text-[10px] font-black uppercase rounded-md">
                      Passive Voice
                    </span>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        {pair.passiveSentence}
                      </p>
                      <WordAudioButton text={pair.passiveSentence} size="sm" />
                    </div>
                    {showHindi && (
                      <p className="text-xs font-hindi text-purple-800 border-t border-purple-200/60 pt-1">
                        {pair.passiveHindi}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================
          TAB 4: DIRECT AND INDIRECT SPEECH (NARRATION)
          ======================================================== */}
      {activeTab === 'narration' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white p-5 rounded-3xl border-2 border-stone-200">
            <h3 className="text-lg font-black text-stone-900">
              Direct & Indirect Speech (कथन और वर्णन) 🗣️
            </h3>
            <p className="text-xs font-hindi text-stone-600 mt-1 leading-relaxed">
              जब किसी की बात को ज्यों का त्यों इनवर्टेड कॉमा में कहा जाए तो वह Direct Speech है। जब उसी बात को अपने शब्दों में कहा जाए तो वह Indirect Speech है।
            </p>
          </div>

          <div className="space-y-4">
            {narrationPairs.map((pair, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{pair.emoji}</span>
                    <h4 className="text-sm font-black text-blue-950">{pair.topic}</h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-blue-100 text-blue-900 rounded-full">
                    {pair.rule}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* Direct Card */}
                  <div className="bg-sky-50 border border-sky-300 rounded-2xl p-4 space-y-2">
                    <span className="px-2 py-0.5 bg-sky-200 text-sky-900 text-[10px] font-black uppercase rounded-md">
                      Direct Speech
                    </span>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        {pair.directSentence}
                      </p>
                      <WordAudioButton text={pair.directSentence} size="sm" />
                    </div>
                    {showHindi && (
                      <p className="text-xs font-hindi text-sky-800 border-t border-sky-200/60 pt-1">
                        {pair.directHindi}
                      </p>
                    )}
                  </div>

                  {/* Indirect Card */}
                  <div className="bg-indigo-50 border border-indigo-300 rounded-2xl p-4 space-y-2">
                    <span className="px-2 py-0.5 bg-indigo-200 text-indigo-900 text-[10px] font-black uppercase rounded-md">
                      Indirect Speech
                    </span>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        {pair.indirectSentence}
                      </p>
                      <WordAudioButton text={pair.indirectSentence} size="sm" />
                    </div>
                    {showHindi && (
                      <p className="text-xs font-hindi text-indigo-800 border-t border-indigo-200/60 pt-1">
                        {pair.indirectHindi}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================
          TAB 5: NON-FINITE VERBS (GERUNDS & INFINITIVES)
          ======================================================== */}
      {activeTab === 'nonfinite' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white p-5 rounded-3xl border-2 border-stone-200">
            <h3 className="text-lg font-black text-stone-900">
              Non-Finite Verbs: Infinitives, Gerunds & Participles 🌟
            </h3>
            <p className="text-xs font-hindi text-stone-600 mt-1 leading-relaxed">
              Non-Finite क्रियाएँ काल (Tense) या कर्ता के बदलने से अपना रूप नहीं बदलती हैं। जैसे: "to dance" (Infinitive), "Swimming" (Gerund), "singing bird" (Participle)।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nonFiniteList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border-2 border-pink-200 shadow-sm flex flex-col justify-between gap-3"
              >
                <div className="space-y-2.5">
                  <span className="text-3xl">{item.emoji}</span>
                  <h4 className="text-base font-black text-stone-900">{item.term}</h4>
                  <p className="text-xs font-hindi text-stone-500 font-medium">{item.sub}</p>

                  <div className="bg-pink-50 border border-pink-200 rounded-xl px-2.5 py-1 text-xs font-mono font-bold text-pink-950">
                    Rule: {item.rule}
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        “{item.example}”
                      </p>
                      <WordAudioButton text={item.example} size="sm" />
                    </div>
                    {showHindi && (
                      <p className="text-xs font-hindi text-stone-600 border-t border-stone-200 pt-1">
                        {item.hindi}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================
          TAB 6: PARAGRAPH WRITING LAB
          ======================================================== */}
      {activeTab === 'writing' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white p-5 rounded-3xl border-2 border-stone-200">
            <h3 className="text-lg font-black text-stone-900">
              4-Step Paragraph Writing Lab ✍️
            </h3>
            <p className="text-xs font-hindi text-stone-600 mt-1 leading-relaxed">
              एक सुंदर पैराग्राफ लिखने के 4 आसान कदम: 1. मुख्य विषय (Topic) 2. खूबी (Detail 1) 3. उदाहरण/आदत (Detail 2) 4. निष्कर्ष (Ending)!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paragraphSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{step.emoji}</span>
                  <div>
                    <h4 className="text-sm font-black text-emerald-950">{step.step}</h4>
                    <span className="text-[11px] font-hindi text-stone-500 font-medium">
                      {step.tip}
                    </span>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                      “{step.english}”
                    </p>
                    <WordAudioButton text={step.english} size="sm" />
                  </div>

                  {showHindi && (
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200">
                      <p className="text-xs font-hindi text-stone-600 font-medium">
                        {step.hindi}
                      </p>
                      <HindiAudioButton text={step.hindi} size="sm" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 7: MODAL AUXILIARIES (Can, Could, Should, Must...)
          ======================================================== */}
      {activeTab === 'modals' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-gradient-to-r from-fuchsia-50 via-purple-50 to-pink-50 p-5 rounded-3xl border-2 border-fuchsia-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase bg-fuchsia-200 text-fuchsia-900">
                Modal Auxiliaries Guide
              </span>
            </div>
            <h3 className="text-xl font-black text-stone-900">
              Modal Verbs Explorer (मोडल क्रियाएँ) 🪄
            </h3>
            <p className="text-xs sm:text-sm font-hindi text-stone-700 mt-1 leading-relaxed">
              Modals क्रिया के मूड, क्षमता (Ability), अनुमति (Permission), सलाह (Advice) और अनिवार्यता (Must) को दर्शाते हैं।
              <br />
              <strong className="text-fuchsia-900">
                ✨ स्वर्ण नियम: Modals (Can, Could, Should, Must...) के बाद हमेशा क्रिया का मूल रूप (V1 Base Form) आता है, कभी -s, -ed या -ing नहीं लगता!
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modalVerbsList.map((modal) => (
              <div
                key={modal.id}
                className="bg-white rounded-3xl p-5 border-2 border-fuchsia-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-11 h-11 rounded-2xl bg-fuchsia-100 flex items-center justify-center text-2xl flex-shrink-0">
                        {modal.emoji}
                      </span>
                      <div>
                        <h4 className="text-base font-black text-stone-900 leading-tight">
                          {modal.nameEnglish}
                        </h4>
                        {showHindi && (
                          <span className="text-xs font-hindi text-fuchsia-900 font-semibold block leading-tight mt-0.5">
                            {modal.nameHindi}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-fuchsia-100 text-fuchsia-800">
                      MODAL
                    </span>
                  </div>

                  {/* Daily Activity / Use-Case Badge */}
                  <div className="bg-fuchsia-100/80 border border-fuchsia-300 rounded-xl px-3 py-1.5 text-xs font-black text-fuchsia-950">
                    {modal.dailyUseBadge}
                  </div>

                  {/* When to use in simple Hindi */}
                  {showHindi && (
                    <p className="text-xs font-hindi text-stone-700 font-semibold bg-stone-50 p-2.5 rounded-xl border border-stone-200 leading-relaxed">
                      🎯 <strong>कब इस्तेमाल करें?</strong> {modal.whenToUseHindi}
                    </p>
                  )}

                  {/* Golden rule tip */}
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-xs font-hindi font-bold text-amber-900">
                    💡 {modal.goldenRuleHindi}
                  </div>

                  {/* Formula */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                      FORMULA
                    </span>
                    <p className="font-mono text-xs sm:text-sm font-black text-amber-950">
                      {modal.formula}
                    </p>
                  </div>

                  {/* Example Sentence with Audio */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm sm:text-base text-stone-900 ${boldEnglish ? 'font-black' : 'font-bold'}`}>
                        “{modal.example}”
                      </p>
                      <WordAudioButton text={modal.example} size="sm" />
                    </div>

                    {showHindi && (
                      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-stone-200">
                        <p className="text-xs sm:text-sm font-hindi text-stone-600 font-semibold">
                          {modal.hindiExample}
                        </p>
                        <HindiAudioButton text={modal.hindiExample} size="sm" />
                      </div>
                    )}
                  </div>

                  {/* Parts of Speech / Breakdown Map */}
                  <div className="bg-white border-2 border-dashed border-fuchsia-200 rounded-2xl p-3 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-fuchsia-800 block">
                      Sentence Breakdown (वाक्य संरचना):
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-hindi">
                      <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-lg text-blue-950 font-bold">
                        👤 <strong>Subject:</strong> {modal.breakdown.subject}
                      </div>
                      <div className="bg-fuchsia-50 border border-fuchsia-200 p-1.5 rounded-lg text-fuchsia-950 font-bold">
                        🪄 <strong>Modal:</strong> {modal.breakdown.modal}
                      </div>
                      <div className="bg-rose-50 border border-rose-200 p-1.5 rounded-lg text-rose-950 font-bold">
                        ⚡ <strong>Verb (V1):</strong> {modal.breakdown.verb}
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg text-emerald-950 font-bold">
                        🎯 <strong>Object:</strong> {modal.breakdown.object}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
