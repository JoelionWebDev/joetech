import Link from "next/link";
import Image from "next/image";
import { getAllPosts, SITE_URL } from "../../lib/blog";

export const revalidate = 3600;

export const metadata = {
  title:
    "Blog — Tech Insights, AI Guides & Digital Marketing Tips | Joetech",
  description:
    "Explore Joetech's blog for expert insights on web development, app development, UI/UX design, digital marketing, and AI-powered tech education. Learn tech skills with AI.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: "Joetech Blog — Tech Insights & AI-Powered Learning Guides",
    description:
      "Learn web development, app development, design, and digital marketing with AI. Expert guides and weekly tech insights from Joetech, Lagos.",
    url: `${SITE_URL}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Joetech Blog — Tech Insights & AI Learning Guides",
    description:
      "Expert guides on web dev, app dev, UI/UX, and digital marketing with AI.",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export default async function BlogListingPage({ searchParams }) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const page = parseInt(params.page) || 1;
  const category = params.category || "";
  const tag = params.tag || "";
  const search = params.search || "";
  const perPage = 12;

  let filtered = [...allPosts];

  if (category) {
    filtered = filtered.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );
  }
  if (tag) {
    filtered = filtered.filter((p) =>
      p.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedPosts = filtered.slice((page - 1) * perPage, page * perPage);

  const allCategories = [...new Set(allPosts.map((p) => p.category).filter(Boolean))];

  const featured = allPosts.filter((p) => p.featured).slice(0, 2);

  function buildPageUrl(p, c, t, s) {
    const q = new URLSearchParams();
    if (p > 1) q.set("page", p);
    if (c) q.set("category", c);
    if (t) q.set("tag", t);
    if (s) q.set("search", s);
    return `/blog${q.toString() ? `?${q.toString()}` : ""}`;
  }

  function getPageWindow(page, total, maxVisible = 7) {
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = new Set([1, total]);
    let start = Math.max(2, page - 2);
    let end = Math.min(total - 1, page + 2);
    while (end - start + 1 < maxVisible - 2 && start > 2) start--;
    while (end - start + 1 < maxVisible - 2 && end < total - 1) end++;
    for (let i = start; i <= end; i++) pages.add(i);
    const sorted = [...pages].sort((a, b) => a - b);
    const items = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) items.push("ellipsis");
      items.push(p);
      prev = p;
    }
    return items;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Hero */}
      {page === 1 && !category && !tag && !search && featured.length > 0 && (
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Insights & Articles
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Expert guides on <strong className="text-white">web development</strong>,{" "}
                <strong className="text-white">digital marketing</strong>,{" "}
                <strong className="text-white">AI tools</strong>, and{" "}
                <strong className="text-white">branding</strong> — designed to help
                you grow your tech skills and business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-48 h-48 flex-shrink-0">
                      <Image
                        src={post.coverImage}
                        alt={`${post.title} — featured article from Joetech blog`}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full w-fit mb-3">
                        {post.category}
                      </span>
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:underline decoration-white/50 underline-offset-2">
                        {post.title}
                      </h2>
                      <p className="text-blue-100 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="text-xs text-blue-200 mt-3">
                        {post.readingTime || post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {!(page === 1 && !category && !tag && !search) && (
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Insights & Articles</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              {search ? `Results for "${search}"` : category ? `${category} Articles` : tag ? `#${tag}` : ""}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !category && !tag
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              All
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={buildPageUrl(1, cat, "", search)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <form method="GET" action="/blog" className="relative w-full sm:w-64">
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search articles..."
              aria-label="Search blog articles"
              className="w-full px-4 py-2.5 pl-10 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            <Link href="/blog" className="text-blue-600 hover:underline mt-2 inline-block">
              Clear filters
            </Link>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            <section>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={`${post.title} — Joetech blog article preview`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs">{post.readingTime || post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-gray-400 mt-auto">{post.publishDate}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {totalPages > 1 && (
              <nav
                aria-label="Blog pagination"
                className="mt-16 flex flex-wrap items-center justify-center gap-2 max-w-full"
              >
                {page > 1 && (
                  <Link
                    href={buildPageUrl(page - 1, category, tag, search)}
                    className="px-3.5 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <span aria-hidden="true">&larr;</span> Previous
                  </Link>
                )}
                {getPageWindow(page, totalPages).map((item, i) =>
                  item === "ellipsis" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="px-1.5 py-2 text-sm text-gray-400 select-none"
                      aria-hidden="true"
                    >
                      &hellip;
                    </span>
                  ) : (
                    <Link
                      key={item}
                      href={buildPageUrl(item, category, tag, search)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        item === page
                          ? "bg-blue-600 text-white shadow-md"
                          : "border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                      aria-current={item === page ? "page" : undefined}
                    >
                      {item}
                    </Link>
                  )
                )}
                {page < totalPages && (
                  <Link
                    href={buildPageUrl(page + 1, category, tag, search)}
                    className="px-3.5 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    Next <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
