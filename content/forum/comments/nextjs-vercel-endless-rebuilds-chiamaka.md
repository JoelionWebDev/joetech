---
topic: nextjs-vercel-endless-rebuilds
author: "Chiamaka N."
location: "Port Harcourt"
date: "2026-11-26"
is_solution: false
---

If the build itself is slow, look at the images first. I had a client upload 3MB photos and the build spent most of its time optimising them. Compressing the images cut the build from 4 minutes to under 90 seconds.
