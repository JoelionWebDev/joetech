import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../lib/supabase/server";

/**
 * Auth callback — Supabase redirects here after a magic-link click or
 * email confirmation with a `code`. We exchange it for a session and
 * send the user to the forum (or wherever `next` points).
 */
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/forum";

  if (code) {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Something went wrong (or Supabase is not set up yet) — back to login
  // with a plain message instead of a dead end.
  return NextResponse.redirect(
    `${origin}/auth/login?error=signin-link-expired`,
  );
}
