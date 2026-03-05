import { LockIcon } from "../components/Icons";
import { useLanguage } from "../contexts/LanguageContext";

function PolitiquePage() {
  const { t } = useLanguage();

  return (
    <section className="inner-page modern-page">
      <header className="page-intro">
        <h1>{t("privacy.title")}</h1>
        <p>{t("privacy.subtitle")}</p>
      </header>

      <article className="content-card glass-panel">
        <h2>
          <LockIcon size={18} />
          <span>{t("privacy.summary")}</span>
        </h2>
        <p>{t("privacy.body")}</p>
      </article>
    </section>
  );
}

export default PolitiquePage;
