import React from "react";
import { useTranslation } from "react-i18next";
import profile from "../assets/profile.png";
import profileDark from "../assets/profile_dark.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import RoleTyping from "../components/RoleTyping";

export const AboutPage = () => {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme");
  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4 text-black dark:text-white p-10 snap-start gap-[40px] md:gap-[1px] lg:gap-[1px]">
      {/* Text Section */}
      <div className="flex flex-col gap-8 items-center md:items-start">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="flex">
            {" "}
            <span>Hello,</span>
            <span className="text-[#273469] font-semibold">My name is</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="font-anton text-5xl text-[#E4D9FF]"
              style={{
                WebkitTextStroke: "1px #000",
                textShadow: "2px",
              }}
            >
              MERVE
            </span>
            <span
              className="font-anton text-5xl text-white"
              style={{
                WebkitTextStroke: "1px #000",
                textShadow: "2px",
              }}
            >
              ARTUT
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-zain text-2xl">I am a</span>
            <RoleTyping />
          </div>
        </div>

        <p className="max-w-xl font-jura font-semibold text-left md:text-left leading-[2]">
          {t("description")}
        </p>

        <div className="flex gap-6 ">
          <a
            href="https://github.com/merveartut"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon
              className="text-gray-600 hover:text-black transition-transform hover:scale-110"
              fontSize="large"
            />
          </a>
          <a
            href="https://linkedin.com/in/merveartut"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon
              className="text-gray-600 hover:text-blue-700 transition-transform hover:scale-110"
              fontSize="large"
            />
          </a>

          <a href="mailto:merveartuttt@gmail.com">
            <EmailIcon
              className="text-gray-600 hover:text-red-500 transition-transform hover:scale-110"
              fontSize="large"
            />
          </a>
        </div>

        <a
          href="/Merve_Artut_CV.pdf"
          download="Merve_Artut_CV.pdf"
          className="border-[1px] border-black p-4 rounded-3xl font-roboto-mono shadow-md hover:bg-[#E4D9FF]"
        >
          Download CV
        </a>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center md:justify-start">
        <div className="relative w-[200px] h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[400px]">
          {/* Background Shape */}
          {/* <div className="absolute -top-4 -left-4 w-full h-full rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 transform rotate-3 shadow-lg"></div> */}

          {/* Profile Image */}
          {theme === "light" ? (
            <img
              src={profile}
              alt="Profile"
              className="relative rounded-xl object-cover w-full h-full"
            />
          ) : (
            <img
              src={profileDark}
              alt="Profile"
              className="relative rounded-xl object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};
