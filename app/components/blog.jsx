import React from "react";

const BlogInsights = () => {
  // Sample blog post data with SEO-optimized content
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Tech Trends Shaping 2025: AI, Web3, and Beyond",
      excerpt:
        "Discover the revolutionary tech trends that are transforming businesses worldwide. From artificial intelligence breakthroughs to emerging Web3 technologies, explore how these innovations can accelerate your digital transformation journey.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tech Trends",
      readTime: "5 min read",
      publishDate: "Dec 15, 2024",
      slug: "top-tech-trends-2025",
    },
    {
      id: 2,
      title: "Digital Marketing Strategies That Drive Real ROI",
      excerpt:
        "Learn proven digital marketing techniques that generate measurable results for tech companies. From SEO optimization to social media automation, discover actionable strategies to boost your online presence and customer acquisition.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Digital Marketing",
      readTime: "7 min read",
      publishDate: "Dec 12, 2024",
      slug: "digital-marketing-roi-strategies",
    },
    {
      id: 3,
      title: "Brand Identity Design: Creating Memorable Tech Brands",
      excerpt:
        "Master the art of branding tips for technology companies. Explore design principles, color psychology, and visual storytelling techniques that help tech startups and established companies build powerful brand recognition.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Branding Tips",
      readTime: "6 min read",
      publishDate: "Dec 10, 2024",
      slug: "brand-identity-design-tech",
    },
    {
      id: 4,
      title: "Cloud Infrastructure Security: Best Practices for 2025",
      excerpt:
        "Navigate the complex landscape of cloud security with expert insights. Learn essential cybersecurity measures, compliance frameworks, and risk management strategies to protect your digital assets and customer data.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tech Trends",
      readTime: "8 min read",
      publishDate: "Dec 8, 2024",
      slug: "cloud-infrastructure-security",
    },
    {
      id: 5,
      title: "Content Marketing Automation Tools for Tech Companies",
      excerpt:
        "Streamline your content creation and distribution with cutting-edge automation tools. Discover how AI-powered platforms and marketing automation can scale your digital marketing efforts while maintaining quality and engagement.",
      image:
        "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Digital Marketing",
      readTime: "6 min read",
      publishDate: "Dec 5, 2024",
      slug: "content-marketing-automation",
    },
    {
      id: 6,
      title: "User Experience Design Principles for Tech Products",
      excerpt:
        "Create intuitive and engaging user experiences that drive conversion and retention. Learn fundamental UX design principles, user research methodologies, and interface design best practices for technology products.",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Branding Tips",
      readTime: "9 min read",
      publishDate: "Dec 3, 2024",
      slug: "ux-design-principles-tech",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-gray-50"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2
            id="blog-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Insights &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-2 overflow-hidden"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Blog Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  itemProp="image"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Metadata */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
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
                    {post.publishDate}
                  </time>
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
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2"
                  itemProp="headline"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="text-gray-600 mb-6 leading-relaxed line-clamp-3"
                  itemProp="description"
                >
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 group/link"
                  aria-label={`Read more about ${post.title}`}
                  itemProp="url"
                >
                  <span>Read More</span>
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
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
