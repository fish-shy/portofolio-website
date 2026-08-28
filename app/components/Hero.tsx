"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const roles = [
  "Software Engineer",
  "Mobile Developer",
  "Full-Stack Developer",
  "Backend Developer",
];

const stats = [
  { value: "2024", label: "Building since" },
  { value: "7+", label: "Projects shipped" },
  { value: "16", label: "Technologies" },
];

const orbitTech = [
  { label: "gcloud", className: "-left-3 top-10 md:-left-6", delay: 0 },
  { label: "Next.js", className: "-right-3 top-1/3 md:-right-7", delay: 0.8 },
  { label: "flutter", className: "left-4 bottom-10 md:left-0", delay: 1.6 },
];

const socials = [
  { href: "https://github.com/fish-shy", icon: "github", label: "GitHub profile" },
  {
    href: "https://www.linkedin.com/in/hafiz-nazwa-nugraha/",
    icon: "linkedin",
    label: "LinkedIn profile",
  },
  { href: "mailto:HafizNugraha1311@gmail.com", icon: "email", label: "Email Hafiz" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Roles swap on a fixed cadence rather than typing out character by
  // character — no layout shift, and it reads calmer than a blinking caret.
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((prev) => (prev + 1) % roles.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      aria-labelledby="hero-heading"
      className="min-h-screen flex items-center relative overflow-hidden px-6 pt-32 pb-24 lg:pt-24 lg:pb-16"
    >
      {/* One soft directional wash behind the copy — the page-wide
          AnimatedBackground already carries the grain, grid and orbs. */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 left-[-10%] w-[46rem] h-[46rem] max-w-[90vw] rounded-full bg-green-500/10 dark:bg-green-500/[0.07] blur-[120px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="w-full max-w-6xl mx-auto relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center"
        >
          {/* ---------- Copy ---------- */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow — same mono/tracking language as the section headers */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3 font-mono text-[0.7rem] md:text-xs tracking-[0.3em] uppercase text-green-600 dark:text-green-400 mb-7"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for work
              <span className="hidden sm:inline h-px w-8 bg-green-500/40" />
              <span className="hidden sm:inline text-gray-400 dark:text-gray-500">
                Banjarmasin, ID
              </span>
            </motion.div>

            {/* Name — the loudest thing on the page. The fluid size keeps it on
                one line down to ~360px instead of hard-stacking "Nugraha" onto a
                ragged second line. */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="font-display font-bold tracking-[-0.045em] leading-[1.08] text-[clamp(1.8rem,5.2vw,3.5rem)] text-balance mb-6"
            >
              <span className="text-gray-900 dark:text-white">Hafiz Nazwa </span>
              <span className="gradient-text">Nugraha</span>
              <span className="sr-only"> — Software Engineer &amp; Mobile Developer</span>
            </motion.h1>

            {/* Rotating role — fixed height so nothing below it ever jumps */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4 mb-7"
            >
              <span className="hidden lg:block h-8 w-1 rounded-full bg-gradient-to-b from-green-400 to-emerald-600" />
              <div className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {/* Static copy for crawlers and screen readers; the animated
                    version beside it is decorative. */}
                <span className="sr-only">{roles.join(", ")}</span>
                <span aria-hidden="true" className="relative flex h-9 items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={roles[roleIndex]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
                      className="block whitespace-nowrap text-green-600 dark:text-green-400"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              I build{" "}
              <span className="text-gray-900 dark:text-gray-200 font-medium">
                high-performance APIs
              </span>{" "}
              and the{" "}
              <span className="text-gray-900 dark:text-gray-200 font-medium">
                web &amp; mobile interfaces
              </span>{" "}
              that sit on top of them — shipped end to end, from schema to screen.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <motion.a
                href="#contact"
                className="group w-full sm:w-auto bg-green-500 hover:bg-green-400 text-gray-950 font-semibold py-3.5 px-7 rounded-xl inline-flex items-center justify-center gap-2.5 shadow-lg shadow-green-500/20 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.985 }}
              >
                Get in touch
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <motion.a
                href="#projects"
                className="group w-full sm:w-auto border border-gray-300 dark:border-gray-700 hover:border-green-500/60 dark:hover:border-green-500/60 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold py-3.5 px-7 rounded-xl inline-flex items-center justify-center gap-2.5 transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.985 }}
              >
                View my work
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats and socials share one baseline strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pt-8 border-t border-gray-200/80 dark:border-gray-800"
            >
              <dl className="flex items-center gap-7">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-none">
                        {stat.value}
                      </span>
                      <span className="block mt-1.5 font-mono text-[0.62rem] tracking-[0.15em] uppercase text-gray-500 dark:text-gray-500">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="hidden sm:block h-10 w-px bg-gray-200 dark:bg-gray-800" />

              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <motion.a
                    key={social.icon}
                    href={social.href}
                    aria-label={social.label}
                    target={social.icon !== "email" ? "_blank" : undefined}
                    rel={social.icon !== "email" ? "me noopener noreferrer" : undefined}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/10 transition-colors duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0, scale: 0.94 }}
                  >
                    {social.icon === "github" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social.icon === "email" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ---------- Framed 3D scene ---------- */}
          <motion.div
            variants={itemVariants}
            aria-hidden="true"
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[26rem] aspect-square">
              {/* Glow sitting behind the frame */}
              <div className="absolute inset-6 rounded-full bg-green-500/20 dark:bg-green-500/15 blur-[70px]" />

              {/* The frame turns the scene into a deliberate object instead of
                  loose particles bleeding across the whole section. */}
              <div className="absolute inset-0 rounded-[2rem] border border-gray-200/80 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-xl shadow-green-500/5">
                <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[size:22px_22px] opacity-[0.06] dark:opacity-[0.09]" />
                <Hero3D />

                <span className="absolute bottom-4 left-5 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 dark:text-gray-500">
                  Move your cursor
                </span>
              </div>

              {/* Corner ticks */}
              {[
                "top-0 left-0 border-t-2 border-l-2 rounded-tl-[2rem]",
                "top-0 right-0 border-t-2 border-r-2 rounded-tr-[2rem]",
                "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[2rem]",
                "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[2rem]",
              ].map((corner) => (
                <span
                  key={corner}
                  className={`absolute w-10 h-10 border-green-500/50 ${corner}`}
                />
              ))}

              {/* Floating stack labels */}
              {orbitTech.map((tech) => (
                <motion.span
                  key={tech.label}
                  className={`absolute ${tech.className} px-3 py-1.5 rounded-lg bg-white/85 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 font-mono text-[0.65rem] tracking-wider text-gray-700 dark:text-gray-300 shadow-lg shadow-black/5`}
                  animate={{ y: [0, -9, 0] }}
                  transition={{
                    duration: 4.5,
                    delay: tech.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {tech.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to the about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative block h-12 w-px bg-gray-300 dark:bg-gray-700 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-green-500"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
