import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "768px",
      md: "1080px",
      lg: "1600px",
    },
    spacing: {
      "0": "0",
      "02e": "0.2em",
      "05e": "0.5em",
      1: "1px",
      "1e": "1em",
      "1re": "1rem",
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      gutter: "var(--gutter)",
      "header-height": "var(--header-height)",
    },
    colors: {
      black: "black",
      white: "white",
      red: "var(--color-red)",
      blue: "var(--color-blue)",
    },
    fontSize: {
      sm: ["var(--text-sm)", "1.1"],
      md: ["var(--text-md)", "1.0666667"],
      lg: ["var(--text-lg)", "1"],
    },
    fontFamily: {
      "font-sans": "[var(--font-sans)]",
    },
  },
  plugins: [],
};
export default config;
