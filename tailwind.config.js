/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // 3D Dönüşüm için gerekli olan sınıfları TEMA'da bırakmıyoruz,
      // sadece aşağıdaki PLUGINS kısmında tanımlayacağız.
      // Sadece 'rotate-y' sınıfı Tailwind'in varsayılan `rotate` utilities'ini kullanmadığı için `extend.transform` altında bir CSS değişkeni olarak tanımlanabilir, ancak plugin daha temizdir.

      // Burada kalanlar:
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
  plugins: [
    ({ addUtilities }) => {
      // 3D dönüşüm için özel yardımcı sınıfları ekliyoruz
      addUtilities({
        // 1. Perspective (3D görünüm derinliği)
        ".perspective-1000": {
          perspective: "1000px",
        },
        // 2. Transform Style (3D koruma)
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        // 3. Backface Visibility (Ters yüzü gizleme)
        ".backface-hidden": {
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden", // WebKit desteği
        },
        // 4. Rotate Y (Çevirme açısı)
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
      });
    },
  ],
};
