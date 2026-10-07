import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

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

// Projects with a full-size screenshot get the large treatment; the rest have
// only a logo or small image, so they sit in the compact list below.
const featured: Project[] = [
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
];

const more: Project[] = [
  {
    title: "CreativeChain",
    description:
      "A digital art marketplace on Solana where Indonesian artists mint, buy, and sell their work on-chain. Authenticity is checked with AI, and artwork is stored permanently on Arweave.",
    image: "/assets/images/creativechain.png",
    technologies: ["Solana", "Arweave", "Web3"],
    link: "https://creativechain.my.id",
    isPrivate: false,
  },
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
        className="inline-flex items-center gap-1.5 min-h-11 font-semibold text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
      >
        Visit {project.title}
        {/* The arrow marks the only links that leave this site. */}
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <p className="inline-flex items-center min-h-11 text-sm text-muted">
      {project.isPrivate ? "Private project, no public link" : "Client project, no public link"}
    </p>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper>
          <SectionHeader id="projects-heading" index="03" label="Selected work">
            Seven projects across web, mobile, and data, from hackathon
            builds to client sites.
          </SectionHeader>
        </MotionWrapper>

        <ol className="space-y-16 md:space-y-28">
          {featured.map((project, index) => (
            <li key={project.title}>
              <MotionWrapper className="grid gap-6 md:gap-10 lg:grid-cols-12 lg:items-center">
                <TiltCard className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40rem"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </TiltCard>

                <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="text-sm text-muted">
                    <span className="font-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
                    {project.context && (
                      <>
                        <span className="mx-2" aria-hidden="true">/</span>
                        {project.context}
                      </>
                    )}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] leading-tight text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
                  <p className="mt-4 text-sm text-ink">{project.technologies.join(" · ")}</p>
                  <div className="mt-4">
                    <ProjectLink project={project} />
                  </div>
                </div>
              </MotionWrapper>
            </li>
          ))}
        </ol>

        <MotionWrapper className="mt-20 md:mt-28">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink mb-6">
            More projects
          </h3>
          <ul className="border-b border-line">
            {more.map((project) => (
              <li
                key={project.title}
                className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 sm:gap-6 py-6 border-t border-line"
              >
                <div className="relative aspect-square rounded-md border border-line bg-white overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="6rem"
                    className="object-contain p-2"
                  />
                </div>
                <div className="min-w-0 md:grid md:grid-cols-12 md:gap-6">
                  <div className="md:col-span-8">
                    <h4 className="font-semibold text-ink">{project.title}</h4>
                    <p className="mt-1 text-muted leading-relaxed">{project.description}</p>
                    <p className="mt-2 text-sm text-ink">{project.technologies.join(" · ")}</p>
                  </div>
                  <div className="md:col-span-4 md:text-right mt-1 md:mt-0">
                    <ProjectLink project={project} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </MotionWrapper>
      </div>
    </section>
  );
}
