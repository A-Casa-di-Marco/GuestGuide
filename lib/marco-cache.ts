import { env } from "cloudflare:workers";
import type { Lang } from "./i18n";

// Cache delle risposte di Marco su D1: risparmia quota del modello gratuito.
// Ogni errore qui è non fatale: la chat deve funzionare anche senza cache.

const TTL_MS = 14 * 24 * 3600 * 1000;
const CACHE_VERSION = "v1";

function db() {
  const d1 = (env as unknown as { DB?: D1Database }).DB;
  if (!d1) throw new Error("DB unavailable");
  return d1;
}

async function keyOf(question: string, lang: Lang): Promise<string> {
  const norm = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const data = new TextEncoder().encode(`${CACHE_VERSION}|${lang}|${norm}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getCachedReply(question: string, lang: Lang): Promise<string | null> {
  try {
    const id = await keyOf(question, lang);
    const row = await db()
      .prepare("SELECT reply, created_at FROM marco_cache WHERE id = ?")
      .bind(id)
      .first<{ reply: string; created_at: string }>();
    if (!row) return null;
    if (Date.now() - new Date(row.created_at).getTime() > TTL_MS) return null;
    await db().prepare("UPDATE marco_cache SET hits = hits + 1 WHERE id = ?").bind(id).run();
    return row.reply;
  } catch (err) {
    console.error("marco cache read failed", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function storeCachedReply(
  question: string,
  lang: Lang,
  reply: string,
  model: string,
): Promise<void> {
  try {
    const id = await keyOf(question, lang);
    await db()
      .prepare(
        "INSERT INTO marco_cache (id, lang, question, reply, model, hits, created_at) VALUES (?,?,?,?,?,0,?) ON CONFLICT(id) DO UPDATE SET reply = excluded.reply, model = excluded.model, created_at = excluded.created_at",
      )
      .bind(id, lang, question.slice(0, 500), reply.slice(0, 2000), model, new Date().toISOString())
      .run();
  } catch (err) {
    console.error("marco cache write failed", err instanceof Error ? err.message : err);
  }
}
