import React, { useState } from 'react';
import { WordItem } from '../types';
import { WORDS } from '../data/words';
import { useProgress } from '../context/ProgressContext';
import { soundFx } from '../utils/sound';
import {
  PenTool,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Volume2,
  ArrowRight,
  Shuffle,
  Lightbulb,
  Send,
} from 'lucide-react';

interface SentenceBuilderProps {
  initialWord?: WordItem | null;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ initialWord }) => {
  const { recordSentenceBuilt } = useProgress();

  // Pick word
  const [selectedWord, setSelectedWord] = useState<WordItem>(() => initialWord || WORDS[0]);
  const [activeMode, setActiveMode] = useState<'tiles' | 'write'>('tiles');

  // Mode 1: Tile Scramble State
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<{ id: string; text: string }[]>(() => {
    const scramble = (initialWord || WORDS[0]).sentenceScramble;
    const tokens = scramble ? scramble.scrambled : ['The', 'word', 'is', 'used', 'here.'];
    return tokens.map((t, idx) => ({ id: `${t}-${idx}`, text: t }));
  });
  const [tileFeedback, setTileFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message: string;
  }>({ status: 'idle', message: '' });
  const [showHint, setShowHint] = useState(false);

  // Mode 2: Free Writing State
  const [customSentence, setCustomSentence] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<{
    type: 'success' | 'warning' | 'error' | null;
    message: string;
    details?: string[];
  }>({ type: null, message: '' });

  const loadWord = (word: WordItem) => {
    setSelectedWord(word);
    setAssembledTokens([]);
    setShowHint(false);
    setTileFeedback({ status: 'idle', message: '' });
    setCustomSentence('');
    setWritingFeedback({ type: null, message: '' });

    if (word.sentenceScramble) {
      // Shuffle scrambled tokens
      const tokens = [...word.sentenceScramble.scrambled]
        .sort(() => Math.random() - 0.5)
        .map((t, idx) => ({ id: `${t}-${idx}`, text: t }));
      setAvailableTokens(tokens);
    } else {
      setAvailableTokens([
        { id: '1', text: 'Please' },
        { id: '2', text: 'use' },
        { id: '3', text: word.word },
        { id: '4', text: 'properly.' },
      ]);
    }
  };

  const handlePickRandomWord = () => {
    const remaining = WORDS.filter((w) => w.id !== selectedWord.id);
    const randomWord = remaining[Math.floor(Math.random() * remaining.length)];
    loadWord(randomWord);
  };

  // Click available token to add to tray
  const handleAddToken = (token: { id: string; text: string }) => {
    soundFx.playClick();
    setAvailableTokens((prev) => prev.filter((t) => t.id !== token.id));
    setAssembledTokens((prev) => [...prev, token.text]);
    setTileFeedback({ status: 'idle', message: '' });
  };

  // Click assembled token in tray to remove back to available
  const handleRemoveToken = (text: string, index: number) => {
    soundFx.playClick();
    setAssembledTokens((prev) => prev.filter((_, i) => i !== index));
    setAvailableTokens((prev) => [...prev, { id: `${text}-${Date.now()}-${index}`, text }]);
    setTileFeedback({ status: 'idle', message: '' });
  };

  // Check assembled sentence
  const handleCheckTiles = () => {
    const assembledString = assembledTokens.join(' ').trim();
    const solution = selectedWord.sentenceScramble?.solution.trim() || '';

    // Standardize comparison
    const cleanAssembled = assembledString.replace(/[.,!]/g, '').toLowerCase();
    const cleanSolution = solution.replace(/[.,!]/g, '').toLowerCase();

    if (cleanAssembled === cleanSolution) {
      soundFx.playCorrect();
      setTileFeedback({
        status: 'correct',
        message: `Perfect! You built the sentence correctly: "${solution}"`,
      });
      recordSentenceBuilt();
    } else {
      soundFx.playIncorrect();
      setTileFeedback({
        status: 'incorrect',
        message: 'Not quite in the right order yet. Check the clue hint or try rearranging the words.',
      });
    }
  };

  const handleResetTiles = () => {
    if (selectedWord.sentenceScramble) {
      const tokens = [...selectedWord.sentenceScramble.scrambled]
        .sort(() => Math.random() - 0.5)
        .map((t, idx) => ({ id: `${t}-${idx}`, text: t }));
      setAvailableTokens(tokens);
    }
    setAssembledTokens([]);
    setTileFeedback({ status: 'idle', message: '' });
    setShowHint(false);
  };

  // Analyze student's custom sentence
  const handleEvaluateCustomSentence = () => {
    const text = customSentence.trim();
    if (!text) {
      setWritingFeedback({
        type: 'warning',
        message: 'Please write a sentence before checking.',
      });
      return;
    }

    const target = selectedWord.word.toLowerCase();
    const words = text.split(/\s+/);
    const details: string[] = [];

    // Check 1: Target word presence (allow standard suffixes like -s, -ed, -ing)
    const containsTarget = words.some((w) => {
      const cleanW = w.toLowerCase().replace(/[^a-z]/g, '');
      return cleanW === target || cleanW.startsWith(target.slice(0, Math.max(4, target.length - 2)));
    });

    if (!containsTarget) {
      details.push(`Make sure to include your target vocabulary word: "${selectedWord.word}".`);
    }

    // Check 2: Capital letter start
    if (!/^[A-Z]/.test(text)) {
      details.push('Remember to start your sentence with a capital letter.');
    }

    // Check 3: End punctuation (. ! ?)
    if (!/[.!?]$/.test(text)) {
      details.push('Remember to end your sentence with proper punctuation (period, exclamation point, or question mark).');
    }

    // Check 4: Length and depth (at least 6 words for middle school complexity)
    if (words.length < 6) {
      details.push('Try adding more descriptive details or context so your sentence is at least 6 to 8 words long.');
    }

    if (details.length === 0) {
      soundFx.playCorrect();
      setWritingFeedback({
        type: 'success',
        message: `Outstanding sentence! You used "${selectedWord.word}" accurately and with proper grammatical structure.`,
      });
      recordSentenceBuilt();
    } else {
      soundFx.playIncorrect();
      setWritingFeedback({
        type: 'warning',
        message: 'Almost there! Here is how to improve your sentence:',
        details,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2 border border-amber-200">
              <PenTool className="w-3.5 h-3.5 text-amber-700" />
              <span>Sentence Construction</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Sentence Builder
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Apply new vocabulary in active writing rather than just memorizing definitions.
            </p>
          </div>

          <button
            id="builder-random-word-btn"
            onClick={handlePickRandomWord}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Try Another Word</span>
          </button>
        </div>

        {/* Target Word Focus Banner */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-indigo-50 border-2 border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
              Target Vocabulary Word
            </span>
            <div className="flex items-baseline gap-2.5 mt-1">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 capitalize">
                {selectedWord.word}
              </h3>
              <span className="text-xs font-mono text-indigo-600 font-semibold">
                /{selectedWord.pronunciation}/ • {selectedWord.partOfSpeech}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              <strong>Meaning:</strong> {selectedWord.definition}
            </p>
          </div>

          <button
            onClick={() => soundFx.speakWord(selectedWord.word)}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition shrink-0 cursor-pointer shadow-2xs"
            title={`Pronounce ${selectedWord.word}`}
            aria-label={`Pronounce ${selectedWord.word}`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="mt-6 flex items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-sm">
          <button
            onClick={() => setActiveMode('tiles')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeMode === 'tiles'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Arrange Word Tiles
          </button>
          <button
            onClick={() => setActiveMode('write')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeMode === 'write'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Write Original Sentence
          </button>
        </div>
      </div>

      {/* MODE 1: Interactive Word Tiles Scramble */}
      {activeMode === 'tiles' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h4 className="font-display font-bold text-base text-slate-900">
              Construct the Sentence
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Click the scrambled tiles below to assemble a grammatically complete sentence demonstrating{' '}
              <strong className="text-indigo-600">"{selectedWord.word}"</strong>.
            </p>
          </div>

          {/* Tray where assembled tokens sit */}
          <div className="min-h-[90px] p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-wrap items-center gap-2">
            {assembledTokens.length === 0 ? (
              <span className="text-xs sm:text-sm text-slate-400 italic">
                Click the tiles below in the correct order to form your sentence...
              </span>
            ) : (
              assembledTokens.map((token, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveToken(token, index)}
                  className={`px-3 py-1.5 rounded-xl font-display font-bold text-sm shadow-xs transition hover:scale-105 cursor-pointer ${
                    token.toLowerCase().includes(selectedWord.word.toLowerCase())
                      ? 'bg-amber-300 text-amber-950 border border-amber-400'
                      : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Click to remove tile"
                >
                  {token}
                </button>
              ))
            )}
          </div>

          {/* Available Word Tiles */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Available Word Tiles ({availableTokens.length})
              </span>
              <button
                onClick={handleResetTiles}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Tiles</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableTokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handleAddToken(token)}
                  className={`px-3.5 py-2 rounded-xl border-2 font-display font-bold text-sm shadow-2xs transition hover:scale-105 active:scale-95 cursor-pointer ${
                    token.text.toLowerCase().includes(selectedWord.word.toLowerCase())
                      ? 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200'
                      : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                  }`}
                >
                  {token.text}
                </button>
              ))}
            </div>
          </div>

          {/* Clue Hint Accordion */}
          {selectedWord.sentenceScramble?.hint && (
            <div>
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Show Sentence Clue Hint</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Clue: </span>
                    <span>{selectedWord.sentenceScramble.hint}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feedback message */}
          {tileFeedback.status !== 'idle' && (
            <div
              className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-medium ${
                tileFeedback.status === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {tileFeedback.status === 'correct' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span>{tileFeedback.message}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handlePickRandomWord}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              Skip this word
            </button>

            <button
              id="builder-check-tiles-btn"
              disabled={assembledTokens.length === 0}
              onClick={handleCheckTiles}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check Sentence</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: Write Original Sentence with Educational Evaluator */}
      {activeMode === 'write' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h4 className="font-display font-bold text-base text-slate-900">
              Write Your Own Original Sentence
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft an original sentence featuring{' '}
              <strong className="text-indigo-600">"{selectedWord.word}"</strong>. Our writing helper will check
              capitalization, end punctuation, length, and proper vocabulary inclusion.
            </p>
          </div>

          {/* Prompt card */}
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950">
            <span className="font-bold">Writing Tip: </span>
            <span>
              Use "{selectedWord.word}" as a {selectedWord.partOfSpeech}. For example: "{selectedWord.example}"
            </span>
          </div>

          {/* Text Area */}
          <div>
            <textarea
              id="builder-sentence-textarea"
              rows={3}
              value={customSentence}
              onChange={(e) => setCustomSentence(e.target.value)}
              placeholder={`Write a complete sentence using "${selectedWord.word}"...`}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
            />
          </div>

          {/* Writing Feedback Card */}
          {writingFeedback.type && (
            <div
              className={`p-4 rounded-2xl border-2 text-xs sm:text-sm ${
                writingFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {writingFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{writingFeedback.message}</p>
                  {writingFeedback.details && (
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-700">
                      {writingFeedback.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              id="builder-evaluate-sentence-btn"
              onClick={handleEvaluateCustomSentence}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Evaluate Sentence</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
