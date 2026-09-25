"use client";

/**
 * ServicesSection/index.tsx
 * ──────────────────────────
 * Featured Video Portfolio & Selected Works for Hakhem.
 * Displays 5 Short-Form Reels and 3 Long-Form Videos with scroll autoplay
 * and full-screen audio playback.
 */

import { motion } from "framer-motion";
import ReelsShowcase from "./ReelsShowcase";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-neutral-950 px-4 py-24 sm:px-8 lg:px-16 scroll-mt-16 border-t border-neutral-900"
      aria-labelledby="services-heading"
    >
      {/* ── Section header ────────────────────────────────────────────────── */}
      <div className="relative z-10 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium tracking-wide text-amber-300"
        >
          <span>PRODUCTION &amp; DIRECTION</span>
        </motion.div>

        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl"
        >
          Selected Works &amp; Video Portfolio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-4 max-w-xl text-base text-neutral-400"
        >
          High-retention short-form reels and narrative-driven long-form edits engineered for creators, brands, and founders. Click any video to watch in full view with audio.
        </motion.p>
      </div>

      {/* ── Featured Video Showcase (5 Short-form + 3 Long-form) ───── */}
      <ReelsShowcase />
    </section>
  );
}
