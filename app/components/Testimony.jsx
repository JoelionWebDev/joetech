"use client";

import { useState, useEffect, useRef } from "react";

const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: "Mr Olusola Sanni",
      company: "De Phantom Continental Hotel Group",
      position: "Manager",
      feedback:
        "The website Joetech built for us is fantastic. It's beautiful, and we love how it turned out.",
      rating: 5,
      image: "/testimony/dephantom-rep.jpeg",
      url: "https://www.dephantomhotelgroup.com",
    },
    {
      id: 2,
      name: "Engr. (Dr.) Jerry Patrick",
      company: "First Choice Afro Villa",
      position: "CEO",
      feedback:
        "What Joetech built for us is beautiful — we love everything about it.",
      rating: 5,
      image: "/testimony/firstchoice-rep.jpeg",
      url: "https://www.firstchoiceafrovilla.com",
    },
    {
      id: 3,
      name: "Mr Victor Ajaye",
      company: "Enamis Systems",
      position: null,
      feedback:
        "This is wonderful. Beautiful work from Joetech — we love what they built for us.",
      rating: 5,
      image: "/testimony/enamis-logo.png",
      useLogo: true,
      url: "https://www.enamissystems.name.ng",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden transform hover:-translate-y-2 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visibleCards.has(index)
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              {/* Text Testimonial Layout */}
              <div className="p-6 h-full flex flex-col">
                <div className="flex-grow">
                  {renderStars(testimonial.rating)}
                  {testimonial.useLogo ? (
                    <div className="flex justify-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.company} logo`}
                        className="h-14 object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : testimonial.image ? (
                    <div className="flex justify-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name}, ${testimonial.position} at ${testimonial.company} - satisfied Joetech client`}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.feedback}"
                  </p>
                </div>
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    {testimonial.position && (
                      <p className="text-gray-600 text-sm">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    )}
                    {!testimonial.position && (
                      <p className="text-gray-600 text-sm">
                        {testimonial.company}
                      </p>
                    )}
                    {testimonial.url && (
                      <a
                        href={testimonial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        View Website ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
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
