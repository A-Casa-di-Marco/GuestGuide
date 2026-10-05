"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { CheckinCarousel, type CheckinSlide } from "@/components/checkin-carousel";
import { LanguageSync } from "@/components/language-sync";
import { EMAIL_HREF, MAPS_URL, PARKING_IMG_BY_LANG, WHATSAPP_ASJA } from "@/lib/site";
import { checkin, tCheckin } from "@/lib/content-checkin";
import { parseLang, ui, type Lang } from "@/lib/i18n";
import { TCheckin } from "@/components/t-checkin";
import { cn } from "@/lib/utils";

function bullets(keys: readonly string[], lang: Lang): string[] {
  return keys.map((k) => tCheckin(k, lang));
}

function presenzaCard(lang: Lang): CheckinSlide[] {
  return [
    {
      id: "presenza",
      eyebrow: tCheckin(checkin.choiceInTitle, lang),
      title: tCheckin(checkin.inSection2, lang),
      image: "/assets/cancello-check-in.jpg",
      imageAlt: tCheckin(checkin.inBadgeGate, lang),
      bullets: bullets(
        [checkin.inB3, checkin.inB4, checkin.inB5, checkin.inB6, checkin.inB7],
        lang,
      ),
    },
  ];
}

function selfSlides(lang: Lang): CheckinSlide[] {
  return [
    {
      id: "chiavi",
      eyebrow: `1 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.s1Title, lang),
      image: "/assets/cancello-check-in.jpg",
      imageAlt: tCheckin(checkin.inBadgeGate, lang),
      bullets: [tCheckin(checkin.s1Lead, lang)],
      belowImages: [{ src: "/assets/keyboxcancello.jpeg", alt: "KeyBox", contain: true }],
    },
    {
      id: "keybox",
      eyebrow: `2 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.keyboxTitle, lang),
      image: "/assets/keybox.png",
      imageAlt: "KeyBox",
      contain: true,
      bullets: bullets(checkin.keyboxSteps, lang),
      note: tCheckin(checkin.keyboxNote, lang),
    },
    {
      id: "condominiale",
      eyebrow: `3 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.s2Title, lang),
      image: "/assets/giraasinistra.png",
      imageAlt: tCheckin(checkin.s2Title, lang),
      contain: true,
      bullets: bullets([checkin.s2B1, checkin.s2B2], lang),
    },
    {
      id: "destra",
      eyebrow: `4 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.s3Title, lang),
      image: "/assets/giraadestra.png",
      imageAlt: tCheckin(checkin.s3Title, lang),
      contain: true,
      bullets: bullets([checkin.s3B1], lang),
    },
    {
      id: "cancello-casa",
      eyebrow: `5 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.s4Title, lang),
      image: "/assets/cancellocerchiato.png",
      imageAlt: tCheckin(checkin.s4Title, lang),
      contain: true,
      bullets: bullets([checkin.s4B1], lang),
    },
    {
      id: "apri-casa",
      eyebrow: `6 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.s5Title, lang),
      image: "/assets/cancello-casa.jpeg",
      imageAlt: tCheckin(checkin.s5Title, lang),
      bullets: bullets([checkin.s5B1], lang),
    },
    {
      id: "parcheggio",
      eyebrow: `7 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.s6Title, lang),
      image: PARKING_IMG_BY_LANG[lang] ?? PARKING_IMG_BY_LANG.it,
      imageAlt: tCheckin(checkin.s6Title, lang),
      contain: true,
      bullets: bullets([checkin.s6B1], lang),
    },
    {
      id: "chiavi-telecomando",
      eyebrow: `8 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: tCheckin(checkin.keysTitle, lang),
      image: "/assets/manuale-chiavi.jpg",
      imageAlt: tCheckin(checkin.keysTitle, lang),
      contain: true,
      bullets: [],
      sections: [
        {
          title: tCheckin(checkin.remoteTitle, lang),
          bullets: bullets([checkin.remoteA, checkin.remoteB, checkin.remoteCD], lang),
        },
        { title: tCheckin(checkin.longKeyTitle, lang), bullets: bullets([checkin.longKey1, checkin.longKey2], lang) },
        {
          title: tCheckin(checkin.otherKeyTitle, lang),
          bullets: bullets([checkin.otherKey1], lang),
          imageBefore: { src: "/assets/serratura.jpeg", alt: "Serratura", contain: true },
        },
      ],
      note: tCheckin(checkin.keysNote, lang),
    },
    {
      id: "regole",
      eyebrow: `9 · ${tCheckin(checkin.selfTitle, lang)}`,
      title: ui.regoleSlideTitle[lang],
      image: "/assets/regole.png",
      imageAlt: ui.regoleSlideTitle[lang],
      contain: true,
      bullets: [ui.regoleSlideLead[lang], ui.regoleSlideHint[lang], ui.regoleSlideConfirm[lang]],
      actions: [
        { label: ui.btnRules[lang], href: `/permanenza/regole?lang=${lang}` },
        { label: ui.btnLaCasa[lang], href: `/permanenza/manuale?lang=${lang}` },
        {
          label: ui.btnWhatsappAck[lang],
          href: `${WHATSAPP_ASJA}?text=${encodeURIComponent(ui.waAckMessage[lang])}`,
          external: true,
          kind: "whatsapp",
        },
        {
          label: ui.btnEmailAck[lang],
          href: `${EMAIL_HREF}?subject=${encodeURIComponent(ui.emailAckSubject[lang])}`,
          kind: "email",
        },
      ],
    },
  ];
}

function CheckInInner() {
  const params = useSearchParams();
  const lang = parseLang(params.get("lang"));
  const [mode, setMode] = useState<"presenza" | "self" | null>(null);
  const slides = mode === "presenza" ? presenzaCard(lang) : mode === "self" ? selfSlides(lang) : [];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mode) return;
    const header = document.querySelector("header");
    const offset = header ? Math.round(header.getBoundingClientRect().height) + 8 : 0;
    if (contentRef.current) contentRef.current.style.scrollMarginTop = `${offset}px`;
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mode]);

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6">
        <h1 className="text-center font-serif text-3xl text-foreground sm:text-4xl">Check-in</h1>

        <div className="mt-4 flex justify-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full max-w-md items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground no-underline"
          >
            <TCheckin k={checkin.mapsCta} lang={lang} />
          </a>
        </div>

        <div className="mx-auto mt-4 grid max-w-2xl gap-3 sm:grid-cols-2">
          {(
            [
              { id: "presenza", icon: "🤝", title: checkin.choiceInTitle, desc: checkin.choiceInDesc },
              { id: "self", icon: "🔑", title: checkin.choiceSelfTitle, desc: checkin.choiceSelfDesc },
            ] as const
          ).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setMode(c.id)}
              aria-pressed={mode === c.id}
              className={cn(
                "rounded-[12px] border p-5 text-center sm:text-left",
                mode === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-card-foreground",
              )}
            >
              <span aria-hidden className="block text-2xl">
                {c.icon}
              </span>
              <strong className="mt-1 block">
                <TCheckin k={c.title} lang={lang} />
              </strong>
              <span className="block text-sm opacity-85">
                <TCheckin k={c.desc} lang={lang} />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <a
            href={WHATSAPP_ASJA}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full max-w-md items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-center text-[15px] font-semibold text-primary-foreground no-underline"
          >
            <TCheckin k={checkin.helpCta} lang={lang} />
          </a>
        </div>

        <div ref={contentRef}>
          {mode === "presenza" ? (
            <div className="mt-6">
              <h2 className="text-center font-serif text-xl text-foreground sm:text-left sm:text-2xl">
                <TCheckin k={checkin.inSection1} lang={lang} />
              </h2>
              <ul className="mt-3 grid list-none gap-3 p-0">
                {[checkin.inB1, checkin.inB2].map((k) => (
                  <li
                    key={k}
                    className="rounded-[18px] bg-secondary px-4 py-3 text-[15px] text-secondary-foreground"
                    dangerouslySetInnerHTML={{ __html: tCheckin(k, lang) }}
                  />
                ))}
              </ul>
              <div className="mt-6">
                <CheckinCarousel
                  slides={slides}
                  ariaLabel={tCheckin(checkin.choiceInTitle, lang)}
                  prevLabel={tCheckin(checkin.prev, lang)}
                  nextLabel={tCheckin(checkin.next, lang)}
                  lang={lang}
                />
              </div>
            </div>
          ) : null}
          {mode === "self" ? (
            <div className="mt-6">
              <CheckinCarousel
                slides={slides}
                ariaLabel={tCheckin(checkin.selfTitle, lang)}
                prevLabel={tCheckin(checkin.prev, lang)}
                nextLabel={tCheckin(checkin.next, lang)}
                lang={lang}
              />
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}

export default function CheckInPage() {
  return (
    <>
      <Suspense>
        <LanguageSync />
      </Suspense>
      <Suspense>
        <CheckInInner />
      </Suspense>
    </>
  );
}
