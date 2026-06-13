"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  /** When a real asset exists in /public, pass its path here. */
  src?: string;
  alt: string;
  monogram?: string;
  caption?: string;
  className?: string;
  rounded?: boolean;
  priority?: boolean;
}

/**
 * Displays an image when `src` is provided; otherwise renders a refined
 * editorial placeholder (gradient + monogram) so the layout reads as finished
 * before real photography is dropped in. Replace by passing `src`.
 */
export function MediaFrame({
  src,
  alt,
  monogram,
  caption,
  className,
  rounded = true,
  priority,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-ink-700",
        rounded && "rounded-xl",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 30% 20%, #2a2418 0%, #14110c 60%, #0d0b07 100%)",
          }}
        >
          {/* faint editorial grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(#c6a66422 1px, transparent 1px), linear-gradient(90deg, #c6a66422 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {monogram && (
            <span className="absolute inset-0 flex items-center justify-center font-display text-7xl text-gold/30 sm:text-8xl">
              {monogram}
            </span>
          )}
          {caption && (
            <span className="absolute bottom-4 left-5 font-display text-sm italic text-ivory-mute">
              {caption}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
