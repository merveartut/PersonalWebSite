import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Face3Icon from "@mui/icons-material/Face3";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import { ChevronLeft, Menu, Close } from "@mui/icons-material";

const Toolbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [hideToolBar, setHideToolBar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { path: "/#about", key: "about", icon: <Face3Icon /> },
    { path: "/#experience", key: "experience", icon: <WorkIcon /> },
    // { path: "/#works", key: "works", icon: <CodeIcon /> },
    { path: "/#contact", key: "contact", icon: <EmailIcon /> },
  ];

  // handle resize to detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickItem = (page) => {
    const [path, hash] = page.split("#");
    if (path === "/" && hash) {
      navigate(`#${hash}`);
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(page);
    }
    if (isMobile) setMobileOpen(false); // close toolbar on mobile click
  };

  // 🖥️ Desktop hover logic
  const handleHover = () => !isMobile && setHideToolBar(false);
  const handleHideToolbar = () => !isMobile && setHideToolBar(true);

  // 📱 Mobile toggle logic
  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <>
      {/* 🖥️ DESKTOP TOOLBAR */}
      {!isMobile && (
        <div
          className="hidden md:flex fixed top-1/2 right-4 -translate-y-1/2 z-50"
          onMouseEnter={handleHover}
          onMouseLeave={handleHideToolbar}
        >
          {/* Toolbar content */}
          <div
            className={`absolute right-0 flex-col gap-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 
                      rounded-l-xl overflow-hidden shadow-lg px-4 py-6 transition-all duration-500
                      ${
                        hideToolBar
                          ? "translate-x-full opacity-0"
                          : "translate-x-0 opacity-100 mr-2"
                      }`}
          >
            {menuItems.map(({ path, key, icon }, index) => (
              <button
                key={key}
                onClick={() => handleClickItem(path)}
                style={{
                  transitionDelay: hideToolBar
                    ? "0ms"
                    : `${index * 100 + 150}ms`,
                }}
                className={`flex flex-col items-center justify-center gap-2 p-2 w-full rounded-lg transform transition-all duration-300 
                          hover:bg-blue-100 dark:hover:bg-slate-700
                          ${
                            hideToolBar
                              ? "opacity-0 translate-x-4"
                              : "opacity-100 translate-x-0"
                          }`}
              >
                <div className="text-gray-700 dark:text-gray-300">{icon}</div>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {t(key)}
                </span>
              </button>
            ))}
          </div>

          {/* Black line + chevron */}
          <div className="flex">
            <div className="h-80 flex items-center">
              <ChevronLeft
                style={{ height: "40px", width: "40px" }}
                className={`transition-transform duration-500 text-gray-600`}
              />
            </div>

            <div className="bg-gray-600 dark:bg-white w-1 h-80 rounded-l-sm cursor-pointer transition-all duration-500" />
          </div>
        </div>
      )}

      {/* 📱 MOBILE TOOLBAR */}
      {isMobile && (
        <>
          {/* Menu Button — top-right */}
          {!mobileOpen && (
            <button
              onClick={toggleMobileMenu}
              className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-slate-900 shadow-md"
            >
              <Menu className="text-gray-800 dark:text-gray-200 w-6 h-6" />
            </button>
          )}

          {mobileOpen && (
            <div className="flex justify-between px-8 py-2">
              <div
                className={`flex flex-row items-center justify-center gap-3 overflow-hidden transition-all duration-500
                        `}
              >
                {menuItems.map(({ path, key, icon }, index) => (
                  <button
                    key={key}
                    onClick={() => handleClickItem(path)}
                    style={{
                      transitionDelay: mobileOpen
                        ? `${index * 80 + 100}ms`
                        : "0ms",
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transform transition-all duration-300
                            hover:bg-blue-100 dark:hover:bg-slate-700
                            ${
                              mobileOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2"
                            }`}
                  >
                    <div className="text-gray-700 dark:text-gray-300">
                      {icon}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {t(key)}
                    </span>
                  </button>
                ))}
              </div>
              <button onClick={toggleMobileMenu}>
                <Close className="text-gray-800 dark:text-gray-200" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Toolbar;
