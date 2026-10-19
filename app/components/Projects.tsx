"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import SectionIntro from "./SectionIntro";

type Project = {
  title: string;
  context?: string;
  description: string;
  technologies: string[];
  /** Public URL, or null when the work cannot be linked. */
  link: string | null;
  isPrivate: boolean;
};

type Screenshot = { src: string; width: number; height: number; alt: string };

type ShowcaseProject = Project & { shot: Screenshot };

type SmallProject = Project & {
  logo: string;
  /** The logo fills its frame edge to edge instead of sitting on white. */
  logoBleed?: boolean;
};

// Three levels, because the projects carry different weight: CreativeChain
// gets the whole width, projects with a real screenshot get a row each, and
// the ones with only a logo share a compact list.
const flagship: ShowcaseProject = {
  title: "CreativeChain",
  context: "Finalist Top 80, DIGDAYA Hackathon 2026",
  description:
    "A marketplace where Indonesian artists mint, buy, and sell their work on-chain. Authenticity is checked with AI, and artwork is stored permanently on Arweave.",
  shot: {
    src: "/assets/images/creativechain-marketplace.webp",
    width: 2880,
    height: 1800,
    alt: "The CreativeChain marketplace: a grid of artworks, each with its title, creator, price in rupiah and SOL, and a verified-ownership mark.",
  },
  technologies: ["Solana", "Arweave", "Web3", "NFT"],
  link: "https://creativechain.id",
  isPrivate: false,
};

const featured: ShowcaseProject[] = [
  {
    title: "Village Budget Monitoring System",
    context: "Permikomnas Hackathon 2025, 2nd place",
    description:
      "A system for monitoring village budgets, built during the hackathon. OpenRouter handles the AI features and Prisma handles data management.",
    shot: {
      src: "/assets/images/sipandai.png",
      width: 2559,
      height: 1310,
      alt: "Home page of the village budget monitoring system, with a village search box above the 2025 national totals.",
    },
    technologies: ["Next.js", "Prisma", "OpenRouter", "Tailwind CSS"],
    link: "https://sipandai-sage.vercel.app",
    isPrivate: true,
  },
  {
    title: "CLINICALgo",
    description:
      "A web-based clinic management system covering patient administration, electronic medical records, pharmacy inventory, and billing.",
    shot: {
      src: "/assets/images/clinicalgo.png",
      width: 2540,
      height: 1306,
      alt: "CLINICALgo landing page, showing the clinic dashboard on a laptop and the patient app on a phone.",
    },
    technologies: ["Web application", "QA testing", "Clinic management"],
    link: null,
    isPrivate: true,
  },
  {
    title: "SmartCal",
    context: "Capstone, Coding Camp 2026 by DBS Foundation",
    description:
      "A web app that scans a photo of food, recognizes the dish with a computer-vision model, estimates its calories, and tracks daily intake. My role was data scientist: data wrangling, EDA, and the Streamlit dashboard.",
    shot: {
      src: "/assets/images/smartcal.png",
      width: 2550,
      height: 1432,
      alt: "SmartCal home page with the headline Track Calories Smarter over a photo of food.",
    },
    technologies: ["TensorFlow", "Computer vision", "Streamlit", "React", "Express", "Tailwind CSS"],
    link: null,
    isPrivate: false,
  },
];

const more: SmallProject[] = [
  {
    title: "E-learning mobile app",
    description:
      "A cross-platform app for digital education that connects students, teachers, and admins. Built with Flutter and Express.js.",
    logo: "/assets/images/learnfy.png",
    technologies: ["Flutter", "GetX", "Express.js", "Google Cloud", "Supabase"],
    link: null,
    isPrivate: false,
  },
  {
    title: "Ankrah Studios website v3.0",
    description:
      "End-to-end build of the Ankrah Studios website: interfaces designed in Figma, then implemented in WordPress.",
    logo: "/assets/images/ankrah.png",
    logoBleed: true,
    technologies: ["WordPress", "Figma", "CSS"],
    link: null,
    isPrivate: false,
  },
  {
    title: "DEW company profile",
    description:
      "Company profile site for PT Daya Energi Warukin, a coal exporter. I designed the high-fidelity UI and implemented it in WordPress.",
    logo: "/assets/images/dew.png",
    technologies: ["WordPress", "Figma"],
    link: null,
    isPrivate: false,
  },
];

function noLinkNote(project: Project) {
  return project.isPrivate ? "Private project, no public link" : "Client project, no public link";
}

function ProjectLink({ project }: { project: Project }) {
  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="press inline-flex min-h-11 items-center text-[17px] font-medium text-accent hover:underline underline-offset-4"
      >
        Visit {project.title}
        {/* The arrow marks the only links that leave this site. */}
        <span aria-hidden="true" className="ml-1">
          &#8599;
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return <p className="inline-flex min-h-11 items-center text-[15px] text-muted">{noLinkNote(project)}</p>;
}

/** The flagship screenshot settles from 94% to full size as it scrolls into view. */
function FlagshipShot({ shot }: { shot: Screenshot }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.94, 1]);

  return (
    <div ref={ref} className="mx-auto mt-10 max-w-6xl px-5 sm:px-6 md:mt-14">
      <motion.div style={{ scale }} className="overflow-hidden rounded-[18px] border border-line bg-tile md:rounded-[28px]">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 1200px) 100vw, 72rem"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}

function FeaturedRow({ project }: { project: ShowcaseProject }) {
  return (
    <li className="border-t border-line py-12 md:py-16">
      <MotionWrapper className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="max-w-2xl lg:col-span-5">
          {project.context && <p className="text-[15px] font-semibold text-accent">{project.context}</p>}
          <h3 className="mt-2 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance text-ink">
            {project.title}
          </h3>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{project.description}</p>
          <p className="mt-4 text-[13px] text-muted">{project.technologies.join(" · ")}</p>
          <div className="mt-2">
            <ProjectLink project={project} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-[16px] border border-line bg-tile md:rounded-[24px]">
            <Image
              src={project.shot.src}
              alt={project.shot.alt}
              width={project.shot.width}
              height={project.shot.height}
              sizes="(max-width: 1024px) 100vw, 38rem"
              className="h-auto w-full"
            />
          </div>
        </div>
      </MotionWrapper>
    </li>
  );
}

function MoreList() {
  return (
    <MotionWrapper className="mt-16 md:mt-24">
      <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-ink">
        More projects.
      </h3>
      <ul className="mt-6 md:mt-8">
        {more.map((project) => (
          <li
            key={project.title}
            className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-3 border-t border-line py-6 sm:grid-cols-[7rem_1fr] sm:gap-x-6 md:grid-cols-[7rem_1fr_14rem] md:gap-x-8"
          >
            {/* The logo sits beside the project name, so it carries no alt text of its own. */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] border border-line bg-white sm:rounded-[14px]">
              <Image
                src={project.logo}
                alt=""
                fill
                sizes="7rem"
                className={project.logoBleed ? "object-cover" : "object-contain p-1.5"}
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{project.title}</h4>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{project.description}</p>
            </div>
            <div className="col-start-2 text-[13px] leading-relaxed text-muted md:col-start-auto">
              <p>{project.technologies.join(" · ")}</p>
              <p className="mt-1">{noLinkNote(project)}</p>
            </div>
          </li>
        ))}
      </ul>
    </MotionWrapper>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionIntro
          id="projects-heading"
          eyebrow="Work"
          align="left"
          lede="Seven projects across web, mobile, and data, from hackathon builds to client sites."
        >
          Things I&apos;ve built.
        </SectionIntro>
      </div>

      <article aria-labelledby="flagship-title">
        <MotionWrapper className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[15px] font-semibold text-accent">{flagship.context}</p>
              <h3
                id="flagship-title"
                className="mt-2 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1] tracking-[-0.035em] text-ink"
              >
                {flagship.title}
              </h3>
            </div>
            <div className="max-w-2xl lg:col-span-5">
              <p className="text-[17px] leading-relaxed text-muted">{flagship.description}</p>
              <p className="mt-3 text-[13px] text-muted">{flagship.technologies.join(" · ")}</p>
              <div className="mt-1">
                <ProjectLink project={flagship} />
              </div>
            </div>
          </div>
        </MotionWrapper>

        <FlagshipShot shot={flagship.shot} />
      </article>

      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <ol className="mt-16 md:mt-24">
          {featured.map((project) => (
            <FeaturedRow key={project.title} project={project} />
          ))}
        </ol>

        <MoreList />
      </div>
    </section>
  );
}
