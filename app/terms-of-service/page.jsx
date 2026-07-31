// app/terms-of-service/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern the use of Joetech's website and services, including web development, branding, and digital marketing.",
  keywords: ["Joetech terms of service", "terms and conditions Nigeria", "Joetech"],
  alternates: { canonical: "https://joetech.name.ng/terms-of-service" },
  openGraph: {
    type: "website",
    title: "Terms of Service | Joetech",
    description:
      "The terms and conditions that govern the use of Joetech's website and services, including web development, branding, and digital marketing.",
    url: "https://joetech.name.ng/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing this website or engaging Joetech for any service, you agree to be bound by these terms of service and all applicable laws and regulations. If you do not agree with any part of these terms, please do not use our website or services.",
    ],
  },
  {
    title: "2. Our Services",
    body: [
      "Joetech provides web development, mobile app development, branding, digital marketing, video production, and related technology services. Specific deliverables, timelines, and fees are agreed in writing for each project before work begins.",
    ],
  },
  {
    title: "3. Client Obligations",
    body: [
      "You agree to provide accurate information, timely feedback, and all materials needed to complete your project. Delays in providing content, approvals, or payments may affect project timelines, for which Joetech is not responsible.",
      "You confirm that you own or have the right to use any content, text, images, logos, and other materials you supply for your project.",
    ],
  },
  {
    title: "4. Payments",
    body: [
      "Project pricing is agreed before work begins. Unless otherwise agreed in writing, a deposit is required before work starts, with the balance due on completion. Payments are non-refundable once work has commenced and delivered to the agreed specification.",
    ],
  },
  {
    title: "5. Intellectual Property",
    body: [
      "Upon full payment for a project, ownership of the final deliverables created specifically for you transfers to you. Joetech retains ownership of its tools, frameworks, and pre-existing code, and the right to display completed work in its portfolio unless a confidentiality agreement states otherwise.",
      "All content on this website — including text, graphics, logos, and code — is the property of Joetech and may not be reproduced without our prior written consent.",
    ],
  },
  {
    title: "6. Warranties and Liability",
    body: [
      "We deliver our services with reasonable skill and care and aim to meet the agreed specification. However, we do not guarantee that every deliverable will be error-free or that our services will result in any specific business outcome, such as a particular level of sales or search rankings.",
      "To the maximum extent permitted by law, Joetech's liability for any claim arising from our services is limited to the amount paid to us for the specific project in question.",
    ],
  },
  {
    title: "7. Third-Party Services",
    body: [
      "Our projects may involve third-party platforms such as hosting providers, payment gateways, and domain registrars. Joetech is not responsible for the performance, availability, or policies of these third-party services.",
    ],
  },
  {
    title: "8. Termination",
    body: [
      "Either party may terminate a project agreement by written notice. In the event of termination, you are responsible for payment for all work completed up to the date of termination. Any provisions of these terms that by their nature should survive termination will do so.",
    ],
  },
  {
    title: "9. Governing Law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
    ],
  },
  {
    title: "10. Changes to These Terms",
    body: [
      "We may update these terms from time to time. The most recent version will always be available on this page, with the date of the latest update shown below. Continued use of our website or services after changes are posted constitutes acceptance of the updated terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: 31 July 2026
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These terms and conditions govern your use of the Joetech website
            at{" "}
            <span className="text-blue-600 dark:text-blue-400">
              joetech.name.ng
            </span>{" "}
            and your engagement of Joetech's services. Please read them
            carefully before using our website or commissioning our work.
          </p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {section.title}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Questions about these terms can be sent to{" "}
              <a
                href="mailto:joetechorg@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                joetechorg@gmail.com
              </a>{" "}
              or{" "}
              <a
                href="tel:+2348167099131"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                +234 816 709 9131
              </a>
              .
            </p>
          </section>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Contact Joetech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
