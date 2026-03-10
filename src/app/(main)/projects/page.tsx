import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Tilak Dave — web applications, API integrations, and AI tools.",
  alternates: {
    canonical: "https://tiluckdave.in/projects",
  },
};

// PRD Section 6.3 — Projects listing page
// Flat list, featured first then by date. Name (linked) + description + live/code links.
export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Projects coming soon.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div
              key={project.slug}
              style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
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
                  {project.frontmatter.title}
                </span>
                <div style={{ display: "flex", gap: "12px", fontSize: "14px" }}>
                  {project.frontmatter.liveUrl && (
                    <Link href={project.frontmatter.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </Link>
                  )}
                  {project.frontmatter.repoUrl && (
                    <Link href={project.frontmatter.repoUrl} target="_blank" rel="noopener noreferrer">
                      Code ↗
                    </Link>
                  )}
                </div>
              </div>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  margin: "4px 0 0",
                }}
              >
                {project.frontmatter.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
