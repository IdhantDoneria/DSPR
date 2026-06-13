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
        className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[28vw] leading-none text-ivory/[0.03]"
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
            className="font-display text-2xl leading-snug text-ivory text-balance sm:text-3xl"
          />
        </div>

        {/* Layered content blocks */}
        <div className="mt-24 grid gap-x-12 gap-y-16 md:grid-cols-2">
          {ABOUT_INTRO.blocks.slice(1).map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.9, ease, delay: (i % 2) * 0.1 }}
              className="group relative border-t border-ink-600 pt-7"
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-luxe group-hover:w-16" />
              <h3 className="mb-4 font-display text-xl text-ivory sm:text-2xl">
                {block.title}
              </h3>
              <p className="max-w-prose leading-relaxed text-ivory-dim">
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
          className="mx-auto mt-28 max-w-4xl text-center font-display text-2xl italic leading-snug text-balance sm:text-4xl"
        >
          <span className="text-gold">“</span>
          {ABOUT_INTRO.closing}
          <span className="text-gold">”</span>
        </motion.blockquote>
      </div>
    </section>
  );
}
