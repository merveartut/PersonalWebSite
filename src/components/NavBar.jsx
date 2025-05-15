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
    <List className="h-full max-w-fit flex flex-col justify-center font-source">
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
    </>
  );
}

export default NavBar;
