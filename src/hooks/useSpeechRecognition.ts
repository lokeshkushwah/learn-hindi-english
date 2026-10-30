"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Web Speech API interface declarations for TypeScript
interface IWindowSpeechRecognition extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export type SpeechErrorCode =
  | "network"
  | "not-allowed"
  | "service-not-allowed"
  | "no-speech"
  | "audio-capture"
  | "aborted"
  | "unknown"
  | null;

export interface UseSpeechRecognitionOptions {
  lang?: string;
  timeoutMs?: number;
  onInterimResult?: (transcript: string, alternatives?: string[]) => void;
  onFinalResult?: (transcript: string, alternatives?: string[]) => void;
  onError?: (errorType: string) => void;
}

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const { lang = "hi-IN", timeoutMs = 8000, onInterimResult, onFinalResult, onError } = options;

  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<SpeechErrorCode>(null);

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestTranscriptRef = useRef<string>("");
  const latestAlternativesRef = useRef<string[]>([]);
  const hasDispatchedRef = useRef<boolean>(false);
  const isListeningRef = useRef<boolean>(false);
  const lastErrorRef = useRef<SpeechErrorCode>(null);

  // Keep latest callbacks in refs to avoid stale closures
  const onFinalResultRef = useRef(onFinalResult);
  onFinalResultRef.current = onFinalResult;

  const onInterimResultRef = useRef(onInterimResult);
  onInterimResultRef.current = onInterimResult;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  // Check browser support on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as IWindowSpeechRecognition;
      const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
      setIsSupported(Boolean(SpeechRec));
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const dispatchFinalResult = useCallback((text: string, alternatives?: string[]) => {
    if (hasDispatchedRef.current) return;
    hasDispatchedRef.current = true;
    clearTimer();
    const clean = text.trim();
    const alts = alternatives && alternatives.length > 0 ? alternatives : latestAlternativesRef.current;
    setTranscript(clean);
    setInterimTranscript("");
    if (onFinalResultRef.current) {
      onFinalResultRef.current(clean, alts);
    }
  }, [clearTimer]);

  const stopListening = useCallback(() => {
    clearTimer();
    isListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop error if already stopped
      }
    }
    setIsListening(false);

    // Auto-dispatch whatever was heard when stopped
    if (!hasDispatchedRef.current) {
      dispatchFinalResult(latestTranscriptRef.current, latestAlternativesRef.current);
    }
  }, [clearTimer, dispatchFinalResult]);

  const resetTranscript = useCallback(() => {
    latestTranscriptRef.current = "";
    latestAlternativesRef.current = [];
    hasDispatchedRef.current = false;
    setTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const win = window as IWindowSpeechRecognition;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      setIsSupported(false);
      setErrorMessage("इस ब्राउज़र में स्पीच रिकॉग्निशन उपलब्ध नहीं है। Chrome या Edge का उपयोग करें।");
      return;
    }

    // Stop any previous running instance cleanly
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }

    clearTimer();
    latestTranscriptRef.current = "";
    latestAlternativesRef.current = [];
    hasDispatchedRef.current = false;
    lastErrorRef.current = null;
    setTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);
    setErrorCode(null);
    setPermissionDenied(false);

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;

      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 5;

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;

        // Auto-stop timeout if child remains completely silent
        clearTimer();
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, timeoutMs);
      };

      recognition.onspeechstart = () => {
        // Reset timeout once user starts speaking to give full time to complete
        clearTimer();
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, timeoutMs);
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";
        const allCandidates: string[] = [];

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          for (let a = 0; a < item.length; a++) {
            const cand = item[a]?.transcript?.trim();
            if (cand && !allCandidates.includes(cand)) {
              allCandidates.push(cand);
            }
          }
          const text = item[0]?.transcript || "";
          if (item.isFinal) {
            final += text;
          } else {
            interim += text;
          }
        }

        const currentSpoken = (final || interim || "").trim();
        if (currentSpoken) {
          latestTranscriptRef.current = currentSpoken;
        }

        if (allCandidates.length > 0) {
          latestAlternativesRef.current = allCandidates;
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        // Live interim callback with candidate alternatives
        if (currentSpoken && onInterimResultRef.current) {
          onInterimResultRef.current(currentSpoken, allCandidates);
        }

        if (final) {
          dispatchFinalResult(final, allCandidates);
        }
      };

      recognition.onspeechend = () => {
        // Chrome detected speech ended — compare immediately!
        if (!hasDispatchedRef.current && latestTranscriptRef.current) {
          dispatchFinalResult(latestTranscriptRef.current, latestAlternativesRef.current);
        }
      };

      recognition.onerror = (event: any) => {
        clearTimer();
        setIsListening(false);
        isListeningRef.current = false;
        const error = (event.error || "unknown") as SpeechErrorCode;
        lastErrorRef.current = error;
        setErrorCode(error);

        if (error === "not-allowed" || error === "service-not-allowed") {
          setPermissionDenied(true);
          setErrorMessage("माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन चालू करें।");
        } else if (error === "no-speech") {
          setErrorMessage("मुझे आवाज़ नहीं सुनाई दी। कृपया माइक के पास आकर फिर से बोलें।");
          if (!hasDispatchedRef.current) {
            dispatchFinalResult("", []);
          }
        } else if (error === "audio-capture") {
          setErrorMessage("माइक्रोफ़ोन नहीं मिल सका। कृपया माइक कनेक्ट है या नहीं जांचें।");
        } else if (error === "network") {
          setErrorMessage("इंटरनेट नेटवर्क की समस्या है। Chrome में हिंदी आवाज़ की पहचान के लिए इंटरनेट आवश्यक है।");
        } else {
          setErrorMessage("पहचान में रुकावट आई। फिर से कोशिश करें।");
        }

        if (onErrorRef.current) onErrorRef.current(error || "unknown");
      };

      recognition.onend = () => {
        clearTimer();
        setIsListening(false);
        isListeningRef.current = false;

        // If a network or hardware error occurred, do not dispatch an empty speech result
        if (
          lastErrorRef.current === "network" ||
          lastErrorRef.current === "not-allowed" ||
          lastErrorRef.current === "service-not-allowed" ||
          lastErrorRef.current === "audio-capture"
        ) {
          return;
        }

        // Guarantee final comparison even if speech ended without isFinal
        if (!hasDispatchedRef.current) {
          dispatchFinalResult(latestTranscriptRef.current, latestAlternativesRef.current);
        }
      };

      recognition.start();
    } catch (err: any) {
      clearTimer();
      setIsListening(false);
      isListeningRef.current = false;
      setErrorMessage("माइक शुरू करने में त्रुटि: " + (err?.message || "अज्ञात"));
    }
  }, [lang, timeoutMs, clearTimer, dispatchFinalResult, stopListening]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      clearTimer();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [clearTimer]);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    permissionDenied,
    errorMessage,
    errorCode,
    startListening,
    stopListening,
    resetTranscript,
  };
}
