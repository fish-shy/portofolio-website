"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";

interface ScrollScreenProps {
  src: string;
  alt: string;
  /** Shown in the address bar: the real host, or a note that there is none. */
  address: string;
  /** Which way the screen leans before it settles; alternates down the page. */
  side: "left" | "right";
  /** CSS aspect-ratio of the screenshot area; match the image to avoid cropping. */
  aspect?: string;
}

/**
 * A screenshot in a browser frame that starts tipped back in 3D and stands up
 * flat as it scrolls into the middle of the viewport.
 */
export default function ScrollScreen({ src, alt, address, side, aspect = "16 / 10" }: ScrollScreenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 24, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : side === "left" ? 14 : -14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1]);

  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, rotateY, scale, transformOrigin: "center bottom" }}>
        <TiltCard>
          <div className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex-1 truncate rounded-md bg-paper px-3 py-1 text-center text-xs text-muted">
                {address}
              </span>
            </div>
            <div className="relative" style={{ aspectRatio: aspect }}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40rem"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}
