import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import FaqList from "@/components/faq-list";

export const metadata: Metadata = {
  title: siteConfig.hire.metaTitle,
  description: siteConfig.hire.metaDescription,
  keywords: [...siteConfig.hire.metaKeywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/hire`,
  },
  openGraph: {
    title: siteConfig.hire.metaTitle,
    description: siteConfig.hire.metaDescription,
    url: `${siteConfig.url}/hire`,
    images: [{ url: "/hire/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/hire/opengraph-image"],
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${siteConfig.name} — Freelance Software Developer`,
  url: `${siteConfig.url}/hire`,
  email: siteConfig.email,
  description: siteConfig.hire.metaDescription,
  areaServed: "Worldwide",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteConfig.hire.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HirePage() {
  const { hire } = siteConfig;

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

      <div className="stagger-children">
        {hire.availableForWork && (
          <div style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "16px" }}>
            <span className="available-dot" />
            {hire.availableLabel}
          </div>
        )}
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "16px" }}>
          {hire.headline}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "520px" }}>
          {hire.subheadline}
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "32px" }}>
          <Link href={hire.ctaPrimary.href}>{hire.ctaPrimary.label}</Link>
          <Link href={hire.ctaSecondary.href}>{hire.ctaSecondary.label}</Link>
        </div>
      </div>

      <section style={{ marginTop: "48px" }}>
        <h2 style={{ marginTop: 0 }}>{hire.servicesHeading}</h2>
        <div className="services-grid stagger-children">
          {hire.services.map((service) => (
            <div key={service.name} className="service-card">
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                {service.category}
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "17px", fontWeight: 500 }}>{service.name}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "64px" }}>
        <h2 style={{ marginTop: 0 }}>{hire.howIWorkHeading}</h2>
        <div className="stagger-children">
          {hire.steps.map((step, i) => (
            <div
              key={step.title}
              style={{
                display: "flex",
                gap: "16px",
                paddingBottom: i < hire.steps.length - 1 ? "24px" : 0,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                {i < hire.steps.length - 1 && (
                  <div style={{ width: "1px", flex: 1, background: "var(--border)", marginTop: "6px" }} />
                )}
              </div>
              <div style={{ paddingBottom: i < hire.steps.length - 1 ? "8px" : 0 }}>
                <div style={{ fontWeight: 600, marginBottom: "6px", lineHeight: "32px" }}>{step.title}</div>
                <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "15px" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="gradient-section"
        style={{ margin: "64px -24px 0", padding: "40px 24px" }}
      >
        <h2 style={{ marginTop: 0 }}>{hire.whyMeHeading}</h2>
        {hire.whyMe.map((para, i) => (
          <p key={i} style={i === hire.whyMe.length - 1 ? { marginBottom: 0 } : undefined}>
            {para}
            {i === hire.whyMe.length - 1 && (
              <>
                {" "}
                <Link href="/projects">See what I&apos;ve built →</Link> or{" "}
                <Link href="/articles">read my writing →</Link> to get a sense of how I think about software.
              </>
            )}
          </p>
        ))}
      </section>

      <section style={{ marginTop: "64px" }}>
        <h2 style={{ marginTop: 0 }}>{hire.faqHeading}</h2>
        <FaqList faqs={[...hire.faqs]} />
      </section>

      <div
        className="gradient-section"
        style={{ margin: "64px -24px 0", padding: "48px 24px", textAlign: "center" }}
      >
        <p style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
          {hire.ctaBottomText}
        </p>
        <Link href={hire.ctaPrimary.href} style={{ fontSize: "17px" }}>
          {hire.ctaPrimary.label}
        </Link>
      </div>
    </>
  );
}
