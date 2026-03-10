import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Nav() {
  return (
    <header
      style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "20px 24px",
      }}
    >
      <nav
        className="nav-inner"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "16px",
          fontSize: "15px",
          lineHeight: 1,
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--text-primary)",
            textDecoration: "none",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {siteConfig.shortName}
        </Link>
        <div className="nav-links-group" style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {siteConfig.nav.links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
          ))}
          <Link href={siteConfig.nav.cta.href} className="nav-link--hire">{siteConfig.nav.cta.label}</Link>
        </div>
      </nav>
    </header>
  );
}
