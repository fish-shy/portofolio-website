"use client";

import { useEffect, useMemo, useRef } from "react";

type Item = { label: string; core: boolean };

/**
 * The full stack laid out on a sphere with CSS 3D, so labels stay crisp text.
 * It turns slowly on its own, follows a drag, and stops off screen. The list
 * beside it carries the same content for screen readers, so this is aria-hidden.
 */
export default function SkillGlobe({ items }: { items: Item[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);

  // Even spread over the sphere (Fibonacci lattice).
  const points = useMemo(() => {
    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, [items]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rotX = -0.35;
    let rotY = 0;
    let velX = 0;
    let velY = reduce ? 0 : 0.0035;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let frame = 0;

    const draw = () => {
      const radius = el.clientWidth * 0.36;
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      points.forEach((p, i) => {
        const node = nodes.current[i];
        if (!node) return;
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2;
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, ${z2 * radius}px) scale(${0.7 + depth * 0.45})`;
        node.style.opacity = String(0.25 + depth * 0.75);
        node.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const tick = () => {
      if (!dragging) {
        rotY += velY;
        rotX += velX;
        velX *= 0.95;
        if (!reduce) velY += (0.0035 - velY) * 0.02;
      }
      draw();
      if (visible && !reduce) frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.006;
      velX = -(e.clientY - lastY) * 0.006;
      rotY += velY;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
      lastX = e.clientX;
      lastY = e.clientY;
      if (reduce) draw();
    };
    const onUp = () => {
      dragging = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) tick();
    });

    draw();
    io.observe(el);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    const onResize = () => draw();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [points]);

  return (
    <div
      ref={stage}
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[30rem] mx-auto select-none cursor-grab active:cursor-grabbing touch-pan-y"
      style={{ perspective: "900px" }}
    >
      <div className="absolute inset-[12%] rounded-full border border-line" />
      <div className="absolute inset-[30%] rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, i) => (
          <span
            key={item.label}
            ref={(n) => {
              nodes.current[i] = n;
            }}
            className={`absolute left-0 top-0 whitespace-nowrap rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs sm:text-sm will-change-transform ${
              item.core
                ? "bg-ink text-paper font-semibold"
                : "bg-surface text-ink border border-line font-medium"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
