import { footer } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { THome } from "@/components/t-home";

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-primary px-5 py-8 text-center text-[15px] text-primary-foreground">
      <p className="m-1">
        <THome k={footer.line1} lang={lang} />
      </p>
      <p className="m-1">
        <THome k={footer.line2} lang={lang} />
      </p>
    </footer>
  );
}
