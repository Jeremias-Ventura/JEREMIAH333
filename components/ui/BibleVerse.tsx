"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomVerse, type BibleVerse } from "@/lib/utils/bible-verses";

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

  const loadNewVerse = () => {
    setVerse(getRandomVerse());
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
    <div className="flex flex-col items-center justify-center w-full h-full mb-10">
      {/* New Verse Button */}
      <button
        onClick={loadNewVerse}
        className="mb-1 sm:mb-3 sm:mt-0 mt-2 text-xs text-slate-500 transition-colors hover:text-slate-300 hover:cursor-pointer focus:outline-none px-4 py-2 rounded-2xl hover:bg-slate-900/40 uppercase tracking-wider font-light"
      >
        New Verse
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={verse.text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Verse Text - Large and prominent */}
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-slate-100 font-light max-w-2xl mx-auto">
            {verse.text}
          </p>
          <p className="mt-6 text-base md:text-lg font-light text-slate-400">
            {verse.reference}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

BibleVerseDisplay.displayName = "BibleVerseDisplay";

export default BibleVerseDisplay;
