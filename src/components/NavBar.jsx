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
import logo from "../assets/log.png";

function NavBar({ activeSection }) {
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

  const selectedIndex = menuItems.findIndex(item => item.key === activeSection);

  const handleClickItem = (page, index) => {
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
    <div className="fixed top-0 left-0 w-full bg-zinc-50 z-30 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} width="60" alt="Logo" />
        </div>

        {/* Menu items */}
        <div className="hidden md:flex gap-8 items-center text-blue-800 font-source-code-pro">
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

        {/* Language selector */}
        <div>
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

        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
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
      >
        <List>
          {menuItems.map(({ path, key }, index) => (
            <ListItem
              button
              key={key}
              onClick={() => handleClickItem(path, index)}
            >
              <ListItemText primary={t(key)} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default NavBar;