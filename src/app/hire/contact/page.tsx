import Link from "next/link";
import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Tilak Dave about your project. Freelance contact form for custom software development.",
  alternates: {
    canonical: "https://tiluckdave.in/hire/contact",
  },
};

// PRD Section 7.4 — Freelance contact page
export default function HireContactPage() {
  return (
    <>
      <h1>Tell me about your project</h1>

      <ContactForm />

      <div style={{ marginTop: "48px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
          I typically respond within 24 hours.
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Or reach me directly:{" "}
          <Link href="mailto:hi@tiluckdave.in">hi@tiluckdave.in</Link>{" · "}
          <Link href="https://wa.me/message/TILAK">WhatsApp</Link>{" · "}
          <Link href="https://linkedin.com/in/tiluckdave">LinkedIn</Link>{" · "}
          <Link href="https://twitter.com/tiluckdave">Twitter/X DM</Link>
        </p>
      </div>
    </>
  );
}
