"use client";

import { useEffect, useState } from "react";
import { lateOffer, lateOfferTariffs, tHome } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { WHATSAPP_ASJA } from "@/lib/site";
import { withLang } from "@/lib/lang-server";
import { THome } from "@/components/t-home";

type Profile = { name: string; checkin: string; checkout: string };

const WELCOME: Record<Lang, string> = {
  it: "Benvenuti, ",
  en: "Welcome, ",
  es: "Bienvenidos, ",
  fr: "Bienvenue, ",
  de: "Willkommen, ",
};

const WELCOME_SUB: Record<Lang, string> = {
  it: "Siamo felici di ospitarvi e speriamo che possiate sentirvi davvero a casa. In questa guida troverete tutte le informazioni utili per vivere al meglio il vostro soggiorno.",
  en: "We are happy to host you and hope you will truly feel at home. In this guide you will find all the useful information to enjoy your stay.",
  es: "Nos alegra alojaros y esperamos que os sintáis como en casa. En esta guía encontraréis toda la información útil para disfrutar de vuestra estancia.",
  fr: "Nous sommes heureux de vous accueillir et espérons que vous vous sentirez vraiment chez vous. Dans ce guide, vous trouverez toutes les informations utiles pour profiter de votre séjour.",
  de: "Wir freuen uns, euch bei uns willkommen zu heißen, und hoffen, dass ihr euch wirklich wie zu Hause fühlt. In diesem Guide findet ihr alle nützlichen Informationen, um euren Aufenthalt zu genießen.",
};

const STANDARD_SUB: Record<Lang, string> = {
  it: "La vostra guida digitale per il soggiorno ad A Casa di Marco",
  en: "Your digital guide for your stay at A Casa di Marco",
  es: "Vuestra guía digital para la estancia en A Casa di Marco",
  fr: "Votre guide numérique pour votre séjour à A Casa di Marco",
  de: "Euer digitaler Guide für euren Aufenthalt bei A Casa di Marco",
};

function readProfile(): Profile {
  if (typeof window === "undefined") return { name: "", checkin: "", checkout: "" };
  try {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("guestName") || "";
    const urlCheckin = params.get("checkin") || "";
    const urlCheckout = params.get("checkout") || "";
    if (urlName || urlCheckin || urlCheckout) {
      return { name: urlName, checkin: urlCheckin, checkout: urlCheckout };
    }
    return {
      name: window.localStorage.getItem("guestName") || "",
      checkin: window.localStorage.getItem("guestCheckin") || "",
      checkout: window.localStorage.getItem("guestCheckout") || "",
    };
  } catch {
    return { name: "", checkin: "", checkout: "" };
  }
}

function daysUntil(dateString: string): number | null {
  const parts = dateString.split("-");
  if (parts.length !== 3) return null;
  const target = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateString: string, lang: Lang): string {
  const parts = dateString.split("-");
  if (parts.length !== 3) return "";
  try {
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).toLocaleDateString(
      { it: "it-IT", en: "en-GB", es: "es-ES", fr: "fr-FR", de: "de-DE" }[lang],
      { day: "2-digit", month: "long", year: "numeric" },
    );
  } catch {
    return dateString;
  }
}

const REMINDER: Record<Lang, Record<string, string>> = {
  it: {
    checkinTitle: "🧳 Check-in oggi",
    checkinText: "Benvenuti! Oggi è il giorno del check-in. Vi consigliamo di leggere le Regole della casa e il Manuale della casa, così sarà tutto più semplice durante il soggiorno.",
    manual: "🏠 Apri manuale della casa",
    rules: "📋 Apri regole della casa",
    checkin: "🧳 Apri istruzioni check-in",
    checkinDate: "Data check-in: ",
    tomorrowTitle: "⏰ Promemoria check-out",
    todayTitle: "🧳 Check-out oggi",
    tomorrowText: "Domani è il giorno del check-out. Prima della partenza vi chiediamo gentilmente di aprire la sezione Check-out e completare la checklist.",
    todayText: "Oggi è il giorno del check-out. Prima di lasciare la casa, completate la checklist per controllare di non aver dimenticato nulla.",
    checkoutButton: "✅ Apri checklist check-out",
    checkoutDate: "Data check-out: ",
  },
  en: {
    checkinTitle: "🧳 Check-in today",
    checkinText: "Welcome! Today is check-in day. We recommend reading the House Rules and the House Manual, so everything will be easier during your stay.",
    manual: "🏠 Open house manual",
    rules: "📋 Open house rules",
    checkin: "🧳 Open check-in instructions",
    checkinDate: "Check-in date: ",
    tomorrowTitle: "⏰ Check-out reminder",
    todayTitle: "🧳 Check-out today",
    tomorrowText: "Tomorrow is check-out day. Before departure, please open the Check-out section and complete the checklist.",
    todayText: "Today is check-out day. Before leaving the house, please complete the checklist to make sure nothing has been forgotten.",
    checkoutButton: "✅ Open check-out checklist",
    checkoutDate: "Check-out date: ",
  },
  es: {
    checkinTitle: "🧳 Check-in hoy",
    checkinText: "¡Bienvenidos! Hoy es el día del check-in. Os recomendamos leer las Reglas de la casa y el Manual de la casa, para que todo sea más sencillo durante la estancia.",
    manual: "🏠 Abrir manual de la casa",
    rules: "📋 Abrir reglas de la casa",
    checkin: "🧳 Abrir instrucciones de check-in",
    checkinDate: "Fecha de check-in: ",
    tomorrowTitle: "⏰ Recordatorio de check-out",
    todayTitle: "🧳 Check-out hoy",
    tomorrowText: "Mañana es el día del check-out. Antes de salir, abrid la sección Check-out y completad la checklist.",
    todayText: "Hoy es el día del check-out. Antes de dejar la casa, completad la checklist para comprobar que no olvidáis nada.",
    checkoutButton: "✅ Abrir checklist de check-out",
    checkoutDate: "Fecha de check-out: ",
  },
  fr: {
    checkinTitle: "🧳 Check-in aujourd’hui",
    checkinText: "Bienvenue ! Aujourd’hui est le jour du check-in. Nous vous conseillons de lire le règlement de la maison et le manuel de la maison, afin que tout soit plus simple pendant votre séjour.",
    manual: "🏠 Ouvrir le manuel de la maison",
    rules: "📋 Ouvrir le règlement de la maison",
    checkin: "🧳 Ouvrir les instructions check-in",
    checkinDate: "Date de check-in : ",
    tomorrowTitle: "⏰ Rappel check-out",
    todayTitle: "🧳 Check-out aujourd’hui",
    tomorrowText: "Demain est le jour du check-out. Avant le départ, merci d’ouvrir la section Check-out et de compléter la checklist.",
    todayText: "Aujourd’hui est le jour du check-out. Avant de quitter la maison, complétez la checklist pour vérifier que rien n’a été oublié.",
    checkoutButton: "✅ Ouvrir la checklist check-out",
    checkoutDate: "Date de check-out : ",
  },
  de: {
    checkinTitle: "🧳 Heute Check-in",
    checkinText: "Willkommen! Heute ist der Tag des Check-in. Wir empfehlen euch, die Hausregeln und das Hausbuch zu lesen, damit während des Aufenthalts alles einfacher ist.",
    manual: "🏠 Hausbuch öffnen",
    rules: "📋 Hausregeln öffnen",
    checkin: "🧳 Check-in-Anleitung öffnen",
    checkinDate: "Check-in-Datum: ",
    tomorrowTitle: "⏰ Check-out-Erinnerung",
    todayTitle: "🧳 Heute Check-out",
    tomorrowText: "Morgen ist der Tag des Check-out. Bitte öffnet vor der Abreise den Bereich Check-out und füllt die Checkliste aus.",
    todayText: "Heute ist der Tag des Check-out. Füllt vor dem Verlassen des Hauses die Checkliste aus, um sicherzugehen, dass ihr nichts vergessen habt.",
    checkoutButton: "✅ Check-out-Checkliste öffnen",
    checkoutDate: "Check-out-Datum: ",
  },
};

export function GuestWelcome({ lang, welcomeTitleKey }: { lang: Lang; welcomeTitleKey: string }) {
  const [profile] = useState<Profile>(() => readProfile());

  useEffect(() => {
    // Sincronizza eventuali parametri URL nello storage (stesse chiavi dello statico).
    try {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get("guestName") || "";
      const urlCheckin = params.get("checkin") || "";
      const urlCheckout = params.get("checkout") || "";
      if (urlName || urlCheckin || urlCheckout) {
        window.localStorage.setItem("guestName", urlName);
        window.localStorage.setItem("guestCheckin", urlCheckin);
        window.localStorage.setItem("guestCheckout", urlCheckout);
      }
    } catch {
      /* storage non disponibile: ignora */
    }
  }, []);

  const [remote, setRemote] = useState<Profile | null>(null);
  useEffect(() => {
    // Link personalizzato dell'host (?g=uuid, come da /gestione): risolve la guida via API.
    let cancelled = false;
    try {
      const g = new URLSearchParams(window.location.search).get("g") || "";
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(g)) {
        return;
      }
      fetch(`/api/guide?g=${encodeURIComponent(g)}`)
        .then((r) => r.json() as Promise<{ stay?: Profile | null }>)
        .then((j) => {
          if (cancelled) return;
          if (j.stay) {
            setRemote({ name: j.stay.name || "", checkin: j.stay.checkin || "", checkout: j.stay.checkout || "" });
            try {
              window.localStorage.setItem("guestName", j.stay.name || "");
              window.localStorage.setItem("guestCheckin", j.stay.checkin || "");
              window.localStorage.setItem("guestCheckout", j.stay.checkout || "");
            } catch {
              /* ignora */
            }
          }
        })
        .catch(() => {
          /* guida non disponibile: resta il profilo locale */
        });
    } catch {
      /* ignora */
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const active = remote ?? profile;

  const name = active.name.trim() ?? "";
  const r = REMINDER[lang];
  const checkinDays = active.checkin ? daysUntil(active.checkin) : null;
  const checkoutDays = active.checkout ? daysUntil(active.checkout) : null;

  const showCheckinBanner = checkinDays === 0;
  const showCheckoutBanner = checkoutDays !== null && checkoutDays >= 0 && checkoutDays <= 1;
  const showLateOffer = checkoutDays === 1 || checkoutDays === 2;

  return (
    <>
      <section
        aria-label={tHome(welcomeTitleKey, lang)}
        className="mt-6 rounded-[22px] border-l-[6px] border-l-primary bg-secondary p-4 text-secondary-foreground"
      >
        <h2 className="font-serif text-3xl leading-tight">
          {name ? `${WELCOME[lang]}${name}` : tHome(welcomeTitleKey, lang)}
        </h2>
        <p className="m-0 mt-1 max-w-3xl text-sm leading-relaxed">
          {name ? WELCOME_SUB[lang] : STANDARD_SUB[lang]}
        </p>
      </section>

      {showCheckinBanner ? (
        <div className="mt-5 rounded-[24px] border border-border border-l-[6px] border-l-primary bg-accent p-5 text-accent-foreground">
          <h2 className="font-serif text-3xl">{r.checkinTitle}</h2>
          <p className="mt-2 max-w-3xl text-[15px]">{r.checkinText}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <a href={withLang("manuale.html", lang)} className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground no-underline">
              {r.manual}
            </a>
            <a href={withLang("regole.html", lang)} className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground no-underline">
              {r.rules}
            </a>
            <a href={withLang("/check-in", lang)} className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground no-underline">
              {r.checkin}
            </a>
          </div>
          <p className="mb-0 mt-2 text-[13px] opacity-80">
            {r.checkinDate}
            {formatDate(active.checkin, lang)}
          </p>
        </div>
      ) : null}

      {showCheckoutBanner ? (
        <div className="mt-5 rounded-[24px] border border-border border-l-[6px] border-l-primary bg-accent p-5 text-accent-foreground">
          <h2 className="font-serif text-3xl">
            {checkoutDays === 0 ? r.todayTitle : r.tomorrowTitle}
          </h2>
          <p className="mt-2 max-w-3xl text-[15px]">
            {checkoutDays === 0 ? r.todayText : r.tomorrowText}
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <a href={withLang("/check-out", lang)} className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground no-underline">
              {r.checkoutButton}
            </a>
          </div>
          <p className="mb-0 mt-2 text-[13px] opacity-80">
            {r.checkoutDate}
            {formatDate(active.checkout, lang)}
          </p>
        </div>
      ) : null}

      {showLateOffer ? (
        <div className="mt-5 rounded-[24px] border border-border border-l-[6px] border-l-primary bg-secondary p-5 text-secondary-foreground">
          <h2 className="font-serif text-3xl">
            <THome k={lateOffer.title} lang={lang} />
          </h2>
          <p className="mt-2 max-w-3xl text-[15px]">
            <THome k={lateOffer.text} lang={lang} />
          </p>
          <div className="mb-3 mt-3 flex flex-wrap gap-2">
            {lateOfferTariffs.map((tariff) => (
              <span
                key={tariff}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold text-card-foreground"
              >
                {tariff}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <a
              href={WHATSAPP_ASJA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground no-underline"
            >
              <THome k={lateOffer.cta} lang={lang} />
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
