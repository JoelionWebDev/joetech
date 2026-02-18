// app/blog/learn-tech-with-ai/page.js
// Next.js APP ROUTER version — no getServerSideProps, no "use client"
// This is a React Server Component. Date logic runs on the server on every
// request, so content rotates weekly automatically without a CMS or database.

import Link from "next/link";

// ─── WEEK HELPER ─────────────────────────────────────────────────────────────
function getWeekData() {
  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
  // Anchor to a fixed date so week index is predictable and stays small
  const REFERENCE = new Date("2024-01-01T00:00:00Z").getTime();
  const weeksSinceRef = Math.floor((Date.now() - REFERENCE) / MS_PER_WEEK);
  const weekStartMs = REFERENCE + weeksSinceRef * MS_PER_WEEK;

  const weekLabel = new Date(weekStartMs).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const weekStartISO = new Date(weekStartMs).toISOString();

  return { weeksSinceRef, weekLabel, weekStartISO };
}

// ─── CONTENT POOLS ───────────────────────────────────────────────────────────

const HERO_SUBTITLES = [
  "This week: Why AI makes web development 10× faster for complete beginners",
  "This week: The exact AI workflow professional freelancers use to earn more",
  "This week: Build your first real project in 7 days using free AI tools",
  "This week: How beginners are landing $500–$2,000 remote tech gigs with AI",
  "This week: Turn your new tech skills into passive income — the full roadmap",
  "This week: GitHub Copilot vs ChatGPT — which actually teaches you more?",
  "This week: AI-assisted UI/UX design — from idea to prototype in one afternoon",
  "This week: The fastest path from zero to freelance developer in 90 days",
];

const WEEKLY_TIPS = [
  {
    webTip:
      "Use ChatGPT to explain every line of code you copy. Type: 'Explain this line by line like I'm 12' — you'll retain 3× more than just copying.",
    appTool:
      "Expo + ChatGPT — describe your mobile screen in plain English; Copilot generates the component. Then ask ChatGPT why each prop is needed.",
    designTip:
      "Paste any website URL into ChatGPT and ask 'What UX mistakes does this have?' — you'll develop a critical design eye in days, not months.",
    marketingStrategy:
      "Use AI to write 30 social media captions in one session. Schedule them with Buffer's free plan. Consistency beats quality at the start.",
    moneyTip:
      "Offer to build a one-page website for a local business for ₦30,000–₦80,000. Use AI to finish in 3–4 hours. That's your first client testimonial.",
    aiTool: "GitHub Copilot",
    aiToolDesc:
      "Autocompletes entire functions inside VS Code. Free for students and open-source maintainers. The single biggest speed boost for new developers.",
    skillFocus: "HTML & CSS fundamentals",
    techTrend:
      "AI-assisted code generation is now standard in top companies — knowing how to prompt AI correctly is a billable skill.",
  },
  {
    webTip:
      "Build a copy of a website you love. AI can generate starter code in seconds. Learning by replication beats tutorials by a wide margin.",
    appTool:
      "Bolt.new — describe your full-stack app in one paragraph. AI scaffolds the entire project with auth, database, and UI. Deploy in minutes.",
    designTip:
      "Open Figma and ask ChatGPT for a color palette and font pairing for a fintech app. Critique it yourself. Then try a second brand. Repeat weekly.",
    marketingStrategy:
      "Write one long-form blog post with AI each week. Optimise for one keyword. After 3 months you'll have organic traffic bringing leads automatically.",
    moneyTip:
      "Content writing with AI: write SEO blog posts for small businesses at $30–$80 per post. Use Claude or ChatGPT to draft, then humanise and fact-check.",
    aiTool: "Claude by Anthropic",
    aiToolDesc:
      "Exceptional at explaining concepts, reviewing code, and generating long-form content. Particularly strong for nuanced writing and step-by-step tutorials.",
    skillFocus: "JavaScript & DOM manipulation",
    techTrend:
      "Companies are hiring 'prompt engineers' and 'AI workflow specialists' — both are learnable in 30 days with focused practice.",
  },
  {
    webTip:
      "Challenge yourself: build and deploy a live website in one day using Next.js + Vercel. AI handles the unfamiliar code. You focus on structure and logic.",
    appTool:
      "Cursor IDE — an AI-powered code editor that understands your entire codebase. Ask it to add a feature across multiple files simultaneously.",
    designTip:
      "Use Midjourney or DALL-E 3 to generate UI mockup inspiration. Screenshot 10 screens you love, then recreate one in Figma this week.",
    marketingStrategy:
      "Run a $5/day Meta ad for 5 days targeting a niche. Use AI to write 3 ad variants. Analyse which performs best — hands-on paid ads education.",
    moneyTip:
      "Build a simple SaaS tool that solves one small problem (invoice generator, link shortener). Launch free, then charge ₦1,000/month for premium features.",
    aiTool: "v0.dev by Vercel",
    aiToolDesc:
      "Describe a UI component in plain English — v0 generates production-ready React + Tailwind code instantly. Dramatically speeds up frontend development.",
    skillFocus: "React fundamentals & component thinking",
    techTrend:
      "Full-stack JavaScript (Next.js) remains the most in-demand skill for remote freelancers globally. Companies pay $30–$80/hr for solid Next.js developers.",
  },
  {
    webTip:
      "Pick one real-world CRUD project: a notes app, a to-do list with auth, or a recipe saver. Build it fully. One complete project beats twenty half-finished tutorials.",
    appTool:
      "Supabase — open-source Firebase alternative. Add auth, database, and storage to any app in under an hour. AI can write every Supabase query for you.",
    designTip:
      "Practice the 60-30-10 color rule: 60% background, 30% secondary, 10% accent. Apply it to any active project and notice the instant improvement.",
    marketingStrategy:
      "Start a 30-day LinkedIn challenge: post one practical tech tip daily using AI to help draft it. Engineers and agencies will notice within 2 weeks.",
    moneyTip:
      "Offer 'AI audits' to businesses: review their website with AI tools, write a 5-point improvement report. Charge ₦20,000–₦50,000 per audit.",
    aiTool: "Perplexity AI",
    aiToolDesc:
      "AI-powered search with real-time web access. Use it for tech research, learning new frameworks, and finding up-to-date tutorials without outdated results.",
    skillFocus: "Backend basics: APIs, Node.js & databases",
    techTrend:
      "Remote-first tech companies are growing across Africa. Nigerian developers with 1–2 years experience are landing $1,500–$3,000/month remote roles.",
  },
  {
    webTip:
      "Deploy something every week — even if it's ugly. A live URL you can share teaches you more about the real web than any local project ever will.",
    appTool:
      "LangChain + OpenAI API — add AI features to any app you build. A simple AI-powered search or chatbot makes your portfolio stand out immediately.",
    designTip:
      "Redesign a competitor's landing page for a local brand — don't show them unless it's great. This is how you build portfolio work without clients.",
    marketingStrategy:
      "Create one YouTube Short or Instagram Reel weekly sharing a tech tip. AI writes the script. Algorithms reward consistency over production quality.",
    moneyTip:
      "Become an AI tutor locally. Teach professionals how to use ChatGPT to do their jobs better. Charge ₦10,000–₦30,000 per session.",
    aiTool: "Lovable.dev",
    aiToolDesc:
      "Describe your full product idea in plain English. Lovable builds the full-stack app, deploys it, and generates a shareable URL — no code needed to start.",
    skillFocus: "Deploying to production: Vercel, Netlify & custom domains",
    techTrend:
      "AI-augmented developers are 2–3× more productive. Employers now prefer candidates who use AI tools well over those who avoid them.",
  },
  {
    webTip:
      "Learn TypeScript for 2 hours using ChatGPT as your tutor. Don't read documentation first. Ask AI questions conversationally. Then write 10 typed functions.",
    appTool:
      "React Native + Expo Go — build mobile apps with the same JavaScript/React you already know. Test on your own phone instantly during development.",
    designTip:
      "Shadow a real designer by cloning a Dribbble shot pixel-by-pixel in Figma. Use AI to explain the design decisions behind every color, spacing, and font.",
    marketingStrategy:
      "Use AI to research your niche's top 10 keywords. Create one piece of content targeting each. This 10-piece foundation can generate leads for 2+ years.",
    moneyTip:
      "Build and sell Notion templates or Figma UI kits on Gumroad. Use AI to build faster. Price at $5–$25. Passive income once listed — no client needed.",
    aiTool: "Midjourney",
    aiToolDesc:
      "Generate stunning design mockups, brand imagery, and UI inspiration from text prompts. Designers use it to prototype visual concepts in minutes.",
    skillFocus: "TypeScript basics — the language every remote job now wants",
    techTrend:
      "Design + development hybrid skills command 40% higher freelance rates. Knowing both Figma and React makes you extremely rare and highly paid.",
  },
  {
    webTip:
      "Apply for your first freelance job this week — even if you feel unready. Attach your GitHub, a deployed project, and a proposal written with AI. Rejection teaches fast.",
    appTool:
      "Prisma + PostgreSQL + AI — modern backend stack. Ask ChatGPT to generate your entire database schema from a plain-English description of your app.",
    designTip:
      "Audit your practice project: show it to ChatGPT and ask 'What would a professional UX designer criticise?' Fix the top 3 issues immediately.",
    marketingStrategy:
      "Email marketing has the highest ROI of any channel. Build a 100-person email list this month. AI writes your welcome sequence. Free Mailchimp handles 500 subscribers.",
    moneyTip:
      "Offer social media management + AI content creation bundles to small businesses for ₦50,000–₦150,000/month. AI delivers the work in 5–8 hrs per client.",
    aiTool: "Gemini Advanced by Google",
    aiToolDesc:
      "Deep integration with Google Workspace. Summarises long documents, writes code, and analyses data from Google Sheets. Great for marketing and productivity workflows.",
    skillFocus: "Portfolio building — your GitHub is your CV",
    techTrend:
      "Solopreneurs using AI are matching the output of 3–5 person teams. One skilled person with the right AI stack can run a profitable micro-agency alone.",
  },
  {
    webTip:
      "Read 5 open-source repositories on GitHub this week without running the code. Just read. Understanding real project structure is how senior developers think.",
    appTool:
      "Tabnine — AI code completion that learns your personal coding patterns. Can run locally for privacy-sensitive projects. Strong for team environments.",
    designTip:
      "Practice micro-interactions this week: hover states, loading animations, button feedback. These details separate junior from senior designers. AI generates the CSS.",
    marketingStrategy:
      "Partner with one complementary freelancer — a developer with a designer, a marketer with a writer. Referrals double your inbound leads immediately.",
    moneyTip:
      "Launch a micro-course on Selar teaching one specific skill. '30-min video: build a portfolio site with AI — ₦2,000.' Low price, high volume, passive income.",
    aiTool: "Tabnine",
    aiToolDesc:
      "AI code completion across 30+ languages and all major IDEs. Offers a fully private local mode — preferred by security-conscious development teams.",
    skillFocus: "Open-source reading and code review habits",
    techTrend:
      "African tech exports are rising: Nigerian, Ghanaian, and Kenyan developers are increasingly winning international contracts valued at $5,000–$50,000.",
  },
];

const MONETIZATION_TIPS = [
  "Post 3 'before/after' website transformations you redesigned using AI on Twitter/LinkedIn. Inbound client inquiries follow visibility — always.",
  "Productise one skill: turn it into a fixed-price package. 'Landing page in 3 days — ₦75,000.' Specific beats vague every single time.",
  "Use AI to write cold outreach emails to 20 local businesses with poor websites. Personalise each one. Even a 5% reply rate equals 1 new client.",
  "Raise your rates this week. Calculate your true hourly rate and increase it by 20%. AI-powered developers deliver more value — price accordingly.",
  "Build one thing in public. Document your process on Twitter or LinkedIn: 'Building X with AI — Day 1.' Audiences attract clients faster than portfolios.",
  "Partner with a marketing agency: offer white-label web development. They bring clients, you build, you split 30–40%. Reliable pipeline without cold pitching.",
  "Offer a free 15-min 'tech audit' call. Show one quick win using AI tools. Convert to a paid project 30–50% of the time with a clear next step.",
  "Launch a micro-course on Selar teaching one specific skill. '30-min video: build a portfolio site with AI — ₦2,000.' Low price, high volume, passive income.",
];

const TECH_SECTIONS = [
  {
    id: "web-development",
    icon: "💻",
    title: "Web Development with AI",
    intro:
      "Web development is the foundation of every digital business. HTML gives structure, CSS adds visual design, JavaScript brings interactivity, and frameworks like React and Next.js power modern applications. In the past, mastering this stack took 12–18 months. Today, with AI as your daily partner, motivated beginners are building and deploying real projects within 4–8 weeks.",
    steps: [
      "Start with HTML & CSS — understand structure before style. Spend one focused week on each.",
      "Learn JavaScript fundamentals: variables, functions, arrays, and DOM manipulation.",
      "Move to React: build 3 small components before starting any full project.",
      "Learn Next.js: routing, server-side rendering, and API routes in one framework.",
      "Deploy your first project to Vercel. A live URL beats 100 local projects.",
    ],
    tipLabel: "AI Tip of the Week",
    tipKey: "webTip",
    accentColor: "blue",
    cta: { text: "Start the Web Dev Path", href: "/learnTech#web-dev" },
  },
  {
    id: "app-development",
    icon: "📱",
    title: "App Development with AI",
    intro:
      "Mobile apps are how billions of people interact with technology daily. React Native lets you build iOS and Android apps using the same JavaScript skills you already know. AI dramatically reduces the boilerplate, letting you focus on features and user experience instead of repetitive setup code.",
    steps: [
      "Learn React first — React Native is built on the same mental model.",
      "Set up Expo: the fastest way to test mobile apps on your real phone during development.",
      "Build a simple CRUD app: notes, tasks, or a contact list with local storage.",
      "Add authentication using Supabase or Firebase — AI can generate every query.",
      "Submit to the Google Play Store. It costs $25 once and opens a global market.",
    ],
    tipLabel: "AI Tool of the Week",
    tipKey: "appTool",
    accentColor: "violet",
    cta: { text: "Explore the App Dev Path", href: "/learnTech#app-dev" },
  },
  {
    id: "uiux-design",
    icon: "🎨",
    title: "UI/UX Design with AI",
    intro:
      "Great design is not about making things look pretty — it is about making them work intuitively. UI (User Interface) is what the eye sees; UX (User Experience) is what the person feels. AI tools have democratised design, making professional-grade results achievable without years of formal training.",
    steps: [
      "Learn Figma — it is free, industry-standard, and beginner-friendly.",
      "Study the 8 design principles: contrast, alignment, repetition, proximity, hierarchy, balance, color, typography.",
      "Practice by cloning real apps: reproduce 3 screens from an app you use daily.",
      "Build a 3-screen prototype and get feedback from 5 people outside the tech world.",
      "Add 2 design case studies to your portfolio — problem, solution, measurable result.",
    ],
    tipLabel: "Design Tip of the Week",
    tipKey: "designTip",
    accentColor: "amber",
    cta: { text: "Start Designing with AI", href: "/learnTech#uiux" },
  },
  {
    id: "digital-marketing",
    icon: "📣",
    title: "Digital Marketing with AI",
    intro:
      "Digital marketing connects great products to the people who need them. SEO brings organic Google traffic; content marketing builds authority; paid ads scale rapidly; email marketing converts consistently. AI has collapsed the learning curve — one person with good AI tools can now execute strategies that once required entire agencies.",
    steps: [
      "Understand SEO basics: keywords, search intent, on-page optimisation, and backlinks.",
      "Set up Google Analytics and Google Search Console on a site — your own or a practice one.",
      "Create a content calendar: 4 blog posts per month, each targeting a specific keyword.",
      "Run one small paid ad campaign on Meta or Google — $20 will teach you more than 10 courses.",
      "Build and grow one email list using a free lead magnet. Mailchimp's free tier handles 500 subscribers.",
    ],
    tipLabel: "Growth Strategy of the Week",
    tipKey: "marketingStrategy",
    accentColor: "emerald",
    cta: { text: "Learn Digital Marketing", href: "/learnTech#marketing" },
  },
];

const MONETIZATION_PATHS = [
  {
    icon: "💼",
    title: "Freelancing",
    desc: "Offer one specific skill to one specific client type. 'I build landing pages for Nigerian restaurants using Next.js — 5 days, fixed price.' Specificity wins clients.",
    platforms: ["Upwork", "Fiverr", "Toptal", "Direct outreach"],
    income: "₦50,000 – ₦500,000+/month",
  },
  {
    icon: "🌍",
    title: "Remote Employment",
    desc: "Full-time or contract roles with international companies. A solid portfolio, 6 months of real projects, and strong communication skills are the key entry requirements.",
    platforms: ["LinkedIn", "Remote.co", "We Work Remotely", "AngelList"],
    income: "$800 – $5,000+/month",
  },
  {
    icon: "🚀",
    title: "SaaS & Products",
    desc: "Build a software tool that solves one real pain point. Charge a monthly subscription. AI dramatically reduces the time to build your first version (MVP).",
    platforms: ["Product Hunt", "Gumroad", "Stripe", "Lemon Squeezy"],
    income: "Scalable — from $0 to unlimited",
  },
  {
    icon: "✍️",
    title: "Content & Blogging",
    desc: "Teach what you learn. A blog, newsletter, or YouTube channel about your tech journey attracts sponsors, affiliate income, and inbound clients as your audience grows.",
    platforms: ["Substack", "Hashnode", "Dev.to", "YouTube"],
    income: "₦30,000 – ₦300,000/month at scale",
  },
];

// ─── SEO METADATA (App Router way) ───────────────────────────────────────────
export function generateMetadata() {
  const { weekStartISO } = getWeekData();
  return {
    title:
      "How to Learn Tech Skills with AI and Make Money Online | AITechPath",
    description:
      "A weekly-updated guide to mastering web development, app development, UI/UX design, and digital marketing using AI tools — and turning those skills into real, sustainable income.",
    keywords: [
      "learn tech with AI",
      "web development Nigeria",
      "make money from tech",
      "AI tools for developers",
      "freelancing online",
      "digital skills",
      "ChatGPT for developers",
      "GitHub Copilot",
      "remote jobs Nigeria",
    ],
    alternates: { canonical: "https://aitechpath.com/blog/learn-tech-with-ai" },
    openGraph: {
      type: "article",
      title: "How to Learn Tech Skills with AI and Make Money Online",
      description:
        "Weekly-updated guide covering web dev, app dev, UI/UX, and digital marketing with AI — and how to monetise every skill.",
      url: "https://aitechpath.com/blog/learn-tech-with-ai",
      modifiedTime: weekStartISO,
      publishedTime: "2024-01-01T00:00:00Z",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "How to Learn Tech Skills with AI and Make Money Online | AITechPath",
      description:
        "Weekly-updated AI tech education guide. New tips every Monday.",
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  };
}

// ─── TINY UTILITY COMPONENTS (server-renderable, no hooks) ───────────────────

function DynamicBadge({ children, color = "blue" }) {
  const map = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${map[color]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}

function TipCard({ label, tip, color = "blue" }) {
  const borders = {
    blue: "border-l-blue-500 bg-blue-50/60",
    amber: "border-l-amber-500 bg-amber-50/60",
    violet: "border-l-violet-500 bg-violet-50/60",
    emerald: "border-l-emerald-500 bg-emerald-50/60",
  };
  const textColors = {
    blue: "text-blue-700",
    amber: "text-amber-700",
    violet: "text-violet-700",
    emerald: "text-emerald-700",
  };
  return (
    <div className={`border-l-4 rounded-r-xl p-5 ${borders[color]}`}>
      <p
        className={`text-xs font-bold uppercase tracking-widest mb-2 ${textColors[color]}`}
      >
        ✦ {label}
      </p>
      <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
    </div>
  );
}

function StepList({ steps }) {
  return (
    <ol className="space-y-3 mt-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  );
}

// ─── JSON-LD SCHEMA ──────────────────────────────────────────────────────────
function BlogSchema({ weekStartISO }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Learn Tech Skills with AI and Make Money Online",
    description:
      "A comprehensive guide to learning web development, app development, UI/UX design, and digital marketing using AI tools — and turning those skills into real income.",
    author: {
      "@type": "Organization",
      name: "AITechPath",
      url: "https://aitechpath.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AITechPath",
      url: "https://aitechpath.com",
    },
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: weekStartISO,
    keywords:
      "learn tech with AI, web development Nigeria, make money from tech, AI tools",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aitechpath.com/blog/learn-tech-with-ai",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── PAGE (SERVER COMPONENT — runs on server, no "use client" needed) ────────
export default function LearnTechWithAIPage() {
  // All date logic runs on the server at request time
  const { weeksSinceRef, weekLabel, weekStartISO } = getWeekData();

  // Pick content for this week using safe modulo
  const weeklyTip = WEEKLY_TIPS[weeksSinceRef % WEEKLY_TIPS.length];
  const heroSubtitle = HERO_SUBTITLES[weeksSinceRef % HERO_SUBTITLES.length];
  const moneyTip = MONETIZATION_TIPS[weeksSinceRef % MONETIZATION_TIPS.length];
  const weekNumber = weeksSinceRef;

  return (
    <>
      {/* Inject Google Fonts + global styles via <head> tag in RSC */}
      <BlogSchema weekStartISO={weekStartISO} />

      <div
        className="min-h-screen bg-stone-50 text-slate-900"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── INLINE FONT IMPORT (works in App Router without _document) ── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
          .serif { font-family: 'Lora', Georgia, serif; }
          .section-rule { background: linear-gradient(90deg,transparent,#e2e8f0,transparent); height:1px; }
          :focus-visible { outline: 3px solid #3b82f6; outline-offset: 3px; border-radius: 4px; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
          .fade-up { animation: fadeUp 0.55s ease both; }
          .du-1{animation-delay:.08s} .du-2{animation-delay:.18s} .du-3{animation-delay:.28s}
        `}</style>

        {/* ── NAV ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <nav
            className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
            aria-label="Main navigation"
          >
            <Link href="/" className="serif font-bold text-lg text-slate-900">
              AI<span className="text-blue-600">Tech</span>Path
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-500 font-medium">
              <Link
                href="/learnTech"
                className="hover:text-slate-900 transition-colors"
              >
                Learn
              </Link>
              <Link href="/blog" className="text-blue-600 font-semibold">
                Blog
              </Link>

              <Link
                href="/contact"
                className="hover:text-slate-900 transition-colors"
              >
                Contact
              </Link>
            </div>
            <Link
              href="/learnTech"
              className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Start Free →
            </Link>
          </nav>
        </header>

        {/* ── BREADCRUMB ─────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-2"
        >
          <ol
            className="flex items-center gap-2 text-xs text-slate-400"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {[
              { name: "Home", href: "/", pos: 1 },
              { name: "Blog", href: "/blog", pos: 2 },
            ].map(({ name, href, pos }) => (
              <li
                key={href}
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
                className="flex items-center gap-2"
              >
                <Link
                  href={href}
                  itemProp="item"
                  className="hover:text-blue-600 transition-colors"
                >
                  <span itemProp="name">{name}</span>
                </Link>
                <meta itemProp="position" content={String(pos)} />
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li className="text-slate-600 font-medium truncate max-w-[200px]">
              Learn Tech with AI
            </li>
          </ol>
        </nav>

        <main
          id="main-content"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          {/* ── HERO ───────────────────────────────────────────── */}
          <section
            aria-labelledby="blog-hero-heading"
            className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-12 sm:pb-16"
          >
            <div className="fade-up">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <DynamicBadge color="blue">Updated Weekly</DynamicBadge>
                <span className="text-xs text-slate-400 font-medium">
                  Week of {weekLabel}
                </span>
                <span className="text-slate-200 select-none">·</span>
                <span className="text-xs text-slate-400">12 min read</span>
                <span className="text-slate-200 select-none">·</span>
                <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full">
                  Tech Education
                </span>
              </div>

              <h1
                id="blog-hero-heading"
                className="serif font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight tracking-tight mb-5"
                itemProp="headline"
              >
                How to Learn Tech Skills with AI and Make Money Online
              </h1>

              <p
                className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6 fade-up du-1"
                itemProp="description"
              >
                {heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-slate-200 fade-up du-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                    AT
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      AITechPath Editorial
                    </p>
                    <p className="text-xs text-slate-400">
                      Updated every Monday
                    </p>
                  </div>
                </div>
                <a
                  href="#weekly-insights"
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold border border-blue-200 rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors"
                >
                  ↓ Jump to this week&apos;s insights
                </a>
              </div>
            </div>
          </section>

          {/* ── TABLE OF CONTENTS ──────────────────────────────── */}
          <aside
            className="max-w-4xl mx-auto px-4 sm:px-6 mb-12"
            aria-label="Table of contents"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                In this guide
              </p>
              <nav>
                <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
                  {[
                    ["Introduction", "#introduction"],
                    ["Web Development with AI", "#web-development"],
                    ["App Development with AI", "#app-development"],
                    ["UI/UX Design with AI", "#uiux-design"],
                    ["Digital Marketing with AI", "#digital-marketing"],
                    ["Make Money from Tech", "#monetization"],
                    ["Weekly Tech Insights", "#weekly-insights"],
                    ["Get Started", "#cta"],
                  ].map(([label, href], i) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors py-0.5"
                      >
                        <span className="text-xs text-slate-300 font-mono w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* ── INTRODUCTION ───────────────────────────────────── */}
          <section
            id="introduction"
            aria-labelledby="intro-heading"
            className="max-w-4xl mx-auto px-4 sm:px-6 mb-14"
          >
            <div className="max-w-[68ch]">
              <h2
                id="intro-heading"
                className="serif font-bold text-2xl sm:text-3xl text-slate-900 mb-5"
              >
                Why AI Has Changed Everything for Tech Beginners
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Three years ago, learning to code meant months of reading
                  documentation, watching outdated tutorials, and struggling
                  alone with bugs at 2am. The barrier to entering tech was high,
                  and many beginners quit before they ever built anything real.
                </p>
                <p>
                  AI has dismantled that barrier. Tools like{" "}
                  <strong className="text-slate-900">
                    ChatGPT, GitHub Copilot, Claude, and Cursor
                  </strong>{" "}
                  give every beginner a patient, expert tutor available 24 hours
                  a day. You can ask questions in plain English, get code
                  explained line by line, and debug errors in seconds instead of
                  hours.
                </p>
                <p>
                  This guide covers four high-demand skill areas —{" "}
                  <strong className="text-slate-900">
                    web development, app development, UI/UX design, and digital
                    marketing
                  </strong>{" "}
                  — and shows you exactly how to monetise each one. The content
                  in this page updates automatically every week so you always
                  have a fresh, relevant AI tip to apply.
                </p>
              </div>

              {/* Featured-snippet-optimised summary box */}
              <div className="mt-6 bg-slate-900 rounded-2xl p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Quick Summary
                </p>
                <ul className="space-y-2 text-sm text-slate-200">
                  {[
                    "Pick one tech skill and commit to it for 90 days",
                    "Use AI tools daily — as tutor, debugger, and creative partner",
                    "Build one real project every 2–3 weeks and make it publicly accessible",
                    "Start monetising from month 2 — don't wait until you feel 'ready'",
                    "Check this page's weekly section every Monday for your fresh AI tip",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">
                        ✦
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="section-rule max-w-4xl mx-auto mb-14 mx-4 sm:mx-6" />

          {/* ── TECH SKILL SECTIONS ─────────────────────────────── */}
          {TECH_SECTIONS.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="max-w-4xl mx-auto px-4 sm:px-6 mb-16"
              itemProp="articleSection"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl" aria-hidden="true">
                  {section.icon}
                </span>
                <h2
                  id={`${section.id}-heading`}
                  className="serif font-bold text-2xl sm:text-3xl text-slate-900"
                >
                  {section.title}
                </h2>
              </div>

              <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
                <div>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    {section.intro}
                  </p>
                  <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-3">
                    Step-by-Step Learning Path
                  </h3>
                  <StepList steps={section.steps} />
                  <div className="mt-6">
                    <Link
                      href={section.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 border-b border-blue-200 pb-0.5 transition-colors"
                    >
                      {section.cta.text} →
                    </Link>
                  </div>
                </div>

                {/* Weekly dynamic tip — changes every Monday */}
                <div className="lg:sticky lg:top-20 space-y-2">
                  <TipCard
                    label={section.tipLabel}
                    tip={weeklyTip[section.tipKey]}
                    color={section.accentColor}
                  />
                  <p className="text-xs text-slate-400 pl-1">
                    Auto-updates weekly · Week #{weekNumber}
                  </p>
                </div>
              </div>

              {idx < TECH_SECTIONS.length - 1 && (
                <div className="section-rule mt-14" />
              )}
            </section>
          ))}

          {/* ── MONETIZATION ────────────────────────────────────── */}
          <section
            id="monetization"
            aria-labelledby="money-heading"
            className="bg-white border-y border-slate-100 py-16 sm:py-20 mt-6"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="mb-10">
                <DynamicBadge color="emerald">Income Paths</DynamicBadge>
                <h2
                  id="money-heading"
                  className="serif font-bold text-2xl sm:text-3xl text-slate-900 mt-3 mb-3"
                >
                  How to Make Real Money from Tech Skills
                </h2>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  Tech skills without a monetisation strategy are just a hobby.
                  Here are the four most reliable income paths for tech
                  professionals — and how to start each one faster using AI.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {MONETIZATION_PATHS.map((path) => (
                  <article
                    key={path.title}
                    className="border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all bg-white"
                  >
                    <span className="text-3xl mb-3 block" aria-hidden="true">
                      {path.icon}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {path.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {path.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {path.platforms.map((p) => (
                        <span
                          key={p}
                          className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                      💰 Potential: {path.income}
                    </p>
                  </article>
                ))}
              </div>

              {/* Weekly money tip */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <DynamicBadge color="emerald">
                    Money Tip of the Week
                  </DynamicBadge>
                  <span className="text-emerald-400 text-xs">
                    · Week of {weekLabel}
                  </span>
                </div>
                <p className="text-emerald-50 text-base sm:text-lg leading-relaxed">
                  {moneyTip}
                </p>
              </div>
            </div>
          </section>

          {/* ── WEEKLY TECH INSIGHTS ─────────────────────────────── */}
          <section
            id="weekly-insights"
            aria-labelledby="insights-heading"
            className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
          >
            <div className="text-center mb-10">
              <DynamicBadge color="violet">
                Auto-Updated Every Monday
              </DynamicBadge>
              <h2
                id="insights-heading"
                className="serif font-bold text-2xl sm:text-3xl text-slate-900 mt-3 mb-2"
              >
                Weekly Tech Insights
              </h2>
              <p className="text-slate-500 text-sm">
                Week of {weekLabel} · Refreshes every 7 days automatically
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {/* Tech tip card */}
              <article className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg mb-4"
                  aria-hidden="true"
                >
                  💡
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                  Tech Tip of the Week
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {weeklyTip.webTip}
                </p>
                <p className="text-xs text-slate-300 mt-4 font-mono">
                  WEEK #{weekNumber}
                </p>
              </article>

              {/* AI tool card */}
              <article className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-lg mb-4"
                  aria-hidden="true"
                >
                  🤖
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider">
                  AI Tool of the Week
                </h3>
                <p className="text-violet-700 font-bold text-base mb-2">
                  {weeklyTip.aiTool}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {weeklyTip.aiToolDesc}
                </p>
                <p className="text-xs text-slate-300 mt-4 font-mono">
                  WEEK #{weekNumber}
                </p>
              </article>

              {/* Skill focus card */}
              <article className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg mb-4"
                  aria-hidden="true"
                >
                  🎯
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider">
                  Skill to Focus On
                </h3>
                <p className="text-amber-700 font-bold text-base mb-2">
                  {weeklyTip.skillFocus}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {weeklyTip.techTrend}
                </p>
                <p className="text-xs text-slate-300 mt-4 font-mono">
                  WEEK #{weekNumber}
                </p>
              </article>
            </div>

            <p className="text-center text-xs text-slate-400 mt-6">
              Content rotates every Monday using date-based logic. No CMS or
              database required.{" "}
              <Link href="/blog" className="text-blue-500 hover:underline">
                Browse all articles →
              </Link>
            </p>
          </section>

          {/* ── RELATED POSTS ─────────────────────────────────────── */}
          <section
            aria-labelledby="related-heading"
            className="bg-slate-100/60 border-t border-slate-200 py-14 sm:py-16"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2
                id="related-heading"
                className="serif font-bold text-xl sm:text-2xl text-slate-900 mb-7"
              >
                Continue Learning
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Top 10 Free AI Tools Every Developer Should Use",
                    href: "/tenAiTools",
                    tag: "Tools",
                    time: "6 min",
                  },
                  {
                    title:
                      "How to Land Your First Tech Freelance Client Using AI",
                    href: "/Freelance",
                    tag: "Freelancing",
                    time: "8 min",
                  },
                  {
                    title: "Build a Full-Stack App in a Weekend with AI",
                    href: "https://youtu.be/JiwTGGGIhDs?si=JhZKfk9vKOCELQ4b",
                    tag: "Projects",
                    time: "10 min",
                  },
                ].map((post) => (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                      {post.tag}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug mt-3 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400">{post.time} read</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer
          className="bg-white border-t border-slate-200"
          role="contentinfo"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid sm:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="serif font-bold text-xl text-slate-900 mb-2">
                  AI<span className="text-blue-600">Tech</span>Path
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Helping beginners become tech experts faster using AI. Content
                  updated weekly.
                </p>
              </div>
              <nav aria-label="Learn links">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Learn
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Web Development", "/learnTech#web-dev"],
                    ["App Development", "/learnTech#app-dev"],
                    ["UI/UX Design", "/learnTech#uiux"],
                    ["Digital Marketing", "/learnTech#marketing"],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Resources links">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Resources
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Blog", "/blog"],
                    ["AI Tools Guide", "/tools"],
                    ["Freelancing Guide", "/freelance"],
                    ["Contact", "/contact"],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <p>
                © {new Date().getFullYear()} AITechPath. All rights reserved.
              </p>
              <p>
                Content rotates weekly · No CMS required · Date-based JS logic
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
