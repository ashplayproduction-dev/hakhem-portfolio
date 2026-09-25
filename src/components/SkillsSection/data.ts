/**
 * SkillsSection/data.ts
 * ─────────────────────
 * Disciplines, creative competencies, and official honors of
 * Abdul Hakhem R. Serad ("Hakhem"), taken directly from his CV.
 */

export interface SkillItem {
  name: string;
  level: "Mastery" | "Advanced" | "Proficient";
  category: "film" | "journalism" | "esports" | "tech";
  icon: string;
}

export const SKILL_CATEGORIES = [
  { id: "film", label: "Film & Post-Production" },
  { id: "journalism", label: "Journalism & Editorial" },
  { id: "esports", label: "Esports & Directing" },
  { id: "tech", label: "Computer Science & Code" },
] as const;

export const SKILLS: SkillItem[] = [
  // Film & Video Post-Production
  { name: "Film Editing & Pacing", level: "Mastery", category: "film", icon: "🎞️" },
  { name: "Cinematography & Framing", level: "Mastery", category: "film", icon: "🎥" },
  { name: "Musical Scoring & Audio", level: "Mastery", category: "film", icon: "🎵" },
  { name: "Screenplay & Storyboarding", level: "Advanced", category: "film", icon: "✍️" },
  { name: "Color Grading & Post", level: "Advanced", category: "film", icon: "🎨" },

  // Journalism & Editorial
  { name: "Photojournalism", level: "Mastery", category: "journalism", icon: "📸" },
  { name: "Videojournalism", level: "Mastery", category: "journalism", icon: "📹" },
  { name: "Managing Editorial Staff", level: "Mastery", category: "journalism", icon: "📰" },
  { name: "Ecojournalism & Field Reporting", level: "Mastery", category: "journalism", icon: "🌿" },
  { name: "Press Photography", level: "Mastery", category: "journalism", icon: "🖼️" },

  // Esports & Tournament Directing
  { name: "Tournament Directing", level: "Mastery", category: "esports", icon: "🏆" },
  { name: "Intercollegiate Tournament Staging", level: "Mastery", category: "esports", icon: "🕹️" },
  { name: "Floor & Venue Logistics", level: "Advanced", category: "esports", icon: "🏟️" },
  { name: "Broadcast Overlays & Graphics", level: "Advanced", category: "esports", icon: "✨" },
  { name: "Sponsorship & Partnerships", level: "Advanced", category: "esports", icon: "🤝" },

  // Computer Science & Code
  { name: "BS Computer Science (MSU)", level: "Advanced", category: "tech", icon: "🎓" },
  { name: "C++ & Python Programming", level: "Advanced", category: "tech", icon: "🐍" },
  { name: "Web Application Tech", level: "Advanced", category: "tech", icon: "⚛️" },
  { name: "Algorithm & Logic Design", level: "Advanced", category: "tech", icon: "🧠" },
  { name: "Civil Engineering Principles", level: "Proficient", category: "tech", icon: "📐" },
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeType: "fellowship" | "journalism" | "film";
  honorBadge: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "salimbago-grant",
    title: "$1,023.00 Project Grant & Fellowship",
    issuer: "Salimbago: Storytelling for Peace & Social Change",
    date: "2024",
    badgeType: "fellowship",
    honorBadge: "National Peace Fellowship",
  },
  {
    id: "photojournalist-yr",
    title: "Photojournalist of the Year & School Videographer",
    issuer: "MSU-Marawi Senior High School",
    date: "2023",
    badgeType: "journalism",
    honorBadge: "Top Press Honor",
  },
  {
    id: "film-fest-scoring",
    title: "Best in Musical Scoring",
    issuer: "2nd Ranao Youth Film Festival",
    date: "2023",
    badgeType: "film",
    honorBadge: "Festival Laurel",
  },
  {
    id: "nursing-triple-award",
    title: "Best Film Editing, Cinematography & People's Choice",
    issuer: "Nursing Informatics Film Showing",
    date: "2023",
    badgeType: "film",
    honorBadge: "Triple Film Laurel",
  },
];
