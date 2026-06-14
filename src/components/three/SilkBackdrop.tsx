"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A flowing 3D silk-cloth backdrop — a high-segment plane displaced by layered
 * waves in the vertex shader, lit with an indigo→gold sheen in the fragment
 * shader. Mirrors DSPR's signature draped-fabric identity. Cheap (single mesh),
 * pointer-transparent, and motion-aware.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;

    // Layered travelling waves = draped, breathing silk.
    float w =
      sin(p.x * 1.6 + uTime * 0.55) * 0.55 +
      sin(p.y * 2.1 - uTime * 0.42) * 0.40 +
      sin((p.x + p.y) * 1.1 + uTime * 0.30) * 0.35;

    p.z += w * uAmp;
    vWave = w;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA; // indigo
  uniform vec3 uColorB; // gold
  uniform vec3 uColorC; // cream highlight
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    // Diagonal silk gradient, animated sheen sweeping across the weave.
    float g = clamp(vUv.x * 0.6 + vUv.y * 0.4, 0.0, 1.0);
    vec3 base = mix(uColorA, uColorB, smoothstep(0.15, 0.95, g));

    // Sheen band follows the wave crests.
    float sheen = smoothstep(0.25, 1.0, vWave * 0.5 + 0.5);
    float sweep = 0.5 + 0.5 * sin(vUv.x * 6.2831 - uTime * 0.6);
    base = mix(base, uColorC, sheen * sweep * 0.45);

    // Soft vignette into the cream page so the cloth dissolves at the edges.
    float edge = smoothstep(0.0, 0.32, vUv.x) * smoothstep(1.0, 0.68, vUv.x) *
                 smoothstep(0.0, 0.32, vUv.y) * smoothstep(1.0, 0.68, vUv.y);

    gl_FragColor = vec4(base, edge * 0.9);
  }
`;

function Cloth({ reduced }: { reduced: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: reduced ? 0.0 : 1.0 },
      uColorA: { value: new THREE.Color("#2e2b73") }, // indigo
      uColorB: { value: new THREE.Color("#b98b3a") }, // gold
      uColorC: { value: new THREE.Color("#faf8f3") }, // cream sheen
    }),
    [reduced]
  );

  useFrame((_, delta) => {
    if (matRef.current && !reduced) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={[-0.55, 0.0, 0.32]} scale={[1.35, 1.35, 1]}>
      <planeGeometry args={[14, 9, reduced ? 24 : 120, reduced ? 16 : 80]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function SilkBackdrop({ className }: { className?: string }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Cloth reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
