import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";
import SkillGlobe from "./SkillGlobe";

type SkillGroup = {
  title: string;
  blurb: string;
  /** What I reach for first; set darker on the globe and in the list. */
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

const globeItems = skillGroups.flatMap((g) => [
  ...g.core.map((label) => ({ label, core: true })),
  ...g.rest.map((label) => ({ label, core: false })),
]);

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-4 sm:px-6 py-20 md:py-28 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper>
          <SectionHeader id="skills-heading" index="02" label="Stack">
            The tools I reach for, grouped by the part of the product they build.
          </SectionHeader>
        </MotionWrapper>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <MotionWrapper className="lg:col-span-6 max-w-[22rem] sm:max-w-[28rem] w-full mx-auto">
            <SkillGlobe items={globeItems} />
            <p className="mt-2 text-center text-xs text-muted hidden lg:block">Drag to spin.</p>
          </MotionWrapper>

          <ul className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <li key={group.title}>
                <MotionWrapper delay={i * 0.06} className="h-full rounded-2xl border border-line bg-surface p-5">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted">{group.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.core.map((s) => (
                      <li key={s} className="rounded-md bg-ink px-2 py-1 text-xs font-semibold text-paper">
                        {s}
                      </li>
                    ))}
                    {group.rest.map((s) => (
                      <li key={s} className="rounded-md border border-line px-2 py-1 text-xs font-medium text-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                </MotionWrapper>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
