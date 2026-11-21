"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "../../lib/supabase/client";
import {
  createServerSupabaseClient,
  getSessionUser,
} from "../../lib/supabase/server";
import { slugify } from "../../lib/forum";
import { FORUM_CATEGORIES } from "../../lib/forum-categories";

function notLive() {
  return {
    ok: false,
    error:
      "Sign-in is not set up yet — the forum is in preview mode. Posting opens once the login system is connected.",
  };
}

/**
 * Ask a question. Signed-in members only.
 * Body supports Markdown (code blocks render in styled <pre>).
 */
export async function postTopicAction(prevState, formData) {
  if (!isSupabaseConfigured()) return notLive();
  const { user } = await getSessionUser();
  if (!user) {
    return { ok: false, error: "Please sign in to ask a question." };
  }

  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const siteUrl = String(formData.get("site_url") || "").trim();

  if (title.length < 5) {
    return { ok: false, error: "Give your question a title (at least 5 characters)." };
  }
  if (title.length > 150) {
    return { ok: false, error: "Title is too long — keep it under 150 characters." };
  }
  if (body.length < 20) {
    return { ok: false, error: "Describe the problem in at least 20 characters — code snippets help." };
  }
  if (!FORUM_CATEGORIES.includes(category)) {
    return { ok: false, error: "Please choose a category." };
  }
  if (siteUrl && !/^https?:\/\//i.test(siteUrl)) {
    return { ok: false, error: "The site link must start with http:// or https://." };
  }

  const supabase = await createServerSupabaseClient();
  let slug = slugify(title) || `question-${Date.now()}`;
  // Keep slugs unique.
  const { data: clash } = await supabase
    .from("forum_topics")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const { error } = await supabase.from("forum_topics").insert({
    slug,
    title,
    body,
    category,
    site_url: siteUrl || null,
    author_id: user.id,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/forum");
  redirect(`/forum/${slug}`);
}

/** Reply to a question. Signed-in members only. */
export async function postReplyAction(prevState, formData) {
  if (!isSupabaseConfigured()) return notLive();
  const { user } = await getSessionUser();
  if (!user) {
    return { ok: false, error: "Please sign in to reply." };
  }

  const topicId = String(formData.get("topic_id") || "");
  const topicSlug = String(formData.get("topic_slug") || "");
  const body = String(formData.get("body") || "").trim();

  if (!topicId || !topicSlug) {
    return { ok: false, error: "That question could not be found." };
  }
  if (body.length < 5) {
    return { ok: false, error: "Write a reply first (at least 5 characters)." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("forum_replies").insert({
    topic_id: topicId,
    author_id: user.id,
    body,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath(`/forum/${topicSlug}`);
  return { ok: true };
}

/**
 * Mark a reply as the Solution. Only the question's author (or an admin)
 * can do this. The solution is shown highlighted at the top of the replies.
 */
export async function markSolutionAction(prevState, formData) {
  if (!isSupabaseConfigured()) return notLive();
  const { user, profile } = await getSessionUser();
  if (!user) {
    return { ok: false, error: "Please sign in first." };
  }

  const topicId = String(formData.get("topic_id") || "");
  const topicSlug = String(formData.get("topic_slug") || "");
  const replyId = String(formData.get("reply_id") || "");
  if (!topicId || !replyId) {
    return { ok: false, error: "That reply could not be found." };
  }

  const supabase = await createServerSupabaseClient();
  const { data: topic } = await supabase
    .from("forum_topics")
    .select("author_id")
    .eq("id", topicId)
    .maybeSingle();
  const isAuthor = topic?.author_id === user.id;
  const isAdmin = profile?.role === "admin";
  if (!isAuthor && !isAdmin) {
    return { ok: false, error: "Only the person who asked can mark a solution." };
  }

  // Clear any earlier solution on this question, then set the new one.
  await supabase
    .from("forum_replies")
    .update({ is_solution: false })
    .eq("topic_id", topicId)
    .eq("is_solution", true);
  const { error } = await supabase
    .from("forum_replies")
    .update({ is_solution: true })
    .eq("id", replyId)
    .eq("topic_id", topicId);
  if (error) {
    return { ok: false, error: error.message };
  }
  await supabase
    .from("forum_topics")
    .update({ solved: true })
    .eq("id", topicId);
  revalidatePath(`/forum/${topicSlug}`);
  return { ok: true };
}

/** Share a project in "Show your build". Signed-in members only. */
export async function postShowcaseAction(prevState, formData) {
  if (!isSupabaseConfigured()) return notLive();
  const { user } = await getSessionUser();
  if (!user) {
    return { ok: false, error: "Please sign in to show your build." };
  }

  const title = String(formData.get("title") || "").trim();
  const liveUrl = String(formData.get("live_url") || "").trim();
  const stack = String(formData.get("stack") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (title.length < 3) {
    return { ok: false, error: "Give your project a name." };
  }
  if (!liveUrl || !/^https?:\/\//i.test(liveUrl)) {
    return { ok: false, error: "Add a live link starting with http:// or https://." };
  }
  if (description.length < 20) {
    return { ok: false, error: "Say a little about the project (at least 20 characters)." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("forum_showcases").insert({
    title,
    live_url: liveUrl,
    stack: stack || null,
    description,
    author_id: user.id,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/forum");
  return { ok: true };
}
