# 04 — Contenuti (inventario verbatim per le 3 pagine richieste)

> Regola: copiare da `public/index.html` e `public/checkin.html` senza riscrivere. Qui solo riferimenti riga + chiavi i18n. I dizionari completi vivono in `lib/i18n.ts`.

## 4.1 Costanti sito (`lib/site.ts`)
```ts
MAPS_URL = "https://maps.app.goo.gl/tL37r51JpKZJc6j87"
WHATSAPP_ASJA = "https://wa.me/393923064010"
TEL_ASJA = "tel:+393923064010" // Asja, contatto principale
TEL_AMBRA = "tel:+393397009276" // Ambra, secondo contatto
WHATSAPP_AMBRA = "https://wa.me/393397009276"
EMAIL = "mailto:acasadimarco17@gmail.com" // acasadimarco17@gmail.com
EMERGENCY_118 = "tel:118" // sanitaria
EMERGENCY_112 = "tel:112" // generale
HERO_IMG = "/assets/garden-main.jpg" // servito da public/assets (path assoluto in Next)
ROBIN_IMG = "/assets/pettirosso1.png"
```

Parcheggio per-lingua: `{ it: "/assets/parcheggiogiardino.png", en: "/assets/parcheggioinglese.png", es: "/assets/parcheggiospagnolo.png", fr: "/assets/parcheggiofrancese.png", de: fallback it }` (nessun asset tedesco in `public/assets/`, fallback documentato).

## 4.2 Home (`/`)

| Blocco | Fonte | Note |
|---|---|---|
| Brand nav | `index.html:1240-1242` | `Guida per gli ospiti` (it) + traduzioni data-* |
| Hero img + titolo sinistra | `index.html:1238-1250` + `assets/garden-main.jpg` | Layout nuovo: titolo a sinistra centrato verticalmente (richiesta utente), non bottom come attuale |
| Save guide btn + box | `index.html:1267-1292` | Testi Android/iPhone 5 lingue verbatim |
| Benvenuto | `index.html:1293-1297` + `guestWelcomeBox` | `Benvenuti` + sottotitolo guida digitale; mantenere chiavi storage `guestName/guestType/guestCustom/checkin/checkout` |
| Meteo | `index.html:1317-1334` | Open-Meteo Salerno, box + umbrella alert verbatim |
| Contatti card (anche in Dialog header) | `index.html:1336-1384` | Asja/Ambra/Email + 118/112 verbatim |
| Marco story | `index.html:1385-1420` | `Chi è Marco?` + greeting + 5 paragrafi + firma `— Stefania, Ambra, Asja` + `pettirosso1.png` + caption verbatim |
| Footer | `index.html:1422-1429` | `A Casa di Marco – Guida ospiti · Garden Cottage Escape · Salerno` + ringraziamento |

## 4.3 Check-In (`/check-in`)

| Stato | Contenuto verbatim | Immagine |
|---|---|---|
| Pre-scelta | `📍 Raggiungi la casa su Google Maps` → `MAPS_URL` (`checkin.html:772`) | — |
| Scelta | `Check-in in presenza / Vi aspettiamo al cancello` 🤝 + `Self check-in / Arrivo in autonomia con la KeyBox` 🔑 (`739-750`) | — |
| Presenza (1 card) | Prima di arrivare: orario anticipato + 30 min (`753-756`); Al check-in: cancello struttura + documenti tutti inclusi bambini + tassa 3€/die <11 esclusi + cauzione Booking 100€ bonifico 48h + pagamenti bonifico/PayPal/contanti no POS (`763-769`) | `cancello-check-in.jpg` + badge `🚪 Qui davanti al cancello` + `📬 Cassetta "A Casa di Marco"` (`757-761`) |
| Self 1 Ritira chiavi | `Arrivati davanti al cancello principale... codice 1705, come mostrato in foto.` (`773`) + KeyBox steps 6 punti + nota richiudi/sposta rotelle (`783-790`) | `cancello-check-in.jpg` + `keyboxcancello.jpeg` + `keybox.png` |
| Self 2 Cancello condominiale | `pulsante B... Dopo la discesa, al bivio andate a sinistra.` (`794-795`) | `giraasinistra.png` |
| Self 3 Fine strada destra | `Alla fine della strada voltate a destra.` (`799`) | `giraadestra.png` |
| Self 4 Trova cancello casa | `La casa è il primo cancello sulla destra.` (`803`) | `cancellocerchiato.png` |
| Self 5 Apri cancello casa | `Per aprire il cancello della casa, premete il tasto A del telecomando attaccato alle chiavi.` (`807`) | `cancello-casa.jpeg` |
| Self 6 Parcheggia | `Parcheggiate l'auto all'interno del giardino nella zona pavimentata, facendo attenzione a non superare il giardino.` (`811`) | per-lingua (vedi 4.1) |
| Self 7 Chiavi/telecomando | `🔑 Istruzioni uso chiavi e telecomando` + `manuale-chiavi.jpg` + Importante smarrimento/penale + Tasto A/B/C-D + Chiave lunga (alto+sinistra) + `serratura.jpeg` + Altra chiave cancelletto + nota cassetta lettere (`815-836`) | `manuale-chiavi.jpg`, `serratura.jpeg` |

Ogni card carosello: immagine sopra + testo sotto (richiesta utente). Keybox/telecomando restano liste per punti dentro la slide (non accordion separato).

## 4.4 Check-Out (`/check-out`)

| Blocco | Fonte |
|---|---|
| Headline | `Check-out entro le 10:00` + `Salvo diversi accordi. Le chiavi vanno nella cassetta delle lettere "A Casa di Marco", quella della posta, non nella KeyBox.` (`checkin.html:846`) |
| Foto | `cancello-check-in.jpg` + badge `📬 Cassetta in alto a destra` (`847-850`) |
| Bullet 1-7 | `entro le ore 10:00` + `Tolleranza di 15 minuti... primi 20 €... deposito cauzionale` + `luci, rubinetti, condizionatore e termosifoni` + `asciugamani... cesta dei panni sporchi` + `rifiuti... bidoni condominiali... differenziata... fino a 50 €... sanzioni comunali Salerno` + `cassetta lettere... NON è la KeyBox` + `Inviateci un messaggio per confermare il check-out` con **link WhatsApp** (`852-858`) |
| Checklist | 9 item `Ho spento... Ho chiuso...` + progress + `Avvisa della partenza su WhatsApp` + `🎉 Tutto fatto...` + `Grazie!...` (`860-879`) |

`Inviateci un messaggio` deve essere `<a href={WHATSAPP}>` (richiesta utente), non testo statico.

## 4.5 Permanenza (`/permanenza`, hub fase 1)

Tile con stessi titoli delle statiche: Manuale della casa, Regole, Luoghi, Mangiare, Trasporti, Spesa, Parcheggio, Itinerario, Colazione, Farmacie/Emergenze → href `manuale.html?lang=...` ecc. (relativi, preservando `?lang=`). Nessun rewrite contenuti.

## 4.6 Note di implementazione (refactor eseguito)

- Dizionari generati: 
ode scripts/build-content.mjs legge public/index.html (ora index-legacy.html) e public/checkin.html ed emette lib/content-index.generated.ts (103 voci) + lib/content-checkin.generated.ts (86 voci). Alias semantici in lib/content-home.ts / lib/content-checkin.ts (split per non caricare 73KB di testi nel bundle client). Mappa chiavi in docs/i18n-keys.md.
- Legacy: public/index.html originale conservato tale e quale in public/index-legacy.html (stesso file, solo rinominato). Era necessario: il file statico oscurava la rotta Next /. I vecchi link /index.html (inclusi ?g= e ?lang=) sono intercettati da pp/index.html/route.ts che redirige a / preservando la query. Le altre pagine legacy (checkin.html, manuale.html, ...) sono invariate.
- Link personalizzati host: /gestione genera ora /?g=<uuid> (prima /index.html?g=); la Home risolve ?g= via /api/guide e riusa le stesse chiavi localStorage dello statico.

## 4.7 Migrazione Permanenza (9/10 pagine)

- Statiche (manuale, regole, trasporti, spesa, parcheggio, farmacie-emergenze, colazione-testi): scripts/build-legacy-pages.mjs risolve il <main> in 5 varianti verbatim (sostituzione data-*, rimozione script/back-home/scroll-hint/form-ordine, rewrite asset/link con ?lang=). Output lib/legacy/<slug>.generated.ts. Verifica erify-legacy.js: 424/424 valori IT ritrovati.
- Dinamiche: scripts/build-experience-data.mjs estrae placeCategories+labels (luoghi) e categories+labels+placesWithTip+pulsanti+back-label (mangiare), validati con eval JS. Dati colazione in lib/legacy/colazione-data.generated.ts.
- Render: rotta pp/permanenza/[slug] + LegacyContent + legacy-compat.css (solo token) + isole LuoghiIsland/MangiareIsland + ColazioneForm. File legacy in public/ intatti come fallback.
- Differita: itinerario.html (planner JS 67KB) resta legacy -> Fase 6.
