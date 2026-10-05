"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ui, type Lang } from "@/lib/i18n";
import { WHATSAPP_ASJA } from "@/lib/site";

/**
 * Casella "ho letto le regole" + dialogo di conferma.
 * Se spuntata si apre la finestra: se sì manda la conferma su WhatsApp, altrimenti rileggi.
 */
export function RulesAck({ lang }: { lang: Lang }) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const u = ui;
  const confirmHref = `${WHATSAPP_ASJA}?text=${encodeURIComponent(u.waAckMessage[lang])}`;

  return (
    <>
      <label className="mt-4 flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-[15px] text-card-foreground">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            setOpen(e.target.checked);
          }}
          className="h-5 w-5 shrink-0 accent-[#3a5a40]"
        />
        <span>{u.rulesCheckLabel[lang]}</span>
      </label>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setChecked(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{u.rulesDialogQ[lang]}</DialogTitle>
            <DialogDescription>{u.rulesDialogBody[lang]}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={() => {
                setChecked(false);
                setOpen(false);
              }}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-[15px] font-semibold text-card-foreground"
            >
              {u.rulesDialogBack[lang]}
            </button>
            <a
              href={confirmHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setChecked(false);
                setOpen(false);
              }}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-white no-underline"
            >
              {u.rulesDialogConfirm[lang]}
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
