"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { isLang } from "@/lib/i18n";

/**
 * Sincronizza la lingua tra URL (?lang=), cookie, localStorage e <html lang>.
 * Stesse chiavi dello statico per non rompere i link personalizzati esistenti.
 */
export function LanguageSync() {
  const params = useSearchParams();

  useEffect(() => {
    try {
      const qp = params.get("lang");
      let lang = qp && isLang(qp) ? qp : null;
      if (!lang) {
        const saved = window.localStorage.getItem("guestGuideLang");
        lang = saved && isLang(saved) ? saved : "it";
      }
      window.localStorage.setItem("guestGuideLang", lang);
      document.cookie = `guestGuideLang=${lang}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      document.documentElement.lang = lang;
    } catch {
      /* storage non disponibile: ignora */
    }
  }, [params]);

  return null;
}
