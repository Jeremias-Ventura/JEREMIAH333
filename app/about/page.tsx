'use client'

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MeteorShowerBackground from "@/components/MeteorShowerBackground";
import { BookOpen, Clock, Mail, MoonStar, Sparkles, StarHalf, StarIcon } from "lucide-react";

// Animation variants for story-like reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const imageSlideIn = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Reusable animated section component
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
  const meaning1InView = useInView(meaning1Ref, { once: true, margin: "-50px" });
  const meaning2InView = useInView(meaning2Ref, { once: true, margin: "-50px" });
  const dividerInView = useInView(dividerRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });
  const footerInView = useInView(footerRef, { once: true });
  return (
    <div className="min-h-screen relative">
      {/* Subtle meteor shower background - always running */}
      <MeteorShowerBackground />
      {/* Navigation Link */}
      <div className="w-full relative z-50 px-6 md:px-10 pt-6 md:pt-8 mb-30">
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
        <div className="text-center mb-30 md:mb-60">
          <motion.h1 
            ref={titleRef}
            initial={{ opacity: 0, y: -20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular mb-8 "
          >
            JEREMIAH33:3
          </motion.h1>

          <div className="mx-auto relative">
            <motion.p 
              ref={verseRef}
              initial={{ opacity: 0, y: 20 }}
              animate={verseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base md:text-lg font-normal mb-6"
            >
              " Call to me and I will answer you and tell you great and
              unsearchable things you do not know. "
            </motion.p>

            {/* Calling image */}
            <motion.div 
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={imageInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            animate={meaningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular text-center mb-6"
          >
            Meaning Behind the Name
          </motion.h2>
          <div className="space-y-4 mt-15">
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={meaningInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl max-w-md "
            >
              Jeremiah 33:3 reminds us that when we seek God, He meets us with
              clarity, wisdom, and peace — even in the middle of our studying,
              work, or everyday challenges.
            </motion.p>
            <motion.div 
              ref={meaning1Ref}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={meaning1InView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex justify-end sm:-mt-20 -mt-10"
            >
              <Image
                src="/meaning1.png"
                alt="Meaning 1"
                width={300}
                height={350}
                className="max-w-full h-auto"
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              animate={meaningInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl max-w-md ml-auto text-right mt-15"
            >
              I built JEREMIAH33:3 because I wanted a tool that helped me stay
              grounded in my faith while I worked on school, projects, and life.
              Sometimes all we need is a verse in front of us to remind us why
              we're striving, Who is with us, and where our strength comes from.
            </motion.p>
            <motion.div 
              ref={meaning2Ref}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={meaning2InView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex justify-start sm:-mt-20 -mt-10"
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
          animate={dividerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
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
            animate={dividerInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <MoonStar className="w-5 h-5 mx-4 text-white/30" strokeWidth={2.5} />
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
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-regular text-center mb-16"
          >
            What This App Does
          </motion.h2>

          <div ref={featuresRef} className="space-y-20">
            {/* Focus Timer Subsection */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-start gap-6"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="shrink-0 mt-1"
              >
                <Clock className="w-10 h-10 text-white" strokeWidth={1.5} />
              </motion.div>
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
              animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-start gap-6 flex-row-reverse"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                className="shrink-0 mt-1"
              >
                <BookOpen
                  className="w-10 h-10 text-white"
                  strokeWidth={1.5}
                />
              </motion.div>
              <div className="text-right">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
              animate={footerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
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
