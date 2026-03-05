import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CloseIcon, ContactIcon, HomeIcon, MenuIcon, RefundIcon, TrackIcon } from "./Icons";

const LANGUAGES = [
  { code: "FR", label: "FR" },
  { code: "ES", label: "ES" },
  { code: "IT", label: "IT" },
  { code: "DE", label: "DE" },
];

function NavLink({ to, onNavigate, children, className = "", onAfterNavigate }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(to);
        if (onAfterNavigate) {
          onAfterNavigate();
        }
      }}
    >
      {children}
    </a>
  );
}

function SiteLayout({ children, navigate, currentPath }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = useMemo(
    () => [
      { to: "/", label: t("nav.home"), icon: HomeIcon },
      { to: "/remboursement", label: t("nav.refund"), icon: RefundIcon },
      { to: "/suivi", label: t("nav.track"), icon: TrackIcon },
    ],
    [t],
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath, language]);

  return (
    <div className="site-shell">
      <header className="site-header glass-panel">
        <div className="site-header-top">
          <NavLink to="/" onNavigate={navigate} className="brand-link">
            <p className="brand">REMBOURSEMENT</p>
          </NavLink>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? t("menu.close") : t("menu.open")}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
          >
            {isMobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>

          <nav className={`main-nav ${isMobileMenuOpen ? "is-open" : ""}`} aria-label={t("nav.home")}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onNavigate={navigate}
                  className={`nav-pill ${active ? "is-active" : ""}`}
                  onAfterNavigate={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className={`header-actions ${isMobileMenuOpen ? "is-open" : ""}`}>
            <div className="lang-row" aria-label={t("lang.available")}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-pill ${language === lang.code ? "is-active" : ""}`}
                  title={lang.label}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <NavLink
              to="/contact"
              onNavigate={navigate}
              className="contact-link"
              onAfterNavigate={() => setIsMobileMenuOpen(false)}
            >
              <ContactIcon size={16} />
              <span>{t("nav.contact")}</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="page-content">{children}</main>

      <footer className="site-footer">
        <h2>REMBOURSEMENT</h2>
        <p>{t("footer.copy")}</p>
        <div className="footer-links">
          <NavLink to="/politique-confidentialite" onNavigate={navigate}>
            {t("footer.privacy")}
          </NavLink>
          <NavLink to="/conditions" onNavigate={navigate}>
            {t("footer.conditions")}
          </NavLink>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
