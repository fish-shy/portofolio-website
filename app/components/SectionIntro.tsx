import type { ReactNode } from "react";
import MotionWrapper from "./MotionWrapper";

interface SectionIntroProps {
  id: string;
  eyebrow: string;
  children: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
}

/** Section opener: a small accent label, a large tightly tracked title, and an optional lede. */
export default function SectionIntro({ id, eyebrow, children, lede, align = "center" }: SectionIntroProps) {
  const centered = align === "center";
  return (
    <MotionWrapper className={`mb-12 md:mb-16 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      <p className="text-base md:text-lg font-semibold text-accent">{eyebrow}</p>
      <h2
        id={id}
        className="mt-2 font-display font-semibold tracking-[-0.03em] leading-[1.05] text-[clamp(2.1rem,5.2vw,3.75rem)] text-balance text-ink"
      >
        {children}
      </h2>
      {lede && (
        <p className={`mt-5 text-lg md:text-xl leading-relaxed text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {lede}
        </p>
      )}
    </MotionWrapper>
  );
}
