import { env } from "cloudflare:workers";
import { isLang, type Lang } from "../../../lib/i18n";
import { marcoSystemPrompt, MARCO_UI } from "../../../lib/marco-kb";
import { isContentQuery, retrieve } from "../../../lib/marco-retrieval";
import { getCachedReply, storeCachedReply } from "../../../lib/marco-cache";

export const dynamic = "force-dynamic";

// Modelli :free in ordine di preferenza (il primo è il default).
// Override con la env MARCO_MODEL (anche lista separata da virgole).
const DEFAULT_MODELS = [
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "minimax/minimax-m3.1-flash:free",
];
const BUDGET_MS = 20000;
const ATTEMPT_MS = 12000;

// Fallback su Cloudflare Workers AI (binding `AI`), indipendente dalla quota OpenRouter.
// I modelli vengono ritirati spesso: si prova la lista e si ricorda il primo che risponde.
const DEFAULT_AI_MODELS = [
  "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/google/gemma-4-26b-a4b-it",
];
const AI_ATTEMPT_MS = 10000;
let aiModelOk = "";

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

function modelList(override?: string): string[] {
  const custom = (override || "").split(",").map((m) => m.trim()).filter(Boolean);
  return custom.length ? custom : DEFAULT_MODELS;
}

/** Scarta risposte vuote o palesemente rotte (es. rifiuti dei modelli content-safety). */
function validReply(text: string): boolean {
  const s = text.trim();
  if (s.length < 12) return false;
  if (/user safety|content[- ]safety|\bmoderation\b/i.test(s)) return false;
  return true;
}

async function askModel(
  model: string,
  apiKey: string,
  origin: string,
  messages: { role: string; content: string }[],
  budgetLeft: number,
): Promise<{ ok: true; reply: string } | { ok: false; status: number }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), Math.min(budgetLeft, ATTEMPT_MS));
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": origin,
        "X-Title": "A Casa di Marco - Marco Chat",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 400,
        messages,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("marco-chat openrouter", res.status, model, detail.slice(0, 200));
      return { ok: false, status: res.status };
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim() || "";
    if (!validReply(reply)) {
      console.error("marco-chat risposta scartata", model, JSON.stringify(reply.slice(0, 120)));
      return { ok: false, status: 502 };
    }
    return { ok: true, reply };
  } catch (err) {
    console.error("marco-chat fetch failed", model, err instanceof Error ? err.message : err);
    return { ok: false, status: 502 };
  } finally {
    clearTimeout(timer);
  }
}

type AiBinding = { run: (model: string, input: unknown) => Promise<unknown> };

async function askWorkersAi(
  ai: AiBinding,
  model: string,
  messages: { role: string; content: string }[],
): Promise<string | null> {
  try {
    const run = ai.run(model, {
      messages,
      max_tokens: 400,
      temperature: 0.3,
    }) as Promise<{ response?: string }>;
    const out = await Promise.race([
      run,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`timeout ${AI_ATTEMPT_MS}ms`)), AI_ATTEMPT_MS),
      ),
    ]);
    const reply = (out?.response || "").trim();
    if (!validReply(reply)) {
      console.error("marco-chat workers-ai risposta scartata", model, JSON.stringify(reply.slice(0, 120)));
      return null;
    }
    return reply;
  } catch (err) {
    console.error("marco-chat workers-ai failed", model, err instanceof Error ? err.message : err);
    return null;
  }
}

const noStore = (extra?: Record<string, string>) => ({
  "Cache-Control": "no-store",
  ...extra,
});

export async function POST(request: Request) {
  let body: { message?: unknown; lang?: unknown; history?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: MARCO_UI.badRequest.it }, { status: 400 });
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
    return Response.json({ error: MARCO_UI.badRequest[lang] }, { status: 400 });
  }
  if (throttled(clientIp(request))) {
    return Response.json({ error: MARCO_UI.busy[lang] }, { status: 429 });
  }
  if (!isContentQuery(message)) {
    return Response.json(
      { reply: MARCO_UI.greeting[lang] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  // Risposta già in cache: nessuna chiamata al modello.
  const cached = await getCachedReply(message, lang);
  if (cached) {
    return Response.json(
      { reply: cached },
      { headers: { "Cache-Control": "no-store", "X-Marco-Cache": "hit" } },
    );
  }

  const e = env as unknown as Record<string, string | undefined>;
  const ai = (env as unknown as { AI?: AiBinding }).AI;
  const apiKey = e.OPENROUTER_API_KEY || "";

  // RAG simulata: solo i brani pertinenti entrano nel prompt.
  const chunks = retrieve(message, lang);
  if (chunks.length === 0) {
    return Response.json(
      { reply: MARCO_UI.unknown[lang] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
  if (!apiKey && !ai) {
    return Response.json({ error: MARCO_UI.offline[lang] }, { status: 503 });
  }

  const context = chunks.map((c) => `- ${c.text}`).join("\n");
  const messages = [
    { role: "system", content: marcoSystemPrompt(lang, context) },
    ...history,
    { role: "user", content: message },
  ];

  const origin = new URL(request.url).origin;
  let sawRateLimit = false;
  const deadline = Date.now() + BUDGET_MS;

  if (apiKey) {
    for (const model of modelList(e.MARCO_MODEL)) {
      const left = deadline - Date.now();
      if (left < 3000) break;
      const out = await askModel(model, apiKey, origin, messages, left);
      if (out.ok) {
        await storeCachedReply(message, lang, out.reply, model);
        return Response.json(
          { reply: out.reply },
          { headers: noStore({ "X-Marco-Cache": "miss", "X-Marco-Model": model }) },
        );
      }
      // La quota dei modelli :free è per account: inutile provare gli altri.
      if (out.status === 429) {
        sawRateLimit = true;
        break;
      }
    }
  }

  if (ai) {
    const override = (e.MARCO_AI_MODEL || "").trim();
    const candidates = override ? [override] : aiModelOk ? [aiModelOk] : DEFAULT_AI_MODELS;
    for (const aiModel of candidates) {
      const reply = await askWorkersAi(ai, aiModel, messages);
      if (reply) {
        aiModelOk = aiModel;
        await storeCachedReply(message, lang, reply, `workers-ai:${aiModel}`);
        return Response.json(
          { reply },
          { headers: noStore({ "X-Marco-Cache": "miss-ai", "X-Marco-Model": `workers-ai:${aiModel}` }) },
        );
      }
      if (override) break;
    }
  }

  return Response.json(
    { error: sawRateLimit ? MARCO_UI.busy[lang] : MARCO_UI.trouble[lang] },
    { status: 502 },
  );
}
