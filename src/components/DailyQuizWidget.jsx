import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAILY_QUIZ } from '../data/reflectionData';

export default function DailyQuizWidget({ onExploreTopic }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === DAILY_QUIZ.correctIndex) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F97316', '#F59E0B', '#10B981']
      });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-300">
                Today’s Reflection • Daily Thought & Quiz
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              Updated Daily at 06:00 IST
            </span>
          </div>

          <div className="my-6">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 leading-snug">
              {DAILY_QUIZ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {DAILY_QUIZ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === DAILY_QUIZ.correctIndex;

              let btnStyle = 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 text-stone-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                } else {
                  btnStyle = 'bg-stone-900/40 border-stone-800/40 text-stone-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl text-left border transition-all text-xs sm:text-sm flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-950 text-stone-400 font-mono text-xs flex items-center justify-center border border-stone-800 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Source Reveal */}
          {isAnswered && (
            <div className="mt-6 p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Historical Context & Source:
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {DAILY_QUIZ.explanation}
              </p>
              <div className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800">
                <span className="text-amber-400 font-bold">Citation: </span>
                {DAILY_QUIZ.sourceLink}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
