"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Users,
  Code,
  Palette,
  Video,
  TrendingUp,
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const strengthItems = [
    {
      icon: <Code className="w-5 h-5 text-blue-600" />,
      text: "Expertise in modern web & app development with cutting-edge technologies",
    },
    {
      icon: <Palette className="w-5 h-5 text-blue-600" />,
      text: "Creative branding and visual design that makes your business stand out",
    },
    {
      icon: <Video className="w-5 h-5 text-blue-600" />,
      text: "Professional video production & editing for compelling storytelling",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      text: "Strategic digital marketing campaigns that drive measurable results",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50"
      aria-labelledby="about-joetech-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="about-joetech-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            About <span className="text-blue-600">Joetech</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one partner for business growth in the digital age.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ?
                "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
              <img
                src="joelion2.jpg"
                alt="Diverse team of professionals collaborating on digital solutions at Joetech, representing teamwork, creativity, and modern technology expertise"
                className="w-full h-80 md:h-96 object-cover"
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">
                    Expert Team
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`space-y-8 transition-all duration-700 delay-300 ${
              isVisible ?
                "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
            }`}
          >
            {/* Introduction Paragraph */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Joetech, we transform ambitious ideas into digital reality.
                As a comprehensive tech solutions provider, we specialize in{" "}
                <strong className="text-gray-900">web development</strong>,
                innovative <strong className="text-gray-900">branding</strong>,
                professional{" "}
                <strong className="text-gray-900">video editing</strong>, and
                results-driven{" "}
                <strong className="text-gray-900">digital marketing</strong>
                strategies that propel businesses forward in today's competitive
                landscape.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Our mission is simple: to be your trusted partner in navigating
                the digital transformation journey, delivering exceptional tech
                solutions that drive growth, engagement, and success.
              </p>
            </div>

            {/* Strengths List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Why Choose Joetech?
              </h3>
              <ul className="space-y-4" role="list">
                {strengthItems.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-500 ${
                      isVisible ?
                        "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 mt-1 p-2 bg-blue-50 rounded-lg">
                      {item.icon}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div
              className={`pt-6 transition-all duration-700 delay-700 ${
                isVisible ?
                  "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
            >
              <a
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Learn more about Joetech's services and team"
              >
                <span>Learn More About Us</span>
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats or Additional Info (Optional Enhancement) */}
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { number: "100+", label: "Projects Completed" },
            { number: "50+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
