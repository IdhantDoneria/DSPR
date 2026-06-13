"use client";

import { motion } from "framer-motion";
import { MEDIA } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

// Two publications anchor the wall as wider features.
const FEATURED = new Set([0, 5]);

export function Media() {
  const setCursor = useAppStore((s) => s.setCursor);
  const resetCursor = useAppStore((s) => s.resetCursor);

  return (
    <section id="media" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container-luxe">
        <SectionHeading label={MEDIA.label} title={MEDIA.heading} />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-5 max-w-xl text-ivory-mute"
        >
          {MEDIA.intro}
        </motion.p>

        <div className="mt-14 grid auto-rows-[minmax(220px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEDIA.publications.map((pub, i) => (
            <motion.div
              key={pub.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
              className={cn(FEATURED.has(i) && "lg:col-span-2")}
              onPointerEnter={() => setCursor("hover")}
              onPointerLeave={resetCursor}
            >
              <TiltCard className="h-full w-full">
                <div
                  className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-600 p-7 transition-colors duration-500 hover:border-gold/40"
                  style={{
                    background:
                      "linear-gradient(150deg, #16130d 0%, #0e0c08 100%)",
                  }}
                >
                  {/* floating ambient glow */}
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover/tilt:bg-gold/20"
                  />

                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-widest text-ivory-mute">
                      Featured
                    </span>
                    <span className="font-display text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div style={{ transform: "translateZ(40px)" }}>
                    <h3 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
                      {pub.name}
                    </h3>
                    <p className="mt-2 text-sm text-ivory-dim">
                      <span className="text-gold">×</span> {pub.collaboration}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
