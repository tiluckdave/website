import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getAllContent } from "@/lib/mdx";

const BASE_URL = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const contentItems = getAllContent();

  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...contentItems.map((item) => {
      const priority = item.category === "projects" ? 0.8 : 0.7;
      let lastModified = new Date();
      if (item.frontmatter.date) {
        const d = new Date(item.frontmatter.date);
        if (!isNaN(d.getTime())) {
          lastModified = d;
        }
      }
      return {
        url: `${BASE_URL}/${item.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
      };
    }),
  ];

  return entries;
}
