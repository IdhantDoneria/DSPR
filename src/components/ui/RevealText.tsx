"use client";

import { Fragment, useRef, type ElementType } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  /** Split granularity for the reveal. */
  by?: "word" | "line";
  delay?: number;
  stagger?: number;
}

/**
 * Editorial masked reveal. Each word/line sits inside an overflow-hidden mask
 * and rises into place on scroll. Reduced-motion users get the final state
 * (gsap.context.revert restores natural layout if the preference flips on).
 */
export function RevealText({
  text,
  className,
  as: Tag = "p",
  by = "word",
  delay = 0,
  stagger = 0.04,
}: RevealTextProps) {
  const ref = useRef<any>(null);
  const reduced = useAppStore((s) => s.reducedMotion);

  const tokens = by === "word" ? text.split(" ") : text.split("\n");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const targets = el.querySelectorAll("[data-reveal-token]");
    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 115 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1,
        delay,
        ease: "power4.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, stagger]);

  // Mask wrappers get a touch of bottom padding (offset by negative margin) so
  // the upward translate never clips descenders.
  const maskClass =
    by === "word"
      ? "inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
      : "block overflow-hidden pb-[0.12em] -mb-[0.12em]";

  return (
    <Tag ref={ref} className={cn(className)}>
      {tokens.map((token, i) => (
        <Fragment key={i}>
          <span className={maskClass}>
            <span data-reveal-token className="inline-block will-change-transform">
              {token}
            </span>
          </span>
          {by === "word" && i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
