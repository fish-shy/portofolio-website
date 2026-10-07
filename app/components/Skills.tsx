import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";

type SkillGroup = {
  title: string;
  blurb: string;
  /** What I reach for first; set larger. */
  core: string[];
  /** Used on projects, but not the default pick. */
  rest: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Responsive interfaces built to stay fast.",
    core: ["React / Next.js", "TypeScript", "Tailwind CSS"],
    rest: ["JavaScript", "Nuxt.js", "Vue.js", "Redux", "HTML / CSS", "State management", "Responsive design"],
  },
  {
    title: "Backend & data",
    blurb: "APIs and data models that hold up in production.",
    core: ["Node.js", "Express.js", "PostgreSQL"],
    rest: ["Prisma", "MongoDB", "REST APIs", "Firebase", "Python", "Java"],
  },
  {
    title: "Mobile",
    blurb: "Cross-platform apps for client work.",
    core: ["Flutter", "Dart"],
    rest: ["GetX"],
  },
  {
    title: "Cloud & delivery",
    blurb: "Deploying and keeping things running.",
    core: ["GCP", "AWS", "CI/CD"],
    rest: ["Git / GitHub", "Vercel", "Supabase"],
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-4 sm:px-6 py-16 md:py-24">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeader id="skills-heading" index="02" label="Stack">
          The tools I reach for, grouped by the part of the product they build.
        </SectionHeader>

        <ul className="border-b border-line">
          {skillGroups.map((group) => (
            <li
              key={group.title}
              className="grid gap-3 md:grid-cols-12 md:gap-6 py-6 md:py-8 border-t border-line"
            >
              <div className="md:col-span-3">
                <h3 className="font-semibold text-ink">{group.title}</h3>
                <p className="mt-1 text-sm text-muted">{group.blurb}</p>
              </div>
              <div className="md:col-span-9">
                <p className="font-display text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium tracking-[-0.02em] text-ink">
                  {group.core.join(", ")}
                </p>
                <p className="mt-2 text-muted">{group.rest.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </MotionWrapper>
    </section>
  );
}
