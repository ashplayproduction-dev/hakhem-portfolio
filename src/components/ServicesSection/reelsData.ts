/**
 * ServicesSection/reelsData.ts
 * ────────────────────────────
 * Video showcase dataset: 5 Short-Form Reels (9:16) & 3 Long-Form Videos (16:9).
 */

export interface VideoShowcaseItem {
  id: string;
  title: string;
  badge: string;
  videoUrl: string;
  externalUrl: string;
  aspectRatio: "9/16" | "16/9";
}

export const SHORT_FORM_REELS: VideoShowcaseItem[] = [
  {
    id: "short-1",
    title: "Short-Form Reel #1",
    badge: "Video Editing Service",
    videoUrl: "https://youtube.com/shorts/hHaTj-WS4HU?feature=share",
    externalUrl: "https://youtube.com/shorts/hHaTj-WS4HU?feature=share",
    aspectRatio: "9/16",
  },
  {
    id: "short-2",
    title: "Short-Form Reel #2",
    badge: "Video Editing Service",
    videoUrl: "https://youtube.com/shorts/GQnhrvwTOls?feature=share",
    externalUrl: "https://youtube.com/shorts/GQnhrvwTOls?feature=share",
    aspectRatio: "9/16",
  },
  {
    id: "short-3",
    title: "Short-Form Reel #3",
    badge: "Video Editing Service",
    videoUrl: "https://youtube.com/shorts/WIJGqvvlsAE?feature=share",
    externalUrl: "https://youtube.com/shorts/WIJGqvvlsAE?feature=share",
    aspectRatio: "9/16",
  },
  {
    id: "short-4",
    title: "Short-Form Reel #4",
    badge: "Video Editing Service",
    videoUrl: "https://youtube.com/shorts/jVVrAV06CG8?feature=share",
    externalUrl: "https://youtube.com/shorts/jVVrAV06CG8?feature=share",
    aspectRatio: "9/16",
  },
  {
    id: "short-5",
    title: "Short-Form Reel #5",
    badge: "Video Editing Service",
    videoUrl: "https://youtube.com/shorts/Oko9g0FkXUI?feature=share",
    externalUrl: "https://youtube.com/shorts/Oko9g0FkXUI?feature=share",
    aspectRatio: "9/16",
  },
];

export const LONG_FORM_VIDEOS: VideoShowcaseItem[] = [
  {
    id: "long-1",
    title: "Long-Form Video #1",
    badge: "Video Editing Service",
    videoUrl: "https://youtu.be/ZQUaLFStdz0",
    externalUrl: "https://youtu.be/ZQUaLFStdz0",
    aspectRatio: "16/9",
  },
  {
    id: "long-2",
    title: "Long-Form Video #2",
    badge: "Video Editing Service",
    videoUrl: "https://youtu.be/_PraLhFoEmI",
    externalUrl: "https://youtu.be/_PraLhFoEmI",
    aspectRatio: "16/9",
  },
  {
    id: "long-3",
    title: "Long-Form Video #3",
    badge: "Video Editing Service",
    videoUrl: "https://youtu.be/OM15rwCgXNA",
    externalUrl: "https://youtu.be/OM15rwCgXNA",
    aspectRatio: "16/9",
  },
];
