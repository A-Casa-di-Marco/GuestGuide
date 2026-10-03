"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Pagination, EffectCreative, Keyboard, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";

export type CheckinSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  image: string;
  imageAlt: string;
  contain?: boolean;
  extraImages?: { src: string; alt: string; contain?: boolean }[];
  bullets: string[];
  sections?: { title: string; bullets: string[] }[];
  note?: string;
};

type Props = {
  slides: CheckinSlide[];
  className?: string;
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
};

/**
 * Carosello check-in: immagine sopra + testo sotto per ogni card.
 * Basato su Carousel_005 (Swiper effect-creative), ma content-driven e senza autoplay.
 */
export function CheckinCarousel({ slides, className, ariaLabel, prevLabel, nextLabel }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn("w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <style>{`
        .checkin-swiper { width: 100%; padding-bottom: 44px !important; }
        .checkin-swiper .swiper-slide { border-radius: 14px; }
        .checkin-swiper .swiper-pagination-bullet { background: var(--primary) !important; opacity: .35; width: 10px; height: 10px; }
        .checkin-swiper .swiper-pagination-bullet-active { opacity: 1; }
      `}</style>
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setIndex(s.realIndex ?? s.activeIndex)}
        effect="creative"
        grabCursor
        centeredSlides
        slidesPerView={1}
        loop={slides.length > 1}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        creativeEffect={{ prev: { shadow: true, translate: [0, 0, -400] }, next: { translate: ["100%", 0, 0] } }}
        modules={[EffectCreative, Pagination, Keyboard, A11y]}
        className="checkin-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="overflow-hidden rounded-[14px] border border-border bg-card text-card-foreground">
              {slide.extraImages?.length ? (
                <div className="grid grid-cols-2 gap-px bg-border">
                  {[{ src: slide.image, alt: slide.imageAlt, contain: slide.contain }, ...slide.extraImages].map(
                    (img, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className={cn(
                          "aspect-[4/3] w-full bg-secondary",
                          img.contain ? "object-contain" : "object-cover",
                        )}
                      />
                    ),
                  )}
                </div>
              ) : (
                <div className="bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    loading="lazy"
                    className={cn(
                      "aspect-[4/3] w-full",
                      slide.contain ? "object-contain" : "object-cover",
                    )}
                  />
                </div>
              )}
              <div className="p-5 md:p-6">
                {slide.eyebrow ? (
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {slide.eyebrow}
                  </p>
                ) : null}
                <h3 className="font-serif text-2xl text-card-foreground">{slide.title}</h3>
                <ul className="mt-3 grid list-none gap-2 p-0">
                  {slide.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="rounded-xl bg-secondary px-4 py-3 text-[15px] leading-relaxed text-secondary-foreground"
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </ul>
                {slide.note ? (
                  <p
                    className="mt-3 rounded-xl bg-accent px-4 py-3 text-[15px] text-accent-foreground"
                    dangerouslySetInnerHTML={{ __html: slide.note }}
                  />
                ) : null}
                {slide.sections?.map((sec) => (
                  <div key={sec.title} className="mt-4">
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
                  </div>
                ))}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-1 flex items-center justify-between gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-[15px] font-medium text-card-foreground"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden />
          {prevLabel}
        </button>
        <span aria-live="polite" className="text-sm text-muted-foreground">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-primary px-5 py-2 text-[15px] font-semibold text-primary-foreground"
        >
          {nextLabel}
          <ChevronRightIcon className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
