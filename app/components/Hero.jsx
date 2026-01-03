"use client";
import React, { useState, useEffect } from "react";

const JoetechHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* High-quality tech background image */}
      <div className="absolute inset-0">
        {/* Real background image - modern tech/coding setup */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-blue-900/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center lg:text-left max-w-5xl mx-auto lg:mx-0">
          {/* Main Headline - Clean and impactful */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-8 transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            We Build, Design &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-lg">
              Promote
            </span>
            <br className="hidden sm:block" />
            Your Brand{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Digitally
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg sm:text-xl lg:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 ease-out transform delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            From websites to apps, videos, ads to full brand strategy — Joetech
            is your all-in-one growth partner.
          </p>

          {/* CTA Buttons - Cleaner design */}
          <div
            className={`flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start transition-all duration-1000 ease-out transform delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Primary CTA - Get Started Today */}
            <button
              aria-label="Get started with Joetech today - scroll to contact form"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 overflow-hidden min-w-[240px]"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a Project
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Secondary CTA - View Our Work */}
            <button
              aria-label="View Joetech portfolio and previous work"
              className="group px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-900 hover:border-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 min-w-[220px]"
              onClick={() => (window.location.href = "/about")}
            >
              <span className="group-hover:text-blue-900 transition-colors duration-300 flex items-center justify-center gap-2">
                View Our Portfolio
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Trust indicators / Quick stats */}
          <div
            className={`mt-12 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center lg:justify-start transition-all duration-1000 ease-out delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                50+
              </div>
              <div className="text-sm text-gray-300">Projects Completed</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">
                24/7
              </div>
              <div className="text-sm text-gray-300">Support Available</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                100%
              </div>
              <div className="text-sm text-gray-300">Client Satisfaction</div>
            </div>
          </div>

          {/* Animated scroll indicator */}
          <div
            className={`mt-16 flex justify-center lg:justify-start transition-all duration-1000 ease-out delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-gray-300 text-sm mb-2 font-medium">
                Scroll to explore
              </span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-1/3 right-16 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-1/3 left-16 w-64 h-64 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full filter blur-3xl animate-pulse delay-1000 hidden lg:block" />

      {/* Subtle floating elements - less clutter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimalist floating dots */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${25 + i * 12}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}

        {/* Clean geometric shapes */}
        <div
          className="absolute top-20 right-20 w-32 h-32 border border-blue-400/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute bottom-32 left-20 w-24 h-24 border-2 border-cyan-400/20 rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default JoetechHero;
