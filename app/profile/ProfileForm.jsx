"use client";

import { useActionState } from "react";
import { updateProfileAction } from "./actions";

export default function ProfileForm({ profile }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, {
    ok: false,
  });

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-lg shadow-blue-500/5 ring-1 ring-slate-200"
    >
      <h2 className="font-display text-lg font-bold text-slate-900">
        Edit your profile
      </h2>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Profile saved.
        </p>
      )}

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Display name</span>
        <input
          name="display_name"
          type="text"
          required
          minLength={2}
          defaultValue={profile.display_name || ""}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Bio <span className="text-slate-400">(max 300 characters)</span>
        </span>
        <textarea
          name="bio"
          rows={3}
          maxLength={300}
          defaultValue={profile.bio || ""}
          placeholder="What do you build? What are you learning?"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Website</span>
        <input
          name="website"
          type="url"
          defaultValue={profile.website || ""}
          placeholder="https://your-site.com"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Avatar image link
        </span>
        <input
          name="avatar_url"
          type="url"
          defaultValue={profile.avatar_url || ""}
          placeholder="https://…/your-photo.jpg"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        />
        <span className="text-xs text-slate-500">
          Paste a link to a photo (for now — photo uploads come later).
        </span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
