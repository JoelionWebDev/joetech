// app/blog/first-freelance-client/page.js
// Next.js App Router — Pure React Server Component
// ZERO external or internal anchor tags — as required

export const metadata = {
  title: "How to Land Your First Tech Freelance Client Using AI | AITechPath",
  description:
    "Complete step-by-step guide for tech beginners: use AI tools to choose a skill, build a portfolio, write winning proposals, price your work, and land your first paying freelance client.",
  keywords: [
    "how to get first freelance tech client",
    "tech freelancing for beginners 2025",
    "AI tools for freelancers",
    "freelance web developer beginner guide",
    "how to use AI to freelance",
    "first freelance client tips",
    "beginner freelancer Nigeria",
  ],
  alternates: {
    canonical: "https://aitechpath.com/blog/first-freelance-client",
  },
  openGraph: {
    type: "article",
    title: "How to Land Your First Tech Freelance Client Using AI",
    description:
      "8-step beginner guide: use AI to learn tech faster, build a portfolio, write proposals, and land your first paying freelance client.",
    url: "https://aitechpath.com/blog/first-freelance-client",
    publishedTime: "2025-01-01T00:00:00Z",
    modifiedTime: new Date().toISOString(),
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Land Your First Tech Freelance Client Using AI (2025)",
    description:
      "8-step beginner guide — use AI to go from zero to your first paying tech freelance client.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Choose a Profitable Tech Skill",
    color: "blue",
    icon: "🎯",
  },
  {
    n: "02",
    title: "Use AI to Learn and Practice Every Day",
    color: "indigo",
    icon: "🤖",
  },
  {
    n: "03",
    title: "Build Sample Projects Using AI",
    color: "violet",
    icon: "🛠️",
  },
  {
    n: "04",
    title: "Create a Simple Freelance Portfolio",
    color: "teal",
    icon: "💼",
  },
  {
    n: "05",
    title: "Find and Approach Your First Client",
    color: "emerald",
    icon: "🔍",
  },
  {
    n: "06",
    title: "Write Winning Proposals With AI",
    color: "amber",
    icon: "✍️",
  },
  {
    n: "07",
    title: "Price Your First Job Correctly",
    color: "orange",
    icon: "💰",
  },
  {
    n: "08",
    title: "Deliver Excellent Work Using AI",
    color: "rose",
    icon: "🏆",
  },
];

const SKILLS = [
  {
    name: "Web Development",
    why: "Every business needs a website. A clean, fast site built with React or Next.js is in constant demand.",
  },
  {
    name: "App Development",
    why: "Mobile-first businesses need apps. React Native lets you build iOS and Android with one codebase.",
  },
  {
    name: "UI/UX Design",
    why: "Poor design costs companies customers. A Figma-trained designer who understands users is invaluable.",
  },
  {
    name: "Digital Marketing",
    why: "Businesses that cannot be found online lose revenue daily. SEO and paid ads expertise solves this.",
  },
  {
    name: "Content Writing",
    why: "Every brand needs words — blog posts, product descriptions, email sequences, social captions.",
  },
  {
    name: "No-Code Development",
    why: "Webflow and Bubble let you build professional products fast. Clients love the speed and low cost.",
  },
];

const PROJECTS = [
  "A portfolio website for yourself — this is also your first live proof of skill.",
  "A landing page for a fictional or real local business (restaurant, salon, gym).",
  "A three-screen Figma prototype for a mobile app with a clear user flow.",
  "A simple task manager or notes app built with React and local storage.",
  "A 30-day social media content calendar for a product brand of your choice.",
  "A blog with a working content management system using Next.js and a headless CMS.",
  "An email newsletter template designed and coded in clean HTML.",
  "A one-page redesign of an existing website that has obvious usability problems.",
];

const PORTFOLIO_ITEMS = [
  {
    label: "Clear positioning statement",
    detail:
      "One sentence. What you do, who you do it for, and what outcome you produce. Nothing vague.",
  },
  {
    label: "Two to three project samples",
    detail:
      "Screenshots, descriptions, the problem solved, tools used. Deployed live wherever possible.",
  },
  {
    label: "A short honest bio",
    detail:
      "Explain your journey without exaggerating. Clients respect honesty far more than false credentials.",
  },
  {
    label: "Contact details",
    detail:
      "An email address at minimum. Make it trivially easy for an interested client to reach you.",
  },
  {
    label: "Tools and skills list",
    detail:
      "A brief, accurate list of technologies and methods you genuinely know how to use.",
  },
];

const CLIENT_SOURCES = [
  {
    where: "Your personal network",
    how: "Tell 10 people what you now do. At least one knows a business owner who needs you.",
  },
  {
    where: "Local businesses without sites",
    how: "Search your area. Look for restaurants, clinics, salons with no web presence or terrible ones.",
  },
  {
    where: "Facebook and WhatsApp groups",
    how: "Business owner groups post requests regularly. Join, contribute value, then offer your service.",
  },
  {
    where: "LinkedIn content",
    how: "Post what you are learning and building. First clients often come from silent followers.",
  },
  {
    where: "Direct cold outreach",
    how: "Find a business with an obvious problem. Send a personalised, helpful message. No hard sell.",
  },
  {
    where: "Referrals from free work",
    how: "One pro-bono project for a charity or community org gives you a testimonial and a network.",
  },
];

const MISTAKES = [
  {
    bad: "Trying to master every skill before starting",
    fix: "Pick one skill. Use AI to fill knowledge gaps as real problems arise.",
  },
  {
    bad: "Waiting until you feel 'ready'",
    fix: "Readiness follows action — not the other way around. Apply this week.",
  },
  {
    bad: "Pricing so low it signals poor quality",
    fix: "Charge a modest but reasonable rate. Extremely low prices raise suspicion.",
  },
  {
    bad: "Sending identical generic proposals to every client",
    fix: "Personalise every message. AI makes this fast — use it.",
  },
  {
    bad: "Never following up after a proposal",
    fix: "One polite follow-up 3–4 days later can double your response rate.",
  },
  {
    bad: "Overpromising timelines to seem impressive",
    fix: "Use AI to scope accurately. Under-promise and consistently over-deliver.",
  },
  {
    bad: "Starting work without a written scope or deposit",
    fix: "Even a simple email confirmation protects you. Get 30–50% upfront.",
  },
  {
    bad: "Going silent during a project",
    fix: "Update clients proactively. Silence destroys trust faster than mistakes do.",
  },
];

const PRICING = [
  {
    tier: "Entry Level",
    naira: "₦30k – ₦80k",
    usd: "$20–$55",
    scope: "Single-page sites, basic landing pages, social media starter setup",
  },
  {
    tier: "Project Rate",
    naira: "₦80k – ₦250k",
    usd: "$55–$170",
    scope:
      "Multi-page websites, small apps, brand identity, marketing campaigns",
  },
  {
    tier: "Monthly Retainer",
    naira: "₦50k+/mo",
    usd: "$35+/mo",
    scope: "Ongoing maintenance, monthly content creation, social management",
  },
];

// ─── SCHEMA ───────────────────────────────────────────────────────────────────

const PAGE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Land Your First Tech Freelance Client Using AI",
  description:
    "An 8-step guide for beginners on getting their first tech freelance client using AI tools.",
  totalTime: "PT90D",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
  })),
});

// ─── TINY DESIGN TOKENS ───────────────────────────────────────────────────────

const C = {
  blue: {
    pill: "bg-blue-100 text-blue-800 border-blue-200",
    num: "bg-blue-600",
    bar: "border-l-blue-500",
    dot: "bg-blue-500",
  },
  indigo: {
    pill: "bg-indigo-100 text-indigo-800 border-indigo-200",
    num: "bg-indigo-600",
    bar: "border-l-indigo-500",
    dot: "bg-indigo-500",
  },
  violet: {
    pill: "bg-violet-100 text-violet-800 border-violet-200",
    num: "bg-violet-600",
    bar: "border-l-violet-500",
    dot: "bg-violet-500",
  },
  teal: {
    pill: "bg-teal-100 text-teal-800 border-teal-200",
    num: "bg-teal-600",
    bar: "border-l-teal-500",
    dot: "bg-teal-500",
  },
  emerald: {
    pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
    num: "bg-emerald-600",
    bar: "border-l-emerald-500",
    dot: "bg-emerald-500",
  },
  amber: {
    pill: "bg-amber-100 text-amber-800 border-amber-200",
    num: "bg-amber-500",
    bar: "border-l-amber-500",
    dot: "bg-amber-500",
  },
  orange: {
    pill: "bg-orange-100 text-orange-800 border-orange-200",
    num: "bg-orange-500",
    bar: "border-l-orange-500",
    dot: "bg-orange-500",
  },
  rose: {
    pill: "bg-rose-100 text-rose-800 border-rose-200",
    num: "bg-rose-600",
    bar: "border-l-rose-500",
    dot: "bg-rose-500",
  },
};

// ─── SMALL SERVER COMPONENTS ──────────────────────────────────────────────────

function StepHeader({ step }) {
  const c = C[step.color];
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className={`w-10 h-10 rounded-xl ${c.num} text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm`}
      >
        {step.n}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${c.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        Step {step.n}
      </span>
    </div>
  );
}

function SectionH2({ children, id }) {
  return (
    <h2
      id={id}
      className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4"
    >
      {children}
    </h2>
  );
}

function SectionH3({ children }) {
  return (
    <h3 className="font-display text-lg sm:text-xl font-semibold text-stone-800 leading-snug mb-3 mt-8">
      {children}
    </h3>
  );
}

function BodyText({ children }) {
  return (
    <p className="text-stone-600 text-base sm:text-lg leading-[1.8] mb-5">
      {children}
    </p>
  );
}

function Insight({ icon, heading, body, color = "blue" }) {
  const c = C[color];
  return (
    <div
      className={`border-l-4 ${c.bar} bg-white rounded-r-2xl p-5 shadow-sm my-6`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="font-bold text-stone-900 text-sm mb-1">{heading}</p>
          <p className="text-stone-500 text-sm leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}

function BulletPoint({ children }) {
  return (
    <li className="flex items-start gap-3 text-stone-600 text-base leading-relaxed">
      <span
        className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

function NumberPoint({ n, children }) {
  return (
    <li className="flex items-start gap-3 text-stone-600 text-base leading-relaxed">
      <span className="mt-0.5 w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

function Wrapper({ children, id, className = "" }) {
  return (
    <section
      id={id}
      className={`max-w-2xl mx-auto px-4 sm:px-6 py-14 ${className}`}
      itemProp="articleSection"
    >
      {children}
    </section>
  );
}

function HR() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6" aria-hidden="true">
      <div
        className="h-px"
        style={{
          background: "linear-gradient(90deg,transparent,#d6d3d1,transparent)",
        }}
      />
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FirstFreelanceClientPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: PAGE_SCHEMA }}
      />

      <div className="min-h-screen bg-[#faf8f4] text-stone-900">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500&display=swap');
          .font-display { font-family: 'Playfair Display', Georgia, serif; }
          body, p, li, span, div { font-family: 'Source Serif 4', Georgia, serif; }
          @keyframes rise { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
          .rise { animation: rise 0.7s cubic-bezier(.22,.68,0,1.2) both; }
          .r1{animation-delay:.06s} .r2{animation-delay:.14s} .r3{animation-delay:.23s} .r4{animation-delay:.33s}
          :focus-visible { outline: 2px solid #3b82f6; outline-offset: 3px; border-radius: 4px; }
        `}</style>

        {/* ── BREADCRUMB ─────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-2xl mx-auto px-4 sm:px-6 pt-6"
        >
          <ol
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {[
              ["Home", 1],
              ["Blog", 2],
              ["First Freelance Client", 3],
            ].map(([label, pos], i) => (
              <li
                key={label}
                className="flex items-center gap-2"
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {i > 0 && <span aria-hidden>/</span>}
                <span
                  className={pos === 3 ? "text-stone-600 font-medium" : ""}
                  itemProp="name"
                >
                  {label}
                </span>
                <meta itemProp="position" content={String(pos)} />
              </li>
            ))}
          </ol>
        </nav>

        <main id="main-content" itemScope itemType="https://schema.org/Article">
          {/* ──────────────────────────────────────────────────── */}
          {/* HERO                                                 */}
          {/* ──────────────────────────────────────────────────── */}
          <header className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-14">
            {/* Eyebrow tags */}
            <div className="flex flex-wrap items-center gap-2 mb-7 rise">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Beginner Guide
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-400 font-medium">
                15 min read
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-400">
                8 steps · All skill levels
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-[3.5rem] text-stone-900 leading-[1.08] tracking-tight mb-6 rise r1"
              itemProp="headline"
            >
              How to Land Your First Tech Freelance Client Using AI
            </h1>

            {/* Intro paragraphs */}
            <div className="rise r2">
              <p
                className="text-stone-600 text-lg sm:text-xl leading-[1.75] mb-4"
                itemProp="description"
              >
                Freelancing in tech is one of the most rewarding paths you can
                take. You choose your clients, set your own hours, and get paid
                directly for skills you can learn from scratch. And for the
                first time in history, AI tools have made this path genuinely
                accessible to complete beginners — no degree, no years of unpaid
                internship, no expensive bootcamp required.
              </p>
              <p className="text-stone-500 text-base sm:text-lg leading-[1.8]">
                This guide walks you through every step in plain, practical
                language. By the end, you will have a clear action plan to find,
                approach, and win your first paying client — with AI helping you
                at every stage.
              </p>
            </div>

            {/* Author row */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-stone-200 rise r3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                AT
              </div>
              <div>
                <p className="font-semibold text-stone-900 text-sm">
                  AITechPath Editorial
                </p>
                <p className="text-stone-400 text-xs">
                  2025 · Reviewed by working freelancers
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-xs text-stone-400 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-full">
                  Updated 2025
                </span>
              </div>
            </div>
          </header>

          {/* ── TABLE OF CONTENTS ─────────────────────────────── */}
          <aside
            className="max-w-2xl mx-auto px-4 sm:px-6 mb-12"
            aria-label="Table of contents"
          >
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <p className="font-display font-semibold text-stone-900 text-sm mb-5 uppercase tracking-widest">
                What You Will Learn
              </p>
              <ol className="grid sm:grid-cols-2 gap-2.5">
                {[
                  "Why AI is a game changer for freelancers",
                  ...STEPS.map((s) => s.title),
                  "Common mistakes to avoid",
                  "Final motivation & your next steps",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    <span className="text-stone-300 font-mono text-xs w-5 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* WHY AI IS A GAME CHANGER                            */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="why-ai">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-violet-100 text-violet-800 border border-violet-200 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              The AI Advantage
            </span>
            <SectionH2 id="why-ai-h">
              Why AI Is a Game Changer for Tech Freelancers
            </SectionH2>
            <BodyText>
              Breaking into tech freelancing used to require years of formal
              study, expensive tools, and an established reputation before
              anyone would pay you. Most talented people gave up before they
              ever earned their first naira. AI has reversed that dynamic
              entirely.
            </BodyText>
            <BodyText>
              Tools like ChatGPT, Claude, GitHub Copilot, and Cursor now act as
              a round-the-clock tutor, editor, debugger, and writing coach — all
              free or nearly free. Here is what that means for you in practice:
            </BodyText>

            <div className="grid sm:grid-cols-2 gap-4 my-7">
              {[
                {
                  icon: "🚀",
                  h: "Learn faster",
                  b: "Ask AI to explain any concept in plain language. No staring at confusing documentation for hours on end.",
                },
                {
                  icon: "💻",
                  h: "Write better code",
                  b: "AI autocompletes functions, suggests fixes, and explains every line — so you write code you actually understand.",
                },
                {
                  icon: "✍️",
                  h: "Create professional proposals",
                  b: "AI drafts polished, personalised client messages even if you have never written a business proposal in your life.",
                },
                {
                  icon: "⏱️",
                  h: "Save time and reduce mistakes",
                  b: "AI generates first drafts, catches errors, and handles repetitive tasks — so you focus on what only you can do.",
                },
              ].map(({ icon, h, b }) => (
                <div
                  key={h}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl block mb-3" aria-hidden="true">
                    {icon}
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm mb-1.5">
                    {h}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{b}</p>
                </div>
              ))}
            </div>

            <Insight
              icon="💡"
              color="violet"
              heading="The key insight"
              body="AI does not replace your skill — it amplifies it. A beginner who uses AI daily will outperform an experienced freelancer who ignores it. This is your competitive edge, and it is available right now."
            />
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 1 — CHOOSE A SKILL                             */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-01">
            <StepHeader step={STEPS[0]} />
            <SectionH2 id="step1-h">Choose a Profitable Tech Skill</SectionH2>
            <BodyText>
              The most common beginner mistake is trying to offer everything to
              everyone. They list themselves as web developers, graphic
              designers, copywriters, and social media managers all at once —
              and attract no one, because clients hire specialists.
            </BodyText>
            <BodyText>
              Your entire goal at this stage is simple: pick{" "}
              <strong className="text-stone-900">one skill</strong>, and become
              clearly associated with it. You can expand later. But first,
              choose.
            </BodyText>

            <SectionH3>Beginner-Friendly Tech Skills Worth Choosing</SectionH3>
            <div className="space-y-3 my-5">
              {SKILLS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-start gap-4 bg-white border border-stone-200 rounded-xl p-4 shadow-sm"
                >
                  <span
                    className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-0.5">
                      {s.name}
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {s.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Insight
              icon="🧭"
              color="blue"
              heading="How to decide"
              body="Ask yourself: which of these topics do I find myself reading about even when no one asks me to? Start with genuine interest. Mild curiosity maintained over 90 days beats intense passion that burns out in 2 weeks."
            />

            <SectionH3>How AI Helps You Commit</SectionH3>
            <BodyText>
              If you genuinely cannot choose, open ChatGPT or Claude. Describe
              your background, interests, daily available time, and financial
              goals — then ask which skill is the best fit for your specific
              situation. You will receive a thoughtful, personalised
              recommendation in under a minute. Then act on it.
            </BodyText>
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 2 — LEARN WITH AI                              */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-02">
            <StepHeader step={STEPS[1]} />
            <SectionH2 id="step2-h">
              Use AI to Learn and Practice Every Day
            </SectionH2>
            <BodyText>
              Traditional learning paths ask you to study for six to twelve
              months before touching anything real. There is a better way: learn
              the minimum needed, build something real immediately, and use AI
              to fill the gaps in real time. This is how beginners move faster
              than people who have been "studying" for years.
            </BodyText>

            <SectionH3>Practical Ways to Use AI as Your Tutor</SectionH3>
            <ul className="space-y-3 my-5">
              <BulletPoint>
                Ask AI to explain concepts in the simplest possible language.
                "Explain CSS flexbox like I am twelve years old" is a completely
                valid and effective prompt.
              </BulletPoint>
              <BulletPoint>
                When you encounter code you do not understand, paste it into AI
                and ask for a line-by-line breakdown with plain-English
                explanations.
              </BulletPoint>
              <BulletPoint>
                After studying a topic, ask AI to give you a five-question quiz
                on it. Testing yourself dramatically improves retention compared
                to passive reading.
              </BulletPoint>
              <BulletPoint>
                When you get stuck, describe the problem in plain English to AI
                before searching anywhere else. You will get unstuck in under a
                minute, ninety percent of the time.
              </BulletPoint>
              <BulletPoint>
                Ask AI to build you a 30-minute daily practice plan for your
                chosen skill. Follow it consistently for 30 days and observe the
                difference in your confidence.
              </BulletPoint>
            </ul>

            <SectionH3>A Sample 30-Minute Learning Session</SectionH3>
            <div className="bg-stone-900 rounded-2xl p-6 my-6 text-sm">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mb-5">
                Daily Routine Template
              </p>
              {[
                [
                  "0:00 – 0:10",
                  "Ask AI to explain one concept you do not yet understand.",
                ],
                [
                  "0:10 – 0:25",
                  "Build a tiny example based on what AI explained. Write the code yourself.",
                ],
                [
                  "0:25 – 0:30",
                  "Paste your code into AI. Ask: 'What could be improved here, and why?'",
                ],
              ].map(([time, task]) => (
                <div
                  key={time}
                  className="flex items-start gap-4 mb-4 last:mb-0"
                >
                  <span className="text-stone-500 font-mono text-xs w-24 flex-shrink-0 mt-0.5">
                    {time}
                  </span>
                  <span className="text-stone-200 leading-relaxed">{task}</span>
                </div>
              ))}
            </div>

            <BodyText>
              Thirty minutes of focused, AI-assisted daily practice will take
              you further in two months than most people travel in a year of
              passive video-watching. The secret is not the amount of time — it
              is the quality of engagement.
            </BodyText>
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 3 — BUILD PROJECTS                             */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-03">
            <StepHeader step={STEPS[2]} />
            <SectionH2 id="step3-h">Build Sample Projects Using AI</SectionH2>
            <BodyText>
              A certificate tells a client you studied something. A working
              project proves you can actually deliver. Clients do not hire based
              on credentials — they hire based on evidence. Your goal in this
              step is to build two to three real, functional samples of your
              work before you approach a single client.
            </BodyText>
            <BodyText>
              These projects do not need to be complex. They need to be real,
              functional, and clearly presented. A clean, fast one-page website
              for a fictional coffee shop will impress a client far more than an
              ambitious half-finished app that never works.
            </BodyText>

            <SectionH3>Simple Starter Project Ideas</SectionH3>
            <ul className="space-y-2.5 my-5">
              {PROJECTS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-stone-600 text-base leading-relaxed"
                >
                  <span className="text-violet-500 mt-1 flex-shrink-0 font-bold">
                    ✦
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <SectionH3>How AI Accelerates Project Creation</SectionH3>
            <ul className="space-y-3 my-4">
              <BulletPoint>
                Before writing a line of code or opening a design tool, describe
                the project to AI and ask for a step-by-step build plan. This
                prevents you from getting lost halfway through.
              </BulletPoint>
              <BulletPoint>
                Use AI to generate starter code, page layouts, or design briefs
                — then customise everything to make it genuinely yours. Do not
                submit AI output unchanged.
              </BulletPoint>
              <BulletPoint>
                When you get stuck mid-project, paste your current state into AI
                and ask "What should I tackle next, and why?" Get unstuck and
                moving forward within minutes.
              </BulletPoint>
              <BulletPoint>
                Ask AI to review your finished project: "What are three specific
                improvements that would make this more professional?" Implement
                every suggestion you agree with.
              </BulletPoint>
            </ul>

            <Insight
              icon="🎯"
              color="violet"
              heading="What sample projects are really for"
              body="You are not building these for yourself. You are building them so that a potential client can look at your work and immediately imagine what you could do for their business. Make them realistic. Give them real business names. Deploy them publicly."
            />
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 4 — PORTFOLIO                                  */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-04">
            <StepHeader step={STEPS[3]} />
            <SectionH2 id="step4-h">
              Create a Simple Freelance Portfolio
            </SectionH2>
            <BodyText>
              Your portfolio does not need to be a masterpiece. It needs to be
              clear, professional, and honest. Many beginners delay this step
              indefinitely because they do not feel ready. The truth is: a
              simple, honest portfolio published today is infinitely more
              valuable than a perfect one that never gets launched.
            </BodyText>

            <SectionH3>What a Beginner Portfolio Must Include</SectionH3>
            <ol className="space-y-4 my-5">
              {PORTFOLIO_ITEMS.map(({ label, detail }, i) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-0.5">
                      {label}
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Insight
              icon="✅"
              color="teal"
              heading="Be honest about your experience level"
              body="Do not claim 5 years of experience if you have 3 months. Write this instead: 'I am a motivated junior developer with 90 days of focused practice and real projects to show. I deliver on time and communicate clearly.' Clients respect honesty far more than discovered exaggeration."
            />

            <SectionH3>How AI Builds Your Portfolio Content</SectionH3>
            <ul className="space-y-3 my-4">
              <BulletPoint>
                Give AI your background in bullet points and ask it to write
                your positioning statement. Edit the output to sound like you,
                not like a machine.
              </BulletPoint>
              <BulletPoint>
                Ask AI to write project descriptions: "Write a 3-sentence
                description of a restaurant website I built using Next.js and
                Tailwind CSS, focusing on the problem it solves for the
                business."
              </BulletPoint>
              <BulletPoint>
                Request an honest critique: "Review this portfolio text and tell
                me what would make a potential client trust it more." Implement
                every improvement that resonates.
              </BulletPoint>
            </ul>
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 5 — FIND CLIENTS                               */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-05">
            <StepHeader step={STEPS[4]} />
            <SectionH2 id="step5-h">
              Find and Approach Your First Client
            </SectionH2>
            <BodyText>
              Most beginners make the mistake of starting their client search in
              the most competitive places first — large freelance platforms
              where thousands of experienced professionals compete for every
              posting. Your first client almost certainly will not come from
              there.
            </BodyText>

            <SectionH3>Where to Actually Find Your First Client</SectionH3>
            <div className="space-y-3 my-5">
              {CLIENT_SOURCES.map(({ where, how }) => (
                <div
                  key={where}
                  className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="font-semibold text-stone-900 text-sm mb-1">
                    {where}
                  </p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {how}
                  </p>
                </div>
              ))}
            </div>

            <SectionH3>How AI Helps You Approach Clients</SectionH3>
            <BodyText>
              The most common reason beginners never reach out is fear — fear of
              rejection, of sounding amateur, of not knowing what to say. AI
              removes all three barriers.
            </BodyText>
            <ul className="space-y-3 my-4">
              <BulletPoint>
                Describe the business and the problem you noticed to AI, then
                ask it to draft an outreach message tailored to that specific
                situation. Personalise the output before sending.
              </BulletPoint>
              <BulletPoint>
                Ask AI to roleplay as a skeptical client and practice answering
                objections like "Why should I hire someone with no experience?"
                Do this until the answers feel natural.
              </BulletPoint>
              <BulletPoint>
                Use AI to research any business before you contact them. Mention
                something specific about their situation — it signals care and
                professionalism immediately.
              </BulletPoint>
            </ul>

            <Insight
              icon="📌"
              color="emerald"
              heading="The golden rule of outreach"
              body="Lead with what you noticed about them — not with who you are and what you want. 'I noticed your website is not mobile-friendly, which likely means you are losing phone visitors daily' will always outperform 'Hello, I am a web developer looking for work.'"
            />
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 6 — PROPOSALS                                  */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-06">
            <StepHeader step={STEPS[5]} />
            <SectionH2 id="step6-h">Write Winning Proposals With AI</SectionH2>
            <BodyText>
              A proposal is not a sales pitch — it is a demonstration that you
              understand the client's problem and have a clear plan to solve it.
              The best proposals make clients feel understood before they have
              even hired you.
            </BodyText>

            <SectionH3>The Structure of a Strong Beginner Proposal</SectionH3>
            <ol className="space-y-4 my-5">
              {[
                {
                  h: "Open with their problem",
                  b: "Not your credentials. 'I noticed your current website takes over 8 seconds to load on mobile, which is likely affecting how many visitors become paying customers.'",
                },
                {
                  h: "Describe your solution clearly",
                  b: "What you will build, what it will include, and what they will be able to do when it is done. No vague language.",
                },
                {
                  h: "Give a realistic timeline",
                  b: "Be honest. Three to seven days for a small project is credible. One day is suspicious. Four weeks for a landing page is too long.",
                },
                {
                  h: "State your price specifically",
                  b: "Vague pricing feels like a trap. A specific number — even a range — communicates confidence and professionalism.",
                },
                {
                  h: "Close with a clear next step",
                  b: "Not an open question. 'I am available for a 15-minute call this week, or happy to answer any questions here first.'",
                },
              ].map(({ h, b }, i) => (
                <NumberPoint key={h} n={i + 1}>
                  <div>
                    <span className="font-semibold text-stone-900">{h}: </span>
                    <span>{b}</span>
                  </div>
                </NumberPoint>
              ))}
            </ol>

            <SectionH3>Example AI Prompt for Writing Your Proposal</SectionH3>
            <div className="bg-stone-900 rounded-2xl p-6 my-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mb-4">
                Paste this into ChatGPT or Claude
              </p>
              <p className="text-stone-200 text-sm leading-relaxed italic">
                "I am applying for a freelance job to build a website for a
                Lagos-based hair salon. They currently have no website and get
                all clients through Instagram. They want something that shows
                their services, prices, location, and a contact form. I have 90
                days of web development experience and a portfolio with two live
                sample sites. Write a confident, professional proposal that
                focuses on their specific needs — not on my background."
              </p>
            </div>

            <BodyText>
              Use the AI output as a starting point, not a finished product. Add
              your own voice, specific details about their business, and genuine
              enthusiasm. A proposal that reads as human will always outperform
              one that sounds templated.
            </BodyText>
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 7 — PRICING                                    */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-07">
            <StepHeader step={STEPS[6]} />
            <SectionH2 id="step7-h">Price Your First Job Correctly</SectionH2>
            <BodyText>
              Pricing is where most beginners either dramatically undersell
              themselves or freeze and never send a proposal at all. Both
              mistakes cost you real income. Here is how to think about pricing
              with clarity and confidence.
            </BodyText>

            <SectionH3>Think in Value, Not in Hours</SectionH3>
            <BodyText>
              Your price is not about how long it takes you. It is about the
              value you are creating for the client. A website that helps a
              salon attract three extra clients per month at ₦15,000 each is
              generating ₦45,000 in new monthly revenue. A ₦60,000 website fee
              pays for itself within 6 weeks. Frame the price around the
              outcome, not your time.
            </BodyText>

            <div className="grid sm:grid-cols-3 gap-4 my-7">
              {PRICING.map(({ tier, naira, usd, scope }) => (
                <div
                  key={tier}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                    {tier}
                  </p>
                  <p className="font-display font-extrabold text-stone-900 text-xl">
                    {naira}
                  </p>
                  <p className="text-stone-400 text-xs mb-3">{usd}</p>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    {scope}
                  </p>
                </div>
              ))}
            </div>

            <SectionH3>Beginner Pricing Rules to Follow</SectionH3>
            <ul className="space-y-3 my-4">
              <BulletPoint>
                Do not work for free — with one exception: a genuine community
                organisation where you receive a real testimonial and real-world
                portfolio experience in return.
              </BulletPoint>
              <BulletPoint>
                Do not price so low that quality is called into question. If the
                fair market rate for a basic site is ₦50,000 and you charge
                ₦3,000, clients wonder what is wrong.
              </BulletPoint>
              <BulletPoint>
                Always define a revision limit in your scope — for example, two
                rounds of revisions included. Additional changes are billed
                separately. This is standard practice.
              </BulletPoint>
              <BulletPoint>
                Get 30–50% of your agreed fee upfront before starting any work.
                This protects both parties and is completely normal to request
                from day one.
              </BulletPoint>
            </ul>

            <Insight
              icon="🧮"
              color="orange"
              heading="Ask AI to help you price"
              body="Tell AI your skill level, your location, the project type, and your experience. Ask: 'What is a fair price range for this project for a beginner freelancer in Nigeria?' You will receive a calibrated, honest benchmark to work from."
            />
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* STEP 8 — DELIVER                                    */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="step-08">
            <StepHeader step={STEPS[7]} />
            <SectionH2 id="step8-h">Deliver Excellent Work Using AI</SectionH2>
            <BodyText>
              Landing the client is not the finish line — it is the starting
              line. Your entire reputation as a freelancer is built on how you
              deliver. One client who is genuinely delighted with your work is
              worth more than ten who were merely satisfied. They refer people.
              They come back. They leave reviews that attract your next client.
            </BodyText>

            <div className="space-y-4 my-6">
              {[
                {
                  icon: "⚡",
                  h: "Work faster without cutting corners",
                  b: "Use AI to generate starter code, first drafts, and design suggestions. You invest your time in refining and customising — not starting from a blank page every session.",
                },
                {
                  icon: "🔍",
                  h: "Catch errors before the client does",
                  b: "Before you deliver anything — ever — paste it into AI and ask: 'Review this for errors, inconsistencies, or anything that looks unprofessional.' Fix everything it finds.",
                },
                {
                  icon: "📝",
                  h: "Communicate like a professional",
                  b: "Use AI to draft progress updates, delivery messages, and responses to client feedback. Polished communication at every stage builds enormous trust, even when the work is imperfect.",
                },
                {
                  icon: "🔄",
                  h: "Handle revision requests gracefully",
                  b: "Paste client feedback into AI and ask the best way to implement it. AI helps you respond to criticism constructively and turn revisions into relationship-building moments.",
                },
              ].map(({ icon, h, b }) => (
                <div
                  key={h}
                  className="flex items-start gap-4 bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
                >
                  <span
                    className="text-2xl flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-1.5">
                      {h}
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {b}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <SectionH3>The Three Delivery Rules</SectionH3>
            <ol className="space-y-4 my-4">
              <NumberPoint n={1}>
                Deliver on or before the agreed deadline. If something goes
                wrong, communicate proactively and immediately. Going silent is
                the fastest way to destroy a client relationship.
              </NumberPoint>
              <NumberPoint n={2}>
                Always deliver one small extra thing the client did not ask for
                — a favicon, a mobile check, a useful tip. It costs you minutes
                and creates memorable delight.
              </NumberPoint>
              <NumberPoint n={3}>
                Immediately after delivery, while the client's enthusiasm is
                highest, ask for a written testimonial. This becomes your single
                most powerful marketing asset for the next client.
              </NumberPoint>
            </ol>
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* COMMON MISTAKES                                      */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="mistakes">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-rose-100 text-rose-800 border border-rose-200 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Watch Out
            </span>
            <SectionH2 id="mistakes-h">
              Common Mistakes Beginners Must Avoid
            </SectionH2>
            <BodyText>
              These are the traps that stop talented people from ever getting
              started — or from progressing beyond their first client. Recognise
              them. Adjust before they cost you.
            </BodyText>

            <div className="space-y-3 my-6">
              {MISTAKES.map(({ bad, fix }) => (
                <div
                  key={bad}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="flex items-start gap-3 px-4 py-3 bg-rose-50/60 border-b border-stone-100">
                    <span className="text-rose-500 font-black text-sm flex-shrink-0 mt-0.5">
                      ✗
                    </span>
                    <p className="text-stone-800 text-sm font-semibold leading-snug">
                      {bad}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 px-4 py-3">
                    <span className="text-emerald-600 font-black text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Insight
              icon="🤖"
              color="indigo"
              heading="How AI reduces your error rate"
              body="Most freelancing mistakes come from inexperience, nervousness, and poor communication. AI is infinitely patient and never nervous. Draft every important message through AI. Review every deliverable with AI before it reaches a client. Your professionalism will increase immediately."
            />
          </Wrapper>

          <HR />

          {/* ──────────────────────────────────────────────────── */}
          {/* FINAL MOTIVATION                                     */}
          {/* ──────────────────────────────────────────────────── */}
          <Wrapper id="motivation">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              You Can Do This
            </span>
            <SectionH2 id="motivation-h">Start Before You Feel Ready</SectionH2>
            <BodyText>
              Here is what every successful freelancer eventually realises: you
              never feel fully ready before you begin. The feeling of readiness
              is not something that arrives before you start — it is something
              that arrives{" "}
              <em className="text-stone-800 font-semibold">because</em> you
              started.
            </BodyText>
            <BodyText>
              Your first proposal will be imperfect. Your first project will
              have flaws you notice in hindsight. Your first client conversation
              will feel slightly awkward. None of that matters. What matters is
              that you sent the proposal, completed the project, and had the
              conversation — while everyone still "getting ready" is still
              waiting.
            </BodyText>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-stone-900 pl-6 my-8">
              <p className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight italic">
                "The beginner who starts today and stays consistent for 90 days
                will be unrecognisable. Your first client is closer than you
                think."
              </p>
            </blockquote>

            <SectionH3>Your Action Plan for the Next 7 Days</SectionH3>
            <ol className="space-y-4 my-5">
              {[
                "Day 1: Choose your one tech skill. Write it down in a place you will see daily. Commit to 90 days.",
                "Days 2–3: Set up your free AI tools. Spend 30 minutes learning with AI as your guide.",
                "Days 4–5: Begin your first sample project. Use AI to plan and start it — do not wait for perfect conditions.",
                "Day 6: Draft a simple one-page portfolio. Run it through AI for feedback. Improve it.",
                "Day 7: Identify one real potential client — a local business, a contact, anyone who needs your skill. Write them a message. Send it today.",
              ].map((item, i) => (
                <NumberPoint key={i} n={i + 1}>
                  {item}
                </NumberPoint>
              ))}
            </ol>

            {/* Final CTA card */}
            <div
              className="mt-10 rounded-3xl p-8 sm:p-10 text-center text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1e3a5f 0%, #1e1b4b 50%, #14532d 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%,rgba(99,102,241,.25) 0%,transparent 55%),radial-gradient(circle at 80% 70%,rgba(16,185,129,.2) 0%,transparent 55%)",
                }}
              />
              <div className="relative">
                <span className="text-4xl block mb-4" aria-hidden="true">
                  🚀
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3 leading-tight">
                  Your first client is one action away.
                </h3>
                <p className="text-blue-200 text-base leading-relaxed max-w-lg mx-auto">
                  The tools are free. The knowledge is in this guide. The only
                  missing piece is your decision to act on it. Follow these
                  eight steps, use AI at every stage, and approach one potential
                  client this week. That single action changes everything.
                </p>
              </div>
            </div>
          </Wrapper>
        </main>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer
          className="border-t border-stone-200 bg-white"
          role="contentinfo"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid sm:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-display font-bold text-xl text-stone-900 mb-2">
                  AI<span className="text-blue-600">Tech</span>Path
                </p>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Helping beginners become skilled tech freelancers faster using
                  AI tools and practical, honest guides.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                  Tech Skills
                </p>
                <ul className="space-y-2 text-sm text-stone-500">
                  {[
                    "Web Development with AI",
                    "App Development with AI",
                    "UI/UX Design with AI",
                    "Digital Marketing with AI",
                  ].map((l) => (
                    <li
                      key={l}
                      className="hover:text-stone-800 transition-colors cursor-default"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                  Freelancing
                </p>
                <ul className="space-y-2 text-sm text-stone-500">
                  {[
                    "Getting Your First Client",
                    "Writing Proposals with AI",
                    "Pricing Your Work",
                    "Building a Portfolio",
                  ].map((l) => (
                    <li
                      key={l}
                      className="hover:text-stone-800 transition-colors cursor-default"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
              <p>
                © {new Date().getFullYear()} AITechPath. All rights reserved.
              </p>
              <p>Freelancing guide · 8 steps · Updated 2025</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
