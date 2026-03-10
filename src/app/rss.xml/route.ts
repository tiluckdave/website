import { getAllArticles } from "@/lib/content";

const BASE_URL = "https://tiluckdave.in";

// PRD Section 6.4 — RSS feed for all published articles
export function GET() {
  const articles = getAllArticles();

  const items = articles
    .map((article) => {
      const url = `${BASE_URL}/articles/${article.slug}`;
      const pubDate = new Date(article.frontmatter.date).toUTCString();
      // Escape HTML entities in content for RSS
      const description = article.frontmatter.description
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
    <item>
      <title><![CDATA[${article.frontmatter.title}]]></title>
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
    <title>Tilak Dave</title>
    <link>${BASE_URL}</link>
    <description>Software engineer specializing in API integrations, full-stack development, and AI-powered solutions.</description>
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
