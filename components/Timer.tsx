"use client";

import { useState, useEffect, useRef } from "react";

interface TimerProps {
  onComplete: (durationMinutes: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  initialMinutes?: number;
}

export default function Timer({
  onComplete,
  onStart,
  onPause,
  onReset,
  initialMinutes = 25,
}: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [timeInput, setTimeInput] = useState("25:00");

  const startTimeRef = useRef<number | null>(null);
  const durationRef = useRef(initialMinutes * 60);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Parse MM:SS input to seconds
  const parseTimeInput = (input: string): number | null => {
    const parts = input.split(":");
    if (parts.length !== 2) return null;

    const mins = parseInt(parts[0], 10);
    const secs = parseInt(parts[1], 10);

    if (isNaN(mins) || isNaN(secs)) return null;
    if (mins < 0 || mins > 99) return null;
    if (secs < 0 || secs > 59) return null;

    return mins * 60 + secs;
  };

  // Auto-fix time input
  const fixTimeInput = (input: string): string => {
    const parts = input.split(":");
    if (parts.length !== 2) return timeInput;

    let mins = parseInt(parts[0], 10) || 0;
    let secs = parseInt(parts[1], 10) || 0;

    if (secs > 59) secs = 59;
    if (mins > 99) mins = 99;
    if (mins < 0) mins = 0;
    if (secs < 0) secs = 0;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Update timeInput when secondsLeft changes (but not when editing or running)
  useEffect(() => {
    if (!isEditing && !isRunning && !isComplete) {
      setTimeInput(formatTime(secondsLeft));
    }
  }, [secondsLeft, isEditing, isRunning, isComplete]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) {
      startTimeRef.current = null;
      return;
    }

    // Capture start time and duration when timer starts
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      durationRef.current = secondsLeft;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
      const remaining = Math.max(0, durationRef.current - elapsed);

      setSecondsLeft(remaining);

      if (remaining === 0) {
        setIsRunning(false);
        setIsComplete(true);
        startTimeRef.current = null;
        onComplete(Math.ceil(durationRef.current / 60));

        // Play completion sound
        if (typeof window !== "undefined" && "AudioContext" in window) {
          try {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = "sine";

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              audioContext.currentTime + 0.5
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
          } catch (e) {
            // Silent fail if audio doesn't work
          }
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isEditing && !isComplete) {
        e.preventDefault();
        if (isRunning) {
          handlePause();
        } else {
          handleStart();
        }
      }

      if (e.code === "KeyR" && !isEditing) {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, isEditing, isComplete, secondsLeft]);

  const handleStart = () => {
    if (secondsLeft === 0) return;

    if (isComplete) {
      // Reset from complete state
      const seconds = parseTimeInput(timeInput) || initialMinutes * 60;
      setSecondsLeft(seconds);
      setIsComplete(false);
    }

    setIsRunning(true);
    onStart();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause();
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    startTimeRef.current = null;

    const resetSeconds =
      durationRef.current > 0 ? durationRef.current : initialMinutes * 60;
    setSecondsLeft(resetSeconds);
    setTimeInput(formatTime(resetSeconds));
    setIsEditing(false);

    onReset();
  };

  const handleTimeInputChange = (value: string) => {
    let cleaned = value.replace(/[^\d:]/g, "");

    if (cleaned.length === 0) {
      setTimeInput("");
      return;
    }

    if (cleaned.length === 2 && cleaned[1] === ":") {
      cleaned = "0" + cleaned;
    }

    if (cleaned.length === 2 && !cleaned.includes(":")) {
      cleaned = cleaned + ":";
    }

    if (cleaned.length > 2 && !cleaned.includes(":")) {
      cleaned = cleaned.slice(0, 2) + ":" + cleaned.slice(2);
    }

    if (cleaned.length <= 5) {
      setTimeInput(cleaned);
    }
  };

  const handleTimeInputBlur = () => {
    const fixed = fixTimeInput(timeInput);
    setTimeInput(fixed);
    const seconds = parseTimeInput(fixed) || initialMinutes * 60;

    if (seconds > 0) {
      setSecondsLeft(seconds);
      durationRef.current = seconds;
      setIsComplete(false);
    } else {
      setTimeInput(formatTime(secondsLeft));
    }
    setIsEditing(false);
  };

  const handleTimeClick = () => {
    if (!isRunning && !isComplete) {
      setIsEditing(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative mt-12 sm:mt-0">
      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center text-center">
        {isEditing ? (
          <input
            type="text"
            value={timeInput}
            onChange={(e) => handleTimeInputChange(e.target.value)}
            onBlur={handleTimeInputBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTimeInputBlur();
              }
              if (e.key === "Escape") {
                setIsEditing(false);
                setTimeInput(formatTime(secondsLeft));
              }
            }}
            className="text-8xl md:text-9xl font-light text-white bg-transparent border border-slate-800 rounded-lg px-0 outline-none text-center w-3/4 focus:border-slate-600 focus:outline-none"
            style={{ fontWeight: 300 }}
            autoFocus
            placeholder="MM:SS"
            maxLength={5}
          />
        ) : (
          <div
            onClick={handleTimeClick}
            className={`text-8xl md:text-9xl font-light text-slate-100 ${
              !isRunning && !isComplete
                ? "cursor-text hover:opacity-80 transition-opacity"
                : ""
            }`}
            style={{ fontWeight: 300 }}
            title={!isRunning && !isComplete ? "Click to edit time" : ""}
          >
            {formatTime(secondsLeft)}
          </div>
        )}
        {isComplete && (
          <div className="mt-4 text-lg font-light text-slate-400">
            Session Complete
          </div>
        )}
        {!isRunning && !isComplete && !isEditing && (
          <div className="mt-2 text-xs text-slate-500">
            Click time to edit • Space to start • R to reset
          </div>
        )}
        {isRunning && (
          <div className="mt-2 text-xs text-slate-500">
            Space to pause • R to reset
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-3 mt-10">
        {!isComplete && (
          <>
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={secondsLeft === 0}
                className="cursor-pointer rounded-2xl bg-[#17213F] px-6 py-2 text-slate-400 text-xs tracking-widest transition-all hover:bg-[#1E2A6B] hover:text-white focus:outline-none uppercase font-light disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="cursor-pointer rounded-2xl bg-[#17213F] px-6 py-2 text-xs tracking-widest text-slate-100 transition-colors hover:bg-[#1E2A6B] focus:outline-none uppercase font-light"
              >
                PAUSE
              </button>
            )}
          </>
        )}

        {isComplete && (
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-2xl tracking-widest bg-emerald-600/60 px-6 py-2 text-sm text-slate-100 transition-colors hover:bg-emerald-500/60 focus:outline-none uppercase font-light"
          >
            DONE
          </button>
        )}

        <button
          onClick={handleReset}
          className="cursor-pointer text-xs tracking-widest text-slate-500 transition-colors hover:text-slate-300 focus:outline-none uppercase mt-2 font-light"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
