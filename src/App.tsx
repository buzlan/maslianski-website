import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import Home from "./pages/Home"
import ServiceDetail from "./pages/ServiceDetail"

const AppContent: React.FC = () => {
  const location = useLocation();
  const lastScrollKey = useRef<string | null>(null);

  useEffect(() => {
    if (lastScrollKey.current === location.key) return;
    lastScrollKey.current = location.key;

    const hasScrollTarget =
      location.state?.scrollTo || location.state?.scrollToServices;

    if (!hasScrollTarget) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.key, location.state?.scrollTo, location.state?.scrollToServices]);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
