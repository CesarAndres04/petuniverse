import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // ─── Paleta PetUniverse ───────────────────────────────────────
      colors: {
        // Crema orgánico — fondos principales, transmite calidez natural
        cream: {
          50:  "#FDFAF4",
          100: "#FAF5E8",
          200: "#F5EDD4",
          300: "#EDE4C0",
          DEFAULT: "#F5F0E8",
          600: "#D4C9A8",
          800: "#A89E80",
        },
        // Verde bosque suave — confianza, naturaleza, salud
        forest: {
          50:  "#EEF5F1",
          100: "#D4E8DA",
          200: "#A8D0B5",
          300: "#7AB890",
          400: "#4A7C59",
          500: "#3D6B4A",
          600: "#2D5A3D",
          700: "#1F4030",
          DEFAULT: "#4A7C59",
        },
        // Terracota — llamadas a la acción, acentos emocionales
        terra: {
          50:  "#FBF1EC",
          100: "#F5DDD1",
          200: "#EABBA3",
          300: "#DE9975",
          400: "#C4714A",
          500: "#B8603E",
          600: "#A85530",
          700: "#8B4225",
          DEFAULT: "#C4714A",
        },
        // Shadcn compatibility
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // ─── Tipografías ──────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      // ─── Border Radius ────────────────────────────────────────────
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ─── Animaciones micro-interacciones ─────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "paw-print": {
          "0%":   { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "50%":  { transform: "scale(1.1) rotate(5deg)",  opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)",    opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s ease-out",
        "fade-in":        "fade-in 0.4s ease-out",
        float:            "float 3s ease-in-out infinite",
        "paw-print":      "paw-print 0.5s ease-out",
        shimmer:          "shimmer 2s linear infinite",
      },

      // ─── Sombras premium ─────────────────────────────────────────
      boxShadow: {
        "card-hover": "0 20px 40px rgba(74, 124, 89, 0.15), 0 8px 16px rgba(0,0,0,0.08)",
        "card-base":  "0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
        "terra":      "0 8px 24px rgba(196, 113, 74, 0.25)",
        "forest":     "0 8px 24px rgba(74, 124, 89, 0.25)",
        glow:         "0 0 30px rgba(74, 124, 89, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
