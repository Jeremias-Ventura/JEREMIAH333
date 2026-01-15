"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface TimerContextType {
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  return (
    <TimerContext.Provider value={{ isTimerRunning, setIsTimerRunning }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimeProvider");
  }
  return context;
}
