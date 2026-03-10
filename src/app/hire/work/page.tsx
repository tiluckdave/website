import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof of Work",
  description: "Selected projects by Tilak Dave — problem, solution, and results for each engagement.",
  alternates: {
    canonical: "https://tiluckdave.in/hire/work",
  },
};

// PRD Section 7.2 — Proof of work page
// Problem → solution → result format, testimonials hidden until available
export default function HireWorkPage() {
  // Testimonials are built but hidden until available (PRD section 7.2)
  const testimonialsAvailable = false;

  return (
    <>
      <h1>Selected Work</h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Projects presented with a focus on the problem solved and the outcome delivered.
        For tech stacks and code, see{" "}
        <Link href="/projects">all projects →</Link>
      </p>

      {/* TILAK: Replace with your actual case studies */}
      <div style={{ marginBottom: "48px" }}>
        <h2>Enterprise MCP Server Suite</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
          Integration tooling · 2025
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>The problem:</span> A large organization needed their
          internal systems accessible to LLM-based developer tools. Their data lived in custom
          APIs with no standard interface for AI tools to consume.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>What I built:</span> A suite of MCP servers exposing
          their internal APIs as tools and resources. Integrated with Claude Desktop and Cursor,
          with authentication, rate limiting, and audit logging.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>Result:</span> Developer productivity measurably
          improved. The MCP servers are now part of their standard developer onboarding.
        </p>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2>SaaS Integration Platform</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
          API integrations · 2024
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>The problem:</span> A startup was manually moving data
          between five tools every day. Their team was spending hours on work that should be automatic.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>What I built:</span> An integration layer connecting
          their CRM, billing system, analytics platform, Slack, and internal dashboard. Event-driven,
          with error handling and retry logic.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>Result:</span> 4 hours of manual work eliminated per day.
          Data stayed consistent across all systems without anyone touching it.
        </p>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2>Business Operations Platform</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
          Custom application · 2024
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>The problem:</span> A growing business was running their
          operations on spreadsheets. As volume grew, errors multiplied and nothing was visible in
          real-time.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>What I built:</span> A custom operations platform with
          order management, inventory tracking, and a reporting dashboard. Built on Next.js with
          a PostgreSQL backend.
        </p>
        <p>
          <span style={{ fontWeight: 500 }}>Result:</span> Errors reduced to near zero. Team had
          real-time visibility into operations for the first time.
        </p>
      </div>

      {/* Testimonials — hidden until content available per PRD section 7.2 */}
      {testimonialsAvailable && (
        <section>
          <h2>What Clients Say</h2>
          {/* Testimonial content goes here */}
        </section>
      )}

      <p>
        <Link href="/hire/book">Book a call to discuss your project →</Link>
      </p>
    </>
  );
}
