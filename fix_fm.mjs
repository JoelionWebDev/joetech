const fs = require("fs");
const path = require("path");

const fixFiles = [
  "ai-agents-explained-automating-business-tasks.mdx",
  "building-saas-product-founders-guide.mdx",
  "cloud-computing-explained-what-it-means.mdx",
  "integrating-payment-systems-web-app-overview.mdx",
  "local-seo-2026-rank-near-me-lagos.mdx",
  "marketing-analytics-101-five-numbers-monthly.mdx",
  "native-vs-hybrid-vs-cross-platform-apps-comparison.mdx",
  "no-code-freelancing-income-without-coding.mdx",
  "repurposing-one-video-into-ten-pieces.mdx",
  "whatsapp-marketing-funnels-chats-into-customers.mdx",
];

for (const f of fixFiles) {
  const fp = path.join("content/blog", f);
  let src = fs.readFileSync(fp, "utf8");
  const separator = "---\n";
  const secondSep = src.indexOf(separator, separator.length);
  if (secondSep === -1) continue;
  const before = src.slice(0, secondSep + separator.length);
  let after = src.slice(secondSep + separator.length);
  while (after.length > 0 && after[0] !== "\n") {
    after = after.slice(1);
  }
  fs.writeFileSync(fp, before + after, "utf8");
  console.log("Fixed:", f);
}