import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

// Compatible with React.ComponentProps<typeof MDXProvider>['components']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MDXComponents = Record<string, any>;

// PRD Section 4.3 & 4.4 — MDX component overrides
// Ensures all rendered HTML follows design language: no cards, proper link styling
export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/") || href?.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  // Blockquotes — no borders, just italic text
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      style={{
        borderLeft: "none",
        paddingLeft: 0,
        fontStyle: "italic",
        color: "var(--text-secondary)",
        margin: "24px 0",
      }}
    >
      {children}
    </blockquote>
  ),
  // Images within articles — no decorative styling
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      style={{ maxWidth: "100%", height: "auto", display: "block", margin: "24px 0" }}
      {...props}
    />
  ),
};
