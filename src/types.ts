export type CategoryId =
  | 'nature'
  | 'science'
  | 'school'
  | 'travel'
  | 'feelings'
  | 'animals'
  | 'technology'
  | 'environment'
  | 'people'
  | 'everyday';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition';

export interface WordItem {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: PartOfSpeech;
  category: CategoryId;
  gradeLevel: 6 | 7 | 8;
  definition: string;
  example: string;
  synonyms: string[];
  antonyms?: string[];
  etymologyHint?: string;
  sentenceScramble?: {
    scrambled: string[];
    solution: string;
    hint: string;
  };
}

export type QuizQuestionType =
  | 'meaning'
  | 'synonym'
  | 'antonym'
  | 'sentence_completion'
  | 'spelling'
  | 'match';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  targetWord: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  sentence?: string;
  matchingPairs?: { word: string; meaning: string }[];
}

export interface ContextQuestion {
  id: string;
  targetWord: string;
  sentence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clueTip: string;
  category: CategoryId;
  gradeLevel: 6 | 7 | 8;
}

export interface QuizResultSummary {
  id: string;
  date: string;
  quizType: 'standard' | 'challenge' | 'context';
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  missedWordIds: string[];
  missedQuestions: {
    questionPrompt: string;
    targetWord: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'quiz' | 'mastery' | 'sentences' | 'games';
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgressState {
  learnedWordIds: string[];
  quizzesCompleted: number;
  questionsAnswered: number;
  correctAnswersCount: number;
  highestScore: number;
  history: QuizResultSummary[];
  missedWordIds: string[];
  sentencesBuiltCount: number;
  challengeHighScore: number;
  unlockedBadges: string[];
  soundEnabled: boolean;
  gamesPlayedCount: number;
  wordsUnscrambledCount: number;
  detectiveWordsSolved: number;
  speedRushBestScore: number;
  memoryMatchesCompleted: number;
}

export type ActiveTab =
  | 'home'
  | 'learn'
  | 'context'
  | 'quiz'
  | 'sentence_builder'
  | 'challenge'
  | 'games'
  | 'progress'
  | 'instructions';
