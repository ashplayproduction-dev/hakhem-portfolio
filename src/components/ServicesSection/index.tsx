"use client";

/**
 * ServicesSection/index.tsx
 * ──────────────────────────
 * Phase 2 — "Video Editing Services" section for Hakhem's portfolio.
 *
 * Orchestrates:
 *  - Section header with spring entrance
 *  - 3 ambient background orbs (antigravity feel, same pattern as HeroSection)
 *  - Responsive 3-column card grid (1 col → 2 col → 3 col)
 *  - `selectedId` state controlling which card's Theater modal is open
 *  - <ServiceModal> rendered at the root (fixed, so z-index works regardless
 *    of parent stacking contexts)
 *
 * State flow:
 *   selectedId: null        → all cards visible, no modal
 *   selectedId: "short-form" → that card is opacity-0, modal shows & morphs
 *   onClose()               → selectedId resets to null, card fades back in
 *
 * The actual shared-element morph lives in Framer Motion's layoutId system —
 * no manual position calculation needed here.
 */

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "./data";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";



/** Staggered card entrance — children animate in sequence */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 22 },
  },
};

export default function ServicesSection() {
  // ── State ─────────────────────────────────────────────────────────────────
  /** The `id` of the card whose Theater modal is open, or null if closed */
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedService = SERVICES.find((s) => s.id === selectedId) ?? null;

  // useCallback so the close handler reference is stable (avoids Escape listener re-attach)
  const handleClose = useCallback(() => setSelectedId(null), []);

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
          Selected Works &amp; Creative Direction
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-4 max-w-xl text-base text-neutral-400"
        >
          Specialized post-production for documentary cinema, esports broadcasts, and narrative shorts. Select any focus area for full workflows and deliverables.
        </motion.p>
      </div>

      {/* ── Card grid ─────────────────────────────────────────────────────── */}
      {/*
        `whileInView` on the container drives the staggered entrance.
        Each card uses `cardVariants` so they cascade in 120ms apart.
        The grid itself has no layoutId — only the individual cards do.
      */}
      <motion.div
        className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {SERVICES.map((service) => (
          <motion.div key={service.id} variants={cardVariants}>
            <ServiceCard
              service={service}
              isSelected={selectedId === service.id}
              onClick={() => setSelectedId(service.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Theater Mode modal (fixed, outside grid's stacking context) ────── */}
      {/*
        ServiceModal renders with position:fixed so it always covers the
        full viewport. AnimatePresence lives inside ServiceModal.
        The layoutId on the modal's inner card matches the clicked card's
        layoutId — Framer Motion handles the FLIP transition automatically.
      */}
      <ServiceModal service={selectedService} onClose={handleClose} />
    </section>
  );
}
