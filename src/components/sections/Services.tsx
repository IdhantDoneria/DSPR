"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceNetwork } from "./ServiceNetwork";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const setCursor = useAppStore((s) => s.setCursor);
  const resetCursor = useAppStore((s) => s.resetCursor);
  const service = SERVICES.items[active];

  return (
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container-luxe">
        <SectionHeading label={SERVICES.label} title={SERVICES.heading} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Interactive index of service nodes */}
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
                    className="group relative flex w-full items-center gap-5 border-b border-ink-600 py-6 text-left transition-colors"
                  >
                    <span
                      className={cn(
                        "font-display text-sm transition-colors",
                        isActive ? "text-gold" : "text-ivory-mute"
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl transition-all duration-500 ease-luxe sm:text-4xl",
                        isActive
                          ? "translate-x-2 text-ivory"
                          : "text-ivory-mute group-hover:text-ivory-dim"
                      )}
                    >
                      {s.title}
                    </span>
                    <span
                      className={cn(
                        "ml-auto h-px bg-gold transition-all duration-500 ease-luxe",
                        isActive ? "w-12 opacity-100" : "w-0 opacity-0"
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail + animated network */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <ServiceNetwork service={service} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease }}
                  className="mt-4"
                >
                  <p className="font-display text-2xl italic text-gold-light">
                    {service.tagline}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease }}
                        className="rounded-full border border-ink-600 px-4 py-2 text-sm text-ivory-dim transition-colors hover:border-gold/50 hover:text-ivory"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
