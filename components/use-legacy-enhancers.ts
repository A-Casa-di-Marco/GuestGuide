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
 *
 * Nota: il click moka è delegato a `document` (non al contenitore) così
 * funziona anche se il contenuto viene montato dopo l'effetto o spostato
 * in un portal (es. overlay corso di apertura).
 */
export function useLegacyEnhancers(ref: RefObject<HTMLElement | null>, lang: Lang, contentKey?: string | null) {
  useEffect(() => {
    const onMokaClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest?.("[data-moka-target]") as HTMLButtonElement | null;
      if (!btn) return;
      const root = btn.closest(".legacy-content");
      if (!root) return;
      const target = btn.getAttribute("data-moka-target");
      root.querySelectorAll(".moka-option").forEach((opt) => {
        (opt as HTMLElement).hidden = opt.id !== target;
      });
    };
    document.addEventListener("click", onMokaClick);

    const root = ref.current;
    if (!root) {
      return () => {
        document.removeEventListener("click", onMokaClick);
      };
    }

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
      document.removeEventListener("click", onMokaClick);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [ref, lang, contentKey]);
}
