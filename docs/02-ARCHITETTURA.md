# 02 — Architettura target (Next.js + React + shadcn + Tailwind)

## 2.1 Struttura cartelle

```
app/
  layout.tsx            # html lang dinamico, fonts, ThemeProvider, metadata base
  globals.css           # Tailwind v4 + @theme tokens + varianti dark + focus + reduced-motion
  page.tsx              # Home (server, dizionario via cookie/header lang)
  check-in/page.tsx     # Check-In (server shell + client interattivo)
  check-out/page.tsx    # Check-Out (server + client checklist)
  permanenza/page.tsx   # Hub link a public/*.html esistenti
  gestione/             # INVARIATO (host)
  api/                  # INVARIATO
components/
  site-header.tsx       # navbar: brand + SlideTabs + lingua/telefono/tema
  ui/slide-tabs.tsx     # SlideTabs adattato (props, framer-motion)
  checkin-carousel.tsx  # Swiper creative (client-only)
  save-guide-button.tsx # Add-to-Home (verbatim)
  hero.tsx              # hero garden-main + titolo sinistra
  marco-story.tsx       # Chi è Marco? + pettirosso
  contacts-dialog.tsx   # card contatti overlay (shadcn Dialog)
  language-menu.tsx     # dropdown lingue (shadcn DropdownMenu)
  theme-toggle.tsx      # sole/luna (next-themes + lucide Sun/Moon)
  checkout-checklist.tsx# checklist 9 item + progress + confetti
  ui/*                  # shadcn esistenti (button, card, dialog, dropdown-menu, carousel, ecc.)
lib/
  site.ts               # costanti: MAPS_URL, WHATSAPP, telefoni, email
  i18n.ts               # type Lang='it'|'en'|'es'|'fr'|'de', dictionaries, fallback it
  utils.ts              # cn() esistente
docs/                   # 00..05
scripts/
  check-contrast.mjs    # verifica 4.5:1 light/dark
public/assets/*         # INVARIATI, riuso diretto
```

## 2.2 Routing e i18n

- Nessuna libreria router esterna: App Router (`/`, `/check-in`, `/permanenza`, `/check-out`).
- Lingua: query `?lang=` + cookie `guestGuideLang` + `localStorage` (client) — stesse chiavi dello statico per non rompere link personalizzati. Server legge cookie/header, client sincronizza.
- `generateMetadata` per route con titolo/descrizione verbatim per lingua di default IT.
- Vecchi `public/checkin.html`, `check-in-out.html`, `index.html` restano serviti (retrocompatibilità QR). Redirect `app/page.tsx` rimosso: la Home Next è la nuova `/`.

## 2.3 Componenti richiesti dall'utente (integrazione)

### SlideTabs (`components/ui/slide-tabs.tsx`)
- Basato sul codice fornito, ma **props-driven**: `{ tabs: {id,label}[], value, onChange }` invece di `["Home","Pricing",...]` hardcoded.
- `framer-motion` per `Cursor` (`motion.li` animate left/width/opacity). Misura via `offsetLeft + getBoundingClientRect().width`, ricalcolo su `value` + resize + fonts.ready.
- Stili: `rounded-full border-2` ma con token semantici (`border-border bg-card`), testo `uppercase` con `mix-blend-difference` solo se contrasto verificato; altrimenti `text-foreground`. Focus-visible oro.
- Voci: Home→`/`, Check-In→`/check-in`, Permanenza→`/permanenza`, Check-Out→`/check-out`. Brand separato a sinistra (`Guida per gli Ospiti`), non dentro SlideTabs.

### Carosello Check-In (`components/checkin-carousel.tsx`)
- Basato su `Carousel_005` fornito (Swiper `EffectCreative + Pagination`, `creativeEffect prev:[0,0,-400] next:["100%",0,0]`), ma **content-driven**: `{ slides: {image, alt, title, bodyBullets[]}[] }`.
- Slide layout: immagine sopra (`aspect-[4/3] object-cover`, `contain` per keybox/parcheggio come originale), testo sotto. Niente `images/x.com/*` stock: solo `assets/*` verbatim.
- `"use client"`, import `swiper/css*` una sola volta, `loop` solo se >1 slide, `autoplay:false` default (rispetto reduced-motion + leggibilità istruzioni).
- Controlli: pagination clickable + prev/next (`ChevronLeft/Right` lucide) + contatore `X / N` + dots accessibili (`aria-pressed` come `step-strip` originale).

### Altri blocchi
- Solo shadcnblocks: `Button`, `Card`, `Dialog` (contatti), `DropdownMenu` (lingue), `Accordion` (keybox/telecomando dove non in carosello), `Badge`, `Progress` (checklist), `Separator`, `Sheet` (menu mobile).

## 2.4 Theming (light/dark)

- `next-themes` `ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}` (scelta esplicita utente via sole/luna, persistita).
- Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));` + `@theme { --color-*: ... }` mappati su CSS vars semantiche. Mai hex nei componenti.
- Immagini invariate; overlay/gradienti rinforzati in dark per mantenere 4.5:1.

## 2.5 Accessibilità e contrasto (non negoziabili)

- Ogni testo: `text-foreground` su `bg-background/card/muted` verificato ≥4.5:1 in entrambi i temi.
- Icone sole/luna, telefono, translator (lucide `Sun`, `Moon`, `Phone`, `Languages`): `aria-label` per-lingua, target ≥44px, `aria-expanded` su menu/dialog.
- Carosello: `aria-roledescription="carousel"`, `aria-live="polite"` sul contatore, pause con reduced-motion, tastiera ←/→.
- Focus: `:focus-visible { outline:3px solid var(--color-focus); outline-offset:2px }`.

## 2.6 CI/CD e qualità

- Workflow `ci.yml`: `pnpm install --frozen-lockfile` → `eslint` → `tsc --noEmit` → `check-contrast` → `build`.
- Niente `console.log`, niente `any` implicito, `cn()` per classi, `next/image` per LCP (`garden-main.jpg` priority).
- `/gestione` e `lib/stays.ts` esclusi dal refactor pubblico; smoke test login dopo ogni PR.
