import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages } from "../i18n/messages";

const LANGUAGE_KEY = "rembous_language_v1";
const SUPPORTED_LANGUAGES = ["FR", "ES", "IT", "DE"];

const LanguageContext = createContext(null);

function format(template, vars) {
  if (!vars) {
    return template;
  }
  return Object.entries(vars).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, String(value)),
    template,
  );
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("FR");

  useEffect(() => {
    const saved = String(window.localStorage.getItem(LANGUAGE_KEY) || "").toUpperCase();
    if (SUPPORTED_LANGUAGES.includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  function setLanguage(nextLanguage) {
    const normalized = String(nextLanguage || "").toUpperCase();
    if (!SUPPORTED_LANGUAGES.includes(normalized)) {
      return;
    }
    setLanguageState(normalized);
    window.localStorage.setItem(LANGUAGE_KEY, normalized);
  }

  const t = useMemo(() => {
    return (key, vars) => {
      const current = messages[language]?.[key];
      const fallback = messages.FR?.[key] || key;
      return format(current || fallback, vars);
    };
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }),
    [language, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
