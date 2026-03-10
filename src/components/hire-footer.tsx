import Link from "next/link";

// PRD Section 8.2 — Hire section footer includes Privacy Policy link
export default function HireFooter() {
  return (
    <footer
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "24px 24px 48px",
        borderTop: "1px solid var(--border)",
        fontSize: "14px",
        color: "var(--text-secondary)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span>© 2026 Tilak Dave</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link href="https://github.com/tiluckdave" style={{ color: "var(--text-secondary)" }}>
          GitHub
        </Link>
        <Link href="https://twitter.com/tiluckdave" style={{ color: "var(--text-secondary)" }}>
          Twitter/X
        </Link>
        <Link href="https://linkedin.com/in/tiluckdave" style={{ color: "var(--text-secondary)" }}>
          LinkedIn
        </Link>
        <Link href="/rss.xml" style={{ color: "var(--text-secondary)" }}>
          RSS
        </Link>
        <Link href="/privacy" style={{ color: "var(--text-secondary)" }}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
