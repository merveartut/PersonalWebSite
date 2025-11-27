// AboutPage.jsx - Revize Edilmiş

import { useTranslation } from "react-i18next";
import profile from "../assets/profile.png";
import profileDark from "../assets/profile_dark.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import RoleTyping from "../components/RoleTyping";
import { motion } from "framer-motion"; // ✨ Framer Motion eklendi

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Alt öğelerin gecikmeli animasyonu
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const AboutPage = () => {
  const { t } = useTranslation();
  const theme = localStorage.getItem("theme");

  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4 text-black dark:text-white p-10 snap-start gap-12 lg:gap-24 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Text Section */}
      <div className="flex flex-col gap-8 items-center md:items-start max-w-2xl">
        <motion.div
          className="flex flex-col gap-4 text-center md:text-left"
          variants={itemVariants}
        >
          <p className="text-xl font-medium">
            Merhaba,
            <span className="text-purple-600 dark:text-purple-300 font-semibold ml-2">
              Benim Adım
            </span>
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
            <span className="text-zinc-900 dark:text-white leading-none">
              MERVE
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 ml-4 leading-none">
              ARTUT
            </span>
          </h1>
          <div className="flex gap-2 items-center text-2xl font-semibold mt-2">
            <span className="font-light">Ben bir</span>
            <RoleTyping /> {/* Mevcut bileşeniniz çok iyi */}
          </div>
        </motion.div>

        <motion.p
          className="max-w-xl font-light text-left md:text-left leading-relaxed text-lg text-gray-700 dark:text-gray-300"
          variants={itemVariants}
        >
          {t("description")}
        </motion.p>

        {/* Sosyal Medya İkonları */}
        <motion.div className="flex gap-6" variants={itemVariants}>
          <a
            href="https://github.com/merveartut"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profilim"
          >
            <GitHubIcon className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 transform hover:scale-125" fontSize="large" />
          </a>
          <a
            href="https://linkedin.com/in/merveartut"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profilim"
          >
            <LinkedInIcon className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125" fontSize="large" />
          </a>
          <a href="mailto:merveartuttt@gmail.com" aria-label="E-posta Gönder">
            <EmailIcon className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-125" fontSize="large" />
          </a>
        </motion.div>

        {/* CV İndir Butonu */}
        <motion.a
          href="/Merve-Artut-Resume.pdf"
          download="Merve_Artut_CV.pdf"
          className="px-8 py-3 mt-4 text-white font-semibold bg-purple-600 rounded-full shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
          variants={itemVariants}
        >
          CV'yi İndir
        </motion.a>
      </div>

      {/* Profile Image - Estetik ve 3D Etkileşimli */}
      <motion.div
        className="flex justify-center md:justify-start relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className={`relative w-[250px] h-[350px] lg:w-[300px] lg:h-[400px] rounded-2xl p-2 ${
            theme === "light"
              ? "bg-gradient-to-br from-purple-200 to-pink-200"
              : "bg-gradient-to-br from-purple-800 to-pink-800"
          } shadow-2xl transition-all duration-300`}
          whileHover={{
            scale: 1.05,
            rotate: 1,
            boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)", // Mor parlama
          }}
          whileTap={{ scale: 0.95 }}
          style={{ rotateY: 0, rotateX: 0 }} // Framer Motion 3D dönüşüm için
        >
          {/* Profil Resmi */}
          <img
            src={theme === "light" ? profile : profileDark}
            alt="Profil Resmi"
            className="relative rounded-xl object-cover w-full h-full border-4 border-white dark:border-zinc-900"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};