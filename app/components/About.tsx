import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";
import { siteConfig } from "../lib/site";

const facts = [
  { term: "Work", detail: `Full-stack developer, ${siteConfig.employer}` },
  { term: "Freelance", detail: "Flutter apps for clients" },
  { term: "Study", detail: `Computer Science, ${siteConfig.university}` },
  { term: "Based in", detail: `${siteConfig.address.locality}, ${siteConfig.address.region}` },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-4 sm:px-6 py-16 md:py-24">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeader id="about-heading" index="01" label="About">
          I turn complex requirements into software people actually enjoy
          using.
        </SectionHeader>

        <div className="grid gap-10 md:gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3 relative aspect-[4/5] w-full max-w-[16rem] md:max-w-none overflow-hidden rounded-md bg-surface">
            <Image
              src="/assets/images/profile.png"
              alt="Portrait of Hafiz Nazwa Nugraha"
              fill
              sizes="(max-width: 768px) 16rem, 18rem"
              className="object-cover object-top"
            />
          </div>

          <div className="md:col-span-8 lg:col-span-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a Computer Science student at{" "}
              <span className="text-ink">{siteConfig.university}</span> with
              hands-on experience shipping web and mobile applications for
              real clients.
            </p>
            <p>
              Most of my time goes into backend architecture, databases, and
              responsive interfaces. Outside client work I study machine
              learning and build side projects to keep learning.
            </p>
          </div>

          <dl className="md:col-span-12 lg:col-span-3 self-start text-sm divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div key={fact.term} className="py-3">
                <dt className="text-muted">{fact.term}</dt>
                <dd className="mt-0.5 text-ink font-medium">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </MotionWrapper>
    </section>
  );
}
