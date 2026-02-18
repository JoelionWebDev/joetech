// // app/blog/BlogCard.jsx

// export function BlogCard({ post }) {
//   const getCategoryColor = (category) => {
//     switch (category) {
//       case "Crypto News":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
//       case "Crypto Forecast":
//         return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
//       case "Web Dev":
//         return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
//       case "Investment":
//         return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
//     }
//   };

//   return (
//     <a
//       href={post.url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block group"
//     >
//       <article className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
//         {/* Category Tag */}
//         <div className="mb-3">
//           <span
//             className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
//               post.category
//             )}`}
//           >
//             {post.category}
//           </span>
//         </div>

//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//           {post.title}
//         </h3>

//         {/* Summary */}
//         <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
//           {post.summary}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-700">
//           <span className="font-medium">{post.source}</span>
//           <span>{post.date}</span>
//         </div>
//       </article>
//     </a>
//   );
// }
