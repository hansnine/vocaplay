import React from 'react';
import { ActiveTab } from '../types';
import { soundFx } from '../utils/sound';
import {
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Trophy,
  PenTool,
  Award,
  Sparkles,
  Volume2,
  ArrowRight,
  TrendingUp,
  Target,
  Gamepad2,
  Download,
  FileCode,
} from 'lucide-react';

interface InstructionsProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2 border border-indigo-100">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Student Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          How to Use VocaPlay
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Welcome to your vocabulary headquarters! Here is everything you need to know to explore words, test your skills, and earn badges.
        </p>
      </div>

      {/* 5 Instructions Cards */}
      <div className="space-y-4">
        {/* 1. How to learn new words */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-display font-bold text-lg shrink-0 border border-indigo-100">
              1
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>How to Learn New Words</span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Head to the <strong>Learn Words</strong> page and pick a category (like <em>Nature, Science, Technology, or Feelings</em>).
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                <li>
                  Click the <strong>Speaker button</strong> (<Volume2 className="w-3.5 h-3.5 inline text-indigo-600" />) to hear the correct native pronunciation out loud.
                </li>
                <li>
                  Study the <strong>part of speech</strong>, <strong>simple definition</strong>, and <strong>example sentence</strong> to see how the word lives in real English.
                </li>
                <li>
                  Click <strong>"Mark as Learned"</strong> once you feel confident. It saves directly to your personal progress dashboard!
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('learn');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <span>Explore Learn Words</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. How to take a quiz */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-display font-bold text-lg shrink-0 border border-sky-100">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>How to Take a Quiz</span>
                <HelpCircle className="w-4 h-4 text-sky-600" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Click <strong>Practice Quiz</strong> to start a randomized 10-question quiz. You will encounter several question formats:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">Definition Questions:</span> Match words with clear meanings.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">Synonyms &amp; Antonyms:</span> Identify words with similar or opposite meanings.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">Sentence Completion:</span> Pick the exact word that completes a sentence blank.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">Spelling &amp; Meaning Match:</span> Spot commonly misspelled terms or link word pairs.
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('quiz');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 cursor-pointer"
                >
                  <span>Start a Practice Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. How scoring works */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-display font-bold text-lg shrink-0 border border-amber-100">
              3
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>How Scoring Works</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                At the end of every quiz, your score is calculated as a percentage based on 10 questions. Your results match one of four official achievement tiers:
              </p>
              <div className="space-y-2 pt-1">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-amber-950">90% – 100%</span>
                  <span className="font-display font-extrabold text-amber-800">Vocabulary Champion!</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-sky-950">75% – 89%</span>
                  <span className="font-display font-extrabold text-sky-800">Excellent Vocabulary Skills!</span>
                </div>
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-teal-950">60% – 74%</span>
                  <span className="font-display font-extrabold text-teal-800">Good Progress — Keep Practising!</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-rose-950">Below 60%</span>
                  <span className="font-display font-extrabold text-rose-800">Keep Learning — You Can Improve!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. How to view progress */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-display font-bold text-lg shrink-0 border border-teal-100">
              4
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>How to View Progress</span>
                <Trophy className="w-4 h-4 text-teal-600" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Click <strong>My Progress</strong> in the top menu anytime to open your personal dashboard. Here you can inspect:
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1 list-disc pl-5">
                <li><strong>Total words learned</strong> out of the full vocabulary bank.</li>
                <li><strong>Quizzes completed</strong> and overall question accuracy percentage.</li>
                <li><strong>Your personal highest score</strong>.</li>
                <li>
                  <strong>Milestone Achievement Badges</strong>, including <em>First Word, 10 Words Learned, Vocabulary Explorer, Quiz Master</em>, and <em>Vocabulary Champion</em>!
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. How to improve weak vocabulary areas */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-display font-bold text-lg shrink-0 border border-purple-100">
              5
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>How to Improve Weak Vocabulary Areas</span>
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whenever you miss a question during a quiz, VocaPlay saves that word to your <strong>Words That Need More Practice</strong> list.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                  <strong className="text-purple-900">Step A: Context Clues Activity</strong>
                  <p className="mt-0.5 text-slate-600">
                    Visit the <strong>In Context</strong> tab to practice identifying how surrounding sentences provide clues to tricky words.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <strong className="text-amber-900">Step B: Sentence Builder</strong>
                  <p className="mt-0.5 text-slate-600">
                    Open the <strong>Sentence Builder</strong> to construct or write your own sentences using your weak words. Writing the word in context builds true long-term memory!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Word Games Arcade */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-display font-bold text-lg shrink-0 border border-amber-200">
              6
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>Play Word Games in the Arcade</span>
                <Gamepad2 className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Take a break from traditional tests and level up your skills across five fast-paced language mini-games:
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                <li>
                  <strong>Anagram Unscramble:</strong> Reassemble scrambled letter tiles into the correct vocabulary word with meaning clues.
                </li>
                <li>
                  <strong>Word Detective:</strong> Guess letters to uncover the mystery word before all 6 explorer torches are extinguished.
                </li>
                <li>
                  <strong>Memory Match:</strong> Flip cards to pair vocabulary words with their definitions or synonyms.
                </li>
                <li>
                  <strong>Speed Rush:</strong> Race against a 60-second timer to rapidly classify words as Synonyms, Antonyms, or Unrelated.
                </li>
                <li>
                  <strong>Grammar Sorter:</strong> Categorize words into Nouns, Verbs, Adjectives, and Adverbs based on contextual sentences.
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('games');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Word Games Arcade</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Standalone HTML File (Offline Edition) */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 rounded-3xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-display font-bold text-lg shrink-0 shadow-sm">
              <FileCode className="w-5 h-5" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                  <span>Standalone Single HTML File</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Offline Ready
                  </span>
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                VocaPlay is bundled into a <strong>single, standalone .html file</strong> with all scripts, styles, vocabulary words, audio synthesizers, and games fully self-contained. You can open and run it directly in any browser—no internet connection, installation, or server needed!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-600">
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <strong className="block text-emerald-800 mb-0.5">💻 Double-Click to Open</strong>
                  <span>Runs directly from your desktop, downloads folder, or USB drive.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <strong className="block text-emerald-800 mb-0.5">⚡ 100% Offline</strong>
                  <span>All word cards, quizzes, and games work without Wi-Fi or mobile data.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <strong className="block text-emerald-800 mb-0.5">💾 Local Saving</strong>
                  <span>Scores, streaks, and learned words persist safely in your browser.</span>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <a
                  href="/vocaplay-standalone.html"
                  download="vocaplay.html"
                  onClick={() => soundFx.playCorrect()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download vocaplay.html</span>
                </a>
                <span className="text-xs text-slate-500 font-medium">Single file • ~617 KB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
