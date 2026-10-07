import type { ReactNode } from "react";

interface SectionHeaderProps {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}

/** The numbered hairline header every section opens with. */
export default function SectionHeader({ id, index, label, children }: SectionHeaderProps) {
  return (
    <header className="border-t border-line pt-6 mb-12 md:mb-16 grid gap-4 md:grid-cols-12">
      <p className="md:col-span-3 text-sm text-muted">
        <span className="font-mono text-accent">{index}</span>
        <span className="mx-2" aria-hidden="true">/</span>
        {label}
      </p>
      <h2
        id={id}
        className="md:col-span-9 font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(1.75rem,4vw,3rem)] text-balance"
      >
        {children}
      </h2>
    </header>
  );
}
