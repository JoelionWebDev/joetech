import BusinessCardTool from "./BusinessCardTool";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Free Digital Business Card Maker for Nigerian Businesses | Joetech",
  description:
    "Create a free digital business card for your Nigerian business in minutes. Add your name, business and contact details, pick a theme, and download your card as a PNG or vCard — no sign-up needed.",
  keywords:
    "free digital business card maker Nigeria, digital business card, online business card maker, free business card generator, vCard maker Nigeria, QR code business card",
  alternates: {
    canonical: "https://joetech.name.ng/tools/digital-business-card",
  },
  openGraph: {
    title: "Free Digital Business Card Maker for Nigerian Businesses | Joetech",
    description:
      "Make a digital business card in minutes — free, no sign-up. Download it as a PNG or vCard and share it on WhatsApp, Instagram and email.",
    url: "https://joetech.name.ng/tools/digital-business-card",
    type: "website",
  },
};

export default function DigitalBusinessCardPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#060b18] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#060b18] to-indigo-900/40"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
          <a
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Free Tools
          </a>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            Free tool — no sign-up
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
            Free Digital Business Card Maker
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mt-6 leading-relaxed">
            Make a professional digital business card for your Nigerian
            business in minutes. Fill in your details, pick a theme, and
            download your card as an image or a vCard — ready to share on
            WhatsApp, Instagram and email.
          </p>
        </div>
      </section>

      <BusinessCardTool />

      {/* Joetech CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Want more than a card? Get a full brand.
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                A digital card is a great start. Joetech builds the website,
                logo and online presence that turn that first hello into a
                paying customer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:-translate-y-1"
                >
                  Talk to Joetech
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  See our services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
