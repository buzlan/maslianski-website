import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import Home from "./pages/Home"
import ServiceDetail from "./pages/ServiceDetail"

function HashRouteRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#/")) return;

    const nextPath = hash.slice(1) || "/";
    navigate(
      { pathname: nextPath, search: window.location.search, hash: "" },
      { replace: true },
    );
  }, [navigate]);

  return null;
}

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
      <HashRouteRedirect />
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
