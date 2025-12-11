"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import MeteorShowerBackground from "@/components/MeteorShowerBackground";
import {
  BookOpen,
  Clock,
  CrossIcon,
  Mail,
  MoonStar,
  Sparkles,
  StarHalf,
  StarIcon,
} from "lucide-react";


// Animation variants for story-like reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageSlideIn = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Reusable animated section component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const titleRef = useRef(null);
  const verseRef = useRef(null);
  const imageRef = useRef(null);
  const meaningRef = useRef(null);
  const meaning1Ref = useRef(null);
  const meaning2Ref = useRef(null);
  const dividerRef = useRef(null);
  const featuresRef = useRef(null);
  const footerRef = useRef(null);


  const titleInView = useInView(titleRef, { once: true });
  const verseInView = useInView(verseRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });
  const meaningInView = useInView(meaningRef, { once: true, margin: "-50px" });
  const meaning1InView = useInView(meaning1Ref, {
    once: true,
    margin: "-50px",
  });
  const meaning2InView = useInView(meaning2Ref, {
    once: true,
    margin: "-50px",
  });
  const dividerInView = useInView(dividerRef, { once: true });
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-50px",
  });
  const comingSoonRef = useRef(null);
  const comingSoonDividerRef = useRef(null);
  const dashboardRef = useRef(null);
  const dashboardImageRef = useRef(null);
  const customVersesRef = useRef(null);
  const customVersesImageRef = useRef(null);
  const waitlistRef = useRef(null);
  const socialRef = useRef(null);
  const comingSoonInView = useInView(comingSoonRef, {
    once: true,
    margin: "-100px",
  });
  const comingSoonDividerInView = useInView(comingSoonDividerRef, {
    once: true,
    margin: "-100px",
  });
  const dashboardInView = useInView(dashboardRef, {
    once: true,
    margin: "-100px",
  });
  const dashboardImageInView = useInView(dashboardImageRef, {
    once: true,
    margin: "-100px",
  });
  const customVersesInView = useInView(customVersesRef, {
    once: true,
    margin: "-100px",
  });
  const customVersesImageInView = useInView(customVersesImageRef, {
    once: true,
    margin: "-100px",
  });
  const waitlistInView = useInView(waitlistRef, {
    once: true,
    margin: "-100px",
  });
  const socialInView = useInView(socialRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true });

  // Load Fillout script on mount
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://server.fillout.com/embed/v1/"]'
    );
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://server.fillout.com/embed/v1/";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);


  return (
    <div className="min-h-screen relative">
      {/* Subtle meteor shower background - always running */}
      <MeteorShowerBackground />
      {/* Navigation Link */}
      <div className="w-full relative z-50 px-6 md:px-10 pt-6 md:pt-8">
        <Link
          href="/"
          className="inline-block hover:text-slate-100 transition-colors text-base hover:underline underline-offset-2"
        >
          Back to Timer
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 text-white ">
        {/* Top Heading Section */}
        <div className="text-center mb-30 md:mb-40">
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: -20 }}
            animate={
              titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular mb-20"
          >
            JEREMIAH33:3
          </motion.h1>

          <div className="mx-auto relative">
            <motion.p
              ref={verseRef}
              initial={{ opacity: 0, y: 20 }}
              animate={
                verseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-base md:text-lg font-normal mb-1"
            >
              " Call to me and I will answer you and tell you great and
              unsearchable things you do not know. "
            </motion.p>
            <motion.p
              ref={verseRef}
              initial={{ opacity: 0, y: 20 }}
              animate={
                verseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-base md:text-lg font-normal mb-1"
            >
              Jeremiah 33:3 (NIV)
            </motion.p>

            {/* Calling image */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={
                imageInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.9, y: 30 }
              }
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex justify-center mt-8"
            >
              <Image
                src="/calling.png"
                alt="Calling"
                width={350}
                height={350}
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>

        {/* Meaning Behind the Name Section */}
        <section className="mb-16 md:mb-20 mt-20">
          <motion.h2
            ref={meaningRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              meaningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular text-center mb-6"
          >
            Meaning Behind the Name
          </motion.h2>
          <div className="space-y-4 mt-15">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={
                meaningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-xl md:text-3xl font-regular mb-4"
            >
              The What
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={
                meaningInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-lg max-w-md mr-auto"
            >
              Jeremiah 33:3 reminds us that when we seek God, He meets us with
              clarity, wisdom, and peace — even in the middle of our studying,
              work, or everyday challenges.
            </motion.p>
            <motion.div
              ref={meaning1Ref}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={
                meaning1InView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 50, scale: 0.95 }
              }
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex justify-end sm:-mt-20 -mt-5"
            >
              <Image
                src="/meaning1.png"
                alt="Meaning 1"
                width={300}
                height={300}
                className="max-w-full h-auto"
              />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={
                meaningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-xl md:text-3xl font-regular mb-4 text-right mt-15"
            >
              The Why
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={
                meaningInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{
                duration: 0.7,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-lg max-w-md ml-auto text-right mt-0"
            >
              I built JEREMIAH33:3 because I wanted a tool that helped me stay
              grounded in my faith while I worked on school, projects, and life.
              Sometimes all we need is a verse in front of us to remind us why
              we're striving, Who is with us, and where our strength comes from.
            </motion.p>
            <motion.div
              ref={meaning2Ref}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={
                meaning2InView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: -50, scale: 0.95 }
              }
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex justify-start sm:-mt-30 -mt-5"
            >
              <Image
                src="/meaning2.png"
                alt="Meaning 2"
                width={350}
                height={350}
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Decorative divider */}
        <motion.div
          ref={dividerRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            dividerInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center my-16 md:my-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={dividerInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-px bg-white/10 grow max-w-xs"
          />
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={
              dividerInView
                ? { opacity: 1, rotate: 0 }
                : { opacity: 0, rotate: -180 }
            }
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <CrossIcon
              className="w-5 h-5 mx-4 text-white/30"
              strokeWidth={2.5}
            />
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={dividerInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-px bg-white/10 grow max-w-xs"
          />
        </motion.div>

        {/* What This App Does Section */}
        <section className="mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular text-center mb-16"
          >
            What This App Does
          </motion.h2>

          <div ref={featuresRef} className="space-y-20">
            {/* Focus Timer Subsection */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={
                featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
              }
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-start gap-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  featuresInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="shrink-0 mt-1"
              >
                <Clock className="w-8 h-8 sm:w-10 sm:h-10  text-white" strokeWidth={1.5} />
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    featuresInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-xl md:text-3xl font-regular mb-4"
                >
                  Focus Timer
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  className="text-lg md:text-lg leading-relaxed max-w-md"
                >
                  Work with intention using a simple, calming countdown timer.
                  It isn't a full Pomodoro system — there are no complex
                  intervals or break cycles. Instead, it's designed to be
                  peaceful and distraction-free, giving you space to breathe,
                  focus, and stay present in your work.
                </motion.p>
              </div>
            </motion.div>

            {/* Bible Verse Rotation Subsection */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={
                featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }
              }
              transition={{
                duration: 0.7,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-start gap-6 flex-row-reverse"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  featuresInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                className="shrink-0 mt-1"
              >
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={1.5} />
              </motion.div>
              <div className="text-right">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    featuresInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-xl md:text-3xl font-regular mb-4"
                >
                  Bible Verse
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                  className="text-base md:text-lg leading-relaxed max-w-md ml-auto"
                >
                  Stay encouraged as you work with Scripture displayed beside
                  the timer. A new verse appears every 5 minutes to refresh your
                  motivation and refocus your mind on God's truth. If you ever
                  want additional encouragement, you can generate a new verse at
                  any time with a single click.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Decorative divider before Coming Soon */}
        <motion.div
          ref={comingSoonDividerRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            comingSoonDividerInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center my-16 md:my-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={comingSoonDividerInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-px bg-white/10 grow max-w-xs"
          />
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={
              comingSoonDividerInView
                ? { opacity: 1, rotate: 0 }
                : { opacity: 0, rotate: -180 }
            }
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <CrossIcon
              className="w-5 h-5 mx-4 text-white/30"
              strokeWidth={2.5}
            />
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={comingSoonDividerInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-px bg-white/10 grow max-w-xs"
          />
        </motion.div>

        {/* Coming Soon Section */}
        <section ref={comingSoonRef} className="mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              comingSoonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular text-center mb-16"
          >
            Coming Soon
          </motion.h2>

          <div className="space-y-20">
            {/* Dashboard Subsection */}
            <motion.div
              ref={dashboardRef}
              initial={{ opacity: 0, x: -40 }}
              animate={
                dashboardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
              }
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-center gap-8 flex-col md:flex-row"
              style={{ minHeight: "200px" }}
            >
              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    dashboardInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-xl md:text-3xl font-regular mb-4"
                >
                  Dashboard
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={dashboardInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  className="text-lg md:text-lg leading-relaxed max-w-md"
                >
                  Track your focus sessions and see your progress over time.
                  View meaningful statistics like total focus time, weekly
                  summaries, and your consistency streaks — all designed to
                  encourage discipline, growth, and clarity in your daily work.
                </motion.p>
              </div>
              <motion.div
                ref={dashboardImageRef}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={
                  dashboardImageInView
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 0, x: 40, scale: 0.95 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex-1 flex justify-center md:justify-end"
              >
                <Image
                  src="/dashboard.png"
                  alt="Dashboard"
                  width={500}
                  height={400}
                  className="max-w-full h-auto"
                />
              </motion.div>
            </motion.div>

            {/* Custom Verses Subsection */}
            <motion.div
              ref={customVersesRef}
              initial={{ opacity: 0, x: 40 }}
              animate={
                customVersesInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 40 }
              }
              transition={{
                duration: 0.7,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-center gap-8 flex-col md:flex-row-reverse"
              style={{ minHeight: "200px" }}
            >
              <div className="flex-1 text-right">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    customVersesInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-xl md:text-3xl font-regular mb-4"
                >
                  Custom Verses
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={customVersesInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                  className="text-lg md:text-lg leading-relaxed max-w-md ml-auto"
                >
                  Create your own personal Scripture collection. Add your
                  favorite Bible verses to the rotation and keep the words that
                  speak to your heart close while you study, work, or reflect.
                  Your verses will appear throughout your focus sessions, giving
                  you encouragement that's personal and meaningful.
                </motion.p>
              </div>
              <motion.div
                ref={customVersesImageRef}
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={
                  customVersesImageInView
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 0, x: -40, scale: 0.95 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex-1 flex justify-center md:justify-start"
              >
                <Image
                  src="/addverse.png"
                  alt="Add Verse"
                  width={500}
                  height={400}
                  className="max-w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Coming Soon Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              comingSoonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center text-lg md:text-xl mt-16 mb-12 text-slate-300"
          >
            These features are on the way.
            <br />
            For now, enjoy the simple, peaceful focus that JEREMIAH33:3
            provides.
          </motion.p>

          {/* Waitlist Section */}
          {/* <motion.div
            ref={waitlistRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              waitlistInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-regular mb-6">
              Join the Waitlist
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={waitlistInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
              className="max-w-2xl mx-auto"
            >
              <div
                data-fillout-id="qFLfuMBaeEus"
                data-fillout-embed-type="popup"
                data-fillout-button-text="Join the Waitlist"
                data-fillout-dynamic-resize
                data-fillout-button-color="#0A0F1E"
                data-fillout-inherit-parameters
                data-fillout-popup-size="medium"
                className="fillout-embed"
              ></div>
            </motion.div>
          </motion.div> */}

          {/* Stay Updated Section */}
          <motion.div
            ref={socialRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              socialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.7,
              delay: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center"
          >
            <p className="text-lg mb-4">Stay updated:</p>
            <div className="flex items-center justify-center gap-6">
              <motion.a
                href="https://tiktok.com/@jeremiah333.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com/jeremiah333.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          ref={footerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center pt-16 -mb-10 border-t border-slate-800/50"
        >
          {/* Contact Section */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                footerInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Mail className="w-5 h-5 text-white/60" strokeWidth={1.5} />
              <p className="text-sm md:text-base">CONTACT</p>
            </motion.div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              href="mailto:jeremiah333app@gmail.com"
              className="text-slate-300 hover:text-slate-100 transition-colors hover:underline underline-offset-2"
            >
              jeremiah333app@gmail.com
            </motion.a>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-sm text-slate-500"
          >
            © 2025 JEREMIAH33:3
          </motion.p>
        </motion.footer>
      </div>
    </div>
  );
}
