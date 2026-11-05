import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import InvoiceTool from "./InvoiceTool";

export const metadata = {
  title: "Free Invoice, Receipt & Quotation Generator for Nigerian Businesses | Joetech",
  description:
    "Create professional quotes, invoices and receipts in Naira — free, no sign-up. Add your logo, set discounts and 7.5% VAT, then print to PDF or share on WhatsApp. Built by Joetech.",
  keywords:
    "free invoice generator Nigeria, free receipt generator Nigeria, free quotation generator Nigeria, invoice maker Naira, receipt maker Nigeria, Joetech",
  alternates: { canonical: "https://joetech.name.ng/tools/invoice-generator" },
  openGraph: {
    title: "Free Invoice, Receipt & Quotation Generator | Joetech",
    description:
      "Create quotes, invoices and receipts in Naira — free, no sign-up. Print to PDF or share on WhatsApp.",
    url: "https://joetech.name.ng/tools/invoice-generator",
  },
};

const steps = [
  {
    title: "Add your business",
    text: "Type in your business name, phone, email and address — and upload your logo so every document looks like yours.",
  },
  {
    title: "Add your client and items",
    text: "Add who the document is for, then list each item or service with its quantity and unit price in Naira.",
  },
  {
    title: "Set discount and VAT",
    text: "Add a discount as an amount or a percentage, and switch on 7.5% VAT if it applies. Totals update as you type.",
  },
  {
    title: "Print, copy or share",
    text: "Use Print / Download PDF to save it, copy the summary, or send it straight to your client on WhatsApp.",
  },
];

const faqs = [
  {
    q: "Is this invoice generator really free?",
    a: "Yes — free, with no sign-up and no account. Your documents are saved only in your own browser, and nothing you type is sent to a server.",
  },
  {
    q: "How do I download my invoice as a PDF?",
    a: "Click the “Print / Download PDF” button, then choose “Save as PDF” as the destination in your browser's print dialog. Only the document itself prints — the editor and the rest of the page are hidden.",
  },
  {
    q: "What is the difference between a quote, an invoice and a receipt?",
    a: "A quote is a price offer you send before work starts. An invoice is what you send when payment is due. A receipt confirms that payment has been received — switch to Receipt and the document gets a PAID stamp and a “Received with thanks” line.",
  },
  {
    q: "Where are my saved drafts stored?",
    a: "In this browser only, on this device. If you clear your browser data or switch to another device, your drafts will not follow you — so download the PDF to keep a copy.",
  },
];

export default function InvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-[#060b18]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-14 pt-32 sm:px-6 lg:px-8 print:hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Wrench className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Free Tools
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Free Invoice, Receipt &amp;
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Quotation Generator
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Professional quotes, invoices and receipts in Naira — free, no sign-up. Make one in
            minutes, then print it or share it on WhatsApp.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Free forever • No sign-up • Works in Naira
          </p>
        </div>
      </section>

      {/* Tool — light area */}
      <section className="bg-slate-100 pb-16 print:bg-white print:pb-0">
        <InvoiceTool />
      </section>

      {/* How to use + FAQ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 print:hidden">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">How to use it</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display mt-16 text-3xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-3xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-slate-500">
            Keep reading:{" "}
            <Link
              href="/blog/collect-payments-website-nigeria"
              className="font-semibold text-blue-700 hover:underline"
            >
              How to Collect Payments on Your Website in Nigeria
            </Link>
          </p>
        </div>
      </section>

      {/* Joetech CTA */}
      <section className="bg-[#060b18] px-4 pb-24 pt-4 sm:px-6 lg:px-8 print:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-12 text-center text-white lg:p-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Need a website, branding or an app for your business?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Joetech builds websites, graphics, advertising and apps for Nigerian businesses —
              and promotes them too. Tell us what you need and we will build it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore our services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
