"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useAppStore } from "@/lib/store";

/**
 * A two-part custom cursor: a precise dot and a trailing ring that morphs by
 * variant. Pointer-position is driven with gsap.quickTo (no React re-renders).
 * Falls back to the native cursor on touch / coarse pointers.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const variant = useAppStore((s) => s.cursorVariant);
  const label = useAppStore((s) => s.cursorLabel);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const leave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // Morph the ring per variant.
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!ring || !dot || !labelEl) return;

    const config: Record<string, { scale: number; border: string; bg: string; dot: number }> = {
      default: { scale: 1, border: "rgba(46,43,115,0.5)", bg: "transparent", dot: 1 },
      hover: { scale: 1.8, border: "rgba(46,43,115,0.9)", bg: "rgba(46,43,115,0.08)", dot: 0 },
      view: { scale: 3.6, border: "rgba(46,43,115,0)", bg: "rgba(46,43,115,0.95)", dot: 0 },
      drag: { scale: 3.6, border: "rgba(46,43,115,0)", bg: "rgba(46,43,115,0.95)", dot: 0 },
      text: { scale: 0.6, border: "rgba(46,43,115,0.9)", bg: "transparent", dot: 0 },
    };
    const c = config[variant] ?? config.default;

    gsap.to(ring, {
      scale: c.scale,
      borderColor: c.border,
      backgroundColor: c.bg,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(dot, { opacity: c.dot, duration: 0.3 });
    gsap.to(labelEl, {
      autoAlpha: label ? 1 : 0,
      duration: 0.3,
    });
  }, [variant, label]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border opacity-0 will-change-transform"
        style={{ borderColor: "rgba(46,43,115,0.5)" }}
      >
        <div
          ref={labelRef}
          className="select-none text-[9px] font-medium uppercase tracking-widest text-canvas opacity-0"
        >
          {label}
        </div>
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo opacity-0 will-change-transform"
      />
    </div>
  );
}
