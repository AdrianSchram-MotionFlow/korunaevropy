import { getStore } from "@netlify/blobs";

const STORE_NAME = "koruna-evropy";
const JSON_HEADERS = { "Content-Type": "application/json" };

export default async (req) => {
  const store = getStore({ name: STORE_NAME });
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const prefix = url.searchParams.get("prefix");

  try {
    if (req.method === "GET") {
      if (key) {
        const value = await store.get(key);
        if (value === null) {
          return new Response("null", { status: 404, headers: JSON_HEADERS });
        }
        return new Response(value, { headers: JSON_HEADERS });
      }
      if (prefix !== null) {
        const { blobs } = await store.list({ prefix });
        return new Response(JSON.stringify({ keys: blobs.map(b => b.key) }), { headers: JSON_HEADERS });
      }
      const { blobs } = await store.list();
      return new Response(JSON.stringify({ keys: blobs.map(b => b.key) }), { headers: JSON_HEADERS });
    }

    if (req.method === "PUT" || req.method === "POST") {
      const body = await req.json();
      if (!body || typeof body.key !== "string") {
        return new Response(JSON.stringify({ error: "missing key" }), { status: 400, headers: JSON_HEADERS });
      }
      await store.set(body.key, body.value ?? "");
      return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
    }

    if (req.method === "DELETE") {
      if (!key) {
        return new Response(JSON.stringify({ error: "missing key" }), { status: 400, headers: JSON_HEADERS });
      }
      await store.delete(key);
      return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err && err.message || err) }), { status: 500, headers: JSON_HEADERS });
  }
};

export const config = { path: "/api/data" };
