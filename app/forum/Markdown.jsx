import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders forum question/reply bodies (Markdown). Code blocks render in
 * a styled dark <pre> — no heavy syntax-highlighter dependency.
 * Raw HTML is never rendered (no rehype-raw), so a post cannot inject
 * scripts or break the page.
 */
export default function ForumMarkdown({ children }) {
  return (
    <div className="forum-body text-[15px] leading-relaxed text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-slate-100">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const inPre = className?.includes("language-");
            if (inPre) {
              return <code className="font-mono text-[13px]">{children}</code>;
            }
            return (
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-blue-700">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              {children}
            </a>
          ),
          p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="my-2 list-disc pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 list-decimal pl-5">{children}</ol>
          ),
          h3: ({ children }) => (
            <h3 className="font-display mt-4 text-base font-bold text-slate-900">
              {children}
            </h3>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
