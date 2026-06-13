"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useAppStore, type CursorVariant } from "@/lib/store";

interface MagneticProps {
  children: ReactNode;
  /** How far the element is pulled toward the pointer (px of travel scale). */
  strength?: number;
  className?: string;
  cursor?: CursorVariant;
  cursorLabel?: string;
  as?: "div" | "span" | "li";
}

/**
 * Wraps children so they gravitate toward the pointer while hovered, then
 * spring back on leave. Also drives the custom-cursor state.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  cursor = "hover",
  cursorLabel,
  as: Tag = "div",
}: MagneticProps) {
  const ref = useRef<any>(null);
  const setCursor = useAppStore((s) => s.setCursor);
  const resetCursor = useAppStore((s) => s.resetCursor);

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const handleEnter = () => setCursor(cursor, cursorLabel);

  const handleLeave = () => {
    const el = ref.current;
    if (el) gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    resetCursor();
  };

  return (
    <Tag
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}
