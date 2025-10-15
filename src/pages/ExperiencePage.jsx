import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OpenInNewRounded } from "@mui/icons-material";
import { LocationOnRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const ExperiencePage = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      title: "Software Developer",
      company: "SGK (Sosyal Güvenlik Kurumu)",
      period: t("sgkPeriod"),
      url: "sgk.gov.tr",
      link: "https://www.sgk.gov.tr/Home/Index2/",
      techs: ["React", "Spring Boot", "Storybook", "Jest", "Figma"],
      description: [
        t("sgkDescription1"),
        t("sgkDescription2"),
        t("sgkDescription3"),
        t("sgkDescription4"),
        t("sgkDescription5"),
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Turboard (E-Kalite Yazılım)",
      period: t("turboardPeriod1"),
      url: "turboard.com",
      link: "https://www.turboard.com/",
      techs: ["Vue.js", "React", "Django", "Storybook", "Figma"],
      description: [
        t("turboardDescription1"),
        t("turboardDescription2"),
        t("turboardDescription3"),
        t("turboardDescription4"),
      ],
    },
    {
      title: "Intern (Full Stack Developer)",
      company: "Turboard (E-Kalite Yazılım)",
      period: t("turboardPeriod2"),
      url: "turboard.com",
      link: "https://www.turboard.com/",
      techs: ["Vue.js", "React", "Django", "Storybook", "Figma"],
      description: [
        t("turboardInternDescription1"),
        t("turboardInternDescription2"),
      ],
    },
    {
      title: "Intern (Full Stack Developer)",
      company: "Medyasoft IT Group",
      period: t("medyasoftPeriod"),
      url: "medyasoft.com.tr",
      link: "https://medyasoft.com.tr/",
      techs: ["Angular", ".NET"],
      description: [t("medyasoftDescription1")],
    },
  ];
  return (
    <div className="pt-20 sm:py-40 pb-20 w-full max-w-4xl px-4 flex justify-center">
      <div className="w-full  flex flex-col gap-4">
        {experiences.map((exp, index) => (
          <Accordion
            key={index}
            defaultExpanded={index === 0}
            style={{ border: "1px", borderRadius: "10px" }}
            className="p-4 dark:bg-zinc-200"
            sx={{
              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className="bg-purple-100"
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <Typography className=" text-purple-900 font-rubik !font-bold">
                    {exp.title} @ {exp.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 font-medium !mr-[24px] hidden sm:block"
                  >
                    {exp.period}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-4">
              <div className="flex flex-row gap-8  text-violet-800">
                <div className="flex flex-row gap-2 items-center">
                  <LocationOnRounded className="!w-[20px]"></LocationOnRounded>
                  <span className="text-sm font-rubik">Ankara, Turkey</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <OpenInNewRounded className="!w-[20px]"></OpenInNewRounded>
                  <span
                    className="text-sm cursor-pointer font-rubik"
                    onClick={() => window.open(exp.link, "_blank")}
                  >
                    {exp.url}
                  </span>
                </div>
              </div>

              <ul className="list-disc list-inside text-gray-800 text-sm font-rubik space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-row gap-2 flex-wrap">
                {exp.techs.map((tech) => (
                  <Chip
                    label={tech}
                    className="!bg-[#6d48d1] !text-white"
                  ></Chip>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
