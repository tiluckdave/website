import Link from "next/link";

// PRD Section 8.1 — Main site navigation
// "Tilak Dave" left, nav links right. "Hire me →" accent-colored.
// Mobile: all links shown, no hamburger.
export default function Nav() {
  return (
    <header
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "24px 24px",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
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
          }}
        >
          Tilak Dave
        </Link>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/articles">Articles</NavLink>
          <NavLink href="/about">About</NavLink>
          <Link
            href="/hire"
            style={{
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              fontWeight: 400,
            }}
          >
            Hire me →
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-secondary)",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        fontWeight: 400,
      }}
    >
      {children}
    </Link>
  );
}
