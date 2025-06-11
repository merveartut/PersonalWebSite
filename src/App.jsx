import "./App.css";
import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import NavBar from "./components/NavBar";
import { ExperiencePage } from "./pages/ExperiencePage";




function App() {
  const [activeSection, setActiveSection] = useState("");
  const [themeMode, setThemeMode] = useState(() =>
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () =>
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <Provider store={store}>
      {/* The Router should wrap the whole app */}
      <Router>
        <NavBar activeSection={activeSection} theme={themeMode} toggleTheme={toggleTheme} />
        <main className="flex-1 flex items-center justify-center overflow-x-hidden ">
          <Routes>
            <Route path="/" element={<HomePage setActiveSection={setActiveSection} />} />
            <Route path="/home" element={<AboutPage setActiveSection={setActiveSection} />} />
            <Route path="/about" element={<AboutPage setActiveSection={setActiveSection} />} />
            <Route path="/works" element={<WorkPage setActiveSection={setActiveSection} />} />
            <Route path="/experience" element={<ExperiencePage setActiveSection={setActiveSection} />} />
            <Route path="/contact" element={<ContactPage setActiveSection={setActiveSection} />} />
          </Routes>
        </main>
      </Router>
    </Provider >
  );
}

export default App;
