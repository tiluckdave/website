import Link from "next/link";
import CalEmbed from "@/components/cal-embed";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.seo.hireBook.title,
  description: siteConfig.seo.hireBook.description,
  keywords: [...siteConfig.seo.hireBook.keywords],
  alternates: {
    canonical: `${siteConfig.url}/hire/book`,
  },
  openGraph: {
    title: siteConfig.seo.hireBook.ogTitle,
    description: siteConfig.seo.hireBook.ogDescription,
    url: `${siteConfig.url}/hire/book`,
    images: [{ url: "/hire/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/hire/opengraph-image"],
  },
};

export default function HireBookPage() {
  const { hireBook } = siteConfig;
  return (
    <div className="animate-in">
      <h1>{hireBook.heading}</h1>
      <p>{hireBook.subheading}</p>

      <CalEmbed />

      <p style={{ marginTop: "24px" }}>
        {hireBook.preferEmailText}{" "}
        <Link href={hireBook.preferEmailLink.href}>{hireBook.preferEmailLink.label}</Link>
      </p>
    </div>
  );
}
