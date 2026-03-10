import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.seo.about.title,
  description: siteConfig.seo.about.description,
  keywords: [...siteConfig.seo.about.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: siteConfig.seo.about.ogDescription,
    url: `${siteConfig.url}/about`,
    images: [{ url: "/about/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/about/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <div className="animate-in">
      <h1>About</h1>

      <div>
        <Image
          src="/images/about/photo.png"
          alt={siteConfig.name}
          width={160}
          height={160}
          className="bio-photo"
          style={{
            borderRadius: "50%",
            border: "2px solid var(--border)",
            float: "right",
            marginLeft: "24px",
            marginBottom: "16px",
            objectFit: "cover",
          }}
        />

        <p>
          I&apos;m Tilak Dave, software developer based in India. I build
          web applications, API integrations, and AI-powered tools for startups and
          businesses all over the world.
        </p>
        <p>
          I specialize in making software work together - whether that means building
          custom integrations, designing backend systems, or creating AI-powered features
          that actually solve problems. I&apos;ve shipped 50+ production integrations and
          built MCP servers used in enterprise workflows.
        </p>
        <p>
          When I&apos;m not writing code, I watch cricket, cook food,
          and think about how to make simple thinsg complex.
        </p>
        <div style={{ clear: "both" }} />
      </div>

      <h2>Work Experience</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Associate Software Engineer</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Workato · September 2024 - Present
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
            Building integrations and MCP servers for the enterprise.
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 500 }}>Software Developer Intern</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Afterquote · August 2023 - March 2024
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
            Built SaaS tool for RFQ management for manufacturers.
          </div>
        </div>
      </div>

      <h2>Now</h2>
      <ul style={{ paddingLeft: "1.3em", listStyle: "disc" }}>
        <li>
          Currently exploring Model Context Protocol deeply and building MCP servers for enterprise.
        </li>
        <li>
          Contributing to open source projects.
        </li>
        <li>
          Working on getting to 100 pushups and 100 wpm typing.
        </li>
      </ul>

      <h2>Fun Stuff</h2>
      <ul style={{ paddingLeft: "1.3em", listStyle: "disc" }}>
        <li>Lifelong RCB fan</li>
        <li>I have organized three TEDx events.</li>
        <li>I cook better than most people I know</li>
        <li>I have won 20 hackathons till date</li>
      </ul>

      <h2>Support</h2>
      <p style={{ color: "var(--text-secondary)" }}>
        If my work or writing helped you:{" "}
        <Link href={siteConfig.support.buyMeACoffee}>Buy Me a Coffee</Link>,{" "}
        <Link href={siteConfig.support.githubSponsors}>GitHub Sponsors</Link>,{" "}
        <Link href={siteConfig.support.paypal}>PayPal</Link>.
      </p>
    </div>
  );
}
