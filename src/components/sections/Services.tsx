"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, type Service } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollTo } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const layoutTransition = { layout: { duration: 0.5, ease } };

function ServiceCard({
  service,
  open,
  onToggle,
}: {
  service: Service;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      layout
      transition={layoutTransition}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-500 ease-luxe",
        // The open card becomes the 2x2 feature tile; closed cards are uniform.
        open
          ? "border-indigo/30 bg-indigo/[0.05] shadow-[0_28px_60px_-32px_rgba(28,26,71,0.55)] sm:col-span-2 lg:col-span-2 lg:row-span-2"
          : "border-indigo/12 bg-canvas-cool shadow-[0_10px_30px_-22px_rgba(28,26,71,0.45)] hover:-translate-y-1 hover:border-indigo/30 hover:shadow-[0_28px_60px_-32px_rgba(28,26,71,0.55)]"
      )}
    >
      {/* gold accent rail — cheap transform on hover / when open */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-gold via-gold-amber to-indigo-light transition-transform duration-500 ease-luxe",
          open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40",
          open ? "p-6 sm:p-8" : "h-full p-6 sm:p-7"
        )}
      >
        <motion.div layout="position" className="flex items-center justify-between">
          <span className="font-display text-sm tabular-nums text-gradient-gold sm:text-base">
            {service.index}
          </span>
          <span
            aria-hidden
            className={cn(
              "font-display text-xl leading-none text-indigo transition-all duration-500 ease-luxe",
              open ? "rotate-0 opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            {open ? "–" : "+"}
          </span>
        </motion.div>

        <motion.h3
          layout="position"
          className={cn(
            "mt-5 font-display italic text-indigo-deep transition-[font-size] duration-500 ease-luxe",
            open ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
          )}
        >
          {service.title}
        </motion.h3>
        <motion.p
          layout="position"
          className="mt-2 font-display text-[15px] italic text-gold-deep sm:text-base"
        >
          {service.tagline}
        </motion.p>

        {!open && (
          <motion.span
            layout="position"
            className="mt-auto pt-6 text-[11px] font-medium uppercase tracking-widest text-indigo/70"
          >
            {service.items.length} capabilities
            <span aria-hidden className="ml-2 text-indigo">+</span>
          </motion.span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.45, delay: 0.12, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="px-6 pb-7 sm:px-8 sm:pb-8"
          >
            {/* two vertical columns — fills the wide tile, no ragged whitespace */}
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {service.items.map((cap) => (
                <li
                  key={cap}
                  className="flex items-center gap-2.5 text-sm text-ink-dim sm:text-[15px]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {cap}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollTo("#contact", -80)}
              className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-indigo transition-colors hover:text-indigo-deep"
            >
              Enquire
              <span aria-hidden className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  // Only the multi-column grid (>=640px) needs the open tile pulled to the
  // front to pack without gaps. On a single-column phone we keep source order
  // so the tapped card expands in place instead of jumping to the top.
  const isGrid = useMediaQuery("(min-width: 640px)");

  const ordered =
    open && isGrid
      ? [
          SERVICES.items.find((s) => s.id === open)!,
          ...SERVICES.items.filter((s) => s.id !== open),
        ]
      : SERVICES.items;

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

        <motion.ul
          layout
          transition={layoutTransition}
          className="mx-auto mt-14 grid max-w-5xl auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ordered.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              open={open === s.id}
              onToggle={() => setOpen(open === s.id ? null : s.id)}
            />
          ))}
        </motion.ul>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-ink-mute/70">
          Select a craft to explore · click again to close
        </p>
      </div>
    </section>
  );
}
