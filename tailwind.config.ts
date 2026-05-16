import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        "background-soft": "rgb(var(--background-soft) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        content: ["var(--font-content)"],
        heading: ["var(--font-heading)"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(255,255,255,0.06), 0 0 60px rgba(255,255,255,0.03)",
        "glow-strong": "0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.05)",
        "glow-soft": "0 0 24px rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
