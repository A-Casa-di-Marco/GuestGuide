"use client";

import { useEffect, type RefObject } from "react";

const WASTE_LABELS = {
  it: { category: "Categoria", what: "Cosa mettere", attention: "Attenzione" },
  en: { category: "Category", what: "What to put", attention: "Pay attention" },
  es: { category: "Categoría", what: "Qué poner", attention: "Atención" },
  fr: { category: "Catégorie", what: "Quoi jeter", attention: "Attention" },
  de: { category: "Kategorie", what: "Was hineingehört", attention: "Achtung" },
} as const;

const WIFI_COPIED: Record<Lang, string> = {
  it: "Copiata ✓",
  en: "Copied ✓",
  es: "Copiada ✓",
  fr: "Copié ✓",
  de: "Kopiert ✓",
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      return true;
    } catch {
      return false;
    }
  }
}

function flashLabel(el: HTMLElement, msg: string) {
  const orig = el.textContent;
  el.textContent = msg;
  window.setTimeout(() => {
    el.textContent = orig;
  }, 2000);
}

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

    // 2. Wi-Fi: i browser non permettono il join diretto alla rete per motivi
    // di sicurezza: copiamo la password e apriamo il pannello Wi-Fi del
    // telefono (Android via intent, iOS via preferenze). Il link porta anche
    // l'URI WIFI: standard come progressivo miglioramento.
    const onWifiClick = async (e: Event) => {
      const el = (e.target as HTMLElement).closest?.("[data-wifi-join],[data-wifi-copy]") as HTMLElement | null;
      if (!el || !el.closest(".legacy-content")) return;
      if (el.hasAttribute("data-wifi-copy")) {
        e.preventDefault();
        const value = el.getAttribute("data-copy-value") || "";
        if (value && (await copyText(value))) flashLabel(el, WIFI_COPIED[lang] || WIFI_COPIED.it);
        return;
      }
      const ssid = el.getAttribute("data-ssid") || "";
      const password = el.getAttribute("data-password") || "";
      const auth = el.getAttribute("data-auth") || "WPA";
      const wifiUri = `WIFI:T:${auth};S:${ssid};P:${password};;`;
      if (password && (await copyText(password))) flashLabel(el, WIFI_COPIED[lang] || WIFI_COPIED.it);
      const ua = navigator.userAgent || "";
      if (/Android/i.test(ua)) {
        e.preventDefault();
        window.location.href = "intent:#Intent;action=android.settings.WIFI_SETTINGS;end";
        return;
      }
      if (/iPhone|iPad|iPod/i.test(ua)) {
        e.preventDefault();
        window.location.href = "App-Prefs:WIFI";
        window.setTimeout(() => {
          window.location.href = wifiUri;
        }, 600);
        return;
      }
      e.preventDefault();
    };
    document.addEventListener("click", onWifiClick);

    const root = ref.current;
    if (!root) {
      return () => {
        document.removeEventListener("click", onMokaClick);
        document.removeEventListener("click", onWifiClick);
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
      document.removeEventListener("click", onWifiClick);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [ref, lang, contentKey]);
}
