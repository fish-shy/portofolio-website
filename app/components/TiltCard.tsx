"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees toward the cursor. */
  intensity?: number;
  /** How far the card lifts on hover, in px. */
  lift?: number;
  /** Render a soft light glare that follows the cursor. */
  glare?: boolean;
  /** Cast a directional shadow that slides opposite the tilt (use on solid cards). */
  shadow?: boolean;
  /** Perspective distance — smaller = more dramatic depth. */
  perspective?: number;
  style?: MotionStyle;
}

/**
 * A cursor-following 3D tilt wrapper. Springs back to flat on leave and
 * respects prefers-reduced-motion. Children can be pushed forward/back with
 * `style={{ z: 40 }}` for parallax depth (this element is preserve-3d).
 */
export default function TiltCard({
  children,
  className,
  intensity = 12,
  lift = 10,
  glare = false,
  shadow = false,
  perspective = 800,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const rotateX = useSpring(rx, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 18 });

  // Ease the glare in/out so it never snaps to a hard white flash.
  const glare_ = useSpring(glareOpacity, { stiffness: 160, damping: 26 });
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(190,255,220,0.22), rgba(255,255,255,0) 60%)`;

  // Shadow slides opposite the tilt, so the card reads as physically lifting.
  const shadowX = useTransform(rotateY, (v) => -v * 1.6);
  const shadowY = useTransform(rotateX, (v) => v * 1.6 + 22);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 45px -14px rgba(0, 0, 0, 0.4), 0 0 36px -14px rgba(16, 185, 129, 0.3)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * intensity);
    rx.set(-py * intensity * 0.85);
    gx.set(((e.clientX - rect.left) / rect.width) * 100);
    gy.set(((e.clientY - rect.top) / rect.height) * 100);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
        ...(shadow ? { boxShadow } : {}),
        ...style,
      }}
      whileHover={reduce ? undefined : { y: -lift, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ opacity: glare_, background: glareBg }}
        />
      )}
    </motion.div>
  );
}
