"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { HeroScene, type Quality } from "./HeroScene";

/**
 * Performance-tuned R3F canvas for the hero. Clamps DPR, adapts resolution
 * under load, and renders behind the hero typography. The whole thing is
 * client-only and lazily mounted by the Hero section.
 */
export function HeroCanvas({ quality }: { quality: Quality }) {
  return (
    <Canvas
      className="!absolute inset-0 pointer-events-none [@media(hover:hover)]:pointer-events-auto"
      camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, quality === "high" ? 2 : 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
    >
      <color attach="background" args={["#F4F1EA"]} />
      <fog attach="fog" args={["#F4F1EA", 16, 34]} />
      <Suspense fallback={null}>
        <HeroScene quality={quality} />
      </Suspense>
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
    </Canvas>
  );
}
