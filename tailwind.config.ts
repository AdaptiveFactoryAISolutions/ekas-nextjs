import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-border))",
        ring: "hsl(var(--color-accent-primary))",
        background: "hsl(var(--color-bg-primary))",
        foreground: "hsl(var(--color-text-primary))",
        primary: {
          DEFAULT: "hsl(var(--color-accent-primary))",
          foreground: "#0d1b2a",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-bg-section))",
          foreground: "hsl(var(--color-text-primary))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-bg-card))",
          foreground: "hsl(var(--color-text-secondary))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent-primary))",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-rajdhani)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
