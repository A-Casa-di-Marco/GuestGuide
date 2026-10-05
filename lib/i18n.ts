export type Lang = "it" | "en" | "es" | "fr" | "de";

export const LANGS: Lang[] = ["it", "en", "es", "fr", "de"];

export const LANG_LABEL: Record<Lang, string> = {
  it: "Italiano",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

export function isLang(v: unknown): v is Lang {
  return v === "it" || v === "en" || v === "es" || v === "fr" || v === "de";
}

export function parseLang(v: string | null | undefined): Lang {
  return isLang(v) ? v : "it";
}

/**
 * Testi condivisi verbatim da public/index.html + public/checkin.html.
 * Fonte indicata per ogni chiave. Nessun rewrite: copia esatta IT + traduzioni data-*.
 */
export const ui = {
  brand: {
    it: "Guida per gli Ospiti",
    en: "Guest Guide",
    es: "Guía para huéspedes",
    fr: "Guide des invités",
    de: "Gäste-Guide",
  },
  nav: {
    home: { it: "Home", en: "Home", es: "Inicio", fr: "Accueil", de: "Start" },
    "check-in": { it: "Check-In", en: "Check-in", es: "Check-in", fr: "Check-in", de: "Check-in" },
    permanenza: { it: "Soggiorno", en: "Stay", es: "Estancia", fr: "Séjour", de: "Aufenthalt" },
    "check-out": { it: "Check-Out", en: "Check-out", es: "Check-out", fr: "Check-out", de: "Check-out" },
  },
  changeLanguage: {
    it: "Cambia lingua",
    en: "Change language",
    es: "Cambiar idioma",
    fr: "Changer de langue",
    de: "Sprache ändern",
  },
  contacts: {
    it: "Contatti",
    en: "Contacts",
    es: "Contactos",
    fr: "Contacts",
    de: "Kontakte",
  },
  openContacts: {
    it: "Apri contatti",
    en: "Open contacts",
    es: "Abrir contactos",
    fr: "Ouvrir les contacts",
    de: "Kontakte öffnen",
  },
  lightTheme: { it: "Tema chiaro", en: "Light theme", es: "Tema claro", fr: "Thème clair", de: "Helles Theme" },
  darkTheme: { it: "Tema scuro", en: "Dark theme", es: "Tema oscuro", fr: "Thème sombre", de: "Dunkles Theme" },
  saveGuide: {
    it: "📲 Salva questa guida sul telefono",
    en: "📲 Save this guide on your phone",
    es: "📲 Guarda esta guía en tu teléfono",
    fr: "📲 Enregistrer ce guide sur le téléphone",
    de: "📲 Speichert diesen Guide auf dem Handy",
  },
  saveAndroid: {
    it: "<strong>Android:</strong> apri il menu del browser ⋮ e scegli “Aggiungi alla schermata Home”. Verrà salvato un collegamento veloce al sito.",
    en: "<strong>Android:</strong> open the browser menu ⋮ and choose “Add to Home screen”. A quick shortcut to the website will be saved.",
    es: "<strong>Android:</strong> abre el menú del navegador ⋮ y elige “Añadir a pantalla de inicio”. Se guardará un acceso rápido al sitio.",
    fr: "<strong>Android :</strong> ouvrez le menu du navigateur ⋮ et choisissez “Ajouter à l’écran d’accueil”. Un raccourci rapide vers le site sera enregistré.",
    de: "<strong>Android:</strong> öffnet das Browsermenü ⋮ und wählt „Zum Startbildschirm hinzufügen“. Es wird eine Schnellverknüpfung zur Website gespeichert.",
  },
  saveIPhone: {
    it: "<strong>iPhone:</strong> apri il sito con Safari, premi Condividi e scegli “Aggiungi alla schermata Home”.",
    en: "<strong>iPhone:</strong> open the site with Safari, tap Share and choose “Add to Home Screen”.",
    es: "<strong>iPhone:</strong> abre el sitio con Safari, toca Compartir y elige “Añadir a pantalla de inicio”.",
    fr: "<strong>iPhone :</strong> ouvrez le site avec Safari, touchez Partager puis “Ajouter à l’écran d’accueil”.",
    de: "<strong>iPhone:</strong> öffnet die Website mit Safari, tippt auf Teilen und wählt „Zum Startbildschirm hinzufügen“.",
  },
  enlargeImage: {
    it: "Ingrandisci immagine",
    en: "Enlarge image",
    es: "Ampliar imagen",
    fr: "Agrandir l’image",
    de: "Bild vergrößern",
  },
  closeViewer: {
    it: "Chiudi visualizzazione",
    en: "Close viewer",
    es: "Cerrar vista",
    fr: "Fermer la vue",
    de: "Ansicht schließen",
  },
  zoomIn: { it: "Ingrandisci", en: "Zoom in", es: "Acercar", fr: "Zoom avant", de: "Vergrößern" },
  zoomOut: { it: "Riduci", en: "Zoom out", es: "Alejar", fr: "Zoom arrière", de: "Verkleinern" },
  previousSlide: {
    it: "Card precedente",
    en: "Previous card",
    es: "Tarjeta anterior",
    fr: "Carte précédente",
    de: "Vorherige Karte",
  },
  nextSlide: {
    it: "Card successiva",
    en: "Next card",
    es: "Tarjeta siguiente",
    fr: "Carte suivante",
    de: "Nächste Karte",
  },
  regoleSlideTitle: {
    it: "Regole della casa",
    en: "House rules",
    es: "Normas de la casa",
    fr: "Règles de la maison",
    de: "Hausregeln",
  },
  regoleSlideLead: {
    it: "Prima di proseguire, prendi visione delle <strong>regole della casa</strong>.",
    en: "Before continuing, please read the <strong>house rules</strong>.",
    es: "Antes de continuar, lee las <strong>normas de la casa</strong>.",
    fr: "Avant de continuer, consultez les <strong>règles de la maison</strong>.",
    de: "Bevor Sie fortfahren, lesen Sie bitte die <strong>Hausregeln</strong>.",
  },
  regoleSlideHint: {
    it: "Nella sezione <strong>La Casa</strong> trovi le istruzioni su come funzionano tutte le cose in casa.",
    en: "In the <strong>The House</strong> section you will find instructions on how everything in the house works.",
    es: "En la sección <strong>La Casa</strong> encontrarás las instrucciones de cómo funcionan las cosas de la casa.",
    fr: "Dans la section <strong>La Maison</strong>, vous trouverez les instructions sur le fonctionnement de la maison.",
    de: "Im Abschnitt <strong>Das Haus</strong> finden Sie Anleitungen, wie alles im Haus funktioniert.",
  },
  regoleSlideConfirm: {
    it: "Quando hai finito, mandaci un messaggio per confermare di aver preso completa visione del regolamento e di accettarlo.",
    en: "When you are done, send us a message confirming that you have fully read and accept the regulations.",
    es: "Cuando termines, envíanos un mensaje confirmando que has leído por completo y aceptas el reglamento.",
    fr: "Quand vous avez terminé, envoyez-nous un message confirmant que vous avez pris complète connaissance du règlement et que vous l'acceptez.",
    de: "Wenn Sie fertig sind, senden Sie uns eine Nachricht zur Bestätigung, dass Sie die Ordnung vollständig gelesen und akzeptiert haben.",
  },
  btnRules: {
    it: "Regole della casa",
    en: "House rules",
    es: "Normas de la casa",
    fr: "Règles de la maison",
    de: "Hausregeln",
  },
  btnLaCasa: {
    it: "La Casa",
    en: "The House",
    es: "La Casa",
    fr: "La Maison",
    de: "Das Haus",
  },
  btnWhatsappAck: {
    it: "Ho preso visione delle regole",
    en: "I have read the rules",
    es: "He leído las normas",
    fr: "J'ai lu les règles",
    de: "Ich habe die Regeln gelesen",
  },
  btnEmailAck: {
    it: "Conferma via email",
    en: "Confirm by email",
    es: "Confirmar por correo",
    fr: "Confirmer par e-mail",
    de: "Per E-Mail bestätigen",
  },
  waAckMessage: {
    it: "Ciao! Ho preso completa visione del regolamento della casa e lo accetto.",
    en: "Hi! I have fully read and accept the house regulations.",
    es: "¡Hola! He leído por completo el reglamento de la casa y lo acepto.",
    fr: "Bonjour ! J'ai pris complète connaissance du règlement de la maison et je l'accepte.",
    de: "Hallo! Ich habe die Hausordnung vollständig gelesen und akzeptiere sie.",
  },
  emailAckSubject: {
    it: "L'ospite ha preso completa visione del regolamento della casa e lo accetta",
    en: "The guest has fully read and accepts the house regulations",
    es: "El huésped ha leído por completo el reglamento de la casa y lo acepta",
    fr: "L'invité a pris complète connaissance du règlement de la maison et l'accepte",
    de: "Der Gast hat die Hausordnung vollständig gelesen und akzeptiert sie",
  },
} as const;

export type UiKey = keyof typeof ui;
