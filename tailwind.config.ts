import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Material Design 3 surface system
        surface: {
          DEFAULT: "#0f141a",
          dim: "#0f141a",
          bright: "#353a40",
          tint: "#e2c382",
          variant: "#30353c",
        },
        "surface-container": {
          lowest: "#0a0f15",
          low: "#171c22",
          DEFAULT: "#1b2026",
          high: "#252a31",
          highest: "#30353c",
        },
        // Primary (gold)
        primary: {
          DEFAULT: "#e2c382",
          container: "#b89b5e",
          fixed: "#ffdf9e",
          "fixed-dim": "#e2c382",
        },
        "on-primary": {
          DEFAULT: "#3f2e00",
          container: "#463300",
          fixed: "#261a00",
          "fixed-variant": "#59440f",
        },
        // Secondary
        secondary: {
          DEFAULT: "#c2c7cf",
          container: "#474c53",
          fixed: "#dee3eb",
          "fixed-dim": "#c2c7cf",
        },
        "on-secondary": {
          DEFAULT: "#2c3137",
          container: "#b7bcc4",
          fixed: "#171c22",
          "fixed-variant": "#42474e",
        },
        // Tertiary
        tertiary: {
          DEFAULT: "#bdc8d3",
          container: "#96a0ab",
          fixed: "#dae3f0",
          "fixed-dim": "#bdc8d3",
        },
        "on-tertiary": {
          DEFAULT: "#28313b",
          container: "#2d3740",
          fixed: "#131d25",
          "fixed-variant": "#3e4852",
        },
        // Surface content
        "on-surface": {
          DEFAULT: "#dee3eb",
          variant: "#d0c5b5",
        },
        // Outline
        outline: {
          DEFAULT: "#999081",
          variant: "#4d463a",
        },
        // Error
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
        },
        "on-error": {
          DEFAULT: "#690005",
          container: "#ffdad6",
        },
        // Inverse
        inverse: {
          surface: "#dee3eb",
          "on-surface": "#2c3137",
          primary: "#735b25",
        },
        // Background
        background: "#0f141a",
        "on-background": "#dee3eb",
        // Legacy aliases for compatibility
        brand: {
          dark: "#0f141a",
          gold: "#e2c382",
          cream: "#dee3eb",
          "light-bg": "#F5F2EB",
          muted: "#999081",
          teal: "#0A7E8C",
        },
      },
      fontFamily: {
        headline: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        label: ["'DM Sans'", "sans-serif"],
        "serif-num": ["'Noto Serif'", "serif"],
        // Legacy aliases
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        "3xl": "1rem",
      },
      keyframes: {
        "fade-slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "breath-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-slide-up 0.6s ease both",
        "fade-up-1": "fade-slide-up 0.6s ease 0.1s both",
        "fade-up-2": "fade-slide-up 0.6s ease 0.2s both",
        "fade-up-3": "fade-slide-up 0.6s ease 0.3s both",
        "fade-up-4": "fade-slide-up 0.6s ease 0.4s both",
        "pulse-dot": "pulse 1s ease infinite",
        "breath-glow": "breath-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
