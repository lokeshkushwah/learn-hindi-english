"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  Mic,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Lightbulb,
  Play,
  Square,
  Zap,
  Headphones,
} from "lucide-react";
import { HindiItem } from "@/data/hindiContent";
import { compareHindiSpeech, CompareResult, ToleranceMode } from "@/lib/comparison";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useKidSounds } from "@/hooks/useKidSounds";
import { AudioWaveform } from "./AudioWaveform";
import { ConfettiCelebration } from "./ConfettiCelebration";

interface SpeechPracticeCardProps {
  item: HindiItem;
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev?: () => void;
  tolerance?: ToleranceMode;
  speechRate?: number;
  showParentOverride?: boolean;
  autoAdvance?: boolean;
  onAttemptCompleted?: (item: HindiItem, isCorrect: boolean, retries: number) => void;
}

export function SpeechPracticeCard({
  item,
  currentIndex,
  totalItems,
  onNext,
  onPrev,
  tolerance = "normal",
  speechRate = 0.82,
  showParentOverride = true,
  autoAdvance = true,
  onAttemptCompleted,
}: SpeechPracticeCardProps) {
  const [retries, setRetries] = useState<number>(0);
  const [result, setResult] = useState<CompareResult | null>(null);
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [parentPassed, setParentPassed] = useState<boolean>(false);
  const [isPlayingChildAudio, setIsPlayingChildAudio] = useState<boolean>(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState<boolean>(autoAdvance);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);

  const childAudioRef = useRef<HTMLAudioElement | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const targetText = item.expectedSpeech || item.devanagari || item.text;

  const { speak, isSpeaking, stop: stopTts } = useSpeechSynthesis();
  const {
    playCorrectSound,
    playRetrySound,
    playPopSound,
    playStarSound,
    playMicChime,
  } = useKidSounds();

  const {
    isRecording,
    recordingDuration,
    audioUrl,
    voiceLevel,
    waveformBars,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownSeconds(null);
  }, []);

  // Trigger celebration and automatically advance to next lesson/chapter
  const triggerSuccess = useCallback(
    (comparison: CompareResult, _spokenText: string) => {
      stopListening();
      stopRecording();
      playMicChime(false);
      setResult(comparison);
      setHasSucceeded(true);
      setShowConfetti(true);
      playCorrectSound();
      setTimeout(() => playStarSound(), 350);

      if (onAttemptCompleted) {
        onAttemptCompleted(item, true, retries);
      }

      // Auto-advance to next chapter/word
      if (autoAdvanceEnabled) {
        clearAutoAdvance();
        setCountdownSeconds(1);

        countdownIntervalRef.current = setInterval(() => {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
          setCountdownSeconds(null);
        }, 1100);

        autoAdvanceTimerRef.current = setTimeout(() => {
          clearAutoAdvance();
          playPopSound();
          onNext();
        }, 1250);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoAdvanceEnabled, clearAutoAdvance, item, onAttemptCompleted, onNext, playCorrectSound, playMicChime, playPopSound, playStarSound, retries]
  );

  const compareTarget = useCallback(
    (speech: string, alternatives?: string[]) => {
      return compareHindiSpeech(targetText, speech, {
        tolerance,
        transliteration: item.transliteration || item.romanization,
        category: item.category,
        consonantRoot: (item as any).consonantRoot,
        vowelName: (item as any).vowelName,
        expectedSpeech: item.expectedSpeech,
        alternatives,
      });
    },
    [item, targetText, tolerance]
  );

  // Instant real-time comparison as the child is speaking!
  const handleInterimTranscript = useCallback(
    (currentSpeech: string, alternatives?: string[]) => {
      if (!currentSpeech || hasSucceeded) return;

      const comparison = compareTarget(currentSpeech, alternatives);
      if (comparison.isMatch) {
        // Instant match while speaking!
        triggerSuccess(comparison, currentSpeech);
      }
    },
    [compareTarget, hasSucceeded, triggerSuccess]
  );

  // End of speech / final result comparison
  const handleFinalTranscript = useCallback(
    (recognizedText: string, alternatives?: string[]) => {
      playMicChime(false);
      stopRecording();

      if (hasSucceeded) return;

      const comparison = compareTarget(recognizedText, alternatives);
      setResult(comparison);

      if (comparison.isMatch) {
        triggerSuccess(comparison, recognizedText);
      } else {
        playRetrySound();
        if (comparison.feedbackKey !== "unclear") {
          setRetries((prev) => prev + 1);
        }
        if (onAttemptCompleted) {
          onAttemptCompleted(item, false, retries + 1);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [compareTarget, hasSucceeded, item, onAttemptCompleted, playMicChime, playRetrySound, retries, stopRecording, triggerSuccess]
  );

  const {
    isSupported: isSttSupported,
    isListening,
    transcript,
    interimTranscript,
    permissionDenied,
    errorMessage,
    errorCode,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    lang: "hi-IN",
    onInterimResult: handleInterimTranscript,
    onFinalResult: handleFinalTranscript,
    onError: (err) => {
      playMicChime(false);
      stopRecording();
      if (err === "network") {
        setResult(null);
      }
    },
  });

  // Reset state when target item changes
  useEffect(() => {
    clearAutoAdvance();
    setRetries(0);
    setResult(null);
    setHasSucceeded(false);
    setShowConfetti(false);
    setParentPassed(false);
    setIsPlayingChildAudio(false);
    resetTranscript();
    clearRecording();

    // Auto-play pronunciation once when word loads to introduce the sound
    const timer = setTimeout(() => {
      speak(targetText, { rate: speechRate });
    }, 450);

    return () => {
      clearTimeout(timer);
      clearAutoAdvance();
      stopTts();
    };
  }, [item.id, targetText, resetTranscript, speak, speechRate, clearRecording, stopTts, clearAutoAdvance]);

  // Play reference pronunciation (Repeat Sound)
  const handleRepeatSound = () => {
    playPopSound();
    if (childAudioRef.current) {
      childAudioRef.current.pause();
      setIsPlayingChildAudio(false);
    }
    speak(targetText, { rate: speechRate });
  };

  // Start Speech Recognition exclusively (without MediaRecorder collision)
  const handleStartSpeaking = () => {
    if (isListening) {
      stopListening();
      playMicChime(false);
    } else {
      clearAutoAdvance();
      playPopSound();
      playMicChime(true);
      setResult(null);
      stopTts();
      // Ensure any recording stream is stopped so mic is 100% free for STT!
      stopRecording();
      if (childAudioRef.current) {
        childAudioRef.current.pause();
        setIsPlayingChildAudio(false);
      }
      // Start pure speech recognition directly
      startListening();
    }
  };

  // Separate Voice Recording specifically for playback
  const handleToggleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
      playMicChime(false);
    } else {
      clearAutoAdvance();
      playPopSound();
      stopTts();
      // Stop speech recognition so mic is free for recording
      stopListening();
      if (childAudioRef.current) {
        childAudioRef.current.pause();
        setIsPlayingChildAudio(false);
      }
      await startRecording();
    }
  };

  // Play back child's recording
  const handlePlayMyVoice = () => {
    if (!audioUrl) return;
    playPopSound();
    stopTts();
    stopListening();
    if (childAudioRef.current) {
      childAudioRef.current.currentTime = 0;
      childAudioRef.current.play();
      setIsPlayingChildAudio(true);
    }
  };

  // Retry action
  const handleRetry = () => {
    clearAutoAdvance();
    playPopSound();
    resetTranscript();
    clearRecording();
    setResult(null);
    setIsPlayingChildAudio(false);
    speak(targetText, { rate: speechRate });
  };

  // Parent / Teacher manual pass
  const handleParentPass = () => {
    playStarSound();
    setParentPassed(true);
    setHasSucceeded(true);
    setShowConfetti(true);
    if (onAttemptCompleted) {
      onAttemptCompleted(item, true, retries);
    }
    if (autoAdvanceEnabled) {
      clearAutoAdvance();
      setCountdownSeconds(1);
      autoAdvanceTimerRef.current = setTimeout(() => {
        clearAutoAdvance();
        playPopSound();
        onNext();
      }, 1200);
    }
  };

  const handleNextClick = () => {
    clearAutoAdvance();
    playPopSound();
    onNext();
  };

  const isNextUnlocked = hasSucceeded || parentPassed;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Hidden audio element for child's recording playback */}
      {audioUrl && (
        <audio
          ref={childAudioRef}
          src={audioUrl}
          onEnded={() => setIsPlayingChildAudio(false)}
          onError={() => setIsPlayingChildAudio(false)}
        />
      )}

      {/* Confetti celebration burst */}
      <ConfettiCelebration trigger={showConfetti} />

      {/* Main Learning Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 relative overflow-hidden transition-all duration-300">
        {/* Decorative background shapes */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-100 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-pink-100 rounded-full opacity-50 pointer-events-none" />

        {/* Progress & Category Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
              <span>{item.emoji}</span>
              <span>{item.subCategory || item.category.toUpperCase()}</span>
            </span>

            {item.lessonOrder && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900 text-amber-300">
                पाठ #{item.lessonOrder}
              </span>
            )}

            {/* Quick Auto-Advance Toggle Pill */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                if (autoAdvanceEnabled) {
                  clearAutoAdvance();
                }
                setAutoAdvanceEnabled(!autoAdvanceEnabled);
              }}
              className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                autoAdvanceEnabled
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 ring-2 ring-emerald-300"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
              title="सही बोलने पर अपने आप अगला पाठ खोलें"
            >
              <Zap className={`w-3 h-3 ${autoAdvanceEnabled ? "fill-white" : ""}`} />
              <span>ऑटो-नेक्स्ट: {autoAdvanceEnabled ? "चालू" : "बंद"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {item.difficulty && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  item.difficulty === "beginner"
                    ? "bg-emerald-100 text-emerald-800"
                    : item.difficulty === "intermediate"
                    ? "bg-sky-100 text-sky-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {item.difficulty === "beginner" ? "शुरुआती" : item.difficulty === "intermediate" ? "मध्यम" : "उन्नत"}
              </span>
            )}

            <span className="text-xs sm:text-sm font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {currentIndex + 1} / {totalItems}
            </span>
          </div>
        </div>

        {/* If similar sound comparison item, show contrast target */}
        {item.comparisonTarget && (
          <div className="mb-3 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center justify-between relative z-10">
            <span>🎯 ध्वनि भेद: {item.devanagari || item.text} बनाम {item.comparisonTarget}</span>
            <span className="text-[11px] opacity-75">{item.comparisonGroup}</span>
          </div>
        )}

        {/* Screen Title: "सुनो और बोलो" */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center justify-center gap-2">
            <span>सुनो और बोलो</span>
            <span className="text-xl">🎙️</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            सही उच्चारण सुनो, माइक से बोलो (स्वतः मिलान होगा) और सितारे जीतो!
          </p>
        </div>

        {/* Large Hindi Target Word Display */}
        <div className="relative z-10 my-4 py-8 px-6 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50/40 border-2 border-amber-200/80 text-center shadow-inner">
          <div className="text-5xl sm:text-6xl mb-2 select-none animate-bounce-gentle">
            {item.emoji}
          </div>

          {/* Huge Devanagari Word / Syllable */}
          <div className="text-6xl sm:text-8xl font-black tracking-normal text-slate-900 font-hindi drop-shadow-sm select-all">
            {item.devanagari || item.text}
          </div>

          {/* Romanization & Meaning */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-slate-600 font-semibold text-sm sm:text-base">
            <span className="bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {item.transliteration || item.romanization}
            </span>
            {(item.meaning || item.englishMeaning) && (
              <span className="text-slate-500 font-normal">
                ({item.meaning || item.englishMeaning})
              </span>
            )}
          </div>

          {/* Child-friendly Mouth shape / pronunciation tip */}
          {item.soundTipHindi && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-amber-900 bg-amber-200/60 px-4 py-2 rounded-2xl border border-amber-300/60 max-w-md">
              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{item.soundTipHindi}</span>
            </div>
          )}
        </div>

        {/* Active Speech Recognition Visualizer (when isListening is true) */}
        {isListening && (
          <div className="mb-4 p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl flex flex-col items-center justify-center animate-fade-in border-2 border-emerald-400/60 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span className="text-sm sm:text-base font-black text-emerald-300">
                🎙️ माइक सुन रहा है — साफ़ आवाज़ में बोलो: '{item.devanagari || item.text}'
              </span>
            </div>

            {/* Animated sound equalizer bars */}
            <div className="flex items-center justify-center gap-1.5 h-10 w-full max-w-xs my-1">
              {[35, 70, 50, 95, 65, 100, 75, 85, 45, 90, 60, 80, 50, 70, 40].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-emerald-400 via-teal-300 to-amber-300 rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDuration: `${0.35 + (i % 5) * 0.12}s`,
                    animationDelay: `${(i % 4) * 0.08}s`,
                  }}
                />
              ))}
            </div>

            <div className="text-xs text-slate-300 font-medium mt-1">
              {interimTranscript ? (
                <span className="text-amber-300 font-bold text-sm sm:text-base">
                  सुना जा रहा है: "{interimTranscript}"
                </span>
              ) : (
                <span>माइक तैयार है... बोलते ही आपका शब्द नीचे दिखाई देगा!</span>
              )}
            </div>
          </div>
        )}

        {/* Live Audio Waveform when explicitly recording voice for playback */}
        {isRecording && (
          <div className="mb-4 relative z-10 animate-fade-in">
            <AudioWaveform
              bars={waveformBars}
              isActive={isRecording}
              voiceLevel={voiceLevel}
              label={`आवाज़ रिकॉर्ड हो रही है (${recordingDuration}s) — अब बोलो!`}
            />
          </div>
        )}

        {/* Browser Support / Microphone Alerts */}
        {!isSttSupported && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-3 relative z-10">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">ब्राउज़र में स्पीच रिकॉग्निशन उपलब्ध नहीं है:</strong>
              Google Chrome या Microsoft Edge ब्राउज़र में यह सर्वोत्तम चलता है। आप अभी भी आवाज़ सुन सकते हैं, अपनी आवाज़ रिकॉर्ड कर सकते हैं और नीचे अभिभावक मंज़ूरी से आगे बढ़ सकते हैं।
            </div>
          </div>
        )}

        {permissionDenied && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs sm:text-sm flex items-start gap-3 relative z-10">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">माइक्रोफ़ोन अनुमति आवश्यक है:</strong>
              कृपया अपने ब्राउज़र के एड्रेस बार में लॉक (🔒) आइकन पर क्लिक करें और माइक्रोफ़ोन को अनुमति (Allow) दें।
            </div>
          </div>
        )}

        {/* Network / Internet Alert with clear actions */}
        {errorCode === "network" && (
          <div className="mb-6 p-4 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm text-amber-950 text-xs sm:text-sm flex flex-col gap-2.5 relative z-10 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">🌐</span>
              <div className="flex-1">
                <strong className="block font-bold text-sm text-amber-950 mb-0.5">
                  इंटरनेट नेटवर्क की समस्या (Online Speech Recognition)
                </strong>
                <p className="text-amber-800 text-xs leading-relaxed">
                  Google Chrome में हिंदी आवाज़ पहचानने के लिए इंटरनेट चालू होना चाहिए (Google Speech Cloud)।
                  यदि इंटरनेट नहीं है, तो आप <strong>आवाज़ रिकॉर्ड</strong> कर सकते हैं या <strong>'अभिभावक मंज़ूरी ✓'</strong> से आगे बढ़ सकते हैं।
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200">
              <button
                type="button"
                onClick={handleStartSpeaking}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95"
              >
                <span>🔄</span>
                <span>माइक फिर से चलाएं</span>
              </button>

              {showParentOverride && !hasSucceeded && (
                <button
                  type="button"
                  onClick={handleParentPass}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>अभिभावक मंज़ूरी ✓ (तुरंत अगला खोलें)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {errorMessage && !permissionDenied && errorCode !== "network" && (
          <div className="mb-4 text-center text-xs sm:text-sm text-rose-600 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Recognition Status / Heard Card */}
        {(isListening || interimTranscript || result) && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 relative z-10 animate-fade-in">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>पहचान का परिणाम (Speech Recognition)</span>
              {result && (
                <span className="text-[11px] font-normal text-slate-400">
                  समानता: {result.similarityPercent}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-400 block font-medium">लक्ष्य (Target)</span>
                <span className="text-xl font-bold text-slate-800">{item.devanagari || item.text}</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-400 block font-medium">
                  {isListening ? "सुन रहे हैं..." : "हमने सुना (Heard)"}
                </span>
                <span className="text-xl font-bold text-slate-800">
                  {isListening
                    ? interimTranscript || "माइक चालू है, बोलो..."
                    : result?.recognized || transcript || "—"}
                </span>
              </div>
            </div>

            {/* Child-friendly Feedback Alert */}
            {result && (
              <div
                className={`mt-4 p-4 rounded-2xl flex items-center gap-3 transition-all ${
                  result.isMatch
                    ? "bg-emerald-100 border-2 border-emerald-400 text-emerald-950"
                    : result.feedbackKey === "unclear"
                    ? "bg-amber-100 border-2 border-amber-300 text-amber-950"
                    : "bg-rose-100 border-2 border-rose-300 text-rose-950"
                }`}
              >
                {result.isMatch ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 animate-bounce" />
                ) : result.feedbackKey === "unclear" ? (
                  <HelpCircle className="w-8 h-8 text-amber-600 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-500 shrink-0" />
                )}

                <div className="flex-1">
                  <div className="text-base sm:text-lg font-black">{result.feedbackHindi}</div>
                  <div className="text-xs opacity-80 mt-0.5">
                    {result.isMatch
                      ? "शाबाश! सही उच्चारण पहचाना गया।"
                      : "फिर से सुनो और साफ़ आवाज़ में दोहराओ!"}
                  </div>
                </div>

                {result.isMatch && (
                  <div className="flex items-center text-amber-500 text-xl animate-spin-slow">
                    ⭐
                  </div>
                )}
              </div>
            )}

            {/* Auto-Advance Notification Banner */}
            {hasSucceeded && autoAdvanceEnabled && countdownSeconds !== null && (
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-between animate-fade-in border-2 border-emerald-300">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow shrink-0" />
                  <div>
                    <div className="font-black text-sm sm:text-base leading-tight">
                      🎉 शाबाश! {countdownSeconds} सेकंड में अगला पाठ आ रहा है...
                    </div>
                    <div className="text-[11px] text-emerald-100 font-medium">
                      (या सीधे 'तुरंत अगला ➔' दबाएं)
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleNextClick}
                  className="px-4 py-1.5 rounded-xl bg-white text-emerald-900 font-black text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 shadow transition"
                >
                  तुरंत अगला ➔
                </button>
              </div>
            )}
          </div>
        )}

        {/* Primary Audio Controls Grid: Repeat Sound + Speech Recognition + Record/Play My Voice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 mb-4">
          {/* Button 1: Repeat Sound (🔊 सही आवाज़ सुनो) */}
          <button
            type="button"
            onClick={handleRepeatSound}
            disabled={isSpeaking}
            className={`py-3.5 px-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
              isSpeaking
                ? "bg-sky-500 text-white animate-pulse"
                : "bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-bounce" : ""}`} />
            <span>{isSpeaking ? "आवाज़ चल रही है..." : "🔊 सही आवाज़"}</span>
          </button>

          {/* Button 2: Speech Recognition (🎤 अब तुम बोलो - जाँचें) */}
          <button
            type="button"
            onClick={handleStartSpeaking}
            className={`py-3.5 px-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 relative ${
              isListening
                ? "bg-rose-500 text-white ring-4 ring-rose-300 animate-pulse"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            }`}
          >
            {isListening ? (
              <>
                <Square className="w-5 h-5 fill-white" />
                <span>⏹️ सुनना बंद करो</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>🎤 अब तुम बोलो</span>
              </>
            )}
          </button>

          {/* Button 3: Child Voice Recording / Playback */}
          <div className="flex items-center gap-1.5 w-full">
            {audioUrl ? (
              <div className="flex items-center gap-1.5 w-full">
                <button
                  type="button"
                  onClick={handlePlayMyVoice}
                  disabled={isPlayingChildAudio}
                  className={`flex-1 py-3.5 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
                    isPlayingChildAudio
                      ? "bg-purple-500 text-white ring-4 ring-purple-200 animate-pulse"
                      : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 text-white"
                  }`}
                  title="अपनी रिकॉर्ड की गई आवाज़ सुनो"
                >
                  <Play className={`w-4 h-4 ${isPlayingChildAudio ? "animate-bounce" : ""}`} />
                  <span>{isPlayingChildAudio ? "चल रही है..." : "▶️ मेरी आवाज़"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleVoiceRecording}
                  className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition"
                  title="फिर से आवाज़ रिकॉर्ड करें"
                >
                  <Mic className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleToggleVoiceRecording}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                  isRecording
                    ? "bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 text-white"
                }`}
                title="अपनी आवाज़ रिकॉर्ड करें और बाद में सुनें"
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4 fill-white" />
                    <span>⏹️ रिकॉर्डिंग रोकें</span>
                  </>
                ) : (
                  <>
                    <Headphones className="w-4 h-4" />
                    <span>🎙️ आवाज़ रिकॉर्ड</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Secondary Navigation Row: Previous + Retry + Parent Override + Next */}
        <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            {/* Previous Button (⬅️ पिछला) */}
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
                  currentIndex === 0
                    ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>⬅️ पिछला</span>
              </button>
            )}

            {/* Retry Button (🔁 फिर से कोशिश करो) */}
            <button
              type="button"
              onClick={handleRetry}
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>🔁 फिर से कोशिश</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Parent manual pass override */}
            {showParentOverride && !isNextUnlocked && (
              <button
                type="button"
                onClick={handleParentPass}
                className="px-3.5 py-2.5 rounded-xl font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center gap-1.5"
                title="यदि बच्चे ने सही बोला पर माइक नहीं पहचान सका"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>अभिभावक मंज़ूरी ✓</span>
              </button>
            )}

            {/* Next Button (➡️ अगला शब्द/अक्षर) */}
            <button
              type="button"
              onClick={handleNextClick}
              disabled={!isNextUnlocked}
              className={`px-6 py-3 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                isNextUnlocked
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 shadow-lg scale-105 animate-bounce-gentle active:scale-95 cursor-pointer ring-4 ring-amber-300"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-75"
              }`}
            >
              <span>➡️ अगला</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
