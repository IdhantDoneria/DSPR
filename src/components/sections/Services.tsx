"use client";

import { motion } from "framer-motion";
import { SERVICES, type Service } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrollTo } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/**
 * Bento layout: the first craft is the feature tile (wide + tall on desktop),
 * the last spans the footer row, the rest fill the asymmetric grid. Placement
 * is purely CSS spans so the grid reflows cleanly at every breakpoint.
 */
const SPANS = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2", // 01 — feature
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "sm:col-span-2 lg:col-span-1", // 06
];

const MAX_TAGS = 4;

function ServiceCard({ service, featured }: { service: Service; featured?: boolean }) {
  const shown = featured ? service.items : service.items.slice(0, MAX_TAGS);
  const extra = featured ? 0 : service.items.length - shown.length;

  return (
    <motion.li variants={item} className={cn("group", SPANS[Number(service.index) - 1])}>
      <button
        type="button"
        onClick={() => scrollTo("#contact", -80)}
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-indigo/12 p-6 text-left transition-[transform,box-shadow,border-color] duration-500 ease-luxe sm:p-7",
          "shadow-[0_10px_30px_-22px_rgba(28,26,71,0.45)]",
          "hover:-translate-y-1 hover:border-indigo/30 hover:shadow-[0_28px_60px_-32px_rgba(28,26,71,0.55)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40",
          featured ? "bg-indigo/[0.045]" : "bg-canvas-cool"
        )}
      >
        {/* gold accent rail — scales in on hover, cheap transform only */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-amber to-indigo-light transition-transform duration-500 ease-luxe group-hover:scale-x-100"
        />

        <div className="flex items-center justify-between">
          <span className="font-display text-sm tabular-nums text-gradient-gold sm:text-base">
            {service.index}
          </span>
          <span
            aria-hidden
            className="font-display text-lg text-indigo opacity-0 transition-all duration-500 ease-luxe -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
          >
            ↗
          </span>
        </div>

        <h3
          className={cn(
            "mt-5 font-display italic text-indigo-deep transition-transform duration-500 ease-luxe group-hover:translate-x-0.5",
            featured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
          )}
        >
          {service.title}
        </h3>
        <p className="mt-2 font-display text-[15px] italic text-gold-deep sm:text-base">
          {service.tagline}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {shown.map((cap) => (
            <li
              key={cap}
              className="rounded-full border border-indigo/12 bg-canvas/60 px-2.5 py-1 text-[11px] uppercase tracking-wide text-ink-dim"
            >
              {cap}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded-full px-2 py-1 text-[11px] uppercase tracking-wide text-indigo/70">
              +{extra} more
            </li>
          )}
        </ul>

        <span className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-indigo">
          Enquire
          <span aria-hidden className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </motion.li>
  );
}

export function Services() {
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
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mx-auto mt-14 grid max-w-6xl auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {SERVICES.items.map((s, i) => (
            <ServiceCard key={s.id} service={s} featured={i === 0} />
          ))}
        </motion.ul>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-ink-mute/70">
          Select a craft to start a conversation
        </p>
      </div>
    </section>
  );
}
