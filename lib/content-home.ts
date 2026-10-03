import { contentGenerated, contentIsHtml } from "./content-index.generated";
import type { Lang } from "./i18n";

/** Testo verbatim home (public/index.html), con fallback IT. */
export function tHome(key: string, lang: Lang): string {
  const rec = contentGenerated[key];
  if (!rec) return "";
  return rec[lang] || rec.it;
}

export function isHomeHtml(key: string): boolean {
  return contentIsHtml[key] === true;
}

// ---- Hero ----
export const hero = { badge: "index_010", title: "index_011", sub: "index_012" } as const;

// ---- Fasi del soggiorno (stay-tabs + pannelli) ----
export const stayTabs = ["index_025", "index_026", "index_027"] as const;
export type StayPhase = {
  tabKey: string;
  kickerKey: string;
  titleKey: string;
  textKey: string;
  ctaKey: string;
  ctaHref: string;
  cta2Key?: string;
  cta2Href?: string;
};
export const stayPhases: StayPhase[] = [
  {
    tabKey: "index_025",
    kickerKey: "index_028",
    titleKey: "index_029",
    textKey: "index_030",
    ctaKey: "index_032",
    ctaHref: "/check-in",
    cta2Key: "index_033",
    cta2Href: "https://wa.me/393923064010",
  },
  {
    tabKey: "index_026",
    kickerKey: "index_034",
    titleKey: "index_035",
    textKey: "index_036",
    ctaKey: "index_037",
    ctaHref: "/permanenza/regole",
    cta2Key: "index_038",
    cta2Href: "/permanenza/manuale",
  },
  {
    tabKey: "index_027",
    kickerKey: "index_039",
    titleKey: "index_040",
    textKey: "index_041",
    ctaKey: "index_042",
    ctaHref: "/check-out",
    cta2Key: "index_043",
    cta2Href: "https://wa.me/393923064010",
  },
];

// ---- Griglia guide (12 tile, href legacy preservati) ----
export type GuideTile = { titleKey: string; descKey: string; href: string; icon: string };
export const guideTitleKey = "index_048";
export const guideTiles: GuideTile[] = [
  { titleKey: "index_049", descKey: "index_050", href: "/check-in", icon: "key-round" },
  { titleKey: "index_051", descKey: "index_052", href: "/check-out", icon: "log-out" },
  { titleKey: "index_053", descKey: "index_054", href: "/permanenza/manuale", icon: "book-open" },
  { titleKey: "index_055", descKey: "index_056", href: "/permanenza/regole", icon: "clipboard-list" },
  { titleKey: "index_057", descKey: "index_058", href: "/permanenza/mangiare", icon: "utensils" },
  { titleKey: "index_059", descKey: "index_060", href: "/permanenza/luoghi", icon: "map" },
  { titleKey: "index_061", descKey: "index_062", href: "/permanenza/trasporti", icon: "bus" },
  { titleKey: "index_063", descKey: "index_064", href: "/permanenza/spesa", icon: "basket" },
  { titleKey: "index_065", descKey: "index_066", href: "/permanenza/colazione", icon: "coffee" },
  { titleKey: "index_067", descKey: "index_068", href: "/permanenza/parcheggio", icon: "parking" },
  { titleKey: "index_069", descKey: "index_070", href: "itinerario.html", icon: "route" },
  { titleKey: "index_071", descKey: "index_072", href: "/permanenza/farmacie-emergenze", icon: "cross" },
];

// ---- Offerta partenza posticipata ----
export const lateOffer = { title: "index_045", text: "index_046", cta: "index_047" } as const;
export const lateOfferTariffs = ["11:00 → 20 €", "12:30 → 45 €", "16:30 → 100 €"] as const;

// ---- Meteo ----
export const weather = { label: "index_073", umbrellaTitle: "index_074", umbrellaText: "index_075" } as const;

// ---- Contatti (home + dialog header) ----
export const contacts = {
  title: "index_076",
  intro1: "index_077",
  intro2: "index_078",
  asjaRole: "index_079",
  call: "index_080",
  whatsapp: "index_081",
  ambraRole: "index_082",
  emailRole: "index_085",
  emailCta: "index_086",
  emergencyTitle: "index_087",
  emergencyText: "index_088",
  call118: "index_089",
  call112: "index_090",
} as const;

// ---- Storia di Marco ----
export const marco = {
  title: "index_091",
  greeting: "index_092",
  p1: "index_093",
  p2: "index_094",
  p3: "index_095",
  p4: "index_096",
  p5: "index_097",
  p6: "index_098",
  sign: "index_099",
  caption: "index_100",
} as const;

// ---- Footer ----
export const footer = { line1: "index_101", line2: "index_102" } as const;

// ---- Home: titolo benvenuto standard ----
export const welcomeTitleKey = "index_044";
