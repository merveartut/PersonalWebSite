import React from "react";
import { useTranslation } from "react-i18next";
import en from "../assets/en.png";
import tr from "../assets/tr.png";

const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  const flagSrc = i18n.language === "tr" ? tr : en;

  return (
    <button
      onClick={toggleLanguage}
      className="p-3 rounded-full bg-white dark:bg-zinc-800 
                 shadow-lg text-xl hover:scale-110 transition flex 
                 items-center justify-center w-12 h-12"
      aria-label="Toggle language"
    >
      <img src={flagSrc} alt="flag" className="w-6 h-6 object-cover" />
    </button>
  );
};

export default LanguageToggleButton;
