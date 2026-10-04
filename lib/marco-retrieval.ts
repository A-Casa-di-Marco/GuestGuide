import type { Lang } from "./i18n";
import kb from "./kb/guide-kb.json";

type Entry = {
  id: string;
  cat: string;
  tags_it: string[];
  tags_en: string[];
  tags_all?: string[];
  it: string;
  en: string;
};

const STOPWORDS = new Set([
  "che", "con", "come", "cosa", "della", "dello", "delle", "degli", "nella", "nello", "nello",
  "dove", "quando", "quanto", "quanti", "quale", "quali", "sono", "siamo", "siete", "delle",
  "dalla", "dallo", "dalle", "dagli", "nella", "nello", "nelle", "negli", "alla", "allo",
  "alle", "agli", "della", "dello", "questo", "questa", "questi", "queste", "quello",
  "quella", "quelli", "quelle", "molto", "tutto", "tutta", "molto", "anche", "solo", "può",
  "hanno", "hanno", "abbiamo", "avete", "vorrei", "grazie", "ciao", "the", "and", "for",
  "with", "what", "where", "when", "how", "much", "many", "this", "that", "these", "those",
  "there", "here", "your", "yours", "please", "hello", "hi", "come", "sei", "stai", "salve",
  "buongiorno", "buonasera", "favore", "sapere", "dirmi", "dimmi", "puoi", "potresti", "puo",
  "sai", "dire", "delle", "degli",
]);

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9à-ÿ ]/gi, " ");
}

function tokens(s: string): string[] {
  return normalize(s)
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

/**
 * RAG simulata: seleziona le voci della guida pertinenti alla domanda.
 * Ritorna al massimo `topK` voci (testo nella lingua richiesta, fallback IT).
 */
export function retrieve(query: string, lang: Lang, topK = 5, maxChars = 3500): { id: string; cat: string; text: string; score: number }[] {
  const qt = new Set(tokens(query));
  if (qt.size === 0) return [];
  const entries = kb.entries as Entry[];

  const scored = entries.map((e) => {
    const text = lang === "en" ? e.en : e.it;
    const hayTokens = new Set(tokens(`${e.id} ${e.cat} ${text}`));
    const tagTokens = new Set([...e.tags_it, ...e.tags_en, ...(e.tags_all || [])].flatMap((t) => tokens(t)));
    let score = 0;
    for (const t of qt) {
      if (tagTokens.has(t)) score += 3;
      else if (hayTokens.has(t)) score += 1;
      else {
        // corrispondenza parziale (radice): evita falsi positivi corti
        for (const h of hayTokens) {
          if (h.length >= 5 && t.length >= 5 && (h.startsWith(t) || t.startsWith(h))) {
            score += 0.5;
            break;
          }
        }
      }
    }
    return { id: e.id, cat: e.cat, text, score };
  });

  const ranked = scored.filter((s) => s.score >= 2).sort((a, b) => b.score - a.score);
  const picked: typeof ranked = [];
  let chars = 0;
  for (const r of ranked.slice(0, topK)) {
    if (chars + r.text.length > maxChars && picked.length > 0) break;
    picked.push(r);
    chars += r.text.length;
  }
  return picked;
}
