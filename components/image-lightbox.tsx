"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { ui, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  lang: Lang;
  onClose: () => void;
};

/** Visualizzatore immagini a tutto schermo con zoom e chiusura. */
export function ImageLightbox({ src, alt, lang, onClose }: Props) {
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!src) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, close]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex flex-col bg-black/85 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div className="flex justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={ui.closeViewer[lang]}
          className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-white/15 text-white"
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
      </div>
      <div
        className="flex min-h-0 flex-1 items-center justify-center overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full rounded-xl object-contain transition-transform"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
      </div>
      <div
        className="flex items-center justify-center gap-3 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
          disabled={zoom <= 1}
          aria-label={ui.zoomOut[lang]}
          className={cn(
            "inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-white/15 text-white",
            zoom <= 1 && "opacity-40",
          )}
        >
          <Minus className="h-6 w-6" aria-hidden />
        </button>
        <span aria-hidden className="min-w-[3rem] text-center text-sm font-semibold text-white">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)))}
          disabled={zoom >= 3}
          aria-label={ui.zoomIn[lang]}
          className={cn(
            "inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-white/15 text-white",
            zoom >= 3 && "opacity-40",
          )}
        >
          <Plus className="h-6 w-6" aria-hidden />
        </button>
      </div>
    </div>
  );
}
