import { siteConfig } from "@/lib/config";
import { getAllContent } from "@/lib/mdx";

const BASE_URL = siteConfig.url;

export function GET() {
  const contentItems = getAllContent().filter(
    (item) => item.category === "blogs" || item.category === "notes"
  );

  const items = contentItems
    .map((item) => {
      const url = `${BASE_URL}/${item.slug}`;
      const dateVal = item.frontmatter.date
        ? new Date(item.frontmatter.date)
        : new Date();
      const pubDate = (!isNaN(dateVal.getTime()) ? dateVal : new Date()).toUTCString();
      const title = item.frontmatter.heading || item.frontmatter.title;
      const description = (item.frontmatter.description || title)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${BASE_URL}</link>
    <description>Product engineer working on AI, MCP and connectors.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
