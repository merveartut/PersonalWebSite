/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-mono": ['"Roboto Mono"', "monospace"],
        "source-code-pro": ['"Source Code Pro"', "monospace"],
        rubik: ['"Rubik", "monospace"'],
        roboto: ['"Roboto", "monospace'],
        zain: ['"Zain", "monospace"'],
        jura: ['"Jura", "monospace"'],
        titillium: ['"Titillium Web']
      },
    },
  },
  plugins: [],
};
