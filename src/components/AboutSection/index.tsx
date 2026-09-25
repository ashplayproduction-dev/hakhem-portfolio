"use client";

/**
 * AboutSection/index.tsx
 * ───────────────────────
 * Authentic editorial profile of Abdul Hakhem R. Serad.
 * Clean obsidian/graphite aesthetic with precise typography.
 */

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

import {
  FilmIcon,
  NewspaperIcon,
  GamepadIcon,
  CodeIcon,
  GraduationCapIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@/components/icons";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel: string;
}

function AnimatedCounter({ value, suffix = "+", label, sublabel }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Spring-physics number roll — starts at 0, springs to target value on enter
  const springValue = useSpring(0, { stiffness: 55, damping: 18, mass: 0.8 });
  const displayValue = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 shadow-sm"
    >
      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </div>
      <div className="mt-2 text-xs sm:text-sm font-semibold text-white">{label}</div>
      <div className="mt-0.5 text-[11px] sm:text-xs text-neutral-400">{sublabel}</div>
    </motion.div>
  );
}


const PILLARS = [
  {
    icon: FilmIcon,
    title: "Strategic Post-Production & Editing",
    description: "Specialized post-production for founders and creators. Delivering hook-first short-form content, narrative VSLs, and brand mini-docs optimized for the scroll age.",
    tags: ["Best Film Editing", "Cinematography", "Musical Scoring", "Screenplay"],
  },
  {
    icon: NewspaperIcon,
    title: "Journalism & Publication Leadership",
    description: "Managing Editor at Mindanao Varsitarian, previously Head Photojournalist and Videojournalist for Pamokaw (1st Youth-led Environmental Publication).",
    tags: ["Mindanao Varsitarian", "Head Photojournalist", "Videojournalism", "Editorial Leadership"],
  },
  {
    icon: GamepadIcon,
    title: "Esports Direction & Event Management",
    description: "Tournament Director for Ranaw Esports Cup (67th Araw ng Lanao), Events Head and VP Internal for Sarimanok Esports, orchestrating regional collegiate leagues and arena watch fests.",
    tags: ["Tournament Director", "Sarimanok Esports", "Arena Broadcast Staging", "Floor Staging"],
  },
  {
    icon: CodeIcon,
    title: "Computer Science & Technical Grounding",
    description: "BS Computer Science student at MSU-Main (previously in BS Civil Engineering), bridging software systems, digital media production, and peacebuilding fellowships.",
    tags: ["BS Computer Science", "MSU-Main", "Salimbago Grantee", "Technical Production"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-neutral-950 px-4 py-24 sm:px-8 lg:px-16 scroll-mt-16">
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* ── Section Title ─────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400/90 mb-2">
            <span>Leadership &amp; Identity</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Engineered for Retention. Grounded in Storytelling.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed">
            Bridging high-retention digital post-production with award-winning narrative storytelling and editorial leadership.
          </p>
        </div>

        {/* ── Profile Highlight Grid ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Bio Block */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for Commissions &amp; Directing
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Abdul Hakhem R. Serad
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                Strategic Video Editor &amp; Post-Production Specialist
              </p>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                I bridge the gap between high-converting digital content and authentic, award-winning storytelling. While I specialize in freelance video post-production—crafting viral shorts and high-ticket VSLs for business owners—my editorial judgment is built on a diverse foundation. With active leadership experience spanning from Managing Editor of the historic Mindanao Varsitarian, to directing regional broadcasts for Sarimanok Esports, to sweeping festival honors for Best Film Editing, I bring rigorous narrative pacing and technical precision to every brand I partner with.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-2">
              {["Mindanao Varsitarian", "Sarimanok Esports", "Salimbago Grantee", "Best Film Editing", "Tournament Director", "Photojournalist of the Year"].map((tag) => (
                <span key={tag} className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs font-medium text-neutral-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Academic & Geographic Anchor Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400/90 mb-2">
                  <GraduationCapIcon size={16} />
                  <span>Academic Institution</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  Mindanao State University - Main
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-mono">
                  1st Street, MSU Main Campus, Marawi City, 9700
                </p>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  BS Computer Science (2026–Present) · Prev. BS Civil Engineering (2023–2026)
                </p>
                <p className="text-xs text-amber-400/90 font-medium mt-1">
                  STEM Academic Excellence Awardee &amp; With Honors (MSU-MSHS)
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                  <MapPinIcon size={16} />
                  <span>Base &amp; Reach</span>
                </div>
                <p className="text-sm font-medium text-white">
                  Fisheries Village, MSU, Marawi City, Philippines
                </p>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Available for freelance video post-production, film editing, tournament direction, and collaborative projects.
                </p>
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-neutral-300">serad.abdulhakhem@gmail.com</p>
                <p className="text-[11px] font-mono text-neutral-400">Mobile: 0938-835-0649</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 px-4 py-2 text-xs font-bold transition-all active:scale-[0.97] cursor-pointer shadow-sm"
              >
                <span>Connect</span>
                <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Animated Stats Row ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-20">
          <AnimatedCounter value={12} label="Film & Creative Honors" sublabel="Editing, Cinematography, Musical Scoring & Awards" />
          <AnimatedCounter value={8} label="Student Publications & Orgs" sublabel="Managing Editor, VP Internal, Head Videojournalist" />
          <AnimatedCounter value={5} label="Major Esports Tournaments" sublabel="Director &amp; Events Head (Ranaw Cup, M6 Fest, Athena League)" />
        </div>

        {/* ── Core Focus Pillars Grid ─────────────────────────────── */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Core Areas of Impact</h3>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={{
                  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: "easeOut" } },
                }}
                className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8 transition-all duration-200 hover:border-neutral-700/80 hover:bg-neutral-900/60 group"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-700/80 bg-neutral-800 text-amber-400 shadow-sm">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {pillar.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pillar.tags.map((t) => (
                        <span key={t} className="rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-0.5 text-[11px] font-medium text-neutral-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </section>
  );
}
