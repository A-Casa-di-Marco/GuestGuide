import {
  BookOpen,
  Bus,
  ClipboardList,
  Coffee,
  Cross,
  KeyRound,
  LogOut,
  Map,
  Route,
  ShoppingBasket,
  SquareParking,
  UtensilsCrossed,
} from "lucide-react";
import { guideTiles, guideTitleKey } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { withLang } from "@/lib/lang-server";
import { THome } from "@/components/t-home";

const ICONS: Record<string, typeof KeyRound> = {
  "key-round": KeyRound,
  "log-out": LogOut,
  "book-open": BookOpen,
  "clipboard-list": ClipboardList,
  utensils: UtensilsCrossed,
  map: Map,
  bus: Bus,
  basket: ShoppingBasket,
  coffee: Coffee,
  parking: SquareParking,
  route: Route,
  cross: Cross,
};

export function GuideGrid({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="guida-modo" className="mt-8 border-t border-border pt-8">
      <h2 id="guida-modo" className="font-serif text-3xl text-foreground">
        <THome k={guideTitleKey} lang={lang} />
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {guideTiles.slice(0, 2).map((tile) => (
          <Tile key={tile.titleKey} tile={tile} lang={lang} featured />
        ))}
        {guideTiles.slice(2).map((tile) => (
          <Tile key={tile.titleKey} tile={tile} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function Tile({
  tile,
  lang,
  featured = false,
}: {
  tile: (typeof guideTiles)[number];
  lang: Lang;
  featured?: boolean;
}) {
  const Icon = ICONS[tile.icon] ?? Map;
  return (
    <a
      href={withLang(tile.href, lang)}
      className={
        featured
          ? "flex min-h-[128px] flex-col justify-center gap-2 rounded-[14px] border border-primary bg-primary p-4 text-primary-foreground no-underline md:min-h-[150px] md:p-6"
          : "flex min-h-[128px] flex-col justify-center gap-2 rounded-[14px] border border-border bg-card p-4 text-card-foreground no-underline md:min-h-[150px] md:p-6"
      }
    >
      <Icon
        aria-hidden
        className={featured ? "h-6 w-6 text-primary-foreground" : "h-6 w-6 text-primary"}
      />
      <strong className="block text-[15px] font-medium leading-snug md:text-base">
        <THome k={tile.titleKey} lang={lang} />
      </strong>
      <small className={featured ? "text-[12px] opacity-85 md:text-[13px]" : "text-[12px] text-muted-foreground md:text-[13px]"}>
        <THome k={tile.descKey} lang={lang} />
      </small>
    </a>
  );
}
