"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ambientVertexShader, ambientFragmentShader } from "./shaders";

/** A large drifting cloud of GPU particles — the atmospheric "dust" layer. */
export function AmbientField({
  count = 1800,
  radius = 14,
  mouse,
}: {
  count?: number;
  radius?: number;
  mouse: React.MutableRefObject<THREE.Vector3>;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const { positions, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a flattened ellipsoid for an editorial, horizon-like depth.
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.3;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.8;
      scales[i] = 8 + Math.random() * 26;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, scales, phases };
  }, [count, radius]);

  // Stable uniforms object (mutated in useFrame, never re-assigned).
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 22 },
      uPixelRatio: { value: 1 },
      uMouse: { value: new THREE.Vector3() },
      uColorA: { value: new THREE.Color("#9c7e45") },
      uColorB: { value: new THREE.Color("#e4d2a4") },
    }),
    []
  );

  // Keep apparent point size consistent across viewports.
  const baseSize = (Math.min(viewport.width, 18) / 18) * 22;

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += delta;
    u.uSize.value = baseSize;
    u.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    u.uMouse.value.lerp(mouse.current, 0.08);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={ambientVertexShader}
        fragmentShader={ambientFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
