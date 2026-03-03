const LAST_REF_KEY = "rembous_last_reference_v1";

async function parseJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || "Request failed";
    throw new Error(message);
  }
  return data;
}

export async function createRefundRequest(payload) {
  const response = await fetch("/.netlify/functions/create-refund", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseJson(response);
  window.localStorage.setItem(LAST_REF_KEY, data.reference);
  return data;
}

export async function trackRefundByReference(reference) {
  const response = await fetch(
    `/.netlify/functions/track-refund?reference=${encodeURIComponent(String(reference || "").trim())}`,
    {
      method: "GET",
    },
  );

  return parseJson(response);
}

export function getLastReference() {
  return window.localStorage.getItem(LAST_REF_KEY) || "";
}
