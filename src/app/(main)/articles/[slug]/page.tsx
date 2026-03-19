import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticleBySlug, getCrossPostLinks } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

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

  const metadata: Metadata = {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    keywords: article.frontmatter.tags,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    alternates: {
      canonical: `${siteConfig.url}/articles/${slug}`,
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.date,
      url: `${siteConfig.url}/articles/${slug}`,
      authors: [siteConfig.name],
      tags: article.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };

  // Only override auto-discovered OG image when frontmatter has an explicit image
  if (article.frontmatter.image) {
    metadata.openGraph!.images = [{ url: article.frontmatter.image, width: 1200, height: 630, alt: article.frontmatter.title }];
    metadata.twitter!.images = [article.frontmatter.image];
  }

  return metadata;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const crossPostLinks = getCrossPostLinks(slug);
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

  const articleUrl = `${siteConfig.url}/articles/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.date,
    keywords: article.frontmatter.tags.join(", "),
    wordCount: article.content.split(/\s+/).length,
    timeRequired: `PT${article.readingTime}M`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: articleUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    image: `${siteConfig.url}/articles/${slug}/opengraph-image`,
    isPartOf: { "@type": "Blog", url: `${siteConfig.url}/articles` },
  };

  return (
    <div className="animate-in">
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

        {article.frontmatter.image && (
          <Image
            src={article.frontmatter.image}
            alt={article.frontmatter.title}
            width={640}
            height={360}
            style={{ width: "100%", height: "auto", marginBottom: "40px" }}
            priority
          />
        )}

        <div style={{ fontSize: "18px", lineHeight: 1.75 }}>
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode as any, rehypePrettyCodeOptions]],
              },
            }}
          />
        </div>
      </article>

      {crossPostLinks && (
        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
        >
          <span>Also published on </span>
          {[
            crossPostLinks.devto && (
              <a key="devto" href={crossPostLinks.devto} target="_blank" rel="noopener noreferrer">
                Dev.to
              </a>
            ),
            crossPostLinks.hashnode && (
              <a key="hashnode" href={crossPostLinks.hashnode} target="_blank" rel="noopener noreferrer">
                Hashnode
              </a>
            ),
          ]
            .filter(Boolean)
            .reduce<React.ReactNode[]>((acc, link, i) => {
              if (i > 0) acc.push(<span key={`sep-${i}`}> · </span>);
              acc.push(link);
              return acc;
            }, [])}
        </div>
      )}

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
    </div>
  );
}
