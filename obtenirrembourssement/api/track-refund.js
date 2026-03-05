import { assertStorageConfigured, getRefund } from "./_lib/store.js";
import { json, methodNotAllowed } from "./_lib/http.js";

export default async function handler(req, res) {
  if (methodNotAllowed(req, res, "GET")) return;

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

    return json(res, 200, {
      reference: record.reference,
      status: record.status,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  } catch (error) {
    return json(res, error.statusCode || 500, {
      error: error.message || "Internal server error",
    });
  }
}

