import { getStore } from "@netlify/blobs";

const STORE_NAME = "refund-requests";

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

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const reference = String(event.queryStringParameters?.reference || "").trim().toUpperCase();
  if (!reference) {
    return json(400, { error: "Missing query parameter: reference" });
  }

  const store = getStore(STORE_NAME);
  const record = await store.get(reference, { type: "json" });

  if (!record) {
    return json(404, { error: "Reference not found" });
  }

  return json(200, {
    reference: record.reference,
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
}
