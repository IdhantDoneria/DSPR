import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect throws a warning during SSR. This swaps in useEffect on the
 * server so GSAP setup code can use layout timing safely.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
