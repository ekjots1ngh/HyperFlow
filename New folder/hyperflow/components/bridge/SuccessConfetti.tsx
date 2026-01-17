'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SuccessConfettiProps {
  active: boolean;
}

export function SuccessConfetti({ active }: SuccessConfettiProps) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 45,
      spread: 360,
      ticks: 220,
      zIndex: 9999,
    };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }

      const particleCount = Math.round(250 * (timeLeft / duration));

      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() / 2 },
        colors: ['#3b82f6', '#a855f7', '#fde68a', '#f97316'],
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [active]);

  return null;
}
