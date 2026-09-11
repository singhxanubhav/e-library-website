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
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          50: "#f0f3f9",
          100: "#d9e2f0",
          200: "#b3c6e1",
          300: "#8ca9d1",
          400: "#4f75ad",
          500: "#1c2541",
          600: "#141c33",
          700: "#0e1529",
          800: "#0b132b", // Primary Navy Spec
          900: "#070c1c",
          950: "#040710",
        },
        electric: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#5B6CFF", // Electric Blue Spec
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        purpleAccent: {
          400: "#a78bfa",
          500: "#8B5CF6", // Purple Accent Spec
          600: "#7c3aed",
        },
        amberHighlight: {
          400: "#fbbf24",
          500: "#F59E0B", // Amber Spec
          600: "#d97706",
        },
        orangeHighlight: {
          500: "#F97316", // Orange Spec
        },
        primary: {
          DEFAULT: "#0B132B",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#5B6CFF",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -2px rgba(11, 19, 43, 0.06), 0 2px 6px -1px rgba(11, 19, 43, 0.04)",
        card: "0 10px 30px -4px rgba(11, 19, 43, 0.08), 0 4px 12px -2px rgba(11, 19, 43, 0.03)",
        glow: "0 0 28px -4px rgba(91, 108, 255, 0.35)",
        "glow-amber": "0 0 28px -4px rgba(245, 158, 11, 0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
