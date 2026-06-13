"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Client shell that wires the smooth-scroll context and global UI overlays
 * (preloader, custom cursor, grain, progress) around the page content.
 */
export function Experience({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Preloader />
      <Cursor />
      <ScrollProgress />
      <div className="grain-overlay" aria-hidden />

      <Header />
      <main id="main">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
