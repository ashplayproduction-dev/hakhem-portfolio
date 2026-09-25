"use client";

/**
 * Footer/index.tsx
 * ─────────────────
 * Sleek bottom footer with copyright, back-to-top button,
 * and quick links.
 */

import { motion } from "framer-motion";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "../ContactSection/data";


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-neutral-900 bg-neutral-950 py-12 px-4 sm:px-8 text-center text-neutral-500 text-xs">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & copyright */}
        <div className="flex flex-col sm:items-start items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 font-mono text-[11px] text-amber-400 font-bold">
              H
            </span>
            <span className="font-semibold text-neutral-200 text-sm">
              Abdul Hakhem R. Serad
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 font-mono mt-1">
            © {new Date().getFullYear()} Abdul Hakhem R. Serad · MSU-Main Marawi. Editorial &amp; Documentary Archive.
          </p>
        </div>

        {/* Center: Quick navigation links & Social Icons */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
            <a href="#about" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">About</a>
            <a href="#journey" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">Journey</a>
            <a href="#services" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">Services</a>
            <a href="#experience" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">Experience</a>
            <a href="#gallery" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">Gallery</a>
            <a href="#skills" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">Skills</a>
            <a href="#contact" className="hover:text-neutral-100 transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-md">Connect</a>
          </div>

          <div className="flex items-center gap-3">
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-400 transition-colors hover:border-amber-400/40 hover:text-amber-400 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Back to top button */}
        <motion.button
          onClick={scrollToTop}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-300 hover:border-neutral-700 hover:text-white cursor-pointer transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <span>Back to Top</span>
          <span>↑</span>
        </motion.button>


      </div>
    </footer>
  );
}
