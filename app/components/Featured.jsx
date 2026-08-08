import {
  Code,
  Palette,
  Clapperboard,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import StaggerGrid from "../../components/StaggerGrid";

const services = [
  {
    id: 1,
    icon: Code,
    title: "Build & Brand",
    description:
      "Web & app development, graphics and branding that lay the digital foundation for your business — a professional website or app with a brand identity customers remember.",
    link: "/services",
    ariaLabel: "Learn more about our web development and branding services",
  },
  {
    id: 2,
    icon: Palette,
    title: "Show & Sell",
    description:
      "Video editing & production, 360° virtual tours, AI video generation and digital menus — visually showcase your space, products and services to customers before they even visit.",
    link: "/services",
    ariaLabel: "Learn more about our video, 360 virtual tour and digital menu services",
  },
  {
    id: 3,
    icon: Clapperboard,
    title: "Grow",
    description:
      "Digital marketing, SEO, social media management and paid advertising that drive targeted traffic and turn visibility into customers and revenue.",
    link: "/services",
    ariaLabel: "Learn more about our digital marketing services",
  },
];

const FeaturedServices = () => {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Core Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Joetech delivers end-to-end solutions across three pillars — Build
            & Brand, Show & Sell, and Grow — so your business has one partner
            from first idea to full growth.
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={150}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-blue-600" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex-grow text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={service.link}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                      aria-label={service.ariaLabel}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </StaggerGrid>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to transform your business with our comprehensive tech solutions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
