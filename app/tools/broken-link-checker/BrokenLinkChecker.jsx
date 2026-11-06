"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Link2Off,
  Loader2,
  Search,
  XCircle,
} from "lucide-react";

const STATUS_LABELS = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  405: "Method not allowed",
  408: "Request timeout",
  429: "Too many requests",
  500: "Server error",
  502: "Bad gateway",
  503: "Service unavailable",
  504: "Gateway timeout",
};

function statusLabel(status) {
  if (status === 0) return "Unreachable";
  return STATUS_LABELS[status] || `HTTP ${status}`;
}

const STEPS = [
  {
    title: "Paste the page address",
    text: "Enter the full address of the page you want to check, e.g. your homepage or a blog post. You can leave out the https:// part.",
  },
  {
    title: "Click “Check links”",
    text: "We load the page and test every link on it — both links to your own site and links to other websites.",
  },
  {
    title: "Review the broken list",
    text: "Working links are counted; broken ones are listed with their status, so you can see exactly what needs fixing.",
  },
  {
    title: "Fix or remove them",
    text: "Update each broken link to the correct address, or remove it if the page it pointed to no longer exists.",
  },
];

const FAQS = [
  {
    q: "Why do links break?",
    a: "Most often because the page they point to was moved, renamed or deleted, or the website it belongs to shut down. Links can also break from a simple typo in the address, or a page that only loads sometimes.",
  },
  {
    q: "How often should I check my website for broken links?",
    a: "Once a month is a good habit for a small business website, and always after a redesign, a move to a new domain, or deleting old pages. A quick check after publishing a new post is worth it too.",
  },
  {
    q: "Does it check links inside PDFs or images?",
    a: "No — it checks the links in the page itself (the text and buttons visitors click). Links inside a PDF file or inside an image are not seen, so check those files separately.",
  },
  {
    q: "Can it check pages that need a login?",
    a: "No. It can only check pages anyone can open without signing in, such as your homepage, service pages and blog posts.",
  },
];

export default function BrokenLinkChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleCheck(e) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter a website address first.");
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch("/api/tools/broken-links", {
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
        "Could not reach the checker. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyBrokenList() {
    if (!result || result.broken.length === 0) return;
    const text = result.broken
      .map((b) => `${b.url} (${statusLabel(b.status)})`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        setError("Copy did not work in this browser — select the list and copy it manually.");
      }
      document.body.removeChild(ta);
    }
  }

  return (
    <div className="space-y-10">
      {/* Checker form */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleCheck}>
          <label
            htmlFor="page-url"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Page address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="page-url"
              type="text"
              inputMode="url"
              autoComplete="off"
              placeholder="e.g. joetech.name.ng or https://example.com/blog"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking links…
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Check links
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-3 text-sm text-slate-500">
          Checks up to 60 links on one page — internal and external. Free,
          no sign-up, and the address you enter is not stored.
        </p>
        {loading && (
          <p className="mt-4 text-sm text-slate-600">
            Loading the page and testing its links — this can take up to a
            minute on a page with many links.
          </p>
        )}
        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </section>

      {/* Results */}
      {result && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
              <p className="text-3xl font-extrabold text-slate-900">
                {result.total}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Links checked
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 text-center">
              <p className="flex items-center justify-center gap-2 text-3xl font-extrabold text-emerald-600">
                <CheckCircle2 className="w-7 h-7" />
                {result.ok}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Working
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 text-center">
              <p className="flex items-center justify-center gap-2 text-3xl font-extrabold text-red-600">
                <XCircle className="w-7 h-7" />
                {result.brokenCount}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Broken
              </p>
            </div>
          </div>

          {result.total === 0 && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
              No links were found on that page. It may be a page with no
              links, or one that loads its content with JavaScript.
            </div>
          )}

          {result.brokenCount > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-slate-100">
                <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <Link2Off className="w-5 h-5 text-red-600" />
                  Broken links ({result.brokenCount})
                </h2>
                <button
                  type="button"
                  onClick={copyBrokenList}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy broken list
                    </>
                  )}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-3 font-semibold">Link</th>
                      <th className="px-5 py-3 font-semibold whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.broken.map((b) => (
                      <tr
                        key={b.url}
                        className="border-b border-slate-50 last:border-0 align-top"
                      >
                        <td className="px-5 py-3">
                          <a
                            href={b.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={b.url}
                            className="text-blue-700 hover:underline break-all"
                          >
                            {b.url}
                          </a>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-700">
                            {b.status === 0
                              ? "Unreachable"
                              : `${b.status} — ${statusLabel(b.status)}`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result.brokenCount === 0 && result.total > 0 && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                Good news — every link on{" "}
                <span className="font-semibold break-all">
                  {result.pageUrl}
                </span>{" "}
                is working.
              </span>
            </div>
          )}
        </section>
      )}

      {/* How to use */}
      <section>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          How to use it
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
            >
              <p className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold mb-3">
                {i + 1}
              </p>
              <h3 className="font-semibold text-slate-900 mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
