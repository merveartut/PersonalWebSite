/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "roboto-mono": ['"Roboto Mono"', "monospace"],
        "source-code-pro": ['"Source Code Pro"', "monospace"],
        rubik: ['"Rubik"', "monospace"],
        roboto: ['"Roboto"', "monospace"],
        zain: ['"Zain"', "monospace"],
        jura: ['"Jura"', "monospace"],
        titillium: ['"Titillium Web"', "sans-serif"],
        londrina: ['"Londrina Shadow"'],
        notable: ['"Notable"'],
        nerko: ["Nerko One"],
        anton: ["Anton"],
      },
    },
    keyframes: {
      blinkWithShadow: {
        "0%, 100%": { opacity: "1", "box-shadow": "0 0 10px rgba(0,0,0,0.5)" },
        "50%": { opacity: "0.3", "box-shadow": "0 0 2px rgba(0,0,0,0.2)" },
      },
      blink: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.3" },
      },
    },
    animation: {
      blinkWithShadow: "blinkWithShadow 2s infinite",
      blink: "blink 2s infinite",
    },
  },
  plugins: [],
};
