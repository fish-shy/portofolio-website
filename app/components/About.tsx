"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import TiltCard from "./TiltCard";

export default function About() {
  return (
    <section id="about" className="py-24 relative px-6">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-green-600 dark:text-green-400 mb-5">
            <span className="h-px w-10 bg-green-500/50" />
            01 &middot; about
            <span className="h-px w-10 bg-green-500/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-2">
            Who I <span className="text-green-500">Am</span>
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Side */}
          <MotionWrapper direction="left" delay={0.2}>
            <div className="flex justify-center w-full" style={{ perspective: 1000 }}>
              <TiltCard
                intensity={20}
                lift={0}
                perspective={700}
                className="relative flex justify-center items-center w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem]"
              >
                {/* Soft depth halo behind the portrait */}
                <div
                  className="absolute w-[70%] h-[70%] rounded-full bg-green-500/20 blur-3xl"
                  style={{ transform: "translateZ(-40px)" }}
                />

                {/* Decorative ring */}
                <motion.div
                  className="absolute w-[90%] h-[90%] rounded-full border-2 border-dashed border-green-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ z: 20 }}
                />

                {/* Profile image container */}
                <motion.div
                  className="relative w-[75%] h-[75%] rounded-full overflow-hidden border-4 border-green-500 shadow-2xl shadow-green-500/20 bg-gray-100 dark:bg-gray-800 z-20 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ z: 50 }}
                >
                  <Image
                    src="/assets/images/profile.png"
                    alt="Hafiz Nazwa Nugraha"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -right-4 md:-right-6 top-16 md:top-20 bg-white dark:bg-[#111827] px-5 py-2.5 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 z-30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ z: 90 }}
                >
                  <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-100">👋 Hello!</span>
                </motion.div>

                <motion.div
                  className="absolute -left-6 md:-left-10 bottom-16 md:bottom-20 bg-white dark:bg-[#111827] px-5 py-2.5 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 z-30 flex items-center gap-3"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ z: 90 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-100">Open to work</span>
                </motion.div>
              </TiltCard>
            </div>
          </MotionWrapper>

          {/* Content Side */}
          <MotionWrapper direction="right" className="space-y-6">
            <div className="space-y-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I&apos;m a Computer Science student at{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  Universitas Lambung Mangkurat
                </span>{" "}
                with hands-on experience shipping web and mobile applications
                for real clients.
              </p>

              <p>
                My focus is on backend architecture, databases, and clean,
                responsive interfaces — turning complex requirements into
                software people actually enjoy using. Outside of client work,
                I explore machine learning and build side projects to keep
                learning.
              </p>
            </div>

            {/* CTA */}
            <motion.div className="pt-4">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Connect
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
