"use client";
import React, { useState, useEffect, useRef } from "react";
import { Code, Palette, Video, TrendingUp, ArrowRight } from "lucide-react";

const FeaturedServices = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      icon: Code,
      title: "Web & App Development",
      description:
        "Custom web development and mobile app solutions built with cutting-edge technologies. From responsive websites to complex web applications, we deliver scalable digital experiences that drive business growth.",
      link: "/services/web-development",
      ariaLabel: "Learn more about our web and app development services",
    },
    {
      id: 2,
      icon: Palette,
      title: "Graphics & Branding",
      description:
        "Complete branding solutions including logo design, visual identity, and brand strategy. Our creative team crafts memorable brand experiences that resonate with your target audience and establish market presence.",
      link: "/services/branding",
      ariaLabel: "Learn more about our graphics and branding services",
    },
    {
      id: 3,
      icon: Video,
      title: "Video Editing & Production",
      description:
        "Professional video editing and production services for marketing campaigns, corporate content, and social media. Transform your ideas into compelling visual stories that engage and convert your audience.",
      link: "/services/video-production",
      ariaLabel: "Learn more about our video editing and production services",
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies including SEO, social media management, and paid advertising. Boost your online presence and drive targeted traffic with data-driven marketing campaigns that deliver results.",
      link: "/services/digital-marketing",
      ariaLabel: "Learn more about our digital marketing services",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute("data-card-id"));
            setVisibleCards((prev) => [...new Set([...prev, cardId])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-card-id]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Core Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Joetech delivers end-to-end solutions to build, brand, and promote
            your business with innovative technology and creative expertise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isVisible = visibleCards.includes(service.id);

            return (
              <article
                key={service.id}
                data-card-id={service.id}
                className={`
                  bg-white rounded-xl shadow-lg hover:shadow-xl 
                  transition-all duration-500 ease-out transform
                  hover:scale-105 hover:-translate-y-2
                  border border-gray-100 overflow-hidden
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      <IconComponent
                        className="w-8 h-8 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <a
                      href={service.link}
                      className="
                        inline-flex items-center justify-center w-full
                        px-4 py-3 text-sm font-medium text-white
                        bg-blue-600 hover:bg-blue-700 
                        rounded-lg transition-all duration-300
                        hover:shadow-md focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:ring-offset-2
                        group
                      "
                      aria-label={service.ariaLabel}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* Hover Accent */}
                <div className="absolute inset-0 border-2 border-transparent hover:border-blue-200 rounded-xl transition-colors duration-300 pointer-events-none" />
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to transform your business with our comprehensive tech
            solutions?
          </p>
          <a
            href="/contact"
            className="
              inline-flex items-center px-8 py-4 text-lg font-medium
              text-white bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-700 hover:to-blue-800
              rounded-lg shadow-lg hover:shadow-xl
              transition-all duration-300 transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
            aria-label="Get started with Joetech services today"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
