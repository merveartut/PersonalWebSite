import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  const flag = i18n.language === "tr" ? "🇹🇷" : "🇬🇧";

  return (
    <button
      onClick={toggleLanguage}
      className="p-3 rounded-full bg-white dark:bg-zinc-800 
                 shadow-lg text-xl hover:scale-110 transition flex 
                 items-center justify-center w-12 h-12"
      aria-label="Toggle language"
    >
      {flag}
    </button>
  );
};

export default LanguageToggleButton;
