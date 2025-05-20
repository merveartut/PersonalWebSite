import "./App.css";
import HomePage from "./pages/HomePage";
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

function App() {
  return (
    <Provider store={store}>
      {/* The Router should wrap the whole app */}
      <Router>
        <NavBar /> {/* NavBar can now use useNavigate */}
        <main className="flex-1 flex items-center h-screen justify-center overflow-x-hidden ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
