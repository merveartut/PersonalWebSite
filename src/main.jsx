// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // ThemeProvider import edildi

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider> {/* Uygulama ThemeProvider ile sarmalandı */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);