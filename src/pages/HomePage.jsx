import React, { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import reactImg from "../assets/react.svg";
import springImg from "../assets/spring.png";
import javascriptImg from "../assets/javascript.png";
import cssImg from "../assets/css.png";
import htmlImg from "../assets/htm.png";
import javaImg from "../assets/java.png";
import vueImg from "../assets/vue.png";
import tsImg from "../assets/typescript.png";

function HomePage() {
  const homePageRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const skills = [
    { text: "React", img: reactImg },
    { text: "Vue", img: vueImg },
    { text: "Java", img: javaImg },
    { text: "Spring Boot", img: springImg },
    { text: "JavaScript", img: javascriptImg },
    { text: "CSS", img: cssImg },
    { text: "HTML", img: htmlImg },
    { text: "TypeScript", img: tsImg },
  ];

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

  return (
    <div className="w-full h-full snap-y snap-mandatory scroll-smooth">
      {/* Section 1 - Skills */}
      <section className="w-full h-screen flex flex-col items-center gap-[60px] justify-center bg-gradient-to-b text-orange-900 p-10 snap-start">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.text}
              className={` text-black p-4 rounded-xl border-orange-900 border-2 shadow-lg text-center transition-all duration-300 ${
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
          className="font-source-code-pro  text-orange-900 text-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          Developer
        </motion.h1>
      </section>
      {/* Section 2 - About Me */}
      <section className="w-full h-screen flex flex-row gap-[100px] md:flex-row items-center justify-center  text-black p-10 snap-start">
        <div className="flex flex-col gap-12 items-center md:items-start mb-10 md:mb-0">
          <p className="max-w-xl font-source-code-pro text-left">
            I’m a software developer passionate about creating digital
            experiences that make a real impact. With a constant drive to learn
            and grow, I focus on building innovative solutions that solve
            problems and improve lives. My goal is to contribute to meaningful
            projects that push the boundaries of technology and leave a lasting
            impression.
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
      </section>

      {/* Section 3 - Contact */}
      <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-blue-500 text-white p-10 snap-start">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
        <p className="max-w-md text-center mb-8">
          Interested in working together? Let’s connect! You can reach me via
          email at
          <span className="font-bold"> example@example.com</span> or through
          social media.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all">
          Contact Me
        </button>
      </section>
    </div>
  );
}

export default HomePage;
