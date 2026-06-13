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
      className="relative scroll-mt-24 overflow-hidden bg-ink-800/30 py-28 sm:py-36"
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
          className="mx-auto mt-5 max-w-xl text-center text-ivory-mute"
        >
          Over {`100+`} brands across weddings, lifestyle, travel, hospitality,
          food &amp; beverage, and kids &amp; parenting.
        </motion.p>
      </div>

      <div className="mt-16 flex flex-col gap-12">
        {CLIENTS.categories.map((category, i) => (
          <div key={category.name}>
            <div className="container-luxe mb-5 flex items-center gap-4">
              <span className="font-display text-sm italic text-gold">
                {category.name}
              </span>
              <span className="h-px flex-1 bg-ink-600" />
              <span className="text-xs tabular-nums text-ivory-mute">
                {String(category.clients.length).padStart(2, "0")}
              </span>
            </div>

            <Marquee
              direction={i % 2 === 0 ? "left" : "right"}
              duration={42 + i * 6}
            >
              {category.clients.map((name, j) => (
                <Wordmark key={`${name}-${j}`} name={name} />
              ))}
            </Marquee>
          </div>
        ))}
      </div>
    </section>
  );
}
