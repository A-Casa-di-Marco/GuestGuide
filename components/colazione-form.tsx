"use client";

import { useState } from "react";
import {
  FORM_TEXTS,
  SNACK_OPTIONS,
  WHATSAPP_NUMBER,
  guestCountLabel,
  guestCountPlaceholder,
  sendLabel,
} from "@/lib/legacy/colazione-data.generated";
import type { Lang } from "@/lib/i18n";

function isBeforeDeadline(now = new Date()): boolean {
  const hour = now.getHours();
  const minutes = now.getMinutes();
  if (hour < 19) return true;
  if (hour === 19 && minutes === 0) return true;
  return false;
}

/** Modulo ordine snack (port nativo del form legacy, stessi testi e regole). */
export function ColazioneForm({ lang }: { lang: Lang }) {
  const [count, setCount] = useState(0);
  const [snacks, setSnacks] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  if (!isBeforeDeadline()) {
    return (
      <div className="legacy-content">
        <div className="breakfast-order-box">
          <p className="order-status">{FORM_TEXTS.closed[lang]}</p>
        </div>
      </div>
    );
  }

  const pickCount = (n: number) => {
    setCount(n);
    setSnacks(Array(n).fill(""));
    setStatus(null);
  };

  const send = () => {
    if (!count) {
      setStatus(FORM_TEXTS.complete[lang]);
      return;
    }
    if (snacks.some((s) => !s)) {
      setStatus(FORM_TEXTS.complete[lang]);
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowText = tomorrow.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let message = "Buongiorno, vorremmo comunicare gli snack per la colazione di domani.\n\n";
    message += "📅 Colazione per: " + tomorrowText + "\n";
    message += "👥 Numero ospiti indicato: " + count + "\n\n";
    message += "Ordine snack:\n";
    snacks.forEach((snack, i) => {
      message += i + 1 + ". " + snack + "\n";
    });
    message += "\nNota: se il numero indicato è superiore agli ospiti presenti nella prenotazione, verranno considerati solo i primi ordini corrispondenti al numero di ospiti realmente prenotati.";
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank");
  };

  return (
    <div className="legacy-content">
      <div className="breakfast-order-box">
      <div className="form-group">
        <label htmlFor="guestCount">{guestCountLabel[lang]}</label>
        <select
          id="guestCount"
          value={count || ""}
          onChange={(e) => pickCount(Number(e.target.value) || 0)}
        >
          <option value="">{guestCountPlaceholder[lang]}</option>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="guest-snacks">
        {snacks.map((s, i) => (
          <div key={i} className="guest-snack-card">
            <strong>
              {FORM_TEXTS.guest[lang]} {i + 1}
            </strong>
            <label htmlFor={`snackGuest${i + 1}`}>{FORM_TEXTS.chooseSnack[lang]}</label>
            <select
              id={`snackGuest${i + 1}`}
              className="snack-select"
              value={s}
              onChange={(e) => setSnacks(snacks.map((v, j) => (j === i ? e.target.value : v)))}
            >
              <option value="">{FORM_TEXTS.selectSnack[lang]}</option>
              {SNACK_OPTIONS[lang].map((snack) => (
                <option key={snack} value={snack}>
                  {snack}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {count > 0 ? (
        <button type="button" className="btn" onClick={send}>
          {sendLabel[lang]}
        </button>
      ) : null}
      <div className="order-status" role="status">
        {status ?? FORM_TEXTS.open[lang]}
      </div>
      </div>
    </div>
  );
}
