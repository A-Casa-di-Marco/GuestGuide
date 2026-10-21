// Smoke test della chat Marco contro un'istanza deployata.
// Uso: node scripts/smoke-marco.mjs [baseUrl]
// Default: produzione. Passa --fast per non aspettare tra le richieste (rischio 429).
// Nota: /api/marco-chat accetta max ~10 richieste/minuto per IP.

import { setDefaultResultOrder } from "node:dns";
import { setDefaultAutoSelectFamily } from "node:net";

// Alcune reti hanno un percorso IPv6 rotto verso Cloudflare (404/timeout): forza IPv4
// e disattiva Happy Eyeballs, che altrimenti continua a scegliere IPv6.
setDefaultResultOrder("ipv4first");
setDefaultAutoSelectFamily(false);

const BASE = process.argv.find((a) => a.startsWith("http")) || "https://a-casa-di-maro.casa-di-marco.workers.dev";
const FAST = process.argv.includes("--fast");
const GAP_MS = FAST ? 500 : 7000;

const CASES = [
  ["Dove si parcheggia?", "it"],
  ["Qual è la password del wifi?", "it"],
  ["A che ora è il check-out?", "it"],
  ["Dove posso mangiare una pizza?", "it"],
  ["Come funziona la lavatrice?", "it"],
  ["Dove butto la spazzatura?", "it"],
  ["What time is check-in?", "en"],
  ["Wo kann ich parken?", "de"],
  ["Où est la plage ?", "fr"],
  ["¿Dónde puedo comer?", "es"],
];

const BAD = [
  "non trovo questa informazione",
  "can't find this information",
  "no encuentro esta información",
  "je ne trouve pas cette information",
  "diese information finde ich nicht",
  "non è disponibile al momento",
  "is unavailable right now",
  "no está disponible ahora mismo",
  "est indisponible",
  "nicht verfügbar",
  "user safety",
  "content safety",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ask(message, lang) {
  let lastErr;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await fetch(`${BASE}/api/marco-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, lang }),
        signal: AbortSignal.timeout(30000),
      });
    } catch (err) {
      lastErr = err;
      await sleep(1500);
    }
  }
  throw lastErr;
}

let failed = 0;
for (const [message, lang] of CASES) {
  try {
    const res = await ask(message, lang);
    const data = await res.json().catch(() => ({}));
    const reply = (data.reply || "").trim();
    const cache = res.headers.get("x-marco-cache") || "-";
    const low = (reply || data.error || "").toLowerCase();
    const bad = BAD.some((b) => low.includes(b));
    if (!res.ok || !reply || bad) {
      failed++;
      const hint = res.status === 404 ? ` [${res.url}]` : "";
      console.error(`FAIL [${lang}] "${message}" http=${res.status} cache=${cache}${hint} -> ${(reply || data.error || "").slice(0, 120)}`);
    } else {
      console.log(`ok   [${lang}] "${message}" http=${res.status} cache=${cache} -> ${reply.slice(0, 70).replace(/\s+/g, " ")}…`);
    }
  } catch (err) {
    failed++;
    console.error(`FAIL [${lang}] "${message}" network: ${err instanceof Error ? err.message : err}`);
  }
  await sleep(GAP_MS);
}

console.log(`\n${CASES.length - failed}/${CASES.length} ok su ${BASE}`);
if (failed) process.exit(1);
