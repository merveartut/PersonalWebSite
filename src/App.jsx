// src/App.jsx - Düzeltilmiş ve Temizlenmiş Hali

import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AnimatedCursor from "react-animated-cursor";
import ErrorBoundary from "./components/ErrorBoundary";

const HomePage = React.lazy(() => import("./pages/HomePage"));
// Diğer sayfalarınız buraya eklenebilir

function App() {
  const { theme } = useTheme();
  // activeSection state'i artık Navbar'a prop olarak geçirilecek
  const [activeSection, setActiveSection] = useState("home"); 

  return (
    <ErrorBoundary>
      <Router>
        {/* Tema sınıfını body/html yerine App sarmalayıcısına uyguluyoruz */}
        <div className={`app-container relative min-h-screen flex flex-col font-sans ${theme} transition-colors duration-500`}>
          
          {/* Custom Animated Cursor - Prop tamamlama eklendi */}
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0.3}
            has  // Eksik olan prop'u tamamlama (varsayımsal)
            showSystemCursor={true} // Varsayılan cursor'ı göstermeye devam et
            clickables={[
              "a",
              "button",
              ".clickable", // Tailwind sınıflarınızdan birini ekleyebilirsiniz
              { target: 'input[type="text"]' },
            ]}
          />

          <Navbar activeSection={activeSection} /> 
          <ThemeSwitcher /> {/* Tema değiştiriciyi en üste sabitleyelim */}

          {/* Ana İçerik Alanı */}
          <main className="flex-grow">
            <Suspense fallback={<Preloader />}>
              <Routes>
                {/* setActiveSection prop'unu HomePage'e iletiyoruz */}
                <Route path="/" element={<HomePage setActiveSection={setActiveSection} />} />
                {/* Diğer Rotalar */}
              </Routes>
            </Suspense>
          </main>

          <Footer />

        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App; // Bu dosyanın adı App.jsx olduğu için App'i export ediyoruz.