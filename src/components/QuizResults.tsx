import React from 'react';
import { ActiveTab, QuizResultSummary, WordItem } from '../types';
import { WORDS } from '../data/words';
import { soundFx } from '../utils/sound';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Volume2,
  Home,
  Star,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface QuizResultsProps {
  summary: QuizResultSummary;
  onRetry: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onPracticeWord?: (word: WordItem) => void;
}

export function getPerformanceTier(percentage: number): {
  title: string;
  badgeColor: string;
  feedback: string;
} {
  if (percentage >= 90) {
    return {
      title: 'Vocabulary Champion!',
      badgeColor: 'from-amber-400 via-amber-500 to-yellow-600 text-slate-950',
      feedback: 'Outstanding mastery! You demonstrated top-tier vocabulary skills and sharp linguistic precision. Keep up the brilliant work!',
    };
  } else if (percentage >= 75) {
    return {
      title: 'Excellent Vocabulary Skills!',
      badgeColor: 'from-sky-500 to-indigo-600 text-white',
      feedback: 'Great job! You have a solid grasp of key middle school vocabulary terms, synonyms, and context meanings.',
    };
  } else if (percentage >= 60) {
    return {
      title: 'Good Progress — Keep Practising!',
      badgeColor: 'from-teal-500 to-emerald-600 text-white',
      feedback: 'Nice effort! You are making steady progress. Review the missed words below and try using them in sentences to lock them in.',
    };
  } else {
    return {
      title: 'Keep Learning — You Can Improve!',
      badgeColor: 'from-rose-400 to-orange-500 text-white',
      feedback: 'Don’t be discouraged! Vocabulary grows through repeated practice. Check the missed words below, listen to their pronunciations, and try again.',
    };
  }
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  summary,
  onRetry,
  setActiveTab,
  onPracticeWord,
}) => {
  const tier = getPerformanceTier(summary.scorePercentage);
  const incorrectCount = summary.totalQuestions - summary.correctAnswers;

  // Find missed word details
  const missedWordsList: WordItem[] = summary.missedWordIds
    .map((id) => WORDS.find((w) => w.id === id || w.word.toLowerCase() === id.toLowerCase()))
    .filter((w): w is WordItem => !!w);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Primary Result Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-gradient-to-r shadow-xs ${tier.badgeColor}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{tier.title}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Quiz Completed!
        </h2>

        {/* Score Ring / Display */}
        <div className="my-6 inline-flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200/80 min-w-[200px]">
          <div className="text-5xl sm:text-6xl font-display font-black text-indigo-600">
            {summary.scorePercentage}%
          </div>
          <p className="text-sm font-bold text-slate-600 mt-1">
            {summary.correctAnswers} of {summary.totalQuestions} Questions Correct
          </p>
        </div>

        {/* Performance Tier Feedback */}
        <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {tier.feedback}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-left">
              <div className="text-xl font-bold font-display text-emerald-950">
                {summary.correctAnswers}
              </div>
              <div className="text-xs font-semibold text-emerald-700">Correct Answers</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center gap-3">
            <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
            <div className="text-left">
              <div className="text-xl font-bold font-display text-rose-950">
                {incorrectCount}
              </div>
              <div className="text-xs font-semibold text-rose-700">Incorrect Answers</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          <button
            id="quiz-retry-btn"
            onClick={onRetry}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Another Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>View Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Words that need more practice section */}
      {missedWordsList.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Words That Need More Practice ({missedWordsList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Review these terms to strengthen your vocabulary for the next quiz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {missedWordsList.map((word) => (
              <div
                key={word.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 capitalize">
                        {word.word}
                      </h4>
                      <span className="text-xs font-mono text-indigo-600">
                        /{word.pronunciation}/ • {word.partOfSpeech}
                      </span>
                    </div>
                    <button
                      onClick={() => soundFx.speakWord(word.word)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                      title={`Listen to ${word.word}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed">
                    {word.definition}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 italic truncate max-w-[170px]">
                    "{word.example}"
                  </span>
                  <button
                    onClick={() => {
                      if (onPracticeWord) onPracticeWord(word);
                      setActiveTab('sentence_builder');
                    }}
                    className="font-bold text-indigo-600 hover:text-indigo-700 shrink-0 cursor-pointer"
                  >
                    Build Sentence &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missed Questions Breakdown (if available) */}
      {summary.missedQuestions && summary.missedQuestions.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900">
            Question Review
          </h3>
          <div className="space-y-3">
            {summary.missedQuestions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                <p className="text-xs font-bold text-slate-500">Question {idx + 1}</p>
                <p className="text-sm font-semibold text-slate-900">{q.questionPrompt}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="text-rose-700">
                    <span className="font-bold">Your answer: </span>
                    <span className="line-through">{q.userAnswer}</span>
                  </div>
                  <div className="text-emerald-800">
                    <span className="font-bold">Correct answer: </span>
                    <span>{q.correctAnswer}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                  <span className="font-semibold text-slate-700">Note: </span>
                  {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
