"use client";

import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import TiltCard from "./TiltCard";

export default function Experience() {
  const experiences = [
    {
      title: "Full-stack Developer",
      company: "RuangAlgo.com - IT Solutions",
      period: "12/2024 - Present",
      description: "Developing and maintaining client/corporate websites and mobile applications.",
      achievements: [
        "Develop and maintain client and corporate websites using Nuxt.js and WordPress",
        "Develop and maintain corporate mobile applications",
        "Collaborate with UI/UX teams to translate designs into interactive and responsive interfaces",
        "Perform QA testing, debugging, and performance optimization",
      ],
    },
    {
      title: "Freelance Mobile Developer",
      company: "Freelance",
      period: "09/2025 - Present",
      description: "Developing mobile applications according to client requirements using Flutter.",
      achievements: [
        "Develop mobile applications according to client requirements using Flutter",
        "Design UI/UX, database structures, and application workflows",
        "Conduct testing and application refinement based on user evaluation results",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative px-6">
      <div className="max-w-5xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-green-600 dark:text-green-400 mb-5">
            <span className="h-px w-10 bg-green-500/50" />
            03 &middot; experience
            <span className="h-px w-10 bg-green-500/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and the impact I have made
          </p>
        </MotionWrapper>

        <div className="relative space-y-10 pl-6 md:pl-10" style={{ perspective: 1300 }}>
          {/* Gradient timeline spine */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-green-500 via-emerald-500/60 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 60, rotateX: -14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Timeline node */}
              <motion.div
                className="absolute -left-[1.65rem] md:-left-[2.65rem] top-8 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 ring-4 ring-white dark:ring-slate-950 shadow-lg shadow-green-500/40 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.25, type: "spring", stiffness: 400, damping: 14 }}
              >
                <span className="absolute inset-0 rounded-full bg-green-400/60 animate-ping" />
              </motion.div>

              <TiltCard
                glare
                intensity={14}
                lift={10}
                perspective={1100}
                className="group relative overflow-hidden rounded-3xl p-8 md:p-9 bg-white/90 dark:bg-slate-900/80 border border-gray-200/70 dark:border-white/10 shadow-xl shadow-gray-300/30 dark:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)] hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-[box-shadow,border-color] duration-300 [will-change:transform]"
              >
                {/* Corner glow + huge ghost index for depth */}
                <div className="absolute -top-20 -right-16 w-56 h-56 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full blur-3xl" />
                <span
                  className="pointer-events-none absolute -top-4 right-4 text-8xl font-black text-green-500/10 dark:text-green-400/10 select-none"
                  style={{ transform: "translateZ(20px)" }}
                >
                  0{index + 1}
                </span>

                {/* Header */}
                <div
                  className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5"
                  style={{ transform: "translateZ(70px)" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{exp.title}</h3>
                      <p className="text-green-600 dark:text-green-400 font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center self-start text-sm text-gray-700 dark:text-gray-200 font-medium px-4 py-1.5 rounded-full bg-green-50 dark:bg-white/5 border border-green-200/70 dark:border-white/10 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p
                  className="relative text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  style={{ transform: "translateZ(45px)" }}
                >
                  {exp.description}
                </p>

                <ul className="relative grid sm:grid-cols-2 gap-x-6 gap-y-3" style={{ transform: "translateZ(30px)" }}>
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
