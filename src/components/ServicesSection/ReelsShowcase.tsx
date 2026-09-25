"use client";

/**
 * ServicesSection/ReelsShowcase.tsx
 * ─────────────────────────────────
 * Video Portfolio Showcase:
 *  - 5 Short-Form Reels (9:16) with scroll autoplay (muted)
 *  - 3 Long-Form Videos (16:9) with scroll autoplay (muted)
 *  - Click to open high-res pop-up modal with full sound
 *  - Matches the exact UI & card structure from your reference
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SHORT_FORM_REELS, LONG_FORM_VIDEOS, VideoShowcaseItem } from "./reelsData";

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch) return youtuBeMatch[1];
  return null;
}

interface VideoCardProps {
  item: VideoShowcaseItem;
  index: number;
  onSelect: (item: VideoShowcaseItem) => void;
}

function VideoCard({ item, index, onSelect }: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const ytId = getYouTubeId(item.videoUrl);
  const isNineSixteen = item.aspectRatio === "9/16";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onSelect(item)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900 shadow-xl transition-all duration-200 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-black/70 cursor-pointer active:scale-[0.985]"
    >
      {/* ── Video Player Area ────────────────────────────────────── */}
      <div
        className={`relative w-full overflow-hidden bg-black ${
          isNineSixteen ? "aspect-[9/16]" : "aspect-[16/9]"
        }`}
      >
        {/* Top-left Video Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/40 bg-teal-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-teal-300 backdrop-blur-md">
            <span>▶</span>
            <span>Video</span>
          </span>
        </div>

        {/* Bottom-left Muted Badge */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700/80 bg-black/75 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 backdrop-blur-md">
            <span>🔇</span>
            <span>Muted</span>
          </span>
        </div>

        {/* YouTube Autoplay Muted Embed */}
        {ytId && isInView ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`}
            title={item.title}
            className="h-full w-full object-cover pointer-events-none scale-[1.03]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-950">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 shadow-md">
              ▶
            </span>
          </div>
        )}

        {/* Hover Click-to-Play Overlay */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-amber-950 font-bold shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            ▶
          </span>
        </div>
      </div>

      {/* ── Crisp Card Footer (matches reference) ─────────────────── */}
      <div className="flex flex-col gap-1.5 bg-white p-4 text-left">
        <span className="inline-block w-fit rounded-full border border-teal-400 bg-teal-50 px-2.5 py-0.5 text-[10px] font-semibold text-teal-800">
          {item.badge}
        </span>

        <h3 className="text-sm font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
          {item.title}
        </h3>

        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors mt-0.5"
        >
          <span>Watch on YouTube</span>
          <span>↗</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function ReelsShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoShowcaseItem | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  const activeYtId = selectedVideo ? getYouTubeId(selectedVideo.videoUrl) : null;
  const isNineSixteen = selectedVideo?.aspectRatio === "9/16";

  return (
    <div className="relative z-10 mx-auto max-w-6xl mb-24">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. SHORT-FORM REELS SECTION (5 Columns)                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              Short-Form Reels (9:16 · Click to watch full screen with audio)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SHORT_FORM_REELS.map((item, index) => (
            <VideoCard
              key={item.id}
              item={item}
              index={index}
              onSelect={(reel) => setSelectedVideo(reel)}
            />
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. LONG-FORM VIDEOS SECTION (3 Columns)                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              Long-Form Videos (16:9 · Click the expand icon to view full screen)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LONG_FORM_VIDEOS.map((item, index) => (
            <VideoCard
              key={item.id}
              item={item}
              index={index}
              onSelect={(video) => setSelectedVideo(video)}
            />
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. FULL VIEW POP-UP MODAL (WITH SOUND ON)                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedVideo && activeYtId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex flex-col overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-950 shadow-2xl w-full ${
                isNineSixteen
                  ? "max-w-md aspect-[9/16] max-h-[90vh]"
                  : "max-w-4xl aspect-[16/9] max-h-[85vh]"
              }`}
            >
              {/* Modal Header */}
              <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/40">
                    🔊 Audio On
                  </span>
                  <span className="text-xs font-bold text-white drop-shadow">
                    {selectedVideo.title}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors border border-neutral-700 cursor-pointer shadow-md"
                  aria-label="Close video player"
                >
                  ✕
                </button>
              </div>

              {/* YouTube Player with Sound (mute=0) */}
              <div className="h-full w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeYtId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&playsinline=1`}
                  title={selectedVideo.title}
                  className="h-full w-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
