"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createBrowserSupabaseClient,
  isSupabaseConfigured,
} from "../../../lib/supabase/client";
import { SITE_URL } from "../../../lib/site";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState("password"); // "password" | "magic"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(
    searchParams.get("error") === "signin-link-expired"
      ? "That sign-in link expired or was already used — request a fresh one below."
      : "",
  );
  const [busy, setBusy] = useState(false);

  const configured = isSupabaseConfigured();

  async function handlePassword(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) {
      setStatus(error.message);
      return;
    }
    router.refresh();
    router.push("/forum");
  }

  async function handleMagic(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${SITE_URL}/auth/callback` },
    });
    setBusy(false);
    if (error) {
      setStatus(error.message);
      return;
    }
    setStatus(
      "Check your inbox — we sent you a sign-in link. It works once, so open it soon.",
    );
  }

  return (
    <>
      {!configured && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Sign-in is not set up yet.</strong> The forum is running in
          preview mode while the login system is connected. You can still read
          every question — posting opens once sign-in goes live.
        </div>
      )}

      {configured && (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg shadow-blue-500/5 ring-1 ring-slate-200">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMode("password")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${mode === "password" ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setMode("magic")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${mode === "magic" ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}
            >
              Email link
            </button>
          </div>

          {status && (
            <p className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">
              {status}
            </p>
          )}

          {mode === "password" ? (
            <form onSubmit={handlePassword} className="space-y-4">
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
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Your password"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
              >
                {busy ? "Signing you in…" : "Sign in"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagic} className="space-y-4">
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
              <p className="text-xs text-slate-500">
                No password needed — we email you a one-time sign-in link.
              </p>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
              >
                {busy ? "Sending…" : "Email me a sign-in link"}
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-sm text-slate-600">
            New here?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="mx-auto max-w-md">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-blue-600">
          Joetech Forum
        </p>
        <h1 className="font-display mt-2 text-center text-3xl font-bold text-slate-900">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-slate-600">
          Sign in to ask questions, reply and show your builds.
        </p>

        <Suspense
          fallback={
            <p className="mt-8 text-center text-sm text-slate-500">Loading…</p>
          }
        >
          <LoginForm />
        </Suspense>

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
