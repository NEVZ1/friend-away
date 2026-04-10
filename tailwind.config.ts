import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#38BDF8",
        accent: "#22C55E",
        background: "#F8FAFC",
        card: "#FFFFFF",
        text: "#0F172A",
        muted: "#64748B",
        border: "#E2E8F0"
      },
      borderRadius: {
        xl: "12px",
        "2xl": "18px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(79, 70, 229, 0.20), transparent 30%), radial-gradient(circle at top right, rgba(56, 189, 248, 0.18), transparent 35%), linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)"
      }
    }
  },
  plugins: []
};

export default config;
