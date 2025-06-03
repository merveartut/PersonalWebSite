import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useInView } from "react-intersection-observer";

import ContactPage from "./ContactPage";
import { AboutPage } from "./AboutPage";
import WorkPage from "./WorkPage";
import { SkillsPage } from "./SkillsPage";
import { ExperiencePage } from "./ExperiencePage";

function HomePage() {

  const navigate = useNavigate();

  const [aboutRef, aboutInView] = useInView({ threshold: 0.6 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.6 });
  const [worksRef, worksInView] = useInView({ threshold: 0.6 });
  const [contactRef, contactInView] = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (aboutInView) navigate("/home#about", { replace: true });
    else if (experienceInView) navigate("/home#experience", { replace: true });
    else if (worksInView) navigate("/home#works", { replace: true });
    else if (contactInView) navigate("/home#contact", { replace: true });
  }, [aboutInView, worksInView, experienceInView, contactInView, navigate]);

  return (
    <div className="w-full h-full snap-y snap-mandatory scroll-smooth">
      {/* Section 1 - About Me */}
      <section
        id="about"
        ref={aboutRef}
        className="w-full !min-h-screen flex flex-col md:flex-row gap-[60px] items-center justify-center  text-black p-10 !py-[32px] snap-start"
      >
        <AboutPage />
      </section>

      <section
        id="experience"
        ref={experienceRef}
        className="bg-zinc-100 min-h-screen flex flex-col  md:flex-row gap items-center justify-center bg-gradient-to-b !py-[32px] snap-start"
      >
        <ExperiencePage />
      </section>

      <section
        id="works"
        ref={worksRef}
        className="min-h-screen flex flex-col  md:flex-row gap items-center justify-center bg-gradient-to-b !py-[32px] snap-start"
      >
        <WorkPage />
      </section>

      {/* Section 3 - Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="bg-zinc-100 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  snap-start"
      >
        <ContactPage />
      </section>
    </div>
  );
}

export default HomePage;
