import React, { useState, useEffect } from 'react';
import { ActiveTab, QuizQuestion, QuizResultSummary, WordItem } from '../types';
import { generateQuiz } from '../data/quizBank';
import { useProgress } from '../context/ProgressContext';
import { soundFx } from '../utils/sound';
import { QuizResults } from './QuizResults';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Volume2,
  BookOpen,
  Link,
  Layers,
} from 'lucide-react';

interface VocabularyQuizProps {
  setActiveTab: (tab: ActiveTab) => void;
  onPracticeWord?: (word: WordItem) => void;
}

export const VocabularyQuiz: React.FC<VocabularyQuizProps> = ({ setActiveTab, onPracticeWord }) => {
  const { recordQuizResult } = useProgress();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answersState, setAnswersState] = useState<{
    correctCount: number;
    missedWords: string[];
    missedDetails: {
      questionPrompt: string;
      targetWord: string;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    }[];
  }>({
    correctCount: 0,
    missedWords: [],
    missedDetails: [],
  });

  // Interactive state for 'match' type question
  const [matchingSelections, setMatchingSelections] = useState<{
    selectedWord: string | null;
    pairedMatches: Record<string, string>; // word -> meaning
  }>({ selectedWord: null, pairedMatches: {} });

  const [quizSummary, setQuizSummary] = useState<QuizResultSummary | null>(null);

  // Initialize a fresh 10-question quiz on mount
  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const qList = generateQuiz({ count: 10 });
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuizSummary(null);
    setAnswersState({
      correctCount: 0,
      missedWords: [],
      missedDetails: [],
    });
    setMatchingSelections({ selectedWord: null, pairedMatches: {} });
  };

  const currentQ = questions[currentIndex];

  if (!currentQ && !quizSummary) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-500 font-medium">Preparing your 10-question quiz...</p>
      </div>
    );
  }

  // If quiz is finished, show QuizResults
  if (quizSummary) {
    return (
      <QuizResults
        summary={quizSummary}
        onRetry={startNewQuiz}
        setActiveTab={setActiveTab}
        onPracticeWord={onPracticeWord}
      />
    );
  }

  // Handle standard option selection (meaning, synonym, antonym, sentence_completion, spelling)
  const handleSelectOption = (option: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
    setHasAnswered(true);

    const isCorrect = option.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

    if (isCorrect) {
      soundFx.playCorrect();
      setAnswersState((prev) => ({
        ...prev,
        correctCount: prev.correctCount + 1,
      }));
    } else {
      soundFx.playIncorrect();
      setAnswersState((prev) => ({
        ...prev,
        missedWords: currentQ.targetWord ? [...prev.missedWords, currentQ.targetWord] : prev.missedWords,
        missedDetails: [
          ...prev.missedDetails,
          {
            questionPrompt: currentQ.sentence ? `${currentQ.prompt} "${currentQ.sentence}"` : currentQ.prompt,
            targetWord: currentQ.targetWord,
            userAnswer: option,
            correctAnswer: currentQ.correctAnswer,
            explanation: currentQ.explanation,
          },
        ],
      }));
    }
  };

  // Interactive Matching handler
  const handleWordClick = (word: string) => {
    if (hasAnswered) return;
    setMatchingSelections((prev) => ({
      ...prev,
      selectedWord: prev.selectedWord === word ? null : word,
    }));
  };

  const handleMeaningClick = (meaning: string) => {
    if (hasAnswered || !matchingSelections.selectedWord) return;

    soundFx.playClick();
    const word = matchingSelections.selectedWord;
    const newPairs = { ...matchingSelections.pairedMatches, [word]: meaning };

    setMatchingSelections({
      selectedWord: null,
      pairedMatches: newPairs,
    });

    // Check if all pairs are filled
    const totalPairsNeeded = currentQ.matchingPairs ? currentQ.matchingPairs.length : 4;
    if (Object.keys(newPairs).length === totalPairsNeeded) {
      // Evaluate matching score
      setHasAnswered(true);
      let matchesCorrect = true;
      currentQ.matchingPairs?.forEach((pair) => {
        if (newPairs[pair.word] !== pair.meaning) {
          matchesCorrect = false;
        }
      });

      if (matchesCorrect) {
        soundFx.playCorrect();
        setAnswersState((prev) => ({
          ...prev,
          correctCount: prev.correctCount + 1,
        }));
      } else {
        soundFx.playIncorrect();
        setAnswersState((prev) => ({
          ...prev,
          missedWords: [...prev.missedWords, ...Object.keys(newPairs)],
          missedDetails: [
            ...prev.missedDetails,
            {
              questionPrompt: currentQ.prompt,
              targetWord: 'Matching Exercise',
              userAnswer: 'Some pairs mismatched',
              correctAnswer: 'Exact word-definition pairs',
              explanation: currentQ.explanation,
            },
          ],
        }));
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
      setMatchingSelections({ selectedWord: null, pairedMatches: {} });
    } else {
      // Complete quiz
      const total = questions.length;
      const correct = answersState.correctCount;
      const percentage = Math.round((correct / total) * 100);

      const summary = recordQuizResult({
        quizType: 'standard',
        totalQuestions: total,
        correctAnswers: correct,
        scorePercentage: percentage,
        missedWordIds: Array.from(new Set(answersState.missedWords)),
        missedQuestions: answersState.missedDetails,
      });

      setQuizSummary(summary);
      if (percentage >= 90) {
        soundFx.playCelebration();
      }
    }
  };

  const getQuestionTypeBadge = (type: string) => {
    switch (type) {
      case 'meaning':
        return { label: 'Definition Check', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'synonym':
        return { label: 'Synonym Match', color: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'antonym':
        return { label: 'Antonym Opposite', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'sentence_completion':
        return { label: 'Complete the Sentence', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'spelling':
        return { label: 'Spelling Challenge', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'match':
        return { label: 'Interactive Meaning Match', color: 'bg-teal-50 text-teal-800 border-teal-200' };
      default:
        return { label: 'Vocabulary Question', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const typeBadge = getQuestionTypeBadge(currentQ.type);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Quiz Progress Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${typeBadge.color}`}
            >
              {typeBadge.label}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Grade 6–8 Practice
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Score: {answersState.correctCount}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Prompt */}
        <div>
          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
            {currentQ.prompt}
          </h3>

          {/* If sentence completion, show highlighted sentence */}
          {currentQ.sentence && (
            <div className="mt-3.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 font-medium text-slate-800 text-base sm:text-lg">
              "{currentQ.sentence}"
            </div>
          )}
        </div>

        {/* Match Question Type UI */}
        {currentQ.type === 'match' && currentQ.matchingPairs ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-medium">
              Click a vocabulary word on the left, then click its matching definition on the right.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Words Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Words
                </span>
                {currentQ.matchingPairs.map((pair) => {
                  const isPaired = !!matchingSelections.pairedMatches[pair.word];
                  const isSelected = matchingSelections.selectedWord === pair.word;

                  return (
                    <button
                      key={pair.word}
                      disabled={hasAnswered}
                      onClick={() => handleWordClick(pair.word)}
                      className={`w-full p-3.5 rounded-xl border-2 font-display font-bold text-sm text-left transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : isPaired
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800 bg-white'
                      }`}
                    >
                      <span className="capitalize">{pair.word}</span>
                      {isPaired && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Meanings Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Definitions
                </span>
                {currentQ.matchingPairs.map((pair) => {
                  const pairedWord = Object.keys(matchingSelections.pairedMatches).find(
                    (w) => matchingSelections.pairedMatches[w] === pair.meaning
                  );

                  return (
                    <button
                      key={pair.meaning}
                      disabled={hasAnswered || !matchingSelections.selectedWord}
                      onClick={() => handleMeaningClick(pair.meaning)}
                      className={`w-full p-3.5 rounded-xl border-2 text-xs font-medium text-left transition flex items-center justify-between cursor-pointer disabled:cursor-default ${
                        pairedWord
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                          : matchingSelections.selectedWord
                          ? 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 text-slate-800'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                      }`}
                    >
                      <span>{pair.meaning}</span>
                      {pairedWord && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 shrink-0 ml-2">
                          {pairedWord}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {hasAnswered && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="font-semibold text-slate-900">Correct Pairs:</strong>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {currentQ.matchingPairs.map((p) => (
                    <li key={p.word}>
                      <span className="font-bold capitalize">{p.word}:</span> {p.meaning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          /* Standard Multiple Choice Options */
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer =
                option.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

              let btnStyle =
                'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnStyle =
                    'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-2 ring-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-opt-${idx}`}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl font-display font-bold text-xs flex items-center justify-center shrink-0 ${
                        hasAnswered && isCorrectAnswer
                          ? 'bg-emerald-500 text-white'
                          : hasAnswered && isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base leading-snug">{option}</span>
                  </div>

                  {hasAnswered && (
                    <div className="shrink-0">
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Immediate Educational Explanation (after answer) */}
        {hasAnswered && currentQ.type !== 'match' && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
              selectedAnswer?.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim()
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedAnswer?.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim() ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base">
                  {selectedAnswer?.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim()
                    ? 'Spot on!'
                    : `Correct answer: "${currentQ.correctAnswer}"`}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Question / Finish Button */}
        {hasAnswered && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {currentIndex + 1 === questions.length ? 'Final Question Completed' : 'Great pace!'}
            </span>

            <button
              id="quiz-next-btn"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Quiz Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
