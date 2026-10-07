"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../lib/site";

// Shown while three.js loads, and kept if the browser has no WebGL.
function StaticScreens() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[78%] aspect-[16/9] rounded-md border border-line overflow-hidden -rotate-3 bg-surface">
        <Image
          src="/assets/images/smartcal.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 80vw, 36rem"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticScreens /> : this.props.children;
  }
}

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: StaticScreens });

export default function Hero() {
  const reduce = useReducedMotion();

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
      className="px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-muted mb-6 md:mb-8">
          {siteConfig.address.locality}, Indonesia
          <span className="mx-2" aria-hidden="true">/</span>
          Open to work
        </p>

        <h1
          id="hero-heading"
          className="relative z-10 font-display font-semibold tracking-[-0.05em] leading-[0.92] text-[clamp(3rem,11.5vw,9rem)]"
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

        <div className="mt-10 md:mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 relative z-10">
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-ink">
              I build web and mobile apps end to end, from the database schema
              to the screen people tap.
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

          <figure className="lg:col-span-7 lg:-mt-40">
            <div aria-hidden="true" className="relative h-[18rem] sm:h-[26rem] lg:h-[31rem]">
              <WebGLBoundary>
                <Hero3D />
              </WebGLBoundary>
            </div>
            <figcaption className="mt-1 text-sm text-muted lg:text-right">
              Screens from SmartCal, Village Budget Monitoring System and CLINICALgo.{" "}
              <a href="#projects" className="text-ink underline decoration-1 underline-offset-4 hover:text-accent">
                See them in Work
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
