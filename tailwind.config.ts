import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* DSPR editorial palette — silk-cream canvas, royal indigo, warm gold.
         * Mirrors the live dspr.in identity: light fabric ground, deep violet
         * section rules, amber/gold magazine warmth, near-black serif type. */
        canvas: {
          DEFAULT: "#F4F1EA", // silk cream ground
          warm: "#EFE9DC", // warmer parchment
          cool: "#FAF8F3", // near-white highlight
          shade: "#E7E1D4", // soft fabric shadow
        },
        ink: {
          DEFAULT: "#16151A", // near-black, faintly cool — primary text
          900: "#16151A",
          800: "#23222A",
          700: "#3A3844",
          600: "#5A5766",
          500: "#7C7888",
          dim: "#6E6A5E", // muted warm gray on cream
          mute: "#9A958A",
        },
        indigo: {
          DEFAULT: "#2E2B73", // signature royal indigo (section rules)
          light: "#4A46A8",
          glow: "#6C67D6",
          deep: "#1C1A47",
        },
        gold: {
          DEFAULT: "#B98B3A", // warm amber-gold (legible on cream)
          light: "#D9A94B",
          amber: "#D9892F", // magazine / briefcase warmth
          deep: "#8C6420",
        },
        /* Kept for backwards-compat with any dark-on-light inversions */
        ivory: {
          DEFAULT: "#F4F1EA",
          dim: "#6E6A5E",
          mute: "#9A958A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial display sizes
        "display-sm": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(3.5rem, 9vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(4.5rem, 15vw, 16rem)", { lineHeight: "0.85", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        widest: "0.3em",
        ultra: "0.45em",
      },
      maxWidth: {
        "8xl": "90rem",
        prose: "62ch",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxe-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2%, 1%)" },
          "50%": { transform: "translate(1%, -2%)" },
          "75%": { transform: "translate(-1%, 2%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "silk-sheen": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "rule-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "marquee-left": "marquee-left var(--marquee-duration, 40s) linear infinite",
        "marquee-right": "marquee-right var(--marquee-duration, 40s) linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 1s ease forwards",
        "silk-sheen": "silk-sheen 18s ease-in-out infinite",
        "rule-pulse": "rule-pulse 5s ease-in-out infinite",
      },
      backgroundImage: {
        "silk-radial":
          "radial-gradient(120% 80% at 50% -10%, #FAF8F3 0%, #F4F1EA 40%, #E7E1D4 100%)",
        "indigo-rule":
          "linear-gradient(90deg, transparent, #2E2B73 18%, #4A46A8 50%, #2E2B73 82%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
