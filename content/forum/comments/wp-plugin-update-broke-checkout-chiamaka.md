---
topic: wp-plugin-update-broke-checkout
author: "Chiamaka N."
location: "Port Harcourt"
date: "2026-11-28"
is_solution: false
---

Never update on the live site first — that is the lesson I learned the hard way too. Make a staging copy (most hosts give you one free), run the updates there one plugin at a time, and test the checkout with a real order before touching the live site. Take a full backup before every update round, UpdraftPlus does it in one click. And update the payment plugin last, never together with the others, so if something breaks you know exactly which one did it.
