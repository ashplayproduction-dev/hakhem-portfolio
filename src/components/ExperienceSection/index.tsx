"use client";

/**
 * ExperienceSection/index.tsx
 * ────────────────────────────
 * Authentic track record of Abdul Hakhem R. Serad ("Hakhem"):
 * Esports Tournament Directing, Editorial Leadership at Mindanao Varsitarian,
 * Film Awards (Best Editing, Cinematography, Musical Scoring), and Peace Fellowships.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCES, type ExperienceItem } from "./data";

import {
  GamepadIcon,
  NewspaperIcon,
  FilmIcon,
  TrophyIcon,
  LayersIcon,
  ArrowRightIcon,
} from "@/components/icons";

const CATEGORIES = [
  { id: "all", label: "All Milestones", icon: LayersIcon },
  { id: "esports", label: "Esports & Directing", icon: GamepadIcon },
  { id: "publication", label: "Publications & Editorial", icon: NewspaperIcon },
  { id: "film", label: "Film & Editing Awards", icon: FilmIcon },
  { id: "fellowship", label: "Grants & Fellowships", icon: TrophyIcon },
] as const;

export default function ExperienceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalItem, setActiveModalItem] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalItem(null);
    };
    if (activeModalItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem]);

  const filtered = selectedCategory === "all"
    ? EXPERIENCES
    : EXPERIENCES.filter((item) => item.category === selectedCategory);

  return (
    <section id="experience" className="relative w-full overflow-hidden bg-neutral-950 px-4 py-24 sm:px-8 lg:px-16 scroll-mt-16 border-t border-neutral-900">
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium tracking-wide text-amber-300"
          >
            <span>DOCUMENTARY &amp; LEADERSHIP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100"
          >
            Track Record, Leadership &amp; Honors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-neutral-400 leading-relaxed"
          >
            A foundation built on award-winning narrative pacing, rigorous editorial standards, and high-stakes live production. These milestones inform the creative discipline I bring to my clients&apos; content.
          </motion.p>


          {/* ── Segmented Control Filter ───────────────────────────── */}
          <div className="mt-8 flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 max-w-fit mx-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.97] ${
                    isSelected
                      ? "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                  }`}
                >
                  <Icon size={13} className={isSelected ? "text-amber-400" : "text-neutral-400"} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Experience Cards Grid ─────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveModalItem(item);
                  }
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveModalItem(item)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 cursor-pointer transition-all hover:border-neutral-700 hover:bg-neutral-900/80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              >
                {/* Event Photo Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                  
                  {/* Date badge */}
                  <div className="absolute top-3 right-3 rounded-md border border-neutral-800 bg-neutral-950/80 px-2.5 py-0.5 font-mono text-[10px] text-neutral-400 backdrop-blur-md">
                    {item.date}
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex flex-1 flex-col p-6">
                  <span className={`inline-block w-fit rounded-md border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider mb-2.5 ${item.badgeColor}`}>
                    {item.role}
                  </span>

                  <h3 className="text-base font-semibold text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="mt-1 font-mono text-xs text-neutral-400">
                    {item.organization}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-neutral-300 flex-1 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                    {item.skills.map((s) => (
                      <span key={s} className="rounded-md bg-neutral-950/60 border border-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-medium text-amber-400/90 group-hover:text-amber-300">
                    <span>Inspect Milestone</span>
                    <ArrowRightIcon size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── Inspection Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeModalItem.title}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                <button
                  onClick={() => setActiveModalItem(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/80 text-neutral-300 border border-neutral-700 backdrop-blur-md hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className={`rounded-md border px-2.5 py-0.5 font-mono text-xs ${activeModalItem.badgeColor}`}>
                    {activeModalItem.role}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    {activeModalItem.date} · {activeModalItem.organization}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mt-2">
                  {activeModalItem.title}
                </h3>

                <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                  {activeModalItem.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-neutral-800">
                  {activeModalItem.skills.map((s) => (
                    <span key={s} className="rounded-md bg-neutral-950/70 border border-neutral-800 px-2.5 py-1 font-mono text-xs text-neutral-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
