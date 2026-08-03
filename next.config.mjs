/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/building-personal-brand-tech",
        destination: "/blog/building-personal-brand-tech-professional",
        permanent: true,
      },
      {
        source: "/blog/payment-systems-web-app-integration",
        destination: "/blog/integrating-payment-systems-web-app-overview",
        permanent: true,
      },
      {
        source: "/blog/app-testing-qa-guide",
        destination: "/blog/app-testing-qa-why-app-isnt-ready",
        permanent: true,
      },
      {
        source: "/blog/building-saas-product-founders",
        destination: "/blog/building-saas-product-founders-guide",
        permanent: true,
      },
      {
        source: "/blog/complete-mobile-app-development-process",
        destination: "/blog/complete-mobile-app-development-process-explained",
        permanent: true,
      },
      {
        source: "/blog/website-vs-web-app-difference",
        destination: "/blog/website-vs-web-app-difference-business-owners",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
