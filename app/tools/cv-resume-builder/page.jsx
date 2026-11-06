import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import CvBuilder from "./CvBuilder";

export const metadata = {
  title: "Free CV & Resume Builder for Nigerian Job Seekers | Joetech",
  description:
    "Build a clean, professional CV in minutes — add your details, work experience, education and skills, then print it as a PDF or copy it as plain text. Free, no sign-up. A free tool from Joetech, Lekki, Lagos.",
  keywords:
    "free CV builder Nigeria, free resume builder Nigeria, CV maker Lagos, build CV online Nigeria, resume template Nigeria, job seeker CV builder",
  alternates: {
    canonical: "https://joetech.name.ng/tools/cv-resume-builder",
  },
  openGraph: {
    title: "Free CV & Resume Builder | Joetech",
    description:
      "Build a professional CV in minutes — print it as a PDF or copy it as plain text. Free, no sign-up.",
    url: "https://joetech.name.ng/tools/cv-resume-builder",
    type: "website",
  },
};

export default function CvResumeBuilderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#060b18] pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden print:hidden">
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
              <li className="text-white font-medium">CV & Resume Builder</li>
            </ol>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300 text-xs font-medium tracking-wide uppercase">
              Free Tools · No sign-up
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Free CV &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Resume Builder
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Build a clean, professional CV in minutes. Add your details, work
            experience, education and skills — then print it as a PDF or copy
            it as plain text to paste anywhere.
          </p>
        </div>
      </section>

      {/* Tool */}
      <main className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0 print:py-0">
        <div className="max-w-6xl mx-auto print:max-w-none">
          <CvBuilder />
        </div>
      </main>

      {/* Joetech CTA */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Need more than a CV?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
                A CV gets you the interview — make sure your online presence
                backs it up. Joetech builds websites, branding and ads that
                make people take you seriously.
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
