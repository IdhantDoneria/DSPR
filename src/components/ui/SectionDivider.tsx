"use client";

import { motion } from "framer-motion";

/**
 * The DSPR signature: a bold royal-indigo rule that separates major sections,
 * mirroring the live site's thick violet bars. Draws in from the left on view.
 */
export function SectionDivider() {
  return (
    <div aria-hidden className="relative h-[6px] w-full overflow-hidden bg-canvas">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="indigo-rule h-full origin-left"
      />
    </div>
  );
}
