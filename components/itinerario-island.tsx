"use client";

import { useEffect, useState } from "react";
import { generate, type ItineraryValues } from "@/lib/itinerario-engine";
import { ui } from "@/lib/legacy/itinerario-data.generated";
import type { Lang } from "@/lib/i18n";
import { withLang } from "@/lib/lang-server";

function readValues(form: HTMLFormElement): ItineraryValues {
  const get = (id: string) => {
    const el = form.querySelector(`#${id}`) as HTMLInputElement | HTMLSelectElement | null;
    return el?.value || "";
  };
  const checked = (name: string) =>
    Array.from(form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)).map((el) => el.value);
  const foodMoods = checked("foodMood");
  return {
    days: get("days"),
    transport: get("transport"),
    pace: get("pace"),
    walking: get("walking"),
    interests: checked("interest"),
    children: get("children"),
    returnTime: get("returnTime"),
    foodMoods: foodMoods.length ? foodMoods : ["typical"],
    budget: get("budget"),
    crowd: get("crowd"),
    season: get("season"),
    seaType: get("seaType"),
    experience: get("experience"),
    alreadySeen: (form.querySelector<HTMLInputElement>("#alreadySeen")?.value || ""),
  };
}

/** Collega il form statico (verbatim) al motore del planner. */
export function ItinerarioIsland({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const form = document.getElementById("itineraryForm") as HTMLFormElement | null;
    const resultSection = document.getElementById("resultSection");
    const output = document.getElementById("itineraryOutput");
    const summaryCard = document.getElementById("summaryCard");
    const tipsGrid = document.getElementById("tipsGrid");
    const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement | null;
    if (!form || !resultSection || !output || !summaryCard || !tipsGrid) return;
    let text = "";

    const localizeLinks = (html: string) =>
      html
        .replaceAll('href="mangiare.html"', `href="${withLang("/permanenza/mangiare", lang)}"`)
        .replaceAll('href="luoghi.html"', `href="${withLang("/permanenza/luoghi", lang)}"`);

    const onSubmit = (event: Event) => {
      event.preventDefault();
      const values = readValues(form);
      if (values.pace === "relax" && Number(values.days) > 4) {
        values.interests = values.interests.filter((item) => item !== "full");
      }
      const result = generate(values, lang);
      summaryCard.textContent = result.summary;
      output.innerHTML = localizeLinks(result.daysHtml);
      tipsGrid.innerHTML = result.tipsHtml;
      text = result.copyText;
      setCopied(false);
      resultSection.classList.add("show");
      resultSection.scrollIntoView({ block: "start" });
    };

    const onReset = () => {
      window.setTimeout(() => {
        resultSection.classList.remove("show");
        output.innerHTML = "";
        tipsGrid.innerHTML = "";
        text = "";
        setCopied(false);
      }, 0);
    };

    const onCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        if (copyBtn) copyBtn.textContent = ui[lang].copied;
        setCopied(true);
        window.setTimeout(() => {
          if (copyBtn) copyBtn.textContent = ui[lang].copy;
          setCopied(false);
        }, 1800);
      } catch {
        /* clipboard non disponibile */
      }
    };

    form.addEventListener("submit", onSubmit);
    form.addEventListener("reset", onReset);
    copyBtn?.addEventListener("click", onCopy);
    return () => {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("reset", onReset);
      copyBtn?.removeEventListener("click", onCopy);
    };
  }, [lang]);

  return (
    <span className="sr-only" aria-live="polite">
      {copied ? ui[lang].copied : ""}
    </span>
  );
}
