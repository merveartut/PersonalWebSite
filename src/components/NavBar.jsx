import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import Sparkle from "./Sparkle";
import { useTranslation } from "react-i18next";
import trImg from "../assets/tr.png";
import enImg from "../assets/en.png";

function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const location = useLocation(); // Get the current route from react-router
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const navigate = useNavigate();
  const menuItems = [
    { path: "/home#skills", key: "home" },
    { path: "/home#about", key: "about" },
    { path: "/home#works", key: "works" },
    { path: "/home#contact", key: "contact" },
  ];

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const currentPath = location.pathname.toLowerCase() + location.hash;

  // Update selected index based on the current route
  const getSelectedIndex = () => {
    if (
      currentPath.includes("#skills") ||
      currentPath === "/home" ||
      currentPath === "/"
    )
      return 0;
    if (currentPath.includes("#about")) return 1;
    if (currentPath.includes("#works")) return 2;
    if (currentPath.includes("#contact")) return 3;
    return -1;
  };

  const selectedIndex = getSelectedIndex(); // Get selected index based on current path

  // Handle menu item click
  const handleClickItem = (page, index, event) => {
    const [path, hash] = page.split("#");

    navigate(path + (hash ? `#${hash}` : ""));

    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (isMobile) setDrawerOpen(false);
  };

  const drawerContent = (
    <List className="h-full max-w-fit flex flex-col justify-center bg-orange-900 text-stone-100 font-source-code-pro gap-24">
      {menuItems.map(({ path, key }, index) => (
        <ListItem
          key={key}
          className={`cursor-pointer ${
            selectedIndex === index ? "text-stone-200 font-bold" : ""
          } ${hoveredIndex === index ? "translate-x-1" : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e) => handleClickItem(path, index, e)}
        >
          <ListItemText
            primary={
              <span className="relative group">
                {t(key)}
                <span
                  className={`block w-full h-[1px] mt-1 transition-all duration-300 ${
                    selectedIndex === index ? "bg-stone-200" : "bg-transparent"
                  } group-hover:bg-stone-200`}
                />
              </span>
            }
          />
        </ListItem>
      ))}
      <div className="absolute bottom-10 left-5">
        <FormControl>
          <Select
            value={language}
            onChange={handleLanguageChange}
            variant="standard"
            sx={{
              // Remove underline and padding so only the flag shows
              "&.MuiInputBase-root:before, &.MuiInputBase-root:after": {
                borderBottom: "none !important",
              },
              padding: 0,
              minWidth: 0,
              width: "auto",
            }}
            renderValue={(selected) => {
              const flagSrc = selected === "en" ? enImg : trImg;
              return (
                <img
                  src={flagSrc}
                  alt={selected}
                  style={{
                    width: 30,
                    height: 20,
                    verticalAlign: "middle",
                  }}
                />
              );
            }}
            IconComponent={() => null}
            size="small"
          >
            <MenuItem value="en">
              <img
                src={enImg}
                alt="English"
                style={{
                  width: 20,
                  height: 14,
                  marginRight: 8,
                  verticalAlign: "middle",
                }}
              />
              English
            </MenuItem>
            <MenuItem value="tr">
              <img
                src={trImg}
                alt="Türkçe"
                style={{
                  width: 20,
                  height: 14,
                  marginRight: 8,
                  verticalAlign: "middle",
                }}
              />
              Türkçe
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* Prevent horizontal scrolling on mobile */}
          <div className="fixed overflow-x-hidden bg-transparent z-[1300] p-2 rounded-br-lg">
            <IconButton
              edge="start"
              color="oklch(92.3% 0.003 48.717)"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
              size="large"
            >
              <MenuIcon className="text-stone-200" />
            </IconButton>
          </div>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              style: {
                maxWidth: "120px", // Optional: Restrict max width
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <div className="w-fit h-screen bg-orange-900 fixed top-0 left-0">
          {drawerContent}
        </div>
      )}
      {/* Sparkles */}
      {sparkles.map(({ id, x, y }) => (
        <Sparkle key={id} x={x} y={y} />
      ))}
    </>
  );
}

export default NavBar;
