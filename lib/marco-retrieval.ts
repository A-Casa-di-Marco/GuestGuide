import type { Lang } from "./i18n";
import kb from "./kb/guide-kb.json";
import { hasContent, retrieveFrom } from "./marco-retrieval-core.mjs";

type Entry = {
  id: string;
  cat: string;
  tags_it: string[];
  tags_en: string[];
  tags_all?: string[];
  it: string;
  en: string;
};

/**
 * RAG simulata: seleziona le voci della guida pertinenti alla domanda.
 * Ritorna al massimo `topK` voci (testo nella lingua richiesta, fallback IT).
 */
export function retrieve(
  query: string,
  lang: Lang,
  topK = 5,
  maxChars = 3500,
): { id: string; cat: string; text: string; score: number }[] {
  return retrieveFrom(kb.entries as Entry[], query, lang, topK, maxChars);
}

/** true se la domanda contiene termini utili (non solo saluti). */
export function isContentQuery(query: string): boolean {
  return hasContent(query);
}
