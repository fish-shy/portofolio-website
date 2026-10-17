"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import SectionIntro from "./SectionIntro";

type Project = {
  title: string;
  /** Short label above the title on the card. */
  eyebrow: string;
  /** One line for the card; the full description lives in the detail sheet. */
  tagline: string;
  context?: string;
  description: string;
  image: string;
  technologies: string[];
  /** Public URL, or null when the work cannot be linked. */
  link: string | null;
  isPrivate: boolean;
};

type SmallProject = Omit<Project, "eyebrow" | "tagline" | "context">;

// Projects with a real screenshot get a gallery card; the rest only have a
// logo, so they sit in the list below.
const featured: Project[] = [
  {
    title: "CreativeChain",
    eyebrow: "DIGDAYA Hackathon, Top 80",
    tagline: "An on-chain marketplace for Indonesian artists.",
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
    eyebrow: "Permikomnas 2025, 2nd place",
    tagline: "Village budgets, monitored with AI.",
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
    eyebrow: "Clinic software",
    tagline: "Patients, records, pharmacy, and billing in one place.",
    description:
      "A web-based clinic management system covering patient administration, electronic medical records, pharmacy inventory, and billing.",
    image: "/assets/images/clinicalgo.png",
    technologies: ["Web application", "QA testing", "Clinic management"],
    link: null,
    isPrivate: true,
  },
  {
    title: "SmartCal",
    eyebrow: "DBS Coding Camp capstone",
    tagline: "Photograph a meal and get its calories.",
    context: "Capstone, Coding Camp 2026 by DBS Foundation",
    description:
      "A web app that scans a photo of food, recognizes the dish with a computer-vision model, estimates its calories, and tracks daily intake. My role was data scientist: data wrangling, EDA, and the Streamlit dashboard.",
    image: "/assets/images/smartcal.png",
    technologies: ["TensorFlow", "Computer vision", "Streamlit", "React", "Express", "Tailwind CSS"],
    link: "https://fe-smartcal-656502826232.asia-southeast2.run.app/",
    isPrivate: false,
  },
];

const more: SmallProject[] = [
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
        className="press inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-[17px] font-medium text-on-accent hover:opacity-90"
      >
        Visit {project.title}
        {/* The arrow marks the only links that leave this site. */}
        <span aria-hidden="true" className="ml-1.5">
          &#8599;
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <p className="text-[15px] text-muted">
      {project.isPrivate ? "Private project, no public link." : "Client project, no public link."}
    </p>
  );
}

const plusIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
);

/** A tall gallery card. Every card is the same size; the screenshot enters from the bottom right edge. */
function Card({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group relative h-[26rem] overflow-hidden sm:h-[30rem] rounded-[28px] bg-tile transition-transform duration-150 ease-out has-[button:active]:scale-[0.98]">
      <div className="px-7 pt-8">
        <p className="text-[13px] font-semibold text-muted">{project.eyebrow}</p>
        <h3 className="mt-2 text-[26px] font-bold leading-[1.12] tracking-[-0.025em] text-balance text-ink">{project.title}</h3>
        <p className="mt-2 text-[15px] leading-snug text-muted">{project.tagline}</p>
      </div>

      <div className="absolute -right-40 bottom-0 left-7 aspect-video overflow-hidden rounded-tl-2xl border-l border-t border-line bg-surface shadow-[0_-12px_40px_-20px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out group-hover:-translate-x-3 motion-reduce:transition-none">
        <Image src={project.image} alt="" fill sizes="28rem" className="object-cover object-left-top" />
      </div>

      {/* The whole card opens the sheet; the plus is its visible handle. */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="absolute inset-0 rounded-[28px] focus-visible:outline-offset-[-4px]"
      >
        <span className="sr-only">More about {project.title}</span>
        <span className="absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper shadow-md">
          {plusIcon}
        </span>
      </button>
    </article>
  );
}

/** Detail sheet on a native modal dialog: focus trap, Escape and inert background come with it. */
function Sheet({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = dialog.current;
    if (!el || !project) return;
    if (!el.open) el.showModal();
    // Start keyboard focus on Close, so Enter or Space dismisses straight away.
    el.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    document.documentElement.style.overflow = "hidden";
  }, [project]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="sheet-title"
      // Escape runs the same exit animation as the close button.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-transparent"
    >
      <AnimatePresence
        onExitComplete={() => {
          dialog.current?.close();
          document.documentElement.style.overflow = "";
        }}
      >
        {project && (
          <motion.div key={project.title} className="relative min-h-full">
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.3 }}
            />
            <div
              className="relative flex min-h-full items-end justify-center p-3 pt-16 sm:items-center sm:p-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
              }}
            >
              <motion.div
                className="relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-surface"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
                transition={reduce ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.45 }}
              >
                <button
                  type="button"
                  data-close
                  onClick={onClose}
                  className="press absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-tile text-ink hover:bg-line"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>

                <div className="px-6 pb-8 pt-10 sm:px-12 sm:pb-12 sm:pt-12">
                  <p className="pr-12 text-[15px] font-semibold text-accent">{project.context ?? project.eyebrow}</p>
                  <h3
                    id="sheet-title"
                    className="mt-2 pr-12 text-[clamp(1.9rem,4.4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-ink"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-muted">{project.description}</p>

                  <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-line bg-tile">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 42rem"
                      className="object-cover object-top"
                    />
                  </div>

                  <h4 className="mt-8 text-[13px] font-semibold text-muted">Built with</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <li key={t} className="rounded-full bg-tile px-3.5 py-1.5 text-[14px] text-ink">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <ProjectLink project={project} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

const railInset = "px-5 sm:px-6 lg:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]";
const railScrollInset = "scroll-px-5 sm:scroll-px-6 lg:scroll-px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]";

function Gallery() {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [active, setActive] = useState<Project | null>(null);

  const updateEdges = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <>
      <MotionWrapper>
        <ul
          ref={rail}
          onScroll={updateEdges}
          aria-label="Featured projects"
          className={`rail flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 ${railInset} ${railScrollInset}`}
        >
          {featured.map((project) => (
            <li key={project.title} className="w-[80vw] max-w-[23rem] shrink-0 snap-start">
              <Card project={project} onOpen={() => setActive(project)} />
            </li>
          ))}
        </ul>
      </MotionWrapper>

      {/* Touch scrolls the rail directly; these are for mouse and keyboard. */}
      <div className="mx-auto mt-6 hidden max-w-5xl justify-end gap-3 px-6 sm:flex">
        {([-1, 1] as const).map((dir) => {
          const disabled = dir === -1 ? edges.start : edges.end;
          return (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByCard(dir)}
              disabled={disabled}
              aria-label={dir === -1 ? "Previous projects" : "Next projects"}
              className="press inline-flex h-11 w-11 items-center justify-center rounded-full bg-tile text-ink hover:bg-line disabled:pointer-events-none disabled:opacity-35"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          );
        })}
      </div>

      <Sheet project={active} onClose={() => setActive(null)} />
    </>
  );
}

function MoreProjects() {
  return (
    <MotionWrapper className="mx-auto mt-20 max-w-5xl px-5 sm:px-6 md:mt-28">
      <h3 className="text-[clamp(1.6rem,3.4vw,2.25rem)] font-bold tracking-[-0.03em] text-ink">More projects.</h3>
      {/* An inset grouped list: one surface, hairlines between rows. */}
      <ul className="mt-6 overflow-hidden rounded-[28px] bg-tile">
        {more.map((project) => (
          <li key={project.title} className="flex gap-4 px-5 sm:gap-6 sm:px-8">
            {/* Logos are drawn for white, so they keep a white plate in dark mode too. */}
            <div className="relative mt-6 h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-white sm:h-16 sm:w-16">
              <Image src={project.image} alt="" fill sizes="4rem" className="object-contain p-1.5" />
            </div>
            <div className="flex-1 border-b border-line py-6 [li:last-child_&]:border-0">
              <h4 className="text-[19px] font-semibold tracking-[-0.015em] text-ink">{project.title}</h4>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{project.description}</p>
              <p className="mt-2 text-[13px] text-muted">
                {project.technologies.join(" · ")}
                <span aria-hidden="true"> · </span>
                {project.isPrivate ? "Private" : "Client project"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </MotionWrapper>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="overflow-x-clip py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionIntro
          id="projects-heading"
          eyebrow="Work"
          lede="Seven projects across web, mobile, and data, from hackathon builds to client sites."
        >
          Things I&apos;ve built.
        </SectionIntro>
      </div>

      <Gallery />
      <MoreProjects />
    </section>
  );
}
