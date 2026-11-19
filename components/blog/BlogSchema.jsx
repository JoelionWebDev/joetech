export default function BlogSchema({ post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.metaTitle || post.frontmatter.title,
    description: post.frontmatter.metaDescription || post.frontmatter.excerpt,
    image: post.frontmatter.coverImage,
    datePublished: post.frontmatter.publishDate,
    dateModified: post.frontmatter.updatedDate || post.frontmatter.publishDate,
    author: {
      "@type": "Organization",
      name: "Joetech",
      url: "https://joetech360.ng",
    },
    publisher: {
      "@type": "Organization",
      name: "Joetech",
      logo: { "@type": "ImageObject", url: "https://joetech360.ng/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://joetech360.ng/blog/${post.slug}`,
    },
    keywords: post.frontmatter.keywords || post.frontmatter.tags?.join(", "),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://joetech360.ng" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://joetech360.ng/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `https://joetech360.ng/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
