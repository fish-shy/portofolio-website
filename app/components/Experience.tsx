import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";

// Mirrors the CV (public/cv/Hafiz_Nazwa_Nugraha_CV.pdf): same entries, dates and order.
const work = [
  {
    org: "PT. Ruang Algo Multimatics",
    role: "Freelance Software Engineer",
    place: "Banjarbaru, South Kalimantan",
    period: "Dec 2024 to Apr 2026",
    points: [
      "Developed and maintained client and corporate websites with Nuxt.js and WordPress.",
      "Developed and maintained corporate mobile applications.",
      "Worked with the UI/UX team to turn designs into interactive, responsive interfaces.",
      "Ran QA testing, debugging, and performance work to keep the apps stable and fast.",
    ],
  },
  {
    org: "Freelance Mobile Developer",
    role: "Freelance Flutter Developer",
    place: "Banjarbaru, South Kalimantan",
    period: "Oct 2025 to Dec 2025",
    points: [
      "Built mobile applications in Flutter to each client's requirements.",
      "Designed the UI/UX, database structures, and app workflows around user needs.",
      "Tested and refined the apps based on user evaluation results.",
    ],
  },
];

const achievements = [
  {
    title: "1st Place, Kavinya Digital Innovation Competition",
    date: "Jun 2026",
    detail:
      "Backend developer: designed the server-side architecture, integrated sentiment analysis, and handled deployment.",
  },
  {
    title: "Qualified Finalist, 3rd International Student Competition (ISC)",
    date: "Aug 2026",
    detail:
      "Team leader. Qualified for the international finals with a predictive model using K-Means clustering and Apriori association rules, aimed at irrigation resilience and food security.",
  },
  {
    title: "Finalist Top 80, DIGDAYA Hackathon 2026",
    date: "Jun 2025",
    detail:
      "Team leader and backend developer. Led a cross-functional team building CreativeChain, covering project management and the core server-side architecture.",
  },
  {
    title: "2nd Place, Permikomnas Hackathon",
    date: "Jun 2025",
    detail:
      "Backend developer. Built the server-side architecture with Next.js and Prisma, with AI features through OpenRouter.",
  },
];

const training = [
  {
    title: "Data Scientist Cohort, Coding Camp powered by DBS Foundation",
    date: "Feb 2026 to Jul 2026",
    detail:
      "Intensive data science program covering statistical analysis, predictive modeling, and machine learning, using Python (Pandas, NumPy, scikit-learn) for EDA and visualization.",
  },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <MotionWrapper className="mt-14 first:mt-0">
      <h3 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-ink border-b-2 border-ink pb-2">
        {title}
      </h3>
      {children}
    </MotionWrapper>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-4 sm:px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper>
          <SectionHeader id="experience-heading" index="04" label="Experience">
            Work, competitions, and training, as on my CV.
          </SectionHeader>
        </MotionWrapper>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-muted leading-relaxed">
                The full CV has education, skills, and languages too.
              </p>
              <a
                href="/cv/Hafiz_Nazwa_Nugraha_CV.pdf"
                download
                className="mt-4 inline-flex items-center justify-center min-h-12 px-5 rounded-xl bg-ink text-paper font-semibold hover:opacity-90 transition-opacity"
              >
                Download CV (PDF)
              </a>
            </div>
          </div>

          <div className="lg:col-span-9">
            <Block title="Work experience">
              <ol>
                {work.map((job) => (
                  <li key={job.org} className="border-b border-line py-6 last:border-b-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <p className="font-display text-lg font-semibold text-ink">{job.org}</p>
                        <p className="italic text-muted">{job.role}</p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <p className="text-sm font-medium text-ink">{job.place}</p>
                        <p className="font-mono text-sm text-muted">{job.period}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 list-disc pl-5 text-muted leading-relaxed marker:text-accent">
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Achievements">
              <ol>
                {achievements.map((a) => (
                  <li key={a.title} className="border-b border-line py-5 last:border-b-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <p className="font-display font-semibold text-ink">{a.title}</p>
                      <p className="font-mono text-sm text-muted shrink-0">{a.date}</p>
                    </div>
                    <p className="mt-2 max-w-2xl italic text-muted leading-relaxed">{a.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Certifications & training">
              <ol>
                {training.map((t) => (
                  <li key={t.title} className="py-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <p className="font-display font-semibold text-ink">{t.title}</p>
                      <p className="font-mono text-sm text-muted shrink-0">{t.date}</p>
                    </div>
                    <p className="mt-2 max-w-2xl italic text-muted leading-relaxed">{t.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
}
