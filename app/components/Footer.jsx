import ClientButton from "../../components/ClientButton";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { name: "Home", href: "/", ariaLabel: "Go to Joetech homepage" },
  { name: "About", href: "/about", ariaLabel: "Learn more about Joetech company" },
  { name: "Services", href: "/services", ariaLabel: "Explore our tech services and solutions" },
  { name: "Projects", href: "/projects", ariaLabel: "View our portfolio and case studies" },
  { name: "Blog", href: "/blog", ariaLabel: "Read our latest insights and articles" },
  { name: "Contact", href: "/contact", ariaLabel: "Get in touch with Joetech team" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100094879577107",
    ariaLabel: "Follow Joetech on Facebook",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/joelionXpress",
    ariaLabel: "Follow Joetech on X (Twitter)",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/135138350",
    ariaLabel: "Connect with Joetech on LinkedIn",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/message/RKDWPWCNYQKTG1",
    ariaLabel: "Contact Joetech on WhatsApp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.93.51 3.82 1.48 5.48L2 22l4.75-1.55a9.86 9.86 0 005.29 1.53h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.77 14.1c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.12.08-1.8-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.09-4.85-4.3-.15-.2-1.16-1.54-1.16-2.94s.74-2.09 1-2.38c.26-.3.57-.37.77-.37h.55c.18 0 .42-.07.65.5.24.58.8 1.99.87 2.13.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.3.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.47 1.53.3.15.48.13.66-.08.18-.2.77-.9.98-1.21.2-.3.41-.25.69-.15.28.1 1.77.84 2.08.99.3.15.5.23.57.36.07.13.07.75-.17 1.43z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@joetechstudio",
    ariaLabel: "Subscribe to Joetech YouTube channel",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-300"
      role="contentinfo"
      aria-label="Joetech website footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Joe<span className="text-blue-400">tech</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Transforming businesses through innovative technology solutions.
                Your trusted partner for web development, digital marketing, and
                tech consulting.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="group w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      aria-label={link.ariaLabel}
                      className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 ease-out focus:outline-none focus:text-white focus:pl-2 focus:underline inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Our Location</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Tulip Heaven Gate, Opposite Hampton Lake Estate,
                    <br />
                    Chevron Alternative Route, Lekki, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Phone</h4>
                  <a href="tel:+2348167099131" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:text-blue-400 focus:underline" aria-label="Call Joetech at +234 816 709 9131">
                    +234 816 709 9131
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Email</h4>
                  <a href="mailto:joetechorg@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:text-blue-400 focus:underline">
                    joetechorg@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Business Hours</h4>
                  <p className="text-gray-400">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear}{" "}
              <span className="text-white font-medium">Joetech</span>. All
              rights reserved.
            </p>
            <nav aria-label="Footer legal navigation">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:text-white focus:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:text-white focus:underline">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:text-white focus:underline">
                    Sitemap
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <ClientButton
        scrollToTop
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 z-50"
        ariaLabel="Scroll back to top of page"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </ClientButton>
    </footer>
  );
};

export default Footer;
