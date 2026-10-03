"use client";

import { useEffect, useState } from "react";
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
    <article className={place.featured ? "restaurant-card featured" : "restaurant-card"}>
      {place.recommended ? <div className="recommended-ribbon">{labels.recommended[lang]}</div> : null}
      {place.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc(place.image)} alt={place.name[lang]} loading="lazy" />
      ) : null}
      <div className="restaurant-content">
        <div className="badge-row">
          {place.recommended ? <div className="recommended-badge">{labels.recommended[lang]}</div> : null}
          {place.walkable ? <div className="walk-badge">{labels.walkable[lang]}</div> : null}
          {place.price ? (
            <div className="price-badge" title={labels.price[lang]}>
              <span className="price-symbol">{place.price}</span>
            </div>
          ) : null}
        </div>
        <h3>{place.name[lang]}</h3>
        <p>{place.desc[lang]}</p>
        {shouldShowTip(place) && place.tip ? (
          <div className="tip-box">
            <strong>{labels.tip[lang]}:</strong> {place.tip[lang]}
          </div>
        ) : null}
        <div className="restaurant-actions">
          <a className="restaurant-btn light" href={mapsUrlFor(place)} target="_blank" rel="noreferrer">
            {labels.maps[lang]}
          </a>
        </div>
      </div>
    </article>
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
    <>
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
    </>
  );
}
