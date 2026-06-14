"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * The "loom" — a curtain of vertical silk threads rendered as a single plane
 * displaced in the vertex shader. The active service re-tensions the weave
 * (amplitude pulse + phase/colour shift) and lights N threads in gold, where N
 * is the number of capabilities in that service. One draw call, motion-aware.
 * This is DSPR's signature: every service is a different woven narrative.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float phase = uv.x * 14.0;
    float w =
      sin(p.y * 1.5 + uTime * 1.15 + phase) * 0.55 +
      sin(p.y * 0.8 - uTime * 0.7 + phase * 0.5) * 0.45;
    p.z += w * uAmp;
    p.x += w * uAmp * 0.12;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uThreads;
  uniform float uActiveCount;
  uniform vec3 uColorA; // indigo
  uniform vec3 uColorB; // gold
  uniform vec3 uSheen;  // cream
  varying vec2 vUv;
  varying float vWave;

  void main() {
    // Split the panel into vertical threads.
    float tcoord = vUv.x * uThreads;
    float idx = floor(tcoord);
    float f = fract(tcoord);

    // Thin strand down the centre of each cell, soft-edged.
    float d = abs(f - 0.5);
    float strand = smoothstep(0.24, 0.10, d);
    if (strand <= 0.001) discard;

    // Threads below the active count glow gold (the woven capabilities).
    float activeT = step(idx + 0.5, uActiveCount);
    vec3 base = mix(uColorA, uColorB, activeT);

    // Travelling satin highlight + crest sheen.
    float sweep = 0.5 + 0.5 * sin(vUv.y * 9.0 - uTime * 1.6 + idx * 0.7);
    base = mix(base, uSheen, sweep * 0.22 + max(vWave, 0.0) * 0.28);

    // Fade top/bottom into the cream panel.
    float vfade = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.84, vUv.y);
    float alpha = strand * vfade * (0.42 + 0.45 * activeT);

    gl_FragColor = vec4(base, alpha);
  }
`;

function Loom({
  count,
  reduced,
}: {
  count: number;
  reduced: boolean;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  // Threads scale with the richest service so the weave always fills the panel.
  const threads = 22;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: reduced ? 0.0 : 0.85 },
      uThreads: { value: threads },
      uActiveCount: { value: (count / 8) * threads },
      uColorA: { value: new THREE.Color("#2E2B73") },
      uColorB: { value: new THREE.Color("#B98B3A") },
      uSheen: { value: new THREE.Color("#FAF8F3") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Target glowing-thread count, mapped from the active service's capabilities.
  const targetActive = useRef(0);
  targetActive.current = (count / 8) * threads;

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    if (!reduced) u.uTime.value += Math.min(delta, 0.05);
    // Ease the weave toward the active service + a gentle re-tension pulse.
    u.uActiveCount.value += (targetActive.current - u.uActiveCount.value) * 0.08;
    const targetAmp = reduced ? 0 : 0.85;
    u.uAmp.value += (targetAmp - u.uAmp.value) * 0.05;
  });

  return (
    <mesh>
      <planeGeometry args={[8, 6.4, reduced ? 8 : 200, reduced ? 8 : 44]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}

export function ServiceLoom({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <div aria-hidden className={className} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Loom count={count} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
