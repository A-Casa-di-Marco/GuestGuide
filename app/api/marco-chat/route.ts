import { env } from "cloudflare:workers";
import { isLang, type Lang } from "../../../lib/i18n";
import { marcoSystemPrompt, MARCO_UI } from "../../../lib/marco-kb";

export const dynamic = "force-dynamic";

const DEFAULT_MODEL = "openrouter/free";
const TIMEOUT_MS = 20000;

// Throttle leggero anti-abuso (per isolate, come il login host).
const attempts = new Map<string, { n: number; reset: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.reset < now) {
    attempts.set(ip, { n: 1, reset: now + 60_000 });
    return false;
  }
  rec.n++;
  return rec.n > 10;
}

type ChatMsg = { role: "user" | "assistant"; content: string };

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function POST(request: Request) {
  let body: { message?: unknown; lang?: unknown; history?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  const lang: Lang = isLang(body.lang) ? body.lang : "it";
  const history = Array.isArray(body.history)
    ? (body.history as ChatMsg[])
        .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }))
    : [];

  if (!message) {
    return Response.json({ error: "Messaggio vuoto." }, { status: 400 });
  }
  if (throttled(clientIp(request))) {
    return Response.json({ error: MARCO_UI.offline[lang] }, { status: 429 });
  }

  const e = env as unknown as Record<string, string | undefined>;
  const apiKey = e.OPENROUTER_API_KEY || "";
  const model = e.MARCO_MODEL || DEFAULT_MODEL;
  if (!apiKey) {
    return Response.json({ error: MARCO_UI.offline[lang] }, { status: 503 });
  }

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": new URL(request.url).origin,
        "X-Title": "A Casa di Marco - Marco Chat",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          { role: "system", content: marcoSystemPrompt(lang) },
          ...history,
          { role: "user", content: message },
        ],
      }),
    });
    if (!res.ok) {
      return Response.json({ error: MARCO_UI.offline[lang] }, { status: 502 });
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim() || "";
    if (!reply) {
      return Response.json({ error: MARCO_UI.offline[lang] }, { status: 502 });
    }
    return Response.json({ reply }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: MARCO_UI.offline[lang] }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
