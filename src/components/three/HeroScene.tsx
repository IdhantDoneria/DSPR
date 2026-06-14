"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AmbientField } from "./AmbientField";
import { InfluenceNetwork } from "./InfluenceNetwork";

export type Quality = "high" | "low";

/**
 * Composes the hero's two particle layers, tracks the pointer in world space
 * (shared by both layers), and applies a restrained camera parallax + slow
 * auto-rotation for a sense of depth.
 */
export function HeroScene({ quality }: { quality: Quality }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const mouseWorld = useRef(new THREE.Vector3());
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const counts = useMemo(
    () =>
      quality === "high"
        ? { ambient: 1900, nodes: 92 }
        : { ambient: 700, nodes: 46 },
    [quality]
  );

  useFrame((state) => {
    const { pointer } = state;

    // Project the pointer onto the z = 0 plane for both particle layers.
    tmp.set(pointer.x, pointer.y, 0.5).unproject(camera);
    tmp.sub(camera.position).normalize();
    const distance = -camera.position.z / tmp.z;
    mouseWorld.current.lerp(
      tmp.multiplyScalar(distance).add(camera.position),
      0.12
    );

    // Subtle camera parallax — premium over aggressive.
    camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Slow continuous rotation keeps the network alive.
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0006;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <AmbientField count={counts.ambient} mouse={mouseWorld} />
      <InfluenceNetwork count={counts.nodes} mouse={mouseWorld} />
    </group>
  );
}
