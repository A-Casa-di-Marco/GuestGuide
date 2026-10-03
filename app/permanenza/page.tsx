import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { guideTiles } from "@/lib/content-home";
import { resolveLang } from "@/lib/lang-server";
import { withLang } from "@/lib/lang-server";
import { THome } from "@/components/t-home";

export const dynamic = "force-dynamic";

const DESCRIPTIONS: Record<string, string> = {
  "manuale.html": "Wi-Fi, clima, moka e consigli utili",
  "regole.html": "Un soggiorno sereno",
  "luoghi.html": "Cosa visitare in zona",
  "mangiare.html": "Ristoranti e pizzerie",
  "trasporti.html": "Bus e spostamenti",
  "spesa.html": "Supermercati e negozi",
  "parcheggio.html": "Dove parcheggiare",
  "itinerario.html": "Costiera e dintorni",
  "colazione.html": "Bar e pasticcerie",
  "farmacie-emergenze.html": "Numeri e punti utili",
};

export default async function Permanenza({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = await resolveLang(await searchParams);
  const tiles = guideTiles.filter((tile) => tile.href.endsWith(".html"));

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <h1 className="font-serif text-4xl text-foreground">Permanenza</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Guida della casa e cosa visitare in zona. Le guide complete restano nelle pagine
          originali, senza modifiche ai contenuti.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <a
              key={tile.href}
              href={withLang(tile.href, lang)}
              className="rounded-[14px] border border-border bg-card p-6 text-card-foreground no-underline"
            >
              <strong className="block text-base">
                <THome k={tile.titleKey} lang={lang} />
              </strong>
              <small className="mt-1 block text-[13px] text-muted-foreground">
                <THome k={tile.descKey} lang={lang} />
              </small>
              <small className="mt-2 block text-[13px] opacity-80">
                {DESCRIPTIONS[tile.href] ?? ""}
              </small>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
