import { assertStorageConfigured, getRefund, setRefund } from "./_lib/store.js";
import { json, methodNotAllowed, parseBody } from "./_lib/http.js";

const ALLOWED_STATUSES = new Set(["received", "review", "scheduled", "paid", "rejected"]);

function isAuthorized(req) {
  const expected = process.env.REFUND_ADMIN_TOKEN;
  if (!expected) return false;
  const provided = req.headers["x-admin-token"];
  return String(provided || "") === expected;
}

export default async function handler(req, res) {
  if (methodNotAllowed(req, res, "POST")) return;

  if (!isAuthorized(req)) {
    return json(res, 401, { error: "Unauthorized" });
  }

  let payload;
  try {
    payload = parseBody(req);
  } catch {
    payload = null;
  }

  if (!payload) {
    return json(res, 400, { error: "Invalid JSON body" });
  }

  const reference = String(payload.reference || "").trim().toUpperCase();
  const status = String(payload.status || "").trim().toLowerCase();

  if (!reference) {
    return json(res, 400, { error: "Missing field: reference" });
  }
  if (!ALLOWED_STATUSES.has(status)) {
    return json(res, 400, { error: "Invalid status" });
  }

  try {
    assertStorageConfigured();

    const current = await getRefund(reference);
    if (!current) {
      return json(res, 404, { error: "Reference not found" });
    }

    const updated = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    };

    await setRefund(reference, updated);

    return json(res, 200, {
      reference: updated.reference,
      status: updated.status,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    return json(res, error.statusCode || 500, {
      error: error.message || "Internal server error",
    });
  }
}

