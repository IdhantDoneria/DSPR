"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AWARDS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

export function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="silk-ground relative scroll-mt-24 py-28 sm:py-36">
      <div className="container-luxe">
        <SectionHeading
          label="Recognition"
          title={AWARDS.heading}
          align="center"
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          {/* Timeline rail */}
          <div className="absolute left-0 top-0 h-full w-px bg-indigo/25 sm:left-1/2">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-indigo"
            />
          </div>

          <ul className="flex flex-col gap-16">
            {AWARDS.items.map((award, i) => (
              <li
                key={award.title}
                className={`relative pl-10 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:self-start sm:pr-12 sm:text-right"
                    : "sm:self-end sm:pl-12"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-0 top-2 h-3 w-3 -translate-x-[5px] rounded-full border border-indigo bg-canvas sm:left-auto ${
                    i % 2 === 0
                      ? "sm:right-0 sm:translate-x-[6px]"
                      : "sm:left-0 sm:-translate-x-[6px]"
                  }`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, ease }}
                >
                  <span className="font-display text-4xl text-gold-amber sm:text-5xl">
                    {award.year}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-ink">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-widest text-ink-dim">
                    {award.org}
                  </p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
