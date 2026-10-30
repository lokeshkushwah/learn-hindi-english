"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiCelebrationProps {
  trigger: boolean;
}

export function ConfettiCelebration({ trigger }: ConfettiCelebrationProps) {
  useEffect(() => {
    if (trigger) {
      // Kid-friendly playful confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FFB703", "#FB8500", "#FF006E", "#8338EC", "#2EC4B6", "#10B981"],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#FFD166", "#06D6A0", "#118AB2"],
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#EF476F", "#FFD166", "#06D6A0"],
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return null;
}

