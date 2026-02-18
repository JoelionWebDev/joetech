import Link from "next/link";

const skills = [
  {
    icon: "💻",
    title: "Web Development with AI",
    desc: "Build modern websites and web apps using HTML, CSS, JavaScript, React, and Next.js — with AI as your always-available coding partner.",
    badge: "Most Popular",
    badgeColor: "bg-violet-100 text-violet-700",
    accent: "hover:border-violet-400 hover:shadow-violet-100",
    iconBg: "bg-violet-50",
  },
  {
    icon: "📱",
    title: "App Development with AI",
    desc: "Create mobile and full-stack web applications faster by using AI to generate code, fix bugs, and architect scalable products.",
    badge: "High Demand",
    badgeColor: "bg-rose-100 text-rose-600",
    accent: "hover:border-rose-300 hover:shadow-rose-100",
    iconBg: "bg-rose-50",
  },
  {
    icon: "🎨",
    title: "UI/UX Design with AI",
    desc: "Design beautiful interfaces, wireframes, and prototypes using AI-powered design tools — no art degree required.",
    badge: "Creative",
    badgeColor: "bg-amber-100 text-amber-700",
    accent: "hover:border-amber-300 hover:shadow-amber-100",
    iconBg: "bg-amber-50",
  },
  {
    icon: "📣",
    title: "Digital Marketing with AI",
    desc: "Master SEO, content marketing, and social media strategy using AI tools that write, analyze, and optimize campaigns for you.",
    badge: "Fast Growing",
    badgeColor: "bg-emerald-100 text-emerald-700",
    accent: "hover:border-emerald-300 hover:shadow-emerald-100",
    iconBg: "bg-emerald-50",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a Tech Skill",
    desc: "Pick the area that excites you most — web dev, app dev, design, or marketing.",
    color: "text-violet-600",
    line: "bg-violet-200",
  },
  {
    number: "02",
    title: "Learn Faster Using AI Tools",
    desc: "Use ChatGPT, Copilot, and other AI tools as your personal tutor, available 24/7.",
    color: "text-indigo-600",
    line: "bg-indigo-200",
  },
  {
    number: "03",
    title: "Build Real Projects & Grow",
    desc: "Apply your skills on real projects, build a portfolio, and launch your tech career.",
    color: "text-pink-600",
    line: "bg-pink-200",
  },
];

export default function TechAISection() {
  return (
    <section
      aria-labelledby="tech-ai-heading"
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* subtle background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, #ede9fe 0%, transparent 50%), radial-gradient(circle at 85% 20%, #fce7f3 0%, transparent 45%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── TOP LABEL ── */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            AI-Powered Tech Education
          </span>
        </div>

        {/* ── H2 HEADLINE ── */}
        <h2
          id="tech-ai-heading"
          className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          You Too Can Become a{" "}
          <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            Tech Expert with AI
          </span>
        </h2>

        {/* ── SUPPORTING PARAGRAPH ── */}
        <p className="text-center text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-14">
          Anyone can learn tech skills faster using AI. Whether you want to
          master{" "}
          <strong className="text-slate-700 font-semibold">
            web development
          </strong>
          ,{" "}
          <strong className="text-slate-700 font-semibold">
            app development
          </strong>
          ,{" "}
          <strong className="text-slate-700 font-semibold">UI/UX design</strong>
          , or{" "}
          <strong className="text-slate-700 font-semibold">
            digital marketing
          </strong>{" "}
          — AI tools give you a personal mentor, debugger, and creative partner
          available around the clock. No experience needed. Just start.
        </p>

        {/* ── PROMPT QUESTION ── */}
        <div className="text-center mb-10">
          <h3 className="inline-block text-xl md:text-2xl font-bold text-slate-800 border-b-4 border-violet-400 pb-1">
            What would you like to learn in the tech space today?
          </h3>
        </div>

        {/* ── SKILL CARDS GRID ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {skills.map((skill) => (
            <article
              key={skill.title}
              className={`group bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm transition-all duration-300 cursor-pointer ${skill.accent} hover:shadow-lg hover:-translate-y-1`}
            >
              {/* icon */}
              <div
                className={`w-13 h-13 ${skill.iconBg} rounded-xl flex items-center justify-center text-3xl mb-4 w-14 h-14`}
              >
                {skill.icon}
              </div>

              {/* badge */}
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${skill.badgeColor}`}
              >
                {skill.badge}
              </span>

              <h3 className="font-bold text-slate-900 text-base leading-snug mb-2">
                {skill.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {skill.desc}
              </p>

              <span className="inline-flex items-center gap-1 text-violet-600 text-xs font-semibold mt-4 group-hover:gap-2 transition-all">
                Explore path
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </article>
          ))}
        </div>

        {/* ── 3-STEP MINI GUIDE ── */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl px-8 py-12 mb-16">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            How It Works
          </p>
          <h3 className="text-center text-2xl md:text-3xl font-extrabold text-slate-900 mb-10">
            Your 3-Step Path to Becoming a Tech Expert
          </h3>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* connector lines (desktop only) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-violet-200 via-indigo-200 to-pink-200"
            />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* number circle */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center mb-5 z-10 ${step.color}`}
                >
                  <span
                    className="text-2xl font-extrabold"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BUTTONS ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/learnTech"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-violet-200 transition-all hover:scale-105 hover:shadow-violet-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Start Learning Now
          </Link>

          <Link
            href="/learnTech"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-violet-300 shadow-sm transition-all hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-violet-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Explore Tech Skills
          </Link>
        </div>

        {/* ── SOCIAL PROOF MICRO BAR ── */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-slate-100">
          {[
            { stat: "4 Tracks", label: "Web · App · Design · Marketing" },
            { stat: "AI-First", label: "Learn with ChatGPT, Copilot & more" },
            { stat: "Beginner Friendly", label: "No prior experience needed" },
          ].map((item) => (
            <div key={item.stat} className="text-center">
              <p className="font-extrabold text-slate-900 text-lg">
                {item.stat}
              </p>
              <p className="text-slate-400 text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
