"use client";

import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * A typographic stand-in for a client logo. Renders the brand name as a refined
 * wordmark that desaturates to a quiet ivory and warms to gold on hover —
 * giving the marquee the grayscale→color credibility cue without bitmap assets.
 *
 * Swap for an <Image> per client when real logo files are added to /public.
 */
export function Wordmark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const setCursor = useAppStore((s) => s.setCursor);
  const resetCursor = useAppStore((s) => s.resetCursor);

  return (
    <div
      onPointerEnter={() => setCursor("hover")}
      onPointerLeave={resetCursor}
      className={cn(
        "group/logo mx-3 flex h-20 min-w-[180px] items-center justify-center rounded-lg border border-ink-600/70 px-8 transition-colors duration-500 hover:border-gold/40",
        className
      )}
    >
      <span className="whitespace-nowrap font-display text-xl tracking-wide text-ivory-mute transition-colors duration-500 group-hover/logo:text-gold">
        {name}
      </span>
    </div>
  );
}
