"use client";

/**
 * HeroSection/index.tsx
 * ──────────────────────
 * Full-bleed cinematic hero — portrait left, editorial content right.
 * Photo bleeds into the obsidian background via a CSS mask gradient.
 * Mouse-tracking parallax keeps the portrait alive.
 */

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import HeroContent from "./HeroContent";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);

  // ── Scroll-driven fade as section leaves viewport ─────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sectionY       = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // ── Mouse-tracking spring parallax on the portrait ────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const photoX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 });
  const photoY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    rawX.set(((e.clientX - cx) / rect.width)  *  10);
    rawY.set(((e.clientY - cy) / rect.height) *   7);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Hero – Abdul Hakhem Serad portfolio"
    >
      {/* ── Base background ───────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* ── Cinematic top-light warmth (amber halo) ───────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_60%_45%_at_30%_-5%,rgba(245,158,11,0.07),transparent)]"
      />

      {/* ── Portrait: LEFT HALF, blends right into obsidian ──────── */}
      <motion.div
        ref={photoRef}
        style={{ x: photoX, y: photoY }}
        className="absolute inset-y-0 left-0 w-[52%] sm:w-[45%] lg:w-[42%] overflow-hidden"
        aria-hidden
      >
        {/* Actual photo — full height, anchored to top */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/hakhem.jpeg')" }}
        />

        {/* Right-edge blend — portrait fades into obsidian background */}
        <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-r from-transparent to-[#09090b]" />

        {/* Bottom-edge blend — photo fades downward */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#09090b] to-transparent" />

        {/* Top-edge blend */}
        <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-[#09090b] to-transparent" />

        {/* Left-edge blend */}
        <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#09090b] to-transparent" />

        {/* Subtle cinematic desaturation overlay (keeps your amber palette dominant) */}
        <div className="absolute inset-0 bg-[#09090b]/20 mix-blend-multiply" />
      </motion.div>

      {/* ── Subtle background grid ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      {/* On mobile: centered with photo as blurred bg backdrop      */}
      {/* On sm+: pushed right, photo bleeds from the left           */}
      <div className="relative z-10 flex min-h-screen items-center justify-center sm:justify-end px-6 sm:px-10 lg:px-16">
        {/* Mobile center-fade scrim so text is always readable */}
        <div className="absolute inset-0 sm:hidden bg-[#09090b]/70" aria-hidden />
        <div className="relative w-full sm:max-w-sm lg:max-w-md xl:max-w-lg sm:ml-auto py-24">
          <HeroContent />
        </div>
      </div>

      {/* ── Bottom section fade to next section ──────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090b] to-transparent"
      />

      {/* ── Scroll cue ────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="text-neutral-600">
            <path d="M9 1v20M1 13l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-700">scroll</span>
      </motion.div>
    </motion.section>
  );
}
