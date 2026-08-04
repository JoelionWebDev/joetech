import React from "react";
import Image from "next/image";
import { getAllPosts } from "../../lib/blog";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const BlogInsights = () => {
  const allPosts = getAllPosts();

  const blogPosts = allPosts
    .sort(
      (a, b) =>
        new Date(b.updatedDate || b.publishDate) -
        new Date(a.updatedDate || a.publishDate)
    )
    .slice(0, 6);

  return (
    <section
      className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2
            id="blog-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-white"
          >
            Insights &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-slate-400">
            Explore the latest in <strong>tech trends</strong>,{" "}
            <strong>digital marketing</strong> strategies, and{" "}
            <strong>branding tips</strong> to accelerate your business growth
            and stay ahead of the competition.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-2 overflow-hidden dark:bg-slate-900 dark:hover:shadow-slate-950/50"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Blog Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    itemProp="image"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm dark:bg-blue-950 dark:text-blue-300">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Metadata */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4 dark:text-slate-400">
                  <time
                    dateTime={post.publishDate}
                    itemProp="datePublished"
                    className="flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(post.publishDate)}
                    {post.updatedDate &&
                      post.updatedDate !== post.publishDate && (
                        <span className="ml-1">
                          · Updated {formatDate(post.updatedDate)}
                        </span>
                      )}
                  </time>
                  {post.readingTime && (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readingTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 dark:text-white"
                  itemProp="headline"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p
                    className="text-gray-600 mb-6 leading-relaxed line-clamp-3 dark:text-slate-400"
                    itemProp="description"
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Read More Link */}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 group/link"
                  aria-label={`Read more about ${post.title}`}
                  itemProp="url"
                >
                  <span>Read More</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Hidden structured data */}
              <div
                className="hidden"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <span itemProp="name">Joetech</span>
              </div>
              {post.updatedDate && post.updatedDate !== post.publishDate && (
                <meta itemProp="dateModified" content={post.updatedDate} />
              )}
            </article>
          ))}
        </div>

        {/* View All Posts Link */}
        <div className="text-center mt-16">
          <a
            href="/blog"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-300/50"
            aria-label="View all blog articles and insights"
          >
            <span>View All Articles</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogInsights;
