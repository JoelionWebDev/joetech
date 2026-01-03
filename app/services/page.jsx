"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Code,
  Smartphone,
  Palette,
  TrendingUp,
  Target,
  Settings,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  Headphones,
  Star,
} from "lucide-react";

// Intersection Observer Hook for Animations
const useInView = (threshold = 0.1) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, inView];
};

// Service Card Component
const ServiceCard = ({ service, index, inView }) => (
  <article
    className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-gray-100 ${
      inView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-8"
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
      {service.icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
      {service.title}
    </h3>
    <p className="text-gray-600 leading-relaxed mb-6 text-base">
      {service.description}
    </p>
    <ul className="space-y-2 mb-8">
      {service.features.map((feature, idx) => (
        <li key={idx} className="flex items-center text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
      ---
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </button>
  </article>
);

const JoetechServicesPage = () => {
  const [heroRef, heroInView] = useInView(0.3);
  const [servicesRef, servicesInView] = useInView(0.2);
  const [trustRef, trustInView] = useInView(0.3);
  const [ctaRef, ctaInView] = useInView(0.3);

  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Web Development",
      description:
        "Custom responsive websites and powerful web applications built with cutting-edge technology. Our expert web development team creates scalable solutions that drive business growth and enhance user experience.",
      features: [
        "Responsive & Mobile-First Design",
        "Custom CMS Solutions",
        "E-commerce Development",
        "Performance Optimization",
      ],
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile App Development",
      description:
        "Native iOS and Android applications that engage users and boost your digital presence. Our mobile development expertise ensures seamless performance across all devices and platforms.",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Solutions",
        "App Store Optimization",
        "Ongoing Maintenance & Updates",
      ],
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description:
        "Beautiful, user-centered designs that convert visitors into customers. Our design team combines aesthetics with functionality to create exceptional digital experiences that align with your brand.",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Brand Identity Design",
        "Design System Development",
      ],
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies including SEO, social media marketing, and content creation. We help businesses increase online visibility and drive qualified traffic that converts.",
      features: [
        "Search Engine Optimization (SEO)",
        "Social Media Management",
        "Content Marketing Strategy",
        "Pay-Per-Click (PPC) Advertising",
      ],
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Brand Strategy",
      description:
        "Strategic brand development and digital presence optimization. Our business growth strategies help establish strong market positioning and create lasting connections with your target audience.",
      features: [
        "Brand Identity Development",
        "Market Research & Analysis",
        "Competitive Analysis",
        "Digital Brand Guidelines",
      ],
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "IT Support & Maintenance",
      description:
        "Reliable ongoing technical support and website maintenance services. Our dedicated team ensures your digital assets remain secure, updated, and performing at peak efficiency around the clock.",
      features: [
        "Website Maintenance & Updates",
        "Security Monitoring",
        "Performance Optimization",
        "Technical Support & Troubleshooting",
      ],
    },
  ];

  const trustSignals = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "5+ Years",
      subtitle: "of Experience",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "98%",
      subtitle: "Client Satisfaction",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "250+",
      subtitle: "Projects Completed",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7",
      subtitle: "Support Available",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head Section */}
      <head>
        <title>
          Our Services - Tech Solutions, Web Development & Digital Marketing |
          Joetech
        </title>
        <meta
          name="description"
          content="Explore Joetech's comprehensive tech solutions: web development, mobile apps, UI/UX design, digital marketing, brand strategy & IT support. Drive business growth with our expert services."
        />
        <meta
          name="keywords"
          content="tech solutions, digital marketing, web development, UI/UX design, business growth strategies, mobile app development, IT support, brand strategy"
        />
        <meta
          property="og:title"
          content="Professional Tech Solutions & Digital Services | Joetech"
        />
        <meta
          property="og:description"
          content="Transform your business with our expert tech solutions, web development, and digital marketing services. Get a free consultation today!"
        />
        <link rel="canonical" href="https://joetech.com/services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            provider: {
              "@type": "Organization",
              name: "Joetech",
            },
            serviceType: "Tech Solutions and Digital Marketing",
            description:
              "Comprehensive tech solutions including web development, mobile apps, digital marketing, and business growth strategies",
          })}
        </script>
      </head>

      {/* Breadcrumb Navigation */}
      <nav
        className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <span className="text-gray-900 font-medium">Services</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-96 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Comprehensive tech solutions and digital marketing services designed
            to accelerate your business growth and establish a powerful online
            presence.
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse hidden lg:block"></div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <section ref={servicesRef} className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Tech Solutions for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From web development to digital marketing, we provide end-to-end
              tech solutions that drive business growth and create exceptional
              user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                inView={servicesInView}
              />
            ))}
          </div>
        </section>

        {/* Trust & Social Proof Section */}
        <section
          ref={trustRef}
          className={`py-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            trustInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Joetech?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Partner with a trusted team that delivers exceptional results
                and ongoing support for your digital transformation journey.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {trustSignals.map((signal, index) => (
                <div
                  key={index}
                  className={`text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    trustInView
                      ? `opacity-100 translate-y-0`
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {signal.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {signal.title}
                  </div>
                  <p className="text-gray-600 font-medium">{signal.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Additional Trust Elements */}
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert Team
                </h3>
                <p className="text-gray-600">
                  Certified professionals with extensive experience in tech
                  solutions and digital marketing strategies.
                </p>
              </div>
              <div className="p-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Proven Results
                </h3>
                <p className="text-gray-600">
                  Track record of successful projects that have driven
                  measurable business growth for our clients.
                </p>
              </div>
              <div className="p-6">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tailored Solutions
                </h3>
                <p className="text-gray-600">
                  Customized tech solutions designed to meet your specific
                  business needs and objectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className={`py-20 transition-all duration-1000 ${
            ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Let's Build Something Great Together!
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your business with our expert tech solutions
                and digital marketing services? Let's discuss your project and
                create a strategy that drives results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Call Now: + (234) 8167 - 099131
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm opacity-80">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Free Initial Consultation
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Custom Project Proposal
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  No Obligation Quote
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-gray-900 text-white py-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Joetech</h3>
              <p className="text-gray-400 mb-4">
                Professional tech solutions and digital marketing services for
                modern businesses.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">J</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Our Services</h4>
              <nav className="space-y-2">
                <a
                  href="/services/web-development"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </a>
                <a
                  href="/services/mobile-apps"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Apps
                </a>
                <a
                  href="/services/design"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  UI/UX Design
                </a>
                <a
                  href="/services/digital-marketing"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Digital Marketing
                </a>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <nav className="space-y-2">
                <a
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
                <a
                  href="/blog"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 joelionjoe10@gmail.com</p>
                <p>📞 + (234) 8167 - 099131</p>
                <p>📍 Lagos, Nigeria</p>
                <p className="mt-4 text-sm">Available 24/7 for support</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2025 Joetech. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JoetechServicesPage;
