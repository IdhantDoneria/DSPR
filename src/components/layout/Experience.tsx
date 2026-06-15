"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Client shell that wires the smooth-scroll context and global UI overlays
 * (preloader, grain, progress) around the page content. Uses the native
 * system cursor.
 */
export function Experience({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-indigo focus:px-5 focus:py-2 focus:text-sm focus:text-canvas-cool"
      >
        Skip to content
      </a>

      <Preloader />
      <ScrollProgress />
      <div className="grain-overlay" aria-hidden />

      <Header />
      <main id="main">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
