import StaggerGrid from "../../components/StaggerGrid";

const processSteps = [
  {
    id: 1,
    number: "01",
    title: "Consultation",
    subtitle: "We understand your needs",
    description:
      "Our consultation process begins with a comprehensive analysis of your business goals, target audience, and current digital presence. We collaborate closely with you to identify opportunities for growth through strategic web development, branding design, and digital marketing initiatives.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: "bg-blue-500",
  },
  {
    id: 2,
    number: "02",
    title: "Planning & Design",
    subtitle: "We create your brand assets",
    description:
      "During the planning and design phase, we develop comprehensive strategies for your project. Our team creates wireframes, mockups, and brand assets that align with your vision. We focus on user experience design and visual identity that resonates with your target market.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "bg-indigo-500",
  },
  {
    id: 3,
    number: "03",
    title: "Development & Marketing",
    subtitle: "We build and promote",
    description:
      "Our development and marketing phase brings your vision to life through cutting-edge web development technologies and strategic digital marketing campaigns. We build responsive websites, implement SEO best practices, and create compelling video content to maximize your online presence.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "bg-purple-500",
  },
  {
    id: 4,
    number: "04",
    title: "Delivery & Support",
    subtitle: "We hand over and maintain",
    description:
      "Upon project completion, we provide comprehensive delivery and support services. This includes thorough testing, training, documentation, and ongoing maintenance to ensure your digital assets continue performing optimally and driving business growth long after launch.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-green-500",
  },
];

const ProcessSection = () => {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="process-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Process
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A simple 4-step approach to building and promoting your business
            through strategic consultation, planning &amp; design, development &amp;
            marketing, and delivery &amp; support.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

            <StaggerGrid className="grid grid-cols-4 gap-8 relative z-20" staggerDelay={200}>
              {processSteps.map((step) => (
                <article key={step.id} className="text-center group">
                  <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div aria-label={`Step ${step.number}: ${step.title}`}>
                      {step.icon}
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-gray-500 mb-2">
                    STEP {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="text-blue-600 font-medium mb-4">
                    {step.subtitle}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </article>
              ))}
            </StaggerGrid>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Layout */}
        <div className="lg:hidden space-y-8">
          <StaggerGrid staggerDelay={150}>
            {processSteps.map((step) => (
              <article key={step.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden">
                <div className="p-6 sm:p-8 flex items-start space-x-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${step.color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <div aria-label={`Step ${step.number}: ${step.title}`}>
                      {step.icon}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">
                      STEP {step.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </StaggerGrid>
        </div>

        {/* Process Summary */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Why Choose Joetech&apos;s Process?
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our proven methodology ensures successful project delivery through
              structured consultation, strategic planning &amp; design,
              comprehensive development &amp; marketing, and reliable delivery &amp;
              support. We&apos;ve refined this process over dozens of successful
              client partnerships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Efficient process ensures timely project completion without compromising quality.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Assured</h4>
                <p className="text-gray-600 text-sm">
                  Rigorous testing and review at each step guarantees exceptional results.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Client-Focused</h4>
                <p className="text-gray-600 text-sm">
                  Transparent communication and collaboration throughout every project phase.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your project with our proven process?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Contact Joetech to begin your project with our consultation process"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
