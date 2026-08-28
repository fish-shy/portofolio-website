"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import MotionWrapper from "./MotionWrapper";
import TiltCard from "./TiltCard";

type SkillGroup = {
  title: string;
  blurb: string;
  icon: ReactNode;
  /** Headline skills — rendered as accented chips. */
  core: string[];
  /** Supporting skills — rendered as muted chips. */
  rest: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Responsive interfaces built to stay fast.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
    core: ["React/Next.js", "TypeScript", "Tailwind CSS"],
    rest: ["JavaScript", "Nuxt.js", "Vue.js", "Redux", "HTML5/CSS3", "State Management", "Responsive Design"],
  },
  {
    title: "Backend & Database",
    blurb: "APIs and data models that hold up in production.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    ),
    core: ["Node.js", "Express.js", "PostgreSQL"],
    rest: ["Prisma", "MongoDB", "REST API", "Firebase", "Python", "Java"],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Deploying and keeping things running.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    ),
    core: ["GCP", "AWS", "CI/CD"],
    rest: ["Git/GitHub", "Vercel", "Supabase"],
  }
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 relative px-6">
      {/* Ambient glow, unclipped so it bleeds into neighboring sections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full h-[400px] bg-green-500/10 dark:bg-green-500/12 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-green-600 dark:text-green-400 mb-5">
            <span className="h-px w-10 bg-green-500/50" />
            02 &middot; stack
            <span className="h-px w-10 bg-green-500/50" />
          </span>
          <h2 id="skills-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Skills & <span className="gradient-text">Toolbox</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The technologies I reach for most, grouped by the part of the product
            they build
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1300 }}>
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard
                glare
                intensity={10}
                lift={8}
                perspective={1100}
                className="group relative h-full overflow-hidden rounded-3xl p-7 bg-white/90 dark:bg-slate-900/80 border border-gray-200/70 dark:border-white/10 shadow-xl shadow-gray-300/30 dark:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)] hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-[box-shadow,border-color] duration-300 [will-change:transform]"
              >
                {/* Corner glow for depth */}
                <div className="absolute -top-20 -right-16 w-48 h-48 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative flex items-start gap-4 mb-5" style={{ transform: "translateZ(60px)" }}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {group.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                      {group.blurb}
                    </p>
                  </div>
                </div>

                <ul className="relative flex flex-wrap gap-2" style={{ transform: "translateZ(35px)" }}>
                  {group.core.map((skill) => (
                    <li
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/30"
                    >
                      {skill}
                    </li>
                  ))}
                  {group.rest.map((skill) => (
                    <li
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-full font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200/70 dark:border-white/10"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
