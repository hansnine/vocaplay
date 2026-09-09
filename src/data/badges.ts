import { Badge, UserProgressState } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-word',
    title: 'First Word',
    description: 'Mark your very first vocabulary word as learned in VocaPlay.',
    icon: 'Sparkles',
    category: 'learning',
    requirement: '1 word marked as learned',
    unlocked: false,
  },
  {
    id: '10-words-learned',
    title: '10 Words Learned',
    description: 'Master at least 10 words across any category.',
    icon: 'BookOpen',
    category: 'learning',
    requirement: '10 words learned',
    unlocked: false,
  },
  {
    id: 'vocabulary-explorer',
    title: 'Vocabulary Explorer',
    description: 'Explore and learn words from at least 3 distinct categories.',
    icon: 'Compass',
    category: 'learning',
    requirement: 'Words learned across 3+ categories',
    unlocked: false,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Complete 5 vocabulary practice quizzes.',
    icon: 'Trophy',
    category: 'quiz',
    requirement: '5 completed quizzes',
    unlocked: false,
  },
  {
    id: 'vocabulary-champion',
    title: 'Vocabulary Champion',
    description: 'Earn a top score of 90% or higher on any 10-question quiz.',
    icon: 'Crown',
    category: 'mastery',
    requirement: 'Score 90%+ on a quiz',
    unlocked: false,
  },
  {
    id: 'sentence-crafter',
    title: 'Sentence Crafter',
    description: 'Construct 3 sentences using the interactive Sentence Builder.',
    icon: 'PenTool',
    category: 'sentences',
    requirement: '3 sentences built',
    unlocked: false,
  },
  {
    id: 'context-detective',
    title: 'Context Detective',
    description: 'Solve 5 word-in-context challenges using context clues.',
    icon: 'Search',
    category: 'mastery',
    requirement: '5 context questions answered correctly',
    unlocked: false,
  },
  {
    id: 'arcade-gamer',
    title: 'Arcade Adventurer',
    description: 'Play and complete at least 3 rounds in the Word Games Arcade.',
    icon: 'Gamepad2',
    category: 'games',
    requirement: 'Play 3 language game sessions',
    unlocked: false,
  },
  {
    id: 'unscramble-whiz',
    title: 'Anagram Whiz',
    description: 'Unscramble 3 jumbled vocabulary words in Anagram Adventure.',
    icon: 'SpellCheck',
    category: 'games',
    requirement: 'Unscramble 3 words',
    unlocked: false,
  },
  {
    id: 'detective-ace',
    title: 'Mystery Word Master',
    description: 'Solve 3 mystery words in Word Detective with torches to spare.',
    icon: 'Flame',
    category: 'games',
    requirement: 'Solve 3 mystery words in Word Detective',
    unlocked: false,
  },
  {
    id: 'speed-rush-champion',
    title: 'Lightning Reflexes',
    description: 'Achieve a score of 200 or higher in Synonym & Antonym Speed Rush.',
    icon: 'Zap',
    category: 'games',
    requirement: 'Score 200+ points in Speed Rush',
    unlocked: false,
  },
];

export function evaluateBadges(
  progress: UserProgressState,
  wordsLearnedCategoriesCount: number
): { updatedBadges: Badge[]; newlyUnlocked: Badge[] } {
  const currentUnlocked = new Set(progress.unlockedBadges);
  const newlyUnlocked: Badge[] = [];

  const updated = INITIAL_BADGES.map((b) => {
    let shouldUnlock = currentUnlocked.has(b.id);

    if (!shouldUnlock) {
      if (b.id === 'first-word' && progress.learnedWordIds.length >= 1) {
        shouldUnlock = true;
      } else if (b.id === '10-words-learned' && progress.learnedWordIds.length >= 10) {
        shouldUnlock = true;
      } else if (b.id === 'vocabulary-explorer' && wordsLearnedCategoriesCount >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'quiz-master' && progress.quizzesCompleted >= 5) {
        shouldUnlock = true;
      } else if (b.id === 'vocabulary-champion' && progress.highestScore >= 90) {
        shouldUnlock = true;
      } else if (b.id === 'sentence-crafter' && progress.sentencesBuiltCount >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'context-detective' && progress.questionsAnswered >= 5 && progress.correctAnswersCount >= 4) {
        shouldUnlock = true;
      } else if (b.id === 'arcade-gamer' && (progress.gamesPlayedCount || 0) >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'unscramble-whiz' && (progress.wordsUnscrambledCount || 0) >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'detective-ace' && (progress.detectiveWordsSolved || 0) >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'speed-rush-champion' && (progress.speedRushBestScore || 0) >= 200) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        newlyUnlocked.push({ ...b, unlocked: true, unlockedAt: new Date().toISOString() });
      }
    }

    return {
      ...b,
      unlocked: shouldUnlock,
    };
  });

  return { updatedBadges: updated, newlyUnlocked };
}
