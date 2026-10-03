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
    permanenza: { it: "Permanenza", en: "Stay", es: "Estancia", fr: "Séjour", de: "Aufenthalt" },
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
} as const;

export type UiKey = keyof typeof ui;
