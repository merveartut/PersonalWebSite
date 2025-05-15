import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";

function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation(); // Get the current route from react-router
  const isMobile = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();
  const menuItems = ["Home", "Works", "Contact"];

  // Update selected index based on the current route
  const getSelectedIndex = () => {
    const currentPath = location.pathname.toLowerCase();
    if (currentPath === "/" || currentPath === "/home") {
      return 0;
    }
    return menuItems.findIndex((text) =>
      currentPath.includes(text.toLowerCase())
    );
  };

  const selectedIndex = getSelectedIndex(); // Get selected index based on current path

  // Handle menu item click
  const handleClickItem = (page, index) => {
    navigate(`/${page}`);
    if (isMobile) setDrawerOpen(false); // Close drawer on mobile after click
  };

  const drawerContent = (
    <List className={styles.list}>
      {menuItems.map((text, index) => (
        <ListItem
          button
          key={text}
          className={`${styles.box} ${
            hoveredIndex === index ? styles.hovered : ""
          } ${selectedIndex === index ? styles.selected : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleClickItem(text, index)}
        >
          <ListItemText
            primary={
              <span
                className={`font-source ${
                  selectedIndex === index ? "text-orange-900" : ""
                }`}
              >
                {text}
              </span>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col p-6">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            className="p-6 static h-fit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {drawerContent}
          </Drawer>
        </div>
      ) : (
        <div className="w-[140px] h-screen fixed top-0 left-0">
          {drawerContent}
        </div>
      )}
    </>
  );
}

export default NavBar;
