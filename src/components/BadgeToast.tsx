import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BadgeToast: React.FC = () => {
  const { recentBadge, clearRecentBadge } = useProgress();

  return (
    <AnimatePresence>
      {recentBadge && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-4 shadow-xl border-2 border-amber-300 flex items-start gap-3.5"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0 border border-white/30">
            <Award className="w-7 h-7 text-amber-100" />
          </div>
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase tracking-wider font-extrabold text-amber-200">
                New Badge Unlocked!
              </span>
            </div>
            <h4 className="font-display font-bold text-base text-white leading-tight">
              {recentBadge.title}
            </h4>
            <p className="text-xs text-amber-100 mt-1 leading-relaxed">
              {recentBadge.description}
            </p>
          </div>
          <button
            onClick={clearRecentBadge}
            className="text-amber-200 hover:text-white p-1 rounded-lg transition cursor-pointer"
            aria-label="Dismiss badge notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
