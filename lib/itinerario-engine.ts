import {
  guideFood,
  guidePlaces,
  plans,
  planZone,
  ui,
  valueLabels,
  zoneName,
  zoneOrder,
  type Rec,
} from "./legacy/itinerario-data.generated";
import type { Lang } from "./i18n";

export type ItineraryValues = {
  days: string;
  transport: string;
  pace: string;
  walking: string;
  interests: string[];
  children: string;
  returnTime: string;
  foodMoods: string[];
  budget: string;
  crowd: string;
  season: string;
  seaType: string;
  experience: string;
  alreadySeen: string;
};

function getZone(planName: string): string {
  return planZone[planName] || "salerno";
}

export function choosePlanPool(values: ItineraryValues): string[] {
  const interests = values.interests;
  const pool: string[] = [];

  if (values.season === "rain") return ["rainy", "salerno", "pompeii"];
  if (values.children !== "none") pool.push("family", "vietri", "minori", "salerno");
  if (interests.includes("culture")) pool.push("salerno", "pompeii", "paestum");
  if (interests.includes("coast")) pool.push("amalfi", "vietri", "positano", "minori");
  if (interests.includes("sea")) pool.push(values.seaType === "easy" ? "minori" : "vietri", "vietri");
  if (interests.includes("nature")) pool.push("nature", "amalfi");
  if (interests.includes("villages")) pool.push("vietri", "amalfi");
  if (interests.includes("romantic")) pool.push("amalfi", "positano", "salerno");
  if (interests.includes("shopping")) pool.push("salerno", "vietri");
  if (values.experience === "museums") pool.push("pompeii", "paestum");
  if (values.experience === "trail") pool.push("nature");
  if (values.experience === "boat") pool.push("amalfi", "positano");
  if (values.experience === "local") pool.push("vietri", "paestum", "minori");

  if (values.transport === "no-car") {
    return pool.filter((name) => !["paestum", "pompeii"].includes(name)).concat(["salerno", "vietri", "amalfi"]);
  }

  // Sort by geographic zone to keep multi-day itineraries coherent
  return pool.length
    ? pool.sort((a, b) => {
        const za = zoneOrder.indexOf(getZone(a));
        const zb = zoneOrder.indexOf(getZone(b));
        return za - zb;
      })
    : ["salerno", "vietri", "amalfi"];
}

function uniqueLimited(list: string[], limit: number, lang: Lang): string[] {
  const seen = new Set<string>();
  const clean: string[] = [];

  list.forEach((item) => {
    if (!seen.has(item) && plans[lang][item]) {
      seen.add(item);
      clean.push(item);
    }
  });

  const fallback = ["salerno", "vietri", "amalfi", "minori", "paestum", "pompeii", "nature"];
  fallback.forEach((item) => {
    if (clean.length < limit && !seen.has(item)) {
      clean.push(item);
      seen.add(item);
    }
  });

  return clean.slice(0, limit);
}

function adaptEvening(plan: { evening: [string, string] }, values: ItineraryValues, dayIndex: number, lang: Lang): [string, string] {
  if (values.returnTime === "early") {
    return ui[lang].eveningEarly;
  }

  if (values.returnTime === "late" && dayIndex % 2 === 0) {
    return ui[lang].eveningLate;
  }

  return plan.evening;
}

function adaptLunch(
  plan: { lunch: [string, string] },
  values: ItineraryValues,
  dayIndex: number,
  planName: string,
  lang: Lang,
): [string, string] {
  const zone = getZone(planName);

  // Zone-aware mood suitability: fish/view less appropriate for inland zones
  const coastalZones = ["salerno", "vietri", "minori", "amalfi", "positano"];
  let availableMoods = [...values.foodMoods];
  if (!coastalZones.includes(zone)) {
    availableMoods = availableMoods.filter((m) => m !== "fish" && m !== "view");
  }
  if (!availableMoods.length) availableMoods = ["typical"];

  const food = ui[lang].food;

  const mood = availableMoods[dayIndex % availableMoods.length] || "typical";
  const entry = food[mood] || plan.lunch;
  return [entry[0], entry[1].replace("{zone}", zoneName[lang][zone] || zone)];
}

function uniqueRecommendations(items: Rec[], limit: number): Rec[] {
  const seen = new Set<string>();
  const clean: Rec[] = [];

  items.forEach((item) => {
    const key = item[0];
    if (!seen.has(key)) {
      seen.add(key);
      clean.push(item);
    }
  });

  return clean.slice(0, limit);
}

function getFoodRecommendations(values: ItineraryValues, planName: string, dayIndex: number, lang: Lang): Rec[] {
  const zone = getZone(planName);
  const coastalZones = ["salerno", "vietri", "minori", "amalfi", "positano"];

  let availableMoods = [...values.foodMoods];
  if (!coastalZones.includes(zone)) {
    availableMoods = availableMoods.filter((m) => m !== "fish" && m !== "view");
  }
  if (!availableMoods.length) availableMoods = ["typical"];

  const mood = availableMoods[dayIndex % availableMoods.length] || "typical";

  // Collect food recs filtered by the day's zone
  const primary = (guideFood[mood] || guideFood.typical).filter((item) => item[2] === zone);

  const secondary = availableMoods
    .filter((m) => m !== mood)
    .flatMap((m) => (guideFood[m] || []).filter((item) => item[2] === zone));

  const filtered = uniqueRecommendations(primary.concat(secondary), 3);

  // If no zone-specific recs found, provide a zone-aware generic tip as fallback
  if (filtered.length) return filtered;

  const zoneTip = ui[lang].zoneTip;

  return [[zoneTip[zone] || ui[lang].genericZoneTip.replace("{zone}", zone), "mangiare.html", zone]];
}

function getPlaceRecommendations(planName: string, values: ItineraryValues): Rec[] {
  const zone = getZone(planName);
  const base = (guidePlaces[planName] || guidePlaces.salerno).filter((item) => (item[2] || "salerno") === zone);
  const extras: Rec[] = [];

  // Only add extras that match the day's zone
  if (values.interests.includes("culture")) extras.push(...guidePlaces.salerno.filter((item) => (item[2] || "salerno") === zone));
  if (values.interests.includes("sea"))
    extras.push(
      ...guidePlaces.vietri.filter((item) => (item[2] || "vietri") === zone),
      ...guidePlaces.minori.filter((item) => (item[2] || "minori") === zone),
    );
  if (values.interests.includes("nature")) extras.push(...guidePlaces.nature.filter((item) => (item[2] || "salerno") === zone));
  if (values.children !== "none") extras.push(...guidePlaces.family.filter((item) => (item[2] || "salerno") === zone));

  return uniqueRecommendations(base.concat(extras), 4);
}

function renderRecommendations(items: Rec[], type?: string): string {
  if (!items.length) return "";

  return `
        <div class="recommendations">
          ${items
            .map(
              (item) => `
            <a class="rec-link ${type === "food" ? "food" : ""}" href="${item[1]}">${item[0]}</a>
          `,
            )
            .join("")}
        </div>
      `;
}

function buildTips(values: ItineraryValues, lang: Lang): [string, string][] {
  const tips: [string, string][] = [];
  const t = ui[lang].tips;

  if (values.season === "summer") {
    tips.push(t.summer);
  }

  if (values.crowd === "yes") {
    tips.push(t.crowd);
  }

  if (values.transport === "no-car") {
    tips.push(t.noCar);
  }

  if (values.children !== "none") {
    tips.push(t.kids);
  }

  if (values.walking === "high") {
    tips.push(t.walking);
  }

  if (values.returnTime === "early") {
    tips.push(t.early);
  }

  if (values.alreadySeen.trim()) {
    tips.push(["Nota personale", ui[lang].personalNote.replace("{note}", values.alreadySeen.trim())]);
  }

  tips.push(t.food);

  return tips;
}

export function label(value: string, lang: Lang): string {
  return valueLabels[lang][value] || value;
}

export type GeneratedItinerary = {
  summary: string;
  daysHtml: string;
  tipsHtml: string;
  copyText: string;
};

export function generate(values: ItineraryValues, lang: Lang): GeneratedItinerary {
  const pool = uniqueLimited(choosePlanPool(values), Number(values.days), lang);
  let textVersion = ui[lang].header;

  const dayUnit = values.days === "1" ? ui[lang].summary.dayUnit.one : ui[lang].summary.dayUnit.other;
  const summary = `${values.days} ${dayUnit} · ${ui[lang].summary.pace} ${label(values.pace, lang)} · ${label(values.transport, lang)} · ${ui[lang].summary.interests}: ${values.interests.length ? values.interests.map((v) => label(v, lang)).join(", ") : ui[lang].summary.mixDefault} · ${ui[lang].summary.food}: ${values.foodMoods.map((v) => label(v, lang)).join(", ")}.`;

  const daysHtml = pool
    .map((planName, index) => {
      const plan = plans[lang][planName];
      const lunch = adaptLunch(plan, values, index, planName, lang);
      const evening = adaptEvening(plan, values, index, lang);
      const dayTitle = `${ui[lang].dayName} ${index + 1} · ${plan.title}`;
      const placeRecs = getPlaceRecommendations(planName, values);
      const foodRecs = getFoodRecommendations(values, planName, index, lang);

      const slotNames = ui[lang].slotNames;
      const slots: [string, [string, string], Rec[], string?][] = [
        [slotNames[0], plan.morning, placeRecs],
        [slotNames[1], lunch, foodRecs, "food"],
        [slotNames[2], plan.afternoon, placeRecs.slice(1)],
        [slotNames[3], evening, values.returnTime === "late" ? foodRecs.slice(1) : [], "food"],
      ];

      textVersion += `${dayTitle}\n`;
      slots.forEach(([time, content, recs]) => {
        textVersion += `${time}: ${content[0]} - ${content[1]}\n`;
        if (recs && recs.length) {
          textVersion += `${ui[lang].recsIntro} ${recs.map((item) => item[0]).join(", ")}\n`;
        }
      });
      textVersion += "\n";

      return `
          <article class="day-card">
            <h3>${dayTitle}</h3>
            <div class="timeline">
              ${slots
                .map(
                  ([time, content, recs, type]) => `
                <div class="slot">
                  <strong>${time}</strong>
                  <div>
                    <h4>${content[0]}</h4>
                    <p>${content[1]}</p>
                    ${renderRecommendations(recs || [], type)}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </article>
        `;
    })
    .join("");

  const tips = buildTips(values, lang);
  const tipsHtml = tips
    .map(
      (tip) => `
        <div class="tip">
          <strong>${tip[0]}</strong>
          ${tip[1]}
        </div>
      `,
    )
    .join("");

  tips.forEach((tip) => {
    textVersion += `${tip[0]}: ${tip[1]}\n`;
  });

  return { summary, daysHtml, tipsHtml, copyText: textVersion };
}
