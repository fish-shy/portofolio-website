"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../lib/site";

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  // Without WebGL the glow stays and the text carries the hero on its own.
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: () => null });

export default function Hero() {
  const reduce = useReducedMotion();

  // Always keep an animate target: the server renders the initial state, and
  // reduced motion swaps the rise for a short cross-fade.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0.2 } : { type: "spring" as const, bounce: 0, duration: 0.9, delay },
  });

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden px-5 sm:px-6 pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p {...rise(0)} className="text-lg md:text-xl font-semibold text-accent">
          {siteConfig.headline}
        </motion.p>
        <motion.h1
          {...rise(0.06)}
          id="hero-heading"
          className="mt-3 font-display font-bold tracking-[-0.045em] leading-[0.98] text-[clamp(3rem,10vw,7.5rem)] text-balance text-ink"
        >
          Hafiz Nazwa Nugraha.
        </motion.h1>
        <motion.p
          {...rise(0.14)}
          className="mx-auto mt-6 max-w-2xl text-xl md:text-2xl leading-snug tracking-[-0.01em] text-muted text-balance"
        >
          I build web and mobile apps end to end, from the database schema to the screen people tap.
        </motion.p>
        <motion.div {...rise(0.22)} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href="#projects"
            className="press inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-[17px] font-medium text-on-accent hover:opacity-90"
          >
            See my work
          </a>
          <a href={`mailto:${siteConfig.email}`} className="press inline-flex min-h-12 items-center text-[17px] font-medium text-accent hover:underline underline-offset-4">
            Email me
            <span aria-hidden="true" className="ml-1">
              &rsaquo;
            </span>
          </a>
        </motion.div>
      </div>

      <div aria-hidden="true" className="relative mx-auto mt-4 h-[22rem] max-w-5xl sm:h-[30rem] md:h-[36rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_22%,transparent),transparent)]" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduce ? { duration: 0.3 } : { type: "spring", bounce: 0, duration: 1.4, delay: 0.25 }}
        >
          <WebGLBoundary>
            <Hero3D />
          </WebGLBoundary>
        </motion.div>
      </div>
    </section>
  );
}
