"use client";

import { useEffect, useState } from "react";
import { CloudSun, Sun, Umbrella, Wind } from "lucide-react";
import { weather } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { withLang } from "@/lib/lang-server";
import { THome } from "@/components/t-home";

type Cache = {
  code: number;
  emoji: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  windSpeed: number;
  rainProbability: number;
  shouldShowUmbrellaAlert: boolean;
  savedAt: number;
};

const CONDITION: Record<string, Record<Lang, string>> = {
  clear: { it: "Sereno", en: "Clear", es: "Despejado", fr: "Dégagé", de: "Klar" },
  partly: { it: "Poco nuvoloso", en: "Partly cloudy", es: "Parcialmente nublado", fr: "Partiellement nuageux", de: "Teilweise bewölkt" },
  cloudy: { it: "Nuvoloso", en: "Cloudy", es: "Nublado", fr: "Nuageux", de: "Bewölkt" },
  fog: { it: "Nebbia", en: "Fog", es: "Niebla", fr: "Brouillard", de: "Nebel" },
  drizzle: { it: "Pioviggine", en: "Drizzle", es: "Llovizna", fr: "Bruine", de: "Nieselregen" },
  rain: { it: "Pioggia", en: "Rain", es: "Lluvia", fr: "Pluie", de: "Regen" },
  storm: { it: "Temporale", en: "Thunderstorm", es: "Tormenta", fr: "Orage", de: "Gewitter" },
  snow: { it: "Neve", en: "Snow", es: "Nieve", fr: "Neige", de: "Schnee" },
};

const FALLBACK: Record<Lang, string> = {
  it: "Meteo non disponibile",
  en: "Weather not available",
  es: "Tiempo no disponible",
  fr: "Météo non disponible",
  de: "Wetter nicht verfügbar",
};

const LOADING: Record<Lang, string> = {
  it: "Caricamento meteo...",
  en: "Loading weather...",
  es: "Cargando tiempo...",
  fr: "Chargement météo...",
  de: "Wetter wird geladen...",
};

function codeKey(code: number): keyof typeof CONDITION {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partly";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([95, 96, 99].includes(code)) return "storm";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  return "cloudy";
}

function emojiFor(code: number, precipitation: number, wind: number): string {
  if (wind >= 25) return "💨";
  if ([95, 96, 99].includes(code)) return "⛈️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code) || precipitation > 0) return "🌧️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([45, 48].includes(code)) return "🌫️";
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  return "🌤️";
}

type WeatherApi = {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    precipitation: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
  };
};

type SuggestionKind = "coast" | "town" | "indoor" | "wind";

const SUGGESTION: Record<SuggestionKind, Record<Lang, { title: string; text: string }>> = {
  coast: {
    it: { title: "Giornata da mare e Costiera", text: "Cielo sereno: perfetta per spiagge, lungomare e un giro in Costiera Amalfitana. Partite presto e portate acqua e crema solare." },
    en: { title: "Beach and coast day", text: "Clear skies: perfect for beaches, the seafront and a trip along the Amalfi Coast. Leave early and bring water and sunscreen." },
    es: { title: "Día de playa y Costiera", text: "Cielo despejado: perfecto para playas, paseo marítimo y una excursión por la Costa Amalfitana. Salid temprano y llevad agua y protector solar." },
    fr: { title: "Journée mer et côte", text: "Ciel dégagé : parfait pour les plages, le front de mer et une excursion sur la côte amalfitaine. Partez tôt, avec eau et crème solaire." },
    de: { title: "Strand- und Küstentag", text: "Klarer Himmel: perfekt für Strand, Promenade und einen Ausflug an die Amalfiküste. Fahrt früh los, mit Wasser und Sonnencreme." },
  },
  town: {
    it: { title: "Giornata da centro e borghi", text: "Cielo variabile: ideale per Salerno, il centro storico e i borghi come Vietri, senza allontanarvi troppo." },
    en: { title: "Town and villages day", text: "Changeable skies: ideal for Salerno, the historic centre and villages like Vietri, without going too far." },
    es: { title: "Día de ciudad y pueblos", text: "Cielo variable: ideal para Salerno, el centro histórico y pueblos como Vietri, sin alejaros demasiado." },
    fr: { title: "Journée ville et villages", text: "Ciel variable : idéal pour Salerne, le centre historique et des villages comme Vietri, sans aller trop loin." },
    de: { title: "Stadt- und Dörfer-Tag", text: "Wechselhaftes Wetter: ideal für Salerno, die Altstadt und Dörfer wie Vietri, ohne weit zu fahren." },
  },
  indoor: {
    it: { title: "Giornata da interni", text: "Con pioggia vi consigliamo centro storico, Duomo, musei e una sosta golosa: aprite le guide di luoghi e cibo." },
    en: { title: "Indoor day", text: "With rain we recommend the historic centre, the Duomo, museums and a tasty break: open the places and food guides." },
    es: { title: "Día de interiores", text: "Con lluvia os recomendamos centro histórico, Duomo, museos y una pausa golosa: abrid las guías de lugares y comida." },
    fr: { title: "Journée à l’abri", text: "Avec la pluie, préférez le centre historique, le Duomo, les musées et une pause gourmande : ouvrez les guides lieux et food." },
    de: { title: "Tag drinnen", text: "Bei Regen empfehlen wir Altstadt, Dom, Museen und eine leckere Pause: öffnet die Guides für Orte und Essen." },
  },
  wind: {
    it: { title: "Giornata ventosa", text: "Con vento forte meglio evitare mare e traghetti: perfetta per passeggiate in centro, shopping e un aperitivo al riparo." },
    en: { title: "Windy day", text: "With strong wind, better avoid the sea and ferries: perfect for city walks, shopping and a sheltered aperitivo." },
    es: { title: "Día de viento", text: "Con viento fuerte mejor evitar mar y ferris: perfecto para paseos por la ciudad, compras y un aperitivo al reparo." },
    fr: { title: "Journée venteuse", text: "Par grand vent, mieux vaut éviter mer et ferries : parfait pour flâner en ville, le shopping et un apéritif à l’abri." },
    de: { title: "Windiger Tag", text: "Bei starkem Wind lieber Meer und Fähren meiden: perfekt für Stadtbummel, Shopping und einen Aperitif im Trockenen." },
  },
};

const SUGGEST_CTA: Record<Lang, { places: string; food: string }> = {
  it: { places: "Apri luoghi da visitare", food: "Apri dove mangiare" },
  en: { places: "Open places to visit", food: "Open where to eat" },
  es: { places: "Abrir lugares para visitar", food: "Abrir dónde comer" },
  fr: { places: "Ouvrir les lieux à visiter", food: "Ouvrir où manger" },
  de: { places: "Orte ansehen", food: "Essen ansehen" },
};

function suggestionFor(code: number, wind: number): SuggestionKind {
  if (wind >= 25) return "wind";
  const k = codeKey(code);
  if (k === "clear") return "coast";
  if (k === "partly" || k === "cloudy") return "town";
  return "indoor";
}

const SUGGEST_ICON = { coast: Sun, town: CloudSun, indoor: Umbrella, wind: Wind } as const;

function detailsText(lang: Lang, min: number, max: number, wind: number, rain: number): string {
  const map: Record<Lang, string> = {
    it: `Min ${min}° · Max ${max}° · Vento ${wind} km/h · Probabilità pioggia ${rain}%`,
    en: `Min ${min}° · Max ${max}° · Wind ${wind} km/h · Chance of rain ${rain}%`,
    es: `Mín ${min}° · Máx ${max}° · Viento ${wind} km/h · Probabilidad de lluvia ${rain}%`,
    fr: `Min ${min}° · Max ${max}° · Vent ${wind} km/h · Risque de pluie ${rain}%`,
    de: `Min. ${min}° · Max. ${max}° · Wind ${wind} km/h · Regenwahrscheinlichkeit ${rain}%`,
  };
  return map[lang];
}

export function WeatherBox({ lang }: { lang: Lang }) {
  const [summary, setSummary] = useState(`🌤️ ${LOADING[lang]}`);
  const [temp, setTemp] = useState("--°");
  const [details, setDetails] = useState("");
  const [umbrella, setUmbrella] = useState(false);
  const [suggest, setSuggest] = useState<SuggestionKind | null>(null);

  useEffect(() => {
    let cancelled = false;

    const render = (c: Cache) => {
      setSummary(`${c.emoji} ${CONDITION[codeKey(c.code)][lang]}`);
      setTemp(`${c.temperature}°`);
      setDetails(detailsText(lang, c.minTemp, c.maxTemp, c.windSpeed, c.rainProbability));
      setUmbrella(c.shouldShowUmbrellaAlert);
      setSuggest(suggestionFor(c.code, c.windSpeed));
    };

    try {
      const raw = window.localStorage.getItem("salernoWeatherCache");
      if (raw) {
        const cached = JSON.parse(raw) as Cache;
        if (typeof cached.code === "number") render(cached);
      }
    } catch {
      /* ignora cache illeggibile */
    }

    const ctrl = new AbortController();
    const timeout = window.setTimeout(() => ctrl.abort(), 7000);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.6824&longitude=14.7681&current=temperature_2m,weather_code,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FRome",
      { signal: ctrl.signal },
    )
      .then((r) => r.json() as Promise<WeatherApi>)
      .then((data: WeatherApi) => {
        if (cancelled || !data?.current || !data?.daily) return;
        const code = data.current.weather_code as number;
        const wind = Math.round(data.current.wind_speed_10m || 0);
        const rain = data.current.precipitation || 0;
        const entry: Cache = {
          code,
          emoji: emojiFor(code, rain, wind),
          temperature: Math.round(data.current.temperature_2m),
          maxTemp: Math.round(data.daily.temperature_2m_max[0]),
          minTemp: Math.round(data.daily.temperature_2m_min[0]),
          windSpeed: wind,
          rainProbability: data.daily.precipitation_probability_max[0] || 0,
          shouldShowUmbrellaAlert:
            [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code) ||
            rain > 0,
          savedAt: Date.now(),
        };
        try {
          window.localStorage.setItem("salernoWeatherCache", JSON.stringify(entry));
        } catch {
          /* ignora */
        }
        render(entry);
      })
      .catch(() => {
        if (!cancelled && summary.startsWith("🌤️")) setSummary(`🌤️ ${FALLBACK[lang]}`);
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      cancelled = true;
      ctrl.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const suggestion = suggest ? SUGGESTION[suggest][lang] : null;
  const SuggestIcon = suggest ? SUGGEST_ICON[suggest] : null;

  return (
    <>
      <div className="mt-6 rounded-[12px] border border-border bg-card p-[18px] text-card-foreground">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="mb-1 block text-[13px] text-muted-foreground">
              <THome k={weather.label} lang={lang} />
            </span>
            <strong className="text-base sm:text-lg">{summary}</strong>
          </div>
          <div
            aria-hidden
            className="min-w-[72px] rounded-[18px] bg-secondary px-3 py-2 text-center text-2xl font-extrabold text-secondary-foreground"
          >
            {temp}
          </div>
        </div>
        {details ? <p className="mt-2 text-sm text-muted-foreground">{details}</p> : null}
        {umbrella ? (
          <div className="mt-3 rounded-[18px] border-l-[6px] border-l-warning-accent bg-warning p-4">
            <strong className="mb-1 block text-warning-foreground">
              <THome k={weather.umbrellaTitle} lang={lang} />
            </strong>
            <p className="m-0 text-sm text-foreground sm:text-[15px]">
              <THome k={weather.umbrellaText} lang={lang} />
            </p>
          </div>
        ) : null}
      </div>
      {suggestion && SuggestIcon ? (
        <section
          aria-label={suggestion.title}
          className="mt-4 rounded-[14px] border border-border bg-card p-5 text-card-foreground sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <SuggestIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-serif text-xl text-foreground sm:text-2xl">{suggestion.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {suggestion.text}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={withLang("/permanenza/luoghi", lang)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
            >
              {SUGGEST_CTA[lang].places}
            </a>
            <a
              href={withLang("/permanenza/mangiare", lang)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground no-underline"
            >
              {SUGGEST_CTA[lang].food}
            </a>
          </div>
        </section>
      ) : null}
    </>
  );
}
