"use client";

import { useEffect, type RefObject } from "react";

const WASTE_LABELS = {
  it: { category: "Categoria", what: "Cosa mettere", attention: "Attenzione" },
  en: { category: "Category", what: "What to put", attention: "Pay attention" },
  es: { category: "Categoría", what: "Qué poner", attention: "Atención" },
  fr: { category: "Catégorie", what: "Quoi jeter", attention: "Attention" },
  de: { category: "Kategorie", what: "Was hineingehört", attention: "Achtung" },
} as const;

type Lang = keyof typeof WASTE_LABELS;

/**
 * Ripristina i comportamenti nativi dello statico dentro HTML verbatim:
 * selettore moka, apertura <details> da anchor, label responsive rifiuti.
 */
export function useLegacyEnhancers(ref: RefObject<HTMLElement | null>, lang: Lang, contentKey?: string | null) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mokaBtns = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-moka-target]"));
    const onMoka = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const target = btn.getAttribute("data-moka-target");
      root.querySelectorAll(".moka-option").forEach((opt) => {
        (opt as HTMLElement).hidden = opt.id !== target;
      });
    };
    mokaBtns.forEach((b) => b.addEventListener("click", onMoka));

    const waste = root.querySelector<HTMLElement>(".waste-table");
    if (waste) {
      const labels = WASTE_LABELS[lang] || WASTE_LABELS.it;
      waste.style.setProperty("--waste-label-category", JSON.stringify(labels.category));
      waste.style.setProperty("--waste-label-what", JSON.stringify(labels.what));
      waste.style.setProperty("--waste-label-attention", JSON.stringify(labels.attention));
    }

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
  }, [ref, lang, contentKey]);
}
