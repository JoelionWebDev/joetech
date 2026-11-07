import type { MetadataRoute } from "next";

// Web app manifest — makes joetech.name.ng installable as an app on
// visitors' phones (Add to Home Screen / Install app). Next.js serves this
// at /manifest.webmanifest and adds the <link rel="manifest"> tag itself.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joetech — Business Digital Branding",
    short_name: "Joetech",
    description:
      "Websites, graphics, advertising and apps for Nigerian businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#060b18",
    theme_color: "#060b18",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
