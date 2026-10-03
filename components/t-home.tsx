import { isHomeHtml, tHome } from "@/lib/content-home";
import type { Lang } from "@/lib/i18n";
import { T as Base } from "@/components/t";

type Props = {
  k: string;
  lang: Lang;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "li" | "div" | "strong" | "small";
  className?: string;
};

/** Testo verbatim home (public/index.html). */
export function THome({ k, lang, as = "span", className }: Props) {
  return <Base text={tHome(k, lang)} html={isHomeHtml(k)} as={as} className={className} />;
}
