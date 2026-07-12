import Link from "next/link";
import { getRelatedPosts } from "../../lib/blog";

export default function RelatedPosts({ currentSlug }) {
  const related = getRelatedPosts(currentSlug, 3);
  if (!related || related.length === 0) return null;

  return (
    <section className="bg-gray-50 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={`${post.title} - related article from Joetech blog`}
                className="w-full aspect-video object-cover rounded-lg mb-3"
                loading="lazy"
              />
            )}
            <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{post.readTime || post.readingTime}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
