import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./reading-time";

const articlesDir = path.join(process.cwd(), "content/articles");
const projectsDir = path.join(process.cwd(), "content/projects");

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  series?: string;
  seriesOrder?: number;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  date: string;
  featured: boolean;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

const isDev = process.env.NODE_ENV === "development";

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));

  const articles = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(articlesDir, file), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as ArticleFrontmatter;

      return {
        slug,
        frontmatter,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    // In production, hide unpublished articles
    .filter((a) => isDev || a.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

  if (!isDev && !frontmatter.published) return null;

  return {
    slug,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  const projects = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as ProjectFrontmatter;

      return { slug, frontmatter, content };
    })
    .sort((a, b) => {
      // Featured first, then by date
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return projects;
}
