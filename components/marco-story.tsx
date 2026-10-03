import { ROBIN_IMG } from "@/lib/site";
import { marco } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { THome } from "@/components/t-home";

export function MarcoStory({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="chi-marco" className="mt-8 border-t border-border pt-8">
      <h2 id="chi-marco" className="font-serif text-2xl text-foreground sm:text-3xl">
        <THome k={marco.title} lang={lang} />
      </h2>
      <div className="mt-4 grid gap-6 md:grid-cols-[1.45fr_0.85fr]">
        <div className="grid gap-4 text-sm leading-7 text-foreground sm:text-[15px] sm:leading-8">
          <p className="m-0 font-semibold">
            <THome k={marco.greeting} lang={lang} />
          </p>
          <p className="m-0">
            <THome k={marco.p1} lang={lang} />
          </p>
          <p className="m-0">
            <THome k={marco.p2} lang={lang} />
          </p>
          <p className="m-0">
            <THome k={marco.p3} lang={lang} />
          </p>
          <p className="m-0">
            <THome k={marco.p4} lang={lang} />
          </p>
          <p className="m-0">
            <THome k={marco.p5} lang={lang} />
          </p>
          <p className="m-0">
            <THome k={marco.p6} lang={lang} />
          </p>
          <p className="m-0 font-semibold">
            <THome k={marco.sign} lang={lang} />
          </p>
        </div>
        <figure className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ROBIN_IMG} alt="Il pettirosso di Marco" className="w-full rounded-xl" loading="lazy" />
          <figcaption className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            <THome k={marco.caption} lang={lang} />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
