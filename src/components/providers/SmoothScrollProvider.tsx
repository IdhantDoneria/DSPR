"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAppStore } from "@/lib/store";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

let lenisInstance: Lenis | null = null;

/** Programmatic smooth scroll to an element or position, used by nav links.
 * Falls back to native smooth scroll when Lenis isn't active (reduced motion). */
export function scrollTo(target: string | number | HTMLElement, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  if (typeof window === "undefined") return;
  let top = 0;
  if (typeof target === "number") {
    top = target;
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
  }
  window.scrollTo({ top, behavior: "smooth" });
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    setReducedMotion(reduced);

    // Reduced motion: skip the Lenis virtual scroll entirely.
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger measurements correct once the DOM settles.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced, setReducedMotion]);

  return <>{children}</>;
}
