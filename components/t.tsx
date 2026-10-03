type Props = {
  text: string;
  html?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "li" | "div" | "strong" | "small";
  className?: string;
};

/** Testo verbatim già risolto (via tHome/tCheckin): plain o HTML. */
export function T({ text, html = false, as = "span", className }: Props) {
  const Tag = as as "span";
  if (!text) return null;
  if (html) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <Tag className={className}>{text}</Tag>;
}
