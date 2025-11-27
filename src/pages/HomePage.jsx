// src/pages/HomePage.jsx - Düzeltilmiş ve Tamamlanmış

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer"; // ✨ Eksik import
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion"; // ✨ Eksik import

import { useTheme } from "../context/ThemeContext";
import CodeHero from "../components/CodeHero";
import ButterflyScene from "../components/ButterflyScene"; 
import { AboutPage } from "./AboutPage"; // Zaten tanımlı olduğunu varsayıyoruz
import { ExperiencePage } from "./ExperiencePage";
import ContactPage from "./ContactPage";
// import WorksPage from "./WorksPage"; // Eğer kullanacaksanız ekleyin

// Section geçiş animasyonu varyantları (Eksik tanım eklendi)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function HomePage({ setActiveSection }) {
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [showCodeHero, setShowCodeHero] = useState(true);
  
  // ✨ Eksik useInView hook'ları tanımlandı
  const [aboutRef, aboutInView] = useInView({ threshold: isMobile ? 0.3 : 0.6 });
  const [experienceRef, experienceInView] = useInView({ threshold: isMobile ? 0.3 : 0.6 });
  const [worksRef, worksInView] = useInView({ threshold: isMobile ? 0.3 : 0.6 });
  const [contactRef, contactInView] = useInView({ threshold: isMobile ? 0.3 : 0.6 });

  // Preloading state artık App.jsx'te yönetildiğinden kaldırılabilir, 
  // ancak şimdilik tutalım ve showCodeHero ile birleştirelim.

  useEffect(() => {
    // URL hash'ini ve activeSection'ı güncelleme (Mevcut mantık korunur)
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
  }, [aboutInView, experienceInView, worksInView, contactInView, setActiveSection]);

  const handleExploreClick = () => {
    setShowCodeHero(false);
    // İlk bölüme yönlendirme veya scroll yapma
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };

  if (showCodeHero) {
    return (
      <motion.div
        className="w-full min-h-screen flex items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <CodeHero onExplore={handleExploreClick} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full snap-y snap-mandatory scroll-smooth relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <div className="absolute inset-0 -z-10">
        <ButterflyScene /> {/* Arka planda 3D sahne */}
      </div>

      <section
        id="home-dummy" 
        className="min-h-screen flex items-center justify-center snap-start"
      ></section>
      
      {/* Section 1 - About Me */}
      <motion.section
        id="about"
        ref={aboutRef}
        className={`w-full min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center p-10 snap-start relative overflow-hidden`}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <AboutPage />
      </motion.section>

      {/* Section 2 - Experience */}
      <motion.section
        id="experience"
        ref={experienceRef}
        className="min-h-screen flex flex-col md:flex-row gap items-center justify-center snap-start p-10 relative overflow-hidden"
        initial="hidden"
        animate={experienceInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <ExperiencePage />
      </motion.section>

      {/* Works Page için alan, isterseniz bu yapıyı kaldırabilirsiniz */}
      {/* <motion.section
        id="works"
        ref={worksRef}
        className="min-h-screen flex flex-col md:flex-row gap items-center justify-center snap-start p-10 relative overflow-hidden"
        initial="hidden"
        animate={worksInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <WorksPage />
      </motion.section> */}

      {/* Section 3 - Contact */}
      <motion.section
        id="contact"
        ref={contactRef}
        className="min-h-screen flex flex-col items-center justify-center snap-start relative overflow-hidden"
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <ContactPage />
      </motion.section>
    </motion.div>
  );
}

export default HomePage;