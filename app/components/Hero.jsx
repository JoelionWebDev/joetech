"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

/**
 * JoetechHero — Production-grade hero section
 * SEO: structured heading hierarchy, aria labels, semantic HTML, meta-ready
 * UI:  cinematic dark aesthetic, staggered reveal, glassmorphism cards,
 *      refined typography, high-contrast CTAs, accessible focus states
 */

const STATS = [
  { value: "50+", label: "Projects Delivered", color: "#38bdf8" },
  { value: "24/7", label: "Support Available", color: "#a78bfa" },
  { value: "100%", label: "Client Satisfaction", color: "#34d399" },
];

const SERVICES = [
  { icon: "🌐", label: "Web Development" },
  { icon: "📱", label: "Mobile Apps" },
  { icon: "🎨", label: "Brand Design" },
  { icon: "📣", label: "Digital Marketing" },
];

// Stagger delay map for reveal animation
const DELAY = [
  "delay-[0ms]",
  "delay-[150ms]",
  "delay-[300ms]",
  "delay-[450ms]",
  "delay-[600ms]",
  "delay-[750ms]",
];

export default function JoetechHero() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Subtle parallax light following cursor (desktop only)
  useEffect(() => {
    const handler = (e) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const reveal = (extraDelay = "") =>
    `transition-all duration-700 ease-out ${extraDelay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <>
      {/* ── SEO META (works alongside Next.js Head in _app or layout) ── */}
      <Head>
        <title>Joetech — We Build, Design & Promote Your Brand Digitally</title>
        <meta
          name="description"
          content="Joetech is your all-in-one digital growth partner. We build websites, mobile apps, brand identities and run data-driven digital marketing campaigns that get results."
        />
        <meta
          name="keywords"
          content="web development Nigeria, digital marketing agency, brand design, mobile app development, Joetech, grow your business online"
        />
        <meta property="og:title" content="Joetech — Digital Growth Partner" />
        <meta
          property="og:description"
          content="From websites to apps, videos, ads to full brand strategy — Joetech is your all-in-one growth partner."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-display: 'Bricolage Grotesque', sans-serif;
            --font-body: 'Instrument Sans', sans-serif;
          }
          .font-display { font-family: var(--font-display); }
          .font-body { font-family: var(--font-body); }
          body { font-family: var(--font-body); }

          @keyframes drift {
            0%, 100% { transform: translateY(0) scale(1); }
            50%       { transform: translateY(-18px) scale(1.04); }
          }
          @keyframes spin-slow { to { transform: rotate(360deg); } }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
          @keyframes blink-dot {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
          @keyframes scroll-bounce {
            0%, 100% { transform: translateY(0); opacity: 1; }
            60%       { transform: translateY(8px); opacity: 0.4; }
          }

          .animate-drift   { animation: drift 7s ease-in-out infinite; }
          .animate-drift2  { animation: drift 9s ease-in-out infinite reverse; }
          .animate-spin-slow { animation: spin-slow 22s linear infinite; }
          .animate-blink   { animation: blink-dot 1.4s ease-in-out infinite; }
          .animate-scroll  { animation: scroll-bounce 1.8s ease-in-out infinite; }

          .text-shimmer {
            background: linear-gradient(
              90deg,
              #38bdf8 0%,
              #818cf8 25%,
              #c084fc 50%,
              #818cf8 75%,
              #38bdf8 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 4s linear infinite;
          }

          .glass {
            background: rgba(255,255,255,0.05);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.10);
          }
          .glass-hover:hover {
            background: rgba(255,255,255,0.09);
            border-color: rgba(255,255,255,0.22);
          }

          .cta-primary {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            box-shadow: 0 0 0 0 rgba(124,58,237,0);
            transition: all 0.3s ease;
          }
          .cta-primary:hover {
            box-shadow: 0 8px 32px rgba(124,58,237,0.45);
            transform: translateY(-2px) scale(1.02);
          }
          .cta-primary:active { transform: translateY(0) scale(0.98); }

          .stat-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 60%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }
        `}</style>
      </Head>

      {/* ── HERO SECTION ── */}
      <section
        ref={sectionRef}
        aria-label="Joetech hero — digital growth partner"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        {/* ─ Background image ─ */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-[#060b18]/75" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#060b18] via-blue-950/30 to-[#060b18]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060b18]" />
        </div>

        {/* ─ Dynamic mouse-follow glow (desktop) ─ */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none hidden lg:block transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.08) 0%, transparent 70%)`,
          }}
        />

        {/* ─ Ambient orbs ─ */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-blue-600/10 blur-[80px] animate-drift hidden lg:block" />
          <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-indigo-600/10 blur-[100px] animate-drift2 hidden lg:block" />
          <div className="absolute top-16 left-1/2 w-40 h-40 rounded-full bg-cyan-500/10 blur-[60px] animate-drift hidden lg:block" />
        </div>

        {/* ─ Decorative ring (desktop) ─ */}
        <div
          aria-hidden="true"
          className="absolute right-12 top-1/2 -translate-y-1/2 w-[440px] h-[440px] hidden xl:block"
        >
          <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
          <div
            className="absolute inset-6 rounded-full border border-white/5 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          />
          <div
            className="absolute inset-14 rounded-full border border-blue-400/10 animate-spin-slow"
            style={{ animationDuration: "15s" }}
          />
          {/* Orbit dot */}
          <div className="absolute top-3 left-1/2 w-2.5 h-2.5 -ml-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_3px_rgba(56,189,248,0.6)] animate-blink" />
        </div>

        {/* ─ MAIN CONTENT ─ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-24">
          <div className="max-w-3xl">
            {/* Live badge */}
            <div
              className={`inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8 ${reveal(DELAY[0])}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)] animate-blink" />
              <span className="text-slate-300 text-xs font-medium tracking-wide font-body uppercase">
                Now accepting new projects
              </span>
            </div>

            {/* H1 — SEO primary keyword target */}
            <h1
              className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-extrabold text-white leading-[1.04] tracking-tight mb-6 ${reveal(DELAY[1])}`}
              itemProp="headline"
            >
              We Build, Design
              <br />
              <span className="text-shimmer">&amp; Promote</span> Your
              <br />
              Brand{" "}
              <span className="relative inline-block">
                Digitally
                {/* underline accent */}
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q75 2 150 6 Q225 10 298 4"
                    stroke="url(#uline)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="uline"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Sub-heading — secondary SEO keyword support */}
            <p
              className={`font-body text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-5 ${reveal(DELAY[2])}`}
              itemProp="description"
            >
              From websites to mobile apps, brand videos, paid ads, and full
              digital strategy —{" "}
              <strong className="text-white font-medium">Joetech</strong> is
              your end-to-end growth partner that turns ideas into results.
            </p>

            {/* Service pills */}
            <div className={`flex flex-wrap gap-2 mb-10 ${reveal(DELAY[2])}`}>
              {SERVICES.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 glass glass-hover text-slate-300 text-xs font-body font-medium px-3.5 py-1.5 rounded-full cursor-default transition-all duration-200 hover:text-white"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </div>

            {/* ─ CTA BUTTONS ─ */}
            <div
              className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-14 ${reveal(DELAY[3])}`}
            >
              {/* Primary */}
              <a
                href="/contact"
                aria-label="Start a project with Joetech — go to contact page"
                className="group cta-primary inline-flex items-center justify-center gap-2.5 text-white font-display font-bold text-base px-8 py-4 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Start a Project
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              {/* Secondary */}
              <a
                href="/portfolio"
                aria-label="View Joetech portfolio and case studies"
                className="group inline-flex items-center justify-center gap-2.5 glass glass-hover text-white font-display font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <svg
                  className="w-4.5 h-4.5 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Our Work
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* ─ STATS ROW ─ */}
            <div
              className={`grid grid-cols-3 gap-3 sm:gap-4 max-w-lg ${reveal(DELAY[4])}`}
              aria-label="Joetech key metrics"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="stat-card relative glass rounded-2xl px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{ "--stat-color": stat.color }}
                >
                  <p
                    className="font-display font-extrabold text-2xl sm:text-3xl leading-none mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-xs font-body leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─ SCROLL INDICATOR ─ */}
        <div
          aria-hidden="true"
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${reveal(DELAY[5])}`}
        >
          <span className="text-slate-500 text-xs font-body tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-9 rounded-full border border-slate-600 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-slate-400 animate-scroll" />
          </div>
        </div>
      </section>
    </>
  );
}
