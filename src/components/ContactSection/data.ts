/**
 * ContactSection/data.ts
 * ───────────────────────
 * Static data for the Morphing Contact Terminal (Phase 4),
 * updated with Abdul Hakhem R. Serad's official contact channels from CV.
 */

export interface PaymentBadge {
  id: string;
  /** Display name shown on the badge */
  name: string;
  /** Emoji icon */
  emoji: string;
  /** Short descriptor shown below the name */
  label: string;
  /** Full Tailwind class string for the badge surface + text */
  style: string;
}

export interface BadgeGroup {
  groupId: string;
  /** Label rendered above the group */
  groupLabel: string;
  /** Decorative emoji prefix for the group label */
  groupIcon: string;
  items: PaymentBadge[];
}

export const BADGE_GROUPS: BadgeGroup[] = [
  {
    groupId: "comms",
    groupLabel: "Direct Contact & Channels",
    groupIcon: "💬",
    items: [
      {
        id: "email",
        name: "serad.abdulhakhem@gmail.com",
        emoji: "✉️",
        label: "Primary Email",
        style: "border-sky-400/35 bg-sky-500/15 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.2)]",
      },
      {
        id: "phone",
        name: "0938-835-0649",
        emoji: "📱",
        label: "Mobile / Call",
        style: "border-emerald-400/35 bg-emerald-500/15 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]",
      },
      {
        id: "discord",
        name: "Discord",
        emoji: "🎮",
        label: "Creative DMs",
        style: "border-indigo-400/35 bg-indigo-500/15 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
      },
    ],
  },
  {
    groupId: "international",
    groupLabel: "International Payments",
    groupIcon: "🌍",
    items: [
      {
        id: "paypal",
        name: "PayPal",
        emoji: "💳",
        label: "Global Clients",
        style: "border-blue-400/35 bg-blue-500/15 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.2)]",
      },
      {
        id: "wise",
        name: "Wise",
        emoji: "🌐",
        label: "Multi-currency Transfer",
        style: "border-emerald-400/35 bg-emerald-500/15 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]",
      },
    ],
  },
  {
    groupId: "local",
    groupLabel: "Local · Philippines",
    groupIcon: "🇵🇭",
    items: [
      {
        id: "gcash",
        name: "GCash",
        emoji: "📱",
        label: "Instant E-Wallet",
        style: "border-sky-400/35 bg-sky-500/15 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.2)]",
      },
      {
        id: "shopee",
        name: "ShopeePay",
        emoji: "🛍️",
        label: "E-wallet",
        style: "border-orange-400/35 bg-orange-500/15 text-orange-200 shadow-[0_0_12px_rgba(251,146,60,0.2)]",
      },
      {
        id: "dragonpay",
        name: "Dragonpay",
        emoji: "🐉",
        label: "Bank Transfer",
        style: "border-red-400/35 bg-red-500/15 text-red-200 shadow-[0_0_12px_rgba(248,113,113,0.2)]",
      },
    ],
  },
];
