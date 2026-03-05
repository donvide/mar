import { CheckIcon, RefundIcon, ShieldIcon, TrackIcon, WarningIcon } from "../components/Icons";
import { useLanguage } from "../contexts/LanguageContext";

function HomePage({ navigate }) {
  const { t } = useLanguage();

  return (
    <section className="home-page">
      <div className="hero-card glass-panel">
        <span className="hero-badge">{t("home.badge")}</span>
        <h1>{t("home.title")}</h1>
        <p>{t("home.subtitle")}</p>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={() => navigate("/remboursement")}>
            <RefundIcon size={18} />
            <span>{t("home.cta.create")}</span>
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate("/suivi")}>
            <TrackIcon size={18} />
            <span>{t("home.cta.track")}</span>
          </button>
        </div>

        <div className="hero-features">
          <article className="feature-item">
            <ShieldIcon size={18} />
            <span>{t("home.feature.security")}</span>
          </article>
          <article className="feature-item">
            <CheckIcon size={18} />
            <span>{t("home.feature.fast")}</span>
          </article>
          <article className="feature-item">
            <TrackIcon size={18} />
            <span>{t("home.feature.live")}</span>
          </article>
        </div>
      </div>

      <div className="alert-box">
        <div className="alert-title">
          <WarningIcon size={20} />
          <h2>{t("home.alert.title")}</h2>
        </div>
        <p>{t("home.alert.body")}</p>
      </div>
    </section>
  );
}

export default HomePage;
