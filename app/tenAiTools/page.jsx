// app/tools/page.js  ← place this file at this exact path
// Next.js App Router — React Server Component, no "use client" needed

import Link from "next/link";

// ─── SEO METADATA ─────────────────────────────────────────────────────────────
export const metadata = {
  title: "Top 10 Free AI Tools Every Developer Should Use (2025) | AITechPath",
  description:
    "Discover the best free AI tools for developers in 2025 — from GitHub Copilot and Cursor to Codeium and Gemini Code Assist. Boost your productivity today.",
  keywords: [
    "free AI tools for developers",
    "best AI coding tools 2025",
    "GitHub Copilot free",
    "Cursor AI editor",
    "Codeium vs Copilot",
    "AI code completion free",
    "developer productivity AI",
  ],
  alternates: { canonical: "https://joetech.name.ng/blog/top-10-free-ai-tools" },
  openGraph: {
    type: "article",
    title: "Top 10 Free AI Tools Every Developer Should Use (2025)",
    description:
      "The definitive guide to free AI tools that make developers faster, smarter, and more productive in 2025.",
    url: "https://joetech.name.ng/blog/top-10-free-ai-tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 Free AI Tools for Developers (2025) | AITechPath",
    description:
      "Boost your dev productivity with these 10 powerful free AI tools.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const AI_TOOLS = [
  {
    rank: 1,
    name: "GitHub Copilot",
    tagline: "AI autocomplete inside your IDE",
    description:
      "AI-powered code suggestions and autocomplete that works inline as you type. Free for verified students and open-source contributors via GitHub Education.",
    tags: ["Code Completion", "IDE Plugin", "Free for Students"],
    icon: "⌨️",
    accent: "blue",
    bestFor: "Everyday coding & boilerplate",
  },
  {
    rank: 2,
    name: "ChatGPT Free Plan",
    tagline: "Conversational AI for every dev task",
    description:
      "Generate code snippets, debug errors, write documentation, explain concepts, and brainstorm architecture decisions — all through natural conversation.",
    tags: ["Debugging", "Code Gen", "Documentation"],
    icon: "💬",
    accent: "emerald",
    bestFor: "Learning & problem-solving",
  },
  {
    rank: 3,
    name: "Cursor",
    tagline: "AI-native code editor with repo-wide context",
    description:
      "A full code editor built around AI. Ask questions about your entire codebase, refactor across files, and write code through conversation. Free tier available.",
    tags: ["Code Editor", "Refactoring", "Codebase Chat"],
    icon: "✦",
    accent: "violet",
    bestFor: "Large codebases & refactoring",
  },
  {
    rank: 4,
    name: "Codeium",
    tagline: "Unlimited free AI code suggestions",
    description:
      "Free, unlimited AI autocompletion and in-editor chat that works inside VS Code, JetBrains, Vim, and 40+ other editors. No usage caps on the free plan.",
    tags: ["Autocompletion", "Multi-IDE", "Unlimited Free"],
    icon: "⚡",
    accent: "amber",
    bestFor: "Developers on tight budgets",
  },
  {
    rank: 5,
    name: "Tabnine",
    tagline: "Local-first AI that runs privately",
    description:
      "AI code completion that supports 30+ programming languages and can run entirely on your local machine — ideal for teams with privacy or security requirements.",
    tags: ["Local Mode", "Privacy First", "30+ Languages"],
    icon: "🔒",
    accent: "slate",
    bestFor: "Privacy-sensitive projects",
  },
  {
    rank: 6,
    name: "Replit Ghostwriter",
    tagline: "Browser-based AI for rapid prototyping",
    description:
      "A browser-based AI coding assistant with real-time suggestions, instant deployment, and an interactive coding environment. No local setup required.",
    tags: ["Browser-based", "Prototyping", "Instant Deploy"],
    icon: "🌐",
    accent: "rose",
    bestFor: "Quick experiments & demos",
  },
  {
    rank: 7,
    name: "Stack AI",
    tagline: "Visual builder for AI workflows",
    description:
      "A no-code/low-code platform for building AI-powered workflows and integrating language model APIs without complex infrastructure. Free plan available.",
    tags: ["No-Code", "AI Workflows", "API Integration"],
    icon: "🔗",
    accent: "cyan",
    bestFor: "Non-coders & workflow builders",
  },
  {
    rank: 8,
    name: "OpenDevin",
    tagline: "Autonomous open-source coding agent",
    description:
      "An open-source AI agent that autonomously generates code, opens pull requests, and automates repetitive development tasks across your repositories.",
    tags: ["Open Source", "Autonomous", "PR Generation"],
    icon: "🤖",
    accent: "indigo",
    bestFor: "Automating repetitive dev tasks",
  },
  {
    rank: 9,
    name: "Gemini Code Assist",
    tagline: "Google's AI assistant with generous free limits",
    description:
      "Google's free AI coding assistant with strong multi-language support, generous completion limits, and deep integration with VS Code and JetBrains IDEs.",
    tags: ["Google AI", "Multi-language", "Generous Free Tier"],
    icon: "🌟",
    accent: "orange",
    bestFor: "Google ecosystem users",
  },
  {
    rank: 10,
    name: "CodeT5",
    tagline: "Open-source model for code understanding",
    description:
      "A research-grade open-source AI model for code generation, summarization, and explanation across multiple programming languages. Free to download and self-host.",
    tags: ["Open Source", "Self-hosted", "Code Summarization"],
    icon: "🧠",
    accent: "teal",
    bestFor: "Researchers & self-hosters",
  },
];

const ACCENT = {
  blue: {
    dot: "bg-blue-400",
    badge: "bg-blue-950/60 text-blue-300 border-blue-800",
    rank: "from-blue-600 to-blue-500",
    tag: "bg-blue-950/50 text-blue-300",
    glow: "group-hover:shadow-blue-900/40",
  },
  emerald: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-950/60 text-emerald-300 border-emerald-800",
    rank: "from-emerald-600 to-emerald-500",
    tag: "bg-emerald-950/50 text-emerald-300",
    glow: "group-hover:shadow-emerald-900/40",
  },
  violet: {
    dot: "bg-violet-400",
    badge: "bg-violet-950/60 text-violet-300 border-violet-800",
    rank: "from-violet-600 to-violet-500",
    tag: "bg-violet-950/50 text-violet-300",
    glow: "group-hover:shadow-violet-900/40",
  },
  amber: {
    dot: "bg-amber-400",
    badge: "bg-amber-950/60 text-amber-300 border-amber-800",
    rank: "from-amber-600 to-amber-500",
    tag: "bg-amber-950/50 text-amber-300",
    glow: "group-hover:shadow-amber-900/40",
  },
  slate: {
    dot: "bg-slate-400",
    badge: "bg-slate-800/60 text-slate-300 border-slate-700",
    rank: "from-slate-600 to-slate-500",
    tag: "bg-slate-800/50 text-slate-300",
    glow: "group-hover:shadow-slate-800/40",
  },
  rose: {
    dot: "bg-rose-400",
    badge: "bg-rose-950/60 text-rose-300 border-rose-800",
    rank: "from-rose-600 to-rose-500",
    tag: "bg-rose-950/50 text-rose-300",
    glow: "group-hover:shadow-rose-900/40",
  },
  cyan: {
    dot: "bg-cyan-400",
    badge: "bg-cyan-950/60 text-cyan-300 border-cyan-800",
    rank: "from-cyan-600 to-cyan-500",
    tag: "bg-cyan-950/50 text-cyan-300",
    glow: "group-hover:shadow-cyan-900/40",
  },
  indigo: {
    dot: "bg-indigo-400",
    badge: "bg-indigo-950/60 text-indigo-300 border-indigo-800",
    rank: "from-indigo-600 to-indigo-500",
    tag: "bg-indigo-950/50 text-indigo-300",
    glow: "group-hover:shadow-indigo-900/40",
  },
  orange: {
    dot: "bg-orange-400",
    badge: "bg-orange-950/60 text-orange-300 border-orange-800",
    rank: "from-orange-600 to-orange-500",
    tag: "bg-orange-950/50 text-orange-300",
    glow: "group-hover:shadow-orange-900/40",
  },
  teal: {
    dot: "bg-teal-400",
    badge: "bg-teal-950/60 text-teal-300 border-teal-800",
    rank: "from-teal-600 to-teal-500",
    tag: "bg-teal-950/50 text-teal-300",
    glow: "group-hover:shadow-teal-900/40",
  },
};

const STATS = [
  { value: "10", label: "Free Tools" },
  { value: "100%", label: "No Cost to Start" },
  { value: "2025", label: "Up to Date" },
  { value: "All", label: "Skill Levels" },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ToolCard({ tool, index }) {
  const c = ACCENT[tool.accent] || ACCENT.slate;
  return (
    <article
      aria-label={`${tool.name} — free AI developer tool`}
      className={`group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-600 hover:shadow-xl ${c.glow}`}
      style={{ animationDelay: `${index * 60}ms` }}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* rank + badge row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${c.rank} text-white text-sm font-extrabold flex items-center justify-center shadow-lg`}
            aria-label={`Rank ${tool.rank}`}
          >
            {tool.rank}
          </span>
          <span
            className="text-3xl leading-none select-none"
            aria-hidden="true"
          >
            {tool.icon}
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
          FREE
        </span>
      </div>

      {/* name + tagline */}
      <div>
        <h3
          className="font-extrabold text-white text-lg leading-snug mb-1"
          itemProp="name"
        >
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
          {tool.tagline}
        </p>
      </div>

      {/* description */}
      <p
        className="text-slate-400 text-sm leading-relaxed flex-1"
        itemProp="description"
      >
        {tool.description}
      </p>

      {/* best for */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="text-slate-700">▸</span>
        <span>
          Best for:{" "}
          <span className="text-slate-300 font-medium">{tool.bestFor}</span>
        </span>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AIToolsPage() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 10 Free AI Tools for Developers 2025",
    description:
      "The best free AI coding tools every developer should use in 2025.",
    numberOfItems: 10,
    itemListElement: AI_TOOLS.map((t) => ({
      "@type": "ListItem",
      position: t.rank,
      name: t.name,
      description: t.description,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      <div
        className="min-h-screen bg-[#080c14] text-slate-100"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
          .font-display { font-family: 'Syne', sans-serif; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
          .fade-in { animation: fadeUp 0.6s ease both; }
          .d1{animation-delay:.05s} .d2{animation-delay:.12s} .d3{animation-delay:.2s} .d4{animation-delay:.28s}
          :focus-visible { outline: 2px solid #6366f1; outline-offset: 3px; border-radius: 6px; }
        `}</style>

        {/* ── NAV ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-lg">
          <nav
            className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="font-display text-lg font-bold text-white tracking-tight"
            >
              AI<span className="text-blue-400">Tech</span>Path
            </Link>
            <div className="hidden md:flex items-center gap-7 text-sm text-slate-400">
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/tools" className="text-white font-semibold">
                AI Tools
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {/* ── BREADCRUMB ─────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-6xl mx-auto px-4 sm:px-6 pt-5"
        >
          <ol className="flex items-center gap-2 text-xs text-slate-600">
            {[
              ["Home", "/"],
              ["Blog", "/blog"],
              ["AI Tools", null],
            ].map(([label, href], i) => (
              <li key={label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {href ?
                  <Link
                    href={href}
                    className="hover:text-slate-400 transition-colors"
                  >
                    {label}
                  </Link>
                : <span className="text-slate-400 font-medium">{label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <main id="main-content">
          {/* ── HERO ───────────────────────────────────────────── */}
          <section
            aria-labelledby="page-heading"
            className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 overflow-hidden"
          >
            {/* bg decoration */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-700/10 rounded-full blur-[100px]" />
              <div className="absolute top-10 right-1/4 w-64 h-64 bg-violet-700/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-3xl">
              {/* eyebrow badge */}
              <div className="inline-flex items-center gap-2 bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-7 fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                2025 Edition · All Free or Freemium
              </div>

              <h1
                id="page-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 fade-in d1"
                itemProp="headline"
              >
                Top 10 Free AI Tools Every Developer Should Use{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">
                  (2025)
                </span>
              </h1>

              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8 fade-in d2">
                AI has permanently changed how developers write, debug, and ship
                software. These ten tools are either completely free or offer
                generous free plans — giving every developer, regardless of
                budget, access to AI-powered superpowers.
              </p>

              {/* meta row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 fade-in d3">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600" />8 min
                  read
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  Last updated 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  All skill levels
                </span>
                <a
                  href="#tools"
                  className="ml-auto text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                >
                  Jump to tools ↓
                </a>
              </div>
            </div>
          </section>

          {/* ── STATS STRIP ────────────────────────────────────── */}
          <div className="border-y border-slate-800 bg-slate-900/40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <dt className="font-display font-extrabold text-2xl text-white">
                      {s.value}
                    </dt>
                    <dd className="text-slate-500 text-xs mt-0.5">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ── QUICK OVERVIEW (featured snippet target) ──────── */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">
                Quick Overview — All 10 Tools
              </p>
              <ol
                className="grid sm:grid-cols-2 gap-x-10 gap-y-2"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {AI_TOOLS.map((tool) => {
                  const c = ACCENT[tool.accent];
                  return (
                    <li
                      key={tool.rank}
                      className="flex items-center gap-3 text-sm"
                      itemScope
                      itemType="https://schema.org/ListItem"
                      itemProp="itemListElement"
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-md bg-gradient-to-br ${c.rank} text-white text-xs font-bold flex items-center justify-center`}
                      >
                        {tool.rank}
                      </span>
                      <a
                        href={`#tool-${tool.rank}`}
                        className="font-semibold text-slate-200 hover:text-white transition-colors"
                        itemProp="name"
                      >
                        {tool.name}
                      </a>
                      <span className="text-slate-600 text-xs hidden sm:inline truncate">
                        — {tool.tagline}
                      </span>
                      <meta itemProp="position" content={String(tool.rank)} />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* ── TOOLS GRID ─────────────────────────────────────── */}
          <section
            id="tools"
            aria-labelledby="tools-heading"
            className="max-w-6xl mx-auto px-4 sm:px-6 pb-20"
          >
            <h2
              id="tools-heading"
              className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-8"
            >
              The Full List — Reviewed & Ranked
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AI_TOOLS.map((tool, i) => (
                <div key={tool.rank} id={`tool-${tool.rank}`}>
                  <ToolCard tool={tool} index={i} />
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-600 leading-relaxed">
              All tools listed have a free plan or free tier as of 2025.
              Availability and limits may change — verify on each tool&apos;s
              official website.
            </p>
          </section>

          {/* ── HOW TO CHOOSE ──────────────────────────────────── */}
          <section
            aria-labelledby="choose-heading"
            className="border-t border-slate-800 bg-slate-900/30 py-16 sm:py-20"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2
                id="choose-heading"
                className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-4"
              >
                How to Choose the Right AI Tool for You
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
                Not every tool is right for every developer. Here&apos;s a quick
                decision guide based on your situation:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    scenario: "You're a student or beginner",
                    recommendation:
                      "Start with GitHub Copilot (free via GitHub Education) + ChatGPT Free. These two tools alone will halve your learning time.",
                  },
                  {
                    scenario: "You want unlimited free completions",
                    recommendation:
                      "Codeium has zero usage caps on its free plan and works inside 40+ editors. No credit card required.",
                  },
                  {
                    scenario: "Privacy is your top concern",
                    recommendation:
                      "Tabnine's local mode runs entirely on your machine. No code ever leaves your environment.",
                  },
                  {
                    scenario: "You want a complete AI IDE",
                    recommendation:
                      "Try Cursor — it replaces VS Code entirely and lets you chat with your whole codebase in context.",
                  },
                  {
                    scenario: "You're building AI-powered apps",
                    recommendation:
                      "Stack AI lets you visually chain AI APIs together without complex backend code. Ideal for non-backend developers.",
                  },
                  {
                    scenario: "You want to self-host everything",
                    recommendation:
                      "CodeT5 is fully open-source and can run on your own hardware — ideal for teams with compliance requirements.",
                  },
                ].map(({ scenario, recommendation }) => (
                  <div
                    key={scenario}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      If: {scenario}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer
          className="border-t border-slate-800 bg-slate-900/40"
          role="contentinfo"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid sm:grid-cols-3 gap-10 mb-10">
              <div>
                <p className="font-display font-bold text-xl text-white mb-3">
                  AI<span className="text-blue-400">Tech</span>Path
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Helping beginners become tech experts faster using AI tools
                  and structured guides.
                </p>
              </div>
              <nav aria-label="Learn links">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
                  Learn
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Web Development", "/learn/web-development"],
                    ["App Development", "/learn/app-development"],
                    ["UI/UX Design", "/learn/ui-ux-design"],
                    ["Digital Marketing", "/learn/digital-marketing"],
                  ].map(([l, h]) => (
                    <li key={l}>
                      <Link
                        href={h}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Resources links">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
                  Resources
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Blog", "/blog"],
                    ["AI Tools", "/tools"],
                    ["Freelancing Guide", "/freelance"],
                    ["Contact", "/contact"],
                  ].map(([l, h]) => (
                    <li key={l}>
                      <Link
                        href={h}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <p>
                © {new Date().getFullYear()} AITechPath. All rights reserved.
              </p>
              <p>Free AI tools guide · Updated 2025</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
