"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MotionWrapper, { StaggerWrapper, StaggerItem } from "./MotionWrapper";

export default function About() {


  return (
    <section id="about" className="py-24 relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-50/30 to-transparent dark:via-green-900/5 -z-10" />

      <div className="max-w-6xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <motion.span
            className="inline-block text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30"
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Who I <span className="text-green-500">Am</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full" />
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Side */}
          <MotionWrapper direction="left" delay={0.2}>
            <div className="flex justify-center w-full">
              <div className="relative flex justify-center items-center w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem]">
                {/* Decorative ring */}
                <motion.div
                  className="absolute w-[90%] h-[90%] rounded-full border-2 border-dashed border-green-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Profile image container */}
                <motion.div
                  className="relative w-[75%] h-[75%] rounded-full overflow-hidden border-4 border-green-500 shadow-2xl shadow-green-500/20 bg-gray-100 dark:bg-gray-800 z-20 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Image
                    src="/assets/images/profile.png"
                    alt="Profile photo"
                    fill
                    className="object-cover"
                    priority
                  />
                  <span className="text-gray-400 dark:text-gray-500 text-sm z-[-1]">Profile Image</span>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -right-4 md:-right-6 top-16 md:top-20 bg-white dark:bg-[#111827] px-5 py-2.5 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 z-30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-100">👋 Hello!</span>
                </motion.div>

                <motion.div
                  className="absolute -left-6 md:-left-10 bottom-16 md:bottom-20 bg-white dark:bg-[#111827] px-5 py-2.5 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 z-30 flex items-center gap-3"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-100">Open to work</span>
                </motion.div>
              </div>
            </div>
          </MotionWrapper>

          {/* Content Side */}
          <MotionWrapper direction="right" className="space-y-6">
            <div className="space-y-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Hey there!  I&apos;m a CS student at{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  Universitas Lambung Mangkurat
                </span>
                . I run on coffee and a passion for building robust systems and cool digital experiences! 
              </p>

              <p>
                Whether it&apos;s architecting solid backend logic, managing databases, or bringing it all together with sleek mobile apps, I love turning complex ideas into reality. When I&apos;m not coding, I&apos;m probably exploring new tech or just enjoying a good game.
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
