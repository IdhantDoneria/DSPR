"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A single flowing silk ribbon. The flat plane is bent onto an animated 3D
 * curve entirely in the vertex shader (analytic Frenet-style frame), so the
 * lighting/fresnel is correct and the whole thing stays a single cheap draw
 * call. Reads as draped, sheening fabric — DSPR's storytelling identity.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uLoops;
  uniform float uRadius;
  uniform float uHeight;
  uniform float uWidth;
  uniform float uTwist;
  uniform float uSpeed;
  uniform float uPhase;
  uniform float uWave;

  varying float vT;
  varying float vS;
  varying vec3 vNormal;
  varying vec3 vView;

  const float PI = 3.141592653589793;
  const float TAU = 6.283185307179586;

  vec3 curve(float t) {
    float a = (t - 0.5) * uLoops * TAU + uPhase + uTime * uSpeed;
    float r = uRadius + 0.6 * sin(t * PI * 2.0 + uTime * 0.5 + uPhase);
    float x = r * sin(a);
    float z = r * cos(a * 0.85);
    float y = uHeight * sin(t * PI * uWave + uTime * 0.6 + uPhase)
            + 0.5 * sin(a * 1.7 + uTime * 0.4);
    return vec3(x, y, z);
  }

  void main() {
    float t = uv.x;
    float s = uv.y;
    vT = t;
    vS = s;

    float eps = 0.001;
    vec3 p0 = curve(t);
    vec3 tangent = normalize(curve(t + eps) - curve(t - eps));

    // Stable reference axis to avoid a degenerate frame at the poles.
    vec3 ref = abs(tangent.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 binormal = normalize(cross(tangent, ref));
    vec3 normal = normalize(cross(binormal, tangent));

    // Twist the ribbon around its own length (Rodrigues rotation about tangent).
    float tw = (t - 0.5) * uTwist + uTime * 0.3 + uPhase;
    float c = cos(tw);
    float sn = sin(tw);
    vec3 b = binormal * c + normal * sn;
    vec3 n = -binormal * sn + normal * c;

    vec3 pos = p0 + b * ((s - 0.5) * uWidth);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vNormal = normalize(normalMatrix * n);
    vView = -mvPosition.xyz;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uSheen;
  uniform float uTime;

  varying float vT;
  varying float vS;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);

    // Double-sided fabric, so fold the dot product.
    float fres = pow(1.0 - abs(dot(N, V)), 2.5);

    // Indigo -> gold along the ribbon, with a travelling satin highlight.
    vec3 base = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vT));
    float sweep = 0.5 + 0.5 * sin(vT * 14.0 - uTime * 1.2);
    base = mix(base, uSheen, fres * 0.85 + sweep * 0.12);

    // Soft fade at the ribbon edges and its two ends — no hard cuts.
    float edge = smoothstep(0.0, 0.16, vS) * smoothstep(1.0, 0.84, vS);
    float ends = smoothstep(0.0, 0.05, vT) * smoothstep(1.0, 0.95, vT);
    float alpha = (0.42 + 0.5 * fres) * edge * ends;

    gl_FragColor = vec4(base, alpha);
  }
`;

type RibbonConfig = {
  loops: number;
  radius: number;
  height: number;
  width: number;
  twist: number;
  speed: number;
  phase: number;
  wave: number;
  colorA: string;
  colorB: string;
  rotationSpeed: number;
};

function Ribbon(cfg: RibbonConfig) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: cfg.phase * 3.0 },
      uLoops: { value: cfg.loops },
      uRadius: { value: cfg.radius },
      uHeight: { value: cfg.height },
      uWidth: { value: cfg.width },
      uTwist: { value: cfg.twist },
      uSpeed: { value: cfg.speed },
      uPhase: { value: cfg.phase },
      uWave: { value: cfg.wave },
      uColorA: { value: new THREE.Color(cfg.colorA) },
      uColorB: { value: new THREE.Color(cfg.colorB) },
      uSheen: { value: new THREE.Color("#FAF8F3") },
    }),
    [cfg]
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (matRef.current) matRef.current.uniforms.uTime.value += d;
    if (meshRef.current) meshRef.current.rotation.y += d * cfg.rotationSpeed;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 260, 2]} />
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

const RIBBONS: RibbonConfig[] = [
  {
    loops: 1.0, radius: 3.3, height: 1.7, width: 1.15, twist: 5.0,
    speed: 0.22, phase: 0.0, wave: 3.0, colorA: "#2E2B73", colorB: "#4A46A8",
    rotationSpeed: 0.05,
  },
  {
    loops: 1.0, radius: 2.6, height: 2.1, width: 0.85, twist: 7.0,
    speed: -0.18, phase: 2.1, wave: 4.0, colorA: "#4A46A8", colorB: "#B98B3A",
    rotationSpeed: -0.07,
  },
  {
    loops: 1.0, radius: 3.9, height: 1.2, width: 0.7, twist: 3.5,
    speed: 0.15, phase: 4.2, wave: 2.0, colorA: "#1C1A47", colorB: "#D9892F",
    rotationSpeed: 0.04,
  },
];

/** The hero centerpiece — three interwoven silk ribbons. */
export function SilkRibbons({ quality }: { quality: "high" | "low" }) {
  const ribbons = quality === "high" ? RIBBONS : RIBBONS.slice(0, 2);
  return (
    <group rotation={[0.2, 0, 0.12]} scale={1.05}>
      {ribbons.map((cfg, i) => (
        <Ribbon key={i} {...cfg} />
      ))}
    </group>
  );
}
