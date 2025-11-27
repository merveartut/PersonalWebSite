// src/pages/ExperiencePage.jsx - REVİZE EDİLMİŞ

import React from "react";
import { motion } from "framer-motion"; // Animasyon için
import { useTheme } from "../context/ThemeContext"; // Tema için
import { useTranslation } from "react-i18next";
import { OpenInNewRounded, LocationOnRounded, Timeline } from "@mui/icons-material";

export const ExperiencePage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const experiences = [
    // ... (Mevcut experience datası aynı kalır)
    {
      title: "Software Developer",
      company: "SGK (Sosyal Güvenlik Kurumu)",
      period: t("sgkPeriod"),
      location: "Ankara, Turkey",
      url: "sgk.gov.tr",
      link: "https://www.sgk.gov.tr/Home/Index2/",
      techs: ["React", "Spring Boot", "Storybook", "Jest", "Figma"],
      description: [
        t("sgkDescription1"), t("sgkDescription2"), t("sgkDescription3"), t("sgkDescription4"), t("sgkDescription5"),
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Turboard (E-Kalite Yazılım)",
      period: t("turboardPeriod1"),
      location: "Ankara, Turkey",
      url: "turboard.com",
      link: "https://www.turboard.com/",
      techs: ["Vue.js", "React", "Django", "Storybook", "Figma"],
      description: [
        t("turboardDescription1"), t("turboardDescription2"), t("turboardDescription3"), t("turboardDescription4"),
      ],
    },
    {
      title: "Intern (Full Stack Developer)",
      company: "Turboard (E-Kalite Yazılım)",
      period: t("turboardPeriod2"),
      location: "Ankara, Turkey",
      url: "turboard.com",
      link: "https://www.turboard.com/",
      techs: ["Vue.js", "React", "Django", "Storybook", "Figma"],
      description: [
        t("turboardInternDescription1"), t("turboardInternDescription2"),
      ],
    },
    {
      title: "Intern (Full Stack Developer)",
      company: "Medyasoft IT Group",
      period: t("medyasoftPeriod"),
      location: "Ankara, Turkey",
      url: "medyasoft.com.tr",
      link: "https://medyasoft.com.tr/",
      techs: ["Angular", ".NET"],
      description: [t("medyasoftDescription1")],
    },
  ];

  const getCardClass = (index) => {
    let classes = "p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1";
    
    // Temaya duyarlı renkler
    if (theme === 'dark') {
      classes += " bg-[#282a36] text-gray-200 border border-purple-800";
    } else if (theme === 'hacker') {
      classes += " bg-hacker-background text-hacker-text border-2 border-hacker-primary shadow-[0_0_15px_rgba(0,204,0,0.4)]";
    } else {
      classes += " bg-white text-gray-800 border border-gray-100";
    }
    
    return classes;
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2, // Her kartın sırayla görünmesi
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="pt-20 pb-20 w-full max-w-5xl px-4">
      <h2 className={`text-4xl font-display font-bold mb-12 text-center ${theme === 'hacker' ? 'text-hacker-text' : 'text-zinc-900 dark:text-white'}`}>
        💼 Deneyim ve Kariyerim
      </h2>
      
      {/* Timeline Container */}
      <div className="relative border-l-4 border-purple-500 dark:border-purple-600 hacker:border-hacker-primary ml-4 md:ml-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="mb-8 flex items-start"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {/* Timeline Noktası */}
            <div className={`-ml-[16px] md:-ml-[22px] w-6 h-6 rounded-full absolute ${theme === 'hacker' ? 'bg-hacker-primary ring-4 ring-hacker-secondary' : 'bg-purple-600 ring-4 ring-purple-300 dark:ring-purple-900'} z-10 flex items-center justify-center`}>
              <Timeline className="!w-4 !h-4 text-white" />
            </div>

            {/* İçerik Kartı */}
            <div className={`flex-1 ml-6 md:ml-12 ${getCardClass(index)}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-xl font-bold ${theme === 'hacker' ? 'text-hacker-primary' : 'text-purple-700 dark:text-purple-400'}`}>
                  {exp.title}
                </h3>
                <p className={`text-sm font-medium whitespace-nowrap ${theme === 'hacker' ? 'text-hacker-text' : 'text-gray-500 dark:text-gray-400'}`}>
                  {exp.period}
                </p>
              </div>

              <a href={exp.link} target="_blank" rel="noopener noreferrer" 
                 className={`text-lg font-semibold inline-flex items-center hover:underline ${theme === 'hacker' ? 'text-hacker-secondary' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {exp.company}
                <OpenInNewRounded className="!w-4 !h-4 ml-1" />
              </a>

              <p className="flex items-center text-sm mt-1 mb-4 text-gray-500 dark:text-gray-400 hacker:text-hacker-secondary">
                <LocationOnRounded className="!w-4 !h-4 mr-1" />
                {exp.location}
              </p>
              
              <ul className="list-disc list-inside text-sm space-y-2 mb-4">
                {exp.description.map((item, i) => (
                  <li key={i} className={theme === 'hacker' ? 'marker:text-hacker-text' : ''}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-row gap-2 flex-wrap">
                {exp.techs.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        theme === 'hacker' 
                        ? 'bg-hacker-accent text-black' 
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};