import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../lib/supabase/server";

/** Signs the user out and sends them back to the homepage. */
export async function GET(request) {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/`);
}

export async function POST(request) {
  return GET(request);
}
