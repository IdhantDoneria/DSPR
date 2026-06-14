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

/**
 * DSPR signature section opener: an elegant serif-italic title, optionally
 * flanked by thin indigo rules when centered — mirroring the live dspr.in
 * treatment of "About Us", "Founder", "Our Services", "Our Clients".
 */
export function SectionHeading({
  label,
  title,
  className,
  align = "left",
  id,
}: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className={cn("flex flex-col items-center text-center gap-4", className)}>
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="eyebrow"
          >
            {label}
          </motion.span>
        )}
        <div className="flex w-full max-w-3xl items-center justify-center gap-5">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden h-px flex-1 origin-right bg-gradient-to-l from-indigo to-transparent sm:block"
          />
          <motion.h2
            id={id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap font-display text-display-sm font-medium italic text-indigo-deep text-balance"
          >
            {title}
          </motion.h2>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden h-px flex-1 origin-left bg-gradient-to-r from-indigo to-transparent sm:block"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {label && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-indigo/60" />
          <span className="eyebrow">{label}</span>
        </motion.div>
      )}
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-display-sm font-medium italic text-indigo-deep text-balance"
      >
        {title}
      </motion.h2>
    </div>
  );
}
