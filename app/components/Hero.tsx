"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../lib/site";

const SCREENS = [
  { title: "SmartCal", src: "/assets/images/smartcal.png" },
  { title: "Village Budget", src: "/assets/images/sipandai.png" },
  { title: "CLINICALgo", src: "/assets/images/clinicalgo.png" },
];

// Shown while three.js loads, and kept if the browser has no WebGL.
function StaticScreen({ active = 0 }: { active?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[80%] aspect-[16/10] rounded-xl border-[6px] border-[#0f1211] overflow-hidden bg-surface shadow-2xl">
        <Image
          src={SCREENS[active].src}
          alt=""
          fill
          sizes="(max-width: 1024px) 80vw, 40rem"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: () => <StaticScreen /> });

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Cycle the laptop screen through the three web projects until the visitor picks one.
  useEffect(() => {
    if (pinned || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SCREENS.length), 5000);
    return () => clearInterval(id);
  }, [pinned, reduce]);

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
      className="relative px-4 sm:px-6 pt-28 pb-16 lg:pt-32 lg:pb-20 lg:min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* One soft wash in the accent colour, behind the devices only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[42rem] w-[42rem] max-w-[100vw] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative w-full max-w-6xl mx-auto grid gap-8 lg:grid-cols-12 lg:gap-6 items-center">
        <div className="lg:col-span-5 relative z-10">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 text-sm text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {siteConfig.address.locality}, Indonesia
          </motion.p>

          <h1
            id="hero-heading"
            className="mt-6 font-display font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(2.9rem,7vw,5.5rem)]"
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
            the screen people tap. Full-stack developer at {siteConfig.employer}.
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

          <motion.p {...rise(0.42)} className="mt-9 text-sm text-muted">
            Open to freelance and full-time work.
          </motion.p>
        </div>

        <div className="lg:col-span-7">
          <div aria-hidden="true" className="relative h-[20rem] sm:h-[28rem] lg:h-[36rem] -mx-4 sm:mx-0">
            <WebGLBoundary fallback={<StaticScreen active={active} />}>
              <Hero3D active={active} />
            </WebGLBoundary>
          </div>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <p className="text-sm text-muted text-center" id="screen-picker-label">
              On the screen:
            </p>
            <div role="group" aria-labelledby="screen-picker-label" className="flex justify-center gap-1 rounded-xl border border-line bg-surface/70 p-1">
              {SCREENS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => {
                    setActive(i);
                    setPinned(true);
                  }}
                  className={`min-h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                    active === i ? "bg-ink text-paper" : "text-muted hover:text-ink"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 hidden lg:block text-center text-xs text-muted">Drag the devices to turn them.</p>
        </div>
      </div>
    </section>
  );
}
