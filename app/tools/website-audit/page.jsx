import { ArrowRight, ChevronRight, Gauge } from "lucide-react";
import WebsiteAuditTool from "./WebsiteAuditTool";

export const metadata = {
  title: "Free Website Audit Tool for Nigerian Businesses | Joetech",
  description:
    "Check your website for free: speed, mobile-friendliness, page titles, images and links — with a clear score and plain-English fixes. No sign-up. A free tool from Joetech, Lekki, Lagos.",
  keywords:
    "free website audit Nigeria, website checker Nigeria, audit my website free, website speed test Nigeria, check website SEO free, free website audit tool Lagos",
  alternates: {
    canonical: "https://joetech.name.ng/tools/website-audit",
  },
  openGraph: {
    title: "Free Website Audit Tool | Joetech",
    description:
      "Check your website for free — speed, mobile-friendliness and the things Google looks for, with a clear score and plain-English fixes. No sign-up.",
    url: "https://joetech.name.ng/tools/website-audit",
    type: "website",
  },
};

export default function WebsiteAuditPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#060b18] pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li>
                <a
                  href="/tools"
                  className="hover:text-white transition-colors"
                >
                  Free Tools
                </a>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li className="text-white font-medium">Website Audit</li>
            </ol>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <Gauge className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300 text-xs font-medium tracking-wide uppercase">
              Free Tools · No sign-up
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Free Website{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Audit
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Enter your website address and get a clear score out of 100 —
            speed, mobile-friendliness and the things Google looks for, with
            plain-English fixes for everything that needs work.
          </p>
        </div>
      </section>

      {/* Tool */}
      <main className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <WebsiteAuditTool />
        </div>
      </main>

      {/* Joetech CTA */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                An audit shows the problems — a good website fixes them
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Joetech builds fast, search-friendly websites for Nigerian
                businesses — so the traffic you already get actually turns
                into customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                >
                  Talk to Joetech
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
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
