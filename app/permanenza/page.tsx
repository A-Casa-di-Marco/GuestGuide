import {
  BookOpen,
  Bus,
  ClipboardList,
  Coffee,
  Cross,
  House,
  Map,
  Route,
  ShoppingBasket,
  SquareParking,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { guideTiles, tHome } from "@/lib/content-home";
import { hubDesc } from "@/lib/legacy/hub-desc.generated";
import { resolveLang, withLang } from "@/lib/lang-server";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "clipboard-list": ClipboardList,
  utensils: Utensils,
  map: Map,
  bus: Bus,
  basket: ShoppingBasket,
  coffee: Coffee,
  parking: SquareParking,
  route: Route,
  cross: Cross,
};

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
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Soggiorno</h1>
        <p className="mt-2 max-w-3xl text-[15px] text-muted-foreground sm:text-base">
          Guida della casa e cosa visitare in zona. Le guide complete restano nelle pagine
          originali, senza modifiche ai contenuti.
        </p>
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3">
          {tiles.map((tile, i) => {
            const slug = tile.href.split("/").pop() || "";
            const desc = hubDesc[slug]?.[lang] || tHome(tile.descKey, lang);
            const Icon = ICONS[tile.icon] ?? House;
            const dark = i < 2;
            return (
              <a
                key={tile.href}
                href={withLang(tile.href, lang)}
                className={cn(
                  "group flex min-h-[128px] flex-col items-center justify-center gap-2 rounded-[14px] border p-4 text-center no-underline transition-colors sm:min-h-[150px] sm:gap-2.5 sm:p-6",
                  dark
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border bg-card text-card-foreground hover:border-primary hover:bg-secondary",
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 shrink-0",
                    dark ? "text-focus dark:text-primary-foreground" : "text-primary",
                  )}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <strong className="text-[15px] font-medium leading-snug sm:text-base">
                  {tHome(tile.titleKey, lang)}
                </strong>
                <small
                  className={cn(
                    "text-[12px] leading-snug sm:text-[13px]",
                    dark ? "text-primary-foreground/85" : "text-muted-foreground",
                  )}
                >
                  {desc}
                </small>
              </a>
            );
          })}
        </div>
      </main>
    </>
  );
}
