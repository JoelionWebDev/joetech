import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | Joetech",
  description: "The page you are looking for does not exist or has been moved. Return to Joetech's homepage.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Let us help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/blog"
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
