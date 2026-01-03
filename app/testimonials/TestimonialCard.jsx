// app/testimonials/TestimonialCard.jsx

export function TestimonialCard({ testimonial }) {
  const { name, role, company, message, rating } = testimonial;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Message */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow italic">
        "{message}"
      </p>

      {/* Client Info */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">{company}</p>
      </div>
    </div>
  );
}
