import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-inter)", "var(--font-noto-sans-sc)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-noto-sans-sc)", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;