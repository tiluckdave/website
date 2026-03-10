import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import Callout from "@/components/mdx/callout";
import { Steps, Step } from "@/components/mdx/steps";
import FileTree from "@/components/mdx/file-tree";
import Figure from "@/components/mdx/figure";
import LinkPreview from "@/components/mdx/link-preview";
import CodeTabs from "@/components/mdx/code-tabs";
import CodeBlock from "@/components/code-block";

export type MDXComponents = Record<string, any>;

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/") || href?.startsWith("#")) {
      return <Link href={href} {...props}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

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

  pre: (props: ComponentPropsWithoutRef<"pre">) => <CodeBlock {...props} />,

  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    <img
      src={src}
      alt={alt ?? ""}
      style={{ maxWidth: "100%", height: "auto", display: "block", margin: "24px 0" }}
      {...props}
    />
  ),

  Callout,
  Steps,
  Step,
  FileTree,
  Figure,
  LinkPreview,
  CodeTabs,
};
