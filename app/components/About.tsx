import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";
import { siteConfig } from "../lib/site";

const facts = [
  { term: "Work", detail: `Full-stack developer, ${siteConfig.employer}` },
  { term: "Freelance", detail: "Flutter apps for clients" },
  { term: "Study", detail: `Computer Science, ${siteConfig.university}` },
  { term: "Based in", detail: `${siteConfig.address.locality}, ${siteConfig.address.region}` },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-4 sm:px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper>
          <SectionHeader id="about-heading" index="01" label="About">
            I turn complex requirements into software people actually enjoy
            using.
          </SectionHeader>
        </MotionWrapper>

        <div className="grid gap-10 lg:gap-16 md:grid-cols-12 md:items-center">
          <MotionWrapper className="md:col-span-5">
            <div className="relative mx-auto max-w-[22rem]" style={{ perspective: 1200 }}>
              {/* Offset plate behind the photo gives the tilt a visible back layer. */}
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-accent/60" />
              <TiltCard intensity={10}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/assets/images/profile.png"
                    alt="Portrait of Hafiz Nazwa Nugraha"
                    fill
                    sizes="(max-width: 768px) 22rem, 26rem"
                    className="object-cover object-top"
                  />
                </div>
              </TiltCard>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1} className="md:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m a Computer Science student at{" "}
                <span className="text-ink font-medium">{siteConfig.university}</span>{" "}
                with hands-on experience shipping web and mobile applications
                for real clients.
              </p>
              <p>
                Most of my time goes into backend architecture, databases, and
                responsive interfaces. Outside client work I study machine
                learning and build side projects to keep learning.
              </p>
            </div>

            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.term} className="rounded-2xl border border-line bg-surface px-5 py-4">
                  <dt className="text-sm text-muted">{fact.term}</dt>
                  <dd className="mt-1 font-medium text-ink">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
