import Link from "next/link";
import { isSupabaseConfigured } from "../../../lib/supabase/client";
import { getSessionUser } from "../../../lib/supabase/server";
import { SITE_URL } from "../../../lib/site";
import NewTopicForm from "./NewTopicForm";

export const metadata = {
  title: "Ask a question — Joetech Forum",
  description:
    "Ask a web, AI, SEO or freelancing question on the Joetech tech forum and get answers from builders.",
  alternates: { canonical: `${SITE_URL}/forum/new` },
  robots: { index: false, follow: true },
};

export default async function NewTopicPage() {
  const live = isSupabaseConfigured();
  const { user } = live ? await getSessionUser() : { user: null };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm">
          <Link href="/forum" className="font-medium text-blue-600 hover:underline">
            ← All questions
          </Link>
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold text-slate-900">
          Ask a question
        </h1>
        <p className="mt-2 text-slate-600">
          The clearer the question, the faster the answer. Include what you
          tried, the error you saw, and a code snippet or live link if you
          have one.
        </p>
        <div className="mt-6">
          <NewTopicForm signedIn={Boolean(user)} live={live} />
        </div>
      </div>
    </main>
  );
}
