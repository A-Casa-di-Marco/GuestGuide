import { HERO_IMG } from "@/lib/site";
import { hero } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { THome } from "@/components/t-home";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section aria-label="A Casa di Marco" className="relative overflow-hidden rounded-[20px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMG}
        alt="Giardino di A Casa di Marco"
        className="h-[320px] w-full object-cover md:h-[420px]"
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent dark:from-black/70 dark:via-black/45"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            <THome k={hero.badge} lang={lang} />
          </p>
          <h1 className="font-serif text-5xl text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] md:text-6xl">
            <THome k={hero.title} lang={lang} />
          </h1>
          <p className="mt-2 text-[15px] text-white">
            <THome k={hero.sub} lang={lang} />
          </p>
        </div>
      </div>
    </section>
  );
}
