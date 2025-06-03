import React from "react";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Paper } from "@mui/material";

const experiences = [
    {
        title: "Software Developer (React, Micro Frontend, Spring Boot)",
        company: "SGK (Sosyal Güvenlik Kurumu)",
        period: "July 11, 2024 – Present",
        description: [
            "Participate in new front-end projects for SGK systems.",
            "Worked with Context management, Micro Front-end, Redux, Formik, Yup, Axios.",
            "Integrated REST APIs and used tools like Postman, Jest, Vitest, Storybook, and Figma.",
        ],
    },
    {
        title: "Full Stack Developer (VueJS, React, Django)",
        company: "Turboard (E-Kalite Yazılım)",
        period: "Nov 1, 2022 – July 8, 2024",
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
        description: [
            "Fixed bugs in Django backend and VueJS frontend.",
            "Learned to operate the Turboard app.",
        ],
    },
    {
        title: "Intern (Full Stack Developer)",
        company: "Medyasoft IT Group",
        period: "July, 2021 – Aug, 2021",
        description: [
            "Designed and implemented web apps using .NET, Angular, and PostgreSQL based on client requests.",
        ],
    },
];

export const ExperiencePage = () => {
    return (
        <div className=" w-full min-h-screen snap-start p-8 max-w-5xl mx-auto bg-zinc-100">
            <Timeline position="alternate">
                {experiences.map((exp, idx) => (
                    <TimelineItem key={idx} sx={{ mb: 4 }}>
                        <TimelineOppositeContent className="text-gray-500 text-sm">
                            <span className="text-md font-roboto">{exp.period}</span>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot sx={{
                                backgroundColor: '#7c3aed', // your custom hex color
                            }} />
                            {idx < experiences.length - 1 && <TimelineConnector sx={{ width: "1px" }} />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <div elevation={3} className="p-4 rounded-lg border-[1px] border-stone-300 bg-transparent  justify-start flex flex-col hover:scale-105 hover:shadow-2xl transition-transform duration-300">
                                <span variant="h6" className=" font-rubik">
                                    {exp.title}
                                </span>
                                <span className="italic text-gray-600">
                                    {exp.company}
                                </span>
                                <ul className="list-disc list-inside mt-2 text-gray-700 text-sm">
                                    {exp.description.map((item, i) => (
                                        <li className="font-roboto" key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
}