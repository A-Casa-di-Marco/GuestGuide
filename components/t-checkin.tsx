import { isCheckinHtml, tCheckin } from "@/lib/content-checkin";
import type { Lang } from "@/lib/i18n";
import { T as Base } from "@/components/t";

type Props = {
  k: string;
  lang: Lang;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "li" | "div" | "strong" | "small";
  className?: string;
};

/** Testo verbatim check-in/out (public/checkin.html). */
export function TCheckin({ k, lang, as = "span", className }: Props) {
  return <Base text={tCheckin(k, lang)} html={isCheckinHtml(k)} as={as} className={className} />;
}
