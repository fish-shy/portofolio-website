"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${nextTheme} theme` : "Toggle theme"}
      className="press w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-full text-muted hover:text-ink"
    >
      {mounted && theme === "dark" ? (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.35 15.35A9 9 0 0 1 8.65 3.65 9 9 0 1 0 20.35 15.35z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const reduce = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const ids = navigationLinks.map((link) => link.href.slice(1));
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
      // The section whose top has passed under the bar is the current one.
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 96) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const solid = scrolled || isMenuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-colors duration-300 ${solid ? "material" : "bg-transparent"}`}>
        <nav aria-label="Main" className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-6 px-5 sm:px-6">
          {/* Wordmark: the name plus the blue dot from the logo mark. */}
          <a href="#home" className="press -ml-1 inline-flex min-h-11 items-center px-1 text-[21px] font-bold tracking-[-0.03em] text-ink">
            Hafiz<span className="text-accent">.</span>
            <span className="sr-only"> Back to top</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`px-3 py-2 text-[13px] transition-colors ${active ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {link.label}
                </a>
              );
            })}
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="press -mr-2 h-11 px-3 text-[15px] font-medium text-ink"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </div>

      {/* Scroll edge: a soft fade where content meets the bar, instead of a hard divider. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none h-3 bg-gradient-to-b from-[var(--chrome)] to-transparent transition-opacity duration-300 ${
          scrolled && !isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="material absolute inset-x-0 top-12 md:hidden"
            style={{ transformOrigin: "top" }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={reduce ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.35 }}
          >
            <ul className="mx-auto max-w-5xl px-5 pb-6 pt-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-[28px] font-semibold tracking-[-0.02em] text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
