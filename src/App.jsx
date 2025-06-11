import "./App.css";
import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import CardDetailPage from "./pages/CardDetailPage";
import WorkPage from "./pages/WorkPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import NavBar from "./components/NavBar";
import { SkillsPage } from "./pages/SkillsPage";
import { ExperiencePage } from "./pages/ExperiencePage";

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  return (
    <Provider store={store}>
      {/* The Router should wrap the whole app */}
      <Router>
        <NavBar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 flex items-center justify-center overflow-x-hidden ">
          <Routes>
            <Route path="/" element={<HomePage setActiveSection={setActiveSection} />} />
            <Route path="/home" element={<AboutPage setActiveSection={setActiveSection} />} />
            <Route path="/skills" element={<SkillsPage setActiveSection={setActiveSection} />} />
            <Route path="/about" element={<AboutPage setActiveSection={setActiveSection} />} />
            <Route path="/works" element={<WorkPage setActiveSection={setActiveSection} />} />
            <Route path="/experience" element={<ExperiencePage setActiveSection={setActiveSection} />} />
            <Route path="/contact" element={<ContactPage setActiveSection={setActiveSection} />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
