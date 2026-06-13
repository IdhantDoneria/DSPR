"use client";

import { useEffect, useRef } from "react";

export type MousePosition = { x: number; y: number };

/**
 * Tracks pointer position in a ref (no re-render per move). Values are stored in
 * pixels; consumers can normalise as needed inside an animation frame.
 */
export function useMousePosition() {
  const position = useRef<MousePosition>({ x: 0, y: 0 });
  const normalized = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
      normalized.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return { position, normalized };
}
