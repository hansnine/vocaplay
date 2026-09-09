import React, { useState } from 'react';
import { CategoryId, WordItem, ActiveTab } from '../types';
import { CATEGORIES, WORDS } from '../data/words';
import { useProgress } from '../context/ProgressContext';
import { soundFx } from '../utils/sound';
import {
  Volume2,
  CheckCircle2,
  Search,
  BookOpen,
  Filter,
  Sparkles,
  ArrowRight,
  Bookmark,
  Layers,
  Trees,
  FlaskConical,
  GraduationCap,
  Compass,
  Heart,
  PawPrint,
  Cpu,
  Globe,
  Users,
  Smile,
} from 'lucide-react';

interface LearnWordsProps {
  onPracticeInSentence?: (word: WordItem) => void;
  setActiveTab?: (tab: ActiveTab) => void;
}

const CATEGORY_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  nature: Trees,
  science: FlaskConical,
  school: GraduationCap,
  travel: Compass,
  feelings: Heart,
  animals: PawPrint,
  technology: Cpu,
  environment: Globe,
  people: Users,
  everyday: Smile,
};

export const LearnWords: React.FC<LearnWordsProps> = ({ onPracticeInSentence, setActiveTab }) => {
  const { isWordLearned, markWordLearned, unmarkWordLearned } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLearned, setFilterLearned] = useState<'all' | 'unlearned' | 'learned'>('all');

  // Filter words
  const filteredWords = WORDS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedGrade !== 'all' && item.gradeLevel !== selectedGrade) return false;
    if (filterLearned === 'learned' && !isWordLearned(item.id)) return false;
    if (filterLearned === 'unlearned' && isWordLearned(item.id)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesWord = item.word.toLowerCase().includes(q);
      const matchesDef = item.definition.toLowerCase().includes(q);
      const matchesSyn = item.synonyms.some((s) => s.toLowerCase().includes(q));
      if (!matchesWord && !matchesDef && !matchesSyn) return false;
    }
    return true;
  });

  const handleSpeak = (text: string) => {
    soundFx.speakWord(text);
  };

  const handleToggleLearned = (wordId: string) => {
    if (isWordLearned(wordId)) {
      unmarkWordLearned(wordId);
    } else {
      markWordLearned(wordId);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Vocabulary Lessons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Learn Words
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Browse our curated Grade 6–8 word lists organized across 10 engaging themes.
            Listen to proper pronunciations, study definitions and real-world examples, and mark each word as mastered.
          </p>
        </div>

        {/* Search & Grade Quick Filters */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="learn-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words, meanings, or synonyms..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50/50"
            />
          </div>

          {/* Grade Level Selector */}
          <div className="sm:col-span-3 flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['all', 6, 7, 8] as const).map((g) => (
              <button
                key={g}
                id={`filter-grade-${g}`}
                onClick={() => setSelectedGrade(g)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {g === 'all' ? 'All Grades' : `Gr. ${g}`}
              </button>
            ))}
          </div>

          {/* Learned Status Selector */}
          <div className="sm:col-span-3 flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'unlearned', label: 'To Learn' },
                { id: 'learned', label: 'Learned' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                id={`filter-status-${opt.id}`}
                onClick={() => setFilterLearned(opt.id)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  filterLearned === opt.id
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Theme Category Pills */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            id="cat-pill-all"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Categories ({WORDS.length})</span>
          </button>

          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.id] || BookOpen;
            const isSelected = selectedCategory === cat.id;
            const count = WORDS.filter((w) => w.category === cat.id).length;

            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Words Grid / Empty State */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900">No vocabulary words found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try adjusting your search term or switching the category and grade filters above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedGrade('all');
              setFilterLearned('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWords.map((item) => {
            const learned = isWordLearned(item.id);
            const categoryObj = CATEGORIES.find((c) => c.id === item.category);

            return (
              <div
                key={item.id}
                id={`word-card-${item.id}`}
                className={`rounded-2xl p-5 bg-white border transition-all flex flex-col justify-between ${
                  learned
                    ? 'border-emerald-200 shadow-xs ring-1 ring-emerald-100'
                    : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Card Top: Word, Category Badge, Pronunciation */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {categoryObj?.name || item.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Grade {item.gradeLevel}
                    </span>
                  </div>

                  <div className="mt-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                        {item.word}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono font-semibold text-indigo-600">
                          /{item.pronunciation}/
                        </span>
                        <span className="text-xs italic text-slate-500 font-medium">
                          • {item.partOfSpeech}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(item.word)}
                      className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition cursor-pointer shrink-0"
                      title={`Listen to pronunciation of ${item.word}`}
                      aria-label={`Listen to pronunciation of ${item.word}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Simple Meaning */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meaning</p>
                    <p className="text-sm font-medium text-slate-800 mt-1 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  {/* Example Sentence */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Example in Sentence</p>
                    <p className="text-xs text-slate-700 italic mt-0.5 leading-relaxed">
                      "{item.example}"
                    </p>
                  </div>

                  {/* Synonyms & Antonyms */}
                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="font-bold text-slate-500 shrink-0">Synonyms:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.synonyms.map((syn, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-medium text-[11px] border border-sky-100"
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>

                    {item.antonyms && item.antonyms.length > 0 && (
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-bold text-slate-500 shrink-0">Antonyms:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.antonyms.map((ant, aIdx) => (
                            <span
                              key={aIdx}
                              className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 font-medium text-[11px] border border-rose-100"
                            >
                              {ant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions: Mark Learned + Sentence Builder Shortcut */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    id={`toggle-learned-${item.id}`}
                    onClick={() => handleToggleLearned(item.id)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      learned
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${learned ? 'text-emerald-700' : 'text-indigo-500'}`} />
                    <span>{learned ? 'Learned' : 'Mark as Learned'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onPracticeInSentence) {
                        onPracticeInSentence(item);
                      } else if (setActiveTab) {
                        setActiveTab('sentence_builder');
                      }
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition cursor-pointer"
                    title="Practice this word in Sentence Builder"
                    aria-label="Practice in sentence"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
