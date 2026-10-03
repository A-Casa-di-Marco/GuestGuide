import { contentGenerated, contentIsHtml } from "./content-checkin.generated";
import type { Lang } from "./i18n";

/** Testo verbatim check-in/out (public/checkin.html), con fallback IT. */
export function tCheckin(key: string, lang: Lang): string {
  const rec = contentGenerated[key];
  if (!rec) return "";
  return rec[lang] || rec.it;
}

export function isCheckinHtml(key: string): boolean {
  return contentIsHtml[key] === true;
}

/** Avvolge il contenuto <strong>…</strong> con un link (parole invariate). */
export function linkifyStrong(html: string, href: string): string {
  return html.replace(
    /<strong>([\s\S]*?)<\/strong>/,
    `<a href="${href}" target="_blank" rel="noreferrer" class="font-semibold underline underline-offset-2">$1</a>`,
  );
}

// ---- Check-In ----
export const checkin = {
  title: "checkin_000",
  helpCta: "checkin_004",
  choiceInTitle: "checkin_006",
  choiceInDesc: "checkin_007",
  choiceSelfTitle: "checkin_008",
  choiceSelfDesc: "checkin_009",
  inSection1: "checkin_010",
  inB1: "checkin_011",
  inB2: "checkin_012",
  inBadgeGate: "checkin_013",
  inBadgeMailbox: "checkin_014",
  inSection2: "checkin_015",
  inB3: "checkin_016",
  inB4: "checkin_017",
  inB5: "checkin_018",
  inB6: "checkin_019",
  inB7: "checkin_020",
  selfTitle: "checkin_021",
  mapsCta: "checkin_022",
  s1Title: "checkin_023",
  s1Lead: "checkin_024",
  keyboxTitle: "checkin_025",
  keyboxSteps: ["checkin_026", "checkin_027", "checkin_028", "checkin_029", "checkin_030", "checkin_031"],
  keyboxNote: "checkin_032",
  close: "checkin_033",
  s2Title: "checkin_034",
  s2B1: "checkin_035",
  s2B2: "checkin_036",
  s3Title: "checkin_037",
  s3B1: "checkin_038",
  s4Title: "checkin_039",
  s4B1: "checkin_040",
  s5Title: "checkin_041",
  s5B1: "checkin_042",
  s6Title: "checkin_043",
  s6B1: "checkin_044",
  keysTitle: "checkin_046",
  keysNote: "checkin_047",
  remoteTitle: "checkin_048",
  remoteA: "checkin_049",
  remoteB: "checkin_050",
  remoteCD: "checkin_051",
  longKeyTitle: "checkin_052",
  longKey1: "checkin_053",
  longKey2: "checkin_054",
  otherKeyTitle: "checkin_055",
  otherKey1: "checkin_056",
  keysMailboxNote: "checkin_057",
  prev: "checkin_059",
  next: "checkin_060",
} as const;

// ---- Check-Out ----
export const checkout = {
  eyebrow: "checkin_062",
  headlineNote: "checkin_063",
  badge: "checkin_064",
  bullets: ["checkin_065", "checkin_066", "checkin_067", "checkin_068", "checkin_069", "checkin_070"],
  confirmBullet: "checkin_071",
  listTitle: "checkin_072",
  listIntro: "checkin_073",
  items: [
    "checkin_074",
    "checkin_075",
    "checkin_076",
    "checkin_077",
    "checkin_078",
    "checkin_079",
    "checkin_080",
    "checkin_081",
    "checkin_082",
  ],
  departCta: "checkin_083",
  done: "checkin_084",
  thanks: "checkin_085",
} as const;
