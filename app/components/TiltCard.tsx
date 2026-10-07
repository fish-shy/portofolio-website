"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees toward the cursor. */
  intensity?: number;
}

/**
 * Tilts a screenshot toward the cursor so it reads as the same physical sheet
 * as the hero's 3D stack. Springs back flat on leave; off for reduced motion.
 */
export default function TiltCard({ children, className, intensity = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 20 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * intensity);
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * intensity);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
