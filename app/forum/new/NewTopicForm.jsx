"use client";

import { useActionState } from "react";
import Link from "next/link";
import { postTopicAction } from "../actions";
import { FORUM_CATEGORIES } from "../../../lib/forum-categories";

/** Ask-a-question form. Guests get a friendly sign-in prompt. */
export default function NewTopicForm({ signedIn, live }) {
  const [state, formAction, pending] = useActionState(postTopicAction, {
    ok: false,
  });

  if (!live) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
        <strong>Asking opens once sign-in is connected.</strong> The forum is
        in preview mode right now — you can read every question, and posting
        opens with accounts.
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Sign in to ask a question
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Accounts are free. Your question stays linked to you, so people can
          follow up — and you can mark the best reply as the solution.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200"
          >
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-lg shadow-blue-500/5 ring-1 ring-slate-200"
    >
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Title — what are you stuck on?
        </span>
        <input
          name="title"
          type="text"
          required
          minLength={5}
          maxLength={150}
          placeholder="e.g. My Next.js site rebuilds on every Vercel deploy — how do I stop it?"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Category</span>
        <select
          name="category"
          required
          defaultValue=""
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="" disabled>
            Choose a category…
          </option>
          {FORUM_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Describe the problem
        </span>
        <textarea
          name="body"
          rows={8}
          required
          placeholder={"What did you try? What happened instead? Paste the error message or the code that is misbehaving.\n\nTip: wrap code in triple backticks (```) and it renders in a code block."}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-mono text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Live site link <span className="text-slate-400">(optional)</span>
        </span>
        <input
          name="site_url"
          type="url"
          placeholder="https://your-site.com — so helpers can see the problem live"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
      >
        {pending ? "Posting your question…" : "Post question"}
      </button>
    </form>
  );
}
