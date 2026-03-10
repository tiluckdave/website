import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
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
      <span>© {siteConfig.footer.copyrightYear} {siteConfig.name}</span>
      <div style={{ display: "flex", gap: "16px" }}>
        {siteConfig.footer.socialLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
        ))}
        <Link href="/rss.xml" className="nav-link">RSS</Link>
      </div>
    </footer>
  );
}
