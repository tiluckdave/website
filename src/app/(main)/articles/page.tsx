import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.seo.articles.title,
  description: siteConfig.seo.articles.description,
  keywords: [...siteConfig.seo.articles.keywords],
  alternates: {
    canonical: `${siteConfig.url}/articles`,
  },
  openGraph: {
    type: "website",
    title: siteConfig.seo.articles.ogTitle,
    description: siteConfig.seo.articles.description,
    url: `${siteConfig.url}/articles`,
    images: [{ url: "/articles/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/articles/opengraph-image"],
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="animate-in">
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Articles coming soon.</p>
      ) : (
        <div className="stagger-children">
          {articles.map((article) => (
            <div
              key={article.slug}
              className="hover-lift"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "8px 0",
                borderBottom: "1px solid var(--border)",
                gap: "16px",
              }}
            >
              <Link href={`/articles/${article.slug}`}>
                {article.frontmatter.title}
              </Link>
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                {new Date(article.frontmatter.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
