# Joetech — Agency Website

Marketing site for Joetech, a web/app development, branding, and digital marketing agency based in Lekki, Lagos, Nigeria. Live at [joetech.name.ng](https://joetech.name.ng).

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS 4**
- **MDX blog** — 360+ articles in `content/blog/`, rendered with `next-mdx-remote`
- **Groq AI chat widget** (`llama-3.1-8b-instant`) with streaming responses and rate limiting
- **Resend** for contact form and newsletter email notifications

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file (see `.env.local` keys below):

| Variable         | Required for                        |
| ---------------- | ----------------------------------- |
| `GROQ_API_KEY`   | AI chat assistant (`/api/chat`)     |
| `RESEND_API_KEY` | Contact & newsletter APIs           |

Without keys, the site builds and runs fine — only the AI chat and email-sending APIs return errors.

## Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start dev server (Turbopack)             |
| `npm run build`  | Production build                         |
| `npm run start`  | Serve the production build               |
| `npm run lint`   | Run ESLint                               |

## Project Structure

```
app/                  # App Router pages & API routes
  api/chat/           # Groq-powered streaming AI chat
  api/contact/        # Contact form → Resend email
  api/newsletter/     # Newsletter signup → Resend email
  blog/[slug]/        # MDX blog posts (SSG)
components/           # Shared UI (chat widget, animations)
app/components/       # Page-level components (Navbar, Footer)
content/blog/         # MDX articles with frontmatter
lib/                  # Blog utilities, site constants, rate limiting
```

## Notes

- All routes use lowercase-hyphenated URLs; legacy mixed-case paths (`/Freelance`, `/learnTech`, `/tenAiTools`) 301-redirect via `next.config.mjs`.
- Security headers set globally in `next.config.mjs`.
- Blog posts live in `content/blog/*.mdx`; frontmatter supports `title`, `excerpt`, `publishDate`, `updatedDate`, `category`, `tags`, `coverImage`, and more.
