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
import Sparkle from "./Sparkle";
import styles from "./NavBar.module.css";

function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);
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
    navigate(`/${page}`);
    if (isMobile) setDrawerOpen(false); // Close drawer on mobile after click
  };

  const drawerContent = (
    <List className="h-full max-w-fit flex flex-col justify-center font-source-code-pro gap-24">
      {menuItems.map((text, index) => (
        <ListItem
          button
          key={text}
          className={`transition-transform duration-300 ease-in-out mb-15 cursor-pointer ${
            hoveredIndex === index ? "translate-x-4 !bg-transparent" : ""
          } ${selectedIndex === index ? "translate-x-2" : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e) => handleClickItem(text, index, e)}
        >
          <ListItemText
            primary={
              <span
                className={`font-source-code-pro text-lg ${
                  selectedIndex === index ? "text-orange-900 font-bold" : ""
                } ${hoveredIndex === index ? "font-bold" : ""}`}
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
      {/* Sparkles */}
      {sparkles.map(({ id, x, y }) => (
        <Sparkle key={id} x={x} y={y} />
      ))}
    </>
  );
}

export default NavBar;
