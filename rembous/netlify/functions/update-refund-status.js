import { getStore } from "@netlify/blobs";

const STORE_NAME = "refund-requests";
const ALLOWED_STATUSES = new Set(["received", "review", "scheduled", "paid", "rejected"]);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function isAuthorized(event) {
  const expected = process.env.REFUND_ADMIN_TOKEN;
  if (!expected) {
    return false;
  }
  const provided = event.headers?.["x-admin-token"] || event.headers?.["X-Admin-Token"];
  return String(provided || "") === expected;
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!isAuthorized(event)) {
    return json(401, { error: "Unauthorized" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const reference = String(payload.reference || "").trim().toUpperCase();
  const status = String(payload.status || "").trim().toLowerCase();

  if (!reference) {
    return json(400, { error: "Missing field: reference" });
  }
  if (!ALLOWED_STATUSES.has(status)) {
    return json(400, { error: "Invalid status" });
  }

  const store = getStore(STORE_NAME);
  const current = await store.get(reference, { type: "json" });
  if (!current) {
    return json(404, { error: "Reference not found" });
  }

  const updated = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  };

  await store.setJSON(reference, updated);

  return json(200, {
    reference: updated.reference,
    status: updated.status,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  });
}

