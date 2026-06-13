"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAppStore } from "@/lib/store";

const WORDS = ["Stories.", "Influence.", "Recognition.", "Growth."];

/**
 * First-load curtain. Cycles the brand's narrative words against a counter,
 * resolves to "DSPR", then lifts to reveal the hero. Honors reduced motion by
 * completing almost immediately.
 */
export function Preloader() {
  const setLoaded = useAppStore((s) => s.setLoaded);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Counter 0 -> 100
  useEffect(() => {
    if (reduced) {
      setCount(100);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Cycle the narrative words
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 480);
    return () => clearInterval(interval);
  }, [reduced]);

  // Hand off to the page once counting completes
  useEffect(() => {
    if (count < 100) return;
    const t = setTimeout(
      () => {
        setDone(true);
        // lock scroll until curtain begins lifting, then release
        setTimeout(() => setLoaded(true), reduced ? 0 : 700);
      },
      reduced ? 0 : 350
    );
    return () => clearTimeout(t);
  }, [count, reduced, setLoaded]);

  // Prevent scroll while the curtain is up
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => (document.body.style.overflow = ""), 700);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex w-full flex-col items-center justify-center px-6">
            {/* Narrative word cycle, then resolve to DSPR */}
            <div className="relative h-[1.2em] overflow-hidden font-display text-4xl text-ivory sm:text-6xl">
              <AnimatePresence mode="wait">
                {count < 100 ? (
                  <motion.span
                    key={wordIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="block italic"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                ) : (
                  <motion.span
                    key="brand"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="block tracking-[0.2em] text-gradient-gold"
                  >
                    DSPR
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Counter, pinned bottom-right of the viewport */}
            <div className="pointer-events-none fixed bottom-8 right-8 font-display text-5xl tabular-nums text-ivory/80 sm:text-7xl">
              {count}
              <span className="align-top text-xl text-gold">%</span>
            </div>

            {/* progress hairline */}
            <div className="fixed bottom-0 left-0 h-px w-full bg-ink-500/40">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
