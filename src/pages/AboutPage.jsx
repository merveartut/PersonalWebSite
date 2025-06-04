import React from "react";
import { useTranslation } from "react-i18next";
import profile from "../assets/profile.jpeg";

export const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-[60px] items-center justify-center px-4 text-black p-10 snap-start">


      <div className="flex flex-col gap-8 items-center md:items-start mb-10 md:mb-0">
        <div className="flex flex-col gap-4">
          <span className="font-rubik text-xl">
            MERVE ARTUT
          </span>
          <span className="font-rubik">Software Developer</span>
        </div>

        <p className="max-w-xl font-jura font-semibold text-left leading-[2]">
          {t("description")}
        </p>
      </div>

      <div className="absoulte flex justify-center relative">
        <div className="relative w-[200px] h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[400px]">
          <img
            src={profile}
            alt="Profile"
            className="rounded-xl object-cover w-full h-full"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-blue-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
