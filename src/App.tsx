import { HashRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import ServiceDetail from "./pages/ServiceDetail"

const AppContent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hasScrollTarget =
      location.state?.scrollTo || location.state?.scrollToServices;

    if (!hasScrollTarget) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname, location.key, location.state]);

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
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
