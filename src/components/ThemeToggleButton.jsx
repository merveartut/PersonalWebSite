import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggleButton = ({ themeMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white dark:bg-zinc-800 
                 shadow-lg hover:scale-110 transition flex items-center 
                 justify-center w-12 h-12"
      aria-label="Toggle theme"
    >
      {themeMode === "dark" ? (
        <WbSunnyIcon fontSize="medium" className="text-yellow-400" />
      ) : (
        <DarkModeIcon fontSize="medium" className="text-purple-400" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
