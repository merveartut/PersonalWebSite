// src/pages/AboutPage.jsx (Güncellenmiş Versiyon)

import FlippableCard from "../components/FlippableCard"; // Yeni Kartı import et
import AnimatedBackground from "../components/AnimatedBackground"; // Arka Planı import et

export const AboutPage = () => {
  const theme = localStorage.getItem("theme");
  // useTranslation'ı sadece karta bilgi vermek için kullanıyorduk,
  // şimdi sadece tema bilgisini almamız yeterli, ancak kart hala t fonksiyonuna ihtiyaç duyuyor.

  return (
    <div
      className="
  relative w-full h-screen flex items-center justify-center px-4
  text-black dark:text-[var(--hacker-text)]
  dark:bg-[var(--hacker-bg)]
  hacker-scanlines
"
    >
      <AnimatedBackground />{" "}
      <div className="z-10 flex justify-center items-center w-full py-10">
        <FlippableCard theme={theme} />{" "}
      </div>
    </div>
  );
};
