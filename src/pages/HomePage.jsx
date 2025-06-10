import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useInView } from "react-intersection-observer";

import ContactPage from "./ContactPage";
import { AboutPage } from "./AboutPage";
import WorkPage from "./WorkPage";
import { SkillsPage } from "./SkillsPage";
import { ExperiencePage } from "./ExperiencePage";
import bg from "../assets/ex_bg_3.jpg"

function HomePage({ setActiveSection }) {

  const navigate = useNavigate();

  const [aboutRef, aboutInView] = useInView({ threshold: 0.6 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.6 });
  const [worksRef, worksInView] = useInView({ threshold: 0.6 });
  const [contactRef, contactInView] = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (aboutInView) {
      setActiveSection("about");
      window.history.replaceState(null, "", "#about");
    } else if (experienceInView) {
      setActiveSection("experience");
      window.history.replaceState(null, "", "#experience");
    } else if (worksInView) {
      setActiveSection("works");
      window.history.replaceState(null, "", "#works");
    } else if (contactInView) {
      setActiveSection("contact");
      window.history.replaceState(null, "", "#contact");
    }
  }, [aboutInView, experienceInView, worksInView, contactInView]);

  return (
    <div className="w-full h-full snap-y snap-mandatory scroll-smooth">
      {/* Section 1 - About Me */}
      <section
        id="about"
        ref={aboutRef}
        className="w-full !min-h-screen flex flex-col md:flex-row gap-[60px] items-center justify-center bg-zinc-50  text-black p-10 !py-[32px] snap-start"
      >
        <AboutPage />
      </section>

      <section
        id="experience"
        ref={experienceRef}
        className="min-h-screen flex flex-col  md:flex-row gap items-center justify-center bg-gradient-to-b !py-[32px] snap-start bg-[#f2eef1]"
      >
        <ExperiencePage />
      </section>

      <section
        id="works"
        ref={worksRef}
        className="min-h-screen flex flex-col  md:flex-row gap items-center justify-center bg-gradient-to-b !py-[32px] snap-start bg-zinc-50"
      >
        <WorkPage />
      </section>

      {/* Section 3 - Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  snap-start bg-[#f0e6ee]"
      >
        <ContactPage />
      </section>
    </div>
  );
}

export default HomePage;
