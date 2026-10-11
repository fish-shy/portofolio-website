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
  // reduced motion only collapses the duration so the content still shows.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-4 sm:px-6 pt-20 pb-14 lg:py-0"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:min-h-[100dvh] lg:grid-cols-12 lg:gap-4">
        {/* Stage: abstract 3D shapes. Comes first on phones so the 3D is on the first screen. */}
        <div className="relative lg:order-2 lg:col-span-7">
          <div className="relative mx-auto h-[min(56svh,26rem)] w-full max-w-[34rem] sm:h-[34rem] lg:h-[min(46rem,90dvh)] lg:max-w-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-accent/15 blur-[90px]"
            />
            {/* Fade the canvas edges so shapes drifting out of frame dissolve instead of clipping. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -mx-4 sm:mx-0"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 78%, transparent 100%), linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 78%, transparent 100%), linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <WebGLBoundary>
                <Hero3D />
              </WebGLBoundary>
            </div>
          </div>
        </div>

        <div className="relative z-10 lg:order-1 lg:col-span-5 lg:py-32">
          <h1
            id="hero-heading"
            className="font-display font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(2.9rem,7vw,5.25rem)]"
          >
            <motion.span className="block" {...rise(0.08)}>
              Hafiz Nazwa
            </motion.span>
            <motion.span className="block text-accent" {...rise(0.16)}>
              Nugraha
            </motion.span>
          </h1>

          <motion.p {...rise(0.24)} className="mt-6 font-display text-xl md:text-2xl font-medium tracking-[-0.02em] text-ink">
            {siteConfig.headline}
          </motion.p>

          <motion.p {...rise(0.3)} className="mt-4 max-w-md text-base md:text-lg leading-relaxed text-muted">
            I build web and mobile apps end to end, from the database schema to
            the screen people tap. Computer Science student at{" "}
            {siteConfig.university}, based in {siteConfig.address.locality},
            Indonesia.
          </motion.p>

          <motion.div {...rise(0.36)} className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center min-h-12 px-6 rounded-xl bg-ink text-paper font-semibold hover:opacity-90 transition-opacity"
            >
              See my work
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center min-h-12 px-6 rounded-xl border border-field-line text-ink font-semibold hover:bg-surface transition-colors"
            >
              Email me
            </a>
          </motion.div>

          <motion.p {...rise(0.42)} className="mt-8 text-sm text-muted">
            Open to freelance and full-time work.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
