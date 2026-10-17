"use client";

import Image from "next/image";
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
};

// Projects with a real screenshot get a full-width row; the rest only have a
// logo, so they get smaller cards below.
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

function ProjectLink({ project }: { project: Pick<Project, "title" | "link" | "isPrivate"> }) {
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

function Stack({ items }: { items: string[] }) {
  return (
    <ul aria-label="Built with" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-line px-3 py-1 text-[13px] text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** One project per row: copy on one side, the whole screenshot on the other, alternating. */
function FeatureRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article
      className={`group grid items-center gap-8 rounded-[28px] bg-tile p-6 sm:p-8 lg:gap-12 lg:p-12 ${
        flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      <div className={flip ? "lg:order-2" : ""}>
        {project.context && <p className="text-[15px] font-semibold text-accent">{project.context}</p>}
        <h3 className="mt-2 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-ink">
          {project.title}
        </h3>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{project.description}</p>
        <div className="mt-6">
          <Stack items={project.technologies} />
        </div>
        <div className="mt-4">
          <ProjectLink project={project} />
        </div>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        {/* Every screenshot shares one 16:9 frame so the rows line up; wider captures lose a sliver at the sides. */}
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)]">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 36rem"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </article>
  );
}

function MoreProjects() {
  return (
    <div className="mt-20 md:mt-28">
      <MotionWrapper className="mx-auto max-w-5xl px-5 sm:px-6">
        <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-ink">
          More projects.
        </h3>
      </MotionWrapper>

      {/* A swipeable rail on phones, a plain three-column grid once they fit. */}
      <ul className="rail mx-auto mt-8 flex max-w-5xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:scroll-px-6 sm:px-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {more.map((project) => (
          <li key={project.title} className="w-[82vw] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <article className="flex h-full flex-col rounded-[24px] bg-tile p-6">
              {/* Logos are drawn for white, so they keep a white plate in dark mode too. */}
              <div className="relative h-16 w-28 overflow-hidden rounded-xl bg-white">
                <Image src={project.image} alt={`${project.title} logo`} fill sizes="7rem" className="object-contain p-2" />
              </div>
              <h4 className="mt-6 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-ink">{project.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
              <div className="mt-5">
                <Stack items={project.technologies} />
              </div>
              <div className="mt-auto pt-3">
                <ProjectLink project={project} />
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

        <div className="grid gap-5">
          {featured.map((project, i) => (
            <MotionWrapper key={project.title}>
              <FeatureRow project={project} flip={i % 2 === 1} />
            </MotionWrapper>
          ))}
        </div>
      </div>

      <MoreProjects />
    </section>
  );
}
