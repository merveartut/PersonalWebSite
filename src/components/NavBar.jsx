import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

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
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[90] 
        transition-all duration-300 px-6 py-4 
        flex items-center justify-center
        ${
          scrolled
            ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }
      `}
    >
      {/* Logo */}

      {/* Navigation Items */}
      <ul className="flex items-center gap-8 text-sm font-medium dark:text-white">
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
        {/* <li
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => scrollToSection("works")}
        >
          Works
        </li> */}
        <li
          className={`cursor-pointer hover:text-[#7851e4] dark:hover:text-[#43bda2] transition ${
            activeTab === "contact" ? "text-[#7851e4]" : ""
          }`}
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
