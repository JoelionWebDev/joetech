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
    title: "De Phantom Continental Hotel Group",
    description:
      "Multi-property website for De Phantom Continental Hotel Group, covering two Lagos locations (Chevron and Lekki/Ikate). Built as a clean, fast-loading informational and booking-inquiry site for each hotel branch, with dedicated subdomains per property.",
    category: "Hospitality",
    service: "Web Development",
    tags: ["Web Development", "Hospitality"],
    image: "/images/dephantom.png",
    year: "2025",
    url: "https://www.dephantomhotelgroup.com",
  },
  {
    id: 2,
    title: "Mburubu Construction",
    description:
      "Full company website for Mburubu Construction, an Enugu-based construction firm. Includes services pages (building construction, renovations, project management, architectural design, road construction, machinery hiring), a projects showcase, and a quote request system. Built with a modern Next.js stack.",
    category: "Construction",
    service: "Web Development",
    tags: ["Web Development", "Construction"],
    image: "/images/mburubuconstruction.png",
    year: "2025",
    url: "https://www.mburubuconstruction.com.ng/",
  },
  {
    id: 3,
    title: "First Choice Afro Villa",
    description:
      "Real estate and land investment website for First Choice Afro Villa Limited, featuring active property listings (including the Enugu Smart City Estate), an FAQ system, WhatsApp-integrated inquiries, and a full contact/lead capture form covering all 36 Nigerian states.",
    category: "Real Estate",
    service: "Web Development",
    tags: ["Web Development", "Real Estate"],
    image: "/images/firstchoiceafrovilla.png",
    year: "2025",
    url: "https://www.firstchoiceafrovilla.com/",
  },
  {
    id: 4,
    title: "Enamis Systems",
    description:
      "Company website for Enamis Systems, a Lagos-based electrical and smart technology solutions provider. Showcases six core services (electrical installation, solar/inverter systems, CCTV, access control, fire alarm, home automation) with a detailed quote-request form segmented by service type and property type.",
    category: "Electrical & Smart Tech",
    service: "Web Development",
    tags: ["Web Development", "Electrical & Smart Tech"],
    image: "/images/enamissystems.png",
    year: "2025",
    url: "https://www.enamissystems.name.ng/",
  },
  {
    id: 5,
    title: "Franklyn Technologies",
    description:
      "Corporate website and online shop for Franklyn Technologies Limited, a technology company offering secure web solutions and digital products, including a full e-commerce storefront with cart and checkout functionality.",
    category: "E-commerce",
    service: "Web Development",
    tags: ["Web Development", "E-commerce", "Technology"],
    image: "/images/franklyntechnologies.png",
    year: "2025",
    url: "https://www.franklyntechnologies.com.ng",
  },
  {
    id: 6,
    title: "Godsfame Music",
    description:
      "Official artist website for Godsfame Music, a gospel artist and worship minister. Built on WordPress with music release pages, a gospel blog, lyrics section, music video gallery, and an integrated shop. Built in collaboration with Franklyn Technologies.",
    category: "Music & Media",
    service: "Web Development",
    tags: ["Web Development", "Music & Media", "WordPress"],
    image: "/images/godsfamemusic.png",
    year: "2025",
    url: "https://www.godsfamemusic.com",
  },
  {
    id: 7,
    title: "Henthisel Consults Limited",
    description:
      "Real estate listings website for Henthisel Consults Limited, a Lekki, Lagos-based property agency specializing in fully detached duplexes and high-value residential listings across Lekki and Ajah.",
    category: "Real Estate",
    service: "Web Development",
    tags: ["Web Development", "Real Estate"],
    image: "/images/hcltd.png",
    year: "2025",
    url: "https://www.hcltd.com.ng",
  },
  {
    id: 8,
    title: "Growth Tech Daily",
    description:
      "WordPress blog site built for Growth Tech Daily, publishing ongoing content in the tech space with a lightweight, fast-loading blog structure.",
    category: "Blog",
    service: "Web Development",
    tags: ["Web Development", "Blog", "WordPress"],
    image: "/images/growthtechdaily.png",
    year: "2025",
    url: "https://www.growthtechdaily.com.ng/",
  },
  {
    id: 9,
    title: "Easy Hotel Search",
    description:
      "WordPress-built online hotel directory for Easy Hotel Search, helping travelers discover accommodation options across Nigeria for business trips, family holidays, and weekend getaways — covering business, family, romantic, and short-stay travel needs.",
    category: "Travel & Hospitality",
    service: "Web Development",
    tags: ["Web Development", "Travel & Hospitality", "WordPress", "Directory"],
    image: "/images/easyhotelsearch.png",
    year: "2025",
    url: "https://www.easyhotelsearch.com.ng/",
  },
  {
    id: 10,
    title: "Joetech.name.ng",
    description:
      "My personal portfolio and business website — the site you are currently on. Built to showcase my web development services, completed projects, and technical expertise from Lekki, Lagos.",
    category: "Technology",
    service: "Web Development",
    tags: ["Web Development", "Portfolio", "Technology"],
    image: "/images/joetech.name.ng.png",
    year: "2025",
    url: "https://joetech.name.ng",
  },
];

const CLIENTS = [
  { name: "De Phantom Continental Hotel Group", abbr: "DP", color: "#1e3a5f" },
  { name: "Mburubu Construction", abbr: "MC", color: "#d97706" },
  { name: "First Choice Afro Villa", abbr: "FC", color: "#059669" },
  { name: "Enamis Systems", abbr: "ES", color: "#2563eb" },
  { name: "Franklyn Technologies", abbr: "FT", color: "#7c3aed" },
  { name: "Godsfame Music", abbr: "GM", color: "#dc2626" },
  { name: "Henthisel Consults Ltd", abbr: "HC", color: "#0891b2" },
  { name: "Growth Tech Daily", abbr: "GT", color: "#ea580c" },
  { name: "Easy Hotel Search", abbr: "EH", color: "#1f2937" },
];

const CATEGORIES = ["All", "Hospitality", "Construction", "Real Estate", "Electrical & Smart Tech", "E-commerce", "Music & Media", "Blog", "Travel & Hospitality", "Technology"];

const CATEGORY_META = {
  Hospitality: { color: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  Construction: { color: "bg-orange-100 text-orange-800", dot: "bg-orange-500" },
  "Real Estate": { color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  "Electrical & Smart Tech": { color: "bg-cyan-100 text-cyan-800", dot: "bg-cyan-500" },
  "E-commerce": { color: "bg-purple-100 text-purple-800", dot: "bg-purple-500" },
  "Music & Media": { color: "bg-pink-100 text-pink-800", dot: "bg-pink-500" },
  Blog: { color: "bg-indigo-100 text-indigo-800", dot: "bg-indigo-500" },
  "Travel & Hospitality": { color: "bg-teal-100 text-teal-800", dot: "bg-teal-500" },
  Technology: { color: "bg-slate-100 text-slate-800", dot: "bg-slate-500" },
};

const STATS = [
  { value: "100+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Happy Clients" },
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
      {project.url && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-blue-500/80 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow backdrop-blur-sm">
            ↗ Live
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
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} live website`}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors group/link"
        >
          View Project
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
          content="Explore Joetech's portfolio of web development projects for hospitality, real estate, construction, e-commerce, and more. See live sites for Nigerian businesses."
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
              100+ Projects Completed Across Nigeria & Beyond
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
              grow through modern web development and digital solutions.
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

      </div>
    </>
  );
}
