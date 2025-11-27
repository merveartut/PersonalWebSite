// src/pages/ContactPage.jsx - REVİZE EDİLMİŞ

import React, { useState } from "react";
import { motion } from "framer-motion"; // Animasyon için
import { useTheme } from "../context/ThemeContext"; // Tema için
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import emailjs from "emailjs-com";
import { useMediaQuery } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTranslation } from "react-i18next";
import letter from "../assets/letter.png"; // Light
import letterDark from "../assets/letter_dark.png"; // Dark/Hacker

// Hata: TextInput ve TextArea componentlerine ihtiyacınız var,
// bu revizyon için basit HTML Input'lar ile değiştiriyorum
// veya bunların projenizde zaten tanımlı olduğunu varsayıyorum. 

function ContactPage() {
  const { t } = useTranslation();
  const { theme } = useTheme(); // ThemeContext'ten tema çekildi

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isAnyFieldNull = !formData.name || !formData.email || !formData.message;
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnyFieldNull) return;

    setIsSubmitting(true);

    emailjs
      .send(
        "service_tj9sxsi", // Service ID
        "template_sue3b8z", // Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "-I_xrU8I1eCHqk6xl" // User ID
      )
      .then(
        () => {
          setSuccessMessage(
            "Yay! Your message just landed 🚀. I’ll get back to you soon—stay tuned!"
          );
          setFormData({ name: "", email: "", message: "" }); // Formu temizle
          setIsSubmitting(false);
        },
        (error) => {
          setSuccessMessage(`Hata oluştu: ${error.text || "Mesaj gönderilemedi."}`);
          console.error("Error:", error);
          setIsSubmitting(false);
        }
      );
  };

  // Tema uyumlu form stilleri
  const getFormInputClass = () => {
    if (theme === 'hacker') {
        return "w-full p-3 rounded bg-hacker-background text-hacker-text border-2 border-hacker-primary focus:ring-hacker-primary focus:border-hacker-primary font-mono placeholder-hacker-secondary";
    }
    if (theme === 'dark') {
        return "w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500";
    }
    return "w-full p-3 rounded bg-white text-gray-900 border border-gray-300 focus:ring-purple-500 focus:border-purple-500";
  }

  const getButtonClass = () => {
    let classes = "px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg";

    if (isAnyFieldNull || isSubmitting) {
        classes += " opacity-50 cursor-not-allowed";
    } else {
        classes += " transform hover:scale-[1.03]";
    }

    if (theme === 'hacker') {
        classes += " bg-hacker-primary text-black hover:shadow-[0_0_15px_rgba(0,255,0,0.6)]";
    } else if (theme === 'dark') {
        classes += " bg-purple-600 text-white hover:bg-purple-700";
    } else {
        classes += " bg-purple-600 text-white hover:bg-purple-700";
    }
    return classes;
  }

  const socialIconClass = (defaultColor, hoverColor) => {
    let classes = "transition-transform duration-300 hover:scale-125 ";
    if (theme === 'hacker') {
        return classes + "text-hacker-secondary hover:text-hacker-text";
    }
    return classes + `text-gray-500 hover:${hoverColor}`;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div
        className={`flex flex-col w-full max-w-4xl h-full items-center justify-center px-4 py-20`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
    >
        <h2 className={`text-4xl font-display font-bold mb-12 ${theme === 'hacker' ? 'text-hacker-text' : 'text-zinc-900 dark:text-white'}`}>
            {t("getintouch")} 💬
        </h2>
        
        {/* Görsel (Tema uyumlu ve konumlandırıldı) */}
        <div className="hidden md:block absolute left-4 lg:left-20 top-1/2 transform -translate-y-1/2 opacity-20 dark:opacity-10">
            <img src={theme === 'light' ? letter : letterDark} alt="Mail İkonu" width={300} />
        </div>

        {!successMessage ? (
            <form className="w-full max-w-lg relative z-10 p-6 rounded-lg" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    {/* Name Input */}
                    <input
                        type="text"
                        name="name"
                        placeholder={t("whoru")}
                        value={formData.name}
                        onChange={handleChange}
                        className={getFormInputClass()}
                        required
                    />

                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder={t("emailInput")}
                        value={formData.email}
                        onChange={handleChange}
                        className={getFormInputClass()}
                        required
                    />

                    {/* Message Area */}
                    <textarea
                        name="message"
                        placeholder={t("message")}
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={getFormInputClass() + " resize-none"}
                        required
                    />

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            disabled={isAnyFieldNull || isSubmitting}
                            className={getButtonClass()}
                        >
                            {isSubmitting ? "Gönderiliyor..." : t("send")}
                        </button>
                    </div>
                </div>
            </form>
        ) : (
            <motion.p 
                className={`text-xl font-bold text-center mt-6 w-full max-w-md p-6 rounded-lg ${theme === 'hacker' ? 'text-hacker-text bg-hacker-accent/30' : 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                {successMessage}
            </motion.p>
        )}
        
        {/* Sosyal Medya İkonları */}
        <div className="flex gap-8 mt-12">
            <a href="https://github.com/merveartut" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon className={socialIconClass('text-gray-600', 'text-black')} fontSize="large" />
            </a>
            <a href="https://linkedin.com/in/merveartut" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon className={socialIconClass('text-gray-600', 'text-blue-700')} fontSize="large" />
            </a>
            <a href="https://www.instagram.com/merveartut/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon className={socialIconClass('text-gray-600', 'text-fuchsia-600')} fontSize="large" />
            </a>
            <a href="mailto:merveartuttt@gmail.com" aria-label="Email">
                <EmailIcon className={socialIconClass('text-gray-600', 'text-red-500')} fontSize="large" />
            </a>
        </div>
    </motion.div>
  );
}

export default ContactPage;