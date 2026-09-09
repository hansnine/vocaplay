import React, { createContext, useContext, useEffect, useState } from 'react';
import { Badge, QuizResultSummary, UserProgressState } from '../types';
import { evaluateBadges, INITIAL_BADGES } from '../data/badges';
import { WORDS } from '../data/words';
import { soundFx } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ProgressContextType {
  progress: UserProgressState;
  badges: Badge[];
  recentBadge: Badge | null;
  clearRecentBadge: () => void;
  markWordLearned: (wordId: string) => void;
  unmarkWordLearned: (wordId: string) => void;
  isWordLearned: (wordId: string) => boolean;
  recordQuizResult: (summary: Omit<QuizResultSummary, 'id' | 'date'>) => QuizResultSummary;
  recordSentenceBuilt: () => void;
  recordContextQuestionResult: (correct: boolean, targetWordId?: string) => void;
  recordGameCompleted: (gameType: 'unscramble' | 'detective' | 'match' | 'speed_rush' | 'pos_sorter', score: number) => void;
  toggleSound: () => void;
  resetAllProgress: () => void;
}

const STORAGE_KEY = 'word_quest_user_progress_v1';

const defaultState: UserProgressState = {
  learnedWordIds: [],
  quizzesCompleted: 0,
  questionsAnswered: 0,
  correctAnswersCount: 0,
  highestScore: 0,
  history: [],
  missedWordIds: [],
  sentencesBuiltCount: 0,
  challengeHighScore: 0,
  unlockedBadges: [],
  soundEnabled: true,
  gamesPlayedCount: 0,
  wordsUnscrambledCount: 0,
  detectiveWordsSolved: 0,
  speedRushBestScore: 0,
  memoryMatchesCompleted: 0,
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      }
    } catch {
      // Fallback
    }
    return defaultState;
  });

  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [recentBadge, setRecentBadge] = useState<Badge | null>(null);

  // Sync soundFx with state
  useEffect(() => {
    soundFx.setSoundEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // LocalStorage quota or blocked
    }
  }, [progress]);

  // Check badge updates whenever progress changes
  useEffect(() => {
    const categoriesLearned = new Set(
      progress.learnedWordIds.map((id) => {
        const word = WORDS.find((w) => w.id === id);
        return word ? word.category : null;
      }).filter(Boolean)
    );

    const { updatedBadges, newlyUnlocked } = evaluateBadges(progress, categoriesLearned.size);
    setBadges(updatedBadges);

    if (newlyUnlocked.length > 0) {
      const latest = newlyUnlocked[newlyUnlocked.length - 1];
      setRecentBadge(latest);
      soundFx.playCelebration();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {
        // Safe fallback
      }

      // Add newly unlocked badge IDs to progress
      setProgress((prev) => ({
        ...prev,
        unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), ...newlyUnlocked.map((b) => b.id)])),
      }));
    }
  }, [
    progress.learnedWordIds.length,
    progress.quizzesCompleted,
    progress.highestScore,
    progress.sentencesBuiltCount,
    progress.questionsAnswered,
    progress.correctAnswersCount,
    progress.gamesPlayedCount,
    progress.wordsUnscrambledCount,
    progress.detectiveWordsSolved,
    progress.speedRushBestScore,
  ]);

  const markWordLearned = (wordId: string) => {
    setProgress((prev) => {
      if (prev.learnedWordIds.includes(wordId)) return prev;
      soundFx.playCorrect();
      return {
        ...prev,
        learnedWordIds: [...prev.learnedWordIds, wordId],
      };
    });
  };

  const unmarkWordLearned = (wordId: string) => {
    setProgress((prev) => ({
      ...prev,
      learnedWordIds: prev.learnedWordIds.filter((id) => id !== wordId),
    }));
  };

  const isWordLearned = (wordId: string) => {
    return progress.learnedWordIds.includes(wordId);
  };

  const recordQuizResult = (summaryData: Omit<QuizResultSummary, 'id' | 'date'>): QuizResultSummary => {
    const result: QuizResultSummary = {
      ...summaryData,
      id: `res-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    setProgress((prev) => {
      const newQuizzes = prev.quizzesCompleted + 1;
      const newQuestions = prev.questionsAnswered + summaryData.totalQuestions;
      const newCorrect = prev.correctAnswersCount + summaryData.correctAnswers;
      const newHighest = Math.max(prev.highestScore, summaryData.scorePercentage);

      // Merge missed words
      const combinedMissed = Array.from(
        new Set([...prev.missedWordIds, ...summaryData.missedWordIds])
      );

      return {
        ...prev,
        quizzesCompleted: newQuizzes,
        questionsAnswered: newQuestions,
        correctAnswersCount: newCorrect,
        highestScore: newHighest,
        history: [result, ...prev.history].slice(0, 30),
        missedWordIds: combinedMissed,
      };
    });

    return result;
  };

  const recordSentenceBuilt = () => {
    setProgress((prev) => ({
      ...prev,
      sentencesBuiltCount: prev.sentencesBuiltCount + 1,
    }));
  };

  const recordContextQuestionResult = (correct: boolean, targetWordId?: string) => {
    setProgress((prev) => {
      const newQuestions = prev.questionsAnswered + 1;
      const newCorrect = prev.correctAnswersCount + (correct ? 1 : 0);
      let missed = prev.missedWordIds;
      if (!correct && targetWordId && !missed.includes(targetWordId)) {
        missed = [...missed, targetWordId];
      }
      return {
        ...prev,
        questionsAnswered: newQuestions,
        correctAnswersCount: newCorrect,
        missedWordIds: missed,
      };
    });
  };

  const recordGameCompleted = (
    gameType: 'unscramble' | 'detective' | 'match' | 'speed_rush' | 'pos_sorter',
    score: number
  ) => {
    setProgress((prev) => {
      const newGamesPlayed = (prev.gamesPlayedCount || 0) + 1;
      let newUnscrambled = prev.wordsUnscrambledCount || 0;
      let newDetective = prev.detectiveWordsSolved || 0;
      let newSpeedBest = prev.speedRushBestScore || 0;
      let newMatches = prev.memoryMatchesCompleted || 0;

      if (gameType === 'unscramble') {
        newUnscrambled += 1;
      } else if (gameType === 'detective') {
        newDetective += 1;
      } else if (gameType === 'speed_rush') {
        newSpeedBest = Math.max(newSpeedBest, score);
      } else if (gameType === 'match') {
        newMatches += 1;
      }

      return {
        ...prev,
        gamesPlayedCount: newGamesPlayed,
        wordsUnscrambledCount: newUnscrambled,
        detectiveWordsSolved: newDetective,
        speedRushBestScore: newSpeedBest,
        memoryMatchesCompleted: newMatches,
      };
    });
  };

  const toggleSound = () => {
    setProgress((prev) => {
      const nextVal = !prev.soundEnabled;
      soundFx.setSoundEnabled(nextVal);
      return { ...prev, soundEnabled: nextVal };
    });
  };

  const resetAllProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProgress(defaultState);
    setBadges(INITIAL_BADGES);
  };

  const clearRecentBadge = () => {
    setRecentBadge(null);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        badges,
        recentBadge,
        clearRecentBadge,
        markWordLearned,
        unmarkWordLearned,
        isWordLearned,
        recordQuizResult,
        recordSentenceBuilt,
        recordContextQuestionResult,
        recordGameCompleted,
        toggleSound,
        resetAllProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
