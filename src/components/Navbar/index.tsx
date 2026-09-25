"use client";

/**
 * Navbar/index.tsx
 * ────────────────
 * Precision-machined, floating navigation pill.
 * Clean obsidian/graphite aesthetic with tactile feedback.
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Works" },
  { id: "experience", label: "Track Record" },
  { id: "gallery", label: "Archives" },
  { id: "skills", label: "Competencies" },
  { id: "contact", label: "Connect" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav className="pointer-events-auto relative flex w-full max-w-5xl items-center justify-between overflow-hidden rounded-full border border-neutral-800/80 bg-neutral-950/85 px-3 py-1.5 sm:px-5 sm:py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        
        {/* ── Brand Logo ────────────────────────────────────────── */}
        <motion.div
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("home")}
          className="group cursor-pointer select-none font-bold tracking-tight shrink-0 hidden md:flex items-center gap-2"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700/80 text-[11px] font-bold text-white shadow-sm">
            H
          </span>
          <span className="text-sm font-semibold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            Hakhem
          </span>
        </motion.div>

        {/* ── Nav Links ─────────────────────────────────────────── */}
        <div className="flex flex-1 items-center justify-between sm:justify-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar py-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={isActive ? "location" : undefined}
                aria-label={`Navigate to ${item.label} section`}
                className={`group relative flex items-center rounded-full px-3 py-1.5 min-h-[38px] text-xs font-medium tracking-wide transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.97] ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-neutral-800/90 border border-neutral-700/60 shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Quick CTA button ──────────────────────────────────── */}
        <div className="hidden lg:block shrink-0 pl-2">
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 px-4 py-1.5 text-xs font-bold tracking-wide transition-all active:scale-[0.97] cursor-pointer shadow-sm"
          >
            Get in Touch
          </button>
        </div>

        {/* ── Scroll progress bar along bottom ──────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-800/40 overflow-hidden">
          <motion.div
            className="h-full bg-amber-400 origin-left"
            style={{ scaleX }}
          />
        </div>
      </nav>
    </div>
  );
}
