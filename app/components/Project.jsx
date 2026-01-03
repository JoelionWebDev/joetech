"use client";

import { useState, useEffect, useRef } from "react";

const ProjectsPortfolio = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "TechCorp E-commerce Platform",
      description:
        "A comprehensive web development project featuring a modern e-commerce platform with custom shopping cart functionality, payment integration, and responsive design optimized for mobile commerce.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Web Development", "E-commerce", "React"],
      category: "web-development",
    },
    {
      id: 2,
      title: "GreenLeaf Brand Identity",
      description:
        "Complete branding design package including logo creation, color palette development, and brand guidelines for an eco-friendly startup focused on sustainable living solutions.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Branding", "Logo Design", "Brand Identity"],
      category: "branding",
    },
    {
      id: 3,
      title: "FinanceFlow Mobile App",
      description:
        "Innovative web development project creating a progressive web app for personal finance management with real-time analytics, budget tracking, and seamless user experience across devices.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Web Development", "Mobile App", "PWA"],
      category: "web-development",
    },
    {
      id: 4,
      title: "RestaurantPro Marketing Campaign",
      description:
        "Comprehensive digital marketing campaigns including social media strategy, video editing for promotional content, and SEO optimization resulting in 300% increase in online engagement.",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Digital Marketing", "Video Editing", "Social Media"],
      category: "marketing",
    },
    {
      id: 5,
      title: "HealthTech Dashboard",
      description:
        "Advanced web development project featuring a healthcare management dashboard with data visualization, patient tracking systems, and HIPAA-compliant security measures.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Web Development", "Dashboard", "Healthcare"],
      category: "web-development",
    },
    {
      id: 6,
      title: "Luxury Resort Branding",
      description:
        "Premium branding design project encompassing visual identity, marketing collateral, and digital assets for a high-end resort chain with focus on elegant and sophisticated aesthetics.",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Branding", "Luxury Design", "Marketing"],
      category: "branding",
    },
  ];

  const tagColors = {
    "Web Development": "bg-blue-100 text-blue-800",
    Branding: "bg-purple-100 text-purple-800",
    "Digital Marketing": "bg-green-100 text-green-800",
    "Video Editing": "bg-red-100 text-red-800",
    "E-commerce": "bg-indigo-100 text-indigo-800",
    "Logo Design": "bg-pink-100 text-pink-800",
    "Brand Identity": "bg-yellow-100 text-yellow-800",
    "Mobile App": "bg-cyan-100 text-cyan-800",
    PWA: "bg-teal-100 text-teal-800",
    "Social Media": "bg-orange-100 text-orange-800",
    Dashboard: "bg-gray-100 text-gray-800",
    Healthcare: "bg-emerald-100 text-emerald-800",
    "Luxury Design": "bg-amber-100 text-amber-800",
    Marketing: "bg-lime-100 text-lime-800",
    React: "bg-sky-100 text-sky-800",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, cardIndex]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleViewProject = (projectId) => {
    // In a real application, this would navigate to the project detail page
    console.log(`Viewing project ${projectId}`);
  };

  const handleKeyPress = (event, projectId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleViewProject(projectId);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Showcasing Joetech's work in web development, branding design, video
            editing, and digital marketing campaigns that drive results for our
            clients.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visibleCards.has(index)
                  ? `${index * 100}ms`
                  : "0ms",
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${
                    project.category
                  } project showcasing Joetech's expertise in ${project.tags[0].toLowerCase()}`}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tagColors[tag] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button
                  onClick={() => handleViewProject(project.id)}
                  onKeyDown={(e) => handleKeyPress(e, project.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`View details for ${project.title} project`}
                >
                  -------
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your next project with Joetech?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Contact Joetech to discuss your project requirements"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPortfolio;
