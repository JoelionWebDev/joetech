"use client";

import { useActionState } from "react";
import { markSolutionAction } from "../actions";

/** "Mark as solution" — only shown to the question's author or an admin. */
export default function SolutionButton({ topicId, topicSlug, replyId }) {
  const [state, formAction, pending] = useActionState(markSolutionAction, {
    ok: false,
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="topic_id" value={topicId} />
      <input type="hidden" name="topic_slug" value={topicSlug} />
      <input type="hidden" name="reply_id" value={replyId} />
      <button
        type="submit"
        disabled={pending}
        title="Mark this reply as the solution"
        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100 disabled:opacity-50"
      >
        {pending ? "Marking…" : "✓ Mark as solution"}
      </button>
      {state?.error && (
        <span className="ml-2 text-xs text-red-600">{state.error}</span>
      )}
    </form>
  );
}
