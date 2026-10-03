// Estrae i dati JS delle pagine dinamiche (verbatim) in moduli TS tipizzati.
// Uso: node scripts/build-experience-data.mjs
import { readFileSync, writeFileSync } from "node:fs";

function grabBalanced(src, startMarker, openCh, closeCh) {
  const i = src.indexOf(startMarker);
  if (i === -1) throw new Error("not found: " + startMarker);
  const j = src.indexOf(openCh, i);
  let depth = 0, end = j, instr = false, q = null;
  for (let k = j; k < src.length; k++) {
    const c = src[k];
    if (instr) { if (c === q && src[k - 1] !== "\\") instr = false; }
    else if (c === '"' || c === "'") { instr = true; q = c; }
    else if (c === openCh) depth++;
    else if (c === closeCh) { depth--; if (depth === 0) { end = k + 1; break; } }
  }
  if (depth !== 0) throw new Error("sbilanciato: " + startMarker);
  return src.slice(i, end);
}

function dataAttrs(tagText) {
  const out = {};
  const re = /\sdata-(it|en|es|fr|de)="([^"]*)"/g;
  let m;
  while ((m = re.exec(tagText)) !== null) out[m[1]] = m[2];
  return out;
}

function checkJs(name, code) {
  // valida come espressione JS (i dati sono letterali puri)
  const expr = code.replace(/^var \w+ =/, "").replace(/;\s*$/, "");
  const val = new Function(`return (${expr});`)();
  const count = Array.isArray(val) ? val.length : Object.keys(val).length;
  console.log(`${name}: ok, ${Array.isArray(val) ? val.length + " voci" : count + " chiavi"}`);
  return val;
}

// ---------- LUOGHI ----------
{
  const h = readFileSync("public/luoghi.html", "utf8");
  const cats = grabBalanced(h, "var placeCategories = ", "[", "]");
  const labels = grabBalanced(h, "var labels = ", "{", "}");
  checkJs("placeCategories", cats);
  checkJs("luoghi.labels", labels);
  const ts =
    `// AUTO-GENERATO da scripts/build-experience-data.mjs — non modificare a mano.\n` +
    `// Fonte: public/luoghi.html (dati verbatim, 5 lingue).\n` +
    `import type { Lang } from "@/lib/i18n";\n\n` +
    `export type Place = {\n` +
    `  image?: string;\n` +
    `  infoUrl?: string;\n` +
    `  mapsUrl?: string;\n` +
    `  mapsQuery?: string;\n` +
    `  beachType?: string;\n` +
    `  note?: Record<Lang, string>;\n` +
    `  title: Record<Lang, string>;\n` +
    `  desc: Record<Lang, string>;\n` +
    `};\n\n` +
    `export type PlaceCategory = {\n` +
    `  id: string;\n` +
    `  icon: string;\n` +
    `  isEvents?: boolean;\n` +
    `  hideImage?: boolean;\n` +
    `  title: Record<Lang, string>;\n` +
    `  short: Record<Lang, string>;\n` +
    `  intro: Record<Lang, string>;\n` +
    `  places: Place[];\n` +
    `};\n\n` +
    cats.replace("var placeCategories = ", "export const placeCategories: PlaceCategory[] = ") + ";\n\n" +
    labels.replace("var labels = ", "export const labels: Record<string, Record<Lang, string>> = ") + ";\n\n" +
    `export function mapsUrlFor(place: Place): string {\n` +
    `  if (place.mapsUrl) return place.mapsUrl;\n` +
    `  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.mapsQuery || "");\n` +
    `}\n`;
  writeFileSync("lib/legacy/luoghi-data.generated.ts", ts);
}

// ---------- MANGIARE ----------
{
  const h = readFileSync("public/mangiare.html", "utf8");
  const cats = grabBalanced(h, "var categories = ", "{", "}");
  const labels = grabBalanced(h, "var labels = ", "{", "}");
  const tips = grabBalanced(h, "var placesWithTip = ", "[", "]");
  checkJs("categories", cats);
  checkJs("mangiare.labels", labels);
  checkJs("placesWithTip", tips);

  // pulsanti statici .food-choice (key da onclick + testi data-*)
  const buttons = [];
  const btnRe = /<button class="food-choice" onclick="showCategory\('([^']+)'\)"[^>]*>([\s\S]*?)<\/button>/g;
  let bm;
  while ((bm = btnRe.exec(h)) !== null) {
    const inner = bm[2];
    const icon = (inner.match(/<span>([\s\S]*?)<\/span>/) || [])[1]?.trim() || "";
    const strong = (inner.match(/<strong[^>]*>/) || [])[0] || "";
    const small = (inner.match(/<small[^>]*>/) || [])[0] || "";
    buttons.push({ key: bm[1], icon, title: dataAttrs(strong), desc: dataAttrs(small) });
  }
  const backTag = h.match(/<button[^>]*class="back-category"[^>]*>/)?.[0] || "";

  const ts =
    `// AUTO-GENERATO da scripts/build-experience-data.mjs — non modificare a mano.\n` +
    `// Fonte: public/mangiare.html (dati verbatim, 5 lingue).\n` +
    `import type { Lang } from "@/lib/i18n";\n\n` +
    `export type Restaurant = {\n` +
    `  image?: string;\n` +
    `  price?: string;\n` +
    `  featured?: boolean;\n` +
    `  recommended?: boolean;\n` +
    `  walkable?: boolean;\n` +
    `  mapsUrl?: string;\n` +
    `  mapsQuery?: string;\n` +
    `  tip?: Record<Lang, string>;\n` +
    `  name: Record<Lang, string>;\n` +
    `  desc: Record<Lang, string>;\n` +
    `};\n\n` +
    `export type FoodCategory = { title: Record<Lang, string>; restaurants: Restaurant[] };\n\n` +
    cats.replace("var categories = ", "export const categories: Record<string, FoodCategory> = ") + ";\n\n" +
    labels.replace("var labels = ", "export const labels: Record<string, Record<Lang, string>> = ") + ";\n\n" +
    tips.replace("var placesWithTip = ", "export const placesWithTip: string[] = ") + ";\n\n" +
    `export const buttons: { key: string; icon: string; title: Record<Lang, string>; desc: Record<Lang, string> }[] = ${JSON.stringify(buttons)};\n\n` +
    `export const backLabel: Record<Lang, string> = ${JSON.stringify(dataAttrs(backTag))};\n\n` +
    `export function shouldShowTip(place: Restaurant): boolean {\n` +
    `  if (!place || !place.tip || !place.name || !place.name.it) return false;\n` +
    `  return placesWithTip.indexOf(place.name.it) !== -1;\n` +
    `}\n\n` +
    `export function mapsUrlFor(place: Restaurant): string {\n` +
    `  if (place.mapsUrl) return place.mapsUrl;\n` +
    `  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.mapsQuery || "");\n` +
    `}\n`;
  writeFileSync("lib/legacy/mangiare-data.generated.ts", ts);
}
console.log("done -> lib/legacy/{luoghi,mangiare}-data.generated.ts");
