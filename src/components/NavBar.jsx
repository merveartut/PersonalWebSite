// src/components/Navbar.jsx - TAMAMLANMIŞ VE REVİZE EDİLMİŞ
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  { name: "Hakkımda", id: "about" },
  { name: "Deneyimler", id: "experience" },
  // { name: "Çalışmalar", id: "works" }, // Eğer WorkPage eklenecekse aktif edilir
  { name: "İletişim", id: "contact" },
];

const Navbar = ({ activeSection }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Sayfa içi gezinme fonksiyonu
  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Mobil menüyü kapat
  };

  const getNavLinkClass = (id) => {
    let base = "relative block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 ";
    const isActive = activeSection === id;

    // Renk Teması
    if (theme === "dark") {
      base += isActive ? "text-purple-400" : "text-gray-300 hover:text-purple-300";
    } else if (theme === "hacker") {
      base += isActive ? "text-hacker-text shadow-[0_0_5px_var(--color-text)]" : "text-hacker-secondary hover:text-hacker-primary";
    } else { // light
      base += isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-500";
    }

    // Alt Çizgi Animasyonu (after elementi)
    if (isActive) {
      base += " after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[2px] after:bg-purple-500 dark:after:bg-purple-400 hacker:after:bg-hacker-text after:rounded-full after:transition-all after:duration-300 after:scale-x-100";
    } else {
      // Hata burada oluşmuştu. Bu kısmı tamamlıyoruz.
      base += " after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-purple-500 dark:after:bg-purple-400 hacker:after:bg-hacker-text after:rounded-full after:transition-all after:duration-300 hover:after:w-2/3";
    }
    return base;
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  // Navigasyonun asıl dönüş bloğu (return)
  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 shadow-md ${
        theme === "dark" ? "bg-dark-background/90" : 
        theme === "hacker" ? "bg-hacker-background/90 border-b border-hacker-primary" : 
        "bg-white/90"
      } backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / İsim */}
          <motion.div
            className="flex-shrink-0 text-2xl font-display font-bold cursor-pointer"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleScroll('home-dummy')} // En üste dön
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 hacker:text-hacker-text">
              M.A.
            </span>
          </motion.div>

          {/* Masaüstü Menüsü */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.id);
                  }}
                  className={getNavLinkClass(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="-mr-2 flex md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                theme === "hacker" ? "text-hacker-text hover:bg-hacker-secondary" : 
                theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : 
                "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
              }`}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <CloseIcon fontSize="large" />
              ) : (
                <MenuIcon fontSize="large" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobil Menü Açılır Alanı (Framer Motion ile animasyonlu) */}
      {isOpen && (
        <motion.div
          className={`md:hidden ${
            theme === "hacker" ? "bg-hacker-background border-t border-hacker-primary" : 
            theme === "dark" ? "bg-dark-background/95" : 
            "bg-white/95"
          } p-4`}
          initial="closed"
          animate="open"
          exit="closed"
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        >
          <motion.div
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
          >
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.id);
                }}
                className={`w-full text-center ${getNavLinkClass(item.id)}`}
                variants={navItemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;