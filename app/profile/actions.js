"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "../../lib/supabase/client";
import { getSessionUser } from "../../lib/supabase/server";

/**
 * Update the signed-in user's own profile row (display name, bio,
 * website, avatar URL). Only their own row — RLS enforces the same.
 */
export async function updateProfileAction(prevState, formData) {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Sign-in is not set up yet." };
  }
  const { user } = await getSessionUser();
  if (!user) {
    return { ok: false, error: "Please sign in first." };
  }

  const displayName = String(formData.get("display_name") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const website = String(formData.get("website") || "").trim();
  const avatarUrl = String(formData.get("avatar_url") || "").trim();

  if (displayName.length < 2) {
    return { ok: false, error: "Please give a display name (at least 2 characters)." };
  }
  if (bio.length > 300) {
    return { ok: false, error: "Bio is too long — keep it under 300 characters." };
  }
  if (website && !/^https?:\/\//i.test(website)) {
    return { ok: false, error: "Website must start with http:// or https://." };
  }
  if (avatarUrl && !/^https?:\/\//i.test(avatarUrl)) {
    return { ok: false, error: "Avatar must be a link starting with http:// or https://." };
  }

  const { createServerSupabaseClient } = await import(
    "../../lib/supabase/server"
  );
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      bio: bio || null,
      website: website || null,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/profile");
  return { ok: true };
}
