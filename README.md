# Kids English & Hindi Learning Platform

An interactive early-childhood language learning platform designed specifically for **Hindi-speaking children**. Features visual storytelling, phonics audio, interactive activities, and a comprehensive **Language Display and Export System**.

---

## 🗺️ The 10 Learning Stages (English Curriculum)

1. **Stage 1: Alphabet and Sounds (Level 1 Foundation)**
   - Letter sounds A–Z, vowels (A, E, I, O, U), phonics blending, and simple CVC words (Cat, Sun, Bed).
2. **Stage 2: First Words (Level 2 Vocabulary)**
   - Animals, fruits, colors, numbers, family, school objects, and everyday vocabulary with pictures and pronunciation.
3. **Stage 3: First Grammar Concepts (Level 3 Core Grammar)**
   - Nouns (naming words), pronouns (he/she/it), verbs (action words), adjectives (describing words), articles (A/An), singular & plural, and This vs That.
4. **Stage 4: Simple Sentences (Level 4 Expression)**
   - "I am", "You are", "He is", "She is", "I have", "I like", and basic questions & answers.
5. **Stage 5: Sentence Building (Level 5 Structure)**
   - Subject + Verb + Object word blocks, word arrangement puzzles, negative sentences ("I do not like..."), and simple questions ("Do you play?").
6. **Stage 6: Time and Tenses (Level 6 Time Concepts)**
   - Yesterday (बीता हुआ कल), today (आज का समय), tomorrow (आने वाला समय) timeline; simple present, simple past, simple future.
7. **Stage 7: Growing Grammar Skills (Level 7 Expansion)**
   - Prepositions (in, on, under, behind), adverbs of manner (happily, quickly), conjunctions (and, but), and modals (can, must).
8. **Stage 8: Reading and Writing (Level 8 Literacy)**
   - Short illustrated stories, reading comprehension, capital letters, full stops (.), and question marks (?).
9. **Stage 9: Speaking and Listening (Level 9 Communication)**
   - Greetings ("Good morning!"), introductions ("My name is..."), classroom English ("May I drink water, please?"), and repeat-after-me audio practice.
10. **Stage 10: Advanced Learning Path (Level 10 Mastery)**
    - Overview of 12 standard tenses, conditionals ("If it rains..."), active vs passive voice intuition, and paragraph writing.

---

## 🌟 Language Display & Export System (Section 19)

### 1. Three Language Display Modes
1. **English Only:** Show words, rules, questions, and answers purely in English. Hide Hindi explanations and translations completely.
2. **English + Hindi:** Show English content with Hindi explanations and translations positioned underneath.
3. **Hindi Support Only Where Needed:** Keep the main lesson in English; show Hindi explanations only for difficult concepts.

### 2. Bold English Text Option
- Dedicated **Bold English Text** toggle (ON / OFF).
- When enabled, English words, headings, grammar formulas, example sentences, questions, and correct answers are bolded.
- The setting immediately affects both the **live on-screen application** and the **exported PDF / print document**.

### 3. Print & PDF Export Methods
- **Print / Save as PDF:** Uses native `@media print` CSS layout for 100% crisp vector typography and flawless Devanagari ligature rendering.
- **Download PDF File (`.pdf`):** Uses `html2canvas` + `jsPDF` at 2x resolution to render and download a PDF file directly without server dependencies.
- **Unicode Font Compatibility:** Integrates Google Fonts (`Noto Sans Devanagari`, `Nirmala UI`, `Mangal`) for Devanagari text.
- **Printable Layout:** Formatted to A4 page dimensions with student headers, question checkboxes, and optional teacher answer keys.

---

## 🇮🇳 Preserved Hindi Learning Module Routes

All existing Hindi learning module routes, components, and datasets are 100% preserved:
- `/hindi`: Hindi Learning Platform Homepage
- `/barakhadi`: Barakhadi Table & Audio Practice
- `/sound-reading`: Phonics Sound Reading & Blending
- `/word-builder`: Interactive Picture-to-Word Builder Game
- `/practice`: Speech Recognition & Pronunciation Practice
- `/my-voice`: Voice Recording & Waveform Playback
- `/similar-sounds`: Tricky & Similar Sounds Practice
- `/progress`: Hindi Stars, Badges, & Progress Tracker

---

## 🚀 Running the Project

```bash
# Run development server
npm run dev

# Run build
npm run build

# Run automated validation & tests
npm test
```
