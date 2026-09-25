"use client";

/**
 * AuthorityHeader.tsx
 * ────────────────────
 * The "Creative Authority" glassmorphic intro block for Phase 3.
 *
 * Layout:
 *  - Section eyebrow label (small caps, sky-blue tint)
 *  - Large gradient headline
 *  - Short descriptive paragraph
 *  - 4 floating "Experience Badge" pills, each bobbing independently
 *
 * Each badge uses Framer Motion's `whileInView` + `initial` for a
 * spring entrance, followed by an infinite float loop.
 * The float is layered UNDER the hover interaction the same way GalleryItem
 * handles it — separate motion wrappers for separate concerns.
 */

import { motion, useReducedMotion } from "framer-motion";
import { AUTHORITY_BADGES } from "./data";
import {
  CameraIcon,
  NewspaperIcon,
  FilmIcon,
  GamepadIcon,
} from "@/components/icons";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

function getAuthorityIcon(id: string) {
  switch (id) {
    case "photojournalist-yr":
      return <CameraIcon size={16} className="text-amber-400" />;
    case "managing-editor":
      return <NewspaperIcon size={16} className="text-amber-400" />;
    case "film-awards":
      return <FilmIcon size={16} className="text-amber-400" />;
    case "esports-director":
    default:
      return <GamepadIcon size={16} className="text-amber-400" />;
  }
}

export default function AuthorityHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 mb-16 text-center">
      {/* ── Eyebrow ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium tracking-wide text-amber-300"
      >
        <span>FIELD JOURNALISM &amp; ARCHIVES</span>
      </motion.div>

      {/* ── Headline ────────────────────────────────────────────────────── */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl"
      >
        Visual Archives &amp; Field Photojournalism
      </motion.h2>

      {/* ── Description ─────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400"
      >
        Authentic documentary moments, campus journalism with the <strong className="text-neutral-200 font-medium">Mindanao Varsitarian</strong>, and live regional tournament production captured in true color.
      </motion.p>

      {/* ── Experience Badges ───────────────────────────────────────────── */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {AUTHORITY_BADGES.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...SPRING, delay: 0.08 + i * 0.08 }}
          >
            <motion.div
              animate={shouldReduceMotion ? { y: 0 } : { y: [0, -4, 0, 3, 0] }}
              transition={{
                duration: 4.2 + i * 0.4,
                delay: badge.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="flex cursor-default items-center gap-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 transition-colors hover:border-neutral-700 hover:bg-neutral-900 sm:px-5 sm:py-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-amber-400">
                  {getAuthorityIcon(badge.id)}
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-neutral-200 sm:text-sm">{badge.title}</p>
                  <p className="font-mono text-[10px] text-neutral-400 sm:text-xs">{badge.detail}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Subtle Hairline Divider ─────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto mt-12 h-px max-w-md bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
      />
    </div>
  );
}
