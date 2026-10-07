"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
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
      className="w-11 h-11 inline-flex items-center justify-center rounded-md text-muted hover:text-ink border border-line hover:border-field-line transition-colors"
    >
      {mounted && theme === "dark" ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.35 15.35A9 9 0 0 1 8.65 3.65 9 9 0 1 0 20.35 15.35z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const ids = navigationLinks.map((link) => link.href.slice(1)).reverse();
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top <= 120 : false;
      });
      setActiveSection(current ?? "");
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

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3"
    >
      {/* The bar is the page's one frosted surface: content scrolls underneath it. */}
      <nav
        aria-label="Main"
        className={`max-w-6xl mx-auto rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || isMenuOpen
            ? "bg-paper/80 backdrop-blur-md border-line shadow-[0_10px_30px_-20px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="h-14 px-3 sm:px-4 flex items-center justify-between gap-6">
          <a href="#home" className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
            Hafiz Nazwa
            <span className="sr-only"> (back to top)</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`px-3 py-2 text-[0.95rem] rounded-md transition-colors ${
                    active ? "text-ink font-medium" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <span className="w-px h-6 bg-line mx-3" aria-hidden="true" />
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="h-11 px-4 inline-flex items-center rounded-md border border-line hover:border-field-line text-sm font-medium text-ink transition-colors"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-paper border border-line shadow-[0_10px_30px_-20px_rgba(0,0,0,0.4)]"
          >
            <div className="px-4">
              <ul className="py-2">
                {navigationLinks.map((link) => (
                  <li key={link.href} className="border-b border-line last:border-b-0">
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center min-h-12 font-display text-xl font-medium text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
