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
import nazar from "../assets/nazar.png"
import daisy from "../assets/daisy.png"
import logo from "../assets/log.png"

function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const location = useLocation(); // Get the current route from react-router
  const currentHash = location.hash;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const navigate = useNavigate();
  const menuItems = [
    { path: "/#about", key: "about" },
    { path: "/#experience", key: "experience" },
    { path: "/#works", key: "works" },
    { path: "/#contact", key: "contact" },
  ];

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update selected index based on the current route
  const getSelectedIndex = () => {
    if (currentHash === "#about" || currentHash === "" || currentHash === "#")
      return 0;
    if (currentHash === "#experience") return 1;
    if (currentHash === "#works") return 2;
    if (currentHash === "#contact") return 3;
    return -1;
  };

  const selectedIndex = getSelectedIndex();

  const handleClickItem = (page, index, event) => {
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
  const drawerContent = (
    <List className="h-full max-w-fit flex flex-col justify-center  text-blue-800 font-source-code-pro gap-16">
      <div className="absolute top-8 left-2 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} width="80"></img>
      </div>

      {menuItems.map(({ path, key }, index) => (
        <ListItem
          key={key}
          className={`cursor-pointer ${selectedIndex === index ? "text-blue-800 font-bold" : ""
            } ${hoveredIndex === index ? "translate-x-1" : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e) => handleClickItem(path, index, e)}
        >
          <div className="flex flex-row items-center w-full gap-2">
            <ListItemText
              primary={
                <span className={`relative group font-rubik ${selectedIndex === index ? "font-bold" : ""}`}>
                  {t(key)}

                </span>
              }
            />
            {selectedIndex === index && <img src={daisy} width={16}></img>}
          </div>

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
                    width: 24,
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
                  width: 18,
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
        <div className="w-fit h-screen  fixed top-0 left-0">
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
