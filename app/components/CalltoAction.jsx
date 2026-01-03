"use client";
import React from "react";

const CTABanner = () => {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background with gradient and pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/10 rounded-full blur-lg animate-pulse delay-500" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left max-w-4xl">
          {/* Main heading */}
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Take Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Business Online?
            </span>
          </h2>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
            Transform your business with cutting-edge technology solutions.
            Let's discuss how we can accelerate your digital transformation
            journey.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center md:justify-start">
            <button
              aria-label="Book a free consultation with Joetech to discuss your business needs"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              onClick={() => {
                window.open("https://wa.me/message/RKDWPWCNYQKTG1", "_blank");
              }}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <span className="relative flex items-center">
                Book a Free Consultation
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              {/* Ripple effect */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-white/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
              </div>
            </button>
          </div>

          {/* Optional: Additional micro-interaction elements */}
          <div className="hidden md:block absolute -right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 md:h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="text-white fill-current opacity-10"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTABanner;
