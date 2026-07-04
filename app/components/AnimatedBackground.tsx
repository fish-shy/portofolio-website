"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newParticles: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base wash so dark mode reads as one deep space, not stacked bands */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(16,185,129,0.10),transparent_60%)]" />

      {/* Film grain — breaks up the flat gradients so the page feels printed, not rendered */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Continuous dotted texture — the connective tissue across every section */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.035] dark:opacity-[0.06]" />

      {/* Subtle drifting grid lines, uniform (no hard fade edges) */}
      <motion.div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        animate={{ backgroundPosition: ["0px 0px", "52px 52px"] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Ambient gradient orbs at staggered depths */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)",
          top: "8%",
          left: "8%",
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full opacity-20 dark:opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
          top: "45%",
          right: "10%",
        }}
        animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[460px] h-[460px] rounded-full opacity-20 dark:opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, transparent 70%)",
          bottom: "6%",
          left: "20%",
        }}
        animate={{ x: [0, 70, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-green-500/40 dark:bg-green-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: "0 0 10px 2px rgba(34, 197, 94, 0.3)",
          }}
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
