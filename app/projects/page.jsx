"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ArrowRight,
  Filter,
  Calendar,
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  ShoppingCart,
  Building,
  Star,
  Users,
  Eye,
  BarChart3,
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

// Project Card Component
const ProjectCard = ({ project, index, inView }) => (
  <article
    className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${
      inView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-8"
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="relative overflow-hidden">
      <img
        src={project.image}
        alt={`${project.title} - ${
          project.service
        } project by Joetech showcasing ${project.category.toLowerCase()} solutions`}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.category === "Web"
              ? "bg-blue-100 text-blue-800"
              : project.category === "App"
              ? "bg-green-100 text-green-800"
              : project.category === "Branding"
              ? "bg-purple-100 text-purple-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {project.category}
        </span>
      </div>
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            Featured
          </span>
        </div>
      )}
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {project.year}
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center group-hover:shadow-lg">
          ----
          <ExternalLink className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  </article>
);

// Featured Project Component
const FeaturedProject = ({ project, reverse = false }) => (
  <div
    className={`grid lg:grid-cols-2 gap-12 items-center ${
      reverse ? "lg:grid-flow-col-dense" : ""
    }`}
  >
    <div className={reverse ? "lg:col-start-2" : ""}>
      <div className="relative">
        <img
          src={project.image}
          alt={`${
            project.title
          } - Featured ${project.category.toLowerCase()} project showcasing Joetech's expertise in ${
            project.service
          }`}
          className="w-full h-80 object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {project.metrics.views}
              </div>
              <div className="text-xs text-gray-500">Page Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {project.metrics.conversion}
              </div>
              <div className="text-xs text-gray-500">Conversion</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={reverse ? "lg:col-start-1" : ""}>
      <div className="flex items-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold mr-3 ${
            project.category === "Web"
              ? "bg-blue-100 text-blue-800"
              : project.category === "App"
              ? "bg-green-100 text-green-800"
              : project.category === "Branding"
              ? "bg-purple-100 text-purple-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {project.category}
        </span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
          Featured Case Study
        </span>
      </div>

      <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
          <p className="text-gray-600">{project.challenge}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
          <p className="text-gray-600">{project.solution}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
          <p className="text-gray-600">{project.results}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center">
        View Full Case Study
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
);

const JoetechProjectsPage = () => {
  const [heroRef, heroInView] = useInView(0.3);
  const [projectsRef, projectsInView] = useInView(0.2);
  const [featuredRef, featuredInView] = useInView(0.3);
  const [clientsRef, clientsInView] = useInView(0.3);
  const [ctaRef, ctaInView] = useInView(0.3);

  const [filterCategory, setFilterCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      title: "EcoMart E-commerce Platform",
      description:
        "A comprehensive e-commerce solution for sustainable products with advanced inventory management and customer analytics. Built with modern web development technologies for optimal performance.",
      category: "Web",
      service: "Web Development",
      tags: ["E-commerce", "React", "Node.js", "Payment Integration"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      year: "2024",
      featured: true,
      challenge:
        "The client needed a modern e-commerce platform that could handle high traffic while maintaining fast loading speeds and seamless user experience.",
      solution:
        "We developed a custom React-based platform with optimized performance, integrated payment systems, and comprehensive admin dashboard.",
      results:
        "Achieved 40% increase in conversion rates and 60% reduction in page load times, resulting in significant revenue growth.",
      metrics: { views: "50K+", conversion: "+40%" },
    },
    {
      id: 2,
      title: "FinTech Mobile Banking App",
      description:
        "Secure mobile banking application with biometric authentication and real-time transaction monitoring. Comprehensive mobile app development project focusing on security and user experience.",
      category: "App",
      service: "Mobile App Development",
      tags: ["React Native", "Biometrics", "Security", "Banking"],
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      year: "2024",
    },
    {
      id: 3,
      title: "Luxury Brand Identity Design",
      description:
        "Complete brand identity and digital marketing campaign for premium lifestyle brand. Professional branding services including logo design, brand guidelines, and marketing materials.",
      category: "Branding",
      service: "Brand Strategy & Design",
      tags: ["Brand Identity", "Logo Design", "Guidelines", "Marketing"],
      image:
        "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&h=400&fit=crop",
      year: "2023",
      featured: true,
      challenge:
        "Create a sophisticated brand identity that appeals to luxury consumers while maintaining accessibility across digital platforms.",
      solution:
        "Developed a comprehensive brand system with elegant typography, premium color palette, and versatile logo applications.",
      results:
        "Brand recognition increased by 200% and social media engagement grew by 150% within 6 months of launch.",
      metrics: { views: "100K+", conversion: "+200%" },
    },
    {
      id: 4,
      title: "Healthcare Digital Marketing Campaign",
      description:
        "Multi-channel digital marketing strategy for healthcare provider including SEO optimization, content marketing, and social media management to increase patient engagement.",
      category: "Marketing",
      service: "Digital Marketing",
      tags: ["SEO", "Content Marketing", "Social Media", "Healthcare"],
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      year: "2023",
    },
    {
      id: 5,
      title: "Restaurant Management System",
      description:
        "Comprehensive web development solution for restaurant chain management including inventory tracking, staff scheduling, and customer relationship management.",
      category: "Web",
      service: "Web Development",
      tags: ["Management System", "Inventory", "CRM", "Dashboard"],
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      year: "2023",
    },
    {
      id: 6,
      title: "Fitness Tracking Mobile App",
      description:
        "Cross-platform mobile application for fitness enthusiasts with workout tracking, nutrition planning, and social features. Advanced mobile app development with real-time data synchronization.",
      category: "App",
      service: "Mobile App Development",
      tags: ["Fitness", "Cross-platform", "Real-time", "Social"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      year: "2024",
    },
  ];

  const clients = [
    {
      name: "TechCorp Nigeria",
      logo: "https://via.placeholder.com/150x80/2563eb/ffffff?text=TechCorp",
    },
    {
      name: "Lagos Business Hub",
      logo: "https://via.placeholder.com/150x80/059669/ffffff?text=LBH",
    },
    {
      name: "Fintech Solutions",
      logo: "https://via.placeholder.com/150x80/7c3aed/ffffff?text=FinTech",
    },
    {
      name: "EcoMart",
      logo: "https://via.placeholder.com/150x80/dc2626/ffffff?text=EcoMart",
    },
    {
      name: "Healthcare Plus",
      logo: "https://via.placeholder.com/150x80/ea580c/ffffff?text=Health+",
    },
    {
      name: "Luxury Brands",
      logo: "https://via.placeholder.com/150x80/1f2937/ffffff?text=Luxury",
    },
  ];

  const categories = ["All", "Web", "App", "Branding", "Marketing"];

  const filteredProjects =
    filterCategory === "All"
      ? projects
      : projects.filter((project) => project.category === filterCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients.length / 3));
    }, 3000);
    return () => clearInterval(timer);
  }, [clients.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head Section */}
      <head>
        <title>
          Our Projects & Portfolio - Web Development, Apps & Digital Marketing |
          Joetech
        </title>
        <meta
          name="description"
          content="Explore Joetech's portfolio of innovative projects across web development, branding, and digital marketing. See how we help businesses grow with technology in Lekki, Nigeria."
        />
        <meta
          name="keywords"
          content="portfolio, projects, web development, mobile apps, branding, digital marketing, Nigeria, Lekki, case studies"
        />
        <meta
          property="og:title"
          content="Joetech Portfolio - Innovative Tech Projects & Digital Solutions"
        />
        <meta
          property="og:description"
          content="Discover our award-winning projects in web development, mobile apps, and digital marketing. See the results we deliver for businesses."
        />
        <link rel="canonical" href="https://joetech.com/projects" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Joetech Portfolio",
            description:
              "Portfolio showcasing web development, mobile app, and digital marketing projects",
            creator: {
              "@type": "Organization",
              name: "Joetech",
            },
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
              <span className="text-gray-900 font-medium">Projects</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-96 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse hidden lg:block"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce hidden lg:block"></div>
          <div className="absolute top-40 right-40 w-12 h-12 bg-white bg-opacity-5 rounded-full animate-ping hidden lg:block"></div>
        </div>

        <div
          className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Projects & Portfolio
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Showcasing Innovation, Design, and Technology at Work.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="opacity-80">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="opacity-80">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">25+</div>
              <div className="opacity-80">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <section className="py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filterCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={projectsRef} className="pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our latest work across web development, mobile
              applications, branding, and digital marketing campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                inView={projectsInView}
              />
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section
          ref={featuredRef}
          className={`py-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            featuredInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Case Studies
              </h2>
              <p className="text-xl text-gray-600">
                Deep dives into our most successful projects and the results we
                achieved.
              </p>
            </div>

            <div className="space-y-20">
              {featuredProjects.map((project, index) => (
                <FeaturedProject
                  key={project.id}
                  project={project}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>

            {/* Callout Box */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">
                Want to Start Your Own Project?
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Let's discuss how we can bring your vision to life with our
                expert team and proven process.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section
          ref={clientsRef}
          className={`py-20 transition-all duration-1000 ${
            clientsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600">
              We're proud to work with innovative companies across Nigeria and
              beyond.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
            >
              {clients.map((client, index) => (
                <div key={index} className="flex-shrink-0 w-1/3 px-4">
                  <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center h-20">
                    <img
                      src={client.logo}
                      alt={`${client.name} - Joetech client logo`}
                      className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
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
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Ready to start your next project? Our team in Lekki, Nigeria is
                excited to bring your vision to life with cutting-edge
                technology and creative solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                >
                  Get Started with Joetech
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <a
                  href="/services"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  View Our Services
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Joetech</h3>
              <p className="text-gray-400 mb-4">
                Creating innovative digital solutions from our office in Lekki,
                Nigeria.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Building className="w-4 h-4 mr-2" />
                Lekki, Lagos, Nigeria
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Portfolio</h4>
              <nav className="space-y-2">
                <a
                  href="/projects/web"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </a>
                <a
                  href="/projects/mobile"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Apps
                </a>
                <a
                  href="/projects/branding"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Branding
                </a>
                <a
                  href="/projects/marketing"
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
                  About
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
              </nav>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 projects@joetech.com</p>
                <p>📞 +234 (0) 901 234 5678</p>
                <p>📍 Lekki Phase 1, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Joetech. All rights reserved. | Proudly serving
              clients from Lagos, Nigeria
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JoetechProjectsPage;
