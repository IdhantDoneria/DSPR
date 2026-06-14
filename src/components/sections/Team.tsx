"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TEAM } from "@/lib/data";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { RevealText } from "@/components/ui/RevealText";

export function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section ref={ref} className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container-luxe">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-indigo/60" />
          <span className="eyebrow text-indigo">Behind DSPR</span>
        </div>

        <RevealText
          text={TEAM.heading}
          as="h2"
          className="font-display text-display-md font-medium italic text-ink"
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-indigo/15 shadow-[0_18px_50px_-28px_rgba(28,26,71,0.35)] lg:col-span-7">
            <motion.div style={{ scale }} className="absolute inset-0">
              <MediaFrame
                alt="The DSPR team"
                monogram="DSPR"
                caption="The DSPR team"
                rounded={false}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="font-display text-xl leading-relaxed text-ink-dim text-balance sm:text-2xl">
              {TEAM.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
