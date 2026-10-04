"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/** Torna alla pagina precedente (hub) o alla rotta indicata se accesso diretto. */
export function BackButton({ label, fallbackHref }: { label: string; fallbackHref: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="mb-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
