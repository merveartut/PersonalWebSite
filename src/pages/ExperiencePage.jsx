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

const experiences = [
    {
        title: "Software Developer",
        company: "SGK (Sosyal Güvenlik Kurumu)",
        period: "July 11, 2024 – Present",
        url: "sgk.gov.tr",
        link: "https://www.sgk.gov.tr/Home/Index2/",
        techs: ["React", "Spring Boot", "Storybook", "Jest", "Figma"],
        description: [
            "Participate in new front-end projects for SGK systems.",
            "Worked with Context management, Micro Front-end, Redux, Formik, Yup, Axios.",
            "Integrated REST APIs and used tools like Postman, Jest, Vitest, Storybook, and Figma.",
        ],
    },
    {
        title: "Full Stack Developer",
        company: "Turboard (E-Kalite Yazılım)",
        period: "Nov 1, 2022 – July 8, 2024",
        url: "turboard.com",
        link: "https://www.turboard.com/",
        techs: ["Vue.js", "React", "Django", "Storybook", "Figma"],
        description: [
            "Designed and implemented components for the Turboard app.",
            "Resolved issues in Django backend.",
            "Performed unit testing with Vitest.",
        ],
    },
    {
        title: "Intern (Full Stack Developer)",
        company: "Turboard (E-Kalite Yazılım)",
        period: "Aug, 2022 – Sep, 2022",
        url: "turboard.com",
        link: "https://www.turboard.com/",
        techs: ["Vue.js", "React", "Django", "Storybook", "Figma"],
        description: [
            "Fixed bugs in Django backend and VueJS frontend.",
            "Learned to operate the Turboard app.",
        ],
    },
    {
        title: "Intern (Full Stack Developer)",
        company: "Medyasoft IT Group",
        period: "July, 2021 – Aug, 2021",
        url: "medyasoft.com.tr",
        link: "https://medyasoft.com.tr/",
        techs: ["Angular", ".NET"],
        description: [
            "Designed and implemented web apps using .NET, Angular, and PostgreSQL based on client requests.",
        ],
    },
];

export const ExperiencePage = () => {
    return (
        <div className="w-full min-h-screen p-6 gap-6 max-w-4xl mx-auto flex flex-col justify-center bg-transparent">

            <div className="flex flex-col gap-2">
                {experiences.map((exp, index) => (
                    <Accordion key={index} defaultExpanded={index === 0} style={{ border: "1px", borderRadius: "10px" }} className="p-4">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-purple-100">
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row items-center justify-between w-full">
                                    <Typography className="font-medium text-purple-900">{exp.title} @ {exp.company}</Typography>
                                    <Typography variant="body2" className="text-gray-600 font-medium !mr-[24px] hidden sm:block">
                                        {exp.period}
                                    </Typography>
                                </div>


                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="flex flex-col gap-4">
                            <div className="flex flex-row gap-8  text-violet-800">
                                <div className="flex flex-row gap-2 items-center">
                                    <LocationOnRounded className="!w-[20px]"></LocationOnRounded>
                                    <span className="text-sm" >Ankara, Turkey</span>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <OpenInNewRounded className="!w-[20px]"></OpenInNewRounded>
                                    <span className="text-sm cursor-pointer" onClick={() => window.open(exp.link, "_blank")}>{exp.url}</span>
                                </div>
                            </div>

                            <ul className="list-disc list-inside text-gray-800 text-sm space-y-1">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>

                            <div className="flex flex-row gap-2 flex-wrap">
                                {exp.techs.map((tech) => (
                                    <Chip label={tech} className="!bg-[#6d48d1] !text-white"></Chip>
                                ))}
                            </div>

                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

        </div>
    );
};