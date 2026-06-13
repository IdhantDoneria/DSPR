"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { scrollTo } from "@/components/providers/SmoothScrollProvider";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const isLoaded = useAppStore((s) => s.isLoaded);
  const reduced = useAppStore((s) => s.reducedMotion);
  const isMobile = useIsMobile();

  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
      aria-label="DSPR — Crafting Stories, Driving Results"
    >
      {/* Static luxury gradient — always present (also the WebGL fallback). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 8%, #15120c 0%, #0a0907 55%), radial-gradient(80% 60% at 80% 100%, rgba(198,166,100,0.10), transparent 60%)",
        }}
      />

      {/* GPU particle universe (skipped for reduced-motion users). */}
      {!reduced && <HeroCanvas quality={isMobile ? "low" : "high"} />}

      {/* Foreground composition */}
      <div className="container-luxe relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="eyebrow"
        >
          Public Relations · Digital Marketing · Mumbai
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
          className="mt-6 font-display text-display-lg font-semibold leading-none"
        >
          <span className="sr-only">DSPR</span>
          <span aria-hidden className="text-gradient-gold">
            DSPR
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.6 }}
          className="mt-4 max-w-xl font-display text-xl italic text-ivory-dim sm:text-2xl"
        >
          {SITE.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.75 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-ivory-mute"
        >
          A boutique agency of storytellers and strategists, shaping brand
          narratives across luxury, hospitality, weddings &amp; travel.
        </motion.p>
      </div>

      {/* Baseline meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease, delay: 1 }}
        className="container-luxe absolute inset-x-0 bottom-8 z-10 flex items-end justify-between text-xs uppercase tracking-widest text-ivory-mute"
      >
        <span className="hidden sm:block">Est. {SITE.activeSince}</span>

        <button
          onClick={() => scrollTo("#about", -40)}
          className="group mx-auto flex flex-col items-center gap-2 sm:mx-0"
          aria-label="Scroll to explore"
        >
          <span>Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
            <span className="absolute inset-x-0 top-0 h-1/2 w-px animate-[float_2s_ease-in-out_infinite] bg-gold" />
          </span>
        </button>

        <span className="hidden sm:block">{SITE.portfolioSize} brands</span>
      </motion.div>
    </section>
  );
}
