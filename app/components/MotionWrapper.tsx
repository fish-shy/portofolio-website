"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Each block rises in once as it enters the viewport on a critically damped
 * spring (no overshoot). With reduced motion it only cross-fades.
 */
export default function MotionWrapper({ children, className = "", delay = 0 }: MotionWrapperProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0.2 } : { type: "spring", bounce: 0, duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}
