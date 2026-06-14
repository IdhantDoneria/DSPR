"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FOUNDER } from "@/lib/data";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CountUp } from "@/components/ui/CountUp";

const ease = [0.16, 1, 0.3, 1] as const;

export function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yPrimary = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], ["-6%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36"
    >
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Portraits with parallax + glass accent */}
        <div className="relative lg:col-span-5">
          <motion.div style={{ y: yPrimary }} className="relative z-10 aspect-[3/4]">
            <MediaFrame
              alt="Digisha Shah, Founder of DSPR — portrait"
              monogram="DS"
              caption="Digisha Shah"
            />
          </motion.div>

          {/* Offset second frame (brief: two founder photos side by side) */}
          <motion.div
            style={{ y: ySecondary }}
            className="absolute -bottom-10 -right-4 z-20 hidden aspect-[3/4] w-2/5 sm:block"
          >
            <MediaFrame
              alt="Digisha Shah — secondary portrait"
              monogram="DS"
              className="ring-1 ring-ink-500"
            />
          </motion.div>

          {/* Glassmorphism stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="glass absolute -left-4 top-8 z-30 rounded-xl px-5 py-4"
          >
            <CountUp
              value="100+"
              className="font-display text-3xl text-gold"
            />
            <p className="mt-1 text-xs uppercase tracking-widest text-ivory-dim">
              Brands shaped
            </p>
          </motion.div>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">{FOUNDER.heading}</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease }}
            className="font-display text-display-sm font-medium"
          >
            {FOUNDER.name}
          </motion.h2>

          <div className="mt-10 flex flex-col gap-8">
            {FOUNDER.blocks.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease, delay: i * 0.06 }}
              >
                <h3 className="mb-2 font-display text-lg italic text-gold-light">
                  {block.title}
                </h3>
                <p className="max-w-prose leading-relaxed text-ivory-dim">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Animated statistics */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-ink-600 pt-8">
            {FOUNDER.stats.map((stat) => (
              <div key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="font-display text-3xl text-ivory sm:text-4xl"
                />
                <p className="mt-2 text-xs uppercase tracking-widest text-ivory-mute">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
