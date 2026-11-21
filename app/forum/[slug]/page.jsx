import Link from "next/link";
import { notFound } from "next/navigation";
import { getForumTopic, initials } from "../../../lib/forum";
import { isSupabaseConfigured } from "../../../lib/supabase/client";
import { getSessionUser } from "../../../lib/supabase/server";
import { SITE_URL } from "../../../lib/site";
import ForumMarkdown from "../Markdown";
import ReplyForm from "./ReplyForm";
import SolutionButton from "./SolutionButton";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getForumTopic(slug);
  if (!found) return { title: "Question not found — Joetech Forum" };
  return {
    title: `${found.topic.title} — Joetech Forum`,
    description: found.topic.body?.slice(0, 155) || "A question on the Joetech tech forum.",
    alternates: { canonical: `${SITE_URL}/forum/${slug}` },
    openGraph: {
      type: "article",
      title: found.topic.title,
      description: found.topic.body?.slice(0, 155) || "",
      url: `${SITE_URL}/forum/${slug}`,
    },
    robots: { index: true, follow: true },
  };
}

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

export default async function TopicPage({ params }) {
  const { slug } = await params;
  const found = await getForumTopic(slug);
  if (!found) notFound();

  const { topic, replies } = found;
  const live = isSupabaseConfigured();
  const { user, profile } = live
    ? await getSessionUser()
    : { user: null, profile: null };

  const canMarkSolution =
    Boolean(user) &&
    (topic.author_id === user.id || profile?.role === "admin");
  const solution = replies.find((r) => r.is_solution);
  const otherReplies = replies.filter((r) => !r.is_solution);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm">
          <Link href="/forum" className="font-medium text-blue-600 hover:underline">
            ← All questions
          </Link>
        </p>

        <article className="mt-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              {topic.category}
            </span>
            {topic.solved && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                ✓ Solved
              </span>
            )}
            {topic.is_seed && (
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                Starter discussion
              </span>
            )}
          </div>
          <h1 className="font-display mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {topic.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <Link
              href={
                topic.author_id
                  ? `/profile/${topic.author_id}`
                  : `/profile/${encodeURIComponent(topic.author_name?.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}`
              }
              className="flex items-center gap-1.5 font-medium text-slate-700 hover:underline"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[10px] font-bold text-white">
                {initials(topic.author_name)}
              </span>
              {topic.author_name}
            </Link>
            <span>{formatDate(topic.created_at)}</span>
            {topic.author_location && <span>📍 {topic.author_location}</span>}
          </div>

          <div className="mt-5">
            <ForumMarkdown>{topic.body}</ForumMarkdown>
          </div>

          {topic.site_url && (
            <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm">
              🔗 Site mentioned:{" "}
              <a
                href={topic.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                {topic.site_url.replace(/^https?:\/\//, "")}
              </a>
            </p>
          )}
        </article>

        {/* Solution — highlighted at the top of the replies */}
        {solution && (
          <section className="mt-6 rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              ✓ Solution — marked by the person who asked
            </p>
            <div className="mt-3">
              <ForumMarkdown>{solution.body}</ForumMarkdown>
            </div>
            <p className="mt-3 text-xs text-emerald-800">
              — {solution.author_name} · {formatDate(solution.created_at)}
            </p>
          </section>
        )}

        {/* Replies */}
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </h2>

          {otherReplies.length === 0 && !solution && (
            <p className="mt-3 rounded-2xl bg-white p-5 text-sm text-slate-600 ring-1 ring-slate-200">
              No replies yet — be the first to help.
            </p>
          )}

          <div className="mt-4 space-y-4">
            {otherReplies.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[11px] font-bold text-white">
                      {initials(r.author_name)}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {r.author_name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDate(r.created_at)}
                    </span>
                    {r.is_seed && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                        Starter discussion
                      </span>
                    )}
                  </p>
                  {canMarkSolution && (
                    <SolutionButton
                      topicId={topic.id}
                      topicSlug={topic.slug}
                      replyId={r.id}
                    />
                  )}
                </div>
                <div className="mt-3">
                  <ForumMarkdown>{r.body}</ForumMarkdown>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Reply form */}
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Your answer
          </h2>
          <div className="mt-3">
            <ReplyForm
              topicId={topic.id}
              topicSlug={topic.slug}
              signedIn={Boolean(user)}
              live={live}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
