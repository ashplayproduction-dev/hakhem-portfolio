/**
 * GallerySection/data.ts
 * ───────────────────────
 * Interactive Field Gallery — 8 archive photos from Hakhem's field work.
 * Labels are intentionally empty ("") so GalleryItem renders without overlay text.
 */

// ─── Gallery photo items ───────────────────────────────────────────────────

export interface GalleryItemData {
  id: string;
  /** Caption — empty string hides the overlay label */
  label: string;
  /** Subtitle — empty string hides the sublabel */
  subLabel: string;
  /** Large emoji used as an overlay badge */
  emoji: string;
  /** Real photo source path */
  imageSrc: string;
  /** Tailwind fallback gradient start class */
  bgFrom: string;
  /** Tailwind fallback gradient end class */
  bgTo: string;

  // ── Float animation (skip for draggable items) ──
  floatRange?: number;
  floatDuration?: number;
  floatDelay?: number;

  // ── Desktop scatter position & rotation ────────
  desktopPos: {
    top: string;
    left: string;
    width: string;
    height: string;
    rotate: string;
  };

  /** Set true to make this item draggable instead of floating */
  draggable?: boolean;
}

export const GALLERY_ITEMS: GalleryItemData[] = [
  {
    id: "archive-1",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-1.jpg",
    bgFrom: "from-neutral-700",
    bgTo: "to-neutral-900",
    floatRange: 14,
    floatDuration: 5.8,
    floatDelay: 0,
    desktopPos: { top: "2%", left: "1%", width: "24%", height: "44%", rotate: "-2.5deg" },
  },
  {
    id: "archive-2",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-2.jpg",
    bgFrom: "from-stone-700",
    bgTo: "to-stone-900",
    floatRange: 10,
    floatDuration: 4.9,
    floatDelay: 0.6,
    desktopPos: { top: "3%", left: "27%", width: "32%", height: "35%", rotate: "1.8deg" },
  },
  {
    id: "archive-3",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-3.jpg",
    bgFrom: "from-zinc-700",
    bgTo: "to-zinc-900",
    floatRange: 16,
    floatDuration: 6.3,
    floatDelay: 1.1,
    desktopPos: { top: "2%", left: "61%", width: "22%", height: "46%", rotate: "-1.5deg" },
  },
  {
    id: "archive-4",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-4.jpg",
    bgFrom: "from-slate-700",
    bgTo: "to-slate-900",
    draggable: true,
    desktopPos: { top: "50%", left: "2%", width: "23%", height: "34%", rotate: "2.2deg" },
  },
  {
    id: "archive-5",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-5.jpg",
    bgFrom: "from-neutral-600",
    bgTo: "to-neutral-900",
    floatRange: 12,
    floatDuration: 5.2,
    floatDelay: 1.7,
    desktopPos: { top: "40%", left: "28%", width: "30%", height: "48%", rotate: "-1deg" },
  },
  {
    id: "archive-6",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-6.jpg",
    bgFrom: "from-stone-600",
    bgTo: "to-stone-900",
    draggable: true,
    desktopPos: { top: "50%", left: "60%", width: "20%", height: "30%", rotate: "1.5deg" },
  },
  {
    id: "archive-7",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-7.jpg",
    bgFrom: "from-zinc-600",
    bgTo: "to-zinc-900",
    floatRange: 11,
    floatDuration: 5.5,
    floatDelay: 2.2,
    desktopPos: { top: "85%", left: "3%", width: "28%", height: "12%", rotate: "-0.8deg" },
  },
  {
    id: "archive-8",
    label: "",
    subLabel: "",
    emoji: "",
    imageSrc: "/assets/archive-8.jpg",
    bgFrom: "from-neutral-500",
    bgTo: "to-neutral-900",
    floatRange: 9,
    floatDuration: 4.6,
    floatDelay: 2.8,
    desktopPos: { top: "83%", left: "72%", width: "25%", height: "14%", rotate: "2deg" },
  },
];

// ─── Creative authority badges ───────────────────────────────────────────────

export interface AuthorityBadgeData {
  id: string;
  icon: string;
  title: string;
  detail: string;
  floatDelay: number;
}

export const AUTHORITY_BADGES: AuthorityBadgeData[] = [
  {
    id: "photojournalist-yr",
    icon: "📸",
    title: "Photojournalist of the Year",
    detail: "MSU-Marawi Senior High School",
    floatDelay: 0,
  },
  {
    id: "managing-editor",
    icon: "📰",
    title: "Managing Editor",
    detail: "Mindanao Varsitarian Publication",
    floatDelay: 0.4,
  },
  {
    id: "film-awards",
    icon: "🎬",
    title: "Best Film Editing & Scoring",
    detail: "Ranao & Nursing Film Festivals",
    floatDelay: 0.8,
  },
  {
    id: "esports-director",
    icon: "🎮",
    title: "Tournament Director",
    detail: "Ranaw Esports Cup · Sarimanok",
    floatDelay: 1.2,
  },
];
