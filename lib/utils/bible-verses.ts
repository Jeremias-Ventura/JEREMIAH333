export interface BibleVerse {
  text: string
  reference: string
}

export const BIBLE_VERSES: BibleVerse[] = [
  {
    text: "Be still, and know that I am God.",
    reference: "Psalm 46:10"
  },
  {
    text: "I can do all things through him who strengthens me.",
    reference: "Philippians 4:13"
  },
  {
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
    reference: "Proverbs 3:5"
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11"
  },
  {
    text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    reference: "Isaiah 40:31"
  },
  {
    text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    reference: "Philippians 4:6"
  },
  {
    text: "Commit your work to the Lord, and your plans will be established.",
    reference: "Proverbs 16:3"
  },
  {
    text: "Whatever you do, work heartily, as for the Lord and not for men.",
    reference: "Colossians 3:23"
  },
  {
    text: "The Lord will fight for you, and you have only to be silent.",
    reference: "Exodus 14:14"
  },
  {
    text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    reference: "Matthew 6:33"
  },
  {
    text: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7"
  },
  {
    text: "And let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
    reference: "Galatians 6:9"
  },
  {
    text: "The Lord is my strength and my shield; in him my heart trusts, and I am helped.",
    reference: "Psalm 28:7"
  },
  {
    text: "For God gave us a spirit not of fear but of power and love and self-control.",
    reference: "2 Timothy 1:7"
  },
  {
    text: "In all your ways acknowledge him, and he will make straight your paths.",
    reference: "Proverbs 3:6"
  },
  {
    text: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    reference: "Matthew 11:28"
  },
  {
    text: "The Lord is near to all who call on him, to all who call on him in truth.",
    reference: "Psalm 145:18"
  },
  {
    text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    reference: "Romans 8:28"
  },
  {
    text: "Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you.",
    reference: "Deuteronomy 31:6"
  },
  {
    text: "But as for you, be strong and do not give up, for your work will be rewarded.",
    reference: "2 Chronicles 15:7"
  },
  {
    text: "The heart of man plans his way, but the Lord establishes his steps.",
    reference: "Proverbs 16:9"
  },
  {
    text: "Let your eyes look directly forward, and your gaze be straight before you.",
    reference: "Proverbs 4:25"
  },
  {
    text: "Therefore, since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight, and sin which clings so closely, and let us run with endurance the race that is set before us.",
    reference: "Hebrews 12:1"
  },
  {
    text: "For the Lord God is a sun and shield; the Lord bestows favor and honor. No good thing does he withhold from those who walk uprightly.",
    reference: "Psalm 84:11"
  },
  {
    text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
    reference: "Lamentations 3:22-23"
  }
]

export function getRandomVerse(): BibleVerse {
  return BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)]
}

