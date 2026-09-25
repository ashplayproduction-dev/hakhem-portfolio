"use client";

/**
 * SkillsSection/index.tsx
 * ────────────────────────
 * Interactive Creative & Tech Suite plus Verified Certifications,
 * inspired by https://myprofile-hanji.vercel.app/
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS, SKILL_CATEGORIES, CERTIFICATIONS } from "./data";
import {
  FilmIcon,
  NewspaperIcon,
  GamepadIcon,
  CodeIcon,
  ShieldCheckIcon,
  TrophyIcon,
  CameraIcon,
} from "@/components/icons";

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "film":
      return <FilmIcon size={16} />;
    case "journalism":
      return <NewspaperIcon size={16} />;
    case "esports":
      return <GamepadIcon size={16} />;
    case "tech":
    default:
      return <CodeIcon size={16} />;
  }
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("film");

  const filteredSkills = SKILLS.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-neutral-950 px-4 py-24 sm:px-8 lg:px-16 scroll-mt-16 border-t border-neutral-900">
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
            <span>CAPABILITIES &amp; HONORS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100"
          >
            Creative Suite &amp; Technical Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-neutral-400"
          >
            A versatile toolkit spanning cinema-grade video editors, visual design software, web development frameworks, and AI workflows.
          </motion.p>

          {/* ── Category Tabs ───────────────────────────────────── */}
          <div className="mt-8 flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 max-w-fit mx-auto">
            {SKILL_CATEGORIES.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.97] ${
                    isActive
                      ? "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                  }`}
                >
                  <span className={isActive ? "text-amber-400" : "text-neutral-400"}>
                    {getCategoryIcon(tab.id)}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Skills Grid ───────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center transition-colors hover:border-neutral-700 hover:bg-neutral-900/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 border border-neutral-800 mb-2.5 text-amber-400">
                  {getCategoryIcon(skill.category)}
                </div>
                <span className="text-xs sm:text-sm font-medium text-neutral-200 leading-tight">
                  {skill.name}
                </span>
                <span className="mt-2 rounded-md border border-neutral-800 bg-neutral-950/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                  {skill.level}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Official Honors & Laurels ─────────────────────────── */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium text-amber-300">
              <TrophyIcon size={13} />
              <span>Official Honors &amp; Fellowships</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mt-2.5">
              Recognized Storytelling &amp; Editorial Honors
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl mx-auto">
              Competitive peace fellowships, campus journalism awards, and regional film laurels earned through documentary production and press leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.16 }}
                className="flex flex-col items-center text-center p-5 rounded-xl border border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 hover:bg-neutral-900 transition-colors group"
              >
                {/* Honor Medallion */}
                <div className="h-14 w-14 mb-3.5 flex items-center justify-center rounded-xl border border-amber-400/20 bg-neutral-950 text-amber-400 shadow-inner">
                  {cert.badgeType === "fellowship" ? (
                    <TrophyIcon size={24} className="text-amber-400" />
                  ) : cert.badgeType === "journalism" ? (
                    <CameraIcon size={24} className="text-amber-400" />
                  ) : (
                    <FilmIcon size={24} className="text-amber-400" />
                  )}
                </div>

                <span className="mb-2 rounded-md border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300">
                  {cert.honorBadge}
                </span>

                <h4 className="text-xs sm:text-sm font-semibold text-neutral-100 leading-snug">
                  {cert.title}
                </h4>
                <p className="mt-1 text-[11px] text-neutral-400">
                  {cert.issuer}
                </p>
                <span className="mt-2 font-mono text-[10px] text-neutral-500">
                  {cert.date}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
