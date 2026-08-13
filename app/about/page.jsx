"use client";
import React, { useState, useEffect, useRef } from "react";
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
const AnimatedCounter = ({ end, duration = 2000, suffix = "", inView = false }) => {
  const [count, setCount] = useState(end);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

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
  }, [inView, end, duration]);

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
      { threshold },
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
    { number: 100, suffix: "+", label: "Projects Completed" },
    { number: 50, suffix: "+", label: "Happy Clients" },
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
      name: "Igono Joel",
      role: "CEO & Founder",
      description:
        "Visionary leader with 6+ years in digital transformation and web development.",
      image: "/ceo.jpg",
    },
    {
      name: "Simeon Peter",
      role: "Creative Director",
      description:
        "Award-winning designer specializing in user experience and brand innovation.",
      image: "/designer.png",
    },
    {
      name: "Joe Dev",
      role: "Lead Developer",
      description:
        "Full-stack expert in modern web technologies and scalable digital solutions.",
      image: "/dev.PNG",
    },
    {
      name: "Blessing Eze",
      role: "Marketing Strategist",
      description:
        "Data-driven marketing professional focused on digital growth and SEO optimization.",
      image: "/blessing.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head Section */}
      <head>
        <title>About Joetech — Web Dev, Design & Digital Marketing Agency in Lagos</title>
        <meta
          name="description"
          content="Learn about Joetech's story, values, and expert team. We are a Lagos-based web development, branding, and digital marketing agency driving digital transformation."
        />
        <link rel="canonical" href="https://joetech.name.ng/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Joetech",
            description:
              "Web development, design, and digital marketing agency in Lagos, Nigeria",
            url: "https://joetech.name.ng",
            foundingDate: "2019",
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
        className="relative h-96 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        }}
      >
        {/* Aurora blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "-10%",
              width: "60%",
              height: "160%",
              background:
                "radial-gradient(ellipse, rgba(120,80,255,0.45) 0%, transparent 70%)",
              animation: "drift1 8s ease-in-out infinite alternate",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-30%",
              right: "-15%",
              width: "55%",
              height: "160%",
              background:
                "radial-gradient(ellipse, rgba(0,200,255,0.35) 0%, transparent 70%)",
              animation: "drift2 10s ease-in-out infinite alternate",
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "30%",
              width: "50%",
              height: "120%",
              background:
                "radial-gradient(ellipse, rgba(255,60,180,0.3) 0%, transparent 70%)",
              animation: "drift3 12s ease-in-out infinite alternate",
              filter: "blur(45px)",
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 3 === 0 ? "6px" : "3px",
              height: i % 3 === 0 ? "6px" : "3px",
              borderRadius: "50%",
              background:
                i % 3 === 0 ? "rgba(255,255,255,0.8)"
                : i % 3 === 1 ? "rgba(120,200,255,0.7)"
                : "rgba(200,100,255,0.7)",
              left: `${(i * 5.8 + 3) % 100}%`,
              top: `${(i * 7.3 + 10) % 100}%`,
              animation: `float ${4 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.4) % 3}s`,
              boxShadow:
                i % 3 === 0 ?
                  "0 0 8px rgba(255,255,255,0.9)"
                : "0 0 6px rgba(120,200,255,0.8)",
            }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div
          className={`relative z-10 text-center px-4 transition-all duration-1000 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Glowing badge */}
          <div
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "4px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(120,200,255,0.4)",
              background: "rgba(120,200,255,0.1)",
              color: "rgba(180,230,255,0.9)",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              backdropFilter: "blur(8px)",
            }}
          >
            ✦ Digital Transformation
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #a78bfa 40%, #38bdf8 70%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 30px rgba(167,139,250,0.5))",
              lineHeight: 1.1,
            }}
          >
            About Joetech – Driving Digital Transformation
          </h1>

          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(200,220,255,0.85)" }}
          >
            We combine innovation, creativity, and technology to help businesses
            succeed online.
          </p>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "80px",
            background:
              "linear-gradient(to top, rgba(15,12,41,0.6), transparent)",
          }}
        />

        <style>{`
    @keyframes drift1 {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(40px, 20px) scale(1.1); }
    }
    @keyframes drift2 {
      from { transform: translate(0, 0) scale(1.05); }
      to   { transform: translate(-30px, 30px) scale(0.95); }
    }
    @keyframes drift3 {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(20px, -25px) scale(1.08); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
      50%       { transform: translateY(-14px) scale(1.2); opacity: 1; }
    }
  `}</style>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <section
          ref={storyRef}
          className={`py-16 transition-all duration-1000 ${
            storyInView ?
              "opacity-100 translate-y-0"
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
                src="/team.png"
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
            statsInView ?
              "opacity-100 translate-y-0"
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
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    inView={statsInView}
                  />
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
            valuesInView ?
              "opacity-100 translate-y-0"
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

    </div>
  );
};

export default JoetechAboutPage;
