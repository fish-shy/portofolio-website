import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

const experiences = [
  {
    title: "Full-stack developer",
    company: "RuangAlgo.com, IT Solutions",
    period: "Dec 2024 to now",
    description: "Building and maintaining client and corporate websites and mobile apps.",
    achievements: [
      "Build and maintain client and corporate websites with Nuxt.js and WordPress",
      "Build and maintain corporate mobile applications",
      "Work with the UI/UX team to turn designs into responsive, interactive interfaces",
      "QA testing, debugging, and performance work",
    ],
  },
  {
    title: "Freelance mobile developer",
    company: "Freelance",
    period: "Sep 2025 to now",
    description: "Building Flutter apps to each client's requirements.",
    achievements: [
      "Build mobile applications in Flutter to client requirements",
      "Design the UI/UX, database structure, and app workflows",
      "Test and refine each app based on user evaluation",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-4 sm:px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper>
          <SectionHeader id="experience-heading" index="04" label="Experience">
            Two roles I hold now: RuangAlgo.com and freelance mobile work.
          </SectionHeader>
        </MotionWrapper>

        <ol className="relative grid gap-6 md:grid-cols-12">
          {experiences.map((exp, i) => (
            <li key={exp.title} className={`md:col-span-6 ${i === 1 ? "md:mt-16" : ""}`}>
              <MotionWrapper delay={i * 0.1} className="h-full">
                <TiltCard intensity={4} className="h-full">
                  <article className="h-full rounded-2xl border border-line bg-surface p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-sm text-muted">{exp.period}</p>
                      <p className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                        Current role
                      </p>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                      {exp.title}
                    </h3>
                    <p className="mt-1 font-medium text-muted">{exp.company}</p>
                    <p className="mt-5 text-ink leading-relaxed">{exp.description}</p>
                    <ul className="mt-5 space-y-3 border-t border-line pt-5 text-muted leading-relaxed">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3">
                          <span className="mt-[0.6em] h-px w-3 shrink-0 bg-field-line" aria-hidden="true" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </MotionWrapper>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
