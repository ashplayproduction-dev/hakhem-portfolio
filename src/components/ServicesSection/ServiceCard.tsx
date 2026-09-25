"use client";

/**
 * ServiceCard.tsx
 * ───────────────
 * Tactile, precision-machined card for video editing services.
 * Features subtle surface elevation, active press response, and layoutId morphing.
 */

import { motion } from "framer-motion";
import type { ServiceItem } from "./data";
import { ScissorsIcon, VideoIcon, FilmIcon, ArrowRightIcon } from "@/components/icons";

interface ServiceCardProps {
  service: ServiceItem;
  isSelected: boolean;
  onClick: () => void;
}

const LAYOUT_SPRING = { type: "spring", stiffness: 320, damping: 28 } as const;

function getServiceIcon(id: string) {
  switch (id) {
    case "short-form":
      return <ScissorsIcon size={22} className="text-amber-400" />;
    case "ugc":
      return <VideoIcon size={22} className="text-amber-400" />;
    case "vsl":
    default:
      return <FilmIcon size={22} className="text-amber-400" />;
  }
}

export default function ServiceCard({ service, isSelected, onClick }: ServiceCardProps) {
  return (
    <motion.div
      layoutId={service.id}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Explore service: ${service.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        opacity: isSelected ? 0 : 1,
        pointerEvents: isSelected ? "none" : "auto",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
        transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
      }}
      whileTap={{ scale: 0.98 }}
      transition={LAYOUT_SPRING}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 sm:p-7 backdrop-blur-xl cursor-pointer select-none transition-colors duration-150 hover:border-neutral-700/80 hover:bg-neutral-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <div>
        {/* Top row: icon + tool badges */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-700/80 bg-neutral-800 shadow-sm">
            {getServiceIcon(service.id)}
          </div>

          <div className="flex flex-wrap justify-end gap-1.5">
            {service.tools.map((tool) => (
              <span
                key={tool.name}
                className="rounded-full border border-neutral-700/60 bg-neutral-800/80 px-2.5 py-0.5 text-[10px] font-medium text-neutral-300"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        {/* Title & subtitle */}
        <h3 className="text-lg font-bold leading-snug text-white group-hover:text-amber-400 transition-colors">
          {service.title}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {service.subtitle}
        </p>

        {/* Description teaser */}
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal">
          {service.description}
        </p>
      </div>

      {/* Footer row: tags + view cue */}
      <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {service.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[10px] text-neutral-400 font-medium">
              {t}
            </span>
          ))}
        </div>

        <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
          <span>View</span>
          <ArrowRightIcon size={12} />
        </span>
      </div>
    </motion.div>
  );
}
