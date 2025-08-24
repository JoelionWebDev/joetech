"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Users,
  Award,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

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

const JoetechAboutPage = () => {
  const [heroRef, heroInView] = useInView(0.3);
  const [storyRef, storyInView] = useInView(0.3);
  const [teamRef, teamInView] = useInView(0.3);
  const [statsRef, statsInView] = useInView(0.3);
  const [valuesRef, valuesInView] = useInView(0.3);

  const stats = [
    { number: 250, suffix: "+", label: "Projects Delivered" },
    { number: 95, suffix: "%", label: "Happy Clients" },
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 12, suffix: "", label: "Awards Won" },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and creative solutions to solve complex digital challenges.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity",
      description:
        "Transparency and honesty guide every interaction, building trust with our clients and partners.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer-First",
      description:
        "Your success is our priority. We tailor our digital solutions to meet your unique business needs.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We deliver high-quality web development, design, and marketing solutions that exceed expectations.",
    },
  ];

  const team = [
    {
      name: "Joseph Tech",
      role: "CEO & Founder",
      description:
        "Visionary leader with 10+ years in digital transformation and web development.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      description:
        "Award-winning designer specializing in user experience and brand innovation.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b88c2a0c?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Mike Chen",
      role: "Lead Developer",
      description:
        "Full-stack expert in modern web technologies and scalable digital solutions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Strategist",
      description:
        "Data-driven marketing professional focused on digital growth and SEO optimization.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head Section */}
      <head>
        <title>
          About Joetech - Digital Solutions & Web Development Company
        </title>
        <meta
          name="description"
          content="Learn about Joetech's mission to drive digital transformation through innovative web development, design, and marketing solutions. Meet our expert team and discover our values."
        />
        <meta
          name="keywords"
          content="digital solutions, web development, design, innovation, marketing, tech company, digital transformation"
        />
        <meta
          property="og:title"
          content="About Joetech - Digital Solutions & Web Development"
        />
        <meta
          property="og:description"
          content="Discover how Joetech combines innovation, creativity, and technology to help businesses succeed online."
        />
        <link rel="canonical" href="https://joetech.com/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Joetech",
            description:
              "Digital solutions company specializing in web development, design, and marketing",
            url: "https://joetech.com",
            foundingDate: "2019",
            numberOfEmployees: "10-50",
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
              <span className="text-gray-900 font-medium">About</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Joetech – Driving Digital Transformation
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We combine innovation, creativity, and technology to help businesses
            succeed online.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-10"></div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <section
          ref={storyRef}
          className={`py-16 transition-all duration-1000 ${
            storyInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in 2019, <strong>Joetech</strong> emerged from a
                  vision to bridge the gap between traditional businesses and
                  the digital world. Our mission is to empower companies with
                  innovative <em>digital solutions</em> that drive growth and
                  success in an increasingly connected marketplace.
                </p>
                <p>
                  We specialize in comprehensive <em>web development</em>,
                  cutting-edge <em>design</em>, and strategic <em>marketing</em>{" "}
                  services. Our approach combines technical expertise with
                  creative <em>innovation</em> to deliver solutions that not
                  only meet current needs but anticipate future challenges.
                </p>
                <p>
                  At Joetech, we believe that every business deserves access to
                  world-class digital solutions. Whether you're a startup
                  looking to establish your online presence or an enterprise
                  seeking digital transformation, we're committed to turning
                  your vision into reality.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Joetech team collaborating on digital solutions and web development projects"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <p className="font-semibold text-lg">5+ Years</p>
                <p className="text-sm opacity-90">of Innovation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are - Team Section */}
        <section
          ref={teamRef}
          className={`py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who We Are
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the talented team behind Joetech's success. Our diverse
                group of experts brings together years of experience in digital
                solutions, web development, design, and marketing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Joetech`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-center mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {member.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          ref={statsRef}
          className={`py-16 transition-all duration-1000 ${
            statsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that showcase our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {statsInView ? (
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  ) : (
                    "0"
                  )}
                </div>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values Section */}
        <section
          ref={valuesRef}
          className={`py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            valuesInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at Joetech
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Partner with Joetech to Build Your Digital Future
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Ready to transform your business with innovative digital
                solutions? Let's discuss how we can help you succeed online.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
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
              <p className="text-gray-400">
                Driving digital transformation through innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <a
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="/services"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Services
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
              <h4 className="font-semibold mb-4">Services</h4>
              <nav className="space-y-2">
                <a
                  href="/services/web-development"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </a>
                <a
                  href="/services/design"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Design
                </a>
                <a
                  href="/services/marketing"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Digital Marketing
                </a>
                <a
                  href="/services/consulting"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Consulting
                </a>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>hello@joetech.com</p>
                <p>+1 (555) 123-4567</p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Joetech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JoetechAboutPage;
