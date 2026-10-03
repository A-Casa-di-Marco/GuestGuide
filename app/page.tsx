import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SaveGuideButton } from "@/components/save-guide-button";
import { Hero } from "@/components/hero";
import { GuestWelcome } from "@/components/guest-welcome";
import { WeatherBox } from "@/components/weather-box";
import { MarcoStory } from "@/components/marco-story";
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
        <GuestWelcome lang={lang} welcomeTitleKey="index_044" />
        <WeatherBox lang={lang} />
        <MarcoStory lang={lang} />
      </main>
    </>
  );
}
