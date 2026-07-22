"use client";
import Head from "next/head";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Choose Your Tech Path",
    desc: "Decide whether you want to focus on web development, app development, UI/UX design, or digital marketing. It's okay to start with just one.",
  },
  {
    number: "02",
    title: "Learn the Fundamentals",
    desc: "Spend 2–4 weeks on core basics: HTML/CSS for web, Figma for design, or content writing for marketing. AI tools will accelerate this.",
  },
  {
    number: "03",
    title: "Use AI as Your Mentor",
    desc: "Use tools like ChatGPT, GitHub Copilot, or Claude to explain concepts, debug code, and give feedback instantly — available 24/7.",
  },
  {
    number: "04",
    title: "Build Real Projects",
    desc: "Apply your skills on real projects immediately. A portfolio website, a simple app, or a marketing campaign. Learning by doing beats theory alone.",
  },
  {
    number: "05",
    title: "Iterate and Improve",
    desc: "Review your work, gather feedback, and improve. Use AI to identify weaknesses and suggest better approaches.",
  },
  {
    number: "06",
    title: "Stay Consistent",
    desc: "Tech mastery is built in small daily sessions. Even 30 minutes a day compounds into expertise over months.",
  },
];

const skills = [
  {
    id: "webdev",
    emoji: "💻",
    label: "Web Dev",
    color: "from-violet-600 to-indigo-600",
  },
  {
    id: "appdev",
    emoji: "📱",
    label: "App Dev",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "uiux",
    emoji: "🎨",
    label: "UI/UX",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "marketing",
    emoji: "📣",
    label: "Marketing",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function Home() {
  const [activeSkill, setActiveSkill] = useState("webdev");

  return (
    <>
      <Head>
        <title>
          Become a Tech Expert with AI | Learn Web Dev, App Dev & UI/UX
        </title>
        <meta
          name="description"
          content="Learn Web Development, App Development, UI/UX Design, and Digital Marketing using AI tools. A complete beginner-friendly guide to becoming a tech expert faster with artificial intelligence."
        />
        <meta
          name="keywords"
          content="learn web development with AI, become a tech expert, AI-powered web development, app development with AI, UI/UX design with AI, digital marketing with AI, AI tools for developers"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Become a Tech Expert with AI | Full Learning Guide"
        />
        <meta
          property="og:description"
          content="AI-Powered Web & App Development Guide for beginners and intermediate learners. Start your journey today."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://joetech.name.ng/learnTech" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          :root {
            --font-display: 'Syne', sans-serif;
            --font-body: 'DM Sans', sans-serif;
          }
          body { font-family: var(--font-body); }
          h1, h2, h3, h4, .font-display { font-family: var(--font-display); }
          .hero-grain {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .animate-fadeup { animation: fadeUp 0.7s ease forwards; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .skill-card { opacity: 0; animation: fadeUp 0.6s ease forwards; }
        `}</style>
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* NAV */}
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
          <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="/" className="font-display font-800 text-xl tracking-tight text-white hover:opacity-80 transition-opacity">
              <span className="text-violet-400">Joe</span>tech
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
              <a href="#web-dev" className="hover:text-white transition-colors">
                Web Dev
              </a>
              <a href="#app-dev" className="hover:text-white transition-colors">
                App Dev
              </a>
              <a href="#uiux" className="hover:text-white transition-colors">
                UI/UX
              </a>
              <a
                href="#marketing"
                className="hover:text-white transition-colors"
              >
                Marketing
              </a>
              <a href="#roadmap" className="hover:text-white transition-colors">
                Roadmap
              </a>
            </div>
            <a
              href="#get-started"
              className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              Start Learning
            </a>
          </nav>
        </header>

        <main>
          {/* HERO */}
          <section
            id="get-started"
            className="relative overflow-hidden bg-slate-950 pt-20 pb-28"
          >
            {/* background decorations */}
            <div className="absolute inset-0 hero-grain pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-800/60 text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fadeup">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                AI-Powered Tech Education
              </div>

              <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6 animate-fadeup delay-100">
                You Too Can Become a<br />
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Tech Expert with AI
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 animate-fadeup delay-200">
                Learn Web Development, App Development, UI/UX Design, and
                Digital Marketing faster than ever — using AI as your personal
                mentor, debugger, and creative partner.
              </p>

              <p className="text-sm text-violet-400 font-medium tracking-wide uppercase mb-10 animate-fadeup delay-300">
                Beginner-Friendly · AI-Powered · Career-Ready
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeup delay-400">
                <a
                  href="#web-dev"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-violet-900/40"
                >
                  Start Learning Web Development
                </a>
                <a
                  href="#skills"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 border border-slate-700"
                >
                  Explore AI Tech Skills
                </a>
              </div>

              {/* floating badges */}
              <div className="mt-16 flex flex-wrap justify-center gap-3 animate-fadeup delay-400">
                {[
                  "ChatGPT",
                  "GitHub Copilot",
                  "v0.dev",
                  "Midjourney",
                  "Jasper AI",
                  "Cursor",
                  "Figma AI",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="bg-slate-800/70 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SKILLS OVERVIEW */}
          <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
                Four Paths to Tech Mastery with AI
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Choose the path that excites you most. Each track uses AI tools
                to slash your learning curve in half.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {skills.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSkill(s.id)}
                  className={`group p-6 rounded-2xl border transition-all text-left ${
                    activeSkill === s.id ?
                      "border-violet-500 bg-violet-950/40"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {s.emoji}
                  </div>
                  <p className="font-display font-semibold text-white">
                    {s.label}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* WEB DEV SECTION */}
          <section
            id="web-dev"
            className="border-t border-slate-800 bg-slate-900/40 py-20"
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <span className="inline-block bg-violet-950 border border-violet-800 text-violet-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                    Web Development with AI
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5 leading-tight">
                    Learn Web Development with AI — Faster Than Any Bootcamp
                  </h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Web development covers everything from building web pages
                    with HTML &amp; CSS to creating dynamic apps with
                    JavaScript, React, and Next.js. AI tools now make it
                    possible for absolute beginners to write, debug, and ship
                    real code in days instead of months.
                  </p>

                  <h3 className="font-display font-semibold text-lg text-white mb-4">
                    Step-by-Step Learning Path
                  </h3>
                  <ol className="space-y-4 mb-8">
                    {[
                      [
                        "Master the Basics",
                        "Learn HTML structure, CSS styling, and JavaScript logic. Use ChatGPT to explain every concept as you go.",
                      ],
                      [
                        "Use AI for Practice & Debugging",
                        "Paste your code into AI tools to get instant explanations, bug fixes, and improvements. No waiting for a tutor.",
                      ],
                      [
                        "Build Real Projects",
                        "Create a portfolio site, a landing page, or a small React app. AI can generate starter code you customize and learn from.",
                      ],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-800 text-violet-200 text-sm font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{title}</p>
                          <p className="text-slate-400 text-sm mt-0.5">
                            {desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <h3 className="font-display font-semibold text-lg text-white mb-3">
                    AI Tools Web Developers Use
                  </h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    {[
                      "GitHub Copilot — autocomplete entire functions in VS Code",
                      "ChatGPT / Claude — explain concepts and debug errors",
                      "v0.dev — generate React UI components from prompts",
                      "Cursor — AI-powered code editor for full-stack projects",
                      "Bolt.new — build and deploy full-stack apps from descriptions",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">✦</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/40">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-slate-400 text-xs ml-2 font-mono">
                        Learn Web Dev with AI
                      </span>
                    </div>
                    <div className="aspect-video bg-slate-900">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/ysEN5RaKOlA"
                        title="Learn Web Development with AI - Beginner Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "HTML/CSS", icon: "🌐" },
                      { label: "JavaScript", icon: "⚡" },
                      { label: "React", icon: "⚛️" },
                      { label: "Next.js", icon: "▲" },
                      { label: "Tailwind", icon: "🎨" },
                      { label: "APIs", icon: "🔌" },
                    ].map((tech) => (
                      <div
                        key={tech.label}
                        className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700"
                      >
                        <p className="text-2xl mb-1">{tech.icon}</p>
                        <p className="text-xs text-slate-300 font-medium">
                          {tech.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* APP DEV SECTION */}
          <section id="app-dev" className="py-20 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="order-2 md:order-1">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                    <h3 className="font-display font-bold text-xl text-white mb-6">
                      App Dev Learning Roadmap
                    </h3>
                    <div className="space-y-5">
                      {[
                        {
                          week: "Week 1–2",
                          task: "Pick your framework: React Native for mobile or Next.js for web apps",
                        },
                        {
                          week: "Week 3–4",
                          task: "Use AI to scaffold your first app — authentication, database, and UI",
                        },
                        {
                          week: "Week 5–8",
                          task: "Build a complete CRUD app: notes, todos, or a SaaS landing page",
                        },
                        {
                          week: "Month 3+",
                          task: "Deploy your app. Add AI features. Monetize or add to portfolio.",
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <span className="inline-block bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono px-2 py-1 rounded">
                              {item.week}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {item.task}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-br from-rose-950/50 to-pink-950/30 border border-rose-900/40 rounded-2xl p-6">
                    <p className="text-rose-300 font-semibold mb-2">
                      ⚡ AI Speed Advantage
                    </p>
                    <p className="text-slate-400 text-sm">
                      What used to take a developer 3 months to build can now
                      take 2–3 weeks using AI-assisted development. You write
                      the ideas, AI writes the boilerplate.
                    </p>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <span className="inline-block bg-rose-950 border border-rose-800 text-rose-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                    App Development with AI
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5 leading-tight">
                    Build Mobile &amp; Web Apps Using AI — No Senior Dev
                    Required
                  </h2>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Whether you want to build a mobile app with React Native or
                    a full-stack web app with Next.js and a database, AI
                    dramatically reduces the complexity. You focus on your
                    product idea; AI handles the repetitive code.
                  </p>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Beginners can now ship functional apps within weeks — not
                    years — by leveraging AI code generation, AI debugging, and
                    AI-assisted architecture planning.
                  </p>
                  <h3 className="font-display font-semibold text-lg text-white mb-3">
                    Key App Dev AI Tools
                  </h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    {[
                      "Expo + AI — build cross-platform mobile apps faster",
                      "Supabase AI — auto-generate database queries and auth",
                      "Lovable.dev — describe your app; AI builds the full product",
                      "AWS Amplify + AI — deploy serverless apps with AI help",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="text-rose-400 mt-0.5">✦</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* UI/UX SECTION */}
          <section
            id="uiux"
            className="bg-slate-900/40 border-t border-slate-800 py-20"
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="inline-block bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                  UI/UX Design with AI
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                  Design Beautiful Interfaces Using AI Design Tools
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  You don't need years of design school. AI tools now assist
                  with wireframing, color palettes, typography, and even full
                  prototype generation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: "🧠",
                    title: "Design Thinking",
                    desc: "Understand your user's needs first. Use AI to generate user personas, pain point analyses, and feature lists automatically.",
                  },
                  {
                    icon: "📐",
                    title: "Wireframing",
                    desc: "Use Figma AI or Uizard to turn rough sketches or text descriptions into clean, structured wireframes in minutes.",
                  },
                  {
                    icon: "🎯",
                    title: "Prototyping",
                    desc: "Build interactive prototypes with AI assistance. Test with real users before writing a single line of code.",
                  },
                ].map((card) => (
                  <article
                    key={card.title}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-amber-800/60 transition-colors"
                  >
                    <span className="text-4xl mb-4 block">{card.icon}</span>
                    <h3 className="font-display font-semibold text-white text-lg mb-2">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </article>
                ))}
              </div>

              <div className="bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-900/40 rounded-2xl p-8">
                <h3 className="font-display font-bold text-xl text-white mb-5">
                  Beginner UI/UX Path with AI — 4 Simple Steps
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    [
                      "Step 1",
                      "Research",
                      "Use AI to analyze competitors and define your user's goals",
                    ],
                    [
                      "Step 2",
                      "Sketch",
                      "Draw rough layouts on paper or let AI generate wireframes from your brief",
                    ],
                    [
                      "Step 3",
                      "Design",
                      "Use Figma + AI plugins to refine visual design, colors, and typography",
                    ],
                    [
                      "Step 4",
                      "Test",
                      "Share prototypes. Use AI heatmap tools and collect user feedback fast",
                    ],
                  ].map(([step, title, desc]) => (
                    <div key={title}>
                      <p className="text-amber-500 font-mono text-xs font-bold mb-1">
                        {step}
                      </p>
                      <p className="font-display font-semibold text-white mb-1">
                        {title}
                      </p>
                      <p className="text-slate-400 text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* DIGITAL MARKETING SECTION */}
          <section id="marketing" className="border-t border-slate-800 py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <span className="inline-block bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                    Digital Marketing with AI
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5 leading-tight">
                    Master Digital Marketing with AI Content &amp; SEO Tools
                  </h2>
                  <p className="text-slate-400 mb-5 leading-relaxed">
                    Digital marketing combines SEO, social media, content
                    creation, email marketing, and paid ads. AI tools now
                    automate the tedious parts — research, writing, analytics —
                    so you focus on strategy.
                  </p>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Beginners can use AI to write blog posts, generate social
                    media calendars, analyze campaign data, and optimize
                    websites for Google — all without an agency.
                  </p>

                  <h3 className="font-display font-semibold text-lg text-white mb-4">
                    What AI Does for Marketers
                  </h3>
                  <ul className="space-y-3 text-slate-400 text-sm">
                    {[
                      [
                        "SEO Research",
                        "AI finds keywords, analyses search intent, and suggests content clusters",
                      ],
                      [
                        "Content Creation",
                        "Generate blog posts, ads, email sequences, and social captions in minutes",
                      ],
                      [
                        "Analytics",
                        "AI dashboards spot trends and conversion leaks you'd miss manually",
                      ],
                      [
                        "Social Media",
                        "Schedule posts, generate visual briefs, and A/B test captions with AI",
                      ],
                    ].map(([title, desc]) => (
                      <li key={title} className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-0.5">✦</span>
                        <span>
                          <strong className="text-white">{title}:</strong>{" "}
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-6">
                    Beginner Digital Marketing Roadmap
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        phase: "Month 1",
                        title: "Foundations",
                        tasks: [
                          "Learn SEO basics",
                          "Set up Google Analytics",
                          "Start a blog with AI-assisted writing",
                        ],
                        color: "border-l-emerald-600",
                      },
                      {
                        phase: "Month 2",
                        title: "Content & Social",
                        tasks: [
                          "Build a content calendar with AI",
                          "Create 3 platforms presence",
                          "Learn email marketing basics",
                        ],
                        color: "border-l-teal-500",
                      },
                      {
                        phase: "Month 3",
                        title: "Ads & Analytics",
                        tasks: [
                          "Run a small Google or Meta ad",
                          "Analyze what's working with AI reports",
                          "Optimize and repeat",
                        ],
                        color: "border-l-cyan-500",
                      },
                    ].map((phase) => (
                      <div
                        key={phase.phase}
                        className={`bg-slate-900 border border-slate-800 border-l-4 ${phase.color} rounded-xl p-5`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-mono text-slate-500 font-bold">
                            {phase.phase}
                          </span>
                          <span className="font-display font-semibold text-white">
                            {phase.title}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {phase.tasks.map((t) => (
                            <li
                              key={t}
                              className="text-slate-400 text-sm flex items-center gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ROADMAP SECTION */}
          <section
            id="roadmap"
            className="bg-slate-900/40 border-t border-slate-800 py-20"
          >
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-14">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                  Step-by-Step Guide: Become a Good Developer with AI
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                  This is your no-fluff roadmap. Follow these steps with
                  consistency and AI as your co-pilot — and you will become
                  genuinely good.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {steps.map((step, i) => (
                  <article
                    key={step.number}
                    className="group bg-slate-900 border border-slate-800 hover:border-violet-800/60 rounded-2xl p-7 transition-all hover:shadow-lg hover:shadow-violet-900/20"
                  >
                    <div className="flex items-start gap-5">
                      <span className="font-display font-extrabold text-4xl text-slate-700 group-hover:text-violet-800 transition-colors leading-none mt-1 select-none">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-white text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* TRUST & MOTIVATION SECTION */}
          <section className="border-t border-slate-800 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-br from-violet-950/60 via-slate-900 to-indigo-950/40 border border-violet-800/30 rounded-3xl p-12 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 bg-violet-700/20 blur-3xl rounded-full pointer-events-none" />
                <div className="relative">
                  <p className="text-5xl mb-6 animate-float">✨</p>
                  <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-6 leading-tight">
                    Anyone Can Learn Tech with the Right Guide and AI Tools
                  </h2>
                  <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
                    It doesn't matter if you failed math class, never coded
                    before, or feel like "tech isn't for you." AI has completely
                    changed what's possible for beginners. What used to take
                    years now takes months.
                  </p>
                  <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base leading-relaxed">
                    The only thing that separates those who make it from those
                    who don't is{" "}
                    <strong className="text-violet-300">consistency</strong>.
                    Show up daily — even for 20 minutes — and AI will amplify
                    every effort you make.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#web-dev"
                      className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-violet-900/40"
                    >
                      Start Learning Today
                    </a>
                    <a
                      href="#roadmap"
                      className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 border border-slate-700"
                    >
                      View the Roadmap
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              <div className="md:col-span-2">
                <p className="font-display font-bold text-xl text-white mb-3">
                  <span className="text-violet-400">Joe</span>tech
                </p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  Learn Web Development, App Development, UI/UX, and Digital
                  Marketing using AI — guided by Joetech.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-4">
                  Learning Paths
                </p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <a
                      href="#web-dev"
                      className="hover:text-white transition-colors"
                    >
                      Web Development with AI
                    </a>
                  </li>
                  <li>
                    <a
                      href="#app-dev"
                      className="hover:text-white transition-colors"
                    >
                      App Development with AI
                    </a>
                  </li>
                  <li>
                    <a
                      href="#uiux"
                      className="hover:text-white transition-colors"
                    >
                      UI/UX Design with AI
                    </a>
                  </li>
                  <li>
                    <a
                      href="#marketing"
                      className="hover:text-white transition-colors"
                    >
                      Digital Marketing with AI
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-4">
                  Resources
                </p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <a
                      href="#roadmap"
                      className="hover:text-white transition-colors"
                    >
                      Developer Roadmap
                    </a>
                  </li>
                  <li>
                    <a
                      href="#skills"
                      className="hover:text-white transition-colors"
                    >
                      AI Tools Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#get-started"
                      className="hover:text-white transition-colors"
                    >
                      Getting Started
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Joetech · Learn Tech with AI
              </p>
              <p className="text-slate-500 text-xs">
                AI-Powered Web &amp; App Development Guide · Learn Tech with
                Artificial Intelligence
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
