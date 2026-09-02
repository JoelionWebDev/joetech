import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";
import DynamicChatWidget from "../components/chat/DynamicChatWidget";
import { PHONE_SCHEMA } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  verification: {
    google: "017dd4ca92c4e3ae",
  },
  title: {
    default:
      "Joetech — Web Dev, Branding & Digital Marketing Agency in Lagos, Nigeria",
    template: "%s | Joetech",
  },
  description:
    "Joetech is a web/app development, branding, and digital marketing agency based in Lekki, Lagos, Nigeria. We build, design, and promote your brand digitally.",
  keywords: [
    "web development Lagos",
    "digital marketing agency Nigeria",
    "branding agency Lagos",
    "Joetech",
    "app development Nigeria",
    "tech training AI",
    "Lekki digital agency",
  ],
  alternates: { canonical: "https://joetech.name.ng" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Joetech",
    title: "Joetech — We Build, Design & Promote Your Brand Digitally",
    description:
      "Web/app development, branding, and digital marketing agency based in Lekki, Lagos, Nigeria. We build, design, and promote your brand digitally.",
    url: "https://joetech.name.ng",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joetech — Web Dev, Branding & Digital Marketing Agency",
    description:
      "Web/app development, branding, and digital marketing agency based in Lekki, Lagos, Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const siteUrl = "https://joetech.name.ng";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Joetech",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Web/app development, branding, and digital marketing agency based in Lekki, Lagos, Nigeria.",
  foundingDate: "2019",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lekki Phase 1",
    addressLocality: "Lekki",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_SCHEMA,
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100094879577107",
    "https://www.youtube.com/@joetechstudio",
    "https://www.linkedin.com/in/igono-joel-88b680185/",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TKTH13W8EM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TKTH13W8EM');
          `}
        </Script>
        <meta name="monetag" content="6dcf449a7b1c18b13902530309563e88"></meta>
      </head>
      <script
        src="https://quge5.com/88/tag.min.js"
        data-zone="275492"
        async
        data-cfasync="false"
      ></script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <DynamicChatWidget />
      </body>
    </html>
  );
}
