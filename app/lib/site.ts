/** The live domain. Canonicals, OG tags and the sitemap must all agree on it. */
const PRODUCTION_URL = "https://hafiznugraha.my.id";

/**
 * Single source of truth for every SEO-facing value on the site.
 *
 * The canonical origin resolves in this order:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override (preview branches, a domain move)
 *   2. PRODUCTION_URL       — anywhere that isn't local dev
 *   3. localhost            — local development only
 *
 * VERCEL_PROJECT_PRODUCTION_URL is deliberately NOT used: it resolves to the
 * *.vercel.app host, which would publish canonical tags pointing away from the
 * real domain and split ranking signals across two origins.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return PRODUCTION_URL;
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Hafiz Nazwa Nugraha",
  shortName: "Hafiz Nazwa",
  jobTitle: "Software Engineer",
  headline: "Software Engineer & Mobile Developer",
  description:
    "Hafiz Nazwa Nugraha is a Software Engineer in Banjarmasin, Indonesia, building web and mobile applications with Next.js, Nuxt.js, Flutter, and Node.js.",
  university: "Universitas Lambung Mangkurat",
  employer: "RuangAlgo.com",
  email: "HafizNugraha1311@gmail.com",
  phone: "+62-811-5100-900",
  address: {
    locality: "Banjarmasin",
    region: "South Kalimantan",
    country: "ID",
  },
  socials: {
    github: "https://github.com/fish-shy",
    linkedin: "https://www.linkedin.com/in/hafiz-nazwa-nugraha/",
  },
  keywords: [
    "Hafiz Nazwa Nugraha",
    "software engineer Indonesia",
    "mobile developer Banjarmasin",
    "full-stack developer",
    "Flutter developer",
    "Next.js developer",
    "Nuxt.js developer",
    "React developer",
    "backend developer",
    "web developer portfolio",
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Nuxt.js",
    "Vue.js",
    "Flutter",
    "Dart",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "REST API",
    "Tailwind CSS",
    "WordPress",
    "UI/UX Design",
  ],
} as const;

/** Absolute URL helper for canonical links, OG tags, and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
