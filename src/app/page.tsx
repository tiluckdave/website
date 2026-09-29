import Link from "next/link";
import { siteConfig } from "@/lib/config";
import BioToggle from "@/components/bio-toggle";
import HoverVideo from "@/components/hover-video";
import { getMdxContent, getAllContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Figure } from "@/components/figure";
import type { Metadata } from "next";

export const dynamic = "error";

const defaultBioDoc = getMdxContent("bio-default.mdx");
const longBioDoc = getMdxContent("bio-long.mdx");


import { mdxComponents } from "@/lib/mdx-components";

const headingMap: Record<string, string> = {
  "Road Rash": "road-rash",
  "The Road Not Taken": "the-road-not-taken",
  "16 and Alone in Pune": "pune",
  "Nobody Taught Me": "nobody-taught-me",
  "Hackathons": "hackathons",
  "TEDxVITPune": "tedx",
  "What I Do Now": "work-experience",
  "The Two Sides": "the-two-sides",
  "What I'm Actually Chasing": "chasing",
  "Right Now": "right-now",
};

const bioComponents = {
  ...mdxComponents,
  h1: ({ id, className, children, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const slug =
      id ||
      (text && headingMap[text]) ||
      (text
        ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        : undefined);
    return (
      <h3 id={slug} className={`long-bio-heading ${className || ""}`.trim()} {...props}>
        {children}
      </h3>
    );
  },
  h3: ({ id, className, children, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const slug =
      id ||
      (text && headingMap[text]) ||
      (text
        ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        : undefined);
    return (
      <h3 id={slug} className={`long-bio-heading ${className || ""}`.trim()} {...props}>
        {children}
      </h3>
    );
  },
};

export const metadata: Metadata = {
  title: siteConfig.seo.home.title,
  description: siteConfig.seo.home.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const notes = getAllContent("notes");
  const blogs = getAllContent("blogs");
  const projects = getAllContent("projects");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Product Engineer",
    description: "Product engineer working on AI, MCP and connectors.",
    image: `${siteConfig.url}/images/about/photo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    knowsAbout: [
      "AI",
      "MCP",
      "Connectors",
      "API integrations",
      "Next.js",
      "TypeScript",
      "Node.js",
      "React",
      "PostgreSQL",
    ],
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

      <div className="home-page-wrapper">
        <div className="home-layout-container">
          {/* Left Column: Scrollable Content */}
          <div className="home-content-col">
            <main className="home-main">
              {/* Name / Handle */}
              <h1 className="home-handle">{siteConfig.name}</h1>

              {/* Interactive Bio section rendered via MDX */}
              <BioToggle
                defaultBio={
                  <MDXRemote
                    source={defaultBioDoc.content}
                    components={bioComponents}
                  />
                }
                longBio={
                  <MDXRemote
                    source={longBioDoc.content}
                    components={bioComponents}
                  />
                }
              />

              {/* Contact / Social Links */}
              <section className="home-contact-section" aria-label="Contact and Social Links">
                <div className="home-contact-links">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="home-contact-link"
                  >
                    {siteConfig.email}
                  </a>
                  <span className="home-contact-sep" aria-hidden="true">/</span>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-contact-link"
                  >
                    GitHub
                  </a>
                  <span className="home-contact-sep" aria-hidden="true">/</span>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-contact-link"
                  >
                    LinkedIn
                  </a>
                  <span className="home-contact-sep" aria-hidden="true">/</span>
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-contact-link"
                  >
                    X
                  </a>
                </div>
              </section>

              {/* 1. Notes Section */}
              <section style={{ marginBottom: "48px" }}>
                <h2 className="section-serif-title">Notes</h2>
                {notes.length === 0 ? (
                  <p className="empty-state-text">Notes coming soon.</p>
                ) : (
                  <div className="notes-grid">
                    {notes.map((note) => (
                      <div key={note.slug} className="notes-item">
                        <span className="notes-bullet" aria-hidden="true" />
                        <Link href={`/${note.slug}`} className="note-entry-link">
                          <span className="note-entry-title">
                            {note.frontmatter.shortTitle || note.frontmatter.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* 2. Blog Section — only rendered when there are posts */}
              {blogs.length > 0 && (
                <section style={{ marginBottom: "48px" }}>
                  <h2 className="section-serif-title">Blogs</h2>
                  <div className="blogs-list">
                    {blogs.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="blog-row-link"
                      >
                        <span className="blog-row-title">{post.frontmatter.title}</span>
                        {post.frontmatter.date && (
                          <span className="blog-row-date">{post.frontmatter.date}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. Projects Section */}
              <section>
                <h2 className="section-serif-title">Projects</h2>
                <div className="projects-list">
                  {projects.map((proj) => (
                    <div key={proj.slug} className="project-item">
                      <div className="project-line">
                        <Link href={`/${proj.slug}`} className="project-entry-link">
                          <span className="project-entry-title">{proj.frontmatter.title}</span>
                        </Link>
                        <span className="project-separator" aria-hidden="true">—</span>
                        <span className="project-desc">
                          {proj.frontmatter.description || proj.frontmatter.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>

          {/* Right Column: Fixed Video (Desktop Only) */}
          <div className="home-video-col" aria-hidden="true">
            <HoverVideo
              posterSrc="/images/home-poster.jpg"
              videoSrc="/images/home-animation.mp4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
