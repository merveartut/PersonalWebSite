// src/components/FlippableCard.jsx (Dinamik Yükseklik ve Konumlandırma Düzeltmesi)

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import profile from "../assets/profile.png";
import profileDark from "../assets/profile_dark.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RoleTyping from "./RoleTyping";

const FlippableCard = ({ theme }) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Yüksekliği dinamik olarak tutacak state
  const [cardHeight, setCardHeight] = useState(0);
  // Ön yüz ve arka yüz içeriğini referans alacak ref'ler
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Otomatik Çevirme (Aynı kaldı)
  useEffect(() => {
    if (!isHovered) {
      const flipInterval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 7000);

      return () => clearInterval(flipInterval);
    }
  }, [isHovered]);

  // Yüksekliği Hesaplayan ve Ayarlayan Fonksiyon
  const updateCardHeight = () => {
    if (frontRef.current && backRef.current) {
      // İki yüzün de doğal (scroll) yüksekliğini al
      const frontHeight = frontRef.current.offsetHeight;
      const backHeight = backRef.current.offsetHeight;

      // En yüksek olanı al (min-h:[550px]'ten küçük olmaması için kontrol)
      const newHeight = Math.max(frontHeight, backHeight, 550);

      // Yüksekliği state'e kaydet
      setCardHeight(newHeight);
    }
  };

  // Component yüklendiğinde, flip durumu değiştiğinde ve pencere boyutu değiştiğinde yüksekliği güncelle
  useEffect(() => {
    updateCardHeight();
    window.addEventListener("resize", updateCardHeight);

    return () => window.removeEventListener("resize", updateCardHeight);
  }, [isFlipped]);
  // isFlipped değiştiğinde de tetiklenmeli ki kart çevrildiğinde de doğru yüksekliği alsın.

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // Ana kart div'i: Büyük ekran genişlikleri artırıldı.
    <div
      className={`
    relative w-[90%] md:w-[750px] lg:w-[1000px]
    perspective-1000 cursor-pointer transition-all duration-300
    ${isHovered ? "scale-[1.03] z-50" : "scale-100 z-10"}
    ${theme === "dark" ? "neon-border" : ""}
  `}
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 2. 3D DÖNÜŞÜM KATMANI: Hesaplanan yüksekliği uyguluyoruz */}
      <div
        className={`relative w-full h-[660px] md:h-[500px] lg:h-[550px] xl:h-[600px]
  transition-transform duration-700 preserve-3d shadow-2xl rounded-2xl
  ${isFlipped ? "rotate-y-180" : "rotate-y-0"}`}
      >
        {/* 3. ÖN YÜZ: Yüksekliği ölçmek için ref eklendi, min-h kaldırıldı */}
        <div
          ref={frontRef} // YÜKSEKLİK ÖLÇÜMÜ İÇİN REF
          className="
  absolute backface-hidden w-full h-full 
  bg-white dark:bg-[var(--hacker-card-bg)]
  rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12
  flex flex-col md:flex-row items-center gap-2 md:gap-8 lg:gap-12
  border border-gray-200 dark:border-[var(--hacker-border)]
  dark:shadow-[0_0_20px_var(--hacker-neon-blue)]
"
        >
          {/* ... (Ön Yüz İçeriği aynı kaldı) ... */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 items-center md:items-start md:w-1/2 order-2 md:order-1">
            <div className="flex flex-col gap-2 md:gap-4 text-center sm:items-start items-center md:text-left w-full">
              <div className="flex text-md md:text-lg lg:text-xl gap-2">
                <span>{t("hello")},</span>
                <span className="text-[#273469] dark:text-[#56c999] font-semibold">
                  {t("myNameIs")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#E4D9FF] dark:text-[#56c999]"
                  style={{
                    WebkitTextStroke:
                      theme === "dark" ? "1px #fff" : "1px #000",
                    textShadow: "2px",
                  }}
                >
                  {" "}
                  MERVE{" "}
                </span>
                <span
                  className="font-anton text-4xl sm:text-5xl lg:text-6xl text-white dark:text-white"
                  style={{
                    WebkitTextStroke:
                      theme === "dark" ? "1px #fff" : "1px #000",
                    textShadow: "2px",
                  }}
                >
                  {" "}
                  ARTUT{" "}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-zain text-base md:text-xl lg:text-2xl">
                  {" "}
                  I am a{" "}
                </span>
                <RoleTyping />
              </div>
            </div>
            <p className="font-jura font-semibold text-center md:text-left leading-[2] text-sm md:text-base lg:text-lg">
              {t("description")}
            </p>
            <a
              href="/Merve-Artut-Resume.pdf"
              download="Merve_Artut_CV.pdf"
              onClick={(e) => e.stopPropagation()}
              className="border-[1px] border-black dark:border-white p-3 md:p-4 rounded-3xl font-roboto-mono text-sm md:text-base shadow-md hover:bg-[#E4D9FF] dark:hover:bg-[#43bda2] hover:text-black transition-colors duration-300"
            >
              {" "}
              {t("download")}{" "}
            </a>
          </div>

          <div className="flex justify-center md:justify-end relative md:w-1/2 order-1 md:order-2">
            <div className="relative w-[140px] h-[220px] md:w-[220px] md:h-[320px] lg:w-[280px] lg:h-[380px] flex-shrink-0">
              <img
                src={profile}
                alt="Profile"
                className="relative rounded-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* 4. ARKA YÜZ: Yüksekliği ölçmek için ref eklendi, min-h kaldırıldı */}
        <div
          ref={backRef} // YÜKSEKLİK ÖLÇÜMÜ İÇİN REF
          className="
 absolute rotate-y-180 backface-hidden w-full h-full
 bg-gray-100 dark:bg-[var(--hacker-card-bg)]
 rounded-2xl p-4 sm:p-6 md:p-12 lg:p-16
 flex flex-col justify-between
 border border-gray-200 dark:border-[var(--hacker-border)]
 dark:shadow-[0_0_20px_var(--hacker-neon-purple)]
"
        >
          {/* ... (Arka Yüz İçeriği aynı kaldı) ... */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-anton mb-6 lg:mb-8 text-black dark:text-white text-center border-b pb-3 border-gray-300 dark:border-gray-600">
            {t("contactAndSocialMedia")}
          </h3>
          <ul className="space-y-3 lg:space-y-6 font-jura font-medium text-xs md:text-base lg:text-xl">
            <li className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
              <EmailIcon fontSize="small" className="text-red-500" />
              <span>merveartuttt@gmail.com</span>
            </li>
            <li className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
              <LocationOnIcon fontSize="small" className="text-green-500" />
              <span>Türkiye</span>
            </li>
            <li className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
              <LinkedInIcon fontSize="small" className="text-blue-600" />
              <a
                href="https://linkedin.com/in/merveartut"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline"
              >
                {" "}
                LinkedIn/merveartut{" "}
              </a>
            </li>
            <li className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
              <GitHubIcon
                fontSize="small"
                className="text-black dark:text-white"
              />
              <a
                href="https://github.com/merveartut"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline"
              >
                {" "}
                GitHub/merveartut{" "}
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs text-center text-gray-400 dark:text-gray-500">
            {t("turnCardDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
