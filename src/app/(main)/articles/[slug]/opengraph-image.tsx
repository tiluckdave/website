import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { getInterBoldFont } from "@/lib/og-utils";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

// PRD Section 4.5 — Article OG image
// Label "Article" top-left, title centered, date bottom-left, domain bottom-right
export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const font = getInterBoldFont();

  const title = article?.frontmatter.title ?? "Article";
  const date = article?.frontmatter.date
    ? new Date(article.frontmatter.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "80px",
            color: "#9A8A7E",
            fontSize: "16px",
          }}
        >
          Article
        </div>
        <div
          style={{
            color: "#E8E4DF",
            fontSize: "42px",
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "80px",
            color: "#8A8478",
            fontSize: "16px",
          }}
        >
          {date}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#8A8478",
            fontSize: "16px",
          }}
        >
          tiluckdave.in
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: font, weight: 700 }],
    }
  );
}
