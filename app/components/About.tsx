import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import SectionIntro from "./SectionIntro";
import { siteConfig } from "../lib/site";

// Every figure comes from the CV or from the Work section on this page.
const facts = [
  { figure: "3.71", label: "GPA out of 4.00, Computer Science at Lambung Mangkurat University" },
  { figure: "1st", label: "Place at the Kavinya Digital Innovation Competition, June 2026" },
  { figure: "4", label: "Competition results: two podiums and two finalist spots" },
  { figure: "7", label: "Projects shown on this page, across web, mobile, and data" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-5 sm:px-6 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionIntro id="about-heading" eyebrow="About">
          Requirements in, working software out.
        </SectionIntro>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <MotionWrapper>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] bg-tile">
              <Image
                src="/assets/images/hafiz.jpg"
                alt="Portrait of Hafiz Nazwa Nugraha"
                fill
                sizes="(max-width: 768px) 24rem, 28rem"
                className="object-cover object-top"
              />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.08} className="space-y-5 text-[19px] leading-relaxed text-muted">
            <p>
              I&apos;m a Computer Science student at{" "}
              <span className="font-medium text-ink">{siteConfig.university}</span>, focused on backend
              engineering, system architecture, and data science.
            </p>
            <p>
              I&apos;ve shipped web and mobile apps for real clients and built the server side of several
              competition entries. Lately I&apos;ve been going deeper into machine learning and predictive
              modeling.
            </p>
            <p>
              Based in {siteConfig.address.locality}, {siteConfig.address.region}.
            </p>
          </MotionWrapper>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <li key={fact.label}>
              <MotionWrapper delay={i * 0.05} className="h-full rounded-[24px] bg-tile p-6">
                <p className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-ink">
                  {fact.figure}
                </p>
                <p className="mt-3 text-[15px] leading-snug text-muted">{fact.label}</p>
              </MotionWrapper>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
