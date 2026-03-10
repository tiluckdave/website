import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Tilak Dave — Freelance Software Developer | Custom Apps, MCP Servers, AI Solutions",
  description:
    "Hire Tilak Dave for custom web applications, SaaS MVPs, API integrations, MCP servers, and AI-powered solutions. Based in India, working globally.",
  alternates: {
    canonical: "https://tiluckdave.in/hire",
  },
};

// PRD Section 7.1 — Services overview page
export default function HirePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What kind of software can you build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom web applications, SaaS products, dashboards, internal tools, business applications (ordering systems, CRMs, billing platforms), MCP servers and AI integrations, websites and landing pages, and API integrations and automation.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a custom web app cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the scope. Simple landing pages start around $500. A full SaaS MVP with authentication, payments, and a core feature set typically runs $3,000–$10,000. Enterprise applications and complex integrations are scoped individually. I provide a clear proposal with price, scope, and timeline before you commit.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. I work with clients in the US, UK, Europe, and globally. I'm based in India (IST) but maintain overlap with US and EU business hours. All communication is async-first — you won't be waiting on timezone differences.",
        },
      },
      {
        "@type": "Question",
        name: "What is your typical timeline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A landing page or small site: 1–2 weeks. A focused SaaS MVP: 4–8 weeks. Complex applications: 2–4 months. I give you a specific timeline in the proposal, and I meet it.",
        },
      },
      {
        "@type": "Question",
        name: "How do we communicate during a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Async-first. I use Slack, Linear, or whatever you use. Weekly written updates with what shipped, what's next, and any decisions needed. I don't do daily standups — I do weekly check-ins that respect your time.",
        },
      },
    ],
  };

  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tilak Dave — Freelance Software Developer",
    url: "https://tiluckdave.in/hire",
    email: "hi@tiluckdave.in",
    description:
      "Custom web applications, SaaS MVPs, API integrations, MCP servers, and AI-powered solutions.",
    areaServed: "Worldwide",
    priceRange: "$500–$15,000+",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1>I build software that solves real problems.</h1>
      <p style={{ color: "var(--text-secondary)" }}>
        From MVPs to production systems — for startups, businesses, and brands worldwide.
      </p>

      <p>
        <Link href="/hire/book">Let&apos;s talk about your project →</Link>
      </p>

      <h2>What I Build</h2>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500, marginBottom: "8px" }}>Custom Web Applications</p>
        <p>
          SaaS products, dashboards, internal tools — built to work reliably in
          production. I&apos;ll help you ship your MVP without burning through your
          runway, and build it in a way that scales when you grow.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500, marginBottom: "8px" }}>Custom Business Applications</p>
        <p>
          Ordering systems, billing platforms, inventory management, CRMs, and any
          operational software a business needs to run. Replace your spreadsheets
          with software that actually works for your workflow.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500, marginBottom: "8px" }}>MCP Servers & AI-Powered Solutions</p>
        <p>
          Custom Model Context Protocol servers, LLM integrations, intelligent
          automation, AI features for existing products. Give your tools an AI layer,
          or build something new from scratch. I&apos;ve built MCP servers for enterprise
          use cases — this isn&apos;t experimental for me.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500, marginBottom: "8px" }}>Websites & Landing Pages</p>
        <p>
          Business sites, brand sites, personal sites. Fast, accessible, built to
          convert. Your digital presence, done right.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500, marginBottom: "8px" }}>API Integrations & Automation</p>
        <p>
          Connect systems, build connectors, automate workflows. I&apos;ve shipped 25+
          production integrations across payment processors, CRMs, data platforms,
          and internal tools. Stop copying data between tools. Let software do it.
        </p>
      </div>

      <h2>How I Work</h2>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontWeight: 500, marginBottom: "4px" }}>1. Discovery</p>
        <p>
          We talk. You tell me what you need. I ask the right questions — about your
          users, your constraints, what success looks like.
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontWeight: 500, marginBottom: "4px" }}>2. Samples & Proposal</p>
        <p>
          Before you commit, I build samples so you can see and feel what you&apos;re
          paying for. Then a clear scope, timeline, and price. No surprises.
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontWeight: 500, marginBottom: "4px" }}>3. Build</p>
        <p>
          Weekly updates, async-first communication. I ship fast without cutting
          corners. You&apos;ll always know where things stand.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500, marginBottom: "4px" }}>4. Launch & Maintain</p>
        <p>
          Your product goes live. I stick around to make sure it keeps working —
          bug fixes, updates, support. I&apos;m not here to hand off and disappear.
        </p>
      </div>

      <h2>Why Me</h2>

      <p>
        I&apos;ve built MCP servers that run in enterprise workflows — not as demos, but
        as production infrastructure. I&apos;ve shipped integrations across payment
        systems, analytics platforms, and internal APIs, 25+ of them in production.
        Full-stack capability from database schema to deployment pipeline means you
        don&apos;t need three contractors where one will do.
      </p>
      <p>
        I&apos;m based in India (IST) but work with clients across the US, UK, and Europe
        with real time overlap. Async-first means your project moves forward while
        you sleep.{" "}
        <Link href="/projects">See what I&apos;ve built →</Link> or{" "}
        <Link href="/articles">read my writing →</Link> to get a sense of how I
        think about software.
      </p>

      <p>
        <Link href="/hire/book">Let&apos;s talk about your project →</Link>
      </p>

      <h2>FAQ</h2>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500 }}>What kind of software can you build?</p>
        <p>
          Custom web applications, SaaS products, dashboards, internal tools,
          business applications (ordering systems, CRMs, billing platforms), MCP
          servers and AI integrations, websites and landing pages, and API
          integrations and automation.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500 }}>How much does a custom web app cost?</p>
        <p>
          It depends on the scope. Simple landing pages start around $500. A full
          SaaS MVP with authentication, payments, and a core feature set typically
          runs $3,000–$10,000. Enterprise applications and complex integrations are
          scoped individually. I provide a clear proposal with price, scope, and
          timeline before you commit.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500 }}>Do you work with international clients?</p>
        <p>
          Yes. I work with clients in the US, UK, Europe, and globally. I&apos;m based in
          India (IST) but maintain overlap with US and EU business hours.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500 }}>What is your typical timeline?</p>
        <p>
          A landing page or small site: 1–2 weeks. A focused SaaS MVP: 4–8 weeks.
          Complex applications: 2–4 months. I give you a specific timeline in the
          proposal, and I meet it.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: 500 }}>How do we communicate during a project?</p>
        <p>
          Async-first. I use Slack, Linear, or whatever you use. Weekly written
          updates with what shipped, what&apos;s next, and any decisions needed. I don&apos;t
          do daily standups — I do weekly check-ins that respect your time.
        </p>
      </div>
    </>
  );
}
