import Link from "next/link";
import { getAllArticles, getAllProjects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tilak Dave — Software Engineer",
  alternates: {
    canonical: "https://tiluckdave.in",
  },
};

// PRD Section 6.1 — Home page
// H1 name, 2-line description, 3 selected projects, 3 recent articles, hire CTA
export default function HomePage() {
  const projects = getAllProjects().slice(0, 3);
  const articles = getAllArticles().slice(0, 3);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tilak Dave",
    url: "https://tiluckdave.in",
    email: "hi@tiluckdave.in",
    jobTitle: "Software Engineer",
    description:
      "Software engineer specializing in API integrations, full-stack development, and AI-powered solutions.",
    sameAs: [
      "https://github.com/tiluckdave",
      "https://twitter.com/tiluckdave",
      "https://linkedin.com/in/tiluckdave",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tilak Dave",
    url: "https://tiluckdave.in",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tiluckdave.in/articles?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <h1>Tilak Dave</h1>

      <p style={{ color: "var(--text-primary)", marginBottom: "48px" }}>
        {/* TILAK: Replace with your 2-line description */}
        Software engineer specializing in API integrations and full-stack development.
        Building tools that make software work better together.
      </p>

      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginTop: 0 }}>Selected Projects</h2>
        {projects.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>Projects coming soon.</p>
        ) : (
          <div>
            {projects.map((project) => (
              <div
                key={project.slug}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border)",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <Link href="/projects">{project.frontmatter.title}</Link>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      marginLeft: "12px",
                    }}
                  >
                    {project.frontmatter.description}
                  </span>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "14px", whiteSpace: "nowrap" }}>
                  {new Date(project.frontmatter.date).getFullYear()}
                </span>
              </div>
            ))}
          </div>
        )}
        <p style={{ marginTop: "16px" }}>
          <Link href="/projects">All projects →</Link>
        </p>
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginTop: 0 }}>Recent Articles</h2>
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
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
        <p style={{ marginTop: "16px" }}>
          <Link href="/articles">All articles →</Link>
        </p>
      </section>

      <p>
        Looking to build something?{" "}
        <Link href="/hire">Let&apos;s talk →</Link>
      </p>
    </>
  );
}
