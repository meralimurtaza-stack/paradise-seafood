import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0C1117",
          gold: "#B89B5E",
          cream: "#F0ECE2",
          "light-bg": "#F5F2EB",
          muted: "#94a3b8",
          teal: "#0A7E8C",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        brand: ["Georgia", "'Times New Roman'", "serif"],
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
