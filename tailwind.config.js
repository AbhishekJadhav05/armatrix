/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#E8FF47",
        "surface-dim": "#0A0A0A",
        "surface": "#111111",
        "surface-container": "#1A1A1A",
        "surface-container-highest": "#353534",
        "surface-container-low": "#1C1B1B",
        "surface-container-lowest": "#0E0E0E",
        "outline-variant": "#242424",
        "on-surface": "#E5E2E1",
        "on-surface-variant": "#C7C8AE"
      },
      fontFamily: {
        "syne": ["var(--font-syne)", "sans-serif"],
        "mono": ["var(--font-mono)", "monospace"],
        "body": ["var(--font-body)", "sans-serif"],
        "headline": ["var(--font-headline)", "sans-serif"]
      },
      borderRadius: {
        "none": "0px",
        "DEFAULT": "0px"
      }
    }
  },
  plugins: [],
};
