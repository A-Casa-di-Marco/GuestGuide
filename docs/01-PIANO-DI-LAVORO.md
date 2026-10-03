# 01 — Piano di lavoro (refactoring a regola d'arte)

> Principio: **strangler pattern**. Mai big-bang. Ogni fase è deployabile, i vecchi `public/*.html` restano raggiungibili finché la nuova route Next non è verificata.

## Fase 0 — Fondazioni ✅ completata e verificata

- [x] Analisi codebase (`00-ANALISI-CODEBASE.md`).
- [x] `docs/02-ARCHITETTURA.md`, `03-DESIGN-SYSTEM.md`, `04-CONTENUTI.md`, `05-BEST-PRACTICES-CICD.md`, `i18n-keys.md`.
- [x] Design tokens light/dark + Fraunces/Poppins in `app/globals.css` (Tailwind v4 `@theme` + `@custom-variant dark`).
- [x] `ThemeProvider` (next-themes, `attribute="class"`, `defaultTheme="light"`).
- [x] `lib/site.ts` + dizionari verbatim generati da `scripts/build-content.mjs` → `lib/content-index.generated.ts` (103 voci home) + `lib/content-checkin.generated.ts` (86 voci check-in/out), alias semantici in `lib/content-home.ts` / `lib/content-checkin.ts`, split per-route per non appesantire i bundle client.
- [x] `components/ui/slide-tabs.tsx` (props-driven, link con `aria-current`) + `components/checkin-carousel.tsx` (Swiper creative, client-only, immagini sopra/testo sotto, supporto multi-foto e sezioni).
- [x] `components/site-header.tsx` (brand + SlideTabs + lingua/telefono/tema), dialog contatti, dropdown lingue.
- [x] Routes: `app/page.tsx` (Home), `app/check-in/page.tsx`, `app/check-out/page.tsx`, `app/permanenza/page.tsx` (hub). `app/sitemap.ts`, `app/robots.ts`, `app/index.html/route.ts` (redirect compatibilità vecchi link, inclusi `?g=`).
- [x] Legacy: `public/index.html` spostato in `public/index-legacy.html` (invariato e browsabile); `public/*.html` profonde invariate. Link `/gestione` ora genera `/?g=` (supportato dalla nuova Home via `/api/guide`).
- [x] Deps: `framer-motion`, `swiper`.
- [x] CI: `.github/workflows/ci.yml` (install, eslint, tsc, validate-tokens, check-contrast, build).
- [x] Verifiche: contrasto 10/10 ≥4.5:1, `tsc`/`eslint`/`validate-tokens` verdi, `build` verde, preview produzione verificata (`/` IT+EN, `/check-in` ES, `/check-out` DE, `/index.html` 307, `/gestione` 200).

## Fase 1 — Home completa ✅ implementata (QA automatica verde, QA visiva da fare)

1. [x] Hero: `assets/garden-main.jpg` full-bleed, titolo `A Casa di Marco` a sinistra centrato verticalmente, overlay gradiente per contrasto (+ `fetchPriority="high"` per LCP).
2. [x] Sotto navbar: `SaveGuideButton` (testi verbatim 5 lingue).
3. [x] Benvenuto + `GuestWelcome` (stesse chiavi localStorage + `?g=` via `/api/guide`) + banner check-in/check-out/late-offer + meteo Salerno (client, Open-Meteo, cache `salernoWeatherCache`).
4. [x] `MarcoStory`: testi verbatim 5 paragrafi + firma + `pettirosso1.png` + caption.
5. [x] Footer verbatim + fasi soggiorno + griglia 12 guide.
6. [ ] QA visiva (richiede browser): 375px/768px/1280px, toggle light/dark, keyboard, screen reader, Lighthouse ≥90. QA automatica eseguita: 5 lingue via SSR, contrasto, reduced-motion CSS, `aria-*` presenti (vedi Fase 5).

## Fase 2 — Check-In (carosello) ✅ implementata

1. [x] `MapsButton` centrale (link verbatim) visibile prima della scelta + card WhatsApp difficoltà.
2. [x] `CheckinChoice` (2 card 🤝/🔑, testi verbatim, `aria-pressed`).
3. [x] Presenza → sezione pre-arrivo (2 bullet) + foto badgiata + 1 card carosello `Al check-in` (5 bullet verbatim).
4. [x] Self → 8 card (spec utente: guida KeyBox in card dedicata): Ritira chiavi (doppia foto) → Guida KeyBox 1705 (6 punti + nota) → Cancello condominiale B + sinistra → Destra → Cancello casa → Tasto A → Parcheggio (img per-lingua) → Chiavi/telecomando (3 sezioni + `manuale-chiavi.jpg` + `serratura.jpeg` + note).
5. [x] Ogni card: immagine sopra (aspect 4/3, cover/contain come originale), testo sotto. Swiper `effect-creative`, pagination clickable, no autoplay, keyboard abilitata.
6. [x] Stepper accessibile (prev/next + contatore `aria-live` + dots) come fallback a `step-strip`.

## Fase 3 — Check-Out ✅ implementata

1. [x] Headline `Check-out entro le 10:00` + nota chiavi (verbatim) + foto `cancello-check-in.jpg` + badge `📬 Cassetta in alto a destra`.
2. [x] Lista 7 bullet verbatim, con `un messaggio per confermare il check-out` linkato a WhatsApp (`linkifyStrong`, parole invariate).
3. [x] Checklist 9 item + progress `role="progressbar"` + confetti (solo su completamento, mai con reduced-motion) + `Avvisa della partenza su WhatsApp` + storage `checkoutChecklist_{lang}` come legacy.
4. [x] Penale rifiuti 50€ e tolleranza 15min/20€ verbatim (nessuna riformulazione legale).

## Fase 4 — Permanenza (hub, non rewrite) ✅ implementata

- [x] Pagina hub con tile multilingua verso `manuale.html`, `regole.html`, `luoghi.html`, `mangiare.html`, `trasporti.html`, `spesa.html`, `parcheggio.html`, `itinerario.html`, `colazione.html`, `farmacie-emergenze.html` (stessi href relativi, `?lang=` preservato).
- [x] Nessuna duplicazione contenuti; migrazione completa a Next in fase successiva solo se richiesta.

## Fase 5 — Hardening & CI/CD 🔄 automatica verde, resta QA visiva manuale

- [x] `eslint`, `tsc --noEmit`, `pnpm build` in CI su ogni push/PR + preview Cloudflare.
- [x] `validate-tokens` (no hex hardcoded fuori `globals.css`), `check-contrast` (4.5:1), `fetchPriority` hero per LCP, `sitemap.ts`/`robots.ts`.
- [x] QA automatica: 4 route × 5 lingue via SSR su preview produzione, `aria-current`/`aria-live`/`progressbar`/`pressed`/`expanded` presenti, `prefers-reduced-motion` in CSS, focus-visible oro, legacy profonde integre, `/gestione` 200.
- [ ] Test manuali (richiedono browser fisico): 5 lingue × 2 temi × 3 viewport; screen reader (etichette icone); tastiera (focus-visible oro); Lighthouse ≥90.

## Definition of Done (ogni fase)

1. Testi identici a `public/*.html` (diff su stringhe IT di riferimento).
2. Immagini dagli stessi path `assets/*` (niente Unsplash/stock).
3. Contrasto verificato light+dark.
4. `pnpm lint && pnpm exec tsc --noEmit && pnpm build` verdi.
5. Nessuna regressione su `/gestione` e API.

## Comandi

```bash
pnpm install
pnpm add framer-motion swiper
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm dev
```

## Report QA automatica (2026-10-03, preview produzione porta 8788)

- Matrice 4 route x 5 lingue via SSR byte-exact (script qa-utf8.py, 16/16 PASS): Home IT/EN/ES/FR/DE (Chi e Marco?/Who is Marco?/...), check-in ES/EN/FR/DE, check-out IT/EN/ES/FR/DE, permanenza IT/EN, legacy checkin.html/manuale.html/index-legacy.html integre.
- Rotte tecniche: /sitemap.xml 200, /robots.txt 200, /index.html?lang=it 307 -> /, /gestione 200.
- A11y strutturale: ria-current=page, ria-label lingua/contatti, ria-live contatore, ole=progressbar presenti nel markup SSR.
- CSS build (dist/client/_next/static/css): varianti .dark x142, token warning, prefers-reduced-motion, focus-visible oro, font Fraunces presenti.
- Nota: i check PowerShell su stringhe non-ASCII danno falsi FAIL per encoding console (mojibake); usare lo script Python per verifiche byte-exact.
- Resta manuale (browser fisico): viewport 375/768/1280, toggle tema, tastiera/screen reader, Lighthouse >=90.
