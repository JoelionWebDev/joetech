"use client";

import { useActionState, useState } from "react";
import { postShowcaseAction } from "./actions";

/** "Show your build" form — shown to signed-in members on the forum page. */
export default function ShowcaseForm({ signedIn }) {
  const [state, formAction, pending] = useActionState(postShowcaseAction, {
    ok: false,
  });
  const [open, setOpen] = useState(false);

  if (!signedIn) {
    return (
      <a
        href="/auth/login"
        className="inline-block rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50"
      >
        Sign in to show your build →
      </a>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50"
      >
        + Show your build
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="mt-4 space-y-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
    >
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Your build is live on the forum — nice work!
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Project name</span>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. My online store for Ankara fabrics"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Live link</span>
          <input
            name="live_url"
            type="url"
            required
            placeholder="https://your-project.com"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Stack <span className="text-slate-400">(what did you build it with?)</span>
        </span>
        <input
          name="stack"
          type="text"
          placeholder="e.g. Next.js · Supabase · Paystack"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          What does it do?
        </span>
        <textarea
          name="description"
          rows={2}
          required
          placeholder="One or two sentences — who is it for, and what problem does it solve?"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
      >
        {pending ? "Sharing…" : "Share my build"}
      </button>
    </form>
  );
}
