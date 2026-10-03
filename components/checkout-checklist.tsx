"use client";

import { useState } from "react";
import { checkout, tCheckin } from "@/lib/content-checkin";
import type { Lang } from "@/lib/i18n";
import { WHATSAPP_ASJA } from "@/lib/site";
import { TCheckin } from "@/components/t-checkin";

const KEYS = [
  "lights",
  "taps",
  "climate",
  "belongings",
  "towels",
  "rubbish",
  "door",
  "keys",
  "message",
] as const;

const PROGRESS_LABEL: Record<Lang, { completed: string; allDone: string }> = {
  it: { completed: "completati", allDone: "Tutto fatto! Grazie per la collaborazione 💛" },
  en: { completed: "completed", allDone: "All done! Thank you for your cooperation 💛" },
  es: { completed: "completados", allDone: "¡Todo listo! Gracias por vuestra colaboración 💛" },
  fr: { completed: "terminés", allDone: "Tout est fait ! Merci pour votre collaboration 💛" },
  de: { completed: "erledigt", allDone: "Alles erledigt! Danke für eure Mithilfe 💛" },
};

function storageKey(lang: Lang) {
  return `checkoutChecklist_${lang}`;
}

export function CheckoutChecklist({ lang }: { lang: Lang }) {
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const raw = window.localStorage?.getItem(storageKey(lang));
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, boolean>;
        return KEYS.map((k) => saved[k] === true);
      }
    } catch {
      /* ignora */
    }
    return KEYS.map(() => false);
  });
  const [celebrated, setCelebrated] = useState(false);

  const done = checked.filter(Boolean).length;
  const complete = done === KEYS.length;
  const labels = PROGRESS_LABEL[lang];
  const percent = Math.round((done / KEYS.length) * 100);

  const toggle = (i: number) => {
    const next = checked.map((v, j) => (j === i ? !v : v));
    setChecked(next);
    try {
      const state: Record<string, boolean> = {};
      KEYS.forEach((k, j) => {
        state[k] = next[j];
      });
      window.localStorage.setItem(storageKey(lang), JSON.stringify(state));
    } catch {
      /* ignora */
    }
    const nowComplete = next.every(Boolean);
    if (nowComplete && !celebrated) {
      setCelebrated(true);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) launchConfetti();
    }
    if (!nowComplete) setCelebrated(false);
  };

  return (
    <div className="mt-6">
      <div className="py-5">
        <strong className="font-serif text-[28px] font-normal text-foreground">
          <TCheckin k={checkout.listTitle} lang={lang} />
        </strong>
        <p className="mt-1 text-foreground">
          <TCheckin k={checkout.listIntro} lang={lang} />
        </p>
      </div>

      <div className="mb-5 text-center font-bold text-foreground" role="status" aria-live="polite">
        <div
          className="mb-2 h-[10px] overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={done}
          aria-valuemin={0}
          aria-valuemax={KEYS.length}
        >
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-[13px]">
          {complete ? labels.allDone : `${done}/${KEYS.length} ${labels.completed}`}
        </span>
      </div>

      <div className="grid gap-2.5 md:grid-cols-2">
        {checkout.items.map((key, i) => (
          <label
            key={key}
            className="flex min-h-[86px] cursor-pointer items-center gap-3 rounded-[12px] border border-border bg-card p-[18px] text-card-foreground md:min-h-[72px]"
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="h-[22px] w-[22px] shrink-0 accent-primary"
            />
            <span aria-hidden className="text-xs text-muted-foreground">
              {i + 1}
            </span>
            <span className="text-[15px] leading-snug">{tCheckin(key, lang)}</span>
          </label>
        ))}
      </div>

      <a
        href={WHATSAPP_ASJA}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-[9px] bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground no-underline"
      >
        <TCheckin k={checkout.departCta} lang={lang} />
      </a>

      {complete ? (
        <div className="mt-4 rounded-[12px] bg-secondary p-4 text-center font-bold text-secondary-foreground">
          <TCheckin k={checkout.done} lang={lang} />
        </div>
      ) : null}
      <div className="mt-4 rounded-[18px] bg-accent p-4 text-[15px] text-accent-foreground">
        <TCheckin k={checkout.thanks} lang={lang} />
      </div>
    </div>
  );
}

function launchConfetti() {
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText =
    "position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999;";
  document.body.appendChild(layer);
  const colors = ["#3a5a40", "#e7ede3", "#f7f2e2", "#caa75d", "#a35c3c", "#ffffff"]; // palette:legacy (confetti, stessi colori del sito statico)
  for (let i = 0; i < 85; i++) {
    const piece = document.createElement("span");
    piece.style.cssText = `position:absolute;top:-14px;width:9px;height:14px;border-radius:3px;left:${Math.random() * 100}vw;background:${colors[i % colors.length]};animation:acdm-confetti 1.8s linear forwards;animation-delay:${Math.random() * 0.35}s;`;
    layer.appendChild(piece);
  }
  const style = document.createElement("style");
  style.textContent =
    "@keyframes acdm-confetti{0%{transform:translateY(-20px) rotate(0);opacity:1}100%{transform:translateY(105vh) rotate(720deg);opacity:0}}";
  document.head.appendChild(style);
  window.setTimeout(() => {
    layer.remove();
    style.remove();
  }, 2400);
}
