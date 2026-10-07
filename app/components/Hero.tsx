"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../lib/site";

export default function Hero() {
  const reduce = useReducedMotion();

  // The name is the one thing that moves on load; everything else is already there.
  // Always keep an animate target: the server renders the initial state, and
  // reduced motion only collapses the duration so the name still shows.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: "0.4em" },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
        <div className="lg:col-span-8">
          <p className="text-sm text-muted mb-6 md:mb-8">
            {siteConfig.address.locality}, Indonesia
            <span className="mx-2" aria-hidden="true">/</span>
            Open to work
          </p>

          <h1
            id="hero-heading"
            className="font-display font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(2.75rem,10vw,7rem)]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...rise(0.05)}>
                Hafiz Nazwa
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-accent" {...rise(0.18)}>
                Nugraha
              </motion.span>
            </span>
            <span className="sr-only">, {siteConfig.headline}</span>
          </h1>

          <p className="mt-8 md:mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-ink">
            I build web and mobile apps end to end, from the database schema to
            the screen people tap.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Full-stack developer at {siteConfig.employer} and Computer Science
            student at {siteConfig.university}.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center min-h-12 px-6 rounded-md bg-accent text-on-accent font-semibold hover:opacity-90 transition-opacity"
            >
              Email me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center min-h-12 px-6 rounded-md border border-field-line text-ink font-semibold hover:bg-surface transition-colors"
            >
              See my work
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
            <Image
              src="/assets/images/profile.png"
              alt="Portrait of Hafiz Nazwa Nugraha"
              fill
              priority
              sizes="(max-width: 640px) 20rem, (max-width: 1024px) 24rem, 22rem"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
