// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Tarayıcıdan veya localStorage'dan temayı yükle
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"; // Varsayılan tema: dark
    }
    return "dark";
  });

  useEffect(() => {
    // HTML etiketine tema sınıfını ekle
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "hacker");
    root.classList.add(theme);

    // Temayı localStorage'a kaydet
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};