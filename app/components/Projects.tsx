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
  image: string;
  technologies: string[];
  /** Public URL, or null when the work cannot be linked. */
  link: string | null;
  isPrivate: boolean;
  /** Screenshot aspect ratio when it is not the default 16 / 10. */
  aspect?: string;
};

// Projects with a real screenshot get a large tile; the rest have only a logo,
// so they sit in the swipeable rail below.
const featured: Project[] = [
  {
    title: "CreativeChain",
    context: "Finalist Top 80, DIGDAYA Hackathon 2026",
    description:
      "A marketplace where Indonesian artists mint, buy, and sell their work on-chain. Authenticity is checked with AI, and artwork is stored permanently on Arweave.",
    image: "/assets/images/creativechain.png",
    technologies: ["Solana", "Arweave", "Web3", "NFT"],
    link: "https://creativechain.my.id",
    isPrivate: false,
    aspect: "480 / 252",
  },
  {
    title: "Village Budget Monitoring System",
    context: "Permikomnas Hackathon 2025, 2nd place",
    description:
      "A system for monitoring village budgets, built during the hackathon. OpenRouter handles the AI features and Prisma handles data management.",
    image: "/assets/images/sipandai.png",
    technologies: ["Next.js", "Prisma", "OpenRouter", "Tailwind CSS"],
    link: null,
    isPrivate: true,
  },
  {
    title: "CLINICALgo",
    description:
      "A web-based clinic management system covering patient administration, electronic medical records, pharmacy inventory, and billing.",
    image: "/assets/images/clinicalgo.png",
    technologies: ["Web application", "QA testing", "Clinic management"],
    link: null,
    isPrivate: true,
  },
  {
    title: "SmartCal",
    context: "Capstone, Coding Camp 2026 by DBS Foundation",
    description:
      "A web app that scans a photo of food, recognizes the dish with a computer-vision model, estimates its calories, and tracks daily intake. My role was data scientist: data wrangling, EDA, and the Streamlit dashboard.",
    image: "/assets/images/smartcal.png",
    technologies: ["TensorFlow", "Computer vision", "Streamlit", "React", "Express", "Tailwind CSS"],
    link: "https://fe-smartcal-656502826232.asia-southeast2.run.app/",
    isPrivate: false,
  },
];

const more: Project[] = [
  {
    title: "E-learning mobile app",
    description:
      "A cross-platform app for digital education that connects students, teachers, and admins. Built with Flutter and Express.js.",
    image: "/assets/images/learnfy.png",
    technologies: ["Flutter", "GetX", "Express.js", "Google Cloud", "Supabase"],
    link: null,
    isPrivate: false,
  },
  {
    title: "Ankrah Studios website v3.0",
    description:
      "End-to-end build of the Ankrah Studios website: interfaces designed in Figma, then implemented in WordPress.",
    image: "/assets/images/ankrah.png",
    technologies: ["WordPress", "Figma", "CSS"],
    link: null,
    isPrivate: false,
  },
  {
    title: "DEW company profile",
    description:
      "Company profile site for PT Daya Energi Warukin, a coal exporter. I designed the high-fidelity UI and implemented it in WordPress.",
    image: "/assets/images/dew.png",
    technologies: ["WordPress", "Figma"],
    link: null,
    isPrivate: false,
  },
];

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
  return (
    <p className="inline-flex min-h-11 items-center text-[15px] text-muted">
      {project.isPrivate ? "Private project, no public link" : "Client project, no public link"}
    </p>
  );
}

/** A screenshot that grows from 92% to full size as it scrolls up into view. */
function Shot({ project, wide }: { project: Project; wide: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, 0]);

  return (
    <div ref={ref} className="mt-10 px-6 md:px-10">
      <motion.div
        style={{ scale, y, aspectRatio: project.aspect ?? "16 / 10" }}
        className={`relative mx-auto overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.25)] ${
          wide ? "max-w-4xl" : "max-w-xl"
        }`}
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={wide ? "(max-width: 1024px) 100vw, 56rem" : "(max-width: 768px) 100vw, 36rem"}
          className="object-cover object-top"
        />
      </motion.div>
    </div>
  );
}

function FeatureTile({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-tile pt-12 md:pt-14">
      <div className="px-6 text-center md:px-10">
        {project.context && <p className="text-[15px] font-semibold text-accent">{project.context}</p>}
        <h3
          className={`mt-2 font-display font-semibold tracking-[-0.03em] leading-[1.05] text-ink ${
            wide ? "text-[clamp(2rem,5vw,3.5rem)]" : "text-[clamp(1.75rem,3.4vw,2.5rem)]"
          }`}
        >
          {project.title}
        </h3>
        <p className={`mx-auto mt-4 text-[17px] leading-relaxed text-muted ${wide ? "max-w-2xl" : "max-w-md"}`}>
          {project.description}
        </p>
        <p className="mt-3 text-[13px] text-muted">{project.technologies.join(" · ")}</p>
        <div className="mt-2">
          <ProjectLink project={project} />
        </div>
      </div>
      <div className="mt-auto">
        <Shot project={project} wide={wide} />
      </div>
    </article>
  );
}

function MoreRail() {
  const rail = useRef<HTMLUListElement>(null);
  const scrollByCard = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="mt-24 md:mt-32">
      <MotionWrapper className="mx-auto flex max-w-5xl items-end justify-between gap-6 px-5 sm:px-6">
        <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-ink">
          More projects.
        </h3>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByCard(dir)}
              aria-label={dir === -1 ? "Previous projects" : "Next projects"}
              className="press inline-flex h-11 w-11 items-center justify-center rounded-full bg-tile text-ink hover:bg-line"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          ))}
        </div>
      </MotionWrapper>

      <ul
        ref={rail}
        className="rail mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:scroll-px-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] lg:scroll-px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        {more.map((project) => (
          <li key={project.title} className="w-[82vw] max-w-[22rem] shrink-0 snap-start">
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-tile">
              <div className="relative m-3 h-44 overflow-hidden rounded-2xl bg-white">
                <Image src={project.image} alt={`${project.title} preview`} fill sizes="22rem" className="object-contain p-6" />
              </div>
              <div className="flex flex-1 flex-col px-6 pb-5 pt-3">
                <h4 className="text-[21px] font-semibold tracking-[-0.02em] text-ink">{project.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
                <p className="mt-3 text-[13px] text-muted">{project.technologies.join(" · ")}</p>
                <div className="mt-auto pt-2">
                  <ProjectLink project={project} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionIntro
          id="projects-heading"
          eyebrow="Work"
          lede="Seven projects across web, mobile, and data, from hackathon builds to client sites."
        >
          Things I&apos;ve built.
        </SectionIntro>

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project, i) => (
            <MotionWrapper key={project.title} className={`h-full ${i === 0 ? "md:col-span-2" : ""}`}>
              <FeatureTile project={project} wide={i === 0} />
            </MotionWrapper>
          ))}
        </div>
      </div>

      <MoreRail />
    </section>
  );
}
