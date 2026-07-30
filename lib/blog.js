import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const SITE_URL = "https://joetech.name.ng";

const postsCache = new Map();
let allPostsCache = null;

/** @returns {{ slug: string }[]} */
export function getAllPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

/**
 * @typedef {{ slug: string, title?: string, excerpt?: string, publishDate?: string, updatedDate?: string, author?: string, category?: string, tags?: string[], readingTime?: string, coverImage?: string, metaTitle?: string, metaDescription?: string, canonicalUrl?: string, keywords?: string, featured?: boolean, date?: string, readTime?: string }} PostData
 * @returns {PostData[]}
 */
export function getAllPosts() {
  if (allPostsCache) return allPostsCache;
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);
  allPostsCache = files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const { data } = matter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.publishDate || b.date) - new Date(a.publishDate || a.date));
  return allPostsCache;
}

/**
 * @param {string} slug
 * @returns {{ slug: string, frontmatter: Record<string, any>, content: string, headings: { level: number, text: string, id: string }[] } | null}
 */
export function getPostBySlug(slug) {
  if (postsCache.has(slug)) return postsCache.get(slug);
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const headings = extractHeadings(content);
  const readingTime = calculateReadingTime(content);

  const result = {
    slug,
    frontmatter: { ...data, readingTime },
    content,
    headings,
  };
  postsCache.set(slug, result);
  return result;
}

/**
 * @param {string} currentSlug
 * @param {number} [count=3]
 * @returns {PostData[]}
 */
export function getRelatedPosts(currentSlug, count = 3) {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const related = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;
      const commonTags = post.tags?.filter((t) => current.tags?.includes(t)) || [];
      score += commonTags.length;
      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

  return related;
}

/**
 * @param {string} content
 * @returns {{ level: number, text: string, id: string }[]}
 */
function extractHeadings(content) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      id: match[2]
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/(^-|-$)/g, ""),
    });
  }
  return headings;
}

/**
 * @param {string} content
 * @returns {string}
 */
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const text = content.replace(/[#*`\[\]()!>|~\-]/g, " ");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

export { SITE_URL };
