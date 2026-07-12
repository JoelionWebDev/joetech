import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllPostSlugs, getPostBySlug, SITE_URL } from "../../../lib/blog";
import TableOfContents from "../../../components/blog/TableOfContents";
import RelatedPosts from "../../../components/blog/RelatedPosts";
import SocialShare from "../../../components/blog/SocialShare";
import NewsletterSignup from "../../../components/blog/NewsletterSignup";
import BackToTop from "../../../components/BackToTop";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;

  return {
    title: frontmatter.metaTitle || `${frontmatter.title} | Joetech Blog`,
    description: frontmatter.metaDescription || frontmatter.excerpt,
    keywords: frontmatter.keywords || frontmatter.tags?.join(", "),
    alternates: {
      canonical: frontmatter.canonicalUrl || `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: frontmatter.metaTitle || frontmatter.title,
      description: frontmatter.metaDescription || frontmatter.excerpt,
      url: frontmatter.canonicalUrl || `${SITE_URL}/blog/${slug}`,
      images: frontmatter.coverImage ? [{ url: frontmatter.coverImage }] : [],
      publishedTime: frontmatter.publishDate,
      modifiedTime: frontmatter.updatedDate || frontmatter.publishDate,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.metaTitle || frontmatter.title,
      description: frontmatter.metaDescription || frontmatter.excerpt,
      images: frontmatter.coverImage ? [frontmatter.coverImage] : [],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

const MarkdownComponents = {
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="scroll-mt-24 text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="scroll-mt-24 text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-3" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-gray-700 leading-relaxed mb-5 text-base sm:text-lg" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-blue-600 hover:underline decoration-blue-300 underline-offset-2"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="space-y-2 mb-5 pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="space-y-2 mb-5 pl-6 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700 leading-relaxed text-base sm:text-lg" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl pl-4 py-3 pr-4 my-6 italic text-gray-700" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ inline, children, ...props }) =>
    inline ? (
      <code
        className="bg-gray-100 text-pink-600 text-sm font-mono px-1.5 py-0.5 rounded"
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 my-6 overflow-x-auto text-sm">
        <code {...props}>{children}</code>
      </pre>
    ),
  hr: (props) => <hr className="my-12 border-gray-200" {...props} />,
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, headings } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.metaTitle || frontmatter.title,
    description: frontmatter.metaDescription || frontmatter.excerpt,
    image: frontmatter.coverImage,
    datePublished: frontmatter.publishDate,
    dateModified: frontmatter.updatedDate || frontmatter.publishDate,
    author: { "@type": "Organization", name: "Joetech", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Joetech",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": frontmatter.canonicalUrl || `${SITE_URL}/blog/${slug}`,
    },
    keywords: frontmatter.keywords || frontmatter.tags?.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: frontmatter.canonicalUrl || `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium truncate max-w-[300px]">
                {frontmatter.title}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_250px] gap-12">
            <div>
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Link
                    href={`/blog?category=${encodeURIComponent(frontmatter.category)}`}
                    className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {frontmatter.category}
                  </Link>
                  <span className="text-xs text-gray-400">
                    {frontmatter.readingTime || frontmatter.readTime}
                  </span>
                  <span className="text-xs text-gray-400">
                    {frontmatter.publishDate}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {frontmatter.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  {frontmatter.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    J
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {frontmatter.author}
                    </p>
                    <p className="text-xs text-gray-500">
                      Published {frontmatter.publishDate}
                      {frontmatter.updatedDate &&
                      frontmatter.updatedDate !== frontmatter.publishDate
                        ? ` · Updated ${frontmatter.updatedDate}`
                        : ""}
                    </p>
                  </div>
                </div>
              </header>

              {frontmatter.coverImage && (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                  <Image
                    src={frontmatter.coverImage}
                    alt={`${frontmatter.title} — featured image for Joetech blog article about tech skills and AI`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug]}
                  components={MarkdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <SocialShare
                  title={frontmatter.title}
                  url={frontmatter.canonicalUrl || `${SITE_URL}/blog/${slug}`}
                />
              </div>

              <NewsletterSignup />

              <div className="mt-10">
                <RelatedPosts currentSlug={slug} />
              </div>
            </div>

            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </article>
      <BackToTop />
    </>
  );
}
