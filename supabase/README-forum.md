# Joetech Forum — setup guide

The forum at `/forum` works in two modes:

- **Preview mode (now):** no Supabase configured. Everyone can read the 8
  starter discussions and the "Show your build" section. Sign-in, posting,
  replying and showcasing show a clear "not set up yet" note. Nothing is
  faked — the starter discussions are labelled as such.
- **Live mode:** after the steps below, members sign up (email + password
  or magic link), ask questions, reply, mark solutions and show builds.
  The same Supabase Auth method is used for the Greennest Hub forum, so
  the steps are identical there.

## 1. Create the Supabase project (easiest way — Vercel integration)

1. Open the **joetech** project in Vercel → **Integrations** → find
   **Supabase** → **Add Integration** (or create the project at
   supabase.com and connect it — same result).
2. Vercel adds the env vars to the project automatically. If you create
   the project on supabase.com instead, add these two in Vercel →
   **Settings → Environment Variables** (Production + Preview):
   - `NEXT_PUBLIC_SUPABASE_URL` — from Supabase → Settings → API → Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase → Settings → API → anon public key
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so the new env vars
   reach the live site.

No service-role key is needed in the app — everything runs through the
anon key + row-level security.

## 2. Run the schema

In Supabase → **SQL Editor** → **New query**, paste the whole of
`supabase/forum-schema.sql` and run it. It creates:

- `profiles` (one row per auth user, auto-created on sign-up)
- `forum_topics`, `forum_replies`, `forum_showcases`
- the `handle_new_user()` trigger
- RLS policies: public read; members write only their own rows; admins
  can moderate/delete anything

Optional: run `supabase/seed.sql` afterwards for 3 starter topics, 2
solved replies and 2 showcases so the forum does not open empty. The
seed rows are labelled "sample" and can be deleted any time from the
Table Editor.

## 3. Allow sign-ups + set the email sender

- Supabase → **Authentication → Providers → Email**: make sure Email is
  **enabled**. Leave "Confirm email" **ON** (members confirm by clicking
  the link — the forum handles the callback at `/auth/callback`).
- Supabase → **Authentication → URL Configuration**: set **Site URL** to
  `https://joetech360.ng` and add `https://joetech360.ng/auth/callback`
  to **Redirect URLs**. (Without this, magic links and confirmation
  emails bounce back to localhost.)
- Optional: in **Authentication → Email Templates**, change the sender
  name to "Joetech Forum". Custom SMTP is optional — Supabase's default
  mail works for getting started (it has a daily sending limit).

## 4. Make Joel an admin

1. Sign up on the live site at `https://joetech360.ng/auth/signup` with
   `info@joetech360.ng` (any password you choose) and confirm the email.
2. In Supabase → **SQL Editor**, run:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'info@joetech360.ng');
```

3. Verify:

```sql
select u.email, p.role from auth.users u
join public.profiles p on p.id = u.id
where u.email = 'info@joetech360.ng';
```

Admins can mark any solution and delete any topic/reply/showcase
(the moderation buttons check the `admin` role).

## 5. Check it works

1. Open `https://joetech360.ng/forum` — the preview banner should be gone.
2. Sign up with a second (test) email, confirm, and post a question.
3. Reply to it from the first account, then mark the reply as the
   solution — it should jump to the top in green.
4. Add a build in "Show your build" and check it appears.

## Same method on Greennest Hub

The Greennest forum uses the same files with farming categories: run the
equivalent schema in Greennest's Supabase project, set the same two env
vars in its Vercel project, and set its Site URL to
`https://www.greennesthub.com.ng`. One Supabase project per site — do
not share a project between the two sites.

## Files

- `supabase/forum-schema.sql` — tables, trigger, RLS, admin helper
- `supabase/seed.sql` — optional starter content (sample, labelled)
- `lib/forum.js` — data layer (live Supabase or demo seed Markdown)
- `lib/supabase/client.js` / `lib/supabase/server.js` — clients
- `middleware.js` — refreshes the auth session on every request
- `app/auth/*` — login, signup, callback, logout
- `app/profile/*` — own profile + public member profiles
- `app/forum/*` — list, topic, new question, server actions
- `content/forum/` — seed topics + replies (demo mode only)
