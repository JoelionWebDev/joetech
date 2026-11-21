"use client";

import { useActionState } from "react";
import Link from "next/link";
import { postReplyAction } from "../actions";

/** Reply form under a question. Guests get a friendly sign-in prompt. */
export default function ReplyForm({ topicId, topicSlug, signedIn, live }) {
  const [state, formAction, pending] = useActionState(postReplyAction, {
    ok: false,
  });

  if (!live) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
        <strong>Replies open once sign-in is connected.</strong> The forum is
        in preview mode right now — you can read everything, and posting opens
        with accounts.
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="rounded-2xl bg-white p-5 text-sm text-slate-700 ring-1 ring-slate-200">
        <p>
          <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">
            Sign in
          </Link>{" "}
          to reply — or{" "}
          <Link href="/auth/signup" className="font-semibold text-blue-600 hover:underline">
            create a free account
          </Link>{" "}
          in under a minute.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
    >
      <input type="hidden" name="topic_id" value={topicId} />
      <input type="hidden" name="topic_slug" value={topicSlug} />
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Reply posted — thank you for helping!
        </p>
      )}
      <label className="block">
        <span className="sr-only">Your reply</span>
        <textarea
          name="body"
          rows={5}
          required
          placeholder="Share what worked for you — code, links and steps help the next person."
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>
      <p className="text-xs text-slate-500">
        Tip: wrap code in triple backticks (```) and it renders in a code
        block.
      </p>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
      >
        {pending ? "Posting…" : "Post reply"}
      </button>
    </form>
  );
}
