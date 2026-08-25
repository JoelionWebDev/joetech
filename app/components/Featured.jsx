import {
  Code,
  Palette,
  Clapperboard,
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
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-blue-400">
            What we do
          </p>
          <h2
            id="services-heading"
            className="font-display text-3xl md:text-5xl font-bold text-white mb-5"
          >
            Our Core Services
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Joetech delivers end-to-end solutions across three pillars — Build
            &amp; Brand, Show &amp; Sell, and Grow — so your business has one partner
            from first idea to full growth.
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={150}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.id}
                className="card-glow rounded-2xl p-8 flex flex-col group"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <IconComponent
                      className="w-7 h-7 text-blue-400 transition-transform duration-500 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <a
                  href={service.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 focus:outline-none"
                  aria-label={service.ariaLabel}
                >
                  Learn more
                  <ArrowRight
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </a>
              </article>
            );
          })}
        </StaggerGrid>

        <div className="text-center mt-16">
          <p className="text-slate-500 mb-7">
            Ready to transform your business with our comprehensive tech solutions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-500 hover:bg-blue-400 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 focus:outline-none"
            aria-label="Get started with Joetech services today"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
