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
          content="Learn Web Development, React Native App Development, UI/UX Design, and Digital Marketing using AI tools. A complete beginner-friendly guide to becoming a tech expert faster with artificial intelligence."
        />
        <meta
          name="keywords"
          content="learn web development with AI, become a tech expert, AI-powered web development, app development with AI, learn react native nigeria, react native for beginners, UI/UX design with AI, digital marketing with AI, AI tools for developers, mobile app development with AI"
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
              <a href="#react-native" className="hover:text-white transition-colors">
                React Native
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

          {/* REACT NATIVE SECTION */}
          <section
            id="react-native"
            className="border-t border-slate-800 bg-slate-900/40 py-20"
          >
            <div className="max-w-6xl mx-auto px-6">
              {/* header */}
              <div className="text-center mb-14">
                <span className="inline-block bg-rose-950 border border-rose-800 text-rose-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                  App Development with AI
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 leading-tight">
                  How to Learn Mobile App Development with React Native —{" "}
                  <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                    Complete Beginner Guide (2026)
                  </span>
                </h2>
                <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  React Native is the best first framework for beginners in
                  Nigeria and Africa in 2026: one codebase runs on both
                  Android and iOS, you write it in JavaScript, Expo removes
                  the painful setup, AI accelerates your learning, and the
                  demand for React talent across Lagos is enormous. All you
                  need is a laptop and a phone — no Mac, no big data budget.
                </p>
              </div>

              {/* prerequisites */}
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                {[
                  {
                    icon: "💻",
                    title: "Any Laptop",
                    desc: "Windows, Mac, or Linux. Even 8GB RAM works because you test on your real phone instead of a heavy emulator.",
                  },
                  {
                    icon: "📱",
                    title: "An Android Phone",
                    desc: "Install the free Expo Go app and run your app on real hardware. Most Nigerian users are Android-first anyway.",
                  },
                  {
                    icon: "🤖",
                    title: "AI as Your Tutor",
                    desc: "ChatGPT, Cursor, and Copilot explain concepts, write boilerplate, and fix bugs 24/7 while you learn.",
                  },
                ].map((c) => (
                  <article
                    key={c.title}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                  >
                    <span className="text-3xl mb-3 block">{c.icon}</span>
                    <h3 className="font-display font-semibold text-white mb-2">
                      {c.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {c.desc}
                    </p>
                  </article>
                ))}
              </div>

              {/* learning phases */}
              <div className="bg-gradient-to-br from-rose-950/50 via-slate-900 to-violet-950/40 border border-slate-800 rounded-3xl p-8 md:p-10 mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-display font-extrabold text-4xl text-rose-700">
                    5
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      The Complete React Native Learning Path
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Tap each phase to expand the details. Follow in order and
                      use AI at every step.
                    </p>
                  </div>
                </div>

                {[
                  {
                    phase: "Phase 1",
                    time: "Week 1–2",
                    title: "Foundations",
                    points: [
                      "JavaScript essentials you actually need: variables, const/let, functions, arrays, objects, and async/await.",
                      "React basics: components, props, state, and hooks (useState, useEffect).",
                      "How AI accelerates this phase: ask ChatGPT to explain each concept, generate mini-examples, and quiz you daily.",
                    ],
                  },
                  {
                    phase: "Phase 2",
                    time: "Day 1–2",
                    title: "Environment Setup",
                    points: [
                      "Install Node.js (LTS), Expo CLI, and VS Code or Cursor.",
                      "Create your first project with npx create-expo-app@latest.",
                      "Run it on a real Android phone with Expo Go — no Android Studio needed at the start.",
                      "Windows vs Mac: Windows is Android-first (perfect for Nigeria); Mac adds iOS testing via the simulator.",
                    ],
                  },
                  {
                    phase: "Phase 3",
                    time: "Week 3–5",
                    title: "Core React Native",
                    points: [
                      "Core components: View, Text, Image, ScrollView, FlatList, TextInput, Button.",
                      "Styling with StyleSheet and basic Flexbox for layouts.",
                      "Navigation with React Navigation or expo-router.",
                      "Handling user input and forms.",
                      "Local storage with AsyncStorage for offline-friendly apps.",
                      "Fetching data from APIs with fetch and loading states.",
                    ],
                  },
                  {
                    phase: "Phase 4",
                    time: "Week 6–10",
                    title: "Build Real Projects",
                    points: [
                      "Project 1: A Todo / Notes app that saves data locally.",
                      "Project 2: A simple weather or news app that fetches live data from an API.",
                      "Project 3: A CRUD app with authentication using Supabase or Firebase.",
                      "Use AI to generate boilerplate, fix bugs, and explain every error you hit.",
                    ],
                  },
                  {
                    phase: "Phase 5",
                    time: "Month 3+",
                    title: "Advanced & Production",
                    points: [
                      "State management with Context or Zustand.",
                      "Offline-first techniques for low-bandwidth markets.",
                      "Push notifications for retention.",
                      "App icons, splash screens, and app.json configuration.",
                      "Building APK/AAB and publishing to Google Play ($25 one-time fee, payable from Nigeria).",
                      "Optional iOS: build and submit via Expo EAS Build — no Mac required.",
                    ],
                  },
                ].map((ph) => (
                  <details
                    key={ph.title}
                    className="group bg-slate-900/70 border border-slate-700/70 rounded-2xl mb-4 open:border-rose-700/60"
                  >
                    <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                      <span className="flex-shrink-0 inline-block bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono px-2 py-1 rounded">
                        {ph.phase}
                      </span>
                      <span className="flex-shrink-0 inline-block bg-slate-800 text-slate-300 text-xs font-mono px-2 py-1 rounded">
                        {ph.time}
                      </span>
                      <span className="font-display font-semibold text-white flex-1">
                        {ph.title}
                      </span>
                      <span className="text-slate-500 group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <ul className="px-5 pb-5 space-y-2 text-slate-400 text-sm leading-relaxed">
                      {ph.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="text-rose-400 mt-0.5">✦</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>

              {/* resources + schedule */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
                  <h3 className="font-display font-semibold text-white text-lg mb-4">
                    📚 Recommended Resources
                  </h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    {[
                      "Official docs: reactnative.dev and docs.expo.dev (free, authoritative)",
                      "Expo's learning portal and Snack playground",
                      "Free YouTube: Fireship, The Net Ninja, Programming with Mosh",
                      "AI tools: ChatGPT, Cursor, GitHub Copilot — your 24/7 tutors",
                      "Our blog series: the React Native beginner guide, 30-Day AI roadmap, and best AI tools (links below)",
                    ].map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">✦</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
                  <h3 className="font-display font-semibold text-white text-lg mb-4">
                    🗓️ Weekly Study Schedule (30–60 min/day)
                  </h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    {[
                      "Mon: Learn a concept with AI (30–45 min)",
                      "Tue: Code along on a small exercise (45–60 min)",
                      "Wed: Review + fix yesterday's code with AI (30 min)",
                      "Thu: Build a tiny feature into your project (45 min)",
                      "Fri: Read/watch one resource + take notes (30 min)",
                      "Sat: Longer project session (60+ min)",
                      "Sun: Rest, or 15 min of light review — consistency beats marathons",
                    ].map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✦</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* pitfalls + monetization */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/30 border border-amber-900/40 rounded-2xl p-7">
                  <h3 className="font-display font-semibold text-white text-lg mb-4">
                    ⚠️ Common Pitfalls & How AI Avoids Them
                  </h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    {[
                      "Skipping JavaScript basics → spend Week 1 on fundamentals",
                      "Testing only on a simulator → test on a real Android phone",
                      "Aiming too big too fast → build a tiny MVP first",
                      "Ignoring errors → copy the full error into AI, don't panic",
                      "No error handling → use try/catch so offline users never crash",
                    ].map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/blog/react-native-beginner-mistakes-ai"
                    className="inline-block mt-5 text-rose-300 text-sm font-semibold hover:text-rose-200"
                  >
                    Read the full beginner mistakes guide →
                  </a>
                </div>

                <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/30 border border-emerald-900/40 rounded-2xl p-7">
                  <h3 className="font-display font-semibold text-white text-lg mb-4">
                    💰 Portfolio & Monetization Path
                  </h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    {[
                      "Ship 2–3 real projects (notes app, weather app, CRUD app)",
                      "Publish one to Google Play — a live app is your strongest portfolio piece",
                      "Monetize with ads, in-app purchases, or Naira subscriptions",
                      "Freelance: offer React Native apps to local businesses and international clients",
                      "Level up through our App Development with AI mentorship track",
                    ].map((m) => (
                      <li key={m} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✦</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/blog/monetize-react-native-app-nigeria"
                    className="inline-block mt-5 text-rose-300 text-sm font-semibold hover:text-rose-200"
                  >
                    Read the full monetization guide →
                  </a>
                </div>
              </div>

              {/* the react native blog series */}
              <div className="mb-10">
                <h3 className="font-display font-semibold text-white text-lg mb-4">
                  📖 The Complete React Native Blog Series
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    ["React Native for Beginners in Nigeria", "react-native-beginners-nigeria"],
                    ["Build Your First App with AI in 30 Days", "build-mobile-app-react-native-ai-30-days"],
                    ["Best Free AI Tools for React Native 2026", "best-ai-tools-react-native-2026"],
                    ["React Native vs Flutter in 2026", "react-native-vs-flutter-2026-nigeria"],
                    ["Launch a Mobile App on a Budget in Nigeria", "launch-mobile-app-budget-react-native-nigeria"],
                    ["Publishing on Google Play & App Store from Nigeria", "publish-react-native-app-google-play-nigeria"],
                    ["Common React Native Beginner Mistakes & AI Fixes", "react-native-beginner-mistakes-ai"],
                    ["How to Monetize React Native Apps in Nigeria", "monetize-react-native-app-nigeria"],
                    ["Setting Up RN on Windows & Mac", "react-native-setup-windows-mac-beginners"],
                    ["Offline-First Apps for African Markets", "offline-first-mobile-apps-nigeria"],
                  ].map(([label, slug]) => (
                    <a
                      key={slug}
                      href={`/blog/${slug}`}
                      className="group bg-slate-900 border border-slate-800 hover:border-rose-700/60 rounded-xl p-4 flex items-center justify-between gap-3 transition-colors"
                    >
                      <span className="text-slate-300 text-sm group-hover:text-white">
                        {label}
                      </span>
                      <svg className="w-4 h-4 text-slate-500 group-hover:text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-rose-950/50 to-violet-950/40 border border-rose-900/40 rounded-2xl p-8 md:p-10 text-center">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                  Start Your React Native Journey This Week
                </h3>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Follow the 5 phases above with consistency and AI as your
                  co-pilot — you can go from zero to a published app in 3–4
                  months. Want a guided hand with real mentorship and project
                  work?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/blog/react-native-beginners-nigeria"
                    className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-rose-900/40"
                  >
                    Start with the Beginner Guide
                  </a>
                  <a
                    href="/blog/build-mobile-app-react-native-ai-30-days"
                    className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 border border-slate-700"
                  >
                    Follow the 30-Day AI Roadmap
                  </a>
                  <a
                    href="/contact"
                    className="bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
                  >
                    Get Mentorship
                  </a>
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

      </div>
    </>
  );
}
