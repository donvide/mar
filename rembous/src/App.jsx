import { useEffect, useMemo, useState } from "react";
import SiteLayout from "./components/SiteLayout";
import { LanguageProvider } from "./contexts/LanguageContext";
import ConditionsPage from "./pages/ConditionsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PolitiquePage from "./pages/PolitiquePage";
import RemboursementPage from "./pages/RemboursementPage";
import SuiviPage from "./pages/SuiviPage";

const ROUTES = {
  "/": HomePage,
  "/remboursement": RemboursementPage,
  "/suivi": SuiviPage,
  "/contact": ContactPage,
  "/politique-confidentialite": PolitiquePage,
  "/conditions": ConditionsPage,
};

function normalizePath(pathname) {
  if (!pathname || pathname === "") {
    return "/";
  }

  const clean = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  return ROUTES[clean] ? clean : "/";
}

function navigate(to) {
  const target = normalizePath(to);
  if (target !== window.location.pathname) {
    window.history.pushState({}, "", target);
  }
  window.dispatchEvent(new Event("app:navigate"));
}

function AppContent() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handleNavigation = () => {
      setPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("app:navigate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("app:navigate", handleNavigation);
    };
  }, []);

  const CurrentPage = useMemo(() => ROUTES[path] || HomePage, [path]);

  return (
    <SiteLayout navigate={navigate} currentPath={path}>
      <CurrentPage navigate={navigate} />
    </SiteLayout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
