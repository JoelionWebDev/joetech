-- ============================================================================
-- Joetech Forum — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- It creates the profiles + forum tables, the auto-profile trigger, and
-- row-level security (RLS) so members can only change their own rows.
-- The same pattern is used for the Greennest Hub forum, so Joel only has
-- to learn it once.
-- ============================================================================

-- Profiles: one row per auth user. Created automatically by the trigger
-- below when someone signs up.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  bio text,
  website text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Forum questions.
create table if not exists public.forum_topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  category text not null,
  site_url text,
  author_id uuid not null references public.profiles (id) on delete cascade,
  solved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Replies to questions. is_solution marks the reply the asker picked.
create table if not exists public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.forum_topics (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  is_solution boolean not null default false,
  created_at timestamptz not null default now()
);

-- "Show your build" showcase entries.
create table if not exists public.forum_showcases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  live_url text not null,
  stack text,
  description text not null,
  author_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Indexes for the list + topic pages.
create index if not exists forum_topics_created_at_idx
  on public.forum_topics (created_at desc);
create index if not exists forum_topics_slug_idx
  on public.forum_topics (slug);
create index if not exists forum_topics_category_idx
  on public.forum_topics (category);
create index if not exists forum_replies_topic_idx
  on public.forum_replies (topic_id, created_at);
create index if not exists forum_showcases_created_at_idx
  on public.forum_showcases (created_at desc);

-- ============================================================================
-- Auto-create a profile row when a user signs up.
-- The display name comes from the sign-up form (auth metadata).
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- Row-level security.
-- Everyone (including guests) can READ. Only signed-in members can write,
-- and only their own rows. Admins can moderate/delete anything.
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.forum_topics enable row level security;
alter table public.forum_replies enable row level security;
alter table public.forum_showcases enable row level security;

-- Helper: true when the signed-in user is an admin.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Profiles: public read; a member updates only their own row.
drop policy if exists "profiles: public read" on public.profiles;
create policy "profiles: public read"
  on public.profiles for select using (true);

drop policy if exists "profiles: own update" on public.profiles;
create policy "profiles: own update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Topics: public read; signed-in members insert; author or admin updates/deletes.
drop policy if exists "topics: public read" on public.forum_topics;
create policy "topics: public read"
  on public.forum_topics for select using (true);

drop policy if exists "topics: member insert" on public.forum_topics;
create policy "topics: member insert"
  on public.forum_topics for insert
  with check (auth.uid() = author_id);

drop policy if exists "topics: author or admin update" on public.forum_topics;
create policy "topics: author or admin update"
  on public.forum_topics for update
  using (auth.uid() = author_id or public.is_admin())
  with check (auth.uid() = author_id or public.is_admin());

drop policy if exists "topics: author or admin delete" on public.forum_topics;
create policy "topics: author or admin delete"
  on public.forum_topics for delete
  using (auth.uid() = author_id or public.is_admin());

-- Replies: same pattern as topics.
drop policy if exists "replies: public read" on public.forum_replies;
create policy "replies: public read"
  on public.forum_replies for select using (true);

drop policy if exists "replies: member insert" on public.forum_replies;
create policy "replies: member insert"
  on public.forum_replies for insert
  with check (auth.uid() = author_id);

drop policy if exists "replies: author or admin update" on public.forum_replies;
create policy "replies: author or admin update"
  on public.forum_replies for update
  using (auth.uid() = author_id or public.is_admin())
  with check (auth.uid() = author_id or public.is_admin());

drop policy if exists "replies: author or admin delete" on public.forum_replies;
create policy "replies: author or admin delete"
  on public.forum_replies for delete
  using (auth.uid() = author_id or public.is_admin());

-- Showcases: same pattern as topics.
drop policy if exists "showcases: public read" on public.forum_showcases;
create policy "showcases: public read"
  on public.forum_showcases for select using (true);

drop policy if exists "showcases: member insert" on public.forum_showcases;
create policy "showcases: member insert"
  on public.forum_showcases for insert
  with check (auth.uid() = author_id);

drop policy if exists "showcases: author or admin update" on public.forum_showcases;
create policy "showcases: author or admin update"
  on public.forum_showcases for update
  using (auth.uid() = author_id or public.is_admin())
  with check (auth.uid() = author_id or public.is_admin());

drop policy if exists "showcases: author or admin delete" on public.forum_showcases;
create policy "showcases: author or admin delete"
  on public.forum_showcases for delete
  using (auth.uid() = author_id or public.is_admin());

-- ============================================================================
-- Make Joel an admin (run AFTER he signs up with info@joetech360.ng):
--
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'info@joetech360.ng');
--
-- Verify with:
--   select email, role from auth.users
--   join public.profiles on profiles.id = users.id
--   where email = 'info@joetech360.ng';
-- ============================================================================
