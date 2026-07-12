"use client";
import { useState, useEffect } from "react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
        On this page
      </p>
      <ol className="space-y-2">
        {headings.map(({ level, text, id }) => (
          <li key={id} style={{ paddingLeft: `${(level - 2) * 12}px` }}>
            <a
              href={`#${id}`}
              className={`block text-sm transition-colors py-0.5 border-l-2 pl-3 ${
                activeId === id
                  ? "text-blue-600 border-blue-600 font-medium"
                  : "text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
