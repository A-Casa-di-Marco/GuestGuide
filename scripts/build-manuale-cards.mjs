// Genera card del manuale + descrizioni hub (verbatim x5 lingue).
// Uso: node scripts/build-manuale-cards.mjs
// Fonti: public/manuale.html (11 sezioni) + primi paragrafi delle 10 pagine.
import { readFileSync, writeFileSync } from "node:fs";

const LANGS = ["it", "en", "es", "fr", "de"];

function unescape(s) {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}
function dataAttrs(tagText) {
  const out = {};
  const re = /\sdata-(it|en|es|fr|de)(-html)?="([^"]*)"/g;
  let m;
  while ((m = re.exec(tagText)) !== null) out[`${m[1]}${m[2] || ""}`] = unescape(m[3]);
  return out;
}
function readOpenTag(html, from) {
  let i = from + 1, quote = null;
  while (i < html.length) {
    const c = html[i];
    if (quote) { if (c === quote) quote = null; }
    else if (c === '"' || c === "'") quote = c;
    else if (c === ">") return html.slice(from, i + 1);
    i++;
  }
  return null;
}
function resolveLang(block, lang) {
  const els = [];
  const seen = new Set();
  const re = /\sdata-(it|en|es|fr|de)(-html)?="/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    const tagStart = block.lastIndexOf("<", m.index);
    if (seen.has(tagStart)) continue;
    seen.add(tagStart);
    const tagText = readOpenTag(block, tagStart);
    if (!tagText) continue;
    const tagName = (tagText.match(/^<([a-z0-9]+)/i) || [])[1] || "?";
    const tagEnd = tagStart + tagText.length;
    const closeTag = `</${tagName}>`;
    const closeIdx = block.indexOf(closeTag, tagEnd);
    els.push({ tagStart, tagText, tagEnd, innerEnd: closeIdx === -1 ? tagEnd : closeIdx, closeLen: closeIdx === -1 ? 0 : closeTag.length, vals: dataAttrs(tagText) });
  }
  const nested = els.filter((e) => /\sdata-(it|en|es|fr|de)(-html)?="/.test(block.slice(e.tagEnd, e.innerEnd)));
  if (nested.length) throw new Error(`nidificati: ${nested.length}`);
  let html = block;
  for (const e of [...els].sort((a, b) => b.tagStart - a.tagStart)) {
    const isHtml = e.vals["it-html"] !== undefined;
    const val = e.vals[`${lang}${isHtml ? "-html" : ""}`] ?? e.vals[isHtml ? "it-html" : "it"] ?? "";
    const newTag = e.tagText.replace(/\sdata-(it|en|es|fr|de)(-html)?="[^"]*"/g, "");
    html = html.slice(0, e.tagStart) + newTag + val + html.slice(e.innerEnd, e.innerEnd + e.closeLen) + html.slice(e.innerEnd + e.closeLen);
  }
  return html;
}
function rewriteUrls(html, lang) {
  const routes = { "index.html": "/", "checkin.html": "/check-in", "check-in-out.html": "/check-out", "manuale.html": "/permanenza/manuale", "regole.html": "/permanenza/regole", "luoghi.html": "/permanenza/luoghi", "mangiare.html": "/permanenza/mangiare", "trasporti.html": "/permanenza/trasporti", "spesa.html": "/permanenza/spesa", "parcheggio.html": "/permanenza/parcheggio", "itinerario.html": "/permanenza/itinerario", "colazione.html": "/permanenza/colazione", "farmacie-emergenze.html": "/permanenza/farmacie-emergenze" };
  html = html.replace(/(src|href)="assets\//g, '$1="/assets/');
  return html.replace(/href="([^"#?]*\.html)(#[^"]*)?"/g, (full, page, hash) => {
    const route = routes[page];
    if (!route) return full;
    if (page === "checkin.html" && hash === "#checkout") return `href="/check-out?lang=${lang}"`;
    if (page === "checkin.html" && hash === "#checkin") return `href="/check-in?lang=${lang}"`;
    return `href="${route}?lang=${lang}${hash || ""}"`;
  });
}

const ICONS = { "manual-0": "KeyRound", wifi: "Wifi", rifiuti: "Recycle", clima: "Thermometer", "manual-4": "Umbrella", moka: "Coffee", "manual-6": "CookingPot", "manual-7": "WashingMachine", "manual-8": "ShowerHead", "manual-9": "UtensilsCrossed", "manual-10": "LifeBuoy" };
const IMAGES = { "manual-0": "assets/manuale-chiavi.jpg", clima: "assets/manuale-termostato.jpg", "manual-4": "assets/manuale-ombrellone.png", moka: "assets/manuale-moka.jpg", "manual-7": "assets/manuale-lavatrice-comandi.jpg", "manual-9": "assets/manuale-lavastoviglie-cassetto.jpg" };
const TAGS = {
  "manual-0": { it: "Chiavi", en: "Keys", es: "Llaves", fr: "Clés", de: "Schlüssel" },
  wifi: { it: "Wi-Fi", en: "Wi-Fi", es: "Wi-Fi", fr: "Wi-Fi", de: "WLAN" },
  rifiuti: { it: "Differenziata", en: "Waste sorting", es: "Recogida selectiva", fr: "Tri sélectif", de: "Mülltrennung" },
  clima: { it: "Clima", en: "Climate", es: "Clima", fr: "Climat", de: "Klima" },
  "manual-4": { it: "Ombrellone", en: "Umbrella", es: "Sombrilla", fr: "Parasol", de: "Sonnenschirm" },
  moka: { it: "Moka", en: "Moka", es: "Moka", fr: "Moka", de: "Moka" },
  "manual-6": { it: "Cucina", en: "Kitchen", es: "Cocina", fr: "Cuisine", de: "Küche" },
  "manual-7": { it: "Lavatrice", en: "Washing machine", es: "Lavadora", fr: "Lave-linge", de: "Waschmaschine" },
  "manual-8": { it: "Doccia", en: "Shower", es: "Ducha", fr: "Douche", de: "Dusche" },
  "manual-9": { it: "Lavastoviglie", en: "Dishwasher", es: "Lavavajillas", fr: "Lave-vaisselle", de: "Geschirrspüler" },
  "manual-10": { it: "Aiuto", en: "Help", es: "Ayuda", fr: "Aide", de: "Hilfe" },
};

// ---------- MANUALE CARDS ----------
{
  const h = readFileSync("public/manuale.html", "utf8");
  const cards = [];
  let i = 0;
  for (const m of h.matchAll(/<details class="manual-details" id="([^"]+)">([\s\S]*?)<\/details>/g)) {
    i++;
    const sid = m[1];
    const summaryOpen = m[0].match(/<summary[^>]*>/)[0];
    const summaryVals = dataAttrs(summaryOpen);
    const content = m[0].slice(m[0].indexOf('<div class="manual-content">'));
    const per = {};
    for (const lang of LANGS) {
      let html = resolveLang(content, lang);
      html = html.replace(/<script[\s\S]*?<\/script>/g, "");
      html = rewriteUrls(html, lang);
      if (/\sdata-(it|en|es|fr|de)(-html)?="/.test(html)) throw new Error(`manuale ${sid}/${lang}: residui`);
      per[lang] = html.trim();
    }
    const title = {};
    for (const lang of LANGS) title[lang] = summaryVals[lang] ?? summaryVals.it ?? "";
    cards.push({ id: sid, index: String(i).padStart(3, "0"), icon: ICONS[sid] || "Info", image: IMAGES[sid] || null, tag: TAGS[sid], title, body: per });
  }
  writeFileSync(
    "lib/legacy/manuale-cards.generated.ts",
    `// AUTO-GENERATO da scripts/build-manuale-cards.mjs — non modificare a mano.\n// Fonte: public/manuale.html (11 sezioni, verbatim x5 lingue).\nimport type { Lang } from "@/lib/i18n";\n\nexport type ManualeCard = { id: string; index: string; icon: string; image: string | null; tag: Record<Lang, string>; title: Record<Lang, string>; body: Record<Lang, string> };\n\nexport const manualeCards: ManualeCard[] = ${JSON.stringify(cards)};\n`,
  );
  console.log(`manuale-cards: ${cards.length} card`);
}

// ---------- HUB DESCRIPTIONS ----------
{
  const slugs = ["manuale", "regole", "luoghi", "mangiare", "trasporti", "spesa", "parcheggio", "itinerario", "colazione", "farmacie-emergenze"];
  const out = {};
  for (const slug of slugs) {
    const src = readFileSync(`public/${slug}.html`, "utf8");
    const main = src.slice(src.indexOf("<main>") + 6, src.indexOf("</main>"));
    let picked = null;
    for (const m of main.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/g)) {
      if (!/data-it/.test(m[1] || "")) continue;
      const before = main.slice(Math.max(0, m.index - 500), m.index);
      if (/guest-snacks|order-status|orderFormArea/.test(before)) continue;
      picked = m[1];
      break;
    }
    if (!picked) throw new Error(slug + ": nessun paragrafo");
    const vals = dataAttrs(picked);
    out[slug] = Object.fromEntries(LANGS.map((l) => [l, vals[l] ?? vals.it ?? ""]));
    console.log(`${slug}: ${(out[slug].it || "").slice(0, 70)}`);
  }
  writeFileSync(
    "lib/legacy/hub-desc.generated.ts",
    `// AUTO-GENERATO da scripts/build-manuale-cards.mjs — non modificare a mano.\n// Primi paragrafi verbatim delle 10 pagine.\nimport type { Lang } from "@/lib/i18n";\n\nexport const hubDesc: Record<string, Record<Lang, string>> = ${JSON.stringify(out)};\n`,
  );
}
console.log("done -> lib/legacy/manuale-cards.generated.ts + hub-desc.generated.ts");
