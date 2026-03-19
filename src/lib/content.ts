import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./reading-time";

const articlesDir = path.join(process.cwd(), "content/articles");
const projectsFile = path.join(process.cwd(), "content/projects.json");
const crossPostedFile = path.join(process.cwd(), ".github/cross-posted.json");

export interface CrossPostLinks {
  devto?: string;
  hashnode?: string;
}

export function getCrossPostLinks(slug: string): CrossPostLinks | null {
  if (!fs.existsSync(crossPostedFile)) return null;

  const raw = fs.readFileSync(crossPostedFile, "utf-8");
  const tracked = JSON.parse(raw) as Record<string, { devto?: string; hashnode?: string }>;
  const entry = tracked[slug];
  if (!entry) return null;

  const links: CrossPostLinks = {};
  if (entry.devto) links.devto = entry.devto;
  if (entry.hashnode) links.hashnode = entry.hashnode;

  return Object.keys(links).length > 0 ? links : null;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  image?: string;
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

export interface Project {
  slug: string;
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  date: string;
  featured: boolean;
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
  if (!fs.existsSync(projectsFile)) return [];

  const raw = fs.readFileSync(projectsFile, "utf-8");
  const projects = JSON.parse(raw) as Project[];

  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
