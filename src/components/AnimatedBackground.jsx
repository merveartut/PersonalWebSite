// src/components/AnimatedBackground.jsx

import React from "react";
import "./AnimatedBackground.css"; // CSS dosyasını import et

const AnimatedBackground = () => {
  // Arka plan animasyonunun yoğunluğunu ayarlamak için nokta sayısı
  const numDots = 50;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Tailwind'deki dark modu desteklemek için dinamik renkler kullanabiliriz.
        Burada basit bir .map döngüsü ile hareketli noktalar oluşturuluyor.
      */}
      {Array.from({ length: numDots }).map((_, index) => (
        <div
          key={index}
          className="dot absolute rounded-full opacity-60 dark:opacity-40"
          style={{
            // Rastgele konum, boyut ve animasyon gecikmesi
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`, // 5px ile 15px arası
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 15}s`, // 0s ile 15s arası
            animationDuration: `${Math.random() * 10 + 10}s`, // 10s ile 20s arası
            // Tema bazlı renkler
            backgroundColor:
              index % 3 === 0
                ? "var(--dot-color-1)" // Koyu mod için mor/açık renk
                : index % 3 === 1
                ? "var(--dot-color-2)" // Koyu mod için mavi/açık renk
                : "var(--dot-color-3)", // Koyu mod için pembe/açık renk
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
