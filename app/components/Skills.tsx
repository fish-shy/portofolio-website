import MotionWrapper from "./MotionWrapper";
import SectionIntro from "./SectionIntro";

type SkillGroup = {
  title: string;
  blurb: string;
  /** What I reach for first; shown as filled chips. */
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
    <section id="skills" aria-labelledby="skills-heading" className="px-5 sm:px-6 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionIntro
          id="skills-heading"
          eyebrow="Stack"
          lede="Grouped by the part of the product they build. Filled ones are what I reach for first."
        >
          The tools I work with.
        </SectionIntro>

        <ul className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <li key={group.title}>
              <MotionWrapper delay={(i % 2) * 0.06} className="h-full rounded-[28px] bg-tile p-7 md:p-9">
                <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">{group.title}</h3>
                <p className="mt-1 text-[17px] text-muted">{group.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.core.map((s) => (
                    <li key={s} className="rounded-full bg-ink px-3.5 py-1.5 text-[14px] font-medium text-paper">
                      {s}
                    </li>
                  ))}
                  {group.rest.map((s) => (
                    <li key={s} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[14px] text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </MotionWrapper>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
