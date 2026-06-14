"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { SERVICES } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrollTo } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Signature gradient per craft — colour-codes each service on-brand. */
const GRADIENTS = [
  "linear-gradient(135deg,#1C1A47 0%,#2E2B73 100%)",
  "linear-gradient(135deg,#2E2B73 0%,#4A46A8 100%)",
  "linear-gradient(135deg,#2E2B73 0%,#B98B3A 100%)",
  "linear-gradient(135deg,#4A46A8 0%,#D9892F 100%)",
  "linear-gradient(135deg,#B98B3A 0%,#2E2B73 100%)",
  "linear-gradient(135deg,#D9892F 0%,#1C1A47 100%)",
];

const CARD_W = 380;

export function Services() {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const setCursor = useAppStore((s) => s.setCursor);
  const resetCursor = useAppStore((s) => s.resetCursor);

  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  // Buttery cursor-follow for the floating preview (desktop only).
  useEffect(() => {
    if (!canHover || !previewRef.current) return;
    xTo.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.5,
      ease: "power3",
    }) as (v: number) => void;
    yTo.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.5,
      ease: "power3",
    }) as (v: number) => void;
  }, [canHover]);

  const place = (e: React.MouseEvent, immediate = false) => {
    const card = previewRef.current;
    if (!card) return;
    const h = (card.firstElementChild as HTMLElement)?.offsetHeight ?? 420;
    const x = Math.min(e.clientX + 28, window.innerWidth - CARD_W - 16);
    const y = Math.min(Math.max(e.clientY - 40, 16), window.innerHeight - h - 16);
    if (immediate) {
      gsap.set(card, { x, y });
    } else {
      xTo.current?.(x);
      yTo.current?.(y);
    }
  };

  const preview = hovered != null ? SERVICES.items[hovered] : null;

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
          Six disciplines, one continuous craft — from earning headlines to
          turning attention into measurable growth.
        </motion.p>

        <ul
          ref={listRef}
          className="mx-auto mt-16 max-w-4xl border-t border-indigo/12"
          onMouseLeave={() => {
            if (canHover) {
              setHovered(null);
              resetCursor();
            }
          }}
          onMouseMove={(e) => canHover && hovered != null && place(e)}
        >
          {SERVICES.items.map((s, i) => {
            const isOpen = open === i;
            const isActive = canHover ? hovered === i : isOpen;
            return (
              <li key={s.id} className="border-b border-indigo/12">
                <button
                  onMouseEnter={(e) => {
                    if (!canHover) return;
                    if (hovered == null) place(e, true);
                    setHovered(i);
                    setCursor("hover");
                  }}
                  onClick={() => {
                    if (canHover) scrollTo("#contact", -80);
                    else setOpen(isOpen ? null : i);
                  }}
                  aria-expanded={!canHover ? isOpen : undefined}
                  className="group relative flex w-full items-center overflow-hidden py-7 text-left sm:py-8"
                >
                  {/* hover sweep */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 origin-left bg-gradient-to-r from-gold/[0.12] via-indigo/[0.05] to-transparent transition-transform duration-700 ease-luxe",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                  <span className="relative z-10 flex w-full items-center gap-5 px-1 sm:gap-7">
                    <span
                      className={cn(
                        "font-display text-base tabular-nums transition-colors duration-500 sm:text-lg",
                        isActive ? "text-gradient-gold" : "text-ink-mute"
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl italic transition-all duration-500 ease-luxe sm:text-5xl",
                        isActive
                          ? "translate-x-1 text-indigo-deep sm:translate-x-2"
                          : "text-ink-mute group-hover:text-ink-dim"
                      )}
                    >
                      {s.title}
                    </span>
                    <span className="ml-auto flex items-center gap-3 sm:gap-5">
                      <span
                        className={cn(
                          "hidden text-[11px] uppercase tracking-widest transition-colors sm:inline",
                          isActive ? "text-indigo" : "text-ink-mute/60"
                        )}
                      >
                        {s.items.length} capabilities
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "font-display text-xl transition-all duration-500 ease-luxe",
                          canHover
                            ? isActive
                              ? "translate-x-0 text-indigo opacity-100"
                              : "-translate-x-2 text-ink-mute opacity-0"
                            : "text-indigo"
                        )}
                      >
                        {canHover ? "↗" : isOpen ? "–" : "+"}
                      </span>
                    </span>
                  </span>
                </button>

                {/* Mobile / touch: inline accordion detail */}
                {!canHover && (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-1 pb-8">
                          <p className="font-display text-lg italic text-gradient-gold">
                            {s.tagline}
                          </p>
                          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                            {s.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 text-sm text-ink-dim"
                              >
                                <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => scrollTo("#contact", -80)}
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-indigo"
                          >
                            Enquire <span aria-hidden>→</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>

        {canHover && (
          <p className="mt-8 text-center text-xs uppercase tracking-[0.25em] text-ink-mute/70">
            Hover to explore · click to start a conversation
          </p>
        )}
      </div>

      {/* Desktop floating preview — follows the cursor */}
      {canHover && (
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden will-change-transform lg:block"
          style={{ width: CARD_W }}
        >
          <motion.div
            animate={{
              opacity: preview ? 1 : 0,
              scale: preview ? 1 : 0.94,
              y: preview ? 0 : 12,
            }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden rounded-2xl border border-indigo/15 bg-canvas-cool/95 shadow-[0_40px_90px_-40px_rgba(28,26,71,0.65)] backdrop-blur-md"
          >
            <AnimatePresence mode="wait">
              {preview && (
                <motion.div
                  key={preview.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* gradient header */}
                  <div
                    className="relative flex h-32 items-end overflow-hidden p-5"
                    style={{ background: GRADIENTS[hovered ?? 0] }}
                  >
                    <span className="absolute -right-2 -top-6 font-display text-[7rem] font-semibold leading-none text-canvas/15">
                      {preview.index}
                    </span>
                    <h3 className="relative font-display text-2xl italic text-canvas">
                      {preview.title}
                    </h3>
                  </div>
                  {/* body */}
                  <div className="p-5">
                    <p className="font-display text-base italic text-indigo-deep">
                      {preview.tagline}
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2">
                      {preview.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-[13px] text-ink-dim"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </section>
  );
}
