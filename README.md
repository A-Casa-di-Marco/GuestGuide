# A Casa di Marco · Guida per gli Ospiti

Guida digitale multilingua per gli ospiti della casa vacanze **A Casa di Marco** (Garden Cottage Escape, Salerno): check-in, permanenza, check-out — con **Marco**, il pettirosso-assistente AI che risponde solo con i dati della guida.

## Funzionalità

- **Home**: hero, salva-guida sul telefono, benvenuto personalizzato (`?g=`), meteo Salerno, storia di Marco
- **Check-in**: scelta in presenza/self, carosello con foto e istruzioni, lightbox immagini, link Maps/WhatsApp
- **Check-out**: headline 10:00, checklist interattiva con progress, regole e penali verbatim
- **Permanenza** (10 pagine migrate): manuale, regole, luoghi, mangiare, trasporti, spesa, parcheggio, itinerario (planner nativo), colazione (modulo ordine snack), farmacie/emergenze
- **Marco chat**: pulsante pettirosso in basso a destra su ogni pagina, chat con LLM via OpenRouter (solo modelli free), risposte brevi nella lingua dell'utente e solo dai dati della guida
- **i18n**: italiano, inglese, spagnolo, francese, tedesco (testi verbatim generati da `public/*.html`)
- **Temi**: chiaro/scuro con stessa palette (ottanio `#3a5a40`) e font Fraunces + Poppins, contrasto WCAG ≥ 4.5:1
- **Area host** (`/gestione`): link guida personalizzati per ospite (D1 + Drizzle)

## Tech stack

Next.js 16 + React 19 (App Router), Tailwind CSS 4, shadcn/ui, Framer Motion, Swiper — deploy su Cloudflare Workers (vinext). Package manager: pnpm 11, Node ≥ 22.

## Struttura

```
app/                  # route: /, /check-in, /check-out, /permanenza, /permanenza/[slug], /api/*
components/           # header/nav, carosello, checklist, meteo, chat di Marco, isole luoghi/mangiare/…
lib/                  # content-*.ts (alias semantici), *-engine.ts, marco-kb.ts, i18n, site
lib/legacy/           # testi verbatim generati (NON modificare a mano)
public/assets/        # foto e icone originali · public/*.html legacy come fallback
scripts/              # build-content, build-legacy-pages, build-experience-data, check-contrast, validate-tokens
docs/                 # 00 analisi, 01 piano di lavoro, 02 architettura, 03 design system, …
```

## Quickstart

```bash
pnpm install
pnpm dev        # anteprima locale (http://127.0.0.1:5173)
pnpm lint && pnpm exec tsc --noEmit
node scripts/check-contrast.mjs && node scripts/validate-tokens.mjs
pnpm build      # build produzione (dist/)
```

Rigenera i testi dopo modifiche ai legacy: `node scripts/build-content.mjs && node scripts/build-legacy-pages.mjs && node scripts/build-experience-data.mjs`.

## Chat di Marco (OpenRouter, solo modelli free)

La chat chiama `POST /api/marco-chat`, che inoltra a `https://openrouter.ai/api/v1/chat/completions` con una lista di modelli gratuiti in ordine di preferenza (`google/gemma-4-31b-it:free`, `nvidia/nemotron-3-super-120b-a12b:free`, `minimax/minimax-m3.1-flash:free`): se il primo fallisce, va in timeout o restituisce una risposta non valida, prova il successivo. Override con il secret `MARCO_MODEL` (anche lista separata da virgole).

La knowledge base è generata dai contenuti verificati della guida (`node scripts/build-marco-kb.mjs` → `lib/kb/guide-kb.json`: luoghi, ristoranti, regole, manuale, pagine servizi + `lib/kb/curated.mjs`). Il retriever (`lib/marco-retrieval-core.mjs`) lavora per radici, così domande come "dove si parcheggia?" trovano la pagina Parcheggio. `node scripts/test-retrieval.mjs` verifica ~30 domande in 5 lingue ed è eseguito in CI.

Le risposte valide sono salvate in D1 (`marco_cache`, TTL 14 giorni, tabella creata dalla migrazione in `drizzle/`): una domanda già vista non consuma quota del modello. Se cambi la base di conoscenza, rigenera il JSON e incrementa `CACHE_VERSION` in `lib/marco-cache.ts`.

Se la quota gratuita di OpenRouter è esaurita (429) la chat non riprova inutilmente gli altri modelli: passa subito al fallback **Cloudflare Workers AI** (binding `AI`, modello `@cf/meta/llama-3.1-8b-instruct`, override con la env `MARCO_AI_MODEL`), che ha un tetto gratuito giornaliero indipendente. Il binding è aggiunto da `scripts/patch-wrangler.mjs`.

Dopo il deploy, verifica la chat in produzione: `node scripts/smoke-marco.mjs` (10 domande reali in 5 lingue, con pausa di 7s per non urtare il throttle; `--fast` per saltarla).

### 1. Crea la chiave

1. Vai su [openrouter.ai](https://openrouter.ai/) → accedi → **Keys** → **Create Key** (i modelli `:free` non addebitano nulla, ma la chiave serve per i limiti di utilizzo).
2. Copia la chiave (inizia con `sk-or-…`).

### 2. Imposta il GitHub Actions secret

1. Apri la repo su GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Nome: `OPENROUTER_API_KEY`, valore: la chiave copiata → **Add secret**.
3. Il workflow `deploy.yml` la pubblica sul Worker a ogni deploy (`wrangler secret put OPENROUTER_API_KEY`), come già avviene per `OWNER_PASSWORD`. Non committare mai la chiave nel codice.

### 3. Sviluppo locale

Crea `.dev.vars` nella root (già ignorato da git):

```bash
OPENROUTER_API_KEY=sk-or-…
```

e riavvia `pnpm dev`. Nota Windows: scrivi il file in UTF-8 senza BOM (es. con un editor di testo, non con `echo` in PowerShell che usa UTF-16 e Wrangler lo ignorerebbe). Senza chiave, la chat risponde con un messaggio che invita a contattare l'host su WhatsApp (verificabile subito, senza chiave).

## CI/CD

- `ci.yml` (push/PR): install, lint, `tsc`, test-retrieval, validate-tokens, check-contrast, build.
- `deploy.yml` (push su `main`): build, migrazioni D1, deploy Worker, `wrangler secret put` di `OWNER_PASSWORD` e `OPENROUTER_API_KEY` dai GitHub secrets.

## Test e QA

- Parità contenuti/motori: verifiche byte-exact eseguite in locale (legacy vs port) per planner e testi; rieseguire dopo modifiche ai testi con gli script in `scripts/`.
- Pre-merge: 4 route × 5 lingue via SSR, contrasto, tastiera/screen reader, viewport 375/768/1280, Lighthouse ≥ 90.

## Documentazione

Vedi `docs/00-ANALISI-CODEBASE.md` … `docs/05-BEST-PRACTICES-CICD.md` e `docs/i18n-keys.md`.
