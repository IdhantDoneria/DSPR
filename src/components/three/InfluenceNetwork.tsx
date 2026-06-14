"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { nodeVertexShader, nodeFragmentShader } from "./shaders";

/**
 * The "floating influence network": a modest set of nodes that drift, repel
 * from the pointer, and draw dynamic connecting lines whose brightness scales
 * with proximity. Node count is small enough that the O(n²) link pass is cheap.
 */
export function InfluenceNetwork({
  count = 90,
  radius = 8,
  connectDistance = 2.6,
  mouse,
}: {
  count?: number;
  radius?: number;
  connectDistance?: number;
  mouse: React.MutableRefObject<THREE.Vector3>;
}) {
  // Persistent simulation state.
  const sim = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.6;
      vel[i * 3] = (Math.random() - 0.5) * 0.12;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }
    return { pos, vel };
  }, [count, radius]);

  const maxSegments = count * count;
  const lineGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const nodeGeo = useMemo(() => new THREE.BufferGeometry(), []);

  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 2 * 3),
    [maxSegments]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxSegments * 2 * 3),
    [maxSegments]
  );

  useMemo(() => {
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(sim.pos, 3));
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  }, [lineGeo, nodeGeo, sim.pos, linePositions, lineColors]);

  const nodeUniforms = useMemo(
    () => ({
      uSize: { value: 26 },
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color("#2e2b73") },
    }),
    []
  );

  const gold = useMemo(() => new THREE.Color("#2e2b73"), []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const { pos, vel } = sim;
    const m = mouse.current;
    const r2 = radius * radius;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // integrate
      pos[ix] += vel[ix] * delta * 6;
      pos[ix + 1] += vel[ix + 1] * delta * 6;
      pos[ix + 2] += vel[ix + 2] * delta * 6;

      // soft spherical containment
      const dsq =
        pos[ix] * pos[ix] + pos[ix + 1] * pos[ix + 1] + pos[ix + 2] * pos[ix + 2];
      if (dsq > r2) {
        vel[ix] -= (pos[ix] / radius) * 0.02;
        vel[ix + 1] -= (pos[ix + 1] / radius) * 0.02;
        vel[ix + 2] -= (pos[ix + 2] / radius) * 0.02;
      }

      // pointer repulsion
      const dx = pos[ix] - m.x;
      const dy = pos[ix + 1] - m.y;
      const dz = pos[ix + 2] - m.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.0001;
      if (dist < 3) {
        const f = (1 - dist / 3) * 0.06;
        vel[ix] += (dx / dist) * f;
        vel[ix + 1] += (dy / dist) * f;
        vel[ix + 2] += (dz / dist) * f;
      }

      // mild damping keeps the field calm
      vel[ix] *= 0.99;
      vel[ix + 1] *= 0.99;
      vel[ix + 2] *= 0.99;
    }

    // Build connections.
    let seg = 0;
    const cd2 = connectDistance * connectDistance;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const dx = pos[ix] - pos[jx];
        const dy = pos[ix + 1] - pos[jx + 1];
        const dz = pos[ix + 2] - pos[jx + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < cd2) {
          const t = 1 - Math.sqrt(d2) / connectDistance; // 0..1 closeness
          const o = seg * 6;
          linePositions[o] = pos[ix];
          linePositions[o + 1] = pos[ix + 1];
          linePositions[o + 2] = pos[ix + 2];
          linePositions[o + 3] = pos[jx];
          linePositions[o + 4] = pos[jx + 1];
          linePositions[o + 5] = pos[jx + 2];
          const c = t * 0.85;
          lineColors[o] = gold.r * c;
          lineColors[o + 1] = gold.g * c;
          lineColors[o + 2] = gold.b * c;
          lineColors[o + 3] = gold.r * c;
          lineColors[o + 4] = gold.g * c;
          lineColors[o + 5] = gold.b * c;
          seg++;
        }
      }
    }

    lineGeo.setDrawRange(0, seg * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    nodeGeo.attributes.position.needsUpdate = true;

    nodeUniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
  });

  return (
    <group>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </lineSegments>
      <points geometry={nodeGeo}>
        <shaderMaterial
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
