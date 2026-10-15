import type { ReactNode } from "react";
import MotionWrapper from "./MotionWrapper";
import SectionIntro from "./SectionIntro";

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

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <MotionWrapper className="rounded-[28px] bg-tile px-6 py-2 md:px-10 md:py-4">
      <h3 className="pt-6 text-[13px] font-semibold text-muted">{title}</h3>
      {children}
    </MotionWrapper>
  );
}

function Row({ title, sub, side, children }: { title: string; sub?: string; side: ReactNode; children: ReactNode }) {
  return (
    <li className="border-b border-line py-6 last:border-b-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div>
          <p className="text-[21px] font-semibold tracking-[-0.02em] text-ink">{title}</p>
          {sub && <p className="text-[17px] text-muted">{sub}</p>}
        </div>
        <div className="shrink-0 text-[15px] text-muted sm:text-right">{side}</div>
      </div>
      {children}
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-5 sm:px-6 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionIntro
          id="experience-heading"
          eyebrow="Experience"
          lede={
            <>
              Work, competitions, and training, as on my CV.{" "}
              <a
                href="/cv/Hafiz_Nazwa_Nugraha_CV.pdf"
                download
                className="press inline-flex items-center font-medium text-accent hover:underline underline-offset-4"
              >
                Download the CV (PDF)
                <span aria-hidden="true" className="ml-1">
                  &rsaquo;
                </span>
              </a>
            </>
          }
        >
          Where I&apos;ve put the work in.
        </SectionIntro>

        <div className="space-y-5">
          <Group title="Work experience">
            <ol>
              {work.map((job) => (
                <Row
                  key={job.org}
                  title={job.org}
                  sub={job.role}
                  side={
                    <>
                      <p className="text-ink">{job.period}</p>
                      <p>{job.place}</p>
                    </>
                  }
                >
                  <ul className="mt-4 space-y-2 text-[17px] leading-relaxed text-muted">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Row>
              ))}
            </ol>
          </Group>

          <div className="grid gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Group title="Achievements">
                <ol>
                  {achievements.map((a) => (
                    <Row key={a.title} title={a.title} side={<p className="text-ink">{a.date}</p>}>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.detail}</p>
                    </Row>
                  ))}
                </ol>
              </Group>
            </div>
            <div className="lg:col-span-2">
              <Group title="Certifications & training">
                <ol>
                  {training.map((t) => (
                    <Row key={t.title} title={t.title} side={<p className="text-ink">{t.date}</p>}>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.detail}</p>
                    </Row>
                  ))}
                </ol>
              </Group>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
