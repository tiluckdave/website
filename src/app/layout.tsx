import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config";
import WebMcpProvider from "@/components/webmcp-provider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [...siteConfig.seo.defaultKeywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Product Engineer` }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
      "text/markdown": `${siteConfig.url}/llms.txt`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "og:logo": `${siteConfig.url}/pfp.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-bg">
        <WebMcpProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
