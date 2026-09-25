"use client";

/**
 * JourneySection/index.tsx
 * ─────────────────────────
 * Visual chronicles of Abdul Hakhem R. Serad's creative milestones:
 * Filmmaking, Press Coverage with Mindanao Varsitarian, Tournament Directing
 * with Sarimanok Esports, and Project Pamokaw 2.0.
 *
 * (Note: Placeholder photos are kept so the user can easily swap in
 * their actual event photos later).
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";


interface JourneyPhoto {
  src: string;
  title: string;
  category: string;
  location: string;
}

const JOURNEY_PHOTOS: JourneyPhoto[] = [
  {
    src: "/assets/mindanao-varsitarian.jpeg",
    title: "Mindanao Varsitarian — Press Coverage & Videojournalism",
    category: "Campus Publication",
    location: "MSU-Main Campus, Marawi City",
  },
  {
    src: "/assets/salimbago.jpg",
    title: "Salimbago Fellowship — Storytelling for Peace & Social Change",
    category: "$1,023 Grant Project",
    location: "Peace Education Hub",
  },
  {
    src: "/assets/pamokaw-seminar.jpeg",
    title: "Project Pamokaw 2.0 — Ecojournalism Seminar-Workshop",
    category: "Co-Lead & Project Implementer",
    location: "MSU International Convention Center",
  },
  {
    src: "/assets/ranaw-cup.jpeg",
    title: "Ranaw Esports Cup — 67th Araw ng Lanao Tournament Directing",
    category: "Tournament Director",
    location: "Provincial Arena, Lanao del Sur",
  },
  {
    src: "/assets/ranao-film.jpeg",
    title: "2nd Ranao Youth Film Festival — Musical Scoring & Film Editing",
    category: "Award-Winning Filmmaking",
    location: "Regional Film Festival",
  },
  {
    src: "/assets/pagkatha-2025.jpeg",
    title: "Pagkatha 2025 — Literary and Arts Competition",
    category: "Competition Judge",
    location: "Literary & Arts Festival",
  },
  {
    src: "/assets/onthespot-video.jpg",
    title: "1st Runner-Up — On-the-spot Videography Contest",
    category: "Solo Videographer & Rapid Editor",
    location: "Senior Division Inter-School Competition",
  },
  {
    src: "/assets/m6-watchfest.jpeg",
    title: "M6 World Championship Watch Fest & Arena Logistics",
    category: "Community Events Head",
    location: "Sarimanok Gaming Hub",
  },
  {
    src: "/assets/pamokaw-pub.jpeg",
    title: "Pamokaw Publication — 1st Youth-Led Environmental Publication",
    category: "Head Videojournalist",
    location: "Lanao del Sur",
  },
];


export default function JourneySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven progress bar along the top of the slider
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Slight scale-in as section enters viewport
  const sliderScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.98]);
  // Progress bar tracks scroll through the section
  const progressWidth = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % JOURNEY_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + JOURNEY_PHOTOS.length) % JOURNEY_PHOTOS.length);
  }, []);

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion, nextSlide]);

  const current = JOURNEY_PHOTOS[currentIndex];

  return (
    <section ref={sectionRef} id="journey" className="relative w-full overflow-hidden bg-neutral-950 px-4 py-20 sm:px-8 lg:px-16 scroll-mt-16 border-t border-neutral-900">
      
      {/* ── Section Header ────────────────────────────────────── */}
      <div className="relative z-10 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium tracking-wide text-amber-300"
        >
          <span>CHRONICLES &amp; ARCHIVES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100"
        >
          Visual Chronicles &amp; Field Production
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-neutral-400"
        >
          From film scoring and photojournalism across Lanao del Sur to collegiate esports tournament direction.
        </motion.p>
      </div>

      {/* ── Cinematic Slider Container ────────────────────────── */}
      {/* Scroll-driven scale: section expands into view as user scrolls */}
      <motion.div
        style={shouldReduceMotion ? {} : { scale: sliderScale }}
        className="relative mx-auto max-w-6xl"
      >
        {/* Scroll progress bar */}
        <div className="relative mb-2 h-px w-full bg-neutral-800/60 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 bg-amber-400/60 rounded-full"
            style={{ width: progressWidth }}
          />
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Creative Milestones and Journey Chronicles"
          className="relative h-[380px] sm:h-[520px] md:h-[620px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentIndex + 1} of ${JOURNEY_PHOTOS.length}: ${current.title}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src={current.src}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            {/* Dark gradient scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* ── Caption Overlay ─────────────────────────────────── */}
        <div aria-live="polite" className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-20 max-w-md sm:max-w-xl">
          <motion.div
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono text-amber-300 backdrop-blur-md">
                {current.category}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs text-neutral-400">
                <MapPinIcon size={12} className="text-amber-400" />
                <span>{current.location}</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-md leading-snug">
              {current.title}
            </h3>
          </motion.div>
        </div>

        {/* ── Arrows (Desktop & Touch, min 44x44px target) ────── */}
        <button
          onClick={prevSlide}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-800 hover:text-white active:scale-[0.96] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <ArrowRightIcon size={18} className="rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-800 hover:text-white active:scale-[0.96] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <ArrowRightIcon size={18} />
        </button>

        {/* ── Pill Timeline Indicators (expanded 44px hit bounds) ── */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-10 z-20 flex items-center gap-1 sm:gap-1.5">
          {JOURNEY_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-current={currentIndex === i ? "true" : undefined}
              aria-label={`Go to slide ${i + 1}: ${JOURNEY_PHOTOS[i].title}`}
              className="group/dot relative flex items-center justify-center min-h-[44px] min-w-[32px] sm:min-w-[38px] p-2 focus-visible:outline-none cursor-pointer"
            >
              <span
                className={`block h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "w-8 sm:w-10 bg-amber-400"
                    : "w-1.5 sm:w-2 bg-neutral-600 group-hover/dot:bg-neutral-400"
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── Top corner indicator badge ──────────────────────── */}
        <div className="absolute top-5 right-5 z-20 rounded-md border border-neutral-800 bg-neutral-950/80 px-2.5 py-0.5 backdrop-blur-md font-mono text-[10px] text-neutral-400">
          {currentIndex + 1} / {JOURNEY_PHOTOS.length}
        </div>
        </div>{/* end carousel inner div */}
      </motion.div>{/* end scroll-scale wrapper */}
    </section>
  );
}
