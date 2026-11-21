import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isSupabaseConfigured } from "./supabase/client";
import { createServerSupabaseClient } from "./supabase/server";

/**
 * Forum data layer.
 *
 * Two modes, one API:
 * - LIVE (Supabase env vars set): topics, replies and showcases come from
 *   the database and are written by the server actions.
 * - DEMO (Supabase not configured yet): topics and replies come from the
 *   seed Markdown files in content/forum/ and the showcases below. The
 *   forum is read-only and every page says so — nothing here is faked as
 *   real member activity: the seeds are starter discussions, labelled as
 *   such on the page.
 */

const FORUM_DIR = path.join(process.cwd(), "content", "forum");
const COMMENTS_DIR = path.join(FORUM_DIR, "comments");

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

/** Initials for the avatar circle, e.g. "Adaeze O." → "AO". */
export function initials(name) {
  return String(name || "J")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Starter showcases shown in demo mode (Joetech's own real builds). */
export const DEMO_SHOWCASES = [
  {
    id: "demo-shop",
    title: "Joetech Shops — storefront SaaS for Nigerian sellers",
    live_url: "https://online-store-joelionwebdevs-projects.vercel.app",
    stack: "Next.js · Supabase · Paystack",
    description:
      "A shop owner signs up and gets an online store in minutes — products, orders and Paystack payments included. Built by the Joetech team.",
    author_name: "Joetech team",
    created_at: "2026-11-19",
  },
  {
    id: "demo-greennest",
    title: "Greennest Hub — farm marketplace for Nigerian farmers",
    live_url: "https://www.greennesthub.com.ng",
    stack: "Next.js · Supabase",
    description:
      "Farmers list produce, buyers order on WhatsApp and pay the farmer directly. Built by the Joetech team.",
    author_name: "Joetech team",
    created_at: "2026-11-18",
  },
  {
    id: "demo-phantom",
    title: "De Phantom Continental Hotel Group",
    live_url: "https://www.dephantomhotelgroup.com",
    stack: "Next.js · Vercel",
    description:
      "Hotel group website with rooms, event halls and online booking enquiries. Built by the Joetech team.",
    author_name: "Joetech team",
    created_at: "2026-10-01",
  },
];

// ─── Demo mode: seed Markdown ──────────────────────────────────────────

function readDemoTopics() {
  if (!fs.existsSync(FORUM_DIR)) return [];
  return fs
    .readdirSync(FORUM_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(FORUM_DIR, f), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug || f.replace(/\.md$/, ""),
        title: data.title || "",
        body: content.trim(),
        category: data.category || "General",
        site_url: data.site_url || "",
        author_name: data.author || "Joetech team",
        author_location: data.location || "",
        author_id: null,
        solved: Boolean(data.solved),
        created_at: data.date || "",
        is_seed: true,
      };
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function readDemoReplies(topicSlug) {
  if (!fs.existsSync(COMMENTS_DIR)) return [];
  return fs
    .readdirSync(COMMENTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(COMMENTS_DIR, f), "utf8");
      const { data, content } = matter(raw);
      return {
        id: f.replace(/\.md$/, ""),
        topic_slug: data.topic || "",
        body: content.trim(),
        author_name: data.author || "Joetech team",
        author_location: data.location || "",
        author_id: null,
        is_solution: Boolean(data.is_solution),
        created_at: data.date || "",
        is_seed: true,
      };
    })
    .filter((r) => r.topic_slug === topicSlug)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}

// ─── Public API (same shape in both modes) ─────────────────────────────

/** @returns {Promise<Array>} topics with author + replyCount, newest first */
export async function getForumTopics({ category = "", search = "" } = {}) {
  let topics;
  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("forum_topics")
      .select(
        "*, author:profiles!forum_topics_author_id_fkey(display_name, avatar_url)",
      )
      .order("created_at", { ascending: false })
      .limit(100);
    if (error || !data) return [];
    const withCounts = await Promise.all(
      data.map(async (t) => {
        const { count } = await supabase
          .from("forum_replies")
          .select("*", { count: "exact", head: true })
          .eq("topic_id", t.id);
        return {
          ...t,
          slug: t.slug,
          author_name: t.author?.display_name || "Member",
          author_avatar: t.author?.avatar_url || "",
          replyCount: count || 0,
          is_seed: false,
        };
      }),
    );
    topics = withCounts;
  } else {
    const demo = readDemoTopics();
    topics = demo.map((t) => ({
      ...t,
      replyCount: readDemoReplies(t.slug).length,
    }));
  }

  if (category) {
    topics = topics.filter(
      (t) => t.category?.toLowerCase() === category.toLowerCase(),
    );
  }
  if (search) {
    const q = search.toLowerCase();
    topics = topics.filter(
      (t) =>
        t.title?.toLowerCase().includes(q) ||
        t.body?.toLowerCase().includes(q),
    );
  }
  return topics;
}

/** @returns {Promise<{ topic, replies } | null>} */
export async function getForumTopic(slug) {
  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const { data: topic, error } = await supabase
      .from("forum_topics")
      .select(
        "*, author:profiles!forum_topics_author_id_fkey(display_name, avatar_url)",
      )
      .eq("slug", slug)
      .maybeSingle();
    if (error || !topic) return null;
    const { data: replies } = await supabase
      .from("forum_replies")
      .select(
        "*, author:profiles!forum_replies_author_id_fkey(display_name, avatar_url)",
      )
      .eq("topic_id", topic.id)
      .order("created_at", { ascending: true });
    return {
      topic: {
        ...topic,
        author_name: topic.author?.display_name || "Member",
        author_avatar: topic.author?.avatar_url || "",
        is_seed: false,
      },
      replies: (replies || []).map((r) => ({
        ...r,
        author_name: r.author?.display_name || "Member",
        author_avatar: r.author?.avatar_url || "",
        is_seed: false,
      })),
    };
  }
  const topic = readDemoTopics().find((t) => t.slug === slug);
  if (!topic) return null;
  return { topic, replies: readDemoReplies(slug) };
}

/** @returns {Promise<Array>} showcases, newest first */
export async function getShowcases() {
  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("forum_showcases")
      .select(
        "*, author:profiles!forum_showcases_author_id_fkey(display_name)",
      )
      .order("created_at", { ascending: false })
      .limit(12);
    if (error || !data) return [];
    return data.map((s) => ({
      ...s,
      author_name: s.author?.display_name || "Member",
      is_seed: false,
    }));
  }
  return DEMO_SHOWCASES;
}

/** Reputation counts for a profile id (live) or a demo author name. */
export async function getProfileStats({ userId = null, authorName = null } = {}) {
  if (isSupabaseConfigured() && userId) {
    const supabase = await createServerSupabaseClient();
    const [{ count: questions }, { count: answers }, { count: solutions }] =
      await Promise.all([
        supabase
          .from("forum_topics")
          .select("*", { count: "exact", head: true })
          .eq("author_id", userId),
        supabase
          .from("forum_replies")
          .select("*", { count: "exact", head: true })
          .eq("author_id", userId),
        supabase
          .from("forum_replies")
          .select("*", { count: "exact", head: true })
          .eq("author_id", userId)
          .eq("is_solution", true),
      ]);
    return {
      questions: questions || 0,
      answers: answers || 0,
      solutions: solutions || 0,
    };
  }
  // Demo mode: stats for a seed author, counted from the seed files.
  if (authorName) {
    const topics = readDemoTopics().filter(
      (t) => t.author_name === authorName,
    ).length;
    const replies = fs.existsSync(COMMENTS_DIR)
      ? fs
          .readdirSync(COMMENTS_DIR)
          .filter((f) => f.endsWith(".md"))
          .map((f) => {
            const { data } = matter(
              fs.readFileSync(path.join(COMMENTS_DIR, f), "utf8"),
            );
            return data;
          })
          .filter((d) => d.author === authorName)
      : [];
    return {
      questions: topics,
      answers: replies.length,
      solutions: replies.filter((d) => d.is_solution).length,
    };
  }
  return { questions: 0, answers: 0, solutions: 0 };
}
