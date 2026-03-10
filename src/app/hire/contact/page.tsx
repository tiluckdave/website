import Link from "next/link";
import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.seo.hireContact.title,
  description: siteConfig.seo.hireContact.description,
  keywords: [...siteConfig.seo.hireContact.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/hire/contact`,
  },
  openGraph: {
    type: "website",
    title: `Contact ${siteConfig.name}`,
    description: siteConfig.seo.hireContact.ogDescription,
    url: `${siteConfig.url}/hire/contact`,
    images: [{ url: "/hire/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/hire/opengraph-image"],
  },
};

export default function HireContactPage() {
  return (
    <div className="animate-in">
      <h1>{siteConfig.hireContact.heading}</h1>

      <ContactForm />

      <div style={{ marginTop: "48px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
          I typically respond within {siteConfig.hire.responseTime}.
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          {siteConfig.hireContact.directContactLabel}{" "}
          <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>{" · "}
          {(siteConfig.whatsapp as string) && (
            <><Link href={`https://wa.me/${(siteConfig.whatsapp as string).replace(/\D/g, "")}`}>WhatsApp</Link>{" · "}</>
          )}
          <Link href={siteConfig.social.linkedin}>LinkedIn</Link>{" · "}
          <Link href={siteConfig.social.twitter}>Twitter/X DM</Link>
        </p>
      </div>
    </div>
  );
}
