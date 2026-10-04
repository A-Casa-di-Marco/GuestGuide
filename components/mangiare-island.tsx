"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  backLabel,
  buttons,
  categories,
  labels,
  mapsUrlFor,
  shouldShowTip,
  type Restaurant,
} from "@/lib/legacy/mangiare-data.generated";
import type { Lang } from "@/lib/i18n";

function imgSrc(src?: string): string {
  if (!src) return "";
  return src.startsWith("assets/") ? `/${src}` : src;
}

function RestaurantCard({ place, lang }: { place: Restaurant; lang: Lang }) {
  return (
    <Card className="grid grid-cols-[clamp(110px,24%,220px)_minmax(0,1fr)] overflow-hidden rounded-[14px]">
      {place.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc(place.image)} alt={place.name[lang]} loading="lazy" className="aspect-square h-full w-full object-cover" />
      ) : null}
      <CardContent className="min-w-0 p-4 md:p-5">
        <div className="flex flex-wrap gap-1.5">
          {place.recommended ? <Badge variant="secondary">{labels.recommended[lang]}</Badge> : null}
          {place.walkable ? <Badge variant="secondary">{labels.walkable[lang]}</Badge> : null}
          {place.price ? (
            <Badge variant="outline" title={labels.price[lang]}>
              {place.price}
            </Badge>
          ) : null}
        </div>
        <h3 className="mt-1 font-serif text-xl text-foreground sm:text-2xl">{place.name[lang]}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{place.desc[lang]}</p>
        {shouldShowTip(place) && place.tip ? (
          <div className="tip-box mt-2">
            <strong>{labels.tip[lang]}:</strong> {place.tip[lang]}
          </div>
        ) : null}
        <div className="mt-3">
          <Button asChild size="sm" variant="secondary">
            <a href={mapsUrlFor(place)} target="_blank" rel="noreferrer">
              {labels.maps[lang]}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function validCat(v: string | null): string | null {
  return v && categories[v] ? v : null;
}

/** Categorie e card dei ristoranti (port nativo, stessi testi e regole ?cat=). */
export function MangiareIsland({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<string | null>(() =>
    typeof window === "undefined" ? null : validCat(new URLSearchParams(window.location.search).get("cat")),
  );

  useEffect(() => {
    const onPop = () => {
      setActive(validCat(new URLSearchParams(window.location.search).get("cat")));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Come nello statico: la scheda categoria sostituisce il blocco iniziale.
  useEffect(() => {
    const start = document.getElementById("food-start");
    if (start) start.style.display = active ? "none" : "block";
    return () => {
      const s = document.getElementById("food-start");
      if (s) s.style.display = "block";
    };
  }, [active]);

  const choose = (key: string) => {
    if (!categories[key]) return;
    setActive(key);
    const url = new URL(window.location.href);
    url.searchParams.set("cat", key);
    window.history.pushState({ category: key }, "", url.pathname + "?" + url.searchParams.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setActive(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("cat");
    window.history.pushState({ category: null }, "", url.pathname + "?" + url.searchParams.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const category = active ? categories[active] : null;
  const sorted = category
    ? [...category.restaurants].sort((a, b) => Number(b.recommended === true) - Number(a.recommended === true))
    : [];

  return (
    <div className="legacy-content">
      <div className="food-choice-grid">
        {buttons.map((b) => (
          <button
            key={b.key}
            type="button"
            aria-pressed={active === b.key}
            className={active === b.key ? "food-choice active" : "food-choice"}
            onClick={() => choose(b.key)}
          >
            <span aria-hidden="true">{b.icon}</span>
            <strong>{b.title[lang]}</strong>
            <small>{b.desc[lang]}</small>
          </button>
        ))}
      </div>
      {category ? (
        <section className="food-category active" aria-live="polite">
          <div className="category-header">
            <h2 id="category-title">{category.title[lang]}</h2>
            <div className="category-top-actions">
              <button type="button" className="back-category" onClick={back}>
                {backLabel[lang]}
              </button>
            </div>
          </div>
          <div className="restaurant-grid" id="restaurant-grid">
            {sorted.map((p, i) => (
              <RestaurantCard key={i} place={p} lang={lang} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
