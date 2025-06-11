import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import trImg from "../assets/tr.png";
import enImg from "../assets/en.png";
import { ThemeToggleButton } from "./ThemeToggleButton";
import logo from "../assets/log.png";
import darkLogo from "../assets/dark_logo.png"
import { LanguageToggleButton } from "./LanguageToggleButton";

function NavBar({ activeSection, toggleTheme, theme }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/#about", key: "about" },
    { path: "/#experience", key: "experience" },
    { path: "/#works", key: "works" },
    { path: "/#contact", key: "contact" },
  ];

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };
  console.log(i18n);

  const selectedIndex = menuItems.findIndex(item => item.key === activeSection);

  const handleClickItem = (page, index) => {
    console.log(page, "pppp")
    const [path, hash] = page.split("#");
    if (path === "/" && hash) {
      navigate(`#${hash}`);
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(page);
    }
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-zinc-50 dark:bg-slate-800 z-30 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        {theme === "light" ? (<div className="cursor-pointer" onClick={() => handleClickItem(`/#about`)}>
          <img src={logo} width="60" alt="Logo" />
        </div>) : (<div className="cursor-pointer" onClick={() => handleClickItem(`/#about`)}>
          <img src={darkLogo} width="60" alt="Logo" />
        </div>)}


        {/* Menu items */}
        <div className="hidden md:flex gap-8 items-center text-blue-800 dark:text-white font-source-code-pro">
          {menuItems.map(({ path, key }, index) => (
            <div
              key={key}
              onClick={() => handleClickItem(path, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`cursor-pointer flex items-center gap-1 transition-all duration-200
                ${hoveredIndex === index ? "translate-y-[-1px]" : ""}
              `}
            >
              <span className="relative font-rubik">
                {selectedIndex === index && (
                  <span className="absolute inset-0 -rotate-12 bg-blue-300 opacity-30 px-4 rounded pointer-events-none z-0"></span>
                )}
                <span className="relative z-10">{t(key)}</span>
              </span>
            </div>
          ))}
        </div>

        {!isMobile && (
          <div className="flex flex-row gap-4 items-center">
            <div className="dark:bg-white dark:px-2">
              <IconButton onClick={handleLanguageMenuOpen} size="small" sx={{ p: 0 }}>
                <img
                  src={i18n.language === "en" ? enImg : trImg}
                  alt={i18n.language}
                  width={24}
                  height={16}
                  style={{ objectFit: "cover" }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleLanguageMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => changeLanguage("en")}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <img src={enImg} alt="English" width={24} height={16} />
                    <span>English</span>
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => changeLanguage("tr")}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <img src={trImg} alt="Türkçe" width={24} height={16} />
                    <span>Türkçe</span>
                  </Box>
                </MenuItem>
              </Menu>
            </div>

            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            edge="start"
            className={`${theme === "light" ? "!text-zinc-900" : "!text-white"}`}
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </div>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 2,
            bgcolor: theme === 'light' ? 'background.paper' : 'grey.100',
          },
        }}
      >
        <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {menuItems.map(({ path, key }, index) => (
            <ListItem
              button
              key={key}
              onClick={() => handleClickItem(path, index)}
            >
              <span className="relative font-rubik">
                {selectedIndex === index && (
                  <span className="absolute inset-0 -rotate-12 bg-blue-300 opacity-30 px-4 rounded pointer-events-none z-0"></span>
                )}
                <span className="font-rubik">{t(key)}</span>
              </span>

            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: theme === 'light' ? 'grey.300' : 'grey.700',
            pt: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <LanguageToggleButton />
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </Box>
      </Drawer>
    </div>
  );
}

export default NavBar;