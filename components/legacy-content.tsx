"use client";

import { useRef } from "react";
import { useLegacyEnhancers } from "@/components/use-legacy-enhancers";

type Lang = "it" | "en" | "es" | "fr" | "de";

/** Contenuto legacy risolto per-lingua (verbatim) + comportamenti nativi. */
export function LegacyContent({ html, lang }: { html: string; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  useLegacyEnhancers(ref, lang);

  return <div ref={ref} className="legacy-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
