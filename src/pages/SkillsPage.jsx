import React from "react";
import { motion } from "framer-motion";
import reactImg from "../assets/react.svg";
import springImg from "../assets/spring.png";
import javascriptImg from "../assets/javascript.png";
import cssImg from "../assets/css.png";
import htmlImg from "../assets/htm.png";
import javaImg from "../assets/java.png";
import vueImg from "../assets/vue.png";
import { useState } from "react";

export const SkillsPage = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  const skills = [
    { text: "React", img: reactImg },
    { text: "Vue", img: vueImg },
    { text: "Java", img: javaImg },
    { text: "Spring Boot", img: springImg },
    { text: "JS", img: javascriptImg },
    { text: "CSS", img: cssImg },
    { text: "HTML", img: htmlImg },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-orange-900 items-center gap-[60px] justify-center bg-gradient-to-b text-stone-100 p-10 snap-start">
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.text}
            className={` text-black p-4 w-[160px] rounded-xl bg-stone-100 border-2 border-stone-200 shadow-md text-center shadow-stone-400 transition-all duration-300 ${
              isAnimationComplete ? "hover:scale-110 hover:shadow-2xl" : ""
            }`}
            custom={index}
            variants={skillVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            onAnimationComplete={() => {
              if (index === skills.length - 1) {
                setIsAnimationComplete(true);
              }
            }}
          >
            <span className="font-roboto-mono text-lg">{skill.text}</span>
            <img
              src={skill.img}
              alt={skill.text}
              className="w-16 h-16 mx-auto mt-2"
            />
          </motion.div>
        ))}
      </div>
      <motion.h1
        className="font-source-code-pro  text-stone-100 text-5xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        viewport={{ once: true }}
      >
        Developer
      </motion.h1>
    </div>
  );
};
