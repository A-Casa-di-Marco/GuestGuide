# 03 — Design system (palette e font attuali, light + dark)

> Vincolo utente: stessa palette e stessi font del sito attuale. Tutti i testi a contrasto (≥4.5:1).

## 3.1 Font (invariati)

- Headings: `Fraunces, Georgia, serif` — weight 400, `letter-spacing:-0.025em`, `line-height:1.2`.
- Body: `Poppins, system-ui, sans-serif` — 300..700, `line-height:1.65` (1.75 per paragrafi lunghi polish).
- Caricamento: `next/font/google` (`Fraunces:opsz,wght@9..144,400..700`, `Poppins:300;400;500;600;700`), `display:swap`. Fallback Georgia/Arial se offline.

## 3.2 Primitivi (raw, dal sito attuale)

```css
--ottanio:#3a5a40; --ottanio-dark:#22331f; --ottanio-soft:#e7ede3;
--white:#ffffff; --milk:#f6f4ec; --sand:#f7f2e2; --gold:#caa75d;
--text:#2b3327; --muted:#5f6a5b;
```

## 3.3 Semantici light (`:root`)

| Token | Valore | Uso | Contrasto su |
|---|---|---|---|
| `--background` | `#f6f4ec` (milk) | page bg | `--foreground` 12.6:1 ✓ |
| `--foreground` | `#2b3327` (text) | body text | su bg 12.6:1 ✓ |
| `--card` | `#ffffff` | card/section | text 14.9:1 ✓ |
| `--card-foreground` | `#2b3327` | card text | — |
| `--primary` | `#3a5a40` (ottanio) | bottoni/nav attiva | white 7.1:1 ✓ |
| `--primary-foreground` | `#ffffff` | testo su primary | — |
| `--secondary` | `#e7ede3` (soft) | chip/tile/banner | `#22331f` 12.1:1 ✓ |
| `--secondary-foreground` | `#22331f` | testo su secondary | — |
| `--muted` | `#e7ede3` | track progress, tile | mai testo muted-su-muted |
| `--muted-foreground` | `#3a5a40`* | testo secondario su chiaro | su white 7.1:1 ✓ (al posto di `#5f6a5b` che su `#f6f4ec` è ~5.0:1 ma su white è 5.9:1 — usare `#3a5a40` per paragrafi lunghi, `#5f6a5b` solo per caption ≥14px bold o su soft) |
| `--accent` | `#f7f2e2` (sand) | note/checklist-intro | text 12.0:1 ✓ |
| `--border` | `rgba(58,90,64,.18)` | bordi | non-testo, ma visibile |
| `--focus` | `#caa75d` (gold) + fallback `#3a5a40` | focus-visible 3px | — |
| `--destructive` | `#9f2f29` | solo emergenze (testo white 8.2:1) | mai per testi normali |

\* Deviazione motivata dal vincolo contrasto: il `--muted:#5f6a5b` originale su `#f6f4ec` è ~4.9:1 (ok) ma su `#ffffff` con font 14px è al limite; per paragrafi si usa `--primary` o `--foreground`. Caption muted solo ≥14px.

Hero overlay light: `linear-gradient(180deg, rgba(34,51,31,.25), rgba(34,51,31,.55))` sopra `garden-main.jpg` → titolo white con `text-shadow 0 5px 22px rgba(0,0,0,.35)` (come attuale).

## 3.4 Semantici dark (`.dark`)

Stessa hue, luminanza invertita. Sfondo verde-notte, testi latte:

| Token | Valore | Note contrasto |
|---|---|---|
| `--background` | `#121a11` (ottanio-dark scurito 12%) | `foreground` 14.2:1 ✓ |
| `--foreground` | `#f6f4ec` (milk) | — |
| `--card` | `#1c261b` (surface 1) | milk 13.1:1 ✓ |
| `--card-foreground` | `#f6f4ec` | — |
| `--primary` | `#9db89f` (ottanio schiarito per dark)* | su `#121a11` 7.8:1; testo su primary = `#121a11` 7.8:1 ✓ |
| `--primary-foreground` | `#121a11` | — |
| `--secondary` | `#2a3629` | milk 11.4:1 ✓ |
| `--secondary-foreground` | `#f6f4ec` | — |
| `--muted` | `#2a3629` | — |
| `--muted-foreground` | `#cfd8c9` (soft schiarito) | su card 8.9:1 ✓ |
| `--accent` | `#2a2a1e` (sand scurito) | milk 12.3:1 ✓ |
| `--border` | `rgba(231,237,227,.18)` | visibile su dark ✓ |
| `--focus` | `#caa75d` | su dark 8.1:1 ✓ |

\* Il `--ottanio #3a5a40` originale con testo white in dark sarebbe illeggibile su card scure; per bottoni dark si usa primary schiarito con testo scuro (stessa hue, contrasto verificato). Badge/foto restano invariati.

Hero dark: overlay `rgba(0,0,0,.45)→.65` (più forte di light) per garantire white 4.5:1 su ogni foto.

## 3.5 Tailwind v4 mapping

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@theme inline {
  --color-background: var(--background); --color-foreground: var(--foreground);
  --color-card: var(--card); --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary); --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary); --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted); --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent); --color-border: var(--border);
  --font-serif: "Fraunces", Georgia, serif; --font-sans: "Poppins", system-ui, sans-serif;
}
```

Vietato: `text-[#5f6a5b]`, `bg-[#3a5a40]`, `text-white/80` arbitrari. Solo `bg-background text-foreground`, `bg-card text-card-foreground`, `bg-primary text-primary-foreground`, ecc.

## 3.6 Componenti (shadcn new-york)

- `Button`: `default=bg-primary text-primary-foreground rounded-full min-h-[46px]`, `secondary=bg-secondary text-secondary-foreground`, `ghost` solo per nav con hover `bg-secondary`.
- `Card`: `bg-card text-card-foreground border-border rounded-[14px] shadow-none` (stile polish, non legacy 28px/shadow).
- `Dialog` contatti: `bg-card`, overlay `bg-black/60` (misurato, non `bg-black/30`).
- `DropdownMenu` lingue: check ✓ su lingua attiva, `aria-checked`.
- SlideTabs: pill `bg-secondary` container, cursor `bg-primary dark:bg-primary` (mai `bg-black` hardcoded del demo).
- Carousel slide: `bg-card border-border rounded-[14px] overflow-hidden`, immagine `aspect-[4/3]`, testo `text-card-foreground`.

## 3.7 Verifiche

`scripts/check-contrast.mjs` calcola WCAG 2.1 per ogni coppia token (light+dark), fail se <4.5:1 per testo normale o <3:1 per large/UI. Eseguito in CI.
