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
        /* Warm editorial luxury palette */
        ink: {
          DEFAULT: "#0A0907", // near-black canvas, warm
          900: "#0A0907",
          800: "#12100C",
          700: "#1A1712",
          600: "#262119",
          500: "#3A332A",
        },
        ivory: {
          DEFAULT: "#F4EFE6",
          dim: "#C9C2B5",
          mute: "#8C857A",
        },
        gold: {
          DEFAULT: "#C6A664", // champagne gold accent
          light: "#E4D2A4",
          deep: "#9C7E45",
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
      },
      animation: {
        "marquee-left": "marquee-left var(--marquee-duration, 40s) linear infinite",
        "marquee-right": "marquee-right var(--marquee-duration, 40s) linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 1s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
