"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
import { ui, type Lang } from "@/lib/i18n";
import { ImageLightbox } from "@/components/image-lightbox";

export type CheckinSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  image: string;
  imageAlt: string;
  contain?: boolean;
  belowImages?: { src: string; alt: string; contain?: boolean }[];
  bullets: string[];
  sections?: {
    title: string;
    bullets: string[];
    imageBefore?: { src: string; alt: string; contain?: boolean };
    imageAfter?: { src: string; alt: string; contain?: boolean };
  }[];
  note?: string;
};

type Props = {
  slides: CheckinSlide[];
  className?: string;
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
  lang: Lang;
};

/**
 * Carosello check-in: immagine sopra + testo sotto per ogni card.
 * Solo la card attiva è visibile; frecce laterali in rilievo (nascoste agli estremi).
 * Le immagini si aprono nel visualizzatore a tutto schermo.
 */
export function CheckinCarousel({ slides, className, ariaLabel, prevLabel, nextLabel, lang }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const [arrowTop, setArrowTop] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const single = slides.length === 1;
  const atStart = index === 0;
  const atEnd = index === slides.length - 1;

  // Le frecce seguono l'altezza della card attiva (centro verticale dell'immagine).
  useEffect(() => {
    const sync = () => {
      const root = rootRef.current;
      if (!root) return;
      const img = root.querySelector(".swiper-slide-active img") as HTMLElement | null;
      if (!img) return;
      const rootBox = root.getBoundingClientRect();
      const imgBox = img.getBoundingClientRect();
      setArrowTop(imgBox.top - rootBox.top + imgBox.height / 2);
    };
    sync();
    window.addEventListener("resize", sync);
    if (document.fonts?.ready) {
      document.fonts.ready.then(sync).catch(() => undefined);
    }
    const t = window.setTimeout(sync, 300);
    return () => {
      window.removeEventListener("resize", sync);
      window.clearTimeout(t);
    };
  }, [index, slides.length]);

  if (slides.length === 0) return null;

  const imgButton = (src: string, alt: string, contain?: boolean) => (
    <button
      key={src}
      type="button"
      onClick={() => setZoom({ src, alt })}
      aria-label={`${ui.enlargeImage[lang]}: ${alt}`}
      title={ui.enlargeImage[lang]}
      className="block w-full cursor-zoom-in bg-secondary p-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className={cn("aspect-[4/3] w-full", contain ? "object-contain" : "object-cover")}
      />
    </button>
  );

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <style>{`
        .checkin-swiper { width: 100%; overflow: hidden; border-radius: 14px; ${single ? "" : "padding-bottom: 40px !important;"} }
        .checkin-swiper .swiper-slide { border-radius: 14px; height: auto; }
        .checkin-swiper .swiper-pagination-bullet { background: var(--primary) !important; opacity: .35; width: 10px; height: 10px; }
        .checkin-swiper .swiper-pagination-bullet-active { opacity: 1; }
      `}</style>

      {!single && !atStart ? (
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          aria-label={prevLabel}
          style={arrowTop !== null ? { top: arrowTop } : undefined}
          className={cn(
            "absolute -left-2 z-10 inline-flex min-h-[48px] min-w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-lg sm:-left-5",
            arrowTop === null && "top-[38%]",
          )}
        >
          <ChevronLeftIcon className="h-6 w-6" aria-hidden />
        </button>
      ) : null}
      {!single && !atEnd ? (
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          aria-label={nextLabel}
          style={arrowTop !== null ? { top: arrowTop } : undefined}
          className={cn(
            "absolute -right-2 z-10 inline-flex min-h-[48px] min-w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-lg sm:-right-5",
            arrowTop === null && "top-[38%]",
          )}
        >
          <ChevronRightIcon className="h-6 w-6" aria-hidden />
        </button>
      ) : null}

      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setIndex(s.realIndex ?? s.activeIndex)}
        grabCursor={!single}
        allowTouchMove={!single}
        slidesPerView={1}
        spaceBetween={0}
        loop={false}
        keyboard={{ enabled: true }}
        pagination={single ? false : { clickable: true }}
        modules={[Pagination, Keyboard, A11y]}
        className="checkin-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="overflow-hidden rounded-[14px] border border-border bg-card text-card-foreground">
              {imgButton(slide.image, slide.imageAlt, slide.contain)}
              <div className="p-5 md:p-6">
                {slide.eyebrow ? (
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {slide.eyebrow}
                  </p>
                ) : null}
                <h3 className="font-serif text-xl text-card-foreground sm:text-2xl">{slide.title}</h3>
                <ul className="mt-3 grid list-none gap-2 p-0">
                  {slide.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="rounded-xl bg-secondary px-4 py-3 text-[15px] leading-relaxed text-secondary-foreground"
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </ul>
                {slide.sections?.map((sec) => (
                  <div key={sec.title} className="mt-4">
                    {sec.imageBefore ? (
                      <div className="mb-3 overflow-hidden rounded-xl">
                        {imgButton(sec.imageBefore.src, sec.imageBefore.alt, sec.imageBefore.contain ?? true)}
                      </div>
                    ) : null}
                    <h4 className="text-[18px] font-bold text-card-foreground">{sec.title}</h4>
                    <ul className="mt-2 grid list-none gap-2 p-0">
                      {sec.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="rounded-xl bg-secondary px-4 py-3 text-[15px] leading-relaxed text-secondary-foreground"
                          dangerouslySetInnerHTML={{ __html: b }}
                        />
                      ))}
                    </ul>
                    {sec.imageAfter ? (
                      <div className="mt-3 overflow-hidden rounded-xl">
                        {imgButton(sec.imageAfter.src, sec.imageAfter.alt, sec.imageAfter.contain ?? true)}
                      </div>
                    ) : null}
                  </div>
                ))}
                {slide.note ? (
                  <p
                    className="mt-3 rounded-xl bg-accent px-4 py-3 text-[15px] text-accent-foreground"
                    dangerouslySetInnerHTML={{ __html: slide.note }}
                  />
                ) : null}
                {slide.belowImages?.map((img) => (
                  <div key={img.src} className="mt-4 overflow-hidden rounded-xl">
                    {imgButton(img.src, img.alt, img.contain ?? true)}
                  </div>
                ))}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {!single ? (
        <p aria-live="polite" className="mt-1 text-center text-sm text-muted-foreground">
          {index + 1} / {slides.length}
        </p>
      ) : null}

      <ImageLightbox
        key={zoom?.src ?? "closed"}
        src={zoom?.src || null}
        alt={zoom?.alt || ""}
        lang={lang}
        onClose={() => setZoom(null)}
      />
    </div>
  );
}
