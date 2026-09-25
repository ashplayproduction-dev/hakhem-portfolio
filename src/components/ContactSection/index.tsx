"use client";

/**
 * ContactSection/index.tsx
 * ─────────────────────────
 * Morphing Production Desk & Collaboration Hub.
 *
 * CLOSED state:
 *   Section header text + floating glowing button that smoothly morphs into
 *   the Editorial Production Desk modal when triggered.
 *
 * OPEN state:
 *   Button hides while sharing `layoutId="contact-morph"` with the modal,
 *   giving a fluid liquid expansion.
 */

import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ContactTerminal from "./ContactTerminal";
import { SendIcon } from "@/components/icons";

/** Bouncy spring matching spec: type spring, bounce 0.4 */
const MORPH_SPRING = { type: "spring" as const, bounce: 0.4 };

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Keyboard: Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // Body scroll lock while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Section ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative w-full overflow-hidden bg-neutral-950 px-4 pb-32 pt-24 text-center sm:px-8 scroll-mt-16 border-t border-neutral-900"
        aria-labelledby="contact-heading"
      >
        {/* ── Section header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium tracking-wide text-amber-300"
        >
          <span>PRODUCTION DESK &amp; COMMISSIONS</span>
        </motion.div>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl md:text-5xl"
        >
          Ready to Collaborate?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-4 max-w-lg text-base text-neutral-400 leading-relaxed"
        >
          Direct inquiries for documentary film editing, esports tournament directing, and photojournalism coverage.
        </motion.p>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* THE PILL BUTTON — source of the layoutId morph                 */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="mt-10 flex justify-center">
          <motion.div
            animate={{ y: isOpen || shouldReduceMotion ? 0 : [0, -6, 0, 4, 0] }}
            transition={
              isOpen || shouldReduceMotion
                ? { duration: 0.25 }
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <motion.button
              layoutId="contact-morph"
              onClick={open}
              style={{
                opacity: isOpen ? 0 : 1,
                pointerEvents: isOpen ? "none" : "auto",
              }}
              transition={{ layout: MORPH_SPRING }}
              className="inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold tracking-wide text-amber-950 transition-all hover:bg-amber-300 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-lg shadow-amber-950/20"
              aria-expanded={isOpen}
              aria-controls="contact-terminal"
            >
              <SendIcon size={16} />
              <span>Start a Collaboration</span>
            </motion.button>
          </motion.div>
        </div>

        {/* ── Availability indicator ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {/* Subtle green status dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-neutral-400">
            Currently accepting commissions &amp; projects
          </span>
        </motion.div>
      </section>

      {/* ── Production Desk modal ────────────────────────────────────────── */}
      <ContactTerminal isOpen={isOpen} onClose={close} />
    </>
  );
}
