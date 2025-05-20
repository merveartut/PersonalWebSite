import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { useTranslation } from "react-i18next";
import ContactPage from "./ContactPage";
import { AboutPage } from "./AboutPage";
import WorkPage from "./WorkPage";
import { SkillsPage } from "./SkillsPage";

function HomePage() {
  const homePageRef = useRef(null);

  const navigate = useNavigate();

  const [skillsRef, skillsInView] = useInView({ threshold: 0.6 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.6 });
  const [worksRef, worksInView] = useInView({ threshold: 0.6 });
  const [contactRef, contactInView] = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (skillsInView) navigate("/home#skills", { replace: true });
    else if (aboutInView) navigate("/home#about", { replace: true });
    else if (worksInView) navigate("/home#works", { replace: true });
    else if (contactInView) navigate("/home#contact", { replace: true });
  }, [skillsInView, aboutInView, worksInView, contactInView, navigate]);

  return (
    <div className="w-full h-full snap-y snap-mandatory scroll-smooth">
      {/* Section 1 - Skills */}
      <section
        id="skills"
        ref={skillsRef}
        className="w-full min-h-screen flex flex-col bg-orange-900 items-center gap-[60px] justify-center bg-gradient-to-b text-stone-100 p-10 snap-start"
      >
        <SkillsPage />
      </section>
      {/* Section 2 - About Me */}
      <section
        id="about"
        ref={aboutRef}
        className="w-full !h-screen flex flex-col md:flex-row gap-[60px] items-center justify-center  text-black p-10 !py-[32px] snap-start"
      >
        <AboutPage />
      </section>

      <section
        id="works"
        ref={worksRef}
        className="h-screen flex flex-col  md:flex-row gap items-center justify-center bg-gradient-to-b !py-[32px] snap-start"
      >
        <WorkPage />
      </section>

      {/* Section 3 - Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="h-screen flex flex-col items-center justify-center bg-gradient-to-b  snap-start"
      >
        <ContactPage />
      </section>
    </div>
  );
}

export default HomePage;
