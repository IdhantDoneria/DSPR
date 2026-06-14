"use client";

import { motion } from "framer-motion";
import { FEATURED_CLIENTS } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import { Wordmark } from "@/components/ui/Wordmark";

export function FeaturedStrip() {
  return (
    <section className="relative border-y border-indigo/15 bg-canvas-warm py-10">
      <div className="container-luxe mb-7 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-gold/60" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow"
        >
          Featured Partners
        </motion.p>
        <span className="h-px w-8 bg-gold/60" />
      </div>

      <Marquee duration={28}>
        {FEATURED_CLIENTS.concat(FEATURED_CLIENTS).map((name, i) => (
          <Wordmark
            key={`${name}-${i}`}
            name={name}
            className="border-transparent text-ink-dim hover:border-indigo/20 hover:text-indigo"
          />
        ))}
      </Marquee>
    </section>
  );
}
