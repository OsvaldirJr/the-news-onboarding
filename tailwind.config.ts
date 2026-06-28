import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amarelo de marca "THE NEWS"
        brand: {
          DEFAULT: "#FACC15",
          dark: "#EAB308",
        },
        // Amarelo de destaque para botão e progress bar
        accent: "#FFD700",
        ink: "#111111",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        // Desenha o traço da linha conectora ao trocar de tela
        drawLine: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        drawLine: "drawLine 900ms ease-in-out forwards",
        fadeUp: "fadeUp 500ms ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
