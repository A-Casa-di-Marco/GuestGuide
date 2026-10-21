// Verifica il retriever di Marco su domande reali in 5 lingue.
// Uso: node scripts/test-retrieval.mjs
// Fallisce (exit 1) se una domanda non trova contesto o non trova la voce attesa.

import { readFileSync } from "node:fs";
import { retrieveFrom } from "../lib/marco-retrieval-core.mjs";

const kb = JSON.parse(readFileSync("lib/kb/guide-kb.json", "utf8")).entries;

const CASES = [
  ["Dove si parcheggia?", "it", ["parcheggio", "regola-rules-arrival-5", "self-percorso", "trasporti"]],
  ["C'è un parcheggio gratuito?", "it", ["parcheggio"]],
  ["Where can I park?", "en", ["parcheggio"]],
  ["¿Dónde puedo aparcar?", "es", ["parcheggio"]],
  ["Wo kann ich parken?", "de", ["parcheggio"]],
  ["Où puis-je garer la voiture ?", "fr", ["parcheggio"]],
  ["Qual è la password del wifi?", "it", ["wifi"]],
  ["A che ora è il check-out?", "it", ["checkout-orario", "regola-rules-arrival"]],
  ["A che ora è il check-in?", "it", ["checkin", "regola-rules-arrival"]],
  ["Posso fumare in casa?", "it", ["regola-rules-people"]],
  ["Dove butto la spazzatura?", "it", ["rifiuti"]],
  ["Come funziona la lavatrice?", "it", ["manuale-manual-7", "manuale"]],
  ["Come si usa la moka?", "it", ["moka", "manuale"]],
  ["Dove posso mangiare una pizza?", "it", ["food-pizza"]],
  ["Che ristoranti ci sono vicino?", "it", ["food-"]],
  ["Dove posso fare colazione?", "it", ["colazione"]],
  ["Dove si compra il pane?", "it", ["spesa"]],
  ["C'è una farmacia aperta?", "it", ["farmacie"]],
  ["Quanto costa il traghetto?", "it", ["trasporti"]],
  ["Cosa posso visitare a Salerno?", "it", ["luoghi", "luogo-"]],
  ["Dove trovo le spiagge?", "it", ["spiagge"]],
  ["Ho perso le chiavi", "it", ["chiavi"]],
  ["Come si accende il condizionatore?", "it", ["clima", "manuale"]],
  ["What time is check-in?", "en", ["checkin", "regola-rules-arrival"]],
  ["Wo kann ich essen?", "de", ["food-", "mangiare"]],
  ["Où est la plage ?", "fr", ["spiagge", "luoghi"]],
  ["¿Dónde puedo comer?", "es", ["food-", "mangiare"]],
];

let failed = 0;
for (const [query, lang, expected] of CASES) {
  const res = retrieveFrom(kb, query, lang);
  const ids = res.map((r) => r.id);
  const ok = res.length > 0 && expected.some((e) => ids.some((id) => id.includes(e)));
  if (!ok) {
    failed++;
    console.error(`FAIL [${lang}] "${query}" -> [${ids.join(", ") || "vuoto"}] (atteso: ${expected.join(", ")})`);
  } else {
    console.log(`ok   [${lang}] "${query}" -> ${ids.slice(0, 2).join(", ")}`);
  }
}

// Le domande senza contenuto non devono pescare nulla a caso.
for (const q of ["ciao", "grazie mille", "hello", "buongiorno"]) {
  if (retrieveFrom(kb, q, "it").length > 0) {
    failed++;
    console.error(`FAIL saluto "${q}" ha trovato contesto`);
  }
}

console.log(`\n${CASES.length - failed}/${CASES.length} casi ok, KB ${kb.length} voci`);
if (failed) process.exit(1);
