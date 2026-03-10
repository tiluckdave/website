import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Technical writing by Tilak Dave on MCP servers, API integrations, SDK development, and building software.",
  alternates: {
    canonical: "https://tiluckdave.in/articles",
  },
};

// PRD Section 6.4 — Articles listing page
// Chronological list: title (linked) + date
export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Articles coming soon.</p>
      ) : (
        <div>
          {articles.map((article) => (
            <div
              key={article.slug}
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
    </>
  );
}
