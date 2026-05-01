import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D7377",
          light: "#14B8A6",
          lighter: "#5EEAD4",
        },
        accent: {
          DEFAULT: "#6D28D9",
          light: "#8B5CF6",
          lighter: "#C4B5FD",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C96F",
        },
        dark: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
        light: {
          DEFAULT: "#F8FAFC",
          muted: "#F0FDFA",
        },
        surface: {
          DEFAULT: "#FFFFFF",
        },
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
      },
      fontFamily: {
        heading: [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          "Georgia",
          "serif",
        ],
        body: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        cute: [
          '"ZCOOL KuaiLe"',
          '"Ma Shan Zheng"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          "cursive",
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-cyan": "pulseCyan 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(13,115,119,0.2), 0 0 10px rgba(13,115,119,0.1)" },
          "100%": { boxShadow: "0 0 10px rgba(13,115,119,0.4), 0 0 20px rgba(13,115,119,0.2)" },
        },
        pulseCyan: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
