"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  /** Seconds for one full loop. Larger = slower. */
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Seamless infinite marquee. The track is duplicated and translated by -50%,
 * so the second copy lines up exactly where the first began.
 */
export function Marquee({
  children,
  direction = "left",
  duration = 40,
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={cn("group relative w-full overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          pauseOnHover && "group-hover:marquee-paused"
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
