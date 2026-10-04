"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ui, type Lang } from "@/lib/i18n";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
    if ((window.navigator as Navigator & { standalone?: boolean }).standalone === true) return true;
    if (document.referrer.startsWith("android-app://")) return true;
  } catch {
    /* ignora */
  }
  return false;
}

export function SaveGuideButton({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const sync = () => setInstalled(isStandalone());
    sync();
    const mq = window.matchMedia("(display-mode: standalone)");
    const onChange = () => sync();
    mq.addEventListener?.("change", onChange);
    window.addEventListener("appinstalled", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      window.removeEventListener("appinstalled", onChange);
    };
  }, []);

  // Guida già installata come app: il pulsante non serve.
  if (installed) return null;

  return (
    <div className="mb-5">
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="min-h-[46px] rounded-full bg-primary text-primary-foreground"
      >
        {ui.saveGuide[lang]}
      </Button>
      {open ? (
        <div className="mt-3 rounded-[14px] border border-border bg-secondary p-4 text-secondary-foreground">
          <p className="mb-2 text-sm" dangerouslySetInnerHTML={{ __html: ui.saveAndroid[lang] }} />
          <p className="m-0 text-sm" dangerouslySetInnerHTML={{ __html: ui.saveIPhone[lang] }} />
        </div>
      ) : null}
    </div>
  );
}
