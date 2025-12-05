import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    setActiveTab(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false); // close drawer on mobile
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[90] 
        transition-all duration-300 px-6 py-4 
        flex items-center justify-end sm:justify-center
        ${
          scrolled
            ? "bg-transparent sm:bg-white/80 dark:bg-zinc-900/80 sm:backdrop-blur-md sm:shadow-md"
            : "bg-transparent"
        }
      `}
    >
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium dark:text-white">
        <li
          className={`cursor-pointer hover:text-[#7851e4] dark:hover:text-[#43bda2] transition ${
            activeTab === "about" ? "text-[#7851e4]" : ""
          }`}
          onClick={() => scrollToSection("about")}
        >
          Home
        </li>
        <li
          className={`cursor-pointer hover:text-[#7851e4] dark:hover:text-[#43bda2] transition ${
            activeTab === "experience" ? "text-[#7851e4]" : ""
          }`}
          onClick={() => scrollToSection("experience")}
        >
          Experience
        </li>
        <li
          className={`cursor-pointer hover:text-[#7851e4] dark:hover:text-[#43bda2] transition ${
            activeTab === "contact" ? "text-[#7851e4]" : ""
          }`}
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white bg-[#7851e4] p-2 rounded-full"
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Mobile Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-[100] 
          bg-white dark:bg-zinc-900 shadow-xl 
          transform transition-transform duration-300 
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b dark:border-zinc-700">
          <span className="text-xl font-semibold dark:text-white">Menu</span>
          <button
            className="text-zinc-800 dark:text-white"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon fontSize="large" />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col text-lg font-medium dark:text-white p-6 gap-6">
          <li
            className={`cursor-pointer ${
              activeTab === "about" ? "text-[#7851e4]" : ""
            }`}
            onClick={() => scrollToSection("about")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "experience" ? "text-[#7851e4]" : ""
            }`}
            onClick={() => scrollToSection("experience")}
          >
            Experience
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "contact" ? "text-[#7851e4]" : ""
            }`}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </li>
        </ul>
      </div>

      {/* Backdrop when drawer open */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[95] md:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
