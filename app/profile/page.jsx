import Link from "next/link";
import { isSupabaseConfigured } from "../../lib/supabase/client";
import { getSessionUser } from "../../lib/supabase/server";
import { getProfileStats, initials } from "../../lib/forum";
import { SITE_URL } from "../../lib/site";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "My profile — Joetech Forum",
  description: "Your Joetech forum profile, reputation and settings.",
  alternates: { canonical: `${SITE_URL}/profile` },
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Your profile
          </h1>
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Sign-in is not set up yet.</strong> Profiles appear once
            the login system is connected. You can still read the forum in the
            meantime.
          </div>
          <p className="mt-6 text-sm">
            <Link href="/forum" className="font-medium text-blue-600 hover:underline">
              ← Back to the forum
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const { user, profile } = await getSessionUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Sign in to see your profile
          </h1>
          <p className="mt-3 text-slate-600">
            Your questions, answers and solutions live here once you sign in.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const stats = await getProfileStats({ userId: user.id });
  const name = profile?.display_name || user.email?.split("@")[0] || "Member";

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-4">
          {profile?.avatar_url ? (
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
            <h1 className="font-display text-3xl font-bold text-slate-900">
              {name}
            </h1>
            <p className="text-sm text-slate-500">{user.email}</p>
            {profile?.role === "admin" && (
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                Admin
              </span>
            )}
            {profile?.bio && <p className="mt-2 text-slate-600">{profile.bio}</p>}
            {profile?.website && (
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

        <div className="mt-8">
          <ProfileForm
            profile={{
              display_name: name,
              bio: profile?.bio || "",
              website: profile?.website || "",
              avatar_url: profile?.avatar_url || "",
            }}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/forum" className="font-medium text-blue-600 hover:underline">
            ← Back to the forum
          </Link>
          <a
            href="/auth/logout"
            className="font-medium text-slate-600 hover:underline"
          >
            Sign out
          </a>
        </div>
      </div>
    </main>
  );
}
