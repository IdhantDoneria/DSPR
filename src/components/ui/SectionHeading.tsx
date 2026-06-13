"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}

/** A reusable eyebrow + display-serif heading used to open each section. */
export function SectionHeading({
  label,
  title,
  className,
  align = "left",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">{label}</span>
        </motion.div>
      )}
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-display-sm font-medium text-balance"
      >
        {title}
      </motion.h2>
    </div>
  );
}
