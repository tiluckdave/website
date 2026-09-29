import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config";
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

import WebMcpProvider from "@/components/webmcp-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/home-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context Index" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="LLM Full Context" />
      </head>
      <body className="noise-bg">
        <WebMcpProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
