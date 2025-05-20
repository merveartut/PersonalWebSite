import React from "react";
import { useTranslation } from "react-i18next";

export const AboutPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-[60px] items-center justify-center  text-black p-10 snap-start">
      <div className="flex flex-col gap-12 items-center md:items-start mb-10 md:mb-0">
        <p className="max-w-xl font-source-code-pro text-left">
          {t("description")}
        </p>
      </div>

      <div className="absoulte flex justify-center relative">
        <div className="relative w-[200px] h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[400px]">
          <img
            src="https://images.pexels.com/photos/48794/boy-walking-teddy-bear-child-48794.jpeg?cs=srgb&dl=pexels-pixabay-48794.jpg&fm=jpg"
            alt="Profile"
            className="rounded-xl object-cover w-full h-full"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-orange-900 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
