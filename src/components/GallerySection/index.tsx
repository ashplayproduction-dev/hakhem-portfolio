"use client";

/**
 * GallerySection/index.tsx
 * ─────────────────────────
 * Phase 3 — Photography & Creative Authority Gallery.
 *
 * Renders TWO layouts based on screen size:
 *
 *   📱 Mobile (< md): A clean 2-column responsive grid.
 *      GalleryItems render without scatter rotation, stacked naturally.
 *      The float animations still run so the grid feels alive.
 *
 *   🖥  Desktop (≥ md): An organically scattered layout inside a
 *      fixed-height `position:relative` container. Each item is placed
 *      with `position:absolute` using percentage-based top/left/width/height
 *      from the item's `desktopPos` config in data.ts. Scatter rotation
 *      is applied. Draggable items have `dragConstraints={containerRef}`
 *      so they can be tossed around but stay within the gallery zone.
 *
 * Background:
 *   3 slow ambient orbs mirror the HeroSection's antigravity feel,
 *   keeping visual language consistent across sections.
 *
 * No layout shifts:
 *   Float animation uses `y` transforms (doesn't affect layout flow).
 *   Hover scale uses `transform` (also out-of-flow).
 *   The desktop scatter container has an explicit pixel height so the
 *   document layout is stable before JS hydrates.
 */

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GALLERY_ITEMS } from "./data";
import GalleryItem from "./GalleryItem";
import AuthorityHeader from "./AuthorityHeader";

export default function GallerySection() {
  /**
   * containerRef is passed to every GalleryItem as `dragConstraintsRef`.
   * Framer Motion uses it to clamp draggable items within the gallery bounds.
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden bg-neutral-950 px-4 pb-24 pt-20 sm:px-8 lg:px-16 scroll-mt-16 border-t border-neutral-900"
      aria-labelledby="gallery-heading"
    >
      {/* ── Creative Authority header + badges ──────────────────────────── */}
      <AuthorityHeader />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── MOBILE LAYOUT (shown on < md) ─────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 md:hidden">
        <div className="grid grid-cols-2 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="aspect-[3/4]"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            >
              <GalleryItem item={item} dragConstraintsRef={containerRef} showRotate={false} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── DESKTOP SCATTER LAYOUT (shown on ≥ md) ────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto hidden w-full max-w-5xl md:block">
        {/* Reset Positions Control */}
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-amber-400/90">
            Interactive Field Gallery · Drag photos to reorder
          </p>
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 font-mono text-xs text-neutral-400 transition-all hover:border-neutral-700 hover:text-neutral-100 active:scale-[0.97] cursor-pointer"
            aria-label="Reset gallery photo positions"
          >
            <span className="text-amber-400 transition-transform duration-300 group-hover:rotate-180">↻</span>
            <span>Reset Canvas</span>
          </button>
        </div>

        <motion.div
          ref={containerRef}
          className="relative w-full"
          style={{ height: "820px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={`${item.id}-${resetKey}`}
              className="absolute"
              style={{
                top: item.desktopPos.top,
                left: item.desktopPos.left,
                width: item.desktopPos.width,
                height: item.desktopPos.height,
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 40 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring" as const, stiffness: 260, damping: 22 },
                },
              }}
            >
              <GalleryItem
                item={item}
                dragConstraintsRef={containerRef}
                showRotate={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom tagline ──────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 mt-10 text-center font-mono text-xs text-neutral-500"
      >
        Authentic press &amp; field photography from MSU-Main Campus and Lanao del Sur · Drag cards on desktop to explore
      </motion.p>
    </section>
  );
}
