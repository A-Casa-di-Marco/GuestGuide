"use client";

import { useEffect, useRef } from "react";

const WASTE_LABELS = {
  it: { category: "Categoria", what: "Cosa mettere", attention: "Attenzione" },
  en: { category: "Category", what: "What to put", attention: "Pay attention" },
  es: { category: "Categoría", what: "Qué poner", attention: "Atención" },
  fr: { category: "Catégorie", what: "Quoi jeter", attention: "Attention" },
  de: { category: "Kategorie", what: "Was hineingehört", attention: "Achtung" },
} as const;

type Lang = keyof typeof WASTE_LABELS;

/**
 * Contenuto legacy risolto per-lingua (verbatim) + enhancer che ripristina i
 * comportamenti nativi dello statico: apertura <details> da anchor, selettore
 * moka, label responsive della tabella rifiuti. Nessun JS legacy eseguito.
 */
export function LegacyContent({ html, lang }: { html: string; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // 1. Moka: pulsanti [data-moka-target] mostrano l'opzione corrispondente.
    const mokaBtns = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-moka-target]"));
    const onMoka = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const target = btn.getAttribute("data-moka-target");
      root.querySelectorAll(".moka-option").forEach((opt) => {
        (opt as HTMLElement).hidden = opt.id !== target;
      });
    };
    mokaBtns.forEach((b) => b.addEventListener("click", onMoka));

    // 2. Immagini moka già risolte per lingua in build (is-active baked); niente da fare.

    // 3. Label responsive tabella rifiuti (come lo statico, via CSS vars).
    const waste = root.querySelector<HTMLElement>(".waste-table");
    if (waste) {
      const labels = WASTE_LABELS[lang] || WASTE_LABELS.it;
      waste.style.setProperty("--waste-label-category", JSON.stringify(labels.category));
      waste.style.setProperty("--waste-label-what", JSON.stringify(labels.what));
      waste.style.setProperty("--waste-label-attention", JSON.stringify(labels.attention));
    }

    // 4. Apertura <details> antenati da anchor (deep link a sezioni).
    const openFromHash = () => {
      const key = decodeURIComponent(window.location.hash.slice(1));
      if (!key) return;
      const el = root.querySelector(`#${CSS.escape(key)}`);
      if (!el) return;
      let parent: HTMLElement | null = el as HTMLElement;
      while (parent && parent !== root) {
        if (parent.tagName === "DETAILS") (parent as HTMLDetailsElement).open = true;
        parent = parent.parentElement;
      }
      el.scrollIntoView({ block: "start" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      mokaBtns.forEach((b) => b.removeEventListener("click", onMoka));
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [lang]);

  return <div ref={ref} className="legacy-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
