"use client";

/**
 * FloatingOrb.tsx
 * ─────────────────
 * A single glassmorphic orb that:
 *  - floats autonomously with an infinite easeInOut loop
 *  - slightly repels away from the mouse cursor via externally supplied
 *    `mouseX` / `mouseY` motion values (fed by the parent HeroSection)
 *
 * Props:
 *  @param size        – Tailwind size classes, e.g. "w-24 h-24"
 *  @param color       – Tailwind background / gradient classes
 *  @param initialX    – CSS string for left position, e.g. "15%"
 *  @param initialY    – CSS string for top position, e.g. "20%"
 *  @param floatRange  – pixels the orb drifts vertically (default 18)
 *  @param duration    – seconds for one full float cycle (default 4)
 *  @param delay       – stagger offset in seconds (default 0)
 *  @param blur        – Tailwind blur class (default "blur-xl")
 *  @param orbCenterX  – ref callback to expose the orb's viewport X centre
 *  @param orbCenterY  – ref callback to expose the orb's viewport Y centre
 *  @param mouseX      – Framer MotionValue<number>: cursor X in viewport px
 *  @param mouseY      – Framer MotionValue<number>: cursor Y in viewport px
 */

import { useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface FloatingOrbProps {
  size?: string;
  color?: string;
  initialX?: string;
  initialY?: string;
  floatRange?: number;
  duration?: number;
  delay?: number;
  blur?: string;
  /** Live cursor position in viewport coords (supplied by parent) */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export default function FloatingOrb({
  size = "w-24 h-24",
  color = "bg-sky-400/40",
  initialX = "10%",
  initialY = "10%",
  floatRange = 18,
  duration = 4,
  delay = 0,
  blur = "blur-xl",
  mouseX,
  mouseY,
}: FloatingOrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // ─── Mouse-proximity repulsion ──────────────────────────────────────────
  const springConfig = { stiffness: 55, damping: 14, mass: 0.7 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const repelX = useTransform(smoothX, (cursorX: number) => {
    if (!ref.current || shouldReduceMotion) return 0;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const dx = cursorX - cx;
    const dist = Math.abs(dx);
    if (dist > 220 || cursorX === 0) return 0;
    return Math.max(-40, Math.min(40, -(dx / dist) * (40 * (1 - dist / 220))));
  });

  const repelY = useTransform(smoothY, (cursorY: number) => {
    if (!ref.current || shouldReduceMotion) return 0;
    const rect = ref.current.getBoundingClientRect();
    const cy = rect.top + rect.height / 2;
    const dy = cursorY - cy;
    const dist = Math.abs(dy);
    if (dist > 220 || cursorY === 0) return 0;
    return Math.max(-40, Math.min(40, -(dy / dist) * (40 * (1 - dist / 220))));
  });

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{ left: initialX, top: initialY }}
    >
      {/* ── Autonomous float + mouse repulsion ─────────────────────────── */}
      <motion.div
        className={`${size} ${color} ${blur} rounded-full`}
        style={shouldReduceMotion ? undefined : { x: repelX, y: repelY }}
        animate={shouldReduceMotion ? { y: 0 } : { y: [0, -floatRange, 0, floatRange, 0] }}
        transition={
          shouldReduceMotion
            ? { duration: 0.2 }
            : {
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />
    </div>
  );
}
