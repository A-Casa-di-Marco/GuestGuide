# 00 — Analisi codebase GuestGuide (stato attuale, Ott 2026)

Data: 2026-10-03 · Autore: senior UI/UX + software dev · Scope: refactoring completo senza alterare testi/immagini.

## 1. Shape del repository

| Area | Path | Stato |
|---|---|---|
| Entry Next.js | `app/page.tsx` | Solo `redirect('/index.html')` con query `g,lang`. Non renderizza UI. |
| Layout Next | `app/layout.tsx` | Solo metadata gestione + `globals.css`. `lang="it"` hardcoded. |
| Stili Next | `app/globals.css` | Solo stili pannello `/gestione` (max-width 920, Georgia/Arial). Non è il design system del sito pubblico. |
| Gestione host | `app/gestione/*`, `app/api/*`, `lib/stays.ts`, `db/*` | Pannello proprietario con sessione HMAC in cookie HttpOnly, throttle login, D1/Drizzle. **Non toccare nel refactoring pubblico.** |
| Sito pubblico reale | `public/*.html` + `public/assets/*` + `public/guide-*.js/css` | Sito statico multilingua vanilla (it/en/es/fr/de) con `data-it/data-en/...` attributes. **Questa è la fonte di verità per testi e immagini.** |
| Config shadcn | `components.json` | `style:new-york`, `rsc:true`, `tsx:true`, `tailwind.cssVariables:true`, alias `@/components`, `@/lib/utils`, `@/components/ui`, `@/hooks`. Path componenti default = `@/components/ui` = `components/ui/` — già corretto, non serve creare cartelle extra. |
| UI kit | `components/ui/*` (60 file) | shadcn new-york già installato. `lib/utils.ts` con `cn()` già presente. |
| Deps chiave | `package.json` | `next@16.3.4`, `react@19.2.6`, `tailwindcss@4.2.1`, `@tailwindcss/postcss`, `next-themes`, `lucide-react@1.31`, `embla-carousel-react`, `radix-ui`, `zod`, `react-hook-form`. **Mancano**: `framer-motion`, `swiper`. |
| Build/deploy | `vite.config.ts` (vinext) + `scripts/run-framework.mjs` + `build/` + `wrangler` | Ibrido vinext/Cloudflare Workers. `npm run dev/build/start` wrappano vinext. CI/CD da standardizzare (vedi `05-BEST-PRACTICES-CICD.md`). |
| Redirect legacy | `index.html` (root), `404.html` | Redirect a workers.dev. Non toccare. |

## 2. Inventario pagine statiche (fonte contenuti — NON modificare testi)

| File | Titolo | Contenuto chiave | Immagini chiave |
|---|---|---|---|
| `public/index.html` (~2600 righe) | Home / Guest Guide | lang-screen (5 lingue), hero `garden-main.jpg` + `Guida per gli ospiti / A Casa di Marco`, `saveGuideBtn` + box Android/iPhone, stay-tabs (Prima di arrivare / Sono in casa / Prima di partire), section-grid tiles (Check-in, Check-out, La casa, Regole + altre), weather box (Open-Meteo Salerno 40.6824,14.7681), contatti Asja/Ambra/email + emergenze 118/112, `marco-section` storia completa + `pettirosso1.png` | `assets/garden-main.jpg`, `assets/pettirosso1.png`, `assets/icon-192/512.png` |
| `public/checkin.html` (~1134 righe) | Check-in / Check-out | journey-tabs Arrivare/Ripartire, quick-contact WhatsApp, `checkin-choice-grid` (presenza 🤝 / self 🔑), `panelPresenza` (orario arrivo, 30 min, cancello foto + badge, documenti, tassa 3€/die <11 anni esclusi, cauzione Booking 100€ bonifico 48h, pagamenti bonifico/PayPal/contanti no POS), `panelSelf` (maps link `https://maps.app.goo.gl/tL37r51JpKZJc6j87`, 7 step arrival-steps + step-strip + prev/next, keybox code 1705, telecomando A/B, chiavi lunga/cancelletto, parcheggio immagine per-lingua), checkout con headline 10:00 + checklist 9 item + progress + confetti + WhatsApp `https://wa.me/393923064010` | `cancello-check-in.jpg`, `keyboxcancello.jpeg`, `keybox.png`, `giraasinistra.png`, `giraadestra.png`, `cancellocerchiato.png`, `cancello-casa.jpeg`, `parcheggio{giardino,inglese,spagnolo,francese}.png` (+ `parcheggiogiardino.png`), `manuale-chiavi.jpg`, `serratura.jpeg` |
| `public/check-in-out.html` | redirect | Solo redirect a `checkin.html`. Mantenere per retrocompatibilità QR/link. |
| `public/manuale.html` | Manuale casa | Chiavi/telecomando, Wi-Fi (`A Casa di Marco - Wifi` / `ACASADIMARCO!17`), differenziata, clima/termostato, moka, lavatrice/lavastoviglie, ecc. | `manuale-*.jpg/png`, `serratura.jpeg`, `moka*` |
| `public/regole.html`, `luoghi.html`, `mangiare.html`, `trasporti.html`, `spesa.html`, `parcheggio.html`, `itinerario.html`, `colazione.html`, `farmacie-emergenze.html` | Permanenza / zona | Regole, cosa visitare, dove mangiare, trasporti (pdf bus 14/B), spesa, parcheggio, itinerari, colazione, farmacie/emergenze. Da aggregare in `/permanenza` fase 1 come hub + link, migrazione completa in fase 2. | ~100 foto in `assets/` (duomo, lungomare, paestum, costiera, ristoranti, ecc.) |

Altre pagine `public/*.html` restano servite tal quali in fase 1 (nessuna rottura link/QR). Il refactoring Next le linka, non le duplica.

## 3. Design tokens attuali (da preservare)

```css
--ottanio:#3a5a40; --ottanio-dark:#22331f; --ottanio-soft:#e7ede3;
--white:#fff; --milk:#f6f4ec; --cream:#f6f4ec; --sand:#f7f2e2; --gold:#caa75d;
--text:#2b3327; --muted:#5f6a5b;
Fonts: Fraunces (h1/h2/h3, serif) + Poppins (body), via Google Fonts.
Radius: 28px (legacy) → 14px (polish) · Shadow: 0 18px 50px rgba(34,51,31,.20) → none (polish).
Focus: outline 3px solid var(--ottanio) / #caa75d, offset 2-4px.
```

`guide-polish.css` è il riferimento visivo più recente (card bianche, tile 4-col, journey-tabs, step-strip, checkout-headline 60px Fraunces). Il refactoring eredita questi valori come semantic tokens (vedi `03-DESIGN-SYSTEM.md`).

## 4. i18n attuale

- 5 lingue: `it,en,es,fr,de`. Pattern: `data-it/data-en/...` + `data-XX-html` per HTML ricco + `translatePage(lang)` in ogni pagina + `localStorage guestGuideLang` + `?lang=` + `#lang`.
- Eccezione parcheggio: `parkingImg.src = assets/parcheggio{suffisso}.png` con mappa `{it:giardino, en:inglese, es:spagnolo, fr:francese}` (de → fallback giardino). Requisito utente: mantenere immagini per-lingua.
- Contatti invarianti in tutte le lingue: Asja `tel:+393923064010` / `wa.me/393923064010`, Ambra `tel:+393397009276` / `wa.me/393397009276`, `mailto:acasadimarco17@gmail.com`, emergenze `tel:118`, `tel:112`.

## 5. Comportamenti JS da reimplementare in React (senza cambiare testi)

1. Salva-guida (Add to Home Screen): `saveGuideBtn` → toggle box Android/iPhone (testi per-lingua già in `index.html:1277-1291`).
2. Check-in selector: `showCheckinPanel('presenza'|'self')` → toggle `.active/.show`.
3. Self steps: 7 `arrival-step` + `step-strip` + `arrival-prev/next` + `arrival-step-count`.
4. Checkout checklist: 9 checkbox `data-check-key` + progress track/fill + `check-complete-message` + confetti + `localStorage checkoutChecklist_{lang}`.
5. Weather: Open-Meteo fetch + cache `salernoWeatherCache` + umbrella alert. In Next: client component con `fetch` + `localStorage`, skeleton + fallback.
6. Guest welcome / stay reminder / late-offer: `localStorage guestName/guestType/guestCheckin/guestCheckout` + banner. In Next: preservare chiavi storage per non rompere link personalizzati esistenti.

## 6. Vincoli espliciti utente

- Testi e immagini: copia verbatim, nessun rewrite.
- Contrasto: ogni scritta ≥4.5:1 sullo sfondo (light + dark verificati).
- Stack: Next.js + React + shadcn + Tailwind + TypeScript. SlideTabs con `framer-motion`, carosello con `swiper/effect-creative`, resto con shadcnblocks.
- Nav: sinistra brand `Guida per gli Ospiti` + voci `Check-In / Permanenza / Check-Out`, destra 3 pulsanti icona (lingua/translator → dropdown, telefono → card contatti overlay, sole/luna → tema).
- Home: sotto navbar bottone salva-guida; hero immagine `garden-main.jpg` con titolo `A Casa di Marco` a sinistra centrato verticalmente; sotto hero messaggio benvenuto + pettirosso + `Chi è Marco?`.
- Check-In: maps button centrale prima della scelta; scelta presenza/self; carosello card (immagine sopra, testo sotto); presenza = 1 card cancello; self = 7 card come da spec + keybox steps raggruppati per punti + parcheggio per-lingua + chiavi/telecomando finale.
- Check-Out: stesso contenuto attuale + immagine checkout + `Inviateci un messaggio` → link WhatsApp.
- Best practices + CI/CD + file `.md` di struttura.

## 7. Rischi e decisioni

| Rischio | Mitigazione |
|---|---|
| `app/page.tsx` redirect rompe App Router | Nuova `/` Next renderizza Home; redirect legacy spostato solo per `?g=` gestione? No: mantenere `/gestione` intatta, Home Next a `/`. Vecchi `public/index.html` resta come fallback statico ma non più entry primaria. |
| vinext vs `next dev` | Non cambiare toolchain in questo refactor; `scripts/run-framework.mjs` resta. CI esegue `lint + tsc + build`. |
| Swiper + RSC | Carosello solo `"use client"`, `ssr:false` via `next/dynamic` se necessario. |
| Contrasto dark | Token semantici separati light/dark, mai hex hardcoded nei componenti (validator in CI). |
| Traduzioni mancanti (de parcheggio, ecc.) | Fallback `it` esplicito, tipizzato in `lib/i18n`. |
