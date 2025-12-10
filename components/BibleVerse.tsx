"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { getRandomVerse, type BibleVerse } from "@/lib/bible-verses";

interface BibleVerseDisplayProps {
  onNewSession?: () => void;
}

export interface BibleVerseDisplayRef {
  loadNewVerse: () => void;
}

const BibleVerseDisplay = forwardRef<
  BibleVerseDisplayRef,
  BibleVerseDisplayProps
>(({ onNewSession }, ref) => {
  const [verse, setVerse] = useState<BibleVerse>(getRandomVerse());
  const [isFading, setIsFading] = useState(false);

  const loadNewVerse = () => {
    setIsFading(true);
    setTimeout(() => {
      setVerse(getRandomVerse());
      setIsFading(false);
    }, 300);
  };

  useImperativeHandle(ref, () => ({
    loadNewVerse,
  }));

  useEffect(() => {
    if (onNewSession) {
      loadNewVerse();
    }
  }, [onNewSession]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mb-20">
      {/* New Verse Button */}
      <button
        onClick={loadNewVerse}
        className="mb-3 sm:mb-3 text-sm text-slate-400 transition-colors hover:text-white hover:cursor-pointer focus:outline-none px-4 py-2 rounded-2xl hover:bg-slate-800 uppercase "
      >
        New Verse
      </button>

      <div
        className={`flex flex-col items-center text-center transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Verse Text - Large and prominent */}
        <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-slate-100 font-normal max-w-2xl mx-auto">
          {verse.text}
        </p>
        <p className="mt-6 text-base md:text-lg font-light text-white">
          {verse.reference}
        </p>
      </div>
    </div>
  );
});

BibleVerseDisplay.displayName = "BibleVerseDisplay";

export default BibleVerseDisplay;
