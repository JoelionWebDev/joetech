"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createBrowserSupabaseClient,
  isSupabaseConfigured,
} from "../../../lib/supabase/client";
import { SITE_URL } from "../../../lib/site";

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const configured = isSupabaseConfigured();

  async function handleSignup(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName.trim() },
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    });
    setBusy(false);
    if (error) {
      setStatus(error.message);
      return;
    }
    // If Supabase returns a session straight away (email confirmation off),
    // take the user to the forum; otherwise ask them to confirm by email.
    if (data.session) {
      router.refresh();
      router.push("/forum");
      return;
    }
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="mx-auto max-w-md">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-blue-600">
          Joetech Forum
        </p>
        <h1 className="font-display mt-2 text-center text-3xl font-bold text-slate-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-slate-600">
          Ask questions, help others, and show what you built. Free, always.
        </p>

        {!configured && (
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Sign-up is not set up yet.</strong> The forum is running
            in preview mode while the login system is connected. You can still
            read every question — accounts open once sign-in goes live.
          </div>
        )}

        {configured && !done && (
          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-lg shadow-blue-500/5 ring-1 ring-slate-200"
          >
            {status && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                {status}
              </p>
            )}
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Display name
              </span>
              <input
                type="text"
                required
                minLength={2}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="e.g. Adaeze O."
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Password
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="At least 6 characters"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {busy ? "Creating your account…" : "Create account"}
            </button>
            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}

        {configured && done && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-lg shadow-blue-500/5 ring-1 ring-slate-200">
            <p className="text-3xl">✉️</p>
            <h2 className="font-display mt-2 text-xl font-bold text-slate-900">
              Check your inbox
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We sent a confirmation link to <strong>{email}</strong>. Open it
              to finish creating your account, then come back and sign in.
            </p>
            <Link
              href="/auth/login"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Go to sign in
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-sm">
          <Link
            href="/forum"
            className="font-medium text-blue-600 hover:underline"
          >
            ← Back to the forum
          </Link>
        </p>
      </div>
    </main>
  );
}
