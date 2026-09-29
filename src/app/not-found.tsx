import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-container">
        <header className="subpage-header">
          <Link href="/" className="subpage-back-link">
            <span aria-hidden="true">←</span> Tilak Dave
          </Link>
        </header>

        <main
          className="subpage-main"
          style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "24px" }}
        >
          <span
            style={{
              fontSize: "var(--font-size-meta)",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            404 Error
          </span>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 3.5vw, 36px)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Page not found
          </h1>

          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: "480px",
            }}
          >
            The page you are looking for doesn&apos;t exist, was removed, or may have been moved.
          </p>

          <div style={{ marginTop: "16px" }}>
            <Link href="/" className="project-entry-link">
              Return to homepage →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
