import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { getInterBoldFont } from "@/lib/og-utils";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

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
          background: "#0B0F14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ color: "#8B8F9A", fontSize: "28px", display: "flex" }}>Article</div>
        </div>
        <div style={{ color: "#E4E4E0", fontSize: "56px", fontWeight: 700, lineHeight: 1.15, maxWidth: "1000px", display: "flex" }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#5C6170", fontSize: "24px", display: "flex" }}>{date}</div>
          <div style={{ color: "#C9B06B", fontSize: "28px", fontWeight: 700, display: "flex" }}>Read article →</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: font, weight: 700 }] }
  );
}
