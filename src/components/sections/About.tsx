"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ABOUT_INTRO } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";

const ease = [0.16, 1, 0.3, 1] as const;

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-24 py-28 sm:py-36"
    >
      {/* Oversized watermark numeral for editorial depth */}
      <motion.span
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[28vw] leading-none text-indigo/[0.05]"
      >
        01
      </motion.span>

      <div className="container-luxe">
        <SectionHeading
          label="About Us"
          title={ABOUT_INTRO.blocks[0].title}
          id="about-heading"
        />

        <div className="mt-8 max-w-3xl">
          <RevealText
            text={ABOUT_INTRO.blocks[0].body}
            className="font-display text-2xl leading-snug text-ink text-balance sm:text-3xl"
          />
        </div>

        {/* Vertical timeline of blocks */}
        <div className="relative mt-24 pl-10 md:pl-14">
          {/* Timeline spine */}
          <span
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-indigo/25 md:left-[9px]"
          />
          <div className="flex flex-col gap-y-16">
            {ABOUT_INTRO.blocks.slice(1).map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.9, ease, delay: (i % 2) * 0.1 }}
                className="group relative"
              >
                {/* Node dot */}
                <span
                  aria-hidden
                  className="absolute -left-10 top-2 h-2.5 w-2.5 rounded-full bg-indigo ring-4 ring-canvas md:-left-14"
                />
                <h3 className="mb-4 font-display italic text-xl text-indigo-deep sm:text-2xl">
                  {block.title}
                </h3>
                <p className="max-w-prose leading-relaxed text-ink-dim">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
          className="mx-auto mt-28 max-w-4xl text-center font-display text-2xl italic leading-snug text-balance text-indigo-deep sm:text-4xl"
        >
          <span className="text-gold-amber">“</span>
          {ABOUT_INTRO.closing}
          <span className="text-gold-amber">”</span>
        </motion.blockquote>
      </div>
    </section>
  );
}
