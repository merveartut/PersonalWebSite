import "./App.css";
import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import ThemeToggleButton from "./components/ThemeToggleButton";
import LanguageToggleButton from "./components/LanguageToggleButton";
import Navbar from "./components/NavBar";

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Tema değişikliğini HTML root elementine uygular
    document.documentElement.classList.toggle("dark", themeMode === "dark");
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () =>
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <Provider store={store}>
      {/* The Router should wrap the whole app */}
      <Router>
        <Navbar />

        <div className="fixed bottom-6 sm:bottom-12 right-6 z-[100] flex items-center gap-3">
          <LanguageToggleButton />
          <ThemeToggleButton themeMode={themeMode} toggleTheme={toggleTheme} />
        </div>

        <main className="flex-1 flex items-center justify-center overflow-x-hidden ">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setActiveSection={setActiveSection}
                  themeMode={themeMode}
                />
              }
            />
            <Route
              path="/home"
              element={
                <AboutPage
                  setActiveSection={setActiveSection}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage setActiveSection={setActiveSection} />}
            />
            <Route
              path="/works"
              element={<WorkPage setActiveSection={setActiveSection} />}
            />
            <Route
              path="/experience"
              element={<ExperiencePage setActiveSection={setActiveSection} />}
            />
            <Route
              path="/contact"
              element={<ContactPage setActiveSection={setActiveSection} />}
            />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
