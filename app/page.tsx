import { Suspense } from "react";
import { SiteHeader, ContactsSection } from "@/components/site-header";
import { SaveGuideButton } from "@/components/save-guide-button";
import { Hero } from "@/components/hero";
import { StayPhases } from "@/components/stay-phases";
import { GuestWelcome } from "@/components/guest-welcome";
import { GuideGrid } from "@/components/guide-grid";
import { WeatherBox } from "@/components/weather-box";
import { MarcoStory } from "@/components/marco-story";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSync } from "@/components/language-sync";
import { resolveLang } from "@/lib/lang-server";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await resolveLang(await searchParams);

  return (
    <>
      <Suspense>
        <LanguageSync />
      </Suspense>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6">
        <SaveGuideButton lang={lang} />
        <Hero lang={lang} />
        <StayPhases lang={lang} />
        <GuestWelcome lang={lang} welcomeTitleKey="index_044" />
        <GuideGrid lang={lang} />
        <WeatherBox lang={lang} />
        <ContactsSection lang={lang} />
        <MarcoStory lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
