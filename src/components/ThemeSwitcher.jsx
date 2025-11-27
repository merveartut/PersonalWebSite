// src/components/ThemeSwitcher.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CodeIcon from "@mui/icons-material/Code"; // Hacker modu için

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const getThemeButtonClass = (buttonTheme) => {
    let classes = "p-2 rounded-full shadow-md transition-all duration-300 ";
    if (theme === buttonTheme) {
      classes += "scale-110 ring-2 ring-offset-2 ";
    } else {
      classes += "opacity-70 hover:opacity-100";
    }

    if (buttonTheme === "light") {
      classes += theme === "light" ? "bg-white text-blue-500 ring-blue-300" : "bg-gray-200 text-blue-400";
    } else if (buttonTheme === "dark") {
      classes += theme === "dark" ? "bg-gray-800 text-purple-400 ring-purple-600" : "bg-gray-700 text-purple-300";
    } else if (buttonTheme === "hacker") {
      classes += theme === "hacker" ? "bg-black text-green-400 ring-green-500" : "bg-gray-900 text-green-300";
    }
    return classes;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <motion.button
        className={getThemeButtonClass("light")}
        onClick={() => toggleTheme("light")}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        title="Açık Tema"
      >
        <LightModeIcon fontSize="medium" />
      </motion.button>
      <motion.button
        className={getThemeButtonClass("dark")}
        onClick={() => toggleTheme("dark")}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        title="Koyu Tema"
      >
        <DarkModeIcon fontSize="medium" />
      </motion.button>
      <motion.button
        className={getThemeButtonClass("hacker")}
        onClick={() => toggleTheme("hacker")}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        title="Hacker Modu"
      >
        <CodeIcon fontSize="medium" />
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;