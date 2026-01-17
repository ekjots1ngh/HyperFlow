'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Achievement } from '@/lib/achievements';

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15 }}
          className="fixed top-6 left-1/2 z-[9999] max-w-md -translate-x-1/2"
        >
          <div className="rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 p-1 shadow-2xl">
            <div className="rounded-xl bg-white p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="text-4xl"
                >
                  {achievement.icon}
                </motion.div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <p className="font-bold text-gray-900">Achievement Unlocked!</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{achievement.name}</p>
                  <p className="mt-1 text-xs text-gray-600">{achievement.description}</p>
                  {achievement.reward ? (
                    <p className="mt-2 text-xs font-medium text-purple-600">✨ {achievement.reward}</p>
                  ) : null}
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="rounded-lg p-1 transition-colors hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
