// tailwind.config.js
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'], // Bu satır değişti
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Mode renkleri
        light: {
          background: "#f8f8f8",
          text: "#333333",
          primary: "#6B46C1",
          secondary: "#9F7AEA",
          accent: "#D6BCFA",
        },
        // Dark Mode renkleri
        dark: {
          background: "#1a1a2e",
          text: "#e0e0e0",
          primary: "#9F7AEA",
          secondary: "#6B46C1",
          accent: "#4A2D8F",
        },
        // Hacker Mode renkleri
        hacker: {
          background: "#0a0a0a",
          text: "#00ff00",
          primary: "#00cc00",
          secondary: "#009900",
          accent: "#006600",
        },
      },
      fontFamily: {
        // Yeni fontlar eklenebilir
        sans: ["Inter", "sans-serif"],
        mono: ["'Fira Code'", "monospace"], // Hacker modu için
        display: ["'Bebas Neue'", "cursive"], // Başlıklar için
      },
    },
  },
  plugins: [],
};