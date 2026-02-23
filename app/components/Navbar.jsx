"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Learn Tech", href: "/learnTech" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  // YouTube Icon Component
  const YouTubeIcon = () => (
    <svg
      className="h-7 w-7 lg:h-6 lg:w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );

  // LinkedIn Icon Component
  const LinkedInIcon = () => (
    <svg
      className="h-7 w-7 lg:h-6 lg:w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  // Facebook Icon Component
  const FacebookIcon = () => (
    <svg
      className="h-7 w-7 lg:h-6 lg:w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  // whatsapp Icon Component
  const WhatsappIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.93.51 3.82 1.48 5.48L2 22l4.75-1.55a9.86 9.86 0 005.29 1.53h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.77 14.1c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.12.08-1.8-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.09-4.85-4.3-.15-.2-1.16-1.54-1.16-2.94s.74-2.09 1-2.38c.26-.3.57-.37.77-.37h.55c.18 0 .42-.07.65.5.24.58.8 1.99.87 2.13.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.3.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.47 1.53.3.15.48.13.66-.08.18-.2.77-.9.98-1.21.2-.3.41-.25.69-.15.28.1 1.77.84 2.08.99.3.15.5.23.57.36.07.13.07.75-.17 1.43z" />
    </svg>
  );
  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@joetechstudio",
      icon: YouTubeIcon,
      ariaLabel: "Visit our YouTube channel",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/igono-joel-88b680185/",
      icon: LinkedInIcon,
      ariaLabel: "Visit our LinkedIn page",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100094879577107",
      icon: FacebookIcon,
      ariaLabel: "Visit our Facebook page",
    },
    {
      name: "Whatsapp",
      href: "https://wa.me/message/RKDWPWCNYQKTG1",
      icon: WhatsappIcon,
      ariaLabel: "Visit our Whatsapp profile",
    },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Joetech homepage"
            >
              <img src="/logo.png" alt="missing logo" width="46px" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.ariaLabel}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ?
                <X className="block h-6 w-6" />
              : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ?
            "block opacity-100 translate-y-0"
          : "hidden opacity-0 -translate-y-4"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg">
          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Social Icons - Only visible when menu is open */}
          {isMenuOpen && (
            <div className="flex items-center justify-center space-x-6 pt-4 pb-2 border-t border-gray-100 mt-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.ariaLabel}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-blue-50 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
