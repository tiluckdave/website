import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.seo.privacy.title,
  description: siteConfig.seo.privacy.description,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
        Last updated: March 10, 2026
      </p>

      <h2>1. Data Controller</h2>
      <p>
        Tilak Dave, reachable at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>2. Data Collected</h2>
      <p>
        <strong>Contact form:</strong> Name, email address, project description,
        budget range, timeline, and how you found this site. You provide this
        voluntarily.
      </p>
      <p>
        <strong>Analytics:</strong> Anonymous page views, referring URL, device
        type, and city-level geolocation. Collected by Vercel Analytics. No cookies,
        no persistent identifiers, IP address not stored.
      </p>

      <h2>3. Purpose</h2>
      <p>
        Contact form data is used solely to respond to your project inquiry.
        Analytics data is used to understand site traffic and improve content.
      </p>

      <h2>4. Legal Basis</h2>
      <p>
        Analytics: Legitimate interest (GDPR Art. 6(1)(f)) — understanding how the
        site is used without storing personal data.
        Contact form: Legitimate interest — responding to a project inquiry you
        initiated.
      </p>

      <h2>5. Data Sharing</h2>
      <p>
        <strong>Vercel</strong> — hosting and analytics infrastructure.{" "}
        <strong>Resend</strong> — email delivery for contact form submissions.
        No data is sold. No third-party advertising.
      </p>

      <h2>6. Retention</h2>
      <p>
        Contact form data is retained for 12 months, then deleted. Analytics session
        data is discarded within 24 hours by Vercel.
      </p>

      <h2>7. Cookies</h2>
      <p>This site does not use cookies.</p>

      <h2>8. Your Rights</h2>
      <p>
        If you are in the EU, you have the right to access, correct, erase, port,
        or object to processing of your personal data. To exercise these rights,
        email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>9. International Transfers</h2>
      <p>
        Data is processed in India and the United States (Vercel infrastructure).
        By using the contact form, you consent to this transfer.
      </p>

      <h2>10. Security</h2>
      <p>
        All data is transmitted over HTTPS/TLS. The site has no database — contact
        form submissions are forwarded by email and not stored on this server.
      </p>

      <h2>11. Contact</h2>
      <p>
        For privacy requests or questions:{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>12. Updates</h2>
      <p>
        If this policy changes, the updated version will be posted to this page with
        a new &ldquo;Last updated&rdquo; date.
      </p>
    </>
  );
}
