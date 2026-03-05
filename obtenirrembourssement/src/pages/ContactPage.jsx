import { MailIcon, PhoneIcon } from "../components/Icons";
import { useLanguage } from "../contexts/LanguageContext";

function ContactPage() {
  const { t } = useLanguage();

  return (
    <section className="inner-page modern-page">
      <header className="page-intro">
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.subtitle")}</p>
      </header>

      <div className="contact-grid">
        <article className="contact-card glass-panel">
          <h2>
            <MailIcon size={18} />
            <span>{t("contact.email.title")}</span>
          </h2>
          <p>support@remboursement.example</p>
        </article>
        <article className="contact-card glass-panel">
          <h2>
            <PhoneIcon size={18} />
            <span>{t("contact.phone.title")}</span>
          </h2>
          <p>+33 1 84 00 00 00</p>
        </article>
      </div>

      <form className="contact-form glass-panel" onSubmit={(event) => event.preventDefault()}>
        <div className="track-input-wrap">
          <label htmlFor="contact-message">{t("contact.message")}</label>
          <textarea id="contact-message" rows="5" placeholder={t("contact.placeholder")} />
        </div>
        <button className="btn-primary" type="submit">
          <MailIcon size={18} />
          <span>{t("contact.send")}</span>
        </button>
      </form>
    </section>
  );
}

export default ContactPage;
