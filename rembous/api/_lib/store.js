import { kv } from "@vercel/kv";

const STORE_PREFIX = "refund-requests";

function key(reference) {
  return `${STORE_PREFIX}:${reference}`;
}

export function assertStorageConfigured() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    const error = new Error("Storage not configured");
    error.statusCode = 500;
    throw error;
  }
}

export async function getRefund(reference) {
  return kv.get(key(reference));
}

export async function setRefund(reference, record) {
  await kv.set(key(reference), record);
}

