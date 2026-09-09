import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ActiveTab, WordItem } from '../types';
import { WORDS, getWordsByGrade } from '../data/words';
import { useProgress } from '../context/ProgressContext';
import { soundFx } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Sparkles,
  Flame,
  Search,
  Zap,
  Tag,
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Trophy,
  Star,
  Clock,
  Shuffle,
  Eye,
  BookOpen,
  Award,
  ChevronRight,
  Filter,
  Check,
} from 'lucide-react';

type GameMode = 'unscramble' | 'detective' | 'match' | 'speed_rush' | 'pos_sorter';

interface WordGamesProps {
  setActiveTab: (tab: ActiveTab) => void;
  onPracticeWord?: (word: WordItem) => void;
}

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const WordGames: React.FC<WordGamesProps> = ({ setActiveTab, onPracticeWord }) => {
  const { progress, markWordLearned, isWordLearned, recordGameCompleted } = useProgress();
  const [selectedGame, setSelectedGame] = useState<GameMode>('unscramble');
  const [gradeFilter, setGradeFilter] = useState<'all' | 6 | 7 | 8>('all');

  // Filtered pool of words
  const availableWords: WordItem[] = useMemo(() => {
    return getWordsByGrade(gradeFilter);
  }, [gradeFilter]);

  // ==========================================
  // GAME 1: ANAGRAM / WORD UNSCRAMBLE
  // ==========================================
  const [unscrambleWordIndex, setUnscrambleWordIndex] = useState(0);
  const currentUnscrambleTarget = availableWords[unscrambleWordIndex % availableWords.length];
  const [placedLetters, setPlacedLetters] = useState<{ id: string; letter: string }[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string; used: boolean }[]>([]);
  const [unscrambleSolved, setUnscrambleSolved] = useState(false);
  const [unscrambleError, setUnscrambleError] = useState(false);
  const [unscrambleStreak, setUnscrambleStreak] = useState(0);
  const [showHintDefinition, setShowHintDefinition] = useState(true);

  // Initialize scrambled tiles when target word changes
  const initUnscrambleWord = useCallback((targetWord: WordItem) => {
    const rawLetters = targetWord.word.toUpperCase().split('');
    let shuffled = shuffleArray(rawLetters);
    // Ensure it's not identical to the solution if length > 2
    if (shuffled.join('') === rawLetters.join('') && rawLetters.length > 2) {
      shuffled = [shuffled[shuffled.length - 1], ...shuffled.slice(0, shuffled.length - 1)];
    }
    const tiles = shuffled.map((char, index) => ({
      id: `${char}-${index}-${Date.now()}`,
      letter: char,
      used: false,
    }));
    setAvailableTiles(tiles);
    setPlacedLetters([]);
    setUnscrambleSolved(false);
    setUnscrambleError(false);
  }, []);

  useEffect(() => {
    if (currentUnscrambleTarget) {
      initUnscrambleWord(currentUnscrambleTarget);
    }
  }, [currentUnscrambleTarget, initUnscrambleWord]);

  const handleTileClick = (tileId: string) => {
    if (unscrambleSolved) return;
    soundFx.playClick();
    const tile = availableTiles.find((t) => t.id === tileId);
    if (!tile || tile.used) return;

    // Mark as used
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tileId ? { ...t, used: true } : t))
    );
    // Add to placed
    setPlacedLetters((prev) => [...prev, { id: tile.id, letter: tile.letter }]);
  };

  const handlePlacedClick = (placedId: string) => {
    if (unscrambleSolved) return;
    soundFx.playClick();
    // Return tile to available
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === placedId ? { ...t, used: false } : t))
    );
    // Remove from placed
    setPlacedLetters((prev) => prev.filter((p) => p.id !== placedId));
    setUnscrambleError(false);
  };

  const handleCheckUnscramble = useCallback(() => {
    if (!currentUnscrambleTarget) return;
    const currentAttempt = placedLetters.map((p) => p.letter).join('');
    const targetWordUpper = currentUnscrambleTarget.word.toUpperCase();

    if (currentAttempt === targetWordUpper) {
      setUnscrambleSolved(true);
      setUnscrambleError(false);
      const newStreak = unscrambleStreak + 1;
      setUnscrambleStreak(newStreak);
      soundFx.playCorrect();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
      recordGameCompleted('unscramble', 50);
    } else {
      setUnscrambleError(true);
      soundFx.playIncorrect();
      setTimeout(() => setUnscrambleError(false), 800);
    }
  }, [currentUnscrambleTarget, placedLetters, unscrambleStreak, recordGameCompleted]);

  // Check automatically when all letters are placed
  useEffect(() => {
    if (
      currentUnscrambleTarget &&
      placedLetters.length === currentUnscrambleTarget.word.length &&
      !unscrambleSolved
    ) {
      handleCheckUnscramble();
    }
  }, [placedLetters, currentUnscrambleTarget, unscrambleSolved, handleCheckUnscramble]);

  const handleRevealNextLetter = () => {
    if (unscrambleSolved || !currentUnscrambleTarget) return;
    const nextIdx = placedLetters.length;
    if (nextIdx >= currentUnscrambleTarget.word.length) return;

    const nextChar = currentUnscrambleTarget.word[nextIdx].toUpperCase();
    // Find an unused tile with this character
    const tile = availableTiles.find((t) => !t.used && t.letter === nextChar);
    if (tile) {
      soundFx.playClick();
      setAvailableTiles((prev) =>
        prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t))
      );
      setPlacedLetters((prev) => [...prev, { id: tile.id, letter: tile.letter }]);
    }
  };

  const handleNextUnscramble = () => {
    soundFx.playClick();
    setUnscrambleWordIndex((prev) => prev + 1);
  };

  // Keyboard typing support for unscramble
  useEffect(() => {
    if (selectedGame !== 'unscramble' || unscrambleSolved) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setPlacedLetters((prev) => {
          if (prev.length === 0) return prev;
          const last = prev[prev.length - 1];
          setAvailableTiles((tPrev) =>
            tPrev.map((t) => (t.id === last.id ? { ...t, used: false } : t))
          );
          return prev.slice(0, -1);
        });
        return;
      }

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        const tile = availableTiles.find((t) => !t.used && t.letter === char);
        if (tile) {
          soundFx.playClick();
          setAvailableTiles((prev) =>
            prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t))
          );
          setPlacedLetters((prev) => [...prev, { id: tile.id, letter: tile.letter }]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGame, unscrambleSolved, availableTiles]);

  // ==========================================
  // GAME 2: WORD DETECTIVE (MYSTERY WORD / TORCHES)
  // ==========================================
  const [detectiveWordIndex, setDetectiveWordIndex] = useState(0);
  const currentDetectiveWord = availableWords[detectiveWordIndex % availableWords.length];
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [showDetectiveClue, setShowDetectiveClue] = useState(false);
  const [detectiveWins, setDetectiveWins] = useState(0);

  const MAX_TORCHES = 6;

  const wrongGuesses = useMemo(() => {
    if (!currentDetectiveWord) return [];
    const wordLetters = new Set<string>(currentDetectiveWord.word.toUpperCase().split(''));
    return Array.from<string>(guessedLetters).filter((char: string) => !wordLetters.has(char));
  }, [guessedLetters, currentDetectiveWord]);

  const torchesRemaining = Math.max(0, MAX_TORCHES - wrongGuesses.length);
  const isDetectiveLost = torchesRemaining === 0;

  const isDetectiveWon = useMemo(() => {
    if (!currentDetectiveWord) return false;
    const wordLetters = currentDetectiveWord.word.toUpperCase().split('');
    return wordLetters.every((char) => guessedLetters.has(char) || char === ' ' || char === '-');
  }, [guessedLetters, currentDetectiveWord]);

  const handleGuessLetter = useCallback((letter: string) => {
    if (isDetectiveWon || isDetectiveLost) return;
    const upper = letter.toUpperCase();
    if (guessedLetters.has(upper)) return;

    setGuessedLetters((prev) => new Set([...prev, upper]));

    if (currentDetectiveWord.word.toUpperCase().includes(upper)) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }
  }, [isDetectiveWon, isDetectiveLost, guessedLetters, currentDetectiveWord]);

  useEffect(() => {
    if (isDetectiveWon && currentDetectiveWord) {
      soundFx.playCelebration();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      setDetectiveWins((prev) => prev + 1);
      recordGameCompleted('detective', 100);
    }
  }, [isDetectiveWon, currentDetectiveWord, recordGameCompleted]);

  const initDetectiveGame = () => {
    setGuessedLetters(new Set());
    setShowDetectiveClue(false);
    setDetectiveWordIndex((prev) => prev + 1);
  };

  // Keyboard listener for Detective game
  useEffect(() => {
    if (selectedGame !== 'detective' || isDetectiveWon || isDetectiveLost) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        handleGuessLetter(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGame, isDetectiveWon, isDetectiveLost, handleGuessLetter]);

  // ==========================================
  // GAME 3: MEMORY MATCH (CARD PAIR FLIP)
  // ==========================================
  interface MemoryCard {
    id: string;
    pairId: string;
    type: 'word' | 'definition' | 'synonym';
    content: string;
    subtext?: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [matchMode, setMatchMode] = useState<'def' | 'syn'>('def');
  const [movesCount, setMovesCount] = useState(0);
  const [matchTime, setMatchTime] = useState(0);
  const [matchActive, setMatchActive] = useState(false);
  const [matchCompleted, setMatchCompleted] = useState(false);

  const initMemoryGame = useCallback(() => {
    // Pick 6 random words from availableWords
    const pool: WordItem[] = shuffleArray(availableWords).slice(0, 6);
    const cards: MemoryCard[] = [];

    pool.forEach((word: WordItem) => {
      // Card 1: Word
      cards.push({
        id: `card-w-${word.id}`,
        pairId: word.id,
        type: 'word',
        content: word.word,
        subtext: word.partOfSpeech,
        isFlipped: false,
        isMatched: false,
      });

      // Card 2: Definition or Synonym
      const partnerContent =
        matchMode === 'def'
          ? word.definition
          : word.synonyms[0] || word.definition;

      cards.push({
        id: `card-d-${word.id}`,
        pairId: word.id,
        type: matchMode === 'def' ? 'definition' : 'synonym',
        content: partnerContent,
        isFlipped: false,
        isMatched: false,
      });
    });

    setMemoryCards(shuffleArray(cards));
    setFlippedCardIds([]);
    setMovesCount(0);
    setMatchTime(0);
    setMatchActive(true);
    setMatchCompleted(false);
  }, [availableWords, matchMode]);

  useEffect(() => {
    if (selectedGame === 'match') {
      initMemoryGame();
    }
  }, [selectedGame, matchMode, initMemoryGame]);

  // Timer for memory match
  useEffect(() => {
    if (!matchActive || matchCompleted) return;
    const interval = setInterval(() => {
      setMatchTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [matchActive, matchCompleted]);

  const handleCardClick = (cardId: string) => {
    if (flippedCardIds.length >= 2) return;
    const card = memoryCards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    soundFx.playClick();
    const newFlipped = [...flippedCardIds, cardId];
    setFlippedCardIds(newFlipped);

    setMemoryCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      setMovesCount((prev) => prev + 1);
      const first = memoryCards.find((c) => c.id === newFlipped[0]);
      const second = card;

      if (first && second && first.pairId === second.pairId) {
        // MATCH!
        setTimeout(() => {
          soundFx.playCorrect();
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCardIds([]);
        }, 400);
      } else {
        // NO MATCH
        setTimeout(() => {
          soundFx.playIncorrect();
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === first?.id || c.id === second.id ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCardIds([]);
        }, 900);
      }
    }
  };

  // Check if all matched
  useEffect(() => {
    if (
      memoryCards.length > 0 &&
      memoryCards.every((c) => c.isMatched) &&
      !matchCompleted
    ) {
      setMatchCompleted(true);
      setMatchActive(false);
      soundFx.playCelebration();
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // safe fallback
      }
      recordGameCompleted('match', 100);
    }
  }, [memoryCards, matchCompleted, recordGameCompleted]);

  // ==========================================
  // GAME 4: SYNONYM & ANTONYM SPEED RUSH (60s ROUND)
  // ==========================================
  interface SpeedPair {
    wordA: string;
    wordB: string;
    relation: 'synonym' | 'antonym' | 'unrelated';
    explanation: string;
  }

  const [speedActive, setSpeedActive] = useState(false);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedStreak, setSpeedStreak] = useState(0);
  const [speedBestStreak, setSpeedBestStreak] = useState(0);
  const [speedCurrentPair, setSpeedCurrentPair] = useState<SpeedPair | null>(null);
  const [speedFeedback, setSpeedFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [speedRoundOver, setSpeedRoundOver] = useState(false);
  const [speedAnswerLog, setSpeedAnswerLog] = useState<
    { pair: SpeedPair; userCorrect: boolean }[]
  >([]);

  // Generate a random speed pair
  const generateSpeedPair = useCallback((): SpeedPair => {
    const randomType = Math.random();
    // 40% synonym, 30% antonym, 30% unrelated
    const randWord = availableWords[Math.floor(Math.random() * availableWords.length)];

    if (randomType < 0.4 && randWord.synonyms && randWord.synonyms.length > 0) {
      const syn = randWord.synonyms[Math.floor(Math.random() * randWord.synonyms.length)];
      return {
        wordA: randWord.word,
        wordB: syn,
        relation: 'synonym',
        explanation: `"${randWord.word}" and "${syn}" share similar meanings (${randWord.definition}).`,
      };
    } else if (
      randomType < 0.7 &&
      randWord.antonyms &&
      randWord.antonyms.length > 0
    ) {
      const ant = randWord.antonyms[Math.floor(Math.random() * randWord.antonyms.length)];
      return {
        wordA: randWord.word,
        wordB: ant,
        relation: 'antonym',
        explanation: `"${randWord.word}" and "${ant}" are direct opposites.`,
      };
    } else {
      // Pick another random word from different category
      const otherWords = availableWords.filter((w) => w.id !== randWord.id);
      const other = otherWords[Math.floor(Math.random() * otherWords.length)];
      return {
        wordA: randWord.word,
        wordB: other ? other.word : 'unrelated',
        relation: 'unrelated',
        explanation: `"${randWord.word}" and "${other?.word}" have completely unrelated meanings.`,
      };
    }
  }, [availableWords]);

  const startSpeedRush = () => {
    setSpeedScore(0);
    setSpeedStreak(0);
    setSpeedBestStreak(0);
    setSpeedTimeLeft(60);
    setSpeedActive(true);
    setSpeedRoundOver(false);
    setSpeedAnswerLog([]);
    setSpeedCurrentPair(generateSpeedPair());
    soundFx.playClick();
  };

  // Timer loop for Speed Rush
  useEffect(() => {
    if (!speedActive || speedTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setSpeedTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSpeedActive(false);
          setSpeedRoundOver(true);
          soundFx.playCelebration();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [speedActive, speedTimeLeft]);

  // Record completed speed rush
  useEffect(() => {
    if (speedRoundOver) {
      recordGameCompleted('speed_rush', speedScore);
    }
  }, [speedRoundOver, speedScore, recordGameCompleted]);

  const handleSpeedChoice = useCallback((chosen: 'synonym' | 'antonym' | 'unrelated') => {
    if (!speedActive || !speedCurrentPair) return;

    const isCorrect = chosen === speedCurrentPair.relation;
    const multiplier = Math.min(4, Math.floor(speedStreak / 3) + 1);

    setSpeedAnswerLog((prev) => [
      ...prev,
      { pair: speedCurrentPair, userCorrect: isCorrect },
    ]);

    if (isCorrect) {
      soundFx.playCorrect();
      setSpeedFeedback('correct');
      const points = 10 * multiplier;
      setSpeedScore((prev) => prev + points);
      setSpeedStreak((prev) => {
        const next = prev + 1;
        setSpeedBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      soundFx.playIncorrect();
      setSpeedFeedback('wrong');
      setSpeedStreak(0);
    }

    setTimeout(() => {
      setSpeedFeedback(null);
      setSpeedCurrentPair(generateSpeedPair());
    }, 350);
  }, [speedActive, speedCurrentPair, speedStreak, generateSpeedPair]);

  // Keyboard listener for Speed Rush
  useEffect(() => {
    if (selectedGame !== 'speed_rush' || !speedActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === 's' || e.key === 'S') {
        handleSpeedChoice('synonym');
      } else if (e.key === '2' || e.key === 'a' || e.key === 'A') {
        handleSpeedChoice('antonym');
      } else if (e.key === '3' || e.key === 'u' || e.key === 'U') {
        handleSpeedChoice('unrelated');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGame, speedActive, handleSpeedChoice]);

  // ==========================================
  // GAME 5: PARTS OF SPEECH SORTER
  // ==========================================
  const [posWordIndex, setPosWordIndex] = useState(0);
  const currentPosWord = availableWords[posWordIndex % availableWords.length];
  const [posScore, setPosScore] = useState(0);
  const [posAnsweredCount, setPosAnsweredCount] = useState(0);
  const [posFeedback, setPosFeedback] = useState<{
    correct: boolean;
    choice: string;
    explanation: string;
  } | null>(null);

  const handlePosChoice = (chosenPos: string) => {
    if (posFeedback || !currentPosWord) return;

    const isCorrect = currentPosWord.partOfSpeech.toLowerCase() === chosenPos.toLowerCase();
    setPosAnsweredCount((prev) => prev + 1);

    if (isCorrect) {
      soundFx.playCorrect();
      setPosScore((prev) => prev + 1);
    } else {
      soundFx.playIncorrect();
    }

    const posExplanations: Record<string, string> = {
      noun: 'A noun names a person, place, thing, concept, or physical element.',
      verb: 'A verb represents an action, event, movement, or state of being.',
      adjective: 'An adjective describes, quantifies, or modifies a noun or pronoun.',
      adverb: 'An adverb modifies a verb, adjective, or other adverb, indicating manner or time.',
    };

    setPosFeedback({
      correct: isCorrect,
      choice: chosenPos,
      explanation: `"${currentPosWord.word}" is classified as a ${currentPosWord.partOfSpeech.toUpperCase()}. ${posExplanations[currentPosWord.partOfSpeech] || ''}`,
    });

    recordGameCompleted('pos_sorter', isCorrect ? 10 : 0);
  };

  const handleNextPosWord = () => {
    setPosFeedback(null);
    setPosWordIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-sky-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-sky-200 text-xs font-semibold mb-3 border border-indigo-400/30 backdrop-blur">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive English Language Arcade</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Word Games <span className="text-amber-300">Arcade</span>
            </h1>
            <p className="text-sm text-indigo-100/90 mt-1.5 max-w-xl leading-relaxed">
              Strengthen your vocabulary, spelling, and grammar intuition through high-energy interactive games.
              Unscramble letters, uncover mystery words, race the clock, and level up your skills!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-2">
              <div className="text-xl sm:text-2xl font-display font-bold text-amber-300">
                {progress.gamesPlayedCount || 0}
              </div>
              <div className="text-[11px] font-semibold text-indigo-200">Games Played</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xl sm:text-2xl font-display font-bold text-sky-300">
                {progress.wordsUnscrambledCount || 0}
              </div>
              <div className="text-[11px] font-semibold text-indigo-200">Unscrambled</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xl sm:text-2xl font-display font-bold text-emerald-300">
                {progress.speedRushBestScore || 0}
              </div>
              <div className="text-[11px] font-semibold text-indigo-200">Best Rush</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Game Selector Navigation & Grade Filter Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Game Mode Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            id="game-tab-unscramble"
            onClick={() => {
              soundFx.playClick();
              setSelectedGame('unscramble');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              selectedGame === 'unscramble'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>Anagram Unscramble</span>
          </button>

          <button
            id="game-tab-detective"
            onClick={() => {
              soundFx.playClick();
              setSelectedGame('detective');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              selectedGame === 'detective'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Word Detective</span>
          </button>

          <button
            id="game-tab-match"
            onClick={() => {
              soundFx.playClick();
              setSelectedGame('match');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              selectedGame === 'match'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Memory Match</span>
          </button>

          <button
            id="game-tab-speed"
            onClick={() => {
              soundFx.playClick();
              setSelectedGame('speed_rush');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              selectedGame === 'speed_rush'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Speed Rush</span>
          </button>

          <button
            id="game-tab-pos"
            onClick={() => {
              soundFx.playClick();
              setSelectedGame('pos_sorter');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
              selectedGame === 'pos_sorter'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Grammar Sorter</span>
          </button>
        </div>

        {/* Grade Filter Pill */}
        <div className="flex items-center gap-1.5 self-end lg:self-auto bg-slate-100/90 p-1 rounded-xl text-xs">
          <span className="text-slate-500 font-semibold px-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" /> Grade:
          </span>
          {(['all', 6, 7, 8] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => {
                soundFx.playClick();
                setGradeFilter(grade);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                gradeFilter === grade
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {grade === 'all' ? 'All' : `Gr. ${grade}`}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ACTIVE GAME SCREENPLAY */}
      {/* ========================================================================= */}

      {/* GAME 1: ANAGRAM / UNSCRAMBLE */}
      {selectedGame === 'unscramble' && currentUnscrambleTarget && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          {/* Top Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider">
                Grade {currentUnscrambleTarget.gradeLevel} • {currentUnscrambleTarget.category}
              </span>
              <span className="text-xs font-semibold text-slate-500 italic">
                {currentUnscrambleTarget.partOfSpeech}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Streak: {unscrambleStreak}</span>
              </div>
              <button
                onClick={() => soundFx.speakWord(currentUnscrambleTarget.word)}
                className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition cursor-pointer"
                title="Hear Pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Meaning Clue Banner */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Clue &amp; Meaning
              </span>
              <button
                onClick={() => setShowHintDefinition(!showHintDefinition)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                {showHintDefinition ? 'Hide Clue' : 'Show Clue'}
              </button>
            </div>
            {showHintDefinition ? (
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {currentUnscrambleTarget.definition}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic">Clue hidden for extra challenge!</p>
            )}
          </div>

          {/* Placed Letters Slot Row */}
          <div>
            <div className="text-center mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Unscrambled Word ({placedLetters.length} / {currentUnscrambleTarget.word.length} letters)
            </div>

            <div
              className={`flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 min-h-[64px] p-3 rounded-2xl border-2 transition ${
                unscrambleSolved
                  ? 'bg-emerald-50/80 border-emerald-300'
                  : unscrambleError
                  ? 'bg-rose-50 border-rose-300 animate-shake'
                  : 'bg-indigo-50/40 border-dashed border-indigo-200'
              }`}
            >
              {Array.from({ length: currentUnscrambleTarget.word.length }).map((_, idx) => {
                const placed = placedLetters[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => placed && handlePlacedClick(placed.id)}
                    disabled={unscrambleSolved || !placed}
                    className={`w-11 h-12 sm:w-14 sm:h-14 rounded-xl font-display font-extrabold text-xl sm:text-2xl flex items-center justify-center transition cursor-pointer shadow-xs ${
                      placed
                        ? unscrambleSolved
                          ? 'bg-emerald-500 text-white shadow-emerald-200'
                          : 'bg-white text-indigo-900 border-2 border-indigo-400 hover:border-rose-400 hover:bg-rose-50'
                        : 'bg-white/60 border-2 border-dashed border-slate-300 text-transparent cursor-default'
                    }`}
                  >
                    {placed ? placed.letter : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Letter Tiles Pool */}
          {!unscrambleSolved && (
            <div className="space-y-3">
              <div className="text-center text-xs font-semibold text-slate-500">
                Click a tile or type on your keyboard to place letters:
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {availableTiles.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile.id)}
                    disabled={tile.used}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-display font-extrabold text-xl sm:text-2xl transition cursor-pointer ${
                      tile.used
                        ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed scale-95 opacity-50'
                        : 'bg-white hover:bg-indigo-600 text-slate-800 hover:text-white border-2 border-slate-200 hover:border-indigo-600 shadow-sm hover:scale-105 active:scale-95'
                    }`}
                  >
                    {tile.letter}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    initUnscrambleWord(currentUnscrambleTarget);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>

                <button
                  onClick={handleRevealNextLetter}
                  disabled={placedLetters.length >= currentUnscrambleTarget.word.length}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Letter</span>
                </button>

                <button
                  onClick={handleNextUnscramble}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 transition cursor-pointer"
                >
                  Skip Word
                </button>
              </div>
            </div>
          )}

          {/* Solved Celebration Banner */}
          {unscrambleSolved && (
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-emerald-900">
                    Brilliant! You solved "{currentUnscrambleTarget.word}"!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Pronunciation: /{currentUnscrambleTarget.pronunciation}/ • +50 Points Awarded!
                  </p>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900">Example in a Sentence:</span>{' '}
                <span className="italic">"{currentUnscrambleTarget.example}"</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  id="unscramble-next-btn"
                  onClick={handleNextUnscramble}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Next Anagram Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!isWordLearned(currentUnscrambleTarget.id) && (
                  <button
                    onClick={() => markWordLearned(currentUnscrambleTarget.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs border border-emerald-300 hover:bg-emerald-100/50 transition cursor-pointer"
                  >
                    Mark Word as Learned
                  </button>
                )}

                {onPracticeWord && (
                  <button
                    onClick={() => onPracticeWord(currentUnscrambleTarget)}
                    className="px-3.5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs border border-indigo-200 hover:bg-indigo-50 transition cursor-pointer"
                  >
                    Use in Sentence
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: WORD DETECTIVE (MYSTERY WORD) */}
      {selectedGame === 'detective' && currentDetectiveWord && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          {/* Header & Torches */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-wide">
                Grade {currentDetectiveWord.gradeLevel} Mystery Word
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Category: <strong className="text-slate-800 capitalize">{currentDetectiveWord.category}</strong>
              </p>
            </div>

            {/* 6 Torches / Lanterns */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1">Torches:</span>
              <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                {Array.from({ length: MAX_TORCHES }).map((_, idx) => {
                  const isLit = idx < torchesRemaining;
                  return (
                    <div
                      key={idx}
                      className={`p-1 rounded-lg transition-transform ${
                        isLit
                          ? 'text-amber-500 scale-105'
                          : 'text-slate-300 opacity-40 scale-90'
                      }`}
                      title={isLit ? 'Torch Lit' : 'Torch Extinguished'}
                    >
                      <Flame className={`w-5 h-5 ${isLit ? 'fill-amber-500' : ''}`} />
                    </div>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {torchesRemaining} / {MAX_TORCHES}
              </span>
            </div>
          </div>

          {/* Clue Investigation Drawer */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-indigo-600" />
                Detective Clue
              </span>
              <button
                onClick={() => setShowDetectiveClue(!showDetectiveClue)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                {showDetectiveClue ? 'Hide Clue' : 'Reveal Clue'}
              </button>
            </div>
            {showDetectiveClue ? (
              <p className="text-sm font-medium text-slate-800 mt-1">
                {currentDetectiveWord.definition}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Need a hint? Click "Reveal Clue" to read the word's definition.
              </p>
            )}
          </div>

          {/* Mystery Word Display (Blanks) */}
          <div className="py-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {currentDetectiveWord.word.toUpperCase().split('').map((char, idx) => {
              const isRevealed = guessedLetters.has(char) || isDetectiveLost || isDetectiveWon;
              return (
                <div
                  key={idx}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl font-display font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-xs transition-all ${
                    isRevealed
                      ? isDetectiveLost
                        ? 'bg-rose-50 text-rose-700 border-2 border-rose-300'
                        : 'bg-indigo-50 text-indigo-900 border-2 border-indigo-400'
                      : 'bg-white border-2 border-slate-300 text-transparent'
                  }`}
                >
                  {isRevealed ? char : ''}
                </div>
              );
            })}
          </div>

          {/* On-Screen A-Z Keyboard */}
          {!isDetectiveWon && !isDetectiveLost && (
            <div className="space-y-2">
              <div className="text-center text-xs font-semibold text-slate-500 mb-2">
                Click a letter or press any key on your keyboard:
              </div>
              <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
                  const isGuessed = guessedLetters.has(letter);
                  const isCorrect = isGuessed && currentDetectiveWord.word.toUpperCase().includes(letter);
                  const isWrong = isGuessed && !currentDetectiveWord.word.toUpperCase().includes(letter);

                  return (
                    <button
                      key={letter}
                      onClick={() => handleGuessLetter(letter)}
                      disabled={isGuessed}
                      className={`w-9 h-10 sm:w-10 sm:h-11 rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                        isCorrect
                          ? 'bg-emerald-500 text-white border border-emerald-600 shadow-xs'
                          : isWrong
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 line-through opacity-50 cursor-not-allowed'
                          : 'bg-white hover:bg-indigo-50 text-slate-800 border border-slate-200 hover:border-indigo-400 shadow-2xs hover:scale-105 active:scale-95'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Victory / Defeat State Cards */}
          {isDetectiveWon && (
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-emerald-900">
                    Mystery Solved! The word is "{currentDetectiveWord.word}"!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Outstanding deduction! You solved it with {torchesRemaining} torches remaining.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={initDetectiveGame}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Solve Another Mystery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => soundFx.speakWord(currentDetectiveWord.word)}
                  className="p-2.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100/50 transition cursor-pointer"
                  title="Hear Word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {isDetectiveLost && (
            <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-rose-900">
                    All torches went out! The mystery word was "{currentDetectiveWord.word}".
                  </h4>
                  <p className="text-xs text-rose-700">
                    Meaning: {currentDetectiveWord.definition}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={initDetectiveGame}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Next Word</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: MEMORY MATCH (CARD PAIRS) */}
      {selectedGame === 'match' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMatchMode('def');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  matchMode === 'def'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Word ↔ Definition
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMatchMode('syn');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  matchMode === 'syn'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Word ↔ Synonym
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{matchTime}s</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Moves: {movesCount}</span>
              </div>
              <button
                onClick={initMemoryGame}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                title="Restart Round"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid (12 Cards: 6 Pairs) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {memoryCards.map((card) => {
              const isVisible = card.isFlipped || card.isMatched;
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`h-28 sm:h-32 rounded-2xl p-3 border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center select-none shadow-xs ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 scale-98 opacity-90'
                      : isVisible
                      ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950'
                      : 'bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-800 text-white hover:scale-[1.02] hover:shadow-md'
                  }`}
                >
                  {isVisible ? (
                    <div className="space-y-1">
                      {card.type === 'word' ? (
                        <>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                            {card.subtext || 'Word'}
                          </span>
                          <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-900 mt-1">
                            {card.content}
                          </h4>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            {card.type === 'definition' ? 'Meaning' : 'Synonym'}
                          </span>
                          <p className="text-xs sm:text-[13px] font-medium text-slate-800 line-clamp-3 leading-snug mt-1">
                            {card.content}
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-indigo-200">
                      <Sparkles className="w-6 h-6 mb-1 text-amber-300" />
                      <span className="text-[11px] font-bold tracking-wider uppercase">Match</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Complete Banner */}
          {matchCompleted && (
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-3 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-emerald-900">
                    Grid Cleared! Finished in {matchTime} seconds with {movesCount} moves!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    {movesCount <= 9
                      ? '★★★ 3-Star Rating! Flawless photographic memory!'
                      : movesCount <= 14
                      ? '★★ 2-Star Rating! Great vocabulary retention!'
                      : '★ Good job completing the full grid!'}
                  </p>
                </div>
              </div>
              <div className="pt-1">
                <button
                  onClick={initMemoryGame}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Another Round</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 4: SPEED RUSH (60s LIGHTNING ROUND) */}
      {selectedGame === 'speed_rush' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          {!speedActive && !speedRoundOver ? (
            /* Intro / Ready Screen */
            <div className="max-w-lg mx-auto text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center border-2 border-amber-200 shadow-sm">
                <Zap className="w-8 h-8 fill-amber-500" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Synonym &amp; Antonym Speed Rush
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  You will be shown pairs of English words. Quickly classify each pair as{' '}
                  <strong className="text-indigo-600">Synonyms</strong>,{' '}
                  <strong className="text-rose-600">Antonyms</strong>, or{' '}
                  <strong className="text-slate-700">Unrelated</strong> before the 60-second timer runs out.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1 text-left">
                <div className="font-bold text-slate-900">Hotkeys:</div>
                <div>Press <kbd className="px-1.5 py-0.5 bg-white border rounded">1</kbd> or <kbd className="px-1.5 py-0.5 bg-white border rounded">S</kbd> for Synonym</div>
                <div>Press <kbd className="px-1.5 py-0.5 bg-white border rounded">2</kbd> or <kbd className="px-1.5 py-0.5 bg-white border rounded">A</kbd> for Antonym</div>
                <div>Press <kbd className="px-1.5 py-0.5 bg-white border rounded">3</kbd> or <kbd className="px-1.5 py-0.5 bg-white border rounded">U</kbd> for Unrelated</div>
              </div>

              <button
                id="start-speed-rush-btn"
                onClick={startSpeedRush}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2 mx-auto hover:scale-105"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>Start 60-Second Rush</span>
              </button>
            </div>
          ) : speedActive && speedCurrentPair ? (
            /* Active Game Session */
            <div className="space-y-6">
              {/* Header Ticker */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-display font-extrabold text-slate-900">
                    {speedTimeLeft}s
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Flame className="w-4 h-4 fill-amber-500" />
                    <span>Streak: {speedStreak}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400">Score</span>
                    <div className="text-2xl font-display font-extrabold text-indigo-600">
                      {speedScore}
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(speedTimeLeft / 60) * 100}%` }}
                />
              </div>

              {/* Word Pair Card */}
              <div
                className={`py-10 px-6 rounded-3xl border-2 text-center transition-all ${
                  speedFeedback === 'correct'
                    ? 'bg-emerald-50 border-emerald-400'
                    : speedFeedback === 'wrong'
                    ? 'bg-rose-50 border-rose-400 animate-shake'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Are these words Synonyms, Antonyms, or Unrelated?
                </div>

                <div className="flex items-center justify-center gap-4 sm:gap-8 mt-4">
                  <div className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
                    {speedCurrentPair.wordA}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-2.5 py-1 rounded-full border border-slate-200">
                    VS
                  </span>
                  <div className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
                    {speedCurrentPair.wordB}
                  </div>
                </div>
              </div>

              {/* 3 Large Action Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleSpeedChoice('synonym')}
                  className="py-4 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-base shadow-sm transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Synonyms (=)</span>
                  <span className="text-[11px] font-normal text-indigo-200">Same meaning</span>
                </button>

                <button
                  onClick={() => handleSpeedChoice('antonym')}
                  className="py-4 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-base shadow-sm transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Antonyms (≠)</span>
                  <span className="text-[11px] font-normal text-rose-200">Opposite meaning</span>
                </button>

                <button
                  onClick={() => handleSpeedChoice('unrelated')}
                  className="py-4 px-4 rounded-2xl bg-slate-700 hover:bg-slate-800 active:scale-95 text-white font-bold text-base shadow-sm transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Unrelated (∅)</span>
                  <span className="text-[11px] font-normal text-slate-300">Different topics</span>
                </button>
              </div>
            </div>
          ) : (
            /* Round Finished Summary */
            <div className="space-y-6 animate-fade-in">
              <div className="text-center py-4">
                <div className="inline-flex p-3 rounded-2xl bg-amber-50 text-amber-500 mb-2 border border-amber-200">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-3xl text-slate-900">
                  Speed Rush Completed!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  You scored <strong className="text-indigo-600 font-extrabold">{speedScore} points</strong> with a best streak of {speedBestStreak}!
                </p>
              </div>

              {/* Review of Tested Pairs */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 max-h-60 overflow-y-auto space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Review Pairs Tested ({speedAnswerLog.length} answered)
                </div>
                {speedAnswerLog.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between text-xs gap-3"
                  >
                    <div className="flex items-center gap-2">
                      {item.userCorrect ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-slate-900">
                          {item.pair.wordA} ↔ {item.pair.wordB}
                        </span>{' '}
                        <span className="text-slate-500 capitalize">({item.pair.relation})</span>
                        <p className="text-[11px] text-slate-500">{item.pair.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={startSpeedRush}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Another Rush</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 5: GRAMMAR & PARTS OF SPEECH SORTER */}
      {selectedGame === 'pos_sorter' && currentPosWord && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100 text-xs font-bold uppercase tracking-wider">
                Grammar Sorting Lab
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Classify the word's grammatical function based on how it is used.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                Correct: {posScore} / {posAnsweredCount}
              </div>
            </div>
          </div>

          {/* Word in Context Banner */}
          <div className="py-8 px-6 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Target Vocabulary Word
            </span>
            <div className="text-4xl font-display font-extrabold text-slate-900">
              {currentPosWord.word}
            </div>
            <p className="text-xs font-mono text-indigo-600 font-semibold">
              /{currentPosWord.pronunciation}/
            </p>

            <div className="max-w-xl mx-auto bg-white p-4 rounded-2xl border border-slate-200/90 text-sm sm:text-base text-slate-800 leading-relaxed mt-4">
              "{currentPosWord.example}"
            </div>
          </div>

          {/* 4 Part of Speech Buckets */}
          {!posFeedback ? (
            <div className="space-y-3">
              <div className="text-center text-xs font-semibold text-slate-500">
                Choose the correct part of speech:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handlePosChoice('noun')}
                  className="p-4 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 transition flex flex-col items-center justify-center gap-1 cursor-pointer group"
                >
                  <span className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600">
                    Noun
                  </span>
                  <span className="text-[11px] text-slate-500">Person, Place, Thing</span>
                </button>

                <button
                  onClick={() => handlePosChoice('verb')}
                  className="p-4 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 transition flex flex-col items-center justify-center gap-1 cursor-pointer group"
                >
                  <span className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600">
                    Verb
                  </span>
                  <span className="text-[11px] text-slate-500">Action / State</span>
                </button>

                <button
                  onClick={() => handlePosChoice('adjective')}
                  className="p-4 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 transition flex flex-col items-center justify-center gap-1 cursor-pointer group"
                >
                  <span className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600">
                    Adjective
                  </span>
                  <span className="text-[11px] text-slate-500">Describes a Noun</span>
                </button>

                <button
                  onClick={() => handlePosChoice('adverb')}
                  className="p-4 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 transition flex flex-col items-center justify-center gap-1 cursor-pointer group"
                >
                  <span className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600">
                    Adverb
                  </span>
                  <span className="text-[11px] text-slate-500">Modifies a Verb</span>
                </button>
              </div>
            </div>
          ) : (
            /* Answer Explanation Banner */
            <div
              className={`p-5 rounded-2xl border-2 space-y-4 animate-fade-in ${
                posFeedback.correct
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${
                    posFeedback.correct ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                >
                  {posFeedback.correct ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg">
                    {posFeedback.correct ? 'Correct Classification!' : 'Not Quite!'}
                  </h4>
                  <p className="text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {posFeedback.explanation}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleNextPosWord}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition flex items-center gap-2 cursor-pointer ${
                    posFeedback.correct
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  <span>Next Grammar Word</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
