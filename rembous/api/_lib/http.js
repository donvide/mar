export function json(res, statusCode, body) {
  res.status(statusCode).setHeader("Cache-Control", "no-store");
  res.json(body);
}

export function methodNotAllowed(req, res, method) {
  if (req.method !== method) {
    json(res, 405, { error: "Method not allowed" });
    return true;
  }
  return false;
}

export function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body;
}

