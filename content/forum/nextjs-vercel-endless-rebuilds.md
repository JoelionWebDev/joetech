---
title: "My Next.js site rebuilds on every Vercel deploy — how do I stop the endless deploys?"
slug: nextjs-vercel-endless-rebuilds
category: "Web Development"
author: "Chinedu E."
location: "Lagos"
date: "2026-11-18"
solved: true
---

Every time I push a small change to GitHub, Vercel starts a full rebuild and it takes almost 4 minutes. Sometimes it even deploys twice for one push. My site is a small business website — it should not take this long.

Here is my `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
```

Is there a setting I am missing, or is this normal for Vercel's free plan? I have about 40 pages, mostly static.
