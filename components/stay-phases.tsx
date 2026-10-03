"use client";

import { useState } from "react";
import { stayPhases, stayTabs, tHome } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { withLang } from "@/lib/lang-server";
import { THome } from "@/components/t-home";
import { cn } from "@/lib/utils";

export function StayPhases({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState(0);
  const current = stayPhases[phase];

  return (
    <section aria-label={tHome(stayTabs[0], lang)} className="mt-6">
      <div role="tablist" aria-label={tHome(stayTabs[0], lang)} className="grid grid-cols-3 gap-1 rounded-[11px] bg-secondary p-1">
        {stayPhases.map((p, i) => (
          <button
            key={p.tabKey}
            type="button"
            role="tab"
            aria-selected={phase === i}
            onClick={() => setPhase(i)}
            className={cn(
              "min-h-[44px] rounded-[8px] px-2 py-2 text-[13px] font-medium md:text-[15px]",
              phase === i ? "bg-primary text-primary-foreground" : "text-secondary-foreground",
            )}
          >
            <THome k={p.tabKey} lang={lang} />
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-3 rounded-[14px] bg-secondary p-6 text-secondary-foreground md:p-7">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <THome k={current.kickerKey} lang={lang} />
        </p>
        <h3 className="mt-1 font-serif text-3xl">
          <THome k={current.titleKey} lang={lang} />
        </h3>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed md:text-base">
          <THome k={current.textKey} lang={lang} />
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={withLang(current.ctaHref, lang)}
            {...(current.ctaHref.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className="inline-flex min-h-[48px] items-center justify-center rounded-[9px] bg-primary px-5 py-3 text-[15px] font-medium text-primary-foreground no-underline"
          >
            <THome k={current.ctaKey} lang={lang} />
          </a>
          {current.cta2Key && current.cta2Href ? (
            <a
              href={withLang(current.cta2Href, lang)}
              {...(current.cta2Href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[9px] border border-border bg-card px-5 py-3 text-[15px] font-medium text-card-foreground no-underline"
            >
              <THome k={current.cta2Key} lang={lang} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
