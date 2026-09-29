import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentCategory = "notes" | "blogs" | "projects" | "pages";

export interface MdxFrontmatter {
  title: string;
  heading?: string;
  shortTitle?: string;
  description?: string;
  fullDescription?: string;
  type?: "project" | "blog" | "note" | "page";
  date?: string;
  category?: string;
  subtitle?: string;
  heroImage?: string;
  order?: number;
  links?: Array<{ label: string; url: string }>;
  [key: string]: any;
}

export interface ContentItem {
  slug: string;
  category: ContentCategory;
  frontmatter: MdxFrontmatter;
  content: string;
}

export interface MdxDoc {
  frontmatter: MdxFrontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");
const CATEGORIES: ContentCategory[] = ["notes", "blogs", "projects"];

/**
 * Returns a document from a specific filename relative to content/ or root
 */
export function getMdxContent(filename: string): MdxDoc {
  let fullPath = path.join(CONTENT_DIR, filename);

  if (!fs.existsSync(fullPath)) {
    for (const cat of CATEGORIES) {
      const candidate = path.join(CONTENT_DIR, cat, filename);
      if (fs.existsSync(candidate)) {
        fullPath = candidate;
        break;
      }
    }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    frontmatter: data as MdxFrontmatter,
    content,
  };
}

/**
 * Find content by slug across standalone pages, notes, blogs, and projects
 */
export function getContentBySlug(slug: string): ContentItem | null {
  // Check standalone page in content root first
  for (const ext of [".mdx", ".md"]) {
    const rootPath = path.join(CONTENT_DIR, `${slug}${ext}`);
    if (fs.existsSync(rootPath)) {
      const fileContents = fs.readFileSync(rootPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        category: "pages",
        frontmatter: data as MdxFrontmatter,
        content,
      };
    }
  }

  for (const cat of CATEGORIES) {
    const filePath = path.join(CONTENT_DIR, cat, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        category: cat,
        frontmatter: data as MdxFrontmatter,
        content,
      };
    }
  }
  return null;
}

/**
 * Returns all slugs across all content categories and standalone pages
 */
export function getAllSlugs(): string[] {
  const slugs: string[] = [];

  // Standalone pages in content/ root (excluding bio files)
  if (fs.existsSync(CONTENT_DIR)) {
    const rootFiles = fs.readdirSync(CONTENT_DIR);
    for (const file of rootFiles) {
      if (
        (file.endsWith(".mdx") || file.endsWith(".md")) &&
        !file.startsWith("bio-")
      ) {
        slugs.push(file.replace(/\.mdx?$/, ""));
      }
    }
  }

  for (const cat of CATEGORIES) {
    const dir = path.join(CONTENT_DIR, cat);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith(".mdx") || file.endsWith(".md")) {
          slugs.push(file.replace(/\.mdx?$/, ""));
        }
      }
    }
  }
  return Array.from(new Set(slugs));
}

/**
 * Get all content items for a given category (or all categories)
 */
export function getAllContent(category?: ContentCategory): ContentItem[] {
  const categoriesToScan = category ? [category] : CATEGORIES;
  const items: ContentItem[] = [];

  for (const cat of categoriesToScan) {
    const dir = path.join(CONTENT_DIR, cat);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(dir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      items.push({
        slug,
        category: cat,
        frontmatter: data as MdxFrontmatter,
        content,
      });
    }
  }

  return items.sort((a, b) => {
    if (a.frontmatter.order !== undefined && b.frontmatter.order !== undefined) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    if (a.frontmatter.order !== undefined) return -1;
    if (b.frontmatter.order !== undefined) return 1;

    if (a.frontmatter.date && b.frontmatter.date) {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateB - dateA;
      }
    }
    return 0;
  });
}
