import Link from "next/link";
import Image from "next/image";
import { getAllArticles, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.seo.home.title,
  description: siteConfig.seo.home.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const projects = getAllProjects().slice(0, 2);
  const articles = getAllArticles().slice(0, 3);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Software Developer",
    description: "Software developer specializing in API integrations, full-stack development, and AI-powered solutions.",
    image: `${siteConfig.url}/images/about/photo.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    knowsAbout: ["API integrations", "MCP servers", "Next.js", "TypeScript", "Node.js", "React", "PostgreSQL", "Firebase"],
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Workato",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/articles?q={search_term_string}`,
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

      <section
        className="stagger-children"
        style={{ paddingTop: "56px", paddingBottom: "40px" }}
      >
        <h1 style={{ fontSize: "44px", marginBottom: "16px" }}>
          Tilak Dave
        </h1>

        <p style={{ color: "var(--text-secondary)", fontSize: "17px", marginBottom: "28px", maxWidth: "480px" }}>
          {siteConfig.seo.home.description}
        </p>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/projects">See my work →</Link>
          <Link href="/articles">Read my writing →</Link>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0 0 40px" }} />

      <section className="stagger-children" style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <h2 style={{ margin: 0 }}>Selected Projects</h2>
          <Link href="/projects" style={{ fontSize: "14px", color: "var(--text-muted)", textDecorationColor: "var(--text-muted)" }}>All projects</Link>
        </div>
        {projects.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>Projects coming soon.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {projects.map((project) => (
              <div key={project.slug}>
                  <div
                  className="hover-lift"
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 1",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={680}
                      height={383}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "var(--bg-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {project.title}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "4px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>
                    <Link href="/projects">{project.title}</Link>
                  </h3>
                  <div style={{ display: "flex", gap: "12px", fontSize: "14px", alignItems: "center" }}>
                    <span style={{ color: "var(--text-muted)" }}>
                      {new Date(project.date).getFullYear()}
                    </span>
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        Code ↗
                      </Link>
                    )}
                  </div>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: 0 }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="stagger-children" style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <h2 style={{ margin: 0 }}>Recent Articles</h2>
          <Link href="/articles" style={{ fontSize: "14px", color: "var(--text-muted)", textDecorationColor: "var(--text-muted)" }}>All articles</Link>
        </div>
        {articles.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>Articles coming soon.</p>
        ) : (
          <div>
            {articles.map((article) => (
              <div
                key={article.slug}
                className="hover-lift"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "10px 0",
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
      </section>

      <section
        className="animate-in"
        style={{
          marginTop: "80px",
          padding: "32px",
          background: "var(--bg-secondary)",
          borderRadius: "0.5rem",
          border: "1px solid var(--border)",
        }}
      >
        <h3 style={{ margin: "0 0 8px" }}>Looking to build something?</h3>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          I help businesses and brands ship software.{" "}
          <Link href="/hire">Let&apos;s talk →</Link>
        </p>
      </section>
    </>
  );
}
