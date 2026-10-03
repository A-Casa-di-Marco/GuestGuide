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
// ---------- ITINERARIO ----------
{
  const h = readFileSync("public/itinerario.html", "utf8");
  const grab = (marker, openCh, closeCh) => {
    const i = h.indexOf(marker);
    if (i === -1) throw new Error("not found: " + marker);
    const j = h.indexOf(openCh, i);
    let depth = 0, end = j, instr = false, q = null;
    for (let k = j; k < h.length; k++) {
      const c = h[k];
      if (instr) { if (c === q && h[k - 1] !== "\\") instr = false; }
      else if (c === '"' || c === "'") { instr = true; q = c; }
      else if (c === openCh) depth++;
      else if (c === closeCh) { depth--; if (depth === 0) { end = k + 1; break; } }
    }
    if (depth !== 0) throw new Error("sbilanciato: " + marker);
    return h.slice(i, end);
  };
  const check = (name, code) => {
    const expr = code.replace(/^(var|const) \w+ =/, "").replace(/;\s*$/, "");
    const val = new Function(`return (${expr});`)();
    console.log(`${name}: ok`);
    return val;
  };
  const plans = grab("const plans = ", "{", "}");
  const planZone = grab("const planZone = ", "{", "}");
  const zoneOrder = grab("const zoneOrder = ", "[", "]");
  const zoneName = grab("const zoneName = ", "{", "}");
  const guideFood = grab("const guideFood = ", "{", "}");
  const guidePlaces = grab("const guidePlaces = ", "{", "}");
  const ui = grab("const ui = ", "{", "}");
  check("plans", plans);
  check("planZone", planZone);
  check("zoneOrder", zoneOrder);
  check("zoneName", zoneName);
  check("guideFood", guideFood);
  check("guidePlaces", guidePlaces);
  check("ui", ui);
  const labelFn = grab("function label(value) {", "{", "}");
  // oggetto labels interno alla funzione (verbatim)
  const li = labelFn.indexOf("const labels = ");
  const lj = labelFn.indexOf("{", li);
  let ldepth = 0, lend = lj, linstr = false, lq = null;
  for (let k = lj; k < labelFn.length; k++) {
    const c = labelFn[k];
    if (linstr) { if (c === lq && labelFn[k - 1] !== "\\") linstr = false; }
    else if (c === '"' || c === "'") { linstr = true; lq = c; }
    else if (c === "{") ldepth++;
    else if (c === "}") { ldepth--; if (ldepth === 0) { lend = k + 1; break; } }
  }
  const labelObj = labelFn.slice(lj, lend);
  check("itinerarioLabels", labelObj);

  const ts =
    `// AUTO-GENERATO da scripts/build-experience-data.mjs — non modificare a mano.\n` +
    `// Fonte: public/itinerario.html (dati verbatim, 5 lingue).\n` +
    `import type { Lang } from "@/lib/i18n";\n\n` +
    `export type PlanSlot = [string, string];\n\n` +
    `export type Plan = { title: string; morning: PlanSlot; lunch: PlanSlot; afternoon: PlanSlot; evening: PlanSlot };\n\n` +
    `export type UiLang = {\n` +
    `  eveningEarly: PlanSlot;\n` +
    `  eveningLate: PlanSlot;\n` +
    `  food: Record<string, PlanSlot>;\n` +
    `  zoneTip: Record<string, string>;\n` +
    `  genericZoneTip: string;\n` +
    `  tips: Record<string, PlanSlot>;\n` +
    `  personalNote: string;\n` +
    `  summary: { dayUnit: { one: string; other: string }; pace: string; interests: string; mixDefault: string; food: string };\n` +
    `  header: string;\n` +
    `  dayName: string;\n` +
    `  slotNames: [string, string, string, string];\n` +
    `  recsIntro: string;\n` +
    `  copied: string;\n` +
    `  copy: string;\n` +
    `};\n\n` +
    plans.replace("const plans = ", "export const plans: Record<Lang, Record<string, Plan>> = ") + ";\n\n" +
    planZone.replace("const planZone = ", "export const planZone: Record<string, string> = ") + ";\n\n" +
    zoneOrder.replace("const zoneOrder = ", "export const zoneOrder: string[] = ") + ";\n\n" +
    zoneName.replace("const zoneName = ", "export const zoneName: Record<Lang, Record<string, string>> = ") + ";\n\n" +
    `export type Rec = [string, string, string];\n\n` +
    guideFood.replace("const guideFood = ", "export const guideFood: Record<string, Rec[]> = ") + ";\n\n" +
    guidePlaces.replace("const guidePlaces = ", "export const guidePlaces: Record<string, Rec[]> = ") + ";\n\n" +
    ui.replace("const ui = ", "export const ui: Record<Lang, UiLang> = ") + ";\n\n" +
    labelObj.replace(/^/, "export const valueLabels: Record<Lang, Record<string, string>> = ") + ";\n";
  writeFileSync("lib/legacy/itinerario-data.generated.ts", ts);
}
console.log("done -> lib/legacy/{luoghi,mangiare}-data.generated.ts");
