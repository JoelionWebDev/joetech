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

  // Instagram Icon Component
  const InstagramIcon = () => (
    <svg
      className="h-7 w-7 lg:h-6 lg:w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12.017 0C8.396 0 7.989.013 6.747.072 5.507.13 4.668.33 3.953.63a5.88 5.88 0 0 0-2.134 1.39A5.88 5.88 0 0 0 .63 4.154C.33 4.868.13 5.707.072 6.947.013 8.188 0 8.595 0 12.017c0 3.424.013 3.83.072 5.071.058 1.24.258 2.079.558 2.793.307.789.718 1.459 1.389 2.13a5.88 5.88 0 0 0 2.134 1.389c.714.3 1.553.5 2.793.558 1.241.059 1.648.072 5.071.072 3.424 0 3.83-.013 5.071-.072 1.24-.058 2.079-.258 2.793-.558a5.88 5.88 0 0 0 2.13-1.389 5.88 5.88 0 0 0 1.389-2.13c.3-.714.5-1.553.558-2.793.059-1.241.072-1.648.072-5.071 0-3.422-.013-3.83-.072-5.071-.058-1.24-.258-2.079-.558-2.793a5.88 5.88 0 0 0-1.389-2.13A5.88 5.88 0 0 0 19.846.63C19.132.33 18.293.13 17.053.072 15.812.013 15.405 0 12.017 0zm0 2.161c3.379 0 3.781.014 5.104.072 1.231.056 1.898.264 2.343.437.589.23.998.503 1.432.937.434.434.707.843.937 1.432.173.445.381 1.112.437 2.343.058 1.323.072 1.725.072 5.104 0 3.379-.014 3.781-.072 5.104-.056 1.231-.264 1.898-.437 2.343a3.73 3.73 0 0 1-.937 1.432 3.73 3.73 0 0 1-1.432.937c-.445.173-1.112.381-2.343.437-1.323.058-1.725.072-5.104.072-3.379 0-3.781-.014-5.104-.072-1.231-.056-1.898-.264-2.343-.437a3.73 3.73 0 0 1-1.432-.937 3.73 3.73 0 0 1-.937-1.432c-.173-.445-.381-1.112-.437-2.343-.058-1.323-.072-1.725-.072-5.104 0-3.379.014-3.781.072-5.104.056-1.231.264-1.898.437-2.343.23-.589.503-.998.937-1.432a3.73 3.73 0 0 1 1.432-.937c.445-.173 1.112-.381 2.343-.437 1.323-.058 1.725-.072 5.104-.072z" />
      <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a3.838 3.838 0 1 1 0-7.676 3.838 3.838 0 0 1 0 7.676z" />
      <path d="M19.846 5.595a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://youtube.com/@joetech",
      icon: YouTubeIcon,
      ariaLabel: "Visit our YouTube channel",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/joetech",
      icon: LinkedInIcon,
      ariaLabel: "Visit our LinkedIn page",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/joetech",
      icon: FacebookIcon,
      ariaLabel: "Visit our Facebook page",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/joetech",
      icon: InstagramIcon,
      ariaLabel: "Visit our Instagram profile",
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
              <img src="/logo.jpeg" alt="missing logo" width="46px" />
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
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "block opacity-100 translate-y-0"
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
