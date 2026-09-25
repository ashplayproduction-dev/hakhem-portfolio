/**
 * app/page.tsx
 * ─────────────
 * Complete portfolio for Abdul Hakhem Serad ("Hakhem"),
 * incorporating the full content, real photos, and structural excellence
 * of the scanned reference portfolio (https://myprofile-hanji.vercel.app/)
 * combined with our signature Playful Antigravity theme.
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import GallerySection from "@/components/GallerySection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400/25 selection:text-amber-200">
      {/* Floating Glassmorphic Navbar with Scroll-Progress */}
      <Navbar />

      {/* 1. Hero Section (with Hero Portrait Photo, Editorial Headline & Stats) */}
      <HeroSection />

      {/* 2. About Section (Iskolar ng Bayan, Core Pillars & Animated Counters) */}
      <AboutSection />

      {/* 3. Selected Works & Video Editing Services (Short-form, UGC, VSL with Theater Mode Morph) */}
      <ServicesSection />

      {/* 4. Track Record & Leadership Milestones (Real Event Photos & Category Filters) */}
      <ExperienceSection />

      {/* 5. Visual Archives & Field Photojournalism (True-Color Photojournalism) */}
      <GallerySection />

      {/* 7. Skills & Creative Suite (Tools Matrix & Verified Badges) */}
      <SkillsSection />

      {/* 8. Morphing Contact Terminal (Pill to Liquid Modal with Discord & Payments) */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
