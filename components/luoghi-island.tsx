"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  labels,
  mapsUrlFor,
  placeCategories,
  type Place,
} from "@/lib/legacy/luoghi-data.generated";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function imgSrc(src?: string): string {
  if (!src) return "";
  return src.startsWith("assets/") ? `/${src}` : src;
}

function PlaceCard({ place, lang, isEvents, hideImage }: { place: Place; lang: Lang; isEvents?: boolean; hideImage?: boolean }) {
  const [err, setErr] = useState(false);

  let badge = null;
  if (isEvents) badge = <Badge variant="secondary">{labels.event[lang]}</Badge>;
  if (place.beachType === "free") badge = <Badge variant="secondary">{labels.free[lang]}</Badge>;
  if (place.beachType === "paid") badge = <Badge variant="secondary">{labels.paid[lang]}</Badge>;

  return (
    <Card
      className={cn(
        "grid min-w-0 grid-cols-1 overflow-hidden rounded-[14px]",
        !hideImage && "sm:grid-cols-[clamp(140px,26%,220px)_minmax(0,1fr)]",
      )}
    >
      {!hideImage &&
        (place.image && !err ? (
          <div className="relative aspect-[16/10] w-full min-w-0 overflow-hidden sm:aspect-auto sm:h-full sm:min-h-[190px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc(place.image)}
              alt={place.title[lang]}
              loading="lazy"
              onError={() => setErr(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="flex aspect-[16/10] w-full min-w-0 items-center justify-center bg-secondary text-4xl sm:aspect-auto sm:h-full sm:min-h-[190px]"
            aria-hidden="true"
          >
            🏖️
          </div>
        ))}
      <CardContent className="min-w-0 p-4 md:p-5">
        {badge}
        <h3 className="mt-1 font-serif text-xl text-foreground sm:text-2xl">{place.title[lang]}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{place.desc[lang]}</p>
        {place.note ? <div className="beach-note mt-2">{place.note[lang]}</div> : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {place.infoUrl ? (
            <Button asChild size="sm">
              <a href={place.infoUrl} target="_blank" rel="noreferrer">
                {isEvents ? labels.dates[lang] : labels.info[lang]}
              </a>
            </Button>
          ) : null}
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

/** Categorie e card dei luoghi (port nativo, dati verbatim). */
export function LuoghiIsland({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<string | null>(null);
  const category = placeCategories.find((c) => c.id === active) || null;

  const choose = (id: string) => {
    setActive(id);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 80);
  };

  const back = () => {
    setActive(null);
    window.setTimeout(() => {
      document.getElementById("place-choice-grid")?.scrollIntoView({ block: "start" });
    }, 80);
  };

  return (
    <div className="legacy-content">
      <div className="place-choice-grid" id="place-choice-grid">
        {placeCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={active === c.id}
            className={active === c.id ? "place-choice active" : "place-choice"}
            onClick={() => choose(c.id)}
          >
            <span aria-hidden="true">{c.icon}</span>
            <strong>{c.title[lang]}</strong>
            <small>{c.short[lang]}</small>
          </button>
        ))}
      </div>
      <div id="places-container">
        {category ? (
          <div className="place-category active" id={category.id}>
            <div className="place-category-header">
              <h2>{category.title[lang]}</h2>
              <p>{category.intro[lang]}</p>
              <div className="category-top-actions">
                <button type="button" className="back-to-place-categories" onClick={back}>
                  {labels.back[lang]}
                </button>
              </div>
            </div>
            <div className="places-grid">
              {category.places.map((p, i) => (
                <PlaceCard key={i} place={p} lang={lang} isEvents={category.isEvents} hideImage={category.hideImage} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
