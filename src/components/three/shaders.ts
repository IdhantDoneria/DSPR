/* GLSL for the hero's GPU ambient particle field. Movement is computed in the
 * vertex shader so thousands of points stay cheap on the main thread. */

export const ambientVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;

  attribute float aScale;
  attribute float aPhase;

  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Gentle, organic drift — each point keeps its own phase.
    p.x += sin(uTime * 0.15 + aPhase) * 0.45;
    p.y += cos(uTime * 0.12 + aPhase * 1.3) * 0.45;
    p.z += sin(uTime * 0.10 + aPhase * 0.7) * 0.45;

    // Soft push away from the pointer for a sense of presence.
    vec3 toMouse = p - uMouse;
    float md = length(toMouse);
    float influence = smoothstep(3.2, 0.0, md);
    p += normalize(toMouse + 0.0001) * influence * 1.1;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective size attenuation.
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / max(-mvPosition.z, 0.1));

    // Twinkle.
    vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 1.4 + aPhase * 6.2831));
  }
`;

export const ambientFragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float strength = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColorA, uColorB, vAlpha);
    gl_FragColor = vec4(color, strength * vAlpha * 0.9);
  }
`;

export const nodeVertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * uPixelRatio;
    gl_PointSize *= (1.0 / max(-mvPosition.z, 0.1));
  }
`;

export const nodeFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float glow = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(uColor, core * 0.9 + glow * 0.3);
  }
`;
