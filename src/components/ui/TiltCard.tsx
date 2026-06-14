"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A card that tilts in 3D toward the pointer and carries a soft specular glare
 * that tracks the cursor — "premium lighting" without a WebGL cost.
 */
export function TiltCard({
  children,
  className,
  intensity = 9,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  // glare position (percent)
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(120px circle at ${gx}% ${gy}%, rgba(46,43,115,0.12), transparent 60%)`;

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
