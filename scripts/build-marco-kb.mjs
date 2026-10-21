// Genera lib/kb/guide-kb.json da fonti verificate (guide verbatim) + voci curate.
// Uso: node scripts/build-marco-kb.mjs   (richiede Node >= 22.18 per il type stripping)
// Rigenerare dopo ogni modifica ai contenuti, poi incrementare CACHE_VERSION in lib/marco-cache.ts.

import { readFileSync, writeFileSync } from "node:fs";
import { curated } from "../lib/kb/curated.mjs";

const LANGS = ["it", "en", "es", "fr", "de"];
const MAX_TEXT = 300;
const OUT = "lib/kb/guide-kb.json";

const ENTITIES = {
  "&nbsp;": " ", "&amp;": "&", "&quot;": '"', "&#39;": "'", "&apos;": "'",
  "&agrave;": "à", "&egrave;": "è", "&eacute;": "é", "&igrave;": "ì",
  "&ograve;": "ò", "&ugrave;": "ù", "&rsquo;": "’", "&lsquo;": "‘",
  "&ldquo;": "“", "&rdquo;": "”", "&ndash;": "–", "&mdash;": "—", "&hellip;": "…",
};

function stripHtml(html) {
  let out = String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|article|section|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  for (const [k, v] of Object.entries(ENTITIES)) out = out.split(k).join(v);
  return out
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function clip(text, max = MAX_TEXT) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).trim() + "…";
}

function words(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3);
}

function tagsOf(...parts) {
  return [...new Set(parts.flatMap(words))].slice(0, 18);
}

function chunk(text, max = 420) {
  const blocks = text.split(/\n+/).map((b) => b.trim()).filter(Boolean);
  const out = [];
  let cur = "";
  for (const b of blocks) {
    if ((cur + " " + b).trim().length > max && cur) {
      out.push(cur.trim());
      cur = b;
    } else {
      cur = (cur + " " + b).trim();
    }
  }
  if (cur) out.push(cur.trim());
  return out;
}

const entries = [];
const seen = new Set();
function add(e) {
  if (!e || seen.has(e.id) || !e.it) return;
  seen.add(e.id);
  entries.push(e);
}

// ---------------------------------------------------------------- fonti
const luoghi = await import("../lib/legacy/luoghi-data.generated.ts");
const mangiare = await import("../lib/legacy/mangiare-data.generated.ts");
const regole = await import("../lib/legacy/regole-cards.generated.ts");
const manuale = await import("../lib/legacy/manuale-cards.generated.ts");
const pagine = {};
for (const slug of ["spesa", "trasporti", "parcheggio", "farmacie-emergenze", "colazione"]) {
  pagine[slug] = await import(`../lib/legacy/${slug}.generated.ts`);
}

// 1) voci curate a mano (priorità massima, includono i dati sensibili)
for (const e of curated) add({ ...e, source: "curated" });

// 2) luoghi: una voce per posto
const GENERIC_LUOGHI = {
  it: "visitare vedere cosa fare gita escursione posto luoghi",
  en: "visit see things to do trip excursion place places",
  es: "visitar ver qué hacer excursión lugar lugares",
  fr: "visiter voir quoi faire excursion lieu lieux",
  de: "besuchen sehen unternehmen ausflug ort orte",
};
const BEACH_TAGS = "spiaggia strand plage playa beach spiagge strande plages playas";
for (const cat of luoghi.placeCategories) {
  cat.places.forEach((p, i) => {
    const body = {};
    for (const l of LANGS) body[l] = `${p.title[l]} — ${cat.title[l]}: ${clip(p.desc[l])}`;
    add({
      id: `luogo-${cat.id}-${i + 1}`,
      cat: "luoghi",
      it: body.it,
      en: body.en,
      es: body.es,
      fr: body.fr,
      de: body.de,
      tags_it: tagsOf(p.title.it, cat.title.it, GENERIC_LUOGHI.it, p.beachType === "free" ? "spiaggia gratis" : ""),
      tags_en: tagsOf(p.title.en, cat.title.en, GENERIC_LUOGHI.en, p.beachType === "free" ? "free beach" : ""),
      tags_all: tagsOf(
        GENERIC_LUOGHI.es, GENERIC_LUOGHI.fr, GENERIC_LUOGHI.de,
        p.title.es, p.title.fr, p.title.de,
        cat.title.es, cat.title.fr, cat.title.de,
        cat.id === "spiagge" ? BEACH_TAGS : "",
      ),
      source: "luoghi",
    });
  });
}

// 3) mangiare: una voce per locale
const GENERIC_FOOD = {
  it: "mangiare dove mangiare ristorante ristoranti pizzeria cena pranzo cibo locale culinaria",
  en: "eat where to eat restaurant restaurants pizzeria dinner lunch food",
  es: "comer dónde comer restaurante restaurantes cena comida",
  fr: "manger où manger restaurant restaurants dîner repas",
  de: "essen wo essen restaurant restaurants abendessen mittagessen",
};
for (const [key, cat] of Object.entries(mangiare.categories)) {
  cat.restaurants.forEach((r, i) => {
    const extra = { it: r.walkable ? "Raggiungibile a piedi." : "", en: r.walkable ? "Within walking distance." : "" };
    const body = {};
    for (const l of LANGS) {
      const tip = r.tip && r.tip[l] ? ` ${r.tip[l]}` : l === "it" || l === "en" ? ` ${extra[l]}` : "";
      body[l] = `${r.name[l]} (${cat.title[l]}${r.price ? `, ${r.price}` : ""}): ${clip(r.desc[l], 200)}${clip(tip, 90)}`;
    }
    add({
      id: `food-${key}-${i + 1}`,
      cat: "mangiare",
      it: body.it,
      en: body.en,
      es: body.es,
      fr: body.fr,
      de: body.de,
      tags_it: tagsOf(r.name.it, cat.title.it, GENERIC_FOOD.it, key),
      tags_en: tagsOf(r.name.en, cat.title.en, GENERIC_FOOD.en, key),
      tags_all: tagsOf(GENERIC_FOOD.es, GENERIC_FOOD.fr, GENERIC_FOOD.de, r.name.es, r.name.fr, r.name.de, cat.title.es, cat.title.fr, cat.title.de),
      source: "mangiare",
    });
  });
}

// 4) regole: una voce per singola regola
const GENERIC_RULES = {
  it: "regola regole regolamento orario orari divieto permesso",
  en: "rule rules regulations schedule allowed forbidden",
  es: "norma normas reglamento horario prohibido permitido",
  fr: "règle règles règlement horaire interdit permis",
  de: "regel regeln hausordnung zeit erlaubt verboten",
};
for (const card of regole.regoleCards) {
  const rows = [...String(card.body.it || "").matchAll(/<article class="rule-row">([\s\S]*?)<\/article>/g)];
  rows.forEach((m, i) => {
    const h4 = (m[1].match(/<h4>([\s\S]*?)<\/h4>/) || [])[1] || "";
    const p = stripHtml((m[1].match(/<p>([\s\S]*?)<\/p>/) || [])[1] || "");
    const title = stripHtml(h4);
    const body = {};
    for (const l of LANGS) {
      const otherRows = [...String(card.body[l] || "").matchAll(/<article class="rule-row">([\s\S]*?)<\/article>/g)];
      const raw = otherRows[i] ? otherRows[i][1] : "";
      const h = stripHtml((raw.match(/<h4>([\s\S]*?)<\/h4>/) || [])[1] || title);
      const t = stripHtml((raw.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || p);
      body[l] = `${h}: ${clip(t, 260)}`;
    }
    add({
      id: `regola-${card.id}-${i + 1}`,
      cat: "regole",
      it: body.it,
      en: body.en,
      es: body.es,
      fr: body.fr,
      de: body.de,
      tags_it: tagsOf(title, card.title.it, card.tag.it, GENERIC_RULES.it),
      tags_en: tagsOf(card.title.en, card.tag.en, GENERIC_RULES.en),
      tags_all: tagsOf(card.title.es, card.title.fr, card.title.de, GENERIC_RULES.es, GENERIC_RULES.fr, GENERIC_RULES.de),
      source: "regole",
    });
  });
}

// 5) manuale: massimo 2 brani per card
const GENERIC_MANUAL = {
  it: "manuale istruzioni come funziona come si usa usare elettrodomestico casa",
  en: "manual instructions how to use house appliance",
  es: "manual instrucciones cómo usar casa aparato",
  fr: "manuel instructions comment utiliser maison appareil",
  de: "handbuch anleitung bedienung wie benutzen haus gerät",
};
for (const card of manuale.manualeCards) {
  const chunks = chunk(stripHtml(card.body.it), 420).slice(0, 2);
  chunks.forEach((_, i) => {
    const body = {};
    for (const l of LANGS) {
      const chunksL = chunk(stripHtml(card.body[l]), 420);
      body[l] = clip(chunksL[i] || chunksL[0] || "", 400);
    }
    add({
      id: `manuale-${card.id}-${i + 1}`,
      cat: "manuale",
      it: body.it,
      en: body.en,
      es: body.es,
      fr: body.fr,
      de: body.de,
      tags_it: tagsOf(card.title.it, card.tag.it, GENERIC_MANUAL.it),
      tags_en: tagsOf(card.title.en, card.tag.en, GENERIC_MANUAL.en),
      tags_all: tagsOf(card.title.es, card.title.fr, card.title.de, GENERIC_MANUAL.es, GENERIC_MANUAL.fr, GENERIC_MANUAL.de),
      source: "manuale",
    });
  });
}

// 6) pagine testuali: fino a 3 brani per pagina
const GENERIC_PAGES = {
  it: "guida informazioni casa ospiti",
  en: "guide information house guests",
  es: "guía información casa huéspedes",
  fr: "guide informations maison invités",
  de: "guide informationen haus gäste",
};
const EXTRA_TAGS_ALL = {
  parcheggio: "parken parkplatz parkt parking aparcar aparcamiento estacionamiento garer stationner",
  trasporti: "transport transporte transportes fahre ferry traghetto bus taxi orari fahrplan horaires horarios",
  spesa: "supermarkt supermercato supermarket einkaufen comprar courses kaufen",
  "farmacie-emergenze": "farmacia pharmacy pharmacie apotheke arzt doctor medico urgence notfall emergencia",
  colazione: "fruhstuck fruhstuck breakfast colazione petit dejeuner desayuno",
};
for (const [slug, mod] of Object.entries(pagine)) {
  const chunks = chunk(stripHtml(mod.html.it), 460).slice(0, 3);
  chunks.forEach((_, i) => {
    const body = {};
    for (const l of LANGS) {
      const chunksL = chunk(stripHtml(mod.html[l]), 460);
      body[l] = clip(chunksL[i] || chunksL[0] || "", 440);
    }
    add({
      id: `pagina-${slug}-${i + 1}`,
      cat: "servizi",
      it: body.it,
      en: body.en,
      es: body.es,
      fr: body.fr,
      de: body.de,
      tags_it: tagsOf(mod.title.it, GENERIC_PAGES.it, slug),
      tags_en: tagsOf(mod.title.en, GENERIC_PAGES.en, slug),
      tags_all: tagsOf(
        mod.title.es, mod.title.fr, mod.title.de,
        GENERIC_PAGES.es, GENERIC_PAGES.fr, GENERIC_PAGES.de,
        EXTRA_TAGS_ALL[slug] || "",
      ),
      source: "pagine",
    });
  });
}

// ---------------------------------------------------------------- output
const out = { version: 2, entries };
writeFileSync(OUT, JSON.stringify(out) + "\n");

const bySource = {};
for (const e of entries) bySource[e.source] = (bySource[e.source] || 0) + 1;
const bytes = readFileSync(OUT).length;
const empty = entries.filter((e) => !e.it || e.it.length < 20);
console.log(`KB: ${entries.length} voci, ${Math.round(bytes / 1024)} KB`);
console.log("per fonte:", JSON.stringify(bySource));
if (empty.length) console.warn("ATTENZIONE voci troppo corte:", empty.map((e) => e.id).join(", "));
