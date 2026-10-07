import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";

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
    <section id="experience" aria-labelledby="experience-heading" className="px-4 sm:px-6 py-16 md:py-24">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeader id="experience-heading" index="04" label="Experience">
          Two roles I hold now: RuangAlgo.com and freelance mobile work.
        </SectionHeader>

        <ol className="space-y-12 md:space-y-16">
          {experiences.map((exp) => (
            <li key={exp.title} className="grid gap-3 md:grid-cols-12 md:gap-6">
              <p className="md:col-span-3 font-mono text-sm text-muted md:pt-1.5">{exp.period}</p>
              <div className="md:col-span-9 md:max-w-2xl">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {exp.title}
                </h3>
                <p className="mt-1 font-medium text-muted">{exp.company}</p>
                <p className="mt-4 text-ink leading-relaxed">{exp.description}</p>
                <ul className="mt-4 space-y-2 text-muted leading-relaxed list-disc pl-5 marker:text-field-line">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </MotionWrapper>
    </section>
  );
}
