# 05 — Best practices e CI/CD

## 5.1 Principi (senior standard)

1. **Evidence before synthesis**: ogni stringa UI citata con `file:riga` di `public/*.html`.
2. **Mai hex nei componenti**: solo token semantici (`bg-card text-card-foreground`). Validatore in CI.
3. **TypeScript strict**: no `any` implicito, `Lang` union, dizionari tipizzati, `Swiper` types.
4. **Client solo dove serve**: pagine server + isole `"use client"` (header, carosello, checklist, meteo, tema, lingua).
5. **A11y first**: label su icone, focus-visible oro, 44px target, reduced-motion, `aria-live` su progress/contatori.
6. **Perf**: `next/image` (hero priority, slide lazy), `dynamic(() => import(...), {ssr:false})` per Swiper, niente autoplay/animazioni pesanti su istruzioni.
7. **i18n**: fallback `it` esplicito, mai `lang || 'it'` silenzioso senza tipo; chiavi storage identiche allo statico.
8. **No stock**: solo `public/assets/*` esistenti. Vietato Unsplash generato per questa PR.
9. **Strangler**: vecchie HTML restano; ogni nuova route ha test di non-regressione su `/gestione`.

## 5.2 Branching e commit

- `main` protetto, PR con template (cosa cambia, screenshot light/dark, lingue testate, contrasto ok).
- Convenzione commit: `feat(home): hero sinistra + save-guide`, `feat(check-in): carosello self 7 slide`, `feat(check-out): checklist + whatsapp link`, `chore(ci): workflow + contrast`, `docs: 00-05`.
- Squash merge, tag `guida-vX.Y` per release host.

## 5.3 CI (`.github/workflows/ci.yml`)

```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 11 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm exec tsc --noEmit
      - run: node scripts/check-contrast.mjs
      - run: pnpm build
```

Fallisce se: lint errori, type errori, contrasto <4.5:1, build rotto.

## 5.4 Checklist pre-merge (ogni PR)

- [ ] `pnpm lint` verde
- [ ] `pnpm exec tsc --noEmit` verde
- [ ] `node scripts/check-contrast.mjs` verde (light+dark)
- [ ] `pnpm build` verde
- [ ] Screenshot 375/768/1280 light+dark allegati
- [ ] 5 lingue verificate (it/en/es/fr/de)
- [ ] Tastiera + screen reader smoke (nav, dialog contatti, carosello, checklist)
- [ ] `/gestione` login ancora funzionante
- [ ] Nessun testo riscritto (diff contro `public/*.html`)

## 5.5 Deploy

- Toolchain invariata (`scripts/run-framework.mjs` + vinext + wrangler). `pnpm build` genera `dist/server/wrangler.json`.
- Preview per PR via Workers; produzione su push `main` (policy esistente del progetto, non introdurre Vercel parallelo in questa PR).
- `sitemap.ts` + `robots.ts` per le 4 route Next; vecchie HTML escluse da sitemap ma non cancellate.
