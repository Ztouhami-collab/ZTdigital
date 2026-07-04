import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#7EC83A",
          "green-dark": "#5BA224",
          "green-soft": "#E2F5C4",
          dark: "#1C1826",
        },
        ink: {
          DEFAULT: "#1C1826",
          muted: "#6C6776",
          faint: "#8A8593",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
