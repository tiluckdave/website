import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer from Hyderabad, India. Building things that matter.",
  alternates: {
    canonical: "https://tiluckdave.in/about",
  },
};

// PRD Section 6.2 — About page
export default function AboutPage() {
  return (
    <>
      <h1>About</h1>

      {/* TILAK: Replace with your bio paragraphs */}
      <p>
        I&apos;m Tilak Dave, a software engineer based in Hyderabad, India. I build
        web applications, API integrations, and AI-powered tools for startups and
        businesses worldwide.
      </p>
      <p>
        I specialize in making software work together — whether that means building
        custom connectors, designing backend systems, or creating AI-powered features
        that actually solve problems. I&apos;ve shipped 25+ production integrations and
        built MCP servers used in enterprise workflows.
      </p>
      <p>
        When I&apos;m not writing code, I organize TEDx events, follow RCB obsessively,
        and think about how to make complex systems feel simple.
      </p>

      {/* TILAK: Add your photo at public/images/tilak.jpg and uncomment */}
      {/* <img
        src="/images/tilak.jpg"
        alt="Tilak Dave"
        style={{ width: "200px", height: "200px", objectFit: "cover", margin: "24px 0" }}
      /> */}

      <h2>Experience</h2>
      {/* TILAK: Replace with your actual experience */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Software Engineer</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Current Company · 2024 – Present
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
            Building integrations and AI features.
          </div>
        </div>
      </div>

      <h2>Now</h2>
      {/* TILAK: Update this section with what you're currently working on */}
      <p>
        Currently exploring Model Context Protocol deeply and building tools for
        developer workflows. Reading about distributed systems. Working on getting
        to 100 pushups.
      </p>

      <h2>Fun Stuff</h2>
      {/* TILAK: Update with your personal interests */}
      <p>
        Lifelong RCB fan (we&apos;re winning this year, I know). Organized three TEDx
        events. I think serverless functions are overrated for most use cases. I have
        opinions about tabs vs spaces that I&apos;ll share if you ask.
      </p>

      <h2>Support</h2>
      <p style={{ color: "var(--text-secondary)" }}>
        If my work or writing helped you:{" "}
        <Link href="https://buymeacoffee.com/tiluckdave">Buy Me a Coffee</Link>,{" "}
        <Link href="https://github.com/sponsors/tiluckdave">GitHub Sponsors</Link>,{" "}
        <Link href="https://paypal.me/tiluckdave">PayPal</Link>.
      </p>
    </>
  );
}
