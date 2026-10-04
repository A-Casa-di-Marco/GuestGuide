import { Suspense } from "react";
import { BackButton } from "@/components/back-button";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { LanguageSync } from "@/components/language-sync";
import { LegacyContent } from "@/components/legacy-content";
import { ColazioneForm } from "@/components/colazione-form";
import { LuoghiIsland } from "@/components/luoghi-island";
import { MangiareIsland } from "@/components/mangiare-island";
import { ItinerarioIsland } from "@/components/itinerario-island";
import { SectionCards } from "@/components/section-cards";
import { manualeCards } from "@/lib/legacy/manuale-cards.generated";
import { regoleCards } from "@/lib/legacy/regole-cards.generated";
import { resolveLang, withLang } from "@/lib/lang-server";
import type { Lang } from "@/lib/i18n";
import "../legacy-compat.css";

export const dynamic = "force-dynamic";

const SLUGS = [
  "manuale",
  "regole",
  "trasporti",
  "spesa",
  "parcheggio",
  "farmacie-emergenze",
  "colazione",
  "luoghi",
  "mangiare",
  "itinerario",
] as const;

type Slug = (typeof SLUGS)[number];

const BACK: Record<Lang, string> = {
  it: "Torna al soggiorno",
  en: "Back to Stay",
  es: "Volver a Estancia",
  fr: "Retour au Séjour",
  de: "Zurück zum Aufenthalt",
};

async function load(slug: Slug) {
  switch (slug) {
    case "manuale":
      return import("@/lib/legacy/manuale.generated");
    case "regole":
      return import("@/lib/legacy/regole.generated");
    case "trasporti":
      return import("@/lib/legacy/trasporti.generated");
    case "spesa":
      return import("@/lib/legacy/spesa.generated");
    case "parcheggio":
      return import("@/lib/legacy/parcheggio.generated");
    case "farmacie-emergenze":
      return import("@/lib/legacy/farmacie-emergenze.generated");
    case "colazione":
      return import("@/lib/legacy/colazione.generated");
    case "luoghi":
      return import("@/lib/legacy/luoghi.generated");
    case "mangiare":
      return import("@/lib/legacy/mangiare.generated");
    case "itinerario":
      return import("@/lib/legacy/itinerario.generated");
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const lang = await resolveLang(await searchParams);
  const mod = await load(slug);
  return { title: `${mod.title[lang]} · A Casa di Marco` };
}

function isSlug(v: string): v is Slug {
  return (SLUGS as readonly string[]).includes(v);
}

export default async function LegacyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  const sp = await searchParams;
  const lang = await resolveLang(sp);
  const mod = await load(slug);

  return (
    <>
      <Suspense>
        <LanguageSync />
      </Suspense>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6">
        <BackButton label={BACK[lang]} fallbackHref={withLang("/permanenza", lang)} />
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">{mod.title[lang]}</h1>
        {slug === "manuale" ? (
          <SectionCards cards={manualeCards} lang={lang} />
        ) : slug === "regole" ? (
          <SectionCards cards={regoleCards} lang={lang} />
        ) : (
          <div className="mt-4">
            <LegacyContent html={mod.html[lang]} lang={lang} />
          </div>
        )}
        {slug === "colazione" ? (
          <div className="mt-2">
            <ColazioneForm lang={lang} />
          </div>
        ) : null}
        {slug === "luoghi" ? (
          <div className="mt-2">
            <LuoghiIsland lang={lang} />
          </div>
        ) : null}
        {slug === "mangiare" ? (
          <div className="mt-2">
            <MangiareIsland lang={lang} />
          </div>
        ) : null}
        {slug === "itinerario" ? (
          <div className="mt-2">
            <ItinerarioIsland lang={lang} />
          </div>
        ) : null}
      </main>
    </>
  );
}
