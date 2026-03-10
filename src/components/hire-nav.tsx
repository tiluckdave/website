import Link from "next/link";

// PRD Section 8.1 — Hire section navigation
export default function HireNav() {
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
          <HireNavLink href="/hire">Services</HireNavLink>
          <HireNavLink href="/hire/work">Work</HireNavLink>
          <HireNavLink href="/hire/book">Book a Call</HireNavLink>
          <HireNavLink href="/hire/contact">Contact</HireNavLink>
        </div>
      </nav>
    </header>
  );
}

function HireNavLink({
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
