import { FileIcon } from "../components/Icons";
import { useLanguage } from "../contexts/LanguageContext";

function ConditionsPage() {
  const { t } = useLanguage();

  return (
    <section className="inner-page modern-page">
      <header className="page-intro">
        <h1>{t("conditions.title")}</h1>
        <p>{t("conditions.subtitle")}</p>
      </header>

      <article className="content-card glass-panel">
        <h2>
          <FileIcon size={18} />
          <span>{t("conditions.points")}</span>
        </h2>
        <p>{t("conditions.body")}</p>
      </article>
    </section>
  );
}

export default ConditionsPage;
