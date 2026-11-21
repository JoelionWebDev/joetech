-- ============================================================================
-- Joetech Forum — seed data (OPTIONAL, run after forum-schema.sql)
-- Starter discussions so the forum does not open empty. These are SAMPLE
-- discussions, clearly labelled "Starter discussion" on the site — not
-- real members. Delete them any time from the Supabase Table Editor, or
-- leave them; real member questions will sit above them (newest first).
--
-- The three seed profiles use fixed demo UUIDs. Real members get real
-- auth UUIDs from the sign-up trigger and are never mixed with these.
-- ============================================================================

insert into public.profiles (id, display_name, bio, role) values
  ('11111111-1111-1111-1111-111111111111', 'Adaeze O. (sample)', 'Sample member — starter discussion.', 'user'),
  ('22222222-2222-2222-2222-222222222222', 'Chinedu E. (sample)', 'Sample member — starter discussion.', 'user'),
  ('33333333-3333-3333-3333-333333333333', 'Tunde A. (sample)', 'Sample member — starter discussion.', 'user')
on conflict (id) do nothing;

insert into public.forum_topics (slug, title, body, category, author_id, solved, created_at) values
  ('nextjs-vercel-endless-rebuilds',
   'My Next.js site rebuilds on every Vercel deploy — how do I stop the endless deploys?',
   'Every time I push a small change to GitHub, Vercel starts a full rebuild and it takes almost 4 minutes. Sometimes it even deploys twice for one push. My site is a small business website — it should not take this long. Is there a setting I am missing, or is this normal for Vercel''s free plan?',
   'Web Development', '22222222-2222-2222-2222-222222222222', true, '2026-11-18'),
  ('wordpress-slow-nigerian-mobile-networks',
   'My WordPress site loads slowly on Nigerian mobile networks — where do I start?',
   'I run a small fashion shop on WordPress and most of my customers visit on their phones with MTN or Glo data. The homepage takes almost 9 seconds to load. I already removed a few heavy images. What should I check next — caching plugin, hosting, the theme?',
   'SEO & Growth', '11111111-1111-1111-1111-111111111111', false, '2026-11-17'),
  ('rank-lagos-business-google-without-ads',
   'How do I rank a Lagos business on Google without paying for ads?',
   'I opened a small electronics shop in Ikeja and built a simple website, but when I search "electronics shop Ikeja" on Google, my site is nowhere. I have a Google Business Profile already. What actually moves a small business up — blog posts, reviews, or something else?',
   'SEO & Growth', '33333333-3333-3333-3333-333333333333', true, '2026-11-16')
on conflict (slug) do nothing;

-- One solved reply per solved seed topic (ids looked up by slug).
-- Guarded with NOT EXISTS so the file can be run twice safely.
insert into public.forum_replies (topic_id, author_id, body, is_solution, created_at)
select t.id, '11111111-1111-1111-1111-111111111111',
  'The double deploy is usually the GitHub integration firing twice — check Vercel → Settings → Git and make sure "Production Branch" is set to main only. For the 4-minute builds, check your build logs for the slowest step; in my case image optimisation was the culprit.',
  true, '2026-11-18'
from public.forum_topics t where t.slug = 'nextjs-vercel-endless-rebuilds'
and not exists (
  select 1 from public.forum_replies r
  where r.topic_id = t.id and r.is_solution = true
);

insert into public.forum_replies (topic_id, author_id, body, is_solution, created_at)
select t.id, '22222222-2222-2222-2222-222222222222',
  'Reviews first, then content. Ask every happy customer for a Google review — businesses with 20+ recent reviews outrank bigger sites for "near me" searches. Then write one useful page per service people search for.',
  true, '2026-11-16'
from public.forum_topics t where t.slug = 'rank-lagos-business-google-without-ads'
and not exists (
  select 1 from public.forum_replies r
  where r.topic_id = t.id and r.is_solution = true
);

-- Starter showcases: Joetech's own real builds.
insert into public.forum_showcases (title, live_url, stack, description, author_id, created_at)
select 'Joetech Shops — storefront SaaS for Nigerian sellers',
  'https://online-store-joelionwebdevs-projects.vercel.app',
  'Next.js · Supabase · Paystack',
  'A shop owner signs up and gets an online store in minutes — products, orders and Paystack payments included. Built by the Joetech team.',
  '11111111-1111-1111-1111-111111111111', '2026-11-19'
where not exists (
  select 1 from public.forum_showcases
  where live_url = 'https://online-store-joelionwebdevs-projects.vercel.app'
);

insert into public.forum_showcases (title, live_url, stack, description, author_id, created_at)
select 'Greennest Hub — farm marketplace for Nigerian farmers',
  'https://www.greennesthub.com.ng',
  'Next.js · Supabase',
  'Farmers list produce, buyers order on WhatsApp and pay the farmer directly. Built by the Joetech team.',
  '11111111-1111-1111-1111-111111111111', '2026-11-18'
where not exists (
  select 1 from public.forum_showcases
  where live_url = 'https://www.greennesthub.com.ng'
);
