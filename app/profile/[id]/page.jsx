import Link from "next/link";
import { isSupabaseConfigured } from "../../../lib/supabase/client";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import {
  getProfileStats,
  getForumTopics,
  getForumTopic,
  slugify,
  initials,
} from "../../../lib/forum";
import { SITE_URL } from "../../../lib/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: "Member profile — Joetech Forum",
    description: "A member of the Joetech tech forum.",
    alternates: { canonical: `${SITE_URL}/profile/${id}` },
    robots: { index: true, follow: true },
  };
}

function StatsGrid({ stats }) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      <div className="rounded-2xl bg-white p-4 text-center ring-1 ring-slate-200">
        <p className="text-2xl font-bold text-slate-900">{stats.questions}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Questions
        </p>
      </div>
      <div className="rounded-2xl bg-white p-4 text-center ring-1 ring-slate-200">
        <p className="text-2xl font-bold text-slate-900">{stats.answers}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Answers
        </p>
      </div>
      <div className="rounded-2xl bg-white p-4 text-center ring-1 ring-slate-200">
        <p className="text-2xl font-bold text-emerald-600">{stats.solutions}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Solutions
        </p>
      </div>
    </div>
  );
}

/**
 * Public member profile. Live mode: the id is the profile UUID.
 * Demo mode: the id is the slug of a seed author's display name.
 */
export default async function PublicProfilePage({ params }) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    // Demo mode — find the seed author by slugified display name.
    const topics = await getForumTopics();
    let authorName = topics
      .map((t) => t.author_name)
      .find((n) => slugify(n) === id);
    if (!authorName) {
      for (const t of topics) {
        const found = (await getForumTopic(t.slug)) || { replies: [] };
        const hit = found.replies.find((r) => slugify(r.author_name) === id);
        if (hit) {
          authorName = hit.author_name;
          break;
        }
      }
    }
    if (!authorName) {
      return (
        <main className="min-h-screen bg-slate-50 py-16 px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Member not found
          </h1>
          <p className="mt-3 text-slate-600">
            This member does not exist in the forum yet.
          </p>
          <Link
            href="/forum"
            className="mt-6 inline-block font-medium text-blue-600 hover:underline"
          >
            ← Back to the forum
          </Link>
        </main>
      );
    }
    const stats = await getProfileStats({ authorName });
    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Sample member — starter discussion
          </span>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold text-white ring-4 ring-white">
              {initials(authorName)}
            </span>
            <h1 className="font-display text-3xl font-bold text-slate-900">
              {authorName}
            </h1>
          </div>
          <StatsGrid stats={stats} />
          <p className="mt-8 text-sm">
            <Link href="/forum" className="font-medium text-blue-600 hover:underline">
              ← Back to the forum
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Member not found
        </h1>
        <Link
          href="/forum"
          className="mt-6 inline-block font-medium text-blue-600 hover:underline"
        >
          ← Back to the forum
        </Link>
      </main>
    );
  }

  const stats = await getProfileStats({ userId: profile.id });
  const name = profile.display_name || "Member";

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-4">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt={name}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-white"
            />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold text-white ring-4 ring-white">
              {initials(name)}
            </span>
          )}
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">{name}</h1>
            {profile.role === "admin" && (
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                Admin
              </span>
            )}
            {profile.bio && <p className="mt-2 text-slate-600">{profile.bio}</p>}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        <StatsGrid stats={stats} />

        <p className="mt-8 text-sm">
          <Link href="/forum" className="font-medium text-blue-600 hover:underline">
            ← Back to the forum
          </Link>
        </p>
      </div>
    </main>
  );
}
