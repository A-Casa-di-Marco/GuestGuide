"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { CheckoutChecklist } from "@/components/checkout-checklist";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSync } from "@/components/language-sync";
import { checkout, linkifyStrong, tCheckin } from "@/lib/content-checkin";
import { parseLang } from "@/lib/i18n";
import { WHATSAPP_ASJA } from "@/lib/site";
import { TCheckin } from "@/components/t-checkin";

function CheckOutInner() {
  const params = useSearchParams();
  const lang = parseLang(params.get("lang"));

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
        <div className="grid gap-3 border-b border-border pb-6">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <TCheckin k={checkout.eyebrow} lang={lang} />
          </p>
          <strong className="font-serif text-6xl font-normal text-foreground">10:00</strong>
          <p className="m-0 max-w-2xl text-foreground">
            <TCheckin k={checkout.headlineNote} lang={lang} />
          </p>
        </div>

        <figure className="relative m-0 mt-6 overflow-hidden rounded-[12px] border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/cancello-check-in.jpg"
            alt="Cancello e cassetta delle lettere"
            className="max-h-[490px] w-full bg-secondary object-contain"
            loading="lazy"
          />
          <figcaption className="absolute right-4 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            <TCheckin k={checkout.badge} lang={lang} />
          </figcaption>
        </figure>

        <ul className="mt-6 grid list-none gap-3 p-0">
          {checkout.bullets.map((k) => (
            <li
              key={k}
              className="rounded-[12px] bg-secondary px-4 py-3 text-secondary-foreground"
              dangerouslySetInnerHTML={{ __html: tCheckin(k, lang) }}
            />
          ))}
          <li
            className="rounded-[12px] bg-secondary px-4 py-3 text-secondary-foreground"
            dangerouslySetInnerHTML={{ __html: linkifyStrong(tCheckin(checkout.confirmBullet, lang), WHATSAPP_ASJA) }}
          />
        </ul>

        <CheckoutChecklist lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}

export default function CheckOutPage() {
  return (
    <>
      <Suspense>
        <LanguageSync />
      </Suspense>
      <Suspense>
        <CheckOutInner />
      </Suspense>
    </>
  );
}
