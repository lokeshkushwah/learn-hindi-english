"use client";

import React from "react";
import { X, Settings, Volume2, ShieldCheck, Sliders, Info, Zap } from "lucide-react";
import { ToleranceMode } from "@/lib/comparison";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tolerance: ToleranceMode;
  onToleranceChange: (val: ToleranceMode) => void;
  speechRate: number;
  onSpeechRateChange: (val: number) => void;
  showParentOverride: boolean;
  onToggleParentOverride: (val: boolean) => void;
  autoAdvance?: boolean;
  onToggleAutoAdvance?: (val: boolean) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  tolerance,
  onToleranceChange,
  speechRate,
  onSpeechRateChange,
  showParentOverride,
  onToggleParentOverride,
  autoAdvance = true,
  onToggleAutoAdvance,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              अभिभावक व शिक्षक सेटिंग्स
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Parent & Teacher Learning Controls
            </p>
          </div>
        </div>

        {/* Section 1: Recognition Tolerance */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-800 text-sm sm:text-base">
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>ध्वनि पहचान संवेदनशीलता (Tolerance)</span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            छोटे बच्चों की आवाज़ या क्षेत्रीय लहजे के अनुसार मिलान का स्तर चुनें:
          </p>

          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "strict", label: "सख्त (Strict)", desc: "हूबहू सही" },
                { id: "normal", label: "सामान्य (Normal)", desc: "संतुलित (अनुशंसित)" },
                { id: "relaxed", label: "आसान (Relaxed)", desc: "शुरुआती बच्चों के लिए" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onToleranceChange(item.id)}
                className={`p-3 rounded-xl text-center text-xs sm:text-sm font-semibold transition-all border-2 ${
                  tolerance === item.id
                    ? "bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-amber-300"
                }`}
              >
                <div>{item.label}</div>
                <div className="text-[10px] opacity-80 font-normal mt-0.5">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Speech Speed */}
        <div className="mb-6 p-4 rounded-2xl bg-sky-50/60 border border-sky-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-sky-600" />
              <span>सही उच्चारण की गति (Speech Rate)</span>
            </span>
            <span className="text-xs font-bold px-2 py-0.5 bg-sky-200 text-sky-800 rounded-full">
              {speechRate}x
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            बच्चे के लिए उच्चारण को धीमा या सामान्य करें ताकि वे हर मात्रा साफ़ सुन सकें:
          </p>
          <input
            type="range"
            min="0.6"
            max="1.1"
            step="0.05"
            value={speechRate}
            onChange={(e) => onSpeechRateChange(parseFloat(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-1">
            <span>0.6x (बहुत धीमा)</span>
            <span>0.85x (बाल सुलभ)</span>
            <span>1.1x (सामान्य)</span>
          </div>
        </div>

        {/* Section 3: Auto Next on Correct */}
        {onToggleAutoAdvance && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-300">
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <div className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>स्वचालित अगला पाठ (Auto Next)</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  बच्चे के सही उच्चारण बोलते ही स्वतः 1.5 सेकंड में अगला अक्षर/शब्द खोलें।
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(e) => onToggleAutoAdvance(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>
        )}

        {/* Section 4: Parent/Teacher Manual Pass */}
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="pr-4">
              <div className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>अभिभावक मंज़ूरी बटन (Manual Pass)</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                यदि ब्राउज़र बच्चे की आवाज़ ठीक से नहीं पहचान पा रहा है, तो माता-पिता स्वयं सुनकर "आगे बढ़ें" अनलॉक कर सकते हैं।
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showParentOverride}
                onChange={(e) => onToggleParentOverride(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>

        {/* Privacy & Accuracy Disclosure */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-700 block mb-0.5">सटीकता व बाल सुरक्षा सूचना:</strong>
            ब्राउज़र स्पीच रिकॉग्निशन (Web Speech API) केवल ध्वनि को टेक्स्ट में बदलकर तुलना करता है, यह कोई क्लीनिकल उच्चारण स्कोर नहीं है। बच्चे की आवाज़ किसी भी सर्वर पर सुरक्षित किए बिना स्थानीय रूप से जांची जाती है।
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-[0.99] text-base"
        >
          सेटिंग्स लागू करें ✓
        </button>
      </div>
    </div>
  );
}

