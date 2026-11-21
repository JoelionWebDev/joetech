import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client (for auth forms and other client components).
 * Returns null when Supabase is not configured yet — the forum then runs
 * in demo mode (seeded topics, read-only) instead of crashing.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
