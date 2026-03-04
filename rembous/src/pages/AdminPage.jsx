import { useEffect, useMemo, useState } from "react";
import { WarningIcon } from "../components/Icons";

const ADMIN_TOKEN_KEY = "rembous_admin_token_v1";
const STATUS_OPTIONS = ["received", "review", "scheduled", "paid", "rejected"];
const LABELS = {
  reference: "Reference",
  status: "Statut",
  createdAt: "Date creation",
  updatedAt: "Date mise a jour",
  orderReference: "Reference commande",
  pseudo: "Pseudo TikTok",
  totalAmount: "Montant",
  email: "Email",
  phone: "Telephone",
  fullName: "Nom complet",
  orderDate: "Date commande",
  postalCode: "Code postal",
  iban: "IBAN",
  details: "Details",
};

async function parseJson(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }
  return payload;
}

function AdminPage() {
  const [token, setToken] = useState("");
  const [reference, setReference] = useState("");
  const [record, setRecord] = useState(null);
  const [status, setStatus] = useState("received");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY) || "";
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const visibleRows = useMemo(() => {
    if (!record) return [];
    return Object.entries(record).map(([key, value]) => ({
      key,
      label: LABELS[key] || key,
      value: typeof value === "string" ? value : JSON.stringify(value),
    }));
  }, [record]);

  async function handleSearch(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setRecord(null);

    const normalizedToken = token.trim();
    const normalizedReference = reference.trim().toUpperCase();
    if (!normalizedToken || !normalizedReference) {
      setError("Token admin et reference sont obligatoires.");
      return;
    }

    window.localStorage.setItem(ADMIN_TOKEN_KEY, normalizedToken);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin-refund?reference=${encodeURIComponent(normalizedReference)}`, {
        method: "GET",
        headers: { "x-admin-token": normalizedToken },
      });
      const data = await parseJson(response);
      setRecord(data.record);
      setStatus(String(data.record.status || "received"));
      setNotice("Dossier charge.");
    } catch (err) {
      setError(err.message || "Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateStatus() {
    setError("");
    setNotice("");

    const normalizedToken = token.trim();
    if (!normalizedToken || !record?.reference) {
      setError("Token admin et dossier obligatoires.");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/update-refund-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": normalizedToken,
        },
        body: JSON.stringify({
          reference: record.reference,
          status,
        }),
      });
      const updated = await parseJson(response);
      setRecord((prev) =>
        prev
          ? {
              ...prev,
              status: updated.status,
              updatedAt: updated.updatedAt,
            }
          : prev,
      );
      setNotice("Statut mis a jour.");
    } catch (err) {
      setError(err.message || "Erreur de mise a jour");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="modern-page">
      <header className="page-intro">
        <h1>Admin</h1>
        <p>Recherche dossier par reference et mise a jour du statut.</p>
      </header>

      <form className="track-form glass-panel" onSubmit={handleSearch}>
        <div className="track-input-wrap">
          <label htmlFor="admin-token">Token admin</label>
          <input
            id="admin-token"
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="REFUND_ADMIN_TOKEN"
          />
        </div>

        <div className="track-input-wrap">
          <label htmlFor="admin-reference">Reference dossier</label>
          <input
            id="admin-reference"
            type="text"
            value={reference}
            onChange={(event) => setReference(event.target.value.toUpperCase())}
            placeholder="RMB-YYYYMMDD-XXXXXX"
          />
        </div>

        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Recherche..." : "Rechercher"}
        </button>
      </form>

      {error && (
        <div className="track-result-empty glass-panel" role="alert">
          <WarningIcon size={18} />
          <span>{error}</span>
        </div>
      )}

      {notice && !error && <div className="refund-success glass-panel">{notice}</div>}

      {record && (
        <section className="content-card glass-panel">
          <h2>Dossier {record.reference}</h2>

          <div className="track-form">
            <div className="track-input-wrap">
              <label htmlFor="admin-status">Statut</label>
              <select
                id="admin-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #d7dfe9" }}
              >
                {STATUS_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-secondary" type="button" onClick={handleUpdateStatus} disabled={isUpdating}>
              {isUpdating ? "Mise a jour..." : "Mettre a jour le statut"}
            </button>
          </div>

          <div className="status-steps">
            {visibleRows.map((row) => (
              <div key={row.key} className="status-step is-current">
                <strong>{row.label}:</strong> <span>{row.value || "-"}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default AdminPage;

