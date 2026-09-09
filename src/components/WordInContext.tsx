import React, { useState } from 'react';
import { CONTEXT_QUESTIONS } from '../data/contextQuestions';
import { useProgress } from '../context/ProgressContext';
import { soundFx } from '../utils/sound';
import {
  Target,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Volume2,
  Sparkles,
  RotateCcw,
  Lightbulb,
  Award,
} from 'lucide-react';

export const WordInContext: React.FC = () => {
  const { recordContextQuestionResult } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const currentQ = CONTEXT_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      soundFx.playCorrect();
      setSessionScore((prev) => prev + 1);
    } else {
      soundFx.playIncorrect();
    }

    recordContextQuestionResult(isCorrect, currentQ.targetWord);
  };

  const handleNext = () => {
    if (currentIndex + 1 < CONTEXT_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setShowTip(false);
    } else {
      setSessionCompleted(true);
      soundFx.playCelebration();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowTip(false);
    setSessionScore(0);
    setSessionCompleted(false);
  };

  // Render sentence with the target word highlighted
  const renderSentenceWithHighlight = (sentence: string) => {
    // Look for [word]
    const parts = sentence.split(/(\[[^\]]+\])/);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const word = part.slice(1, -1);
        return (
          <span
            key={index}
            className="inline-block px-2 py-0.5 mx-1 rounded-md bg-amber-200 text-amber-950 font-bold border border-amber-300 shadow-2xs"
          >
            {word}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Activity Intro Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2 border border-sky-100">
              <Target className="w-3.5 h-3.5" />
              <span>Context Clue Activity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Word-in-Context Detective
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Read each passage and use surrounding hints to determine the meaning of the highlighted word.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 shrink-0">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-500">Session Score</div>
              <div className="text-lg font-bold font-display text-sky-700">
                {sessionScore} / {currentIndex + (hasAnswered ? 1 : 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
            <span>Question {currentIndex + 1} of {CONTEXT_QUESTIONS.length}</span>
            <span>Grade {currentQ.gradeLevel} Clue</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / CONTEXT_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {sessionCompleted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-md">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Award className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Activity Complete
          </span>
          <h3 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
            Context Master!
          </h3>
          <p className="text-slate-600 mt-2 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            You deciphered vocabulary using real context clues with a score of{' '}
            <strong className="text-slate-900 font-bold">
              {sessionScore} out of {CONTEXT_QUESTIONS.length}
            </strong>{' '}
            ({Math.round((sessionScore / CONTEXT_QUESTIONS.length) * 100)}%).
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <button
              id="context-restart-btn"
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-sm hover:bg-indigo-700 transition flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Again</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Target Word & Pronunciation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-display font-bold flex items-center justify-center text-lg">
                ?
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Target Word
                </span>
                <h3 className="text-2xl font-display font-bold text-slate-900 capitalize">
                  {currentQ.targetWord}
                </h3>
              </div>
            </div>

            <button
              onClick={() => soundFx.speakWord(currentQ.targetWord)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer"
              title={`Pronounce ${currentQ.targetWord}`}
              aria-label={`Pronounce ${currentQ.targetWord}`}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Sentence Passage */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 leading-relaxed text-base sm:text-lg text-slate-800 font-medium">
            "{renderSentenceWithHighlight(currentQ.sentence)}"
          </div>

          {/* Question Prompt */}
          <div>
            <p className="text-sm font-bold text-slate-700">
              Based on the sentence clues above, what is the meaning of{' '}
              <strong className="text-indigo-600 underline underline-offset-2">
                "{currentQ.targetWord}"
              </strong>?
            </p>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = selectedOption === index;
              const isCorrectAnswer = index === currentQ.correctIndex;

              let optionStyle =
                'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-2 ring-emerald-200';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                } else {
                  optionStyle = 'bg-slate-50/50 border-slate-200 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={index}
                  id={`context-option-${index}`}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-display font-bold text-xs flex items-center justify-center shrink-0 ${
                        hasAnswered && isCorrectAnswer
                          ? 'bg-emerald-500 text-white'
                          : hasAnswered && isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {letters[index]}
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

          {/* Educational Feedback Card (shown immediately after answering) */}
          {hasAnswered && (
            <div
              className={`p-5 rounded-2xl border-2 transition-all ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedOption === currentQ.correctIndex ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-base">
                    {selectedOption === currentQ.correctIndex
                      ? 'Correct! Outstanding context reading!'
                      : `Not quite! The correct answer is: "${currentQ.options[currentQ.correctIndex]}"`}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    <strong className="font-semibold">Context Explanation:</strong> {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Context Clue Detective Tip Toggle */}
          <div className="pt-2">
            {!showTip ? (
              <button
                onClick={() => setShowTip(true)}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Show Context Clue Detective Tip</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 flex items-start gap-2.5 text-xs text-sky-900">
                <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Detective Strategy: </span>
                  <span>{currentQ.clueTip}</span>
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          {hasAnswered && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                id="context-next-btn"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <span>{currentIndex + 1 < CONTEXT_QUESTIONS.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
