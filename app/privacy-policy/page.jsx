// app/privacy-policy/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Joetech collects, uses, and protects your personal information when you visit our website or use our services.",
  keywords: ["Joetech privacy policy", "privacy policy Nigeria", "Joetech"],
  alternates: { canonical: "https://joetech.name.ng/privacy-policy" },
  openGraph: {
    type: "website",
    title: "Privacy Policy | Joetech",
    description:
      "How Joetech collects, uses, and protects your personal information when you visit our website or use our services.",
    url: "https://joetech.name.ng/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "We collect information you give us directly. This includes your name, email address, phone number, and any details you share when you fill in our contact form, request a quote, join our newsletter, or communicate with us through WhatsApp, email, or phone.",
      "We also collect limited technical information automatically, such as your browser type, device type, pages you visit, and how long you spend on our website. This helps us understand how visitors use the site and how we can improve it.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use the information you provide to respond to your enquiries, prepare quotes, deliver the services you request, and keep you informed about our work when you have asked to hear from us.",
      "Technical data is used to maintain and improve the performance, security, and user experience of our website. We do not sell your personal information to anyone.",
    ],
  },
  {
    title: "3. Cookies",
    body: [
      "Our website may use cookies and similar technologies to remember your preferences, understand how the site is used, and improve your experience. You can disable cookies in your browser settings at any time, though some parts of the site may then not work as smoothly.",
    ],
  },
  {
    title: "4. Data Sharing and Third Parties",
    body: [
      "We do not sell or rent your personal information. We only share data with trusted third parties who help us run our business — for example, email services, analytics providers, and payment processors — and only to the extent needed to provide our services.",
      "Where third parties process data on our behalf, they are expected to protect it to standards consistent with this policy.",
    ],
  },
  {
    title: "5. Data Security",
    body: [
      "We take reasonable technical and organisational measures to protect your personal information against loss, misuse, and unauthorised access. No method of transmission over the internet is completely secure, and while we work to protect your data, we cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "You have the right to access, correct, or request the deletion of the personal information we hold about you. You can also object to or restrict certain processing, and you may withdraw any consent you have given at any time.",
      "To exercise any of these rights, contact us using the details below. We will respond within a reasonable period.",
    ],
  },
  {
    title: "7. Changes to This Policy",
    body: [
      "We may update this privacy policy from time to time to reflect changes in our practices, technology, or legal requirements. The most recent version will always be available on this page, with the date of the latest update shown below.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: 31 July 2026
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Joetech ("we", "us", or "our") operates the website{" "}
            <span className="text-blue-600 dark:text-blue-400">
              joetech.name.ng
            </span>
            . This policy explains what personal information we collect, why we
            collect it, and how we protect it. By using our website or services,
            you agree to the practices described in this policy.
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
              8. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this privacy policy or how we
              handle your information, contact us at{" "}
              <a
                href="mailto:joetechorg@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                joetechorg@gmail.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+2348167099131"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                +234 816 709 9131
              </a>
              . Our office is located at Tulip Heaven Gate, Opposite Hampton
              Lake Estate, Chevron Alternative Route, Lekki, Lagos, Nigeria.
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
