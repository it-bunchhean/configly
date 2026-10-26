import { MetadataRoute } from "next";

const siteUrl = "https://configly.site";
const formatSlugs = ["properties", "yaml", "xml", "json", "toml", "env"];

export default function sitemap(): MetadataRoute.Sitemap {
  const conversionPages = formatSlugs.flatMap((from) =>
    formatSlugs
      .filter((to) => to !== from)
      .map((to) => ({
        url: `${siteUrl}/tools/${from}-to-${to}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/documents`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...conversionPages,
  ];
}
