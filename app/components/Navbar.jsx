"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Learn Tech", href: "/learn-tech" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@joetechstudio",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/igono-joel-88b680185/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(window.location.pathname);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) =>
    href === "/" ? active === "/" : active.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ?
          "bg-[#060b18] shadow-[0_1px_0_rgba(255,255,255,0.06)]"
        : "bg-[#060b18]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="relative z-10 flex items-center gap-2 shrink-0"
            aria-label="Joetech homepage"
          >
            <Image
              src="/logo.png"
              alt="Joetech logo — home"
              width="42"
              height="42"
              className="lg:w-[46px]"
              priority
            />
            <span className="text-white font-bold text-lg lg:text-xl tracking-tight">
              Joetech
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.href) ?
                    "text-white bg-white/10"
                  : "text-gray-100 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${s.name}`}
                className="text-gray-100 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
            <a
              href="/contact"
              className="ml-2 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              Start a Project
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative z-10 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Toggle navigation"
          >
            {open ?
              <X className="w-6 h-6" />
            : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          open ?
            "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#060b18]"
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-blue-950 via-[#0a1128] to-[#060b18] shadow-2xl transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-20 px-6 h-full">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive(link.href) ?
                      "text-white bg-white/20 hover:bg-white/25"
                    : "text-white hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto pb-10">
              <div className="flex items-center gap-3 mb-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${s.name}`}
                    className="text-gray-100 hover:text-white hover:bg-white/10 p-2.5 rounded-xl transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-blue-500/25"
              >
                Start a Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
