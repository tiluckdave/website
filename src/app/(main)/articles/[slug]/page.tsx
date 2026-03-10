import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    alternates: {
      canonical: `https://tiluckdave.in/articles/${slug}`,
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.date,
      url: `https://tiluckdave.in/articles/${slug}`,
    },
  };
}

// PRD Section 6.4 — Individual article page
// Title, date, reading time, MDX body at 18px, edit-on-GitHub link, series nav
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const allArticles = getAllArticles();
  const seriesArticles = article.frontmatter.series
    ? allArticles
        .filter((a) => a.frontmatter.series === article.frontmatter.series)
        .sort((a, b) => (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0))
    : [];

  const currentIndex = seriesArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? seriesArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < seriesArticles.length - 1 ? seriesArticles[currentIndex + 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Tilak Dave",
      url: "https://tiluckdave.in",
    },
    publisher: {
      "@type": "Person",
      name: "Tilak Dave",
      url: "https://tiluckdave.in",
    },
    url: `https://tiluckdave.in/articles/${slug}`,
    mainEntityOfPage: `https://tiluckdave.in/articles/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article>
        <h1>{article.frontmatter.title}</h1>
        <div
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            marginBottom: "48px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <time dateTime={article.frontmatter.date}>
            {new Date(article.frontmatter.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>{article.readingTime} min read</span>
        </div>

        {/* Article body at 18px per PRD section 6.4 */}
        <div style={{ fontSize: "18px", lineHeight: 1.75 }}>
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>
      </article>

      <div
        style={{
          marginTop: "64px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          fontSize: "14px",
        }}
      >
        <Link
          href={`https://github.com/tiluckdave/website/edit/main/content/articles/${slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit on GitHub →
        </Link>
      </div>

      {/* Series navigation — shown only when article is part of a series */}
      {article.frontmatter.series && (prevArticle || nextArticle) && (
        <nav
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            gap: "16px",
          }}
        >
          <div>
            {prevArticle && (
              <Link href={`/articles/${prevArticle.slug}`}>
                ← {prevArticle.frontmatter.title}
              </Link>
            )}
          </div>
          <div>
            {nextArticle && (
              <Link href={`/articles/${nextArticle.slug}`}>
                {nextArticle.frontmatter.title} →
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
