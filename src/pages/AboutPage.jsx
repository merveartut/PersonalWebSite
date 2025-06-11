import React from "react";
import { useTranslation } from "react-i18next";
import profile from "../assets/profile.png";
import profileDark from "../assets/profile_dark.png"
import { useTheme } from '@mui/material/styles';

export const AboutPage = () => {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme")
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4 text-black dark:text-white p-10 snap-start gap-[40px] md:gap-[1px] lg:gap-[1px]">

      {/* Text Section */}
      <div className="flex flex-col gap-8 items-center md:items-start">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <span className="font-rubik text-xl">MERVE ARTUT</span>
          <span className="font-rubik">Software Developer</span>
        </div>

        <p className="max-w-xl font-jura font-semibold text-left md:text-left leading-[2]">
          {t("description")}
        </p>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center md:justify-start">
        <div className="w-[200px] h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[400px]">
          {theme === "light" ? (<img
            src={profile}
            alt="Profile"
            className="rounded-xl object-cover w-full h-full"
          />) : (<img
            src={profileDark}
            alt="Profile"
            className="rounded-xl object-cover w-full h-full"
          />)}
        </div>
      </div>
    </div>
  );
};
