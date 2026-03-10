import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function HireFooter() {
  return (
    <footer
      style={{
        maxWidth: "680px",
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
      <span>© 2026 {siteConfig.name}</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link href={siteConfig.social.github} className="nav-link">GitHub</Link>
        <Link href={siteConfig.social.twitter} className="nav-link">Twitter/X</Link>
        <Link href={siteConfig.social.linkedin} className="nav-link">LinkedIn</Link>
        <Link href="/rss.xml" className="nav-link">RSS</Link>
        <Link href="/privacy" className="nav-link">Privacy Policy</Link>
      </div>
    </footer>
  );
}
