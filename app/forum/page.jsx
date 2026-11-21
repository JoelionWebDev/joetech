import Link from "next/link";
import { getForumTopics, getShowcases, initials } from "../../lib/forum";
import { FORUM_CATEGORIES } from "../../lib/forum-categories";
import { isSupabaseConfigured } from "../../lib/supabase/client";
import { getSessionUser } from "../../lib/supabase/server";
import { SITE_URL } from "../../lib/site";
import ShowcaseForm from "./ShowcaseForm";

export const metadata = {
  title: "Tech Forum — Ask questions, show your builds | Joetech",
  description:
    "The Joetech tech forum: ask web, AI, SEO and freelancing questions, get answers from builders, and show the projects you built.",
  alternates: { canonical: `${SITE_URL}/forum` },
  openGraph: {
    type: "website",
    title: "Joetech Tech Forum — Ask + Build",
    description:
      "Ask tech questions, get real answers, and show what you built. Free for every Nigerian builder.",
    url: `${SITE_URL}/forum`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Joetech Tech Forum — Ask + Build",
    description:
      "Ask tech questions, get real answers, and show what you built.",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d || "";
  }
}

export default async function ForumPage({ searchParams }) {
  const params = await searchParams;
  const category = params.category || "";
  const search = params.search || "";

  const [topics, showcases] = await Promise.all([
    getForumTopics({ category, search }),
    getShowcases(),
  ]);
  const live = isSupabaseConfigured();
  const { user } = live ? await getSessionUser() : { user: null };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-4 pb-12 pt-14 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            Joetech Forum
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold leading-tight sm:text-5xl">
            Ask. Build. Show it off.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-blue-100">
            Stuck on a website, an AI tool, SEO or a client? Ask the question
            — and when you finish building something, show it to the community.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/forum/new"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-lg"
            >
              Ask a question →
            </Link>
            {user ? (
              <Link
                href="/profile"
                className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
              >
                My profile
              </Link>
            ) : (
              <Link
                href="/auth/signup"
                className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/20"
              >
                Create a free account
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {!live && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Preview mode.</strong> These are starter discussions to
            show how the forum works — real questions from members will appear
            here once sign-in is connected. Reading is open to everyone;
            posting opens with accounts.
          </div>
        )}

        {/* Search + categories */}
        <form
          action="/forum"
          method="get"
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search questions… e.g. Next.js, SEO, WhatsApp"
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/forum"
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${!category ? "bg-blue-600 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-blue-300"}`}
          >
            All topics
          </Link>
          {FORUM_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/forum?category=${encodeURIComponent(c)}`}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${category === c ? "bg-blue-600 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-blue-300"}`}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Topic list */}
        <div className="mt-6 space-y-3">
          {topics.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
              <p className="font-display text-lg font-bold text-slate-900">
                No questions here yet
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {search || category
                  ? "Try a different search or category."
                  : "Be the first to ask — someone else is probably stuck on the same thing."}
              </p>
              <Link
                href="/forum/new"
                className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Ask the first question
              </Link>
            </div>
          )}

          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/forum/${t.slug}`}
              className="block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md hover:ring-blue-300"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {t.category}
                </span>
                {t.solved && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    ✓ Solved
                  </span>
                )}
                {t.is_seed && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    Starter discussion
                  </span>
                )}
              </div>
              <h2 className="font-display mt-2 text-lg font-bold leading-snug text-slate-900">
                {t.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {t.body?.split("\n").find((l) => l.trim()) || ""}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[10px] font-bold text-white">
                    {initials(t.author_name)}
                  </span>
                  {t.author_name}
                </span>
                <span>{formatDate(t.created_at)}</span>
                <span className="font-medium text-slate-700">
                  {t.replyCount} {t.replyCount === 1 ? "reply" : "replies"}
                </span>
                {t.site_url && <span>🔗 Has a live link</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* Show your build */}
        <section className="mt-12 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Show your build 🚀
              </h2>
              <p className="mt-1 max-w-xl text-sm text-blue-100">
                Finished a website, an app or a tool? Share the live link and
                the stack — other builders will see it, and clients sometimes
                find their developer here.
              </p>
            </div>
            <ShowcaseForm signedIn={Boolean(user)} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {showcases.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15"
              >
                <h3 className="font-display text-base font-bold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {s.stack}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">
                  {s.description}
                </p>
                <a
                  href={s.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-white underline decoration-blue-300 underline-offset-2 hover:text-blue-200"
                >
                  Visit live site →
                </a>
                <p className="mt-3 text-xs text-blue-200/70">
                  Shared by {s.author_name}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
