import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://a-casa-di-maro.casa-di-marco.workers.dev";
  const langs = ["it", "en", "es", "fr", "de"];
  const routes = ["", "/check-in", "/permanenza", "/check-out"];
  return routes.flatMap((route) =>
    langs.map((lang) => ({
      url: `${base}${route || "/"}?lang=${lang}`,
      lastModified: new Date(),
    })),
  );
}
