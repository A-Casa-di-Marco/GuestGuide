// Genera lib/content.generated.ts dai testi verbatim di public/*.html.
// Single source of truth: gli HTML legacy. Rieseguire dopo ogni modifica ai testi:
//   node scripts/build-content.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

const LANGS = ["it", "en", "es", "fr", "de"];
const FILES = ["public/index.html", "public/checkin.html"];

function unescapeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

// Estrae il testo completo del tag aperto a partire da `from` (gestisce " e > dentro i valori).
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

function parseAttrs(tagText) {
  const attrs = {};
  const re = /\s(data-(it|en|es|fr|de)(-html)?)=("([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tagText)) !== null) {
    const lang = m[2];
    const isHtml = m[3] === "-html";
    const val = m[5] !== undefined ? m[5] : m[6];
    attrs[`${lang}${isHtml ? "-html" : ""}`] = unescapeEntities(val);
  }
  const tagName = (tagText.match(/^<([a-z0-9]+)/i) || [])[1] || "?";
  return { tagName, attrs };
}

const entries = [];
for (const file of FILES) {
  const stem = basename(file, ".html");
  const html = readFileSync(file, "utf8");
  let idx = 0;
  let pos = 0;
  while (pos < html.length) {
    const lt = html.indexOf("<", pos);
    if (lt === -1) break;
    const next = html[lt + 1];
    if (!next || !/[a-zA-Z]/.test(next)) {
      pos = lt + 1;
      continue;
    }
    const tagText = readOpenTag(html, lt);
    if (!tagText) break;
    const { tagName, attrs } = parseAttrs(tagText);
    if (attrs["it"] !== undefined || attrs["it-html"] !== undefined) {
      const key = `${stem}_${String(idx).padStart(3, "0")}`;
      idx++;
      const isHtml = attrs["it-html"] !== undefined;
      const rec = {};
      for (const l of LANGS) {
        rec[l] = attrs[`${l}-html`] ?? attrs[l] ?? attrs[isHtml ? "it-html" : "it"] ?? "";
      }
      entries.push({ key, tag: tagName, html: isHtml, text: rec });
    }
    pos = lt + tagText.length;
  }
}

const tsHead = (stem, n) =>
  `// AUTO-GENERATO da scripts/build-content.mjs — non modificare a mano.\n` +
  `// Fonte: public/${stem}.html (testi verbatim, ${n} elementi).\n` +
  `import type { Lang } from "@/lib/i18n";\n\n`;

function emitModule(stem, list) {
  const ts =
    tsHead(stem, list.length) +
    `export const contentGenerated: Record<string, Record<Lang, string>> = {\n` +
    list.map((e) => `  ${JSON.stringify(e.key)}: ${JSON.stringify(e.text)},`).join("\n") +
    `\n};\n\n` +
    `export const contentIsHtml: Record<string, boolean> = {\n` +
    list.map((e) => `  ${JSON.stringify(e.key)}: ${e.html ? "true" : "false"},`).join("\n") +
    `\n};\n`;
  writeFileSync(`lib/content-${stem}.generated.ts`, ts);
}

const byStem = { index: [], checkin: [] };
for (const e of entries) {
  (e.key.startsWith("index_") ? byStem.index : byStem.checkin).push(e);
}
emitModule("index", byStem.index);
emitModule("checkin", byStem.checkin);

const md =
  `# Chiavi i18n generate (verbatim da public/*.html)\n\n` +
  `> Rigenerato da \`scripts/build-content.mjs\`. Usare gli alias semantici in \`lib/content.ts\`.\n\n` +
  `| key | tag | html | it (anteprima) |\n|---|---|---|---|\n` +
  entries
    .map(
      (e) =>
        `| \`${e.key}\` | ${e.tag} | ${e.html ? "sì" : "no"} | ${e.text.it.replace(/\n/g, " ").replace(/\|/g, "\\|").slice(0, 90)} |`,
    )
    .join("\n") +
  `\n`;
writeFileSync("docs/i18n-keys.md", md);

console.log(`entries: ${entries.length} -> lib/content-index.generated.ts + lib/content-checkin.generated.ts + docs/i18n-keys.md`);
