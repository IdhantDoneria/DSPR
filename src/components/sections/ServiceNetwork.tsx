"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/data";

/**
 * An animated SVG constellation for the active service: a central node wired to
 * one satellite per sub-service. Connections draw in (pathLength) and the whole
 * cluster rotates slowly. Re-keys on service change to replay the choreography.
 */
export function ServiceNetwork({ service }: { service: Service }) {
  const size = 420;
  const c = size / 2;
  const radius = 150;
  const nodes = service.items.map((_, i) => {
    const angle = (i / service.items.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: c + Math.cos(angle) * radius,
      y: c + Math.sin(angle) * radius,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-full w-full"
      aria-hidden
      role="presentation"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2E2B73" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2E2B73" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rotating cluster */}
      <motion.g
        key={service.id}
        style={{ originX: "50%", originY: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        {/* Connections */}
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1={c}
            y1={c}
            x2={n.x}
            y2={n.y}
            stroke="#2E2B73"
            strokeWidth={0.75}
            strokeOpacity={0.45}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: "easeOut" }}
          />
        ))}

        {/* Satellite nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={`n-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: "backOut" }}
          >
            <circle cx={n.x} cy={n.y} r={14} fill="url(#nodeGlow)" />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={3.5}
              fill="#B98B3A"
              animate={{ r: [3.5, 5, 3.5] }}
              transition={{
                duration: 2.4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}

        {/* Central hub */}
        <circle cx={c} cy={c} r={30} fill="url(#nodeGlow)" />
        <circle cx={c} cy={c} r={9} fill="#2E2B73" />
        <motion.circle
          cx={c}
          cy={c}
          r={9}
          fill="none"
          stroke="#B98B3A"
          strokeWidth={1}
          animate={{ r: [9, 26], opacity: [0.6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.g>
    </svg>
  );
}
