"use client";

import { useState } from "react";
import {
  labels,
  mapsUrlFor,
  placeCategories,
  type Place,
} from "@/lib/legacy/luoghi-data.generated";
import type { Lang } from "@/lib/i18n";

function imgSrc(src?: string): string {
  if (!src) return "";
  return src.startsWith("assets/") ? `/${src}` : src;
}

function PlaceCard({ place, lang, isEvents, hideImage }: { place: Place; lang: Lang; isEvents?: boolean; hideImage?: boolean }) {
  const [err, setErr] = useState(false);
  let cardClass = "place-card";
  if (isEvents) cardClass += " event-card";
  if (hideImage) cardClass += " place-card-noimage";
  if (place.beachType === "free") cardClass += " free-beach";
  if (place.beachType === "paid") cardClass += " paid-beach";

  let badge = null;
  if (isEvents) badge = <span className="event-badge">{labels.event[lang]}</span>;
  if (place.beachType === "free") badge = <span className="beach-badge free">{labels.free[lang]}</span>;
  if (place.beachType === "paid") badge = <span className="beach-badge paid">{labels.paid[lang]}</span>;

  return (
    <article className={cardClass}>
      {!hideImage &&
        (place.image && !err ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgSrc(place.image)} alt={place.title[lang]} loading="lazy" onError={() => setErr(true)} />
        ) : (
          <div className="place-img-placeholder" aria-hidden="true">
            🏖️
          </div>
        ))}
      <div className="place-content">
        {badge}
        <h3>{place.title[lang]}</h3>
        <p>{place.desc[lang]}</p>
        {place.note ? <div className="beach-note">{place.note[lang]}</div> : null}
        <div className="place-actions">
          {place.infoUrl ? (
            <a className="place-btn" href={place.infoUrl} target="_blank" rel="noreferrer">
              {isEvents ? labels.dates[lang] : labels.info[lang]}
            </a>
          ) : null}
          <a className="place-btn light" href={mapsUrlFor(place)} target="_blank" rel="noreferrer">
            {labels.maps[lang]}
          </a>
        </div>
      </div>
    </article>
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
