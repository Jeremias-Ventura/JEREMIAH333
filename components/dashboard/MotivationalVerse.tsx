"use client";

import type { SessionStats } from "@/types/session";
import { motion } from "framer-motion";

interface MotivationalVerseProps {
  stats: SessionStats;
  delay?: number;
}

// Helper function to get a random verse from an array
function getRandomVerseFromArray(
  verses: Array<{ text: string; reference: string }>
) {
  if (verses.length === 0) return { text: "", reference: "" };
  return verses[Math.floor(Math.random() * verses.length)];
}

export function MotivationalVerse({
  stats,
  delay = 0,
}: MotivationalVerseProps) {
  const encourageVerses = [
    {
      text: "And let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
      reference: "Galatians 6:9",
    },
    {
      text: "I can do all things through him who strengthens me.",
      reference: "Philippians 4:13",
    },
    {
      text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
      reference: "Isaiah 40:31",
    },
  ];

  const motivateVerses = [
    {
      text: "But as for you, be strong; don't give up, for your work has a reward",
      reference: "2 Chronicles 15:7",
    },
    {
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      reference: "Isaiah 41:10",
    },
    {
      text: "Commit your work to the Lord, and your plans will be established.",
      reference: "Proverbs 16:3",
    },
  ];

  const persevereVerses = [
    {
      text: "We also boast in our afflictions, because we know that affliction produces endurance, endurance produces proven character, and proven character produces hope",
      reference: "Romans 5:3-4",
    },
    {
      text: "Blessed is the one who endures trials, because when he has stood the test he will receive the crown of life that God has promised to those who love him",
      reference: "James 1:12",
    },
    {
      text: "Let your eyes look forward; fix your gaze straight ahead. Carefully consider the path for your feet, and all your ways will be established",
      reference: "Proverbs 4:25-26",
    },
  ];

  // Determine which verse category to use
  let selectedVerse;

  if (
    stats?.currentStreak > 3 &&
    stats?.weekMinutes > 300 &&
    stats?.todayTrend === "up"
  ) {
    // User is doing well - encourage them
    selectedVerse = getRandomVerseFromArray(encourageVerses);
  } else if (stats?.currentStreak < 3 && stats?.weekMinutes < 300) {
    // User is struggling - comfort/persevere
    selectedVerse = getRandomVerseFromArray(persevereVerses);
  } else {
    // In between - motivate them
    selectedVerse = getRandomVerseFromArray(motivateVerses);
  }

  // Handle edge case where stats might be null or verse is empty
  if (!selectedVerse || !selectedVerse.text) {
    selectedVerse = {
      text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
      reference: "Proverbs 3:5",
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="text-center max-w-3xl italic text-slate-400 mx-auto text-lg font-light "
    >
      <div>
        <p className="mb-3">"{selectedVerse.text}"</p>
        <p className="mb-8">{selectedVerse.reference}</p>
      </div>
    </motion.div>
  );
}
