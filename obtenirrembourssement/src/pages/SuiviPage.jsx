import { useEffect, useMemo, useState } from "react";
import { CheckIcon, TrackIcon, WarningIcon } from "../components/Icons";
import { useLanguage } from "../contexts/LanguageContext";
import { getLastReference, trackRefundByReference } from "../utils/refundApi";

const REFERENCE_PATTERN = /^RMB-\d{8}-\d{6}$/;

function SuiviPage() {
  const { t } = useLanguage();
  const [referenceInput, setReferenceInput] = useState("");
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const last = getLastReference();
    if (last) {
      setReferenceInput(last);
    }
  }, []);

  const steps = useMemo(() => {
    if (!result) {
      return [];
    }

    const status = String(result.status || "").toLowerCase();
    const done = {
      received: ["received"],
      review: ["received", "review"],
      scheduled: ["received", "review", "scheduled"],
      paid: ["received", "review", "scheduled", "paid"],
      rejected: ["received", "review", "rejected"],
    };
    const currentDone = new Set(done[status] || ["received"]);

    return [
      { key: "received", label: t("track.status.received"), done: currentDone.has("received"), tone: "normal" },
      { key: "review", label: t("track.status.review"), done: currentDone.has("review"), tone: "normal" },
      { key: "scheduled", label: t("track.status.scheduled"), done: currentDone.has("scheduled"), tone: "normal" },
      { key: "paid", label: t("track.status.paid"), done: currentDone.has("paid"), tone: "normal" },
      { key: "rejected", label: t("track.status.rejected"), done: currentDone.has("rejected"), tone: "danger" },
    ];
  }, [result, t]);

  async function handleSearch(event) {
    event.preventDefault();
    const normalizedReference = referenceInput.trim().toUpperCase();

    if (!normalizedReference) {
      setValidationError(t("track.error.empty"));
      setResult(null);
      setHasSearched(false);
      return;
    }

    if (!REFERENCE_PATTERN.test(normalizedReference)) {
      setValidationError(t("track.error.format"));
      setResult(null);
      setHasSearched(false);
      return;
    }

    setValidationError("");
    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await trackRefundByReference(normalizedReference);
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="inner-page modern-page">
      <header className="page-intro">
        <h1>{t("track.title")}</h1>
        <p>{t("track.subtitle")}</p>
      </header>

      <form className="track-form glass-panel" onSubmit={handleSearch}>
        <div className="track-input-wrap">
          <label htmlFor="suivi-reference">{t("track.label.ref")}</label>
          <input
            id="suivi-reference"
            type="text"
            value={referenceInput}
            onChange={(event) => {
              setReferenceInput(event.target.value.toUpperCase());
              if (validationError) {
                setValidationError("");
              }
            }}
            placeholder={t("track.placeholder.ref")}
          />
        </div>
        <button className="btn-primary" type="submit" disabled={isLoading}>
          <TrackIcon size={18} />
          <span>{isLoading ? t("track.submitting") : t("track.submit")}</span>
        </button>
      </form>

      {validationError && (
        <div className="track-result-empty glass-panel" role="alert">
          <WarningIcon size={18} />
          <span>{validationError}</span>
        </div>
      )}

      {result && (
        <div className="status-card glass-panel">
          <h2>{t("track.reference.title", { reference: result.reference })}</h2>
          <div className="status-steps">
            {steps.map((step) => (
              <div
                key={step.key}
                className={`status-step ${step.done ? "is-done" : "is-current"} ${
                  step.done && step.tone === "danger" ? "is-danger" : ""
                }`}
              >
                {step.done ? <CheckIcon size={16} /> : <TrackIcon size={16} />}
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasSearched && !result && !isLoading && (
        <div className="track-result-empty glass-panel">
          <WarningIcon size={18} />
          <span>{t("track.error.notFound")}</span>
        </div>
      )}
    </section>
  );
}

export default SuiviPage;
