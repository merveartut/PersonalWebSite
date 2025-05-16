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
    { path: "/Home", key: "home" },
    { path: "/Works", key: "works" },
    { path: "/Contact", key: "contact" },
  ];

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Update selected index based on the current route
  const getSelectedIndex = () => {
    const currentPath = location.pathname.toLowerCase();
    if (currentPath === "/" || currentPath === "/home") {
      return 0;
    }
    return menuItems.findIndex((text) =>
      currentPath.includes(text.path.toLowerCase())
    );
  };

  const selectedIndex = getSelectedIndex(); // Get selected index based on current path

  // Handle menu item click
  const handleClickItem = (page, index, event) => {
    const { clientX, clientY } = event;
    setSparkles((prev) => [
      ...prev,
      { id: Date.now(), x: clientX, y: clientY },
    ]);

    // Remove sparkle after animation duration
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== Date.now()));
    }, 600);
    navigate(page);
    if (isMobile) setDrawerOpen(false); // Close drawer on mobile after click
  };

  const drawerContent = (
    <List className="h-full max-w-fit flex flex-col justify-center font-source-code-pro gap-24">
      {menuItems.map(({ path, key }, index) => (
        <ListItem
          key={key}
          className={`cursor-pointer ${
            selectedIndex === index ? "text-orange-900 font-bold" : ""
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
                    selectedIndex === index ? "bg-orange-900" : "bg-transparent"
                  } group-hover:bg-black`}
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
          <div className="fixed  overflow-x-hidden z-[1300] p-2 rounded-br-lg">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </div>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              style: {
                width: "80%", // Adjust this as needed
                maxWidth: "120px", // Optional: Restrict max width
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <div className="w-[120px] h-screen fixed top-0 left-0">
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
