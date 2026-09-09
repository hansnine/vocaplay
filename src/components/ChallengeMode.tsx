import React, { useState } from 'react';
import { ActiveTab, QuizQuestion, QuizResultSummary, WordItem } from '../types';
import { WORDS } from '../data/words';
import { useProgress } from '../context/ProgressContext';
import { soundFx } from '../utils/sound';
import { QuizResults } from './QuizResults';
import {
  BrainCircuit,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

interface ChallengeModeProps {
  setActiveTab: (tab: ActiveTab) => void;
  onPracticeWord?: (word: WordItem) => void;
}

// 10 curated escalating questions strictly graded from Grade 6 to Grade 8
const CHALLENGE_QUESTIONS: (QuizQuestion & { difficulty: 'Grade 6' | 'Grade 7' | 'Grade 8'; stage: number })[] = [
  // Stage 1: Grade 6 Core Understanding
  {
    id: 'ch-1',
    stage: 1,
    difficulty: 'Grade 6',
    type: 'meaning',
    prompt: 'A student claims an environment is "arid." Which condition MUST be true?',
    targetWord: 'arid',
    options: [
      'It receives extremely sparse rainfall and has very little moisture.',
      'It is dense with swampy marshes and frequent tropical floods.',
      'It experiences continuous sub-zero freezing temperatures year-round.',
      'It is elevated on high rocky mountain peaks covered in snow.',
    ],
    correctAnswer: 'It receives extremely sparse rainfall and has very little moisture.',
    explanation: 'Arid specifically describes land or climate characterized by a severe lack of water or rainfall.',
  },
  {
    id: 'ch-2',
    stage: 1,
    difficulty: 'Grade 6',
    type: 'synonym',
    prompt: 'Which pair of words represents accurate SYNONYMS?',
    targetWord: 'bewildered',
    options: [
      'bewildered : perplexed',
      'bewildered : self-assured',
      'bewildered : impatient',
      'bewildered : delighted',
    ],
    correctAnswer: 'bewildered : perplexed',
    explanation: 'Both "bewildered" and "perplexed" describe the feeling of being completely puzzled and confused.',
  },
  {
    id: 'ch-3',
    stage: 1,
    difficulty: 'Grade 6',
    type: 'sentence_completion',
    prompt: 'Select the word that best completes the scientific statement:',
    sentence: 'Rubber soles provide crucial __________ that stops basketball players from sliding on smooth polished hardwood.',
    targetWord: 'friction',
    options: ['friction', 'foliage', 'itinerary', 'canopy'],
    correctAnswer: 'friction',
    explanation: 'Friction is the physical resistance created when two surfaces slide against one another.',
  },

  // Stage 2: Grade 7 Stepping Up Nuance
  {
    id: 'ch-4',
    stage: 2,
    difficulty: 'Grade 7',
    type: 'antonym',
    prompt: 'Which word serves as the most accurate direct ANTONYM (opposite) for "deplete"?',
    targetWord: 'deplete',
    options: ['replenish', 'exhaust', 'scrutinize', 'evaporate'],
    correctAnswer: 'replenish',
    explanation: 'To deplete means to drain or use up resources; to replenish means to fill up or restore them again.',
  },
  {
    id: 'ch-5',
    stage: 2,
    difficulty: 'Grade 7',
    type: 'meaning',
    prompt: 'In technology and computing, why is an item designated as "obsolete"?',
    targetWord: 'obsolete',
    options: [
      'A far newer or superior alternative has made it out of date and disused.',
      'It was banned by the government due to security violations.',
      'It operates purely on solar power rather than electrical outlets.',
      'It is too costly for the average consumer to purchase.',
    ],
    correctAnswer: 'A far newer or superior alternative has made it out of date and disused.',
    explanation: 'Obsolete means no longer produced or used because superior replacements have superseded it.',
  },
  {
    id: 'ch-6',
    stage: 2,
    difficulty: 'Grade 7',
    type: 'sentence_completion',
    prompt: 'Complete this analytical sentence with the most precise vocabulary term:',
    sentence: 'The careful editor took several hours to __________ the manuscript for tiny grammatical inconsistencies.',
    targetWord: 'scrutinize',
    options: ['scrutinize', 'automate', 'migrate', 'forage'],
    correctAnswer: 'scrutinize',
    explanation: 'To scrutinize means to inspect closely, minutely, and thoroughly.',
  },
  {
    id: 'ch-7',
    stage: 2,
    difficulty: 'Grade 7',
    type: 'meaning',
    prompt: 'Which option best illustrates an individual being "resourceful"?',
    targetWord: 'resourceful',
    options: [
      'Repairing a bicycle chain using a paperclip and pocket tool when stranded on a remote trail.',
      'Buying an expensive new bicycle at the mall with a credit card.',
      'Refusing to attempt repairs until a trained mechanic arrives.',
      'Ignoring the broken chain and walking the entire bike back home.',
    ],
    correctAnswer: 'Repairing a bicycle chain using a paperclip and pocket tool when stranded on a remote trail.',
    explanation: 'Resourcefulness is the practical ingenuity to find clever solutions with whatever supplies are at hand.',
  },

  // Stage 3: Grade 8 Advanced Synthesis
  {
    id: 'ch-8',
    stage: 3,
    difficulty: 'Grade 8',
    type: 'meaning',
    prompt: 'Beyond its chemistry definition, how is the word "catalyst" used metaphorically in social and historical contexts?',
    targetWord: 'catalyst',
    options: [
      'An event or individual that rapidly triggers substantial widespread change.',
      'A barrier or wall built to prevent cultural exchange between nations.',
      'A formal written treaty signed after a prolonged armed conflict.',
      'A slow and silent gradual forgetting of ancient traditions.',
    ],
    correctAnswer: 'An event or individual that rapidly triggers substantial widespread change.',
    explanation: 'A catalyst sparks or accelerates major actions and transformations without being altered itself.',
  },
  {
    id: 'ch-9',
    stage: 3,
    difficulty: 'Grade 8',
    type: 'antonym',
    prompt: 'What is the precise ANTONYM for someone behaving in a "reluctant" manner?',
    targetWord: 'reluctant',
    options: ['eager', 'hesitant', 'apprehensive', 'cautious'],
    correctAnswer: 'eager',
    explanation: 'Reluctant implies unwillingness and hesitation; eager implies keen willingness and enthusiastic readiness.',
  },
  {
    id: 'ch-10',
    stage: 3,
    difficulty: 'Grade 8',
    type: 'sentence_completion',
    prompt: 'Complete the Grade 8 capstone sentence:',
    sentence: 'The mountaineers prepared to __________ the jagged mountain pass despite gusting sub-zero winds.',
    targetWord: 'traverse',
    options: ['traverse', 'flourish', 'deplete', 'collaborate'],
    correctAnswer: 'traverse',
    explanation: 'To traverse means to travel across, over, or through challenging physical terrain.',
  },
];

export const ChallengeMode: React.FC<ChallengeModeProps> = ({ setActiveTab, onPracticeWord }) => {
  const { recordQuizResult } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [missedWords, setMissedWords] = useState<string[]>([]);
  const [missedDetails, setMissedDetails] = useState<
    { questionPrompt: string; targetWord: string; userAnswer: string; correctAnswer: string; explanation: string }[]
  >([]);
  const [quizSummary, setQuizSummary] = useState<QuizResultSummary | null>(null);

  const currentQ = CHALLENGE_QUESTIONS[currentIndex];

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setStreak(0);
    setScore(0);
    setMissedWords([]);
    setMissedDetails([]);
    setQuizSummary(null);
  };

  const handleSelectOption = (option: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
    setHasAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      soundFx.playCorrect();
      setStreak((prev) => prev + 1);
      setScore((prev) => prev + 1);
    } else {
      soundFx.playIncorrect();
      setStreak(0);
      setMissedWords((prev) => [...prev, currentQ.targetWord]);
      setMissedDetails((prev) => [
        ...prev,
        {
          questionPrompt: currentQ.sentence ? `${currentQ.prompt} "${currentQ.sentence}"` : currentQ.prompt,
          targetWord: currentQ.targetWord,
          userAnswer: option,
          correctAnswer: currentQ.correctAnswer,
          explanation: currentQ.explanation,
        },
      ]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < CHALLENGE_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      // Finished
      const total = CHALLENGE_QUESTIONS.length;
      const finalScore = score;
      const percentage = Math.round((finalScore / total) * 100);

      const summary = recordQuizResult({
        quizType: 'challenge',
        totalQuestions: total,
        correctAnswers: finalScore,
        scorePercentage: percentage,
        missedWordIds: Array.from(new Set(missedWords)),
        missedQuestions: missedDetails,
      });

      setQuizSummary(summary);
      if (percentage >= 90) {
        soundFx.playCelebration();
      }
    }
  };

  if (quizSummary) {
    return (
      <QuizResults
        summary={quizSummary}
        onRetry={handleRestart}
        setActiveTab={setActiveTab}
        onPracticeWord={onPracticeWord}
      />
    );
  }

  const stageLabels = {
    1: 'Stage 1: Grade 6 Foundations',
    2: 'Stage 2: Grade 7 Vocabulary Expansion',
    3: 'Stage 3: Grade 8 Advanced Synthesis',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Challenge Header */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold mb-2 border border-purple-400/30">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{stageLabels[currentQ.stage as 1 | 2 | 3]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Vocabulary Challenge Mode
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/90 mt-1">
              Test deep context, synonym nuance, and connotation as difficulty ramps up.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20">
              <Flame className={`w-5 h-5 ${streak >= 3 ? 'text-amber-400 animate-bounce' : 'text-purple-300'}`} />
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-purple-200">Streak</div>
                <div className="text-sm font-black font-display text-white">{streak} in a row</div>
              </div>
            </div>

            {/* Score */}
            <div className="bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 text-left">
              <div className="text-[10px] uppercase font-bold text-purple-200">Score</div>
              <div className="text-sm font-black font-display text-white">
                {score} / {currentIndex + (hasAnswered ? 1 : 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs font-bold text-purple-200 mb-1.5">
            <span>Question {currentIndex + 1} of {CHALLENGE_QUESTIONS.length}</span>
            <span className="text-amber-300 font-extrabold">{currentQ.difficulty} Tier</span>
          </div>
          <div className="w-full h-2.5 bg-purple-950/60 rounded-full overflow-hidden border border-purple-800">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / CHALLENGE_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Challenge Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
              {currentQ.type.replace('_', ' ')}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Target: <strong className="text-slate-800">{currentQ.targetWord}</strong>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
            {currentQ.prompt}
          </h3>

          {currentQ.sentence && (
            <div className="mt-3.5 p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 font-medium text-slate-800 text-base sm:text-lg">
              "{currentQ.sentence}"
            </div>
          )}
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQ.correctAnswer;

            let btnStyle =
              'bg-white border-slate-200 hover:border-purple-300 hover:bg-slate-50 text-slate-800';

            if (hasAnswered) {
              if (isCorrect) {
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
                id={`challenge-opt-${idx}`}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl font-display font-bold text-xs flex items-center justify-center shrink-0 ${
                      hasAnswered && isCorrect
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
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback */}
        {hasAnswered && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base">
                  {selectedAnswer === currentQ.correctAnswer
                    ? 'Excellent Critical Thinking!'
                    : `Correct Answer: "${currentQ.correctAnswer}"`}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {hasAnswered && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {currentIndex + 1 === CHALLENGE_QUESTIONS.length
                ? 'Final Challenge Question'
                : 'Advancing difficulty...'}
            </span>

            <button
              id="challenge-next-btn"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < CHALLENGE_QUESTIONS.length ? 'Next Question' : 'View Challenge Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
