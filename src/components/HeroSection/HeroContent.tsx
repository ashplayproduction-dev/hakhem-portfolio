"use client";

/**
 * HeroSection/HeroContent.tsx
 * ────────────────────────────
 * Editorial text panel — right side of the split hero.
 * Staggered cinematic entrance, amber accent, tactile CTAs.
 */

import { motion } from "framer-motion";
import { TrophyIcon, ArrowRightIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "../ContactSection/data";


// ── Stagger container ──────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
} as const;

// ── Per-element entrance ───────────────────────────────────────────────────
const up = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
} as const;


// ── Quick-stats ───────────────────────────────────────────────────────────
const STATS = [
  { value: "4+",     label: "Film Laurels"      },
  { value: "$1,023", label: "Grant Received"    },
  { value: "500+",   label: "Players Directed"  },
] as const;

export default function HeroContent() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* ── Intro line ───────────────────────────────────────────── */}
      <motion.p
        variants={up}
        className="text-sm font-medium text-neutral-500 tracking-wide"
      >
        Hi, I am
      </motion.p>

      {/* ── Name ─────────────────────────────────────────────────── */}
      <motion.div variants={up} className="-mt-3">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
          Abdul Hakhem
          <br />
          <span className="text-white/80">R. Serad</span>
        </h1>
      </motion.div>

      {/* ── Title / Primary Service ──────────────────────────────── */}
      <motion.div variants={up} className="-mt-1">
        <h2 className="text-xl sm:text-2xl font-bold text-amber-400 tracking-tight leading-snug">
          Strategic Video Editor &amp; Post-Production Specialist
        </h2>
      </motion.div>

      {/* ── Subtext ──────────────────────────────────────────────── */}
      <motion.p
        variants={up}
        className="text-sm sm:text-[15px] leading-relaxed text-neutral-300 max-w-md"
      >
        Helping founders, creators, and brands scale their digital presence through high-retention short-form content, authentic UGC, and narrative-driven Video Sales Letters.
      </motion.p>

      {/* ── CTA buttons & Social Quick Icons ─────────────────────── */}
      <motion.div variants={up} className="flex flex-wrap items-center gap-3">
        <a
          href="#services"
          className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-150 active:scale-[0.97] shadow-md shadow-amber-900/30 select-none cursor-pointer"
        >
          <span>View Works</span>
          <ArrowRightIcon size={14} />
        </a>
        <a
          href="#experience"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-950/60 hover:bg-neutral-800/70 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-all duration-150 active:scale-[0.97] select-none cursor-pointer"
        >
          <TrophyIcon size={14} className="text-amber-400" />
          <span>Track Record</span>
        </a>


        {/* Quick Socials (Direct links) */}
        <div className="flex items-center gap-2 sm:ml-1">
          {SOCIAL_LINKS.map((s) => {
            const Icon =
              s.id === "facebook"
                ? FacebookIcon
                : s.id === "instagram"
                ? InstagramIcon
                : LinkedInIcon;
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/70 text-neutral-400 transition-all hover:border-amber-400/50 hover:text-amber-400 hover:bg-neutral-900 active:scale-[0.95]"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </motion.div>


      {/* ── Divider ──────────────────────────────────────────────── */}
      <motion.div variants={up} className="h-px w-full bg-neutral-800/80" />

      {/* ── Stats ────────────────────────────────────────────────── */}
      <motion.div variants={up} className="flex items-center gap-6 -mt-1">
        {STATS.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-5">
            <div>
              <p className="text-xl font-extrabold font-mono text-amber-400 leading-none">{value}</p>
              <p className="mt-1 text-[11px] text-neutral-500 font-medium tracking-wide">{label}</p>
            </div>
            {i < STATS.length - 1 && (
              <div className="h-8 w-px bg-neutral-800" />
            )}
          </div>
        ))}
      </motion.div>

      {/* ── University badge ─────────────────────────────────────── */}
      <motion.div variants={up} className="-mt-1">
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/80 bg-neutral-900/60 px-3 py-1.5 text-[11px] font-medium text-neutral-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          BS Computer Science · Mindanao State University – Main Campus
        </span>
      </motion.div>
    </motion.div>
  );
}
