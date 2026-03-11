"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const roles = [
  "Software Engineer",
  "Mobile Developer",
  "Full-Stack Developer",
  "Web3 Enthusiast",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-32 md:pt-0"
    >
      {/* Background Design */}
      <div className="absolute inset-0 pointer-events-none -z-10 flexItems-center justify-center">
        {/* Subtle faint dotted grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] dark:bg-[radial-gradient(#22c55e_1px,transparent_1px)] opacity-[0.03] dark:opacity-[0.07] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />

        {/* Ambient green glowing center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-green-500/20 dark:bg-green-500/10 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary soft orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-emerald-400/20 dark:bg-emerald-400/10 blur-[80px] rounded-full"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Little floating particles */}
        {[
          { size: 6, top: "20%", left: "15%", dur: 5, delay: 0.5 },
          { size: 8, top: "60%", left: "80%", dur: 6, delay: 1.2 },
          { size: 5, top: "80%", left: "30%", dur: 4, delay: 0.8 },
          { size: 7, top: "30%", left: "70%", dur: 7, delay: 0.3 },
          { size: 9, top: "45%", left: "55%", dur: 5, delay: 1.5 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-500/30 dark:bg-green-400/20 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            style={{
              width: particle.size + "px",
              height: particle.size + "px",
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="text-gray-900 dark:text-white">Hi, I&apos;m </span>
              <span className="relative">
                <span className="text-green-500">Hafiz</span>
              </span>
            </h1>
          </motion.div>

          {/* Typing animation */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400">
                {displayText}
              </span>
              <motion.span
                className="inline-block w-1 h-8 md:h-10 bg-green-500 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Computer Science student focused on building{" "}
            <span className="text-green-600 dark:text-green-400 font-medium">
              high-performance
            </span>{" "}
            APIs and databases, paired with{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              intuitive
            </span>{" "}
            digital experiences using modern web and mobile tech.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
          >
            <motion.a
              href="#contact"
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg shadow-green-500/25 border border-green-400/20"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <motion.svg
                className="w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#projects"
              className="group relative bg-white/80 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-bold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-3 hover:border-green-500/50 dark:hover:border-green-500/50 hover:bg-green-50/50 dark:hover:bg-green-500/10 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.svg
                className="w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center gap-5 mb-20">
            {[
              { href: "https://github.com/fish-shy", icon: "github" },
              { href: "https://linkedin.com/in/hafiz-nazwa-nugraha", icon: "linkedin" },
              { href: "mailto:HafizNugraha1311@gmail.com", icon: "email" },
            ].map((social, index) => (
              <motion.a
                key={social.icon}
                href={social.href}
                target={social.icon !== "email" ? "_blank" : undefined}
                rel={social.icon !== "email" ? "noopener noreferrer" : undefined}
                className="group relative w-14 h-14 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/40 backdrop-blur-md text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/50 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/50 dark:hover:border-green-500/50 hover:bg-green-50/50 dark:hover:bg-green-500/10 transition-all duration-300 shadow-sm"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.15)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {social.icon === "github" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                )}
                {social.icon === "linkedin" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {social.icon === "email" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                )}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-0.4 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
