import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { getContentBySlug, getAllSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";

export const dynamic = "error";
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getContentBySlug(slug);
  if (!doc) return {};

  const title = doc.frontmatter.title;
  const description =
    doc.frontmatter.description || `${title} by ${siteConfig.name}`;
  const canonical = `${siteConfig.url}/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getContentBySlug(slug);
  if (!doc) notFound();

  const { content } = doc;

  return (
    <article className="animate-in mdx-content">
      <MDXRemote
        source={content}
        components={{
          ...mdxComponents,
          h1: ({ children, ...props }: any) => (
            <h1 style={{ margin: "0 0 16px" }} {...props}>
              {children}
            </h1>
          ),
          h2: ({ id, children, ...props }: any) => {
            const text = typeof children === "string" ? children : "";
            const slug =
              id ||
              (text
                ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                : undefined);
            return <h2 id={slug} {...props}>{children}</h2>;
          },
          h3: ({ id, children, ...props }: any) => {
            const text = typeof children === "string" ? children : "";
            const slug =
              id ||
              (text
                ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                : undefined);
            return <h3 id={slug} {...props}>{children}</h3>;
          },
        }}
      />
    </article>
  );
}
