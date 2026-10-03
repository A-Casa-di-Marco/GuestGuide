"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { CheckinCarousel, type CheckinSlide } from "@/components/checkin-carousel";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSync } from "@/components/language-sync";
import { MAPS_URL, PARKING_IMG_BY_LANG, WHATSAPP_ASJA } from "@/lib/site";
import { checkin, tCheckin } from "@/lib/content-checkin";
import { parseLang, type Lang } from "@/lib/i18n";
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
      extraImages: [{ src: "/assets/keyboxcancello.jpeg", alt: "KeyBox", contain: true }],
      bullets: [tCheckin(checkin.s1Lead, lang)],
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
      extraImages: [{ src: "/assets/serratura.jpeg", alt: "Serratura", contain: true }],
      bullets: [],
      sections: [
        { title: tCheckin(checkin.remoteTitle, lang), bullets: bullets([checkin.remoteA, checkin.remoteB, checkin.remoteCD], lang) },
        { title: tCheckin(checkin.longKeyTitle, lang), bullets: bullets([checkin.longKey1, checkin.longKey2], lang) },
        { title: tCheckin(checkin.otherKeyTitle, lang), bullets: bullets([checkin.otherKey1], lang) },
      ],
      note: tCheckin(checkin.keysNote, lang),
    },
  ];
}

function CheckInInner() {
  const params = useSearchParams();
  const lang = parseLang(params.get("lang"));
  const [mode, setMode] = useState<"presenza" | "self" | null>(null);
  const slides = mode === "presenza" ? presenzaCard(lang) : mode === "self" ? selfSlides(lang) : [];

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
        <h1 className="font-serif text-4xl text-foreground">
          <TCheckin k={checkin.title} lang={lang} />
        </h1>
        <a
          href={WHATSAPP_ASJA}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-card-foreground no-underline"
        >
          <TCheckin k={checkin.helpCta} lang={lang} />
        </a>
        <div className="mt-4 text-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="mx-auto flex min-h-[48px] max-w-md items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground no-underline"
          >
            <TCheckin k={checkin.mapsCta} lang={lang} />
          </a>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                "rounded-[12px] border p-5 text-left",
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

        {mode === "presenza" ? (
          <div className="mt-6">
            <h2 className="font-serif text-2xl text-foreground">
              <TCheckin k={checkin.inSection1} lang={lang} />
            </h2>
            <ul className="mt-3 grid list-none gap-3 p-0">
              {[checkin.inB1, checkin.inB2].map((k) => (
                <li
                  key={k}
                  className="rounded-[18px] bg-secondary px-4 py-3 text-secondary-foreground"
                  dangerouslySetInnerHTML={{ __html: tCheckin(k, lang) }}
                />
              ))}
            </ul>
            <figure className="relative m-0 mt-4 overflow-hidden rounded-[22px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cancello-check-in.jpg"
                alt={tCheckin(checkin.inBadgeGate, lang)}
                className="w-full rounded-[22px]"
                loading="lazy"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground">
                <TCheckin k={checkin.inBadgeGate} lang={lang} />
              </figcaption>
              <span className="absolute bottom-4 right-4 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground">
                <TCheckin k={checkin.inBadgeMailbox} lang={lang} />
              </span>
            </figure>
            <div className="mt-6">
              <CheckinCarousel
                slides={slides}
                ariaLabel={tCheckin(checkin.choiceInTitle, lang)}
                prevLabel={tCheckin(checkin.prev, lang)}
                nextLabel={tCheckin(checkin.next, lang)}
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
            />
            <p
              className="mt-4 rounded-[16px] border-l-[5px] border-l-primary bg-accent p-4 text-[15px] text-accent-foreground"
              dangerouslySetInnerHTML={{ __html: tCheckin(checkin.keysMailboxNote, lang) }}
            />
          </div>
        ) : null}
      </main>
      <SiteFooter lang={lang} />
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
