"use client";

/**
 * HeroCard.tsx
 * ─────────────
 * Editorial cover masthead for Abdul Hakhem R. Serad.
 * Cinematic staggered text entrance, tactile tilt, amber warmth.
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { FilmIcon, TrophyIcon, ArrowRightIcon } from "@/components/icons";

// ── Staggered entrance variants ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
} as const;

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;


export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Gentle 3-D perspective tilt
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const tiltSpring = { stiffness: 120, damping: 22, mass: 0.6 };
  const rotateX = useSpring(rawRotateX, tiltSpring);
  const rotateY = useSpring(rawRotateY, tiltSpring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawRotateY.set(((e.clientX - cx) / (rect.width / 2)) * 4);
    rawRotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 4);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl px-4"
    >
      <motion.div
        ref={cardRef}
        style={shouldReduceMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/60 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl shadow-black/70"
      >
        {/* Subtle light-catching top border */}
        <div aria-hidden={true} className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        {/* Subtle amber glow at bottom edge */}
        <div aria-hidden={true} className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        {/* ── Portrait Avatar ────────────────────────────────────────────── */}
        <motion.div variants={fadeInVariants} className="relative mx-auto mb-6 flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center">
          {/* Outer ring pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-400/20"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-full border border-neutral-700/80 bg-neutral-950 p-1 shadow-xl">
            <Image
              src="/assets/hakhem.jpeg"
              alt="Abdul Hakhem R. Serad portrait"
              width={128}
              height={128}
              priority
              className="h-full w-full rounded-full object-cover object-top filter contrast-[1.03]"
            />
          </div>

          {/* Active status indicator */}
          <span className="absolute bottom-1 right-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-neutral-950 bg-emerald-500 shadow-sm" title="Available for projects">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </motion.div>

        {/* ── Eyebrow Tag ────────────────────────────────────────────────── */}
        <motion.div variants={fadeUpVariants} className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-3.5 py-1 text-[11px] font-medium tracking-wide text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>Mindanao State University · Main Campus</span>
        </motion.div>

        {/* ── Main Name ──────────────────────────────────────────────────── */}
        <motion.h1 variants={fadeUpVariants} className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Abdul Hakhem R. Serad
        </motion.h1>

        {/* ── Editorial Headline ────────────────────────────────────────── */}
        <motion.p variants={fadeUpVariants} className="mt-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-400/90 font-mono">
          Strategic Video Editor &amp; Post-Production Specialist
        </motion.p>

        {/* ── Bio Summary ────────────────────────────────────────────────── */}
        <motion.p variants={fadeUpVariants} className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300 max-w-xl mx-auto font-normal">
          Helping founders, creators, and brands scale their digital presence through high-retention short-form content, authentic UGC, and narrative-driven Video Sales Letters.
        </motion.p>


        {/* ── Tactile Action CTAs ────────────────────────────────────────── */}
        <motion.div variants={fadeUpVariants} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 px-6 py-3 text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 active:scale-[0.97] cursor-pointer shadow-md shadow-amber-900/30"
          >
            <FilmIcon size={16} />
            <span>Explore Works</span>
            <ArrowRightIcon size={14} />
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800/80 px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-200 transition-all duration-150 active:scale-[0.97] cursor-pointer"
          >
            <TrophyIcon size={16} className="text-amber-400" />
            <span>Track Record &amp; Honors</span>
          </a>
        </motion.div>

        {/* ── Masthead Metrics ──────────────────────────────────────────── */}
        <motion.div variants={fadeInVariants} className="mt-10 pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-white">4+</p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">Film &amp; Scoring Laurels</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-amber-400">$1,023</p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">Peace Storytelling Grant</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-white">500+</p>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">Esports Arena Players</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
