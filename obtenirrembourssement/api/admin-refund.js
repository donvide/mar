import { assertStorageConfigured, getRefund } from "./_lib/store.js";
import { json, methodNotAllowed } from "./_lib/http.js";

function isAuthorized(req) {
  const expected = process.env.REFUND_ADMIN_TOKEN;
  if (!expected) return false;
  const provided = req.headers["x-admin-token"];
  return String(provided || "") === expected;
}

export default async function handler(req, res) {
  if (methodNotAllowed(req, res, "GET")) return;

  if (!isAuthorized(req)) {
    return json(res, 401, { error: "Unauthorized" });
  }

  const reference = String(req.query.reference || "").trim().toUpperCase();
  if (!reference) {
    return json(res, 400, { error: "Missing query parameter: reference" });
  }

  try {
    assertStorageConfigured();
    const record = await getRefund(reference);

    if (!record) {
      return json(res, 404, { error: "Reference not found" });
    }

    return json(res, 200, { record });
  } catch (error) {
    return json(res, error.statusCode || 500, {
      error: error.message || "Internal server error",
    });
  }
}

