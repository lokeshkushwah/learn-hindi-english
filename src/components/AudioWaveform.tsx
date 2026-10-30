"use client";

import React from "react";

interface AudioWaveformProps {
  bars: number[];
  isActive: boolean;
  voiceLevel: number;
  label?: string;
}

export function AudioWaveform({
  bars,
  isActive,
  voiceLevel,
  label = "आवाज़ की तरंगें (Waveform)",
}: AudioWaveformProps) {
  const isSpeaking = isActive && voiceLevel > 15;

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl p-4 shadow-inner border border-slate-700/50 flex flex-col items-center">
      {/* Voice Activity Header */}
      <div className="w-full flex items-center justify-between mb-3 px-1 text-xs sm:text-sm font-medium">
        <span className="text-slate-300 flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isSpeaking
                ? "bg-emerald-400 ring-4 ring-emerald-400/40 animate-pulse"
                : isActive
                ? "bg-amber-400 ring-2 ring-amber-400/30"
                : "bg-slate-600"
            }`}
          />
          {label}
        </span>
        <span
          className={`font-semibold px-2.5 py-0.5 rounded-full text-xs transition-colors ${
            isSpeaking
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : isActive
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {isSpeaking ? "🗣️ आवाज़ आ रही है" : isActive ? "👂 सुन रहे हैं..." : "माइक बंद"}
        </span>
      </div>

      {/* Visualizer Waveform Bars */}
      <div className="w-full h-24 flex items-center justify-center gap-1 sm:gap-1.5 px-2 overflow-hidden">
        {bars.map((height, i) => {
          // Dynamic gradient based on height and index
          const barHeight = isActive ? Math.max(8, height) : 10;
          return (
            <div
              key={i}
              className="flex-1 max-w-[8px] rounded-full transition-all duration-75"
              style={{
                height: `${barHeight}%`,
                background: isActive
                  ? `linear-gradient(to top, #06D6A0, #FFD166, #EF476F)`
                  : "#475569",
                opacity: isActive ? 0.95 : 0.4,
              }}
            />
          );
        })}
      </div>

      {/* Voice level meter bar */}
      {isActive && (
        <div className="w-full mt-3">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>आवाज़ की तीव्रता (Volume)</span>
            <span>{voiceLevel}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-rose-500 transition-all duration-100 rounded-full"
              style={{ width: `${Math.min(100, voiceLevel * 1.2)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

