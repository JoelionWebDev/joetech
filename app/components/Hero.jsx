export default function JoetechHero() {
  return (
    <section
      aria-label="Joetech hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0A0A]"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft radial glow behind headline */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[720px] mx-auto px-6 py-24 text-center">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center mb-8 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-slate-600 border border-slate-300/80 dark:text-slate-400 dark:border-white/[0.08] rounded-full tracking-wide uppercase">
            Now accepting new projects
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-sans text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6 animate-fade-up dark:text-white"
          style={{ animationDelay: "100ms" }}
        >
          Your Brand, Built for the{" "}
          <span className="text-blue-500 dark:text-blue-400">Digital</span> World
        </h1>

        {/* Supporting line */}
        <p
          className="font-sans text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto mb-10 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Full-service agency building, designing, and promoting brands that perform in the digital age.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            Start Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/projects"
            className="text-sm text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 dark:text-slate-400 dark:hover:text-white dark:decoration-white/20 dark:hover:decoration-white/60 transition-all duration-200"
          >
            View our work
          </a>
        </div>
      </div>
    </section>
  );
}
