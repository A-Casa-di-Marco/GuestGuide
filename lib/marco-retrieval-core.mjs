// Nucleo puro del retrieval di Marco (usato da lib/marco-retrieval.ts e dai test).
// Nessuna dipendenza: facile da testare con node scripts/test-retrieval.mjs.

const STOPWORDS = new Set([
  "che", "con", "come", "cosa", "della", "dello", "delle", "degli", "nella", "nello",
  "dove", "quando", "quanto", "quanti", "quale", "quali", "sono", "siamo", "siete",
  "dalla", "dallo", "dalle", "dagli", "nelle", "negli", "alla", "allo", "alle", "agli",
  "questo", "questa", "questi", "queste", "quello", "quella", "quelli", "quelle",
  "molto", "tutto", "tutta", "anche", "solo", "puo", "posso", "potrei", "hanno",
  "abbiamo", "avete", "vorrei", "grazie", "ciao", "salve", "buongiorno", "buonasera",
  "favore", "sapere", "dirmi", "dimmi", "puoi", "potresti", "sai", "dire", "serve",
  "the", "and", "for", "with", "what", "where", "when", "how", "much", "many", "this",
  "that", "these", "those", "there", "here", "your", "yours", "please", "hello", "hi",
  "can", "could", "would", "should", "tell", "know", "need", "want", "give", "about",
  "und", "der", "die", "das", "ist", "sind", "wie", "was", "wo", "wann", "bitte",
  "und", "ich", "wir", "kann", "konnen", "mochte", "gibt", "es",
  "que", "los", "las", "del", "por", "para", "como", "donde", "cuando", "cuanto",
  "hola", "gracias", "favor", "puedo", "hay",
  "les", "des", "une", "est", "sont", "comment", "ou", "quand", "combien", "bonjour",
  "merci", "svp", "peux", "faut", "quel",
]);

export function normalize(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SUFFIXES = [
  "zione", "zioni", "mente", "amento", "amenti", "imenti", "imento", "ando", "endo",
  "are", "ere", "ire", "ato", "ata", "ati", "ate", "uto", "uta", "uti", "ute",
  "isco", "isci", "iamo", "iate", "ano", "ono", "ing", "ed",
];

/** Radice grezza: assorbe plurali e forme verbali (parcheggia/parcheggio, fumare/fumo, spiaggia/spiagge). */
export function root(token) {
  if (token.length >= 7) return token.slice(0, 6);
  for (const suf of SUFFIXES) {
    if (token.endsWith(suf) && token.length - suf.length >= 3) return token.slice(0, -suf.length);
  }
  if (token.length >= 4 && /[aeiou]$/.test(token)) return token.slice(0, -1);
  return token;
}

export function tokenize(s) {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

function rootsOf(tokens) {
  const out = new Set();
  for (const t of tokens) out.add(root(t));
  return out;
}

function entryText(entry, lang) {
  if (lang === "en") return entry.en || entry.it || "";
  return entry[lang] || entry.it || entry.en || "";
}

// Indice precalcolato per lingua (costoso una sola volta per isolate, non a ogni richiesta).
const INDEX = new WeakMap();

function buildIndex(entries, lang) {
  return entries.map((entry) => {
    const tagTokens = new Set(
      [...(entry.tags_it || []), ...(entry.tags_en || []), ...(entry.tags_all || [])].flatMap(tokenize),
    );
    const hayTokens = new Set(
      tokenize([entry.id, entry.cat, entryText(entry, lang), entry.it, entry.en].filter(Boolean).join(" ")),
    );
    return {
      id: entry.id,
      cat: entry.cat,
      text: entryText(entry, lang),
      tagTokens,
      tagRoots: rootsOf(tagTokens),
      hayTokens,
      hayRoots: rootsOf(hayTokens),
    };
  });
}

function indexFor(entries, lang) {
  let byLang = INDEX.get(entries);
  if (!byLang) {
    byLang = new Map();
    INDEX.set(entries, byLang);
  }
  let idx = byLang.get(lang);
  if (!idx) {
    idx = buildIndex(entries, lang);
    byLang.set(lang, idx);
  }
  return idx;
}

function scoreEntry(item, queryTokens) {
  let score = 0;
  for (const q of queryTokens) {
    const r = root(q);
    if (item.tagTokens.has(q)) score += 3;
    else if (item.tagRoots.has(r)) score += 2.5;
    else if (item.hayTokens.has(q)) score += 1;
    else if (item.hayRoots.has(r)) score += 0.8;
  }
  return score;
}

export function retrieveFrom(entries, query, lang, topK = 5, maxChars = 3500) {
  const qt = tokenize(query);
  if (qt.length === 0) return [];
  const unique = [...new Set(qt)];

  const scored = indexFor(entries, lang).map((item) => ({
    id: item.id,
    cat: item.cat,
    text: item.text,
    score: scoreEntry(item, unique),
  }));

  const ranked = scored.filter((s) => s.score >= 1).sort((a, b) => b.score - a.score);

  const picked = [];
  let chars = 0;
  for (const r of ranked) {
    if (picked.length >= topK) break;
    if (chars + r.text.length > maxChars && picked.length > 0) break;
    picked.push(r);
    chars += r.text.length;
  }
  return picked;
}

/** true se la domanda contiene almeno un termine utile (non solo saluti/stopword). */
export function hasContent(query) {
  return tokenize(query).length > 0;
}
