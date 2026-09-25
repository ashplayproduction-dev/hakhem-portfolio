"use client";

/**
 * CTAButton.tsx
 * ──────────────
 * A pill-shaped "Explore My Universe" button with:
 *  - Framer Motion spring physics on hover (squish + expand)
 *  - Gradient fill: sky-blue → purple
 *  - Soft glow ring on hover
 *  - Tap / click press-down feedback
 */

import { motion } from "framer-motion";

export default function CTAButton() {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      whileTap={{ scale: 0.97 }}
      className={[
        "rounded-full px-6 py-2.5",
        "bg-amber-400 hover:bg-amber-300 active:scale-[0.97]",
        "text-amber-950 font-semibold text-sm tracking-wide",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
        "cursor-pointer",
        "whitespace-nowrap",
      ].join(" ")}
    >
      View Selected Works
    </motion.button>
  );
}
