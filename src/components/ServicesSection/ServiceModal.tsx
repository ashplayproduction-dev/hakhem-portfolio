"use client";

/**
 * ServiceModal.tsx
 * ─────────────────
 * "Theater Mode" expanded overlay. Mounts when a card is clicked and
 * morphs seamlessly into — and back out of — the grid card using Framer
 * Motion's shared-element `layoutId` transition.
 *
 * Layers (outer → inner):
 *  1. Fixed full-screen wrapper  — positions the modal in the viewport
 *  2. Dark frosted-glass backdrop — fades in/out independently, closes on click
 *  3. Morphing glassmorphic card  — THIS gets the layoutId; it travels from the
 *                                   grid card's position to centre-screen
 *  4. Inner content               — fades in AFTER the card has expanded so
 *                                   content doesn't flash during the morph
 *
 * Why the content is in a separate motion.div:
 *   The layoutId card morphs shape; during that morph the expanded content
 *   (video canvas, long description) would look jarring if visible immediately.
 *   Delaying its opacity entrance gives the morph time to complete first.
 */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceItem } from "./data";
import { ScissorsIcon, VideoIcon, FilmIcon } from "@/components/icons";

interface ServiceModalProps {
  /** Currently selected service, or null if modal is closed */
  service: ServiceItem | null;
  onClose: () => void;
}

/** Spring matching the card's layoutId transition */
const LAYOUT_SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

/** Faster spring for the Close button bounce */
const BTN_SPRING = { type: "spring", stiffness: 500, damping: 22 } as const;

function getServiceIcon(id: string) {
  switch (id) {
    case "short-form":
      return <ScissorsIcon size={24} className="text-amber-400" />;
    case "ugc":
      return <VideoIcon size={24} className="text-amber-400" />;
    case "vsl":
    default:
      return <FilmIcon size={24} className="text-amber-400" />;
  }
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  // ── Body scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  // ── Keyboard: close on Escape ─────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      {service && (
        <div
          key={service.id}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          {/* Frosted dark backdrop */}
          <motion.div
            key="backdrop"
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden={true}
          />

          {/* Morphing elevated graphite card */}
          <motion.div
            layoutId={service.id}
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            transition={LAYOUT_SPRING}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80"
          >
            {/* Subtle top amber hairline */}
            <div
              className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
              aria-hidden={true}
            />

            {/* Inner content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="relative p-6 sm:p-8"
            >
              {/* Header row */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950/80 text-amber-400">
                      {getServiceIcon(service.id)}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold leading-snug text-neutral-100 sm:text-2xl">
                        {service.title}
                      </h2>
                      <p className="font-mono text-xs uppercase tracking-widest text-amber-400/90">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Tool badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.tools.map((tool) => (
                      <span
                        key={tool.name}
                        className={`rounded-md px-2.5 py-0.5 font-mono text-xs ${tool.style}`}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tactile close button */}
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.96 }}
                  className="flex-shrink-0 rounded-full border border-neutral-750 bg-neutral-800/80 px-3.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Close modal"
                >
                  ✕ Close
                </motion.button>
              </div>

              {/* Video slate / reel frame */}
              <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                <div
                  aria-hidden={true}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"
                />

                {/* Subtle timecode / slate header */}
                <div className="absolute top-3 inset-x-4 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>REC · 23.976 FPS</span>
                  <span>TC 01:14:22:08</span>
                </div>

                {/* Play button + label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-neutral-900/90 text-amber-400 shadow-lg">
                    <span className="ml-0.5 text-lg">▶</span>
                  </div>
                  <p className="font-mono text-[11px] tracking-wider uppercase text-neutral-400">
                    Production Reel · Archive
                  </p>
                </div>

                {/* Corner watermark */}
                <p className="absolute bottom-3 right-4 font-mono text-[10px] text-neutral-600">
                  Hakhem R. Serad · Selected Reel
                </p>
              </div>

              {/* Expanded description */}
              <p className="mb-6 text-sm leading-relaxed text-neutral-300 sm:text-base">
                {service.expandedDescription}
              </p>

              {/* Keyword tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-neutral-800 bg-neutral-950/70 px-2.5 py-1 font-mono text-xs text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
