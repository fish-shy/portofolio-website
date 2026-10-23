"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to the card under it as --x and --y, for the .spotlight hover in
 * globals.css. One listener for the whole page, so the cards themselves stay server components.
 * Inside a [data-spotlight-zone] (a project row), the zone is the hover target and the
 * .spotlight inside it is what lights up, so its edge turns toward the pointer from anywhere in the row.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = last.target as Element | null;
      const zone = target?.closest?.("[data-spotlight-zone]");
      const card = (zone ? zone.querySelector(".spotlight") : target?.closest?.(".spotlight")) as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${last.clientX - r.left}px`);
      card.style.setProperty("--y", `${last.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
