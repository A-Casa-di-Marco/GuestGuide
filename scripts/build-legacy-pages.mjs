// Estrae le pagine legacy statiche in HTML risolto per-lingua (verbatim).
// Uso: node scripts/build-legacy-pages.mjs
// Output: lib/legacy/<slug>.generated.ts con { title, html } x5 lingue.
// Le pagine JS-rendered (luoghi, mangiare) e il planner (itinerario) sono
// portati nativamente e NON passano da qui (vedi docs/04-CONTENUTI.md).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const LANGS = ["it", "en", "es", "fr", "de"];
const SLUGS = ["manuale", "regole", "trasporti", "spesa", "parcheggio", "farmacie-emergenze", "colazione", "luoghi", "mangiare", "itinerario"];
// regioni dinamiche rese da isole React (il resto del <main> è chrome verbatim)
const STRIP_IDS = {
  colazione: ["orderFormArea"],
  luoghi: ["place-choice-grid", "places-container"],
  mangiare: ["food-category"],
};
const STRIP_CLASSES = ["scroll-hint", "back-home"];
const STRIP_CLASSES_PER_SLUG = {
  mangiare: ["food-choice-grid"],
  regole: ["rules-group", "rules-index"],
};

// slug legacy -> rotta Next (query ?lang= aggiunta in coda)
const ROUTES = {
  "index.html": "/",
  "checkin.html": "/check-in",
  "check-in-out.html": "/check-out",
  "manuale.html": "/permanenza/manuale",
  "regole.html": "/permanenza/regole",
  "luoghi.html": "/permanenza/luoghi",
  "mangiare.html": "/permanenza/mangiare",
  "trasporti.html": "/permanenza/trasporti",
  "spesa.html": "/permanenza/spesa",
  "parcheggio.html": "/permanenza/parcheggio",
  "itinerario.html": "/permanenza/itinerario",
  "colazione.html": "/permanenza/colazione",
  "farmacie-emergenze.html": "/permanenza/farmacie-emergenze",
};

function unescapeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function readOpenTag(html, from) {
  let i = from + 1;
  let quote = null;
  while (i < html.length) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === ">") {
      return html.slice(from, i + 1);
    }
    i++;
  }
  return null;
}

// Raccoglie gli elementi con data-* : {tag,startTag,tagEnd,innerStart,innerEnd,isHtml,vals}
function collectDataElements(html) {
  const els = [];
  const seen = new Set();
  const re = /\sdata-(it|en|es|fr|de)(-html)?="/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const attrStart = m.index;
    const tagStart = html.lastIndexOf("<", attrStart);
    if (seen.has(tagStart)) continue; // un elemento con N lingue = una sola voce
    seen.add(tagStart);
    const tagText = readOpenTag(html, tagStart);
    if (!tagText) continue;
    const tagName = (tagText.match(/^<([a-z0-9]+)/i) || [])[1] || "?";
    const tagEnd = tagStart + tagText.length;
    // attributi data-* del tag
    const vals = {};
    const are = /\sdata-(it|en|es|fr|de)(-html)?="([^"]*)"/g;
    let am;
    while ((am = are.exec(tagText)) !== null) {
      vals[`${am[1]}${am[2] || ""}`] = unescapeEntities(am[3]);
    }
    const isHtml = vals["it-html"] !== undefined;
    const closeTag = `</${tagName}>`;
    const closeIdx = html.indexOf(closeTag, tagEnd);
    els.push({
      tagName, tagStart, tagEnd, tagText,
      innerStart: tagEnd,
      innerEnd: closeIdx === -1 ? tagEnd : closeIdx,
      closeLen: closeIdx === -1 ? 0 : closeTag.length,
      isHtml, vals, void: closeIdx === -1,
    });
  }
  return els;
}

function stripDataAttrs(tagText) {
  return tagText.replace(/\sdata-(it|en|es|fr|de)(-html)?="[^"]*"/g, "");
}

function rewriteUrls(html, lang) {
  // asset relativi -> assoluti
  html = html.replace(/(src|href)="assets\//g, '$1="/assets/');
  // link interni legacy -> rotte Next con ?lang=
  html = html.replace(/href="([^"#?]*\.html)(#[^"]*)?"/g, (full, page, hash) => {
    const route = ROUTES[page];
    if (!route) return full;
    if (page === "checkin.html" && hash === "#checkout") return `href="/check-out?lang=${lang}"`;
    if (page === "checkin.html" && hash === "#checkin") return `href="/check-in?lang=${lang}"`;
    return `href="${route}?lang=${lang}${hash || ""}"`;
  });
  return html;
}

function removeById(html, id) {
  // rimozione bilanciata dell'elemento con id dato (gestisce nidificazione)
  const openRe = new RegExp(`<([a-z0-9]+)[^>]*\\bid="${id}"[^>]*>`, "");
  const m = openRe.exec(html);
  if (!m) return html;
  const tag = m[1];
  const start = m.index;
  const tagRe = new RegExp(`</?${tag}(?=[\\s>])[^>]*>`, "g");
  tagRe.lastIndex = start + m[0].length;
  let depth = 1, t;
  while ((t = tagRe.exec(html)) !== null) {
    if (t[0].startsWith("</")) depth--;
    else if (!t[0].endsWith("/>")) depth++;
    if (depth === 0) return html.slice(0, start) + html.slice(t.index + t[0].length);
  }
  return html;
}

function removeByClass(html, cls) {
  // rimuove l'intero elemento <tag ... class="... cls ...">...</tag> (non nidificato su sé stesso)
  const re = new RegExp(`<([a-z0-9]+)[^>]*class="[^"]*\\b${cls}\\b[^"]*"[^>]*>[\\s\\S]*?<\\/\\1>`, "g");
  return html.replace(re, "");
}

mkdirSync("lib/legacy", { recursive: true });

for (const slug of SLUGS) {
  const file = `public/${slug}.html`;
  const src = readFileSync(file, "utf8");

  // titolo: primo h1 del file
  const h1tag = src.match(/<h1[^>]*>/)?.[0] || "";
  const titleVals = {};
  {
    const are = /\sdata-(it|en|es|fr|de)="([^"]*)"/g;
    let am;
    while ((am = are.exec(h1tag)) !== null) titleVals[am[1]] = unescapeEntities(am[2]);
  }

  const mainStart = src.indexOf("<main>");
  const mainEnd = src.indexOf("</main>");
  if (mainStart === -1 || mainEnd === -1) throw new Error(`${slug}: <main> non trovato`);
  let main = src.slice(mainStart + "<main>".length, mainEnd);

  // controllo nidificazione data-*
  const els = collectDataElements(main);
  const nested = els.filter((e) => {
    const inner = main.slice(e.innerStart, e.innerEnd);
    return /\sdata-(it|en|es|fr|de)(-html)?="/.test(inner);
  });
  if (nested.length > 0) {
    console.error(`${slug}: TROVATI ${nested.length} elementi data-* ANNIDATI (i primi):`);
    for (const e of nested.slice(0, 5)) {
      console.error(`  <${e.tagName}> ${(e.vals["it"] || e.vals["it-html"] || "").slice(0, 80)}`);
    }
    throw new Error(`${slug}: nesting non supportato, intervento manuale richiesto`);
  }

  const out = {};
  for (const lang of LANGS) {
    let html = main;
    // sostituzioni dall'ultimo al primo (indici stabili)
    const ordered = [...els].sort((a, b) => b.tagStart - a.tagStart);
    for (const e of ordered) {
      const val = e.vals[`${lang}${e.isHtml ? "-html" : ""}`] ?? e.vals[e.isHtml ? "it-html" : "it"] ?? "";
      if (e.void) {
        const newTag = stripDataAttrs(e.tagText);
        html = html.slice(0, e.tagStart) + newTag + html.slice(e.tagEnd);
      } else {
        const newTag = stripDataAttrs(e.tagText);
        html =
          html.slice(0, e.tagStart) + newTag + val + html.slice(e.innerEnd, e.innerEnd + e.closeLen) + html.slice(e.innerEnd + e.closeLen);
      }
    }
    // pulizia strutturale
    html = html.replace(/<script[\s\S]*?<\/script>/g, "");
    for (const cls of [...STRIP_CLASSES, ...(STRIP_CLASSES_PER_SLUG[slug] || [])]) {
      html = removeByClass(html, cls);
    }
    for (const id of STRIP_IDS[slug] || []) {
      const before = html.length;
      html = removeById(html, id);
      if (html.length === before) console.warn(`${slug}/${lang}: id #${id} non trovato`);
    }
    if (/\sdata-(it|en|es|fr|de)(-html)?="/.test(html)) {
      throw new Error(`${slug}/${lang}: data-* residui dopo la risoluzione`);
    }
    if (/<script/i.test(html)) throw new Error(`${slug}/${lang}: <script> residui`);
    html = rewriteUrls(html, lang);
    out[lang] = html.trim();
  }

  const ts =
    `// AUTO-GENERATO da scripts/build-legacy-pages.mjs — non modificare a mano.\n` +
    `// Fonte: public/${slug}.html (<main> verbatim, 5 lingue).\n` +
    `import type { Lang } from "@/lib/i18n";\n\n` +
    `export const slug = ${JSON.stringify(slug)};\n\n` +
    `export const title: Record<Lang, string> = ${JSON.stringify(Object.fromEntries(LANGS.map((l) => [l, titleVals[l] ?? titleVals.it ?? ""])))};\n\n` +
    `export const html: Record<Lang, string> = {\n` +
    LANGS.map((l) => `  ${l}: ${JSON.stringify(out[l])},`).join("\n") +
    `\n};\n`;
  writeFileSync(`lib/legacy/${slug}.generated.ts`, ts);
  const bytes = LANGS.map((l) => out[l].length);
  console.log(`${slug}: voci=${els.length} bytes=${bytes.join("/")} title=${JSON.stringify(titleVals.it || "").slice(0, 40)}`);
}
console.log("done -> lib/legacy/*.generated.ts");

// ---- Dati del form colazione (verbatim da public/colazione.html) ----
{
  const h = readFileSync("public/colazione.html", "utf8");
  const grabBlock = (startMarker) => {
    const i = h.indexOf(startMarker);
    if (i === -1) throw new Error("not found: " + startMarker);
    let j = h.indexOf("{", i), depth = 0, end = j, instr = false, q = null;
    for (let k = j; k < h.length; k++) {
      const c = h[k];
      if (instr) { if (c === q && h[k - 1] !== "\\") instr = false; }
      else if (c === '"' || c === "'") { instr = true; q = c; }
      else if (c === "{") depth++;
      else if (c === "}") { depth--; if (depth === 0) { end = k + 1; break; } }
    }
    return h.slice(i, end);
  };
  const dataAttrs = (tagText) => {
    const out = {};
    const re = /\sdata-(it|en|es|fr|de)="([^"]*)"/g;
    let m;
    while ((m = re.exec(tagText)) !== null) out[m[1]] = m[2];
    return out;
  };
  const labelTag = h.match(/<label[^>]*for="guestCount"[^>]*>/)?.[0] || "";
  const optionTag = h.match(/<option[^>]*value=""[^>]*>/)?.[0] || "";
  const sendTag = h.match(/<button[^>]*id="sendBreakfastOrder"[^>]*>/)?.[0] || "";
  const ts =
    `// AUTO-GENERATO da scripts/build-legacy-pages.mjs — non modificare a mano.\n` +
    `// Fonte: public/colazione.html (dati form, verbatim).\n` +
    `import type { Lang } from "@/lib/i18n";\n\n` +
    `export const WHATSAPP_NUMBER = "3923064010";\n\n` +
    grabBlock("const SNACK_OPTIONS = {").replace("const SNACK_OPTIONS = {", "export const SNACK_OPTIONS: Record<Lang, string[]> = {") + ";\n\n" +
    grabBlock("const FORM_TEXTS = {").replace("const FORM_TEXTS = {", "export const FORM_TEXTS = {") + ";\n\n" +
    `export const guestCountLabel: Record<Lang, string> = ${JSON.stringify(dataAttrs(labelTag))};\n\n` +
    `export const guestCountPlaceholder: Record<Lang, string> = ${JSON.stringify(dataAttrs(optionTag))};\n\n` +
    `export const sendLabel: Record<Lang, string> = ${JSON.stringify(dataAttrs(sendTag))};\n`;
  writeFileSync("lib/legacy/colazione-data.generated.ts", ts);
  console.log("colazione-data -> lib/legacy/colazione-data.generated.ts");
}
