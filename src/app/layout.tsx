/**
 * app/layout.tsx
 * ──────────────
 * Root layout — loads Google Fonts (Geist family) and global CSS.
 * Dark mode base colour matches the hero's deep-space background.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hakhem-portfolio.vercel.app"),
  title: "Abdul Hakhem R. Serad (Hakhem) — Creative Portfolio",
  description:
    "Strategic Video Editor & Post-Production Specialist. Helping founders, creators, and brands scale their digital presence through high-retention short-form content, authentic UGC, and narrative-driven Video Sales Letters.",
  openGraph: {
    title: "Abdul Hakhem R. Serad (Hakhem) — Creative Portfolio",
    description:
      "Strategic Video Editor & Post-Production Specialist. Helping founders, creators, and brands scale their digital presence through high-retention short-form content, authentic UGC, and narrative-driven Video Sales Letters.",
    url: "https://hakhem-portfolio.vercel.app",
    siteName: "Abdul Hakhem R. Serad Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdul Hakhem R. Serad Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Hakhem R. Serad (Hakhem) — Creative Portfolio",
    description:
      "Strategic Video Editor & Post-Production Specialist. Helping founders, creators, and brands scale their digital presence through high-retention short-form content, authentic UGC, and narrative-driven Video Sales Letters.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
