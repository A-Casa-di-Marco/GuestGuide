"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ui, type Lang } from "@/lib/i18n";

export function SaveGuideButton({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
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
