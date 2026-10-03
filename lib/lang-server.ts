import { cookies } from "next/headers";
import { parseLang, type Lang } from "./i18n";

export async function resolveLang(
  searchParams: Record<string, string | string[] | undefined>,
): Promise<Lang> {
  const qp = searchParams.lang;
  if (typeof qp === "string" && qp) return parseLang(qp);
  try {
    const jar = await cookies();
    return parseLang(jar.get("guestGuideLang")?.value);
  } catch {
    return "it";
  }
}

export function withLang(href: string, lang: Lang): string {
  if (href.startsWith("http")) {
    return href;
  }
  if (href === "/") return `/?lang=${lang}`;
  if (href.startsWith("/")) return `${href}?lang=${lang}`;
  // pagine legacy statiche: preserva ?lang=
  return `${href}?lang=${lang}`;
}
