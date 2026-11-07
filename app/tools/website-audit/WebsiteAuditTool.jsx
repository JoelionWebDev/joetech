"use client";

import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Gauge,
  Globe,
  Loader2,
  MessageCircle,
  Search,
  XCircle,
} from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const steps = [
  {
    title: "Enter your website address",
    text: "Type your domain, e.g. example.com — no need for https://, we add it for you.",
  },
  {
    title: "Click Audit my website",
    text: "We visit your homepage and check 11 things Google and your visitors care about — speed, mobile-friendliness, titles, images and links.",
  },
  {
    title: "Read your score and fixes",
    text: "Every check shows what passed, what needs work, and exactly how to fix it — in plain English, no jargon.",
  },
  {
    title: "Fix it — or ask Joetech to",
    text: "Fix the issues yourself, or talk to us and we will fix them for you.",
  },
];

const faqs = [
  {
    q: "How is the score worked out?",
    a: "The audit checks 11 things on your homepage and adds up to 100 points: secure connection (10), page title (10), meta description (10), main heading (10), mobile-friendliness (10), image descriptions (10), page speed (10), favicon (5), language tag (5) and internal links (5). Each check shows the points it earned, so you can see exactly where the score came from.",
  },
  {
    q: "Is this really free?",
    a: "Yes. No sign-up, no account, no payment. The report is yours to keep.",
  },
  {
    q: "Do you store my website address or my report?",
    a: "No. The audit runs when you ask for it and nothing is saved. If you choose to send the report to your own WhatsApp, your number is only used to open WhatsApp — it is not sent to us or stored.",
  },
  {
    q: "Why does it only check my homepage?",
    a: "Your homepage is the page most visitors and Google see first. The same checks apply to every page — fix them on the homepage first, then repeat them across your site.",
  },
  {
    q: "My site is slow — what can I do?",
    a: "The most common causes are large images and too many scripts. Compress your images, remove what the page does not need, and ask your host about faster hosting. If you would rather not do it yourself, Joetech can fix it for you.",
  },
];

function scoreColor(score) {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function scoreBar(score) {
  if (score >= 90) return "bg-green-500";
  if (score >= 70) return "bg-blue-600";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function statusIcon(status) {
  if (status === "pass")
    return <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />;
  if (status === "warn")
    return <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />;
  return <XCircle className="h-5 w-5 shrink-0 text-red-600" />;
}

function buildReport(result) {
  const lines = [
    `Website audit for ${result.url}`,
    `Score: ${result.score}/100 — ${result.grade}`,
    "",
    "Checks:",
  ];
  for (const c of result.checks) {
    const mark =
      c.status === "pass" ? "PASS" : c.status === "warn" ? "CHECK" : "FAIL";
    lines.push(`[${mark}] ${c.label} (${c.points}/${c.maxPoints}) — ${c.detail}`);
    if (c.status !== "pass") lines.push(`    Fix: ${c.fix}`);
  }
  lines.push("");
  lines.push(
    `Page: ${result.loadTimeMs}ms to load, ${result.sizeKb}KB, ${result.facts.imageCount} images, ${result.facts.internalLinks} internal links.`,
  );
  lines.push("Free audit by Joetech — joetech.name.ng/tools/website-audit");
  return lines.join("\n");
}

export default function WebsiteAuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  const audit = async (e) => {
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
    setWhatsappError("");
    try {
      const res = await fetch("/api/tools/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setResult(data);
    } catch {
      setError(
        "Could not reach the audit service. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyReport = async () => {
    if (!result) return;
    const text = buildReport(result);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setError("Copy did not work in this browser — try again.");
      }
      ta.remove();
    }
  };

  const sendToWhatsapp = () => {
    if (!result) return;
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 7) {
      setWhatsappError("Enter a valid WhatsApp number, e.g. 08030000000.");
      return;
    }
    setWhatsappError("");
    const text = encodeURIComponent(buildReport(result));
    window.open(`https://wa.me/${digits}?text=${text}`, "_blank");
  };

  const failedChecks = result
    ? result.checks.filter((c) => c.status === "fail")
    : [];
  const warnChecks = result
    ? result.checks.filter((c) => c.status === "warn")
    : [];

  return (
    <div className="space-y-10">
      {/* Auditor */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <form onSubmit={audit}>
          <label
            htmlFor="audit-url"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Your website address
          </label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="audit-url"
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
                Checking your website…
              </>
            ) : (
              <>
                <Gauge className="h-4 w-4" />
                Audit my website
              </>
            )}
          </button>
          <p className="mt-3 text-sm text-slate-500">
            Free to use — no sign-up. We check your homepage only, and
            nothing you enter is stored.
          </p>
        </form>

        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="mt-8">
            {/* Score */}
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-slate-50 p-6 text-center sm:flex-row sm:text-left">
              <div
                className={`font-display text-6xl font-extrabold ${scoreColor(result.score)}`}
              >
                {result.score}
                <span className="text-2xl text-slate-400">/100</span>
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-slate-900">
                  {result.grade}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {result.url} — loaded in{" "}
                  {(result.loadTimeMs / 1000).toFixed(1)}s, {result.sizeKb}KB,{" "}
                  {result.facts.imageCount} images,{" "}
                  {result.facts.internalLinks} internal links.
                </p>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${scoreBar(result.score)}`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  How the score is worked out: 11 checks, 100 points total —
                  each check below shows the points it earned.
                </p>
              </div>
            </div>

            {/* Fix first */}
            {failedChecks.length > 0 && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <h3 className="font-bold text-red-800">
                  Fix these first ({failedChecks.length})
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  {failedChecks.map((c) => (
                    <li key={c.id}>
                      <strong>{c.label}:</strong> {c.fix}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Checks */}
            <ul className="mt-6 space-y-3">
              {result.checks.map((c) => (
                <li
                  key={c.id}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  {statusIcon(c.status)}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {c.label}
                      </h3>
                      <span className="text-sm font-semibold text-slate-500">
                        {c.points}/{c.maxPoints} pts
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{c.detail}</p>
                    {c.status !== "pass" && (
                      <p className="mt-1 text-sm text-slate-700">
                        <strong>Fix:</strong> {c.fix}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {warnChecks.length > 0 && failedChecks.length === 0 && (
              <p className="mt-4 text-sm text-slate-600">
                Nothing is broken — the {warnChecks.length} check
                {warnChecks.length === 1 ? "" : "s"} above marked
                &ldquo;check&rdquo; could still be better.
              </p>
            )}

            {/* Share the report */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyReport}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy report
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                <MessageCircle className="h-4 w-4 text-green-600" />
                Send this report to my WhatsApp
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Optional — enter your WhatsApp number and the report opens in
                WhatsApp for you to keep. Your number is only used to open
                WhatsApp; it is not sent to us or stored.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="off"
                  placeholder="e.g. 08030000000"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
                />
                <button
                  type="button"
                  onClick={sendToWhatsapp}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send to WhatsApp
                </button>
              </div>
              {whatsappError && (
                <p className="mt-2 text-sm text-red-600">{whatsappError}</p>
              )}
            </div>

            {/* Joetech fix CTA */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <h3 className="font-display text-xl font-bold">
                Want these fixed for you?
              </h3>
              <p className="mt-2 text-sm leading-relaxed opacity-90">
                Joetech fixes slow, mobile-unfriendly and hard-to-find
                websites for Nigerian businesses — so the visitors you already
                get actually become customers.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/message/RKDWPWCNYQKTG1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-gray-100"
                >
                  <Search className="h-4 w-4" />
                  Talk to Joetech
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  See our services
                </a>
              </div>
            </div>
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
          Audit done? Here is how to check your whole site
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Our guide walks through auditing your full business website —
          every page, not just the homepage — so nothing important gets
          missed.
        </p>
        <a
          href="/blog/audit-your-business-website-nigeria"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Read the website audit guide
          <Search className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
