import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tiluckdave.in"),
  title: {
    default: "Tilak Dave — Software Engineer",
    template: "%s | Tilak Dave",
  },
  description:
    "Software engineer specializing in API integrations, full-stack development, and AI-powered solutions. Available for freelance projects globally.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tiluckdave.in",
    siteName: "Tilak Dave",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tiluckdave",
    creator: "@tiluckdave",
  },
  alternates: {
    canonical: "https://tiluckdave.in",
    types: {
      "application/rss+xml": "https://tiluckdave.in/rss.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
