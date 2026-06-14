"use client";

import { motion } from "framer-motion";
import { CLIENTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Wordmark } from "@/components/ui/Wordmark";

export function Clients() {
  return (
    <section
      id="clients"
      className="silk-ground relative scroll-mt-24 overflow-hidden bg-canvas-shade/40 py-28 sm:py-36"
    >
      <div className="container-luxe">
        <SectionHeading
          label="Portfolio"
          title={CLIENTS.heading}
          align="center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-5 max-w-xl text-center text-ink-mute"
        >
          Over {`100+`} brands across weddings, lifestyle, travel, hospitality,
          food &amp; beverage, and kids &amp; parenting.
        </motion.p>
      </div>

      <div className="mt-16 flex flex-col gap-12">
        {CLIENTS.categories.map((category, i) => (
          <div key={category.name}>
            <div className="container-luxe mb-5 flex items-center gap-4">
              <span className="font-display text-sm italic text-indigo-deep">
                {category.name}
              </span>
              <span className="h-px flex-1 bg-indigo/15" />
              <span className="text-xs tabular-nums text-ink-mute">
                {String(category.clients.length).padStart(2, "0")}
              </span>
            </div>

            <Marquee
              direction={i % 2 === 0 ? "left" : "right"}
              duration={42 + i * 6}
            >
              {category.clients.map((name, j) => (
                <Wordmark
                  key={`${name}-${j}`}
                  name={name}
                  className="h-24 w-24 min-w-0 rounded-full border-indigo/12 bg-canvas-cool px-4 text-center shadow-[0_18px_50px_-28px_rgba(28,26,71,0.35)] transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-3 hover:border-indigo/25"
                />
              ))}
            </Marquee>
          </div>
        ))}
      </div>
    </section>
  );
}
