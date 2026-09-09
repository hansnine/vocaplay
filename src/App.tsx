import React, { useState } from 'react';
import { ActiveTab, WordItem } from './types';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LearnWords } from './components/LearnWords';
import { WordInContext } from './components/WordInContext';
import { VocabularyQuiz } from './components/VocabularyQuiz';
import { SentenceBuilder } from './components/SentenceBuilder';
import { WordGames } from './components/WordGames';
import { ChallengeMode } from './components/ChallengeMode';
import { ProgressDashboard } from './components/ProgressDashboard';
import { Instructions } from './components/Instructions';
import { BadgeToast } from './components/BadgeToast';
import { Compass, Heart, BookOpen, Download } from 'lucide-react';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedWordForPractice, setSelectedWordForPractice] = useState<WordItem | null>(null);

  const handlePracticeWord = (word: WordItem) => {
    setSelectedWordForPractice(word);
    setActiveTab('sentence_builder');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectWord={handlePracticeWord}
          />
        )}

        {activeTab === 'learn' && (
          <LearnWords
            onPracticeInSentence={handlePracticeWord}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'context' && <WordInContext />}

        {activeTab === 'quiz' && (
          <VocabularyQuiz
            setActiveTab={setActiveTab}
            onPracticeWord={handlePracticeWord}
          />
        )}

        {activeTab === 'sentence_builder' && (
          <SentenceBuilder initialWord={selectedWordForPractice} />
        )}

        {activeTab === 'games' && (
          <WordGames
            setActiveTab={setActiveTab}
            onPracticeWord={handlePracticeWord}
          />
        )}

        {activeTab === 'challenge' && (
          <ChallengeMode
            setActiveTab={setActiveTab}
            onPracticeWord={handlePracticeWord}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            setActiveTab={setActiveTab}
            onPracticeWord={handlePracticeWord}
          />
        )}

        {activeTab === 'instructions' && (
          <Instructions setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Floating Badge Notification Toast */}
      <BadgeToast />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-bold text-slate-800 text-sm">VocaPlay</span>
            <span className="text-slate-400">•</span>
            <span>Discover Words. Play &amp; Build Vocabulary.</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span>Designed for Grade 6–8 Students (Ages 11–14)</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button
              onClick={() => setActiveTab('instructions')}
              className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Guide &amp; Scoring
            </button>
            <span className="text-slate-300">•</span>
            <a
              href="/vocaplay-standalone.html"
              download="vocaplay.html"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
              title="Download standalone single HTML file to run offline"
            >
              <Download className="w-3 h-3 text-emerald-600" />
              <span>Download .html</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
