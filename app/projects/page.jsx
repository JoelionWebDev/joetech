"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";

// ─── Intersection Observer Hook ───────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "EcoMart E-commerce Platform",
    description:
      "A full-featured e-commerce solution for sustainable products with advanced inventory management, customer analytics, and payment integration.",
    category: "Web",
    service: "Web Development",
    tags: ["E-commerce", "React", "Node.js", "Payments"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=480&fit=crop&q=80",
    year: "2024",
    featured: true,
    challenge:
      "The client needed a scalable e-commerce platform handling high traffic without sacrificing speed or user experience.",
    solution:
      "We built a custom React platform with server-side rendering, optimised payment flows, and a comprehensive admin dashboard.",
    results:
      "40% uplift in conversion rate and 60% reduction in page load time — driving significant revenue growth within 3 months.",
    metrics: { views: "50K+", conversion: "+40%" },
  },
  {
    id: 2,
    title: "FinTech Mobile Banking App",
    description:
      "Secure mobile banking app with biometric authentication, real-time transaction monitoring, and instant transfer capabilities.",
    category: "App",
    service: "Mobile App Development",
    tags: ["React Native", "Biometrics", "Security", "Banking"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&h=480&fit=crop&q=80",
    year: "2024",
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Brand Identity System",
    description:
      "Complete visual identity and digital marketing campaign for a premium lifestyle brand — logo, guidelines, and campaign assets.",
    category: "Branding",
    service: "Brand Strategy & Design",
    tags: ["Brand Identity", "Logo Design", "Guidelines", "Marketing"],
    image:
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=700&h=480&fit=crop&q=80",
    year: "2023",
    featured: true,
    challenge:
      "Design a sophisticated identity that resonates with luxury consumers across every digital and physical touchpoint.",
    solution:
      "Developed a comprehensive brand system with bespoke typography, refined colour palette, and versatile logo suite.",
    results:
      "200% increase in brand recognition; social media engagement up 150% within 6 months of launch.",
    metrics: { views: "100K+", conversion: "+200%" },
  },
  {
    id: 4,
    title: "Healthcare Digital Marketing",
    description:
      "Multi-channel strategy for a healthcare provider — SEO, content marketing, and social media management to boost patient acquisition.",
    category: "Marketing",
    service: "Digital Marketing",
    tags: ["SEO", "Content Marketing", "Social Media", "Healthcare"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=700&h=480&fit=crop&q=80",
    year: "2023",
    featured: false,
  },
  {
    id: 5,
    title: "Restaurant Management System",
    description:
      "Integrated web platform for a restaurant chain — inventory tracking, staff scheduling, and a full CRM built for daily ops.",
    category: "Web",
    service: "Web Development",
    tags: ["Management System", "Inventory", "CRM", "Dashboard"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=480&fit=crop&q=80",
    year: "2023",
    featured: false,
  },
  {
    id: 6,
    title: "Fitness Tracker Mobile App",
    description:
      "Cross-platform app for fitness enthusiasts with workout logging, nutrition planning, and a social challenge feed.",
    category: "App",
    service: "Mobile App Development",
    tags: ["Fitness", "Cross-platform", "Real-time", "Social"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=480&fit=crop&q=80",
    year: "2024",
    featured: false,
  },
];

const CLIENTS = [
  { name: "TechCorp Nigeria", abbr: "TC", color: "#2563eb" },
  { name: "Lagos Business Hub", abbr: "LBH", color: "#059669" },
  { name: "Fintech Solutions", abbr: "FS", color: "#7c3aed" },
  { name: "EcoMart", abbr: "EM", color: "#dc2626" },
  { name: "Healthcare Plus", abbr: "H+", color: "#ea580c" },
  { name: "Luxury Brands Co.", abbr: "LB", color: "#1f2937" },
];

const CATEGORIES = ["All", "Web", "App", "Branding", "Marketing"];

const CATEGORY_META = {
  Web: { color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  App: { color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  Branding: { color: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
  Marketing: { color: "bg-orange-100 text-orange-800", dot: "bg-orange-500" },
};

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "25+", label: "Happy Clients" },
  { value: "5★", label: "Average Rating" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CategoryBadge = ({ category, size = "sm" }) => {
  const meta = CATEGORY_META[category] || {};
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5"
      } ${meta.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {category}
    </span>
  );
};

const ProjectCard = ({ project, index, inView }) => (
  <article
    role="article"
    aria-label={`${project.title} — ${project.service} project`}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(24px)",
      transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.3s ease, translate 0.3s ease`,
    }}
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-[16/10]">
      <Image
        src={project.image}
        alt={`${project.title} — ${project.service} portfolio example by Joetech, Lagos`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute top-3 left-3 flex gap-2">
        <CategoryBadge category={project.category} />
      </div>
      {project.featured && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-1 rounded-full shadow">
            ★ Featured
          </span>
        </div>
      )}
    </div>

    {/* Body */}
    <div className="p-5 sm:p-6 flex flex-col flex-1">
      <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200">
        {project.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400 font-medium">
          {project.year}
        </span>
        <a
          href={`/projects/${project.id}`}
          aria-label={`View case study for ${project.title}`}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors group/link"
        >
          View Case Study
          <svg
            className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform"
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
      </div>
    </div>
  </article>
);

const FeaturedCaseStudy = ({ project, reverse }) => {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 xl:gap-16 items-center transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Image side */}
      <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
          <Image
            src={project.image}
            alt={`${project.title} case study preview — ${project.service} by Joetech`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Floating metrics card */}
        <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 bg-white rounded-xl shadow-xl p-4 border border-slate-100">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-blue-600 leading-none">
                {project.metrics.views}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Page Views</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 leading-none">
                {project.metrics.conversion}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Text side */}
      <div className={reverse ? "lg:order-1" : ""}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CategoryBadge category={project.category} size="md" />
          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            ★ Featured Case Study
          </span>
        </div>

        <h3 className="font-extrabold text-slate-900 text-2xl sm:text-3xl mb-3 leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-500 text-base leading-relaxed mb-7">
          {project.description}
        </p>

        <div className="space-y-5 mb-7">
          {[
            ["Challenge", project.challenge],
            ["Solution", project.solution],
            ["Results", project.results],
          ].map(([label, text]) => (
            <div key={label} className="flex gap-3">
              <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
              <div>
                <p className="font-bold text-slate-900 text-sm mb-0.5">
                  {label}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={`/projects/${project.id}`}
          aria-label={`Read full case study for ${project.title}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
        >
          Read Full Case Study
          <svg
            className="w-4 h-4"
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
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JoetechProjectsPage() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [heroRef, heroInView] = useInView(0.2);
  const [projectsRef, projectsInView] = useInView(0.1);
  const [clientsRef, clientsInView] = useInView(0.2);
  const [ctaRef, ctaInView] = useInView(0.2);

  const filteredProjects =
    filterCategory === "All" ? PROJECTS : (
      PROJECTS.filter((p) => p.category === filterCategory)
    );

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  // Auto-scroll clients ticker
  const tickerRef = useRef(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let raf;
    let pos = 0;
    const speed = 0.4;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Joetech Portfolio — Projects & Case Studies",
    description:
      "Portfolio of web development, mobile app, branding, and digital marketing projects delivered by Joetech, Lagos, Nigeria.",
    url: "https://joetech.name.ng/projects",
    creator: {
      "@type": "Organization",
      name: "Joetech",
      url: "https://joetech.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lekki",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
    },
    hasPart: PROJECTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      dateCreated: p.year,
    })),
  });

  return (
    <>
      <Head>
        <title>
          Portfolio & Projects — Web Dev, Apps & Digital Marketing | Joetech
          Lagos
        </title>
        <meta
          name="description"
          content="Explore Joetech's portfolio of 50+ projects across web development, mobile apps, brand design, and digital marketing. See real results for Nigerian and global businesses."
        />
        <meta
          name="keywords"
          content="Joetech portfolio, web development Nigeria, mobile app development Lagos, brand design, digital marketing agency, Lekki Lagos, case studies, e-commerce development"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Joetech Portfolio — Innovative Digital Projects, Lagos Nigeria"
        />
        <meta
          property="og:description"
          content="Award-worthy web development, mobile apps, branding and marketing projects. Real results for real businesses."
        />
        <meta property="og:url" content="https://joetech.name.ng/projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Joetech Portfolio — Digital Projects & Case Studies"
        />
        <link rel="canonical" href="https://joetech.name.ng/projects" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaOrg }}
        />
        <style>{`
          :root { --font-display:'Bricolage Grotesque',sans-serif; --font-body:'Instrument Sans',sans-serif; }
          body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
          h1,h2,h3,h4,.font-display { font-family: var(--font-display); }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
          @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          .animate-fadeup { animation: fadeUp 0.7s ease forwards; }
          .delay-100 { animation-delay:0.1s; opacity:0; }
          .delay-200 { animation-delay:0.2s; opacity:0; }
          .delay-300 { animation-delay:0.3s; opacity:0; }
          .delay-400 { animation-delay:0.4s; opacity:0; }
          .filter-btn-active { box-shadow: 0 0 0 3px rgba(37,99,235,0.25); }
          :focus-visible { outline: 3px solid #3b82f6; outline-offset: 3px; }
        `}</style>
      </Head>

      <div
        className="min-h-screen bg-slate-50 text-slate-900"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* ── BREADCRUMB ── */}
        <nav
          className="bg-white border-b border-slate-100 py-3 px-4 sm:px-6 lg:px-8"
          aria-label="Breadcrumb"
        >
          <ol
            className="max-w-7xl mx-auto flex items-center gap-2 text-sm"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <a
                href="/"
                itemProp="item"
                className="text-slate-400 hover:text-blue-600 transition-colors font-medium"
              >
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <svg
              className="w-4 h-4 text-slate-300 flex-shrink-0"
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
            <li
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <span itemProp="name" className="text-slate-800 font-semibold">
                Projects
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          aria-labelledby="portfolio-heading"
          className="relative bg-slate-900 overflow-hidden py-20 sm:py-28"
        >
          {/* bg decoration */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[100px]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div
            className={`relative max-w-5xl mx-auto px-6 sm:px-10 text-center`}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium px-4 py-2 rounded-full mb-6 animate-fadeup">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              50+ Projects Delivered Across Nigeria & Beyond
            </div>

            <h1
              id="portfolio-heading"
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-5 animate-fadeup delay-100"
              itemProp="headline"
            >
              Our Projects &
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>

            <p
              className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fadeup delay-200"
              itemProp="description"
            >
              Real work. Measurable results. Explore how we've helped businesses
              grow through web development, mobile apps, brand design, and
              digital marketing.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fadeup delay-300">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded-2xl py-4 px-3"
                >
                  <p className="font-display font-extrabold text-2xl text-white leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-slate-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main id="main-content">
          {/* ── FILTER + PROJECTS GRID ── */}
          <section
            aria-labelledby="recent-projects-heading"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
          >
            {/* Section header */}
            <div className="text-center mb-10">
              <h2
                id="recent-projects-heading"
                className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-3"
              >
                Recent Projects
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Browse our latest work across every service area.
              </p>
            </div>

            {/* Filter pills */}
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  aria-pressed={filterCategory === cat}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filterCategory === cat ?
                      "bg-blue-600 text-white shadow-md filter-btn-active"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-xs opacity-70">
                    (
                    {cat === "All" ?
                      PROJECTS.length
                    : PROJECTS.filter((p) => p.category === cat).length}
                    )
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div
              ref={projectsRef}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  inView={projectsInView}
                />
              ))}
            </div>
          </section>

          {/* ── FEATURED CASE STUDIES ── */}
          <section
            aria-labelledby="case-studies-heading"
            className="bg-white border-y border-slate-100 py-16 sm:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  Deep Dives
                </span>
                <h2
                  id="case-studies-heading"
                  className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-3"
                >
                  Featured Case Studies
                </h2>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">
                  A closer look at the challenge, solution, and results behind
                  our best work.
                </p>
              </div>

              <div className="space-y-24 sm:space-y-32">
                {featuredProjects.map((project, i) => (
                  <FeaturedCaseStudy
                    key={project.id}
                    project={project}
                    reverse={i % 2 === 1}
                  />
                ))}
              </div>

              {/* Start a project callout */}
              <div className="mt-20 bg-gradient-to-br from-blue-600 to-violet-700 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-3">
                    Ready to Start Your Own Project?
                  </h3>
                  <p className="text-blue-100 text-base sm:text-lg mb-7 max-w-xl mx-auto">
                    Let's discuss how we can bring your vision to life with our
                    expert team and proven process.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Get in Touch
                    <svg
                      className="w-4 h-4"
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
                </div>
              </div>
            </div>
          </section>

          {/* ── CLIENTS TICKER ── */}
          <section
            ref={clientsRef}
            aria-labelledby="clients-heading"
            className="py-16 sm:py-20 bg-slate-50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
              <h2
                id="clients-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2"
              >
                Trusted by Leading Brands
              </h2>
              <p className="text-slate-500">
                Innovative companies across Nigeria and beyond.
              </p>
            </div>

            <div className="relative" aria-hidden="true">
              {/* fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

              <div className="overflow-hidden">
                <div ref={tickerRef} className="flex will-change-transform">
                  {[...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div key={i} className="flex-shrink-0 mx-4">
                      <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow w-44 sm:w-52">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                          style={{ backgroundColor: client.color }}
                        >
                          {client.abbr}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 truncate">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section
            ref={ctaRef}
            aria-labelledby="cta-heading"
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
          >
            <div
              className={`max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white overflow-hidden relative transition-all duration-700 ${
                ctaInView ?
                  "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
              }`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h2
                  id="cta-heading"
                  className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight"
                >
                  Let's Build Something
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Amazing Together
                  </span>
                </h2>
                <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  Our team in Lekki, Lagos is ready to bring your vision to life
                  with cutting-edge technology and creative solutions that drive
                  real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5"
                  >
                    Get Started Today
                    <svg
                      className="w-5 h-5"
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
                  <a
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                  >
                    See Our Services
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className="bg-slate-900 text-white" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div className="sm:col-span-2 lg:col-span-1">
                <p className="font-display font-extrabold text-2xl mb-3">
                  Joe<span className="text-blue-400">tech</span>
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Creating innovative digital solutions from our office in
                  Lekki, Lagos, Nigeria.
                </p>
                <address className="not-italic text-slate-400 text-sm space-y-1">
                  <p>📍 Lekki Phase 1, Lagos, Nigeria</p>
                  <p>
                    📧{" "}
                    <a
                      href="mailto:projects@joetech.com"
                      className="hover:text-white transition-colors"
                    >
                      projects@joetech.com
                    </a>
                  </p>
                  <p>
                    📞{" "}
                    <a
                      href="tel:+2349012345678"
                      className="hover:text-white transition-colors"
                    >
                      +234 901 234 5678
                    </a>
                  </p>
                </address>
              </div>
              <nav aria-label="Portfolio links">
                <p className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">
                  Portfolio
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Web Development", "/projects/web"],
                    ["Mobile Apps", "/projects/mobile"],
                    ["Branding", "/projects/branding"],
                    ["Digital Marketing", "/projects/marketing"],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Company links">
                <p className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">
                  Company
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Home", "/"],
                    ["About", "/about"],
                    ["Services", "/services"],
                    ["Blog", "/blog"],
                    ["Contact", "/contact"],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <p className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { label: "Twitter/X", path: "M18 6 6 18M6 6l12 12" },
                    {
                      label: "LinkedIn",
                      path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
                    },
                    {
                      label: "Instagram",
                      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
                    },
                  ].map(({ label, path }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={`Follow Joetech on ${label}`}
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={path}
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
              <p>© {new Date().getFullYear()} Joetech. All rights reserved.</p>
              <p>Proudly serving clients from Lagos, Nigeria 🇳🇬</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
