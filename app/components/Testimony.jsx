"use client";

import { useState, useEffect, useRef } from "react";

const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [playingVideo, setPlayingVideo] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: "Enemona Samuel",
      company: "TechCorp Solutions",
      position: "CEO",
      feedback:
        "Joetech transformed our online presence with exceptional web development expertise. Their attention to detail and modern approach exceeded our expectations. The results speak for themselves with a 200% increase in conversions.",
      rating: 5,
      image:
        "https://image.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&=80",
      type: "text",
    },
    {
      id: 2,
      name: "Johnson Monasoko",
      company: "TechStart Inc.",
      position: "CEO at TechStart",
      feedback:
        "Working with this team has been transformative for our business. They delivered a robust solution that exceeded our expectations and helped us scale efficiently.",
      rating: 5,
      image:
        "https://image.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8Hx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      type: "text",
    },
    {
      id: 3,
      name: "Sunday Michael",
      company: "InnovateCo",
      position: "Product Manager",
      feedback:
        "The level of professionalism and technical expertise is outstanding. Our project was completed on time and the results speak for themselves.",
      rating: 5,
      image:
        "https://image.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      type: "text",
    },
    {
      id: 4,
      name: "David Park",
      company: "HealthTech Innovations",
      position: "CTO",
      feedback:
        "Working with Joetech was a game-changer for our healthcare platform. Their technical expertise in web development and user experience design created a solution that our patients love using.",
      rating: 5,
      image:
        "https://image.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      type: "video",
      videoThumbnail:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const StarIcon = ({ filled }) => (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg
      className="w-12 h-12 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  );

  const renderStars = (rating) => (
    <div
      className="flex items-center gap-1 mb-4"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= rating} />
      ))}
      <span className="sr-only">{rating} out of 5 stars</span>
    </div>
  );

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

  const handleVideoPlay = (testimonialId) => {
    setPlayingVideo(testimonialId);
    // In a real application, this would trigger video playback
    console.log(`Playing video testimonial for client ${testimonialId}`);
  };

  const handleKeyPress = (event, testimonialId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleVideoPlay(testimonialId);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by businesses for web development, branding, and digital
            marketing. Read genuine client reviews and customer feedback about
            Joetech's services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden transform hover:-translate-y-2 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${testimonial.type === "video" ? "xl:col-span-2" : ""}`}
              style={{
                transitionDelay: visibleCards.has(index)
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              {testimonial.type === "video" ? (
                // Video Testimonial Layout
                <div className="relative">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={testimonial.videoThumbnail}
                      alt={`Video testimonial from ${testimonial.name}, ${testimonial.position} at ${testimonial.company} - client review for Joetech`}
                      className="w-full h-48 sm:h-56 lg:h-48 xl:h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => handleVideoPlay(testimonial.id)}
                        onKeyDown={(e) => handleKeyPress(e, testimonial.id)}
                        className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label={`Play video testimonial from ${testimonial.name}`}
                      >
                        <PlayIcon />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Video Review
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.feedback}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name}, ${testimonial.position} at ${testimonial.company}`}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Text Testimonial Layout
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-grow">
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.feedback}"
                    </p>
                  </div>
                  <div className="flex items-center mt-auto">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}, ${testimonial.position} at ${testimonial.company} - satisfied Joetech client`}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-gray-100"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5★</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Support Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our satisfied clients and grow your business?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Contact Joetech to start your project and become our next success story"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
