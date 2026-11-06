"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  FileCode,
  Globe,
  Link2,
  Loader2,
  Search,
} from "lucide-react";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildXml(urls) {
  const entries = urls
    .map((u) => `  <url>\n    <loc>${escapeXml(u)}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const steps = [
  {
    title: "Enter your website address",
    text: "Type your domain, e.g. example.com — no need for https://, we add it for you.",
  },
  {
    title: "Click Generate sitemap",
    text: "We visit your homepage and follow its links (up to 2 clicks deep) to find your pages.",
  },
  {
    title: "Download sitemap.xml",
    text: "Save the file it produces — it lists every page found in the format search engines expect.",
  },
  {
    title: "Upload and submit it",
    text: "Put the file in your website's root folder (so it lives at yoursite.com/sitemap.xml) and submit it in Google Search Console.",
  },
];

const faqs = [
  {
    q: "What is a sitemap?",
    a: "A sitemap is a file that lists the pages on your website in a format search engines understand. It helps Google find and index pages it might otherwise miss, especially on a new or large site.",
  },
  {
    q: "What do I do with the sitemap.xml file?",
    a: "Upload it to the root folder of your website, so it is reachable at yoursite.com/sitemap.xml. Then open Google Search Console, go to Sitemaps, and submit that address. Google will use it to discover your pages.",
  },
  {
    q: "Why does it only find some of my pages?",
    a: "The generator follows links starting from your homepage, up to 2 clicks deep, and checks up to 50 pages. Pages that are not linked from anywhere on your site cannot be found this way, and pages that load only with JavaScript may be missed.",
  },
  {
    q: "Is this really free?",
    a: "Yes. No sign-up, no account, no watermark. The file it creates is yours to keep and use anywhere.",
  },
];

export default function SitemapGenerator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const generate = async (e) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter your website address first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch("/api/tools/sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error || "Something went wrong. Please try again.",
        );
        return;
      }
      setResult(data);
    } catch {
      setError(
        "Could not reach the sitemap service. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadXml = () => {
    if (!result?.pages?.length) return;
    const xml = buildXml(result.pages);
    const blob = new Blob([xml], { type: "application/xml" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  };

  const copyXml = async () => {
    if (!result?.pages?.length) return;
    const xml = buildXml(result.pages);
    try {
      await navigator.clipboard.writeText(xml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = xml;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setError("Copy did not work in this browser — download the file instead.");
      }
      ta.remove();
    }
  };

  return (
    <div className="space-y-10">
      {/* Generator */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <form onSubmit={generate}>
          <label
            htmlFor="sitemap-url"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Your website address
          </label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="sitemap-url"
              type="text"
              inputMode="url"
              autoComplete="off"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Crawling your site…
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Generate sitemap
              </>
            )}
          </button>
          <p className="mt-3 text-sm text-slate-500">
            Free to use — no sign-up. The generator checks up to 50 pages,
            starting from your homepage.
          </p>
        </form>

        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-900">
                Found {result.count} page{result.count === 1 ? "" : "s"}
                {result.crawled < result.count ?
                  ` (checked ${result.crawled} of them directly)`
                : ""}
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={downloadXml}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Download sitemap.xml
                </button>
                <button
                  type="button"
                  onClick={copyXml}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700"
                >
                  {copied ?
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      Copied!
                    </>
                  : <>
                      <Copy className="h-4 w-4" />
                      Copy XML
                    </>
                  }
                </button>
              </div>
            </div>

            <ul className="mt-4 max-h-80 space-y-1 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {result.pages.map((page) => (
                <li
                  key={page}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700"
                >
                  <Link2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  <span className="truncate">{page}</span>
                </li>
              ))}
            </ul>
            {result.partial && (
              <p className="mt-3 flex items-start gap-2 text-sm text-amber-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  This is a large site, so the crawl stopped early — these
                  are the first pages found. Run the generator again from a
                  section of your site (for example yoursite.com/blog) to
                  cover the rest.
                </span>
              </p>
            )}
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
              <FileCode className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Next step: upload sitemap.xml to your website&apos;s root
                folder and submit it in Google Search Console.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* How to use */}
      <section>
        <h2 className="font-display text-2xl font-bold text-slate-900">
          How to use it
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-5 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related blog post */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Keep learning
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-slate-900">
          Submitted your sitemap? See what Google does next
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Our beginner&apos;s guide to Google Search Console shows you how to
          check that Google received your sitemap and is indexing your pages.
        </p>
        <a
          href="/blog/google-search-console-beginners-guide"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Read the Google Search Console guide
          <Link2 className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
