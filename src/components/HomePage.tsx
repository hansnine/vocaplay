import React, { useState } from 'react';
import { ActiveTab, WordItem } from '../types';
import { useProgress } from '../context/ProgressContext';
import { WORDS } from '../data/words';
import { soundFx } from '../utils/sound';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Trophy,
  FileText,
  Sparkles,
  ArrowRight,
  Volume2,
  CheckCircle2,
  Target,
  PenTool,
  BrainCircuit,
  Zap,
  Star,
  Gamepad2,
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectWord?: (word: WordItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onSelectWord }) => {
  const { progress, markWordLearned, isWordLearned } = useProgress();

  // Daily Spotlight Word (e.g. index based on current date)
  const spotlightWord = WORDS[3]; // 'canopy' or 'diligence' or 'catalyst'
  const [showDefinition, setShowDefinition] = useState(false);

  const handleSpeak = (text: string) => {
    soundFx.speakWord(text);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-sky-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-indigo-700/50">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-sky-200 text-xs font-semibold mb-4 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Middle School English Vocabulary • Grades 6, 7 &amp; 8</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Voca<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200">Play</span>
          </h1>

          <p className="font-display font-medium text-xl sm:text-2xl text-sky-100 mt-2">
            Discover Words. Play &amp; Master Vocabulary.
          </p>

          <p className="text-sm sm:text-base text-indigo-100/90 mt-4 leading-relaxed max-w-2xl font-normal">
            Step into an interactive vocabulary adventure designed specifically for Grade 6–8 students.
            Explore curated word categories, decipher meanings using context clues, construct original sentences,
            and conquer 10-question practice quizzes to unlock champion badges!
          </p>

          {/* 4 Required Primary Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              id="hero-start-learning-btn"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('learn');
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-base shadow-lg hover:from-amber-300 hover:to-amber-400 hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-slate-950" />
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              id="hero-word-games-btn"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('games');
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-base shadow-md shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 cursor-pointer border border-sky-300/30"
            >
              <Gamepad2 className="w-5 h-5 text-amber-300" />
              <span>Word Games</span>
            </button>

            <button
              id="hero-practice-quiz-btn"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quiz');
              }}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-sky-300" />
              <span>Practice Quiz</span>
            </button>

            <button
              id="hero-my-progress-btn"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('progress');
              }}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>My Progress</span>
            </button>

            <button
              id="hero-instructions-btn"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('instructions');
              }}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-300" />
              <span>Instructions</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Progress Momentum Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900">
              {progress.learnedWordIds.length} <span className="text-xs font-normal text-slate-400">/ {WORDS.length}</span>
            </div>
            <div className="text-xs font-semibold text-slate-500">Words Mastered</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900">{progress.quizzesCompleted}</div>
            <div className="text-xs font-semibold text-slate-500">Quizzes Done</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900">
              {progress.highestScore > 0 ? `${progress.highestScore}%` : '—'}
            </div>
            <div className="text-xs font-semibold text-slate-500">Highest Score</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900">
              {progress.unlockedBadges?.length || 0}
            </div>
            <div className="text-xs font-semibold text-slate-500">Badges Earned</div>
          </div>
        </div>
      </section>

      {/* 3. Daily Word Spotlight + Interactive Activity Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Word Spotlight Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 via-white to-sky-50 rounded-2xl p-6 border-2 border-indigo-200/70 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Word of the Day
              </span>
              <span className="text-xs font-semibold text-slate-500">Grade {spotlightWord.gradeLevel}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  {spotlightWord.word}
                </h3>
                <p className="text-xs font-mono text-indigo-600 font-semibold mt-0.5">
                  /{spotlightWord.pronunciation}/ • <span className="italic">{spotlightWord.partOfSpeech}</span>
                </p>
              </div>
              <button
                onClick={() => handleSpeak(spotlightWord.word)}
                className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition shadow-sm cursor-pointer"
                title="Hear Pronunciation"
                aria-label={`Pronounce ${spotlightWord.word}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-white border border-indigo-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Meaning</p>
              <p className="text-sm font-medium text-slate-800 mt-1 leading-relaxed">
                {spotlightWord.definition}
              </p>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100/80">
              <p className="text-xs font-bold text-indigo-900">Example in Context:</p>
              <p className="text-xs text-slate-700 italic mt-0.5 leading-relaxed">
                "{spotlightWord.example}"
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-indigo-100 flex items-center gap-2">
            <button
              onClick={() => {
                if (isWordLearned(spotlightWord.id)) {
                  // already learned
                } else {
                  markWordLearned(spotlightWord.id);
                }
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                isWordLearned(spotlightWord.id)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isWordLearned(spotlightWord.id) ? 'Mastered!' : 'Mark as Learned'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('sentence_builder');
              }}
              className="py-2.5 px-3 rounded-xl border border-indigo-200 hover:bg-indigo-50 text-indigo-700 text-xs font-bold transition cursor-pointer"
            >
              Use in Sentence
            </button>
          </div>
        </div>

        {/* Interactive Exploration Paths */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card: Word Games Arcade */}
          <div
            id="activity-card-games"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('games');
            }}
            className="sm:col-span-2 group bg-gradient-to-r from-indigo-900 via-indigo-800 to-sky-900 rounded-2xl p-5 border border-indigo-700 hover:border-amber-400 hover:shadow-lg transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white relative overflow-hidden"
          >
            <div className="relative z-10 flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shrink-0">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    New Arcade
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-200 transition">
                    Interactive Word Games
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 leading-relaxed max-w-xl">
                  Play Anagram Unscramble, Word Detective, Memory Match, Speed Rush, and Grammar Sorter.
                </p>
              </div>
            </div>
            <div className="relative z-10 self-end sm:self-center px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5 shrink-0">
              <span>Play Games</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 1: Word in Context Activity */}
          <div
            id="activity-card-context"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('context');
            }}
            className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-3 group-hover:text-indigo-600 transition">
                Word-in-Context Activity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Read real-world sentences and decipher tricky vocabulary using surrounding context clues.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-indigo-600">
              <span>Solve Clues</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Sentence Builder */}
          <div
            id="activity-card-sentences"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('sentence_builder');
            }}
            className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-3 group-hover:text-indigo-600 transition">
                Interactive Sentence Builder
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Arrange scrambled word tiles and write original sentences to use words correctly in your own writing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-indigo-600">
              <span>Construct Sentences</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: 10-Question Vocabulary Quiz */}
          <div
            id="activity-card-quiz"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('quiz');
            }}
            className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-3 group-hover:text-indigo-600 transition">
                10-Question Practice Quiz
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Test your skills across synonyms, antonyms, sentence completion, and spelling challenges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Take Quiz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Challenge Mode */}
          <div
            id="activity-card-challenge"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('challenge');
            }}
            className="group bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-purple-200 hover:border-purple-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-purple-950 mt-3 group-hover:text-purple-700 transition">
                Vocabulary Challenge Mode
              </h3>
              <p className="text-xs sm:text-sm text-purple-900/80 mt-1 leading-relaxed">
                Step up to higher difficulty! Ascend through multi-level context, connotation, and synthesis tasks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-200/70 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Start Challenge</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
