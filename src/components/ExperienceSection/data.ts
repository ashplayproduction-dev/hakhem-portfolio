/**
 * ExperienceSection/data.ts
 * ──────────────────────────
 * Authentic experiences, tournament directing, editorial leadership,
 * and film awards of Abdul Hakhem R. Serad ("Hakhem"), taken directly from his CV.
 */

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  category: "all" | "esports" | "publication" | "film" | "fellowship";
  skills: string[];
  badgeColor: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  // ─── ESPORTS & TOURNAMENT DIRECTION ──────────────────────────────────────
  {
    id: "ranaw-cup",
    title: "Ranaw Esports Cup — 67th Araw ng Lanao",
    role: "Tournament Director",
    organization: "Provincial Government of Lanao del Sur",
    date: "2026",
    description: "Served as Tournament Director for the premier provincial esports tournament celebrating the 67th Araw ng Lanao, overseeing tournament rules, bracket seeding, broadcast stage coordination, and multi-team arena operations.",
    image: "/assets/ranaw-cup.jpeg",
    category: "esports",
    skills: ["Tournament Directing", "Broadcast Staging", "Rule Enforcement", "Player Operations"],
    badgeColor: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },
  {
    id: "pagkatha-2025",
    title: "Pagkatha 2025: Literary and Arts Competition",
    role: "Competition Judge",
    organization: "Pagkatha: Literary & Arts Competition",
    date: "2025",
    description: "Served as an official competition judge for Pagkatha 2025, evaluating student entries across creative literary arts, visual media, photography, and collaborative artistic storytelling.",
    image: "/assets/pagkatha-2025.jpeg",
    category: "film",
    skills: ["Arts Division Judge", "Literary & Visual Arts", "Creative Adjudication", "Media Evaluation"],
    badgeColor: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  {
    id: "sarimanok-officer",
    title: "Sarimanok Esports Leadership",
    role: "Partnership Officer (2026) / VP Internal & Events Head (2024–2025)",
    organization: "Sarimanok Esports",
    date: "2024 – Present",
    description: "Directed club affairs, collegiate partnerships, sponsored game nights, and major tournament productions, establishing Sarimanok Esports as the leading competitive gaming hub at MSU.",
    image: "/assets/sarimanok.jpeg",
    category: "esports",
    skills: ["Partnership Development", "Internal Affairs", "Campus Gaming Hub", "Team Management"],
    badgeColor: "border-neutral-700 bg-neutral-800 text-neutral-300",
  },
  {
    id: "m6-watchfest",
    title: "M6 World Championship Watch Fest",
    role: "Events Head",
    organization: "Sarimanok Esports",
    date: "2024",
    description: "Organized and hosted the community watch party for the M6 World Championship, coordinating venue projection, crowd engagement activities, and live commentary setups.",
    image: "/assets/m6-watchfest.jpeg",
    category: "esports",
    skills: ["Community Watch Fest", "Crowd Hosting", "AV Projection", "Event Logistics"],
    badgeColor: "border-neutral-700 bg-neutral-800 text-neutral-300",
  },

  // ─── PUBLICATIONS & JOURNALISM ───────────────────────────────────────────
  {
    id: "mindanao-varsitarian",
    title: "Mindanao Varsitarian",
    role: "Managing Editor (2025–Present) / Videographer (2024–2025)",
    organization: "Official University Student Publication — MSU Main",
    date: "2024 – Present",
    description: "Serving as Managing Editor directing editorial staff, print and digital issue deadlines, and multimedia videojournalism for the historic official student publication of MSU-Main.",
    image: "/assets/mindanao-varsitarian.jpeg",
    category: "publication",
    skills: ["Managing Editor", "Multimedia Journalism", "Editorial Leadership", "Videography"],
    badgeColor: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  {
    id: "pamokaw-pub",
    title: "Pamokaw Publication: 1st Youth-Led Environmental Publication",
    role: "Head Photojournalist & Head Videojournalist",
    organization: "Pamokaw Publication — Lanao del Sur",
    date: "2022 – 2025",
    description: "Spearheaded photo and video coverage of environmental conservation, Lake Lanao watershed protection, and community stories across Lanao del Sur as the pioneer youth-led eco-journalism publication.",
    image: "/assets/pamokaw-pub.jpeg",
    category: "publication",
    skills: ["Environmental Journalism", "Head Photojournalist", "Field Documentary", "Visual Storytelling"],
    badgeColor: "border-neutral-700 bg-neutral-800 text-neutral-300",
  },
  {
    id: "brigade-pub",
    title: "Brigade Publication",
    role: "Head Videojournalist",
    organization: "Official Student Publication of MSU-Main – NSTP",
    date: "2024 – 2025",
    description: "Led videojournalism coverage for university-wide NSTP community projects, medical missions, environmental cleanups, and civic engagement initiatives.",
    image: "/assets/brigade-pub.jpeg",
    category: "publication",
    skills: ["Head Videojournalist", "Civic Journalism", "Video Documentation", "Social Advocacy"],
    badgeColor: "border-neutral-700 bg-neutral-800 text-neutral-300",
  },

  // ─── FILM & CINEMATOGRAPHY AWARDS ────────────────────────────────────────
  {
    id: "ranao-film-fest",
    title: "Best in Musical Scoring — 2nd Ranao Youth Film Festival",
    role: "Composer & Musical Scorer",
    organization: "Ranao Youth Film Festival",
    date: "2023",
    description: "Awarded Best in Musical Scoring for composing an evocative cinematic soundtrack that heightened the narrative tension and emotional depth of the film entry.",
    image: "/assets/ranao-film.jpeg",
    category: "film",
    skills: ["Musical Scoring", "Audio Mixing", "Emotional Arc", "Film Scoring"],
    badgeColor: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  {
    id: "nursing-film-fest",
    title: "Triple Award Winner — Nursing Informatics Film Festival",
    role: "Film Editor, Cinematographer & Director",
    organization: "Nursing Informatics: Film Showing 2023",
    date: "2023",
    description: "Swept the festival with three major awards: Best Film Editing, Best Cinematography, and the People's Choice Award for superior visual pacing and lighting.",
    image: "/assets/nursing-film.jpg",
    category: "film",
    skills: ["Best Film Editing", "Best Cinematography", "People's Choice", "Color Grading"],
    badgeColor: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  {
    id: "mshs-stem-film",
    title: "Grand Sweep — MSHS STEM Film Competition",
    role: "Cinematographer, Screenplay Writer & Visual Editor",
    organization: "MSHS STEM Film Competition",
    date: "2022",
    description: "Secured Best Cinematography, Best in Graphics and Musical Scoring, and Best Screenplay for a student science drama exploring technological innovation and human connection.",
    image: "/assets/mshs-stem.jpg",
    category: "film",
    skills: ["Best Screenplay", "Best Graphics & Scoring", "Best Cinematography", "Directing"],
    badgeColor: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  {
    id: "onthespot-videography",
    title: "1st Runner-Up — On-the-spot Videography Contest",
    role: "Solo Videographer & Rapid Editor",
    organization: "Senior Division Inter-School Competition",
    date: "2023",
    description: "Shot, edited, and rendered a compelling documentary video under strict real-time deadline constraints, earning 1st Runner-Up distinction.",
    image: "/assets/onthespot-video.jpg",
    category: "film",
    skills: ["Rapid Video Editing", "On-the-spot Shoot", "Agile Pacing", "Camera Work"],
    badgeColor: "border-neutral-700 bg-neutral-800 text-neutral-300",
  },

  // ─── FELLOWSHIPS & GRANTS ────────────────────────────────────────────────
  {
    id: "salimbago-fellowship",
    title: "Salimbago: Storytelling for Peace & Social Change",
    role: "Fellow & $1,023.00 Project Grant Recipient",
    organization: "Salimbago Fellowship Programme",
    date: "2024",
    description: "Selected as an official fellow and awarded a $1,023.00 project grant to implement a peacebuilding multimedia narrative project empowering youth voices across the Bangsamoro region.",
    image: "/assets/salimbago.jpg",
    category: "fellowship",
    skills: ["$1,023 Project Grant", "Peace Journalism", "Social Impact", "Fellowship Grantee"],
    badgeColor: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  {
    id: "pamokaw-2",
    title: "Project Pamokaw 2.0 Seminar-Workshop Competition",
    role: "Co-Lead & Project Implementer",
    organization: "MSU International Convention Center",
    date: "June 21–24, 2024",
    description: "Co-led and implemented a multi-day regional seminar-workshop and competition on environmental journalism, gathering student writers and photographers at the MSU International Convention Center.",
    image: "/assets/pamokaw-seminar.jpeg",
    category: "fellowship",
    skills: ["Project Management", "Convention Logistics", "Ecojournalism Workshop", "Speaker Coordination"],
    badgeColor: "border-neutral-700 bg-neutral-800 text-neutral-300",
  },
];
