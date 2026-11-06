import {
  QrCode,
  Contact,
  Receipt,
  Network,
  FileText,
  Link2Off,
  Gauge,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Free Business Tools for Nigerian Businesses | Joetech",
  description:
    "Free online tools for Nigerian small businesses: create QR codes, digital business cards, invoices, receipts and quotations in minutes. No sign-up, no cost.",
  keywords:
    "free business tools Nigeria, free QR code generator Nigeria, free invoice generator Nigeria, free receipt generator Nigeria, digital business card Nigeria, free quotation generator",
  alternates: { canonical: "https://joetech.name.ng/tools" },
  openGraph: {
    title: "Free Business Tools for Nigerian Businesses | Joetech",
    description:
      "Free online tools for Nigerian small businesses: QR codes, digital business cards, invoices, receipts and quotations. No sign-up, no cost.",
    url: "https://joetech.name.ng/tools",
  },
};

const liveTools = [
  {
    name: "Free QR Code Generator",
    href: "/tools/qr-code-generator",
    icon: <QrCode className="w-8 h-8" />,
    description:
      "Create a QR code for your website, menu, WhatsApp chat or payment link — download it and print it free.",
    guide: "/blog/qr-codes-small-business-nigeria",
    guideLabel: "Read the guide: QR codes for your small business",
  },
  {
    name: "Free Digital Business Card",
    href: "/tools/digital-business-card",
    icon: <Contact className="w-8 h-8" />,
    description:
      "Build a simple online business card with your name, what you do and how to reach you — share it with one link.",
  },
  {
    name: "Free Invoice, Receipt & Quotation Generator",
    href: "/tools/invoice-generator",
    icon: <Receipt className="w-8 h-8" />,
    description:
      "Create professional invoices, receipts and quotations in naira, with VAT and discounts — then download or share them.",
  },
  {
    name: "Free Sitemap Generator",
    href: "/tools/sitemap-generator",
    icon: <Network className="w-8 h-8" />,
    description:
      "Generate a sitemap for your website so Google can find and index your pages.",
    guide: "/blog/google-search-console-beginners-guide",
    guideLabel: "Read the guide: Google Search Console for beginners",
  },
  {
    name: "Free CV & Resume Builder",
    href: "/tools/cv-resume-builder",
    icon: <FileText className="w-8 h-8" />,
    description:
      "Build a clean, professional CV in minutes and download it ready to send.",
  },
  {
    name: "Free Broken Link & 404 Checker",
    href: "/tools/broken-link-checker",
    icon: <Link2Off className="w-8 h-8" />,
    description:
      "Find broken links and dead pages on your website before your visitors do.",
  },
];

const comingSoonTools = [
  {
    name: "Free Website Audit",
    icon: <Gauge className="w-8 h-8" />,
    description:
      "A quick check of your website's basics — speed, mobile-friendliness and the things Google looks for.",
  },
  {
    name: "Free Website Value Checker",
    icon: <TrendingUp className="w-8 h-8" />,
    description:
      "An honest estimate of what your website could be worth, with the method shown so you can see how it was calculated.",
  },
];

const steps = [
  {
    number: "1",
    title: "Pick a tool",
    description: "Choose the tool you need from the list below.",
  },
  {
    number: "2",
    title: "Fill in your details",
    description:
      "Type in your business name, prices or link — nothing is saved or uploaded.",
  },
  {
    number: "3",
    title: "Download or share",
    description:
      "Get your QR code, document or card and use it straight away.",
  },
];

const faqs = [
  {
    question: "Are these tools really free?",
    answer:
      "Yes. Every tool on this page is free to use, with no sign-up and no payment.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Open a tool, use it, and leave. We do not ask for your email or phone number to use the free tools.",
  },
  {
    question: "Is what I type into a tool private?",
    answer:
      "Yes. The tools run in your browser, so what you type stays on your device. Nothing you enter is sent to us or stored.",
  },
  {
    question: "Can Joetech build a custom tool for my business?",
    answer:
      "Yes. If you need a booking form, a calculator, a quote tool or anything else on your own website, talk to us — that is part of what we build.",
  },
];

export default function FreeToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#060b18] pt-16 lg:pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-indigo-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Free Tools by Joetech
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Free Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Free online tools for Nigerian small businesses. Create QR codes,
            business cards, invoices, receipts and quotations in minutes — no
            sign-up, no cost.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Available now */}
        <section className="py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available now
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These tools are ready to use today — free, with no account
              needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveTools.map((tool) => (
              <article
                key={tool.name}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-center mb-6">
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {tool.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>
                {tool.guide && (
                  <p className="text-sm mb-4">
                    <a
                      href={tool.guide}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {tool.guideLabel || "Read the guide"}
                    </a>
                  </p>
                )}
                <a
                  href={tool.href}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 mt-auto self-start"
                >
                  Open tool
                  <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Coming soon */}
        <section className="py-16 md:py-20 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Coming soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More free tools are on the way. These will be added here as
              soon as they are ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonTools.map((tool) => (
              <article
                key={tool.name}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gray-200 text-gray-500 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full">
                    Coming soon
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {tool.name}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {tool.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-20 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every tool works the same simple way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-bold flex items-center justify-center mx-auto mb-5">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions, answered
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100"
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 md:py-16 text-center text-white shadow-lg">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Need more than a free tool?
            </h2>
            <p className="text-lg opacity-95 max-w-2xl mx-auto mb-8 leading-relaxed">
              A free tool solves one job. If you need a full website,
              branding or advertising that brings customers in every day,
              that is what Joetech does.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/services"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                See our services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
