import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import CardDetailPage from "./pages/CardDetailPage";
import WorkPage from "./pages/WorkPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Provider store={store}>
      {/* The Router should wrap the whole app */}
      <Router>
        <NavBar /> {/* NavBar can now use useNavigate */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Detail" element={<CardDetailPage />} />
          <Route path="/Works" element={<WorkPage />} />
          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
