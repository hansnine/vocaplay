import React, { useState } from 'react';
import { ActiveTab, WordItem } from '../types';
import { useProgress } from '../context/ProgressContext';
import { WORDS } from '../data/words';
import { soundFx } from '../utils/sound';
import {
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Percent,
  Sparkles,
  Volume2,
  RotateCcw,
  ArrowRight,
  Flame,
  Star,
  Compass,
  Crown,
  PenTool,
  Search,
  AlertCircle,
  Gamepad2,
  Shuffle,
  Zap,
} from 'lucide-react';

interface ProgressDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onPracticeWord?: (word: WordItem) => void;
}

const BADGE_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  BookOpen,
  Compass,
  Trophy,
  Crown,
  PenTool,
  Search,
  Gamepad2,
  Shuffle,
  Zap,
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  setActiveTab,
  onPracticeWord,
}) => {
  const { progress, badges, resetAllProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calculate stats
  const totalWords = WORDS.length;
  const learnedCount = progress.learnedWordIds.length;
  const learnedPercentage = Math.round((learnedCount / totalWords) * 100);

  const accuracy =
    progress.questionsAnswered > 0
      ? Math.round((progress.correctAnswersCount / progress.questionsAnswered) * 100)
      : 0;

  // Recently learned words (last 6)
  const recentlyLearnedWords: WordItem[] = progress.learnedWordIds
    .slice(-6)
    .reverse()
    .map((id) => WORDS.find((w) => w.id === id))
    .filter((w): w is WordItem => !!w);

  // Missed words / Needs practice
  const missedWordsList: WordItem[] = progress.missedWordIds
    .slice(0, 6)
    .map((id) => WORDS.find((w) => w.id === id || w.word.toLowerCase() === id.toLowerCase()))
    .filter((w): w is WordItem => !!w);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Dashboard Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2 border border-indigo-100">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Student Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            My Learning Progress
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track your vocabulary mastery, quiz milestones, and unlocked achievement badges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 cursor-pointer"
            >
              Reset Progress
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-rose-50 p-1.5 rounded-xl border border-rose-200 text-xs">
              <span className="text-rose-800 font-bold px-1">Confirm reset?</span>
              <button
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                }}
                className="px-2 py-1 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-1 bg-white text-slate-600 rounded-lg font-medium border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary Key Stats Cards (5 Required Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* 1. Total Words Learned */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 border border-emerald-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              {learnedCount}
              <span className="text-xs font-normal text-slate-400 ml-1">/ {totalWords}</span>
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Total Words Learned</div>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${learnedPercentage}%` }}
            />
          </div>
        </div>

        {/* 2. Quizzes Completed */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 border border-indigo-100">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              {progress.quizzesCompleted}
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Quizzes Completed</div>
          </div>
          <div className="text-[11px] text-slate-400 mt-3 font-medium">10 Questions Each</div>
        </div>

        {/* 3. Questions Answered */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2 border border-sky-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              {progress.questionsAnswered}
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Questions Answered</div>
          </div>
          <div className="text-[11px] text-slate-400 mt-3 font-medium">
            {progress.correctAnswersCount} Correct
          </div>
        </div>

        {/* 4. Accuracy Percentage */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 border border-teal-100">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              {progress.questionsAnswered > 0 ? `${accuracy}%` : '—'}
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Accuracy Percentage</div>
          </div>
          <div className="text-[11px] text-slate-400 mt-3 font-medium">Overall Rate</div>
        </div>

        {/* 5. Highest Score */}
        <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 border border-amber-100">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-900">
              {progress.highestScore > 0 ? `${progress.highestScore}%` : '—'}
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">Highest Score</div>
          </div>
          <div className="text-[11px] text-slate-400 mt-3 font-medium">Personal Best</div>
        </div>
      </div>

      {/* Word Games Arcade Metrics Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-sky-900 rounded-3xl p-6 sm:p-7 text-white shadow-md border border-indigo-700/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center border border-white/20">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">
                Word Games Arcade Records
              </h3>
              <p className="text-xs text-indigo-200">
                Performance across Anagrams, Detective mysteries, Memory Match, and Speed Rush.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('games');
            }}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 self-start sm:self-center shadow-xs cursor-pointer"
          >
            <span>Play Word Games</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <div className="text-xs text-indigo-200 font-medium">Games Played</div>
            <div className="text-2xl font-display font-bold text-amber-300 mt-1">
              {progress.gamesPlayedCount || 0}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <div className="text-xs text-indigo-200 font-medium">Anagrams Unscrambled</div>
            <div className="text-2xl font-display font-bold text-sky-300 mt-1">
              {progress.wordsUnscrambledCount || 0}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <div className="text-xs text-indigo-200 font-medium">Detective Solved</div>
            <div className="text-2xl font-display font-bold text-emerald-300 mt-1">
              {progress.detectiveWordsSolved || 0}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <div className="text-xs text-indigo-200 font-medium">Speed Rush High Score</div>
            <div className="text-2xl font-display font-bold text-amber-300 mt-1">
              {progress.speedRushBestScore || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                Achievement Badges
              </h3>
              <p className="text-xs text-slate-500">
                Earn milestone badges by learning words, acing quizzes, and constructing sentences.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {badges.filter((b) => b.unlocked).length} of {badges.length} Unlocked
          </span>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {badges.map((badge) => {
            const Icon = BADGE_ICON_MAP[badge.icon] || Star;

            return (
              <div
                key={badge.id}
                id={`badge-${badge.id}`}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-amber-50/80 to-yellow-50/40 border-amber-300 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200/80 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    badge.unlocked
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-display font-bold text-sm truncate ${
                        badge.unlocked ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {badge.title}
                    </h4>
                    {badge.unlocked && (
                      <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/70 px-1.5 py-0.2 rounded">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                    {badge.description}
                  </p>
                  <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {badge.requirement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Section: Recently Learned Words & Words Needing Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recently Learned Words */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Recently Learned Words
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('learn')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
              >
                View All &rarr;
              </button>
            </div>

            {recentlyLearnedWords.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">
                  You haven't marked any words as learned yet.
                </p>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Start Learning Words
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentlyLearnedWords.map((word) => (
                  <div
                    key={word.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-slate-900 capitalize">
                          {word.word}
                        </span>
                        <span className="text-[10px] font-mono text-indigo-600">
                          /{word.pronunciation}/
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate max-w-[240px] mt-0.5">
                        {word.definition}
                      </p>
                    </div>

                    <button
                      onClick={() => soundFx.speakWord(word.word)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-white transition cursor-pointer"
                      title={`Listen to ${word.word}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Words That Need More Practice */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Words for Practice
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('quiz')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
              >
                Practice Quiz &rarr;
              </button>
            </div>

            {missedWordsList.length === 0 ? (
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-emerald-900 font-bold">
                  No weak vocabulary words recorded!
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Complete quizzes to find and conquer words that challenge you.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {missedWordsList.map((word) => (
                  <div
                    key={word.id}
                    className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-slate-900 capitalize">
                          {word.word}
                        </span>
                        <span className="text-[10px] font-mono text-amber-800">
                          Grade {word.gradeLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate max-w-[220px] mt-0.5">
                        {word.definition}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (onPracticeWord) onPracticeWord(word);
                        setActiveTab('sentence_builder');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-bold text-[11px] hover:bg-amber-100 transition cursor-pointer shrink-0"
                    >
                      Practice
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
