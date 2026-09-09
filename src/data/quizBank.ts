import { QuizQuestion, WordItem } from '../types';
import { WORDS } from './words';

// Pool of handcrafted spelling questions (Grade 6-8 common vocabulary spelling traps)
export const SPELLING_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sp-1',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for the testable prediction made by scientists?',
    targetWord: 'hypothesis',
    options: ['hypothezis', 'hipothesis', 'hypothesis', 'hypathesis'],
    correctAnswer: 'hypothesis',
    explanation: '“Hypothesis” comes from Greek hypo- (under) and thesis (placing). The correct spelling uses “y” and “th”.',
  },
  {
    id: 'sp-2',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for careful and persistent hard work?',
    targetWord: 'diligence',
    options: ['dilligence', 'diligence', 'delegence', 'dillegence'],
    correctAnswer: 'diligence',
    explanation: '“Diligence” has a single “l” and ends with “-ence”.',
  },
  {
    id: 'sp-3',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for an animal’s disguise to hide in nature?',
    targetWord: 'camouflage',
    options: ['camoflage', 'camouflage', 'camoflauge', 'cammouflage'],
    correctAnswer: 'camouflage',
    explanation: '“Camouflage” is borrowed from French and retains the “ou” in the middle: c-a-m-o-u-f-l-a-g-e.',
  },
  {
    id: 'sp-4',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for a planned travel route or schedule?',
    targetWord: 'itinerary',
    options: ['itinarary', 'itinirary', 'itinerary', 'etinerary'],
    correctAnswer: 'itinerary',
    explanation: '“Itinerary” is spelled i-t-i-n-e-r-a-r-y with “er” before “ary”.',
  },
  {
    id: 'sp-5',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for continuing on despite obstacles?',
    targetWord: 'persevere',
    options: ['persevear', 'persavere', 'percevere', 'persevere'],
    correctAnswer: 'persevere',
    explanation: '“Persevere” ends in “-vere” (rhymes with severe).',
  },
  {
    id: 'sp-6',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for feeling overwhelmed with joy and excitement?',
    targetWord: 'ecstatic',
    options: ['extatic', 'ecstatic', 'ecstatick', 'exstatic'],
    correctAnswer: 'ecstatic',
    explanation: '“Ecstatic” starts with “ec-” followed by “static” (e-c-s-t-a-t-i-c).',
  },
  {
    id: 'sp-7',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for something out of date and replaced by newer tech?',
    targetWord: 'obsolete',
    options: ['obselete', 'obsolete', 'obsalete', 'obsoleat'],
    correctAnswer: 'obsolete',
    explanation: '“Obsolete” has two “o”s in the first syllables: o-b-s-o-l-e-t-e.',
  },
  {
    id: 'sp-8',
    type: 'spelling',
    prompt: 'Which word is spelled CORRECTLY for being able to be maintained without harming nature?',
    targetWord: 'sustainable',
    options: ['sustainible', 'sustanable', 'sustainable', 'sustanible'],
    correctAnswer: 'sustainable',
    explanation: '“Sustainable” combines “sustain” + suffix “-able”.',
  },
];

// Helper to shuffle an array
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a 10-question quiz containing a diverse mix of question types
export function generateQuiz(options?: { category?: string; count?: number }): QuizQuestion[] {
  const count = options?.count || 10;
  const pool = options?.category && options.category !== 'all'
    ? WORDS.filter((w) => w.category === options.category)
    : WORDS;

  const questions: QuizQuestion[] = [];
  const shuffledWords = shuffle(pool);

  // 1. Meaning questions (2-3)
  for (let i = 0; i < Math.min(3, shuffledWords.length); i++) {
    const word = shuffledWords[i];
    const distractors = WORDS.filter((w) => w.id !== word.id);
    const shuffledDistractors = shuffle(distractors).slice(0, 3);
    const choices = shuffle([word.definition, ...shuffledDistractors.map((d) => d.definition)]);

    questions.push({
      id: `q-meaning-${word.id}`,
      type: 'meaning',
      prompt: `What is the correct meaning of the word "${word.word}"?`,
      targetWord: word.word,
      options: choices,
      correctAnswer: word.definition,
      explanation: `"${word.word}" (${word.partOfSpeech}) means: ${word.definition}`,
    });
  }

  // 2. Synonym question (2)
  const wordsWithSynonyms = shuffledWords.filter((w) => w.synonyms && w.synonyms.length > 0);
  for (let i = 0; i < Math.min(2, wordsWithSynonyms.length); i++) {
    const word = wordsWithSynonyms[i];
    const correctSynonym = word.synonyms[0];
    const otherSynonyms = WORDS.filter((w) => w.id !== word.id && w.synonyms.length > 0).map((w) => w.synonyms[0]);
    const choices = shuffle([correctSynonym, ...shuffle(otherSynonyms).slice(0, 3)]);

    questions.push({
      id: `q-syn-${word.id}`,
      type: 'synonym',
      prompt: `Which word is the best SYNONYM (similar meaning) for "${word.word}"?`,
      targetWord: word.word,
      options: choices,
      correctAnswer: correctSynonym,
      explanation: `A synonym for "${word.word}" is "${correctSynonym}". They both describe ${word.definition.toLowerCase()}`,
    });
  }

  // 3. Antonym question (1-2)
  const wordsWithAntonyms = shuffledWords.filter((w) => w.antonyms && w.antonyms.length > 0);
  for (let i = 0; i < Math.min(2, wordsWithAntonyms.length); i++) {
    const word = wordsWithAntonyms[i];
    const correctAntonym = word.antonyms![0];
    const otherAntonyms = WORDS.filter((w) => w.id !== word.id && w.antonyms && w.antonyms.length > 0)
      .map((w) => w.antonyms![0]);
    const choices = shuffle([correctAntonym, ...shuffle(otherAntonyms).slice(0, 3)]);

    questions.push({
      id: `q-ant-${word.id}`,
      type: 'antonym',
      prompt: `Which word is the best ANTONYM (opposite meaning) for "${word.word}"?`,
      targetWord: word.word,
      options: choices,
      correctAnswer: correctAntonym,
      explanation: `An antonym for "${word.word}" is "${correctAntonym}". The opposite of ${word.definition.toLowerCase()}`,
    });
  }

  // 4. Sentence completion (2)
  for (let i = 3; i < Math.min(5, shuffledWords.length); i++) {
    const word = shuffledWords[i];
    // Replace word in example sentence with a blank line
    const regex = new RegExp(`\\b${word.word}\\b`, 'i');
    const sentenceWithBlank = word.example.replace(regex, '__________');
    const distractorWords = WORDS.filter((w) => w.id !== word.id);
    const choices = shuffle([word.word, ...shuffle(distractorWords).slice(0, 3).map((w) => w.word)]);

    questions.push({
      id: `q-comp-${word.id}`,
      type: 'sentence_completion',
      prompt: `Choose the word that best completes the sentence:`,
      sentence: sentenceWithBlank,
      targetWord: word.word,
      options: choices,
      correctAnswer: word.word,
      explanation: `"${word.word}" correctly fits the sentence: "${word.example}"`,
    });
  }

  // 5. Spelling question (1-2)
  const spellingPick = shuffle(SPELLING_QUESTIONS).slice(0, 1);
  questions.push(...spellingPick);

  // 6. Match meanings question (1)
  const matchWords = shuffle(WORDS).slice(0, 4);
  const matchingPairs = matchWords.map((w) => ({
    word: w.word,
    meaning: w.definition.length > 60 ? w.definition.slice(0, 57) + '...' : w.definition,
  }));
  questions.push({
    id: `q-match-${Date.now()}`,
    type: 'match',
    prompt: `Match each vocabulary word with its corresponding definition:`,
    targetWord: 'Multiple Words',
    options: matchWords.map((w) => w.word),
    correctAnswer: JSON.stringify(matchingPairs),
    matchingPairs: matchingPairs,
    explanation: `Great job pairing each vocabulary term with its accurate definition!`,
  });

  // Ensure total exactly matches requested count (10)
  return shuffle(questions).slice(0, count);
}
