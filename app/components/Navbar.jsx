"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Share } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Learn Tech", href: "/learn-tech" },
  { name: "Blog", href: "/blog" },
  { name: "Free Tools", href: "/tools" },
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
    href: "https://www.linkedin.com/in/igonojoe/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [showInstall, setShowInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  // Once the visitor taps Install, the banner stays put so the install
  // steps stay readable instead of vanishing under them.
  const installInteracted = useRef(false);
  // Draggable WhatsApp button: waPos is the dragged position (left/top in
  // pixels); null means "use the default spot". The position is remembered
  // in localStorage so it stays where the visitor left it.
  const waRef = useRef(null);
  const waDrag = useRef(null);
  const waSuppressClick = useRef(false);
  const [waDragging, setWaDragging] = useState(false);
  const [waPos, setWaPos] = useState(null);

  useEffect(() => {
    setActive(window.location.pathname);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Install-app banner: appears 4 seconds after the page opens and hides
  // 30 seconds after it appears (or sooner if dismissed/installed). Once
  // dismissed it stays hidden for 7 days; never shown inside the installed app.
  // If the visitor taps Install, the banner stays until they finish, so the
  // iPhone install steps stay readable.
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    try {
      const dismissed = Number(
        localStorage.getItem("joetech-install-dismissed") || 0,
      );
      if (dismissed && Date.now() - dismissed < 7 * 24 * 60 * 60 * 1000)
        return;
    } catch {
      // Storage unavailable — show the banner anyway.
    }
    // Register the PWA service worker (separate from the Monetag sw.js).
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/pwa-sw.js").catch(() => {});
    }
    setIsIOS(/iphone|ipad|ipod/i.test(window.navigator.userAgent));
    const onPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    const showTimer = setTimeout(() => setShowInstall(true), 4000);
    const hideTimer = setTimeout(() => {
      if (!installInteracted.current) setShowInstall(false);
    }, 4000 + 30000);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const dismissInstall = () => {
    setShowInstall(false);
    try {
      localStorage.setItem(
        "joetech-install-dismissed",
        String(Date.now()),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  // Load the visitor's saved WhatsApp button position (if any), clamped
  // into the current viewport in case the screen size changed.
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("joetech-wa-pos") || "null",
      );
      if (saved && typeof saved.x === "number" && typeof saved.y === "number") {
        const btn = waRef.current;
        const w = btn ? btn.offsetWidth : 200;
        const h = btn ? btn.offsetHeight : 56;
        setWaPos({
          x: Math.min(Math.max(8, saved.x), window.innerWidth - w - 8),
          y: Math.min(Math.max(8, saved.y), window.innerHeight - h - 8),
        });
      }
    } catch {
      // Ignore storage errors — the button just uses its default spot.
    }
  }, []);

  const onWaPointerDown = (e) => {
    const btn = waRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    waDrag.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      left: rect.left,
      top: rect.top,
      moved: false,
      x: rect.left,
      y: rect.top,
    };
    try {
      btn.setPointerCapture(e.pointerId);
    } catch {
      // Pointer capture is a best effort; dragging still works without it.
    }
  };

  const onWaPointerMove = (e) => {
    const d = waDrag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
    if (!d.moved) return;
    setWaDragging(true);
    const btn = waRef.current;
    const x = Math.min(
      Math.max(8, d.left + dx),
      window.innerWidth - btn.offsetWidth - 8,
    );
    const y = Math.min(
      Math.max(8, d.top + dy),
      window.innerHeight - btn.offsetHeight - 8,
    );
    d.x = x;
    d.y = y;
    setWaPos({ x, y });
  };

  const onWaPointerUp = () => {
    const d = waDrag.current;
    waDrag.current = null;
    setWaDragging(false);
    if (d && d.moved) {
      // It was a drag, not a tap — remember the spot and stop the link
      // from opening.
      waSuppressClick.current = true;
      try {
        localStorage.setItem(
          "joetech-wa-pos",
          JSON.stringify({ x: d.x, y: d.y }),
        );
      } catch {
        // Ignore storage errors.
      }
    }
  };

  const onWaPointerCancel = () => {
    waDrag.current = null;
    setWaDragging(false);
  };

  const onWaClick = (e) => {
    if (waSuppressClick.current) {
      e.preventDefault();
      waSuppressClick.current = false;
    }
  };

  const installApp = async () => {
    installInteracted.current = true;
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice.catch(() => null);
      if (choice && choice.outcome === "accepted") {
        try {
          localStorage.setItem(
            "joetech-install-dismissed",
            String(Date.now()),
          );
        } catch {
          // Ignore storage errors.
        }
      }
      setInstallPrompt(null);
      setShowInstall(false);
      return;
    }
    // No native install prompt (iPhone, or a browser without install
    // support) — show the manual steps instead.
    setShowInstallHelp(true);
  };

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

      {/* Floating WhatsApp button — draggable; default spot is 3rem (48px)
          from the bottom, and it lifts above the install banner while the
          banner is showing so the two never overlap. */}
      <a
        ref={waRef}
        href="https://wa.me/message/RKDWPWCNYQKTG1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Joetech on WhatsApp"
        onPointerDown={onWaPointerDown}
        onPointerMove={onWaPointerMove}
        onPointerUp={onWaPointerUp}
        onPointerCancel={onWaPointerCancel}
        onClick={onWaClick}
        style={waPos ? { left: waPos.x, top: waPos.y } : undefined}
        className={`fixed z-40 flex touch-none items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-white shadow-xl shadow-green-500/30 hover:bg-[#1eb856] ${
          waDragging ? "" : "transition-all"
        } ${waPos ? "" : showInstallHelp ? "bottom-[280px] right-5" : showInstall && !open ? "bottom-44 right-5" : "bottom-12 right-5"}`}
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="hidden text-sm font-semibold sm:inline">
          Chat with us
        </span>
      </a>

      {/* Install-app banner — bottom bar, hidden while the mobile menu is open */}
      {showInstall && !open && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#060b18]/95 px-4 py-3 shadow-2xl backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            {/* The app icon is tappable too — it starts the install flow. */}
            <button
              onClick={installApp}
              aria-label="Install the Joetech app"
              className="shrink-0 rounded-xl transition-transform hover:scale-105"
            >
              <Image
                src="/icons/icon-192.png"
                alt="Joetech app icon"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl"
              />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                Get the Joetech app
              </p>
              <p className="truncate text-xs text-slate-400">
                Our services, right from your home screen — no app store
                needed.
              </p>
            </div>
            {showInstallHelp ? (
              <button
                onClick={dismissInstall}
                className="shrink-0 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Got it
              </button>
            ) : (
              <button
                onClick={installApp}
                className="shrink-0 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                {isIOS ? "Install on iPhone" : "Install app"}
              </button>
            )}
            <button
              onClick={dismissInstall}
              aria-label="Dismiss"
              className="shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* iPhone (and browsers without one-tap install) get a clear,
              unmissable step card instead of one small line of text. */}
          {showInstallHelp && (
            <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Share className="h-4 w-4 shrink-0 text-blue-400" />
                {isIOS ?
                  "Install on iPhone — 3 quick steps"
                : "Install the app — 3 quick steps"}
              </p>
              <ol className="space-y-1.5 text-sm leading-relaxed text-slate-200">
                {isIOS ?
                  <>
                    <li>
                      <span className="font-semibold text-white">1.</span>{" "}
                      Tap the{" "}
                      <span className="font-semibold text-white">Share</span>{" "}
                      button at the bottom of Safari (the square with an
                      arrow pointing up).
                    </li>
                    <li>
                      <span className="font-semibold text-white">2.</span>{" "}
                      Scroll down and tap{" "}
                      <span className="font-semibold text-white">
                        “Add to Home Screen”
                      </span>
                      .
                    </li>
                    <li>
                      <span className="font-semibold text-white">3.</span>{" "}
                      Tap{" "}
                      <span className="font-semibold text-white">Add</span>{" "}
                      at the top right — Joetech will appear on your home
                      screen.
                    </li>
                  </>
                : <>
                    <li>
                      <span className="font-semibold text-white">1.</span>{" "}
                      Tap the menu{" "}
                      <span className="font-semibold text-white">(⋮)</span>{" "}
                      at the top right of your browser.
                    </li>
                    <li>
                      <span className="font-semibold text-white">2.</span>{" "}
                      Tap{" "}
                      <span className="font-semibold text-white">
                        “Install app”
                      </span>{" "}
                      (or “Add to Home screen”).
                    </li>
                    <li>
                      <span className="font-semibold text-white">3.</span>{" "}
                      Joetech will appear on your home screen — open it like
                      any app.
                    </li>
                  </>
                }
              </ol>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
