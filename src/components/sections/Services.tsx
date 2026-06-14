"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// The signature WebGL "loom" — re-weaves per service. Client-only, lazy.
const ServiceLoom = dynamic(
  () => import("@/components/three/ServiceLoom").then((m) => m.ServiceLoom),
  { ssr: false }
);

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const setCursor = useAppStore((s) => s.setCursor);
  const resetCursor = useAppStore((s) => s.resetCursor);
  const service = SERVICES.items[active];

  return (
    <section
      id="services"
      className="silk-ground relative scroll-mt-24 overflow-hidden py-28 sm:py-36"
    >
      <div className="container-luxe">
        <SectionHeading label={SERVICES.label} title={SERVICES.heading} align="center" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-5 max-w-xl text-center text-ink-mute"
        >
          Six disciplines, one continuous thread. Hover a craft — watch the weave
          re-tension to its capabilities.
        </motion.p>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial index */}
          <ul className="lg:col-span-6">
            {SERVICES.items.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id}>
                  <button
                    onMouseEnter={() => {
                      setActive(i);
                      setCursor("hover");
                    }}
                    onMouseLeave={resetCursor}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group relative flex w-full items-center gap-5 border-b border-indigo/15 py-6 text-left"
                  >
                    {/* active rail */}
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-indigo transition-all duration-500 ease-luxe",
                        isActive ? "h-3/5 opacity-100" : "opacity-0"
                      )}
                    />
                    <span
                      className={cn(
                        "pl-5 font-display text-sm tabular-nums transition-colors",
                        isActive ? "text-gradient-gold" : "text-ink-mute"
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl italic transition-all duration-500 ease-luxe sm:text-4xl",
                        isActive
                          ? "translate-x-2 text-indigo-deep"
                          : "text-ink-mute group-hover:text-ink-dim"
                      )}
                    >
                      {s.title}
                    </span>
                    <span
                      className={cn(
                        "ml-auto text-xs uppercase tracking-widest transition-colors",
                        isActive ? "text-indigo" : "text-ink-mute/60"
                      )}
                    >
                      {String(s.items.length).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The loom — signature centerpiece */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-indigo/12 bg-canvas-cool shadow-[0_28px_70px_-34px_rgba(28,26,71,0.5)] sm:aspect-[5/6]">
                <ServiceLoom count={service.items.length} />

                {/* Editorial overlay */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`idx-${service.id}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, ease }}
                      className="font-display text-6xl font-semibold leading-none text-gradient-gold sm:text-7xl"
                    >
                      {service.index}
                    </motion.span>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`ttl-${service.id}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <h3 className="font-display text-3xl italic text-indigo-deep sm:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-ink-dim">
                        {service.tagline}
                      </p>
                      <p className="mt-4 text-[11px] uppercase tracking-widest text-indigo/70">
                        {service.items.length} woven capabilities
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Capabilities */}
              <AnimatePresence mode="wait">
                <motion.ul
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {service.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04, ease }}
                      className="rounded-full border border-indigo/15 bg-canvas-cool/60 px-4 py-2 text-sm text-ink-dim transition-colors hover:border-indigo/50 hover:text-indigo-deep"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
