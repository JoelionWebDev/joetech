import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./client";

/**
 * Server Supabase client (server components + server actions).
 * Returns null when Supabase is not configured yet — callers must check
 * isSupabaseConfigured() first and fall back to demo data.
 */
export async function createServerSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll is called from server components where setting cookies
            // is not allowed — the middleware refreshes the session instead.
          }
        },
      },
    },
  );
}

/** The signed-in user (or null) plus their public profile row, if any. */
export async function getSessionUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { user: null, profile: null };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  return { user, profile };
}
