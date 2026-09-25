"use client";

/**
 * GalleryItem.tsx
 * ────────────────
 * A single floating (or draggable) photo placeholder with a duotone
 * sky-blue/purple overlay that dissolves on hover to reveal "true colors."
 *
 * ── Architecture ──────────────────────────────────────────────────────────
 *
 * Non-draggable items use THREE motion layers:
 *
 *   [A] Float wrapper  → handles infinite y keyframe animation ONLY
 *       [B] Hover shell → handles scale, drop-shadow via variants
 *           [C] Content + duotone overlay
 *
 * Draggable items collapse to TWO layers (no float, avoids y-axis conflict):
 *
 *   [B'] Drag + Hover shell → drag, whileHover, whileDrag variants
 *       [C] Content + duotone overlay
 *
 * ── Duotone effect ────────────────────────────────────────────────────────
 *
 * A sky-blue → purple gradient `div` sits absolutely over the photo
 * placeholder at opacity 0.82. Because the base "photos" are vibrant
 * gradient placeholders, the overlay blends to create a brand-coloured
 * tint. On hover, Framer Motion springs the overlay opacity to 0,
 * revealing the underlying colours — with a satisfying pop.
 *
 * Using variant PROPAGATION: the parent motion.div has `initial="rest"`
 * and `whileHover="hover"`. Child motion.divs define matching variant
 * keys so they automatically respond — no prop drilling required.
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { GalleryItemData } from "./data";
import {
  CameraIcon,
  NewspaperIcon,
  FilmIcon,
  GamepadIcon,
  TrophyIcon,
} from "@/components/icons";

interface GalleryItemProps {
  item: GalleryItemData;
  /** Pass the gallery container ref for drag boundary clamping */
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
  /** Whether to apply the scatter rotation (false on mobile grid) */
  showRotate?: boolean;
}

function getGalleryIcon(id: string) {
  switch (id) {
    case "photojournalist-award":
      return <CameraIcon size={16} className="text-amber-400" />;
    case "mindanao-varsitarian":
    case "pamokaw":
      return <NewspaperIcon size={16} className="text-amber-400" />;
    case "ranaw-cup":
      return <GamepadIcon size={16} className="text-amber-400" />;
    case "film-fest":
      return <FilmIcon size={16} className="text-amber-400" />;
    case "salimbago":
    default:
      return <TrophyIcon size={16} className="text-amber-400" />;
  }
}

// ─── Spring config (matches spec: stiffness 300, damping 30) ──────────────
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

// ─── Variant definitions ───────────────────────────────────────────────────

/** Hover shell: scale + drop-shadow. Propagates "hover" to children. */
const hoverShellVariants = {
  rest: {
    scale: 1,
    filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))",
  },
  hover: {
    scale: 1.04,
    filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.65))",
    transition: SPRING,
  },
  /** Draggable items get a more exaggerated lift when being dragged */
  drag: {
    scale: 1.08,
    filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.8))",
    transition: SPRING,
  },
};

export default function GalleryItem({
  item,
  dragConstraintsRef,
  showRotate = true,
}: GalleryItemProps) {
  const isDraggable = !!item.draggable;
  const shouldReduceMotion = useReducedMotion();

  // ── Rotation (scatter feel) ──────────────────────────────────────────────
  const rotateStyle = showRotate && !shouldReduceMotion ? { rotate: item.desktopPos.rotate } : {};

  // ── Shared inner content (True-color photography) ─────────────────────────
  const innerContent = (
    <>
      {/* Real photo or fallback gradient background */}
      <div className={`w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${item.bgFrom} ${item.bgTo} relative border border-neutral-800 shadow-xl group`}>
        {item.imageSrc ? (
          <>
            <Image
              src={item.imageSrc}
              alt={item.label}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Cinematic subtle contrast vignette & caption scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />
          </>
        ) : null}

        {item.label && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-amber-400">
                {getGalleryIcon(item.id)}
              </span>
              <p className="text-white font-semibold text-xs sm:text-sm leading-snug drop-shadow-md">{item.label}</p>
            </div>
            <p className="text-neutral-300 text-[10px] sm:text-xs drop-shadow font-mono">{item.subLabel.replace(" — Drag me!", "")}</p>
            {isDraggable && (
              <p className="text-amber-400/90 text-[9px] font-mono uppercase tracking-wider mt-1 flex items-center gap-1">
                <span>✦</span> Drag to explore
              </p>
            )}
          </div>
        )}
        {/* Drag hint for unlabeled draggable items */}
        {!item.label && isDraggable && (
          <div className="absolute bottom-3 left-3 z-10">
            <p className="text-amber-400/80 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1">
              <span>✦</span> Drag
            </p>
          </div>
        )}


        {/* Subtle inner border shimmer */}
        <div aria-hidden={true} className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />
      </div>
    </>
  );

  // ── DRAGGABLE layout (no float — avoids y-axis conflict) ─────────────────
  if (isDraggable) {
    return (
      <motion.div
        tabIndex={0}
        aria-label={item.label ? `${item.label}: ${item.subLabel}` : `Archive field photograph`}
        className="relative w-full h-full cursor-grab active:cursor-grabbing select-none rounded-2xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        style={rotateStyle}
        initial="rest"
        whileHover="hover"
        whileDrag="drag"
        variants={hoverShellVariants}
        drag
        dragConstraints={dragConstraintsRef}
        dragElastic={0.15}
        dragMomentum={false}
      >
        {innerContent}
      </motion.div>
    );
  }

  // ── FLOATING layout (no drag) ─────────────────────────────────────────────
  return (
    <motion.div
      className="w-full h-full"
      animate={shouldReduceMotion ? { y: 0 } : { y: [0, -(item.floatRange ?? 8), 0, (item.floatRange ?? 8) * 0.5, 0] }}
      transition={{
        duration: item.floatDuration ?? 5,
        delay: item.floatDelay ?? 0,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        tabIndex={0}
        aria-label={`${item.label}: ${item.subLabel}`}
        className="relative w-full h-full cursor-pointer select-none rounded-2xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        style={rotateStyle}
        initial="rest"
        whileHover="hover"
        variants={hoverShellVariants}
      >
        {innerContent}
      </motion.div>
    </motion.div>
  );
}
