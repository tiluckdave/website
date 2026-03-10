import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.seo.projects.title,
  description: siteConfig.seo.projects.description,
  keywords: [...siteConfig.seo.projects.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    type: "website",
    title: `Projects by ${siteConfig.name}`,
    description: siteConfig.seo.projects.ogDescription,
    url: `${siteConfig.url}/projects`,
    images: [{ url: "/projects/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/projects/opengraph-image"],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="animate-in">
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Projects coming soon.</p>
      ) : (
        <div className="stagger-children">
          {projects.map((project) => (
            <div
              key={project.slug}
              style={{
                padding: "24px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                className="hover-lift"
                style={{
                  width: "100%",
                  aspectRatio: "3 / 1",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  marginBottom: "12px",
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
                }}
              >
                <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                  {project.title}
                </span>
                <div style={{ display: "flex", gap: "12px", fontSize: "14px" }}>
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
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: "4px 0 0" }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
