/**
 * ServicesSection/data.ts
 * ───────────────────────
 * Post-production services data for Abdul Hakhem R. Serad.
 */

export interface ToolBadge {
  name: string;
  style: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDescription: string;
  tools: ToolBadge[];
  tags: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "short-form",
    icon: "⚡",
    title: "Short-form Content",
    subtitle: "Reels · Shorts · TikToks",
    description:
      "Hook-first edits built for the scroll age. Punchy cuts, dynamic captions, and beat-synced transitions that retain attention.",
    expandedDescription:
      "From attention-grabbing 3-second hooks to seamless loop endings, every Short-form edit is engineered for high engagement. Includes fast-paced motion graphics, beat-synced cuts, on-screen animated captions, and viral-ready pacing — all optimized for Instagram Reels, YouTube Shorts, and TikTok. Each deliverable is color-graded and export-ready.",
    tools: [
      { name: "CapCut", style: "border border-neutral-750 bg-neutral-800/80 text-neutral-300" },
      { name: "Adobe Premiere Pro", style: "border border-neutral-750 bg-neutral-800/80 text-neutral-300" },
    ],
    tags: ["Viral Hooks", "Captions", "Beat Sync", "Loop Edits"],
  },
  {
    id: "ugc",
    icon: "🎥",
    title: "User-Generated Content",
    subtitle: "Authentic · Raw · Relatable",
    description:
      "Native-feeling edits that blend organically into feeds while driving conversions. Built for brands that value authentic storytelling over traditional ads.",
    expandedDescription:
      "UGC edits walk the fine line between authentic rawness and polished conversion. Subtle color grading, natural pacing, lifestyle B-roll integration, and soft product callouts make these videos feel organic — while driving measurable results for DTC brands and digital campaigns.",
    tools: [
      { name: "CapCut", style: "border border-neutral-750 bg-neutral-800/80 text-neutral-300" },
      { name: "DaVinci Resolve", style: "border border-neutral-750 bg-neutral-800/80 text-neutral-300" },
    ],
    tags: ["Lifestyle B-roll", "Product Callouts", "Authentic Pacing", "Paid Ads"],
  },
  {
    id: "vsl",
    icon: "📈",
    title: "Video Sales Letters & Mini-Docs",
    subtitle: "High-ticket · Narrative-driven",
    description:
      "Long-form persuasion and brand documentaries. Utilizing tight emotional arcs and strategic pacing to convert warm audiences into high-ticket clients.",

    expandedDescription:
      "A long-form video lives or dies on its pacing and emotional arc. Combining documentary storytelling with proven narrative frameworks, each project is crafted with deliberate tension builds, archival b-roll, score composition, and high-impact visual design.",
    tools: [
      { name: "Adobe Premiere Pro", style: "border border-neutral-750 bg-neutral-800/80 text-neutral-300" },
      { name: "After Effects", style: "border border-neutral-750 bg-neutral-800/80 text-neutral-300" },
    ],
    tags: ["Direct Response", "Storytelling", "Audio Scoring", "Archival Pacing"],
  },
];
