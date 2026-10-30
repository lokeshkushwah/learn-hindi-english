"use client";

import { useCallback, useRef } from "react";

/**
 * Procedural kid-friendly sound effects using Web Audio API.
 * 100% self-contained, no external mp3 assets required, reliable across browsers.
 */
export function useKidSounds() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Cheerful ascending major triad for correct answer
  const playCorrectSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime + index * 0.08);

      gain.gain.setValueAtTime(0.001, startTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, startTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + index * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + index * 0.08);
      osc.stop(startTime + index * 0.08 + 0.25);
    });
  }, [getAudioContext]);

  // Gentle, friendly "boing" / try-again sound (not punishing or harsh)
  const playRetrySound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, startTime);
    osc.frequency.exponentialRampToValueAtTime(220, startTime + 0.25);

    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.25);
  }, [getAudioContext]);

  // Bubble pop click sound for interactive buttons
  const playPopSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, startTime);
    osc.frequency.exponentialRampToValueAtTime(800, startTime + 0.05);

    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.08);
  }, [getAudioContext]);

  // Magical star sparkle / confetti chime
  const playStarSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = [784, 988, 1175, 1568, 1976]; // G5, B5, D6, G6, B6
    const startTime = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.06);

      gain.gain.setValueAtTime(0.001, startTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.15, startTime + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + idx * 0.06);
      osc.stop(startTime + idx * 0.06 + 0.3);
    });
  }, [getAudioContext]);

  // Soft ping when mic begins listening
  const playMicChime = useCallback(
    (on: boolean) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const startTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(on ? 440 : 550, startTime);
      osc.frequency.exponentialRampToValueAtTime(on ? 660 : 330, startTime + 0.12);

      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.14);
    },
    [getAudioContext]
  );

  return {
    playCorrectSound,
    playRetrySound,
    playPopSound,
    playStarSound,
    playMicChime,
  };
}

