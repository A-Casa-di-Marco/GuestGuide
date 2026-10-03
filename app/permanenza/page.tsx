import { SiteHeader } from "@/components/site-header";
import { ProjectCard } from "@/components/ui/project-card";
import { cardCta, guideTiles, tHome } from "@/lib/content-home";
import { resolveLang, withLang } from "@/lib/lang-server";

export const dynamic = "force-dynamic";

export default async function Permanenza({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await resolveLang(await searchParams);
  const tiles = guideTiles.filter(
    (tile) => tile.href.startsWith("/permanenza/") || tile.href.endsWith(".html"),
  );

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Permanenza</h1>
        <p className="mt-2 max-w-3xl text-[15px] text-muted-foreground sm:text-base">
          Guida della casa e cosa visitare in zona. Le guide complete restano nelle pagine
          originali, senza modifiche ai contenuti.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <ProjectCard
              key={tile.href}
              imgSrc={tile.image}
              title={tHome(tile.titleKey, lang)}
              description={tHome(tile.descKey, lang)}
              link={withLang(tile.href, lang)}
              linkText={cardCta[lang]}
              external={false}
            />
          ))}
        </div>
      </main>
    </>
  );
}
