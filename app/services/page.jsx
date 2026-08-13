import { PHONE_NUMBER, PHONE_TEL } from "../../lib/site";
import {
  ChevronRight,
  Code,
  Palette,
  Clapperboard,
  Globe,
  Sparkles,
  Utensils,
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
  Landmark,
  Construction,
} from "lucide-react";
import StaggerGrid from "../../components/StaggerGrid";
import FadeInSection from "../../components/FadeInSection";

export const metadata = {
  title: "Our Services - Web Development, 360 Virtual Tours & Digital Marketing | Joetech",
  description:
    "Explore Joetech's comprehensive services: web & app development, branding, video editing, 360° virtual tours, AI video generation, digital menus & digital marketing. Turn your business into a complete digital presence.",
  keywords:
    "360 virtual tour Lagos, AI video generation Nigeria, digital menu Lagos, hospitality tech solutions Nigeria, web development, digital marketing, branding agency Lagos, video production",
  alternates: { canonical: "https://joetech.name.ng/services" },
  openGraph: {
    title: "Professional Tech Solutions & Digital Services | Joetech",
    description:
      "Transform your business with Joetech's web development, branding, 360° virtual tours, AI video and digital marketing services. Get a free consultation today!",
    url: "https://joetech.name.ng/services",
  },
};

// Service Card Component
const ServiceCard = ({ service, index }) => (
  <article className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-gray-100 flex flex-col h-full">
    <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
      {service.icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
      {service.title}
    </h3>
    <p className="text-gray-600 leading-relaxed mb-6 text-base flex-grow">
      {service.description}
    </p>
    <ul className="space-y-2 mb-8">
      {service.features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          {feature}
        </li>
      ))}
    </ul>
    <a
      href="/contact"
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center mt-auto"
    >
      Get a Quote
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </a>
  </article>
);

// Pillar Section Component
const PillarSection = ({ pillar }) => {
  return (
    <FadeInSection className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-lg">
      <div
        className={`px-8 py-10 text-white ${
          pillar.headerClass || "bg-gradient-to-r from-blue-600 to-indigo-700"
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            {pillar.icon}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
              Pillar
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">{pillar.title}</h2>
          </div>
        </div>
        <p className="text-lg opacity-95 max-w-2xl leading-relaxed">
          {pillar.intro}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-10">
        {pillar.services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </FadeInSection>
  );
};

const pillars = [
  {
    title: "Build & Brand",
    icon: <Code className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-blue-600 to-indigo-700",
    intro:
      "We lay the digital foundation — building your website or app and shaping the brand identity behind it, so your business looks professional and works flawlessly.",
    services: [
      {
        icon: <Code className="w-9 h-9" />,
        title: "Web & App Development",
        description:
          "Custom responsive websites, powerful web applications, and native iOS/Android apps. Our development team creates scalable solutions that drive business growth and enhance user experience.",
        features: [
          "Responsive & Mobile-First Design",
          "Custom CMS Solutions",
          "E-commerce & Web Applications",
          "Native iOS & Android Apps",
          "App Store Optimization",
          "Ongoing Maintenance & Updates",
        ],
      },
      {
        icon: <Palette className="w-9 h-9" />,
        title: "Graphics & Branding",
        description:
          "Complete branding solutions including logo design, visual identity, and brand strategy. Our team crafts memorable brand experiences that resonate with your audience and establish market presence.",
        features: [
          "Logo Design & Visual Identity",
          "Brand Identity Development",
          "UI/UX & Design Systems",
          "Market & Competitive Research",
          "Digital Brand Guidelines",
        ],
      },
    ],
  },
  {
    title: "Show & Sell",
    icon: <Clapperboard className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-purple-600 to-fuchsia-700",
    intro:
      "Showcase your space, products, and services to customers visually — with video, immersive 360° tours, and digital tools that make it easy to explore and buy.",
    services: [
      {
        icon: <Clapperboard className="w-9 h-9" />,
        title: "Video Editing & Production",
        description:
          "Professional video editing and production for marketing campaigns, corporate content, and social media. We transform ideas into compelling visual stories that engage and convert.",
        features: [
          "Marketing & Promotional Videos",
          "Corporate Content",
          "Social Media Videos",
          "Color Grading & Sound Design",
        ],
      },
      {
        icon: <Globe className="w-9 h-9" />,
        title: "360° Virtual Tours",
        description:
          "Full 360° camera walkthroughs of properties and business locations. Perfect for Google Business Profile listings, hotel room previews, apartment and real estate showings — letting customers explore a location before visiting.",
        features: [
          "Google Business Profile Ready",
          "Hotel & Short-let Room Previews",
          "Real Estate & Apartment Showings",
          "Property & Business Location Walkthroughs",
        ],
      },
      {
        icon: <Sparkles className="w-9 h-9" />,
        title: "AI Video Generation",
        description:
          "AI-powered video content for real estate listings, construction progress updates, and business promotional content — faster and more affordable than traditional production.",
        features: [
          "Real Estate Property Videos",
          "Construction Progress Updates",
          "Business Promotional Content",
          "Cost-Effective AI Production",
        ],
      },
      {
        icon: <Utensils className="w-9 h-9" />,
        title: "Digital Menus",
        description:
          "Interactive digital menus for restaurants, bars, and hotels. Easy to update, beautiful to present, and ready for Google Business — raising average orders and delighting customers.",
        features: [
          "Interactive & Animated Menus",
          "QR Code Access & Updates",
          "Restaurant, Bar & Hotel Menus",
          "Full Branding Included",
        ],
      },
    ],
  },
  {
    title: "Grow",
    icon: <TrendingUp className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-emerald-600 to-teal-700",
    intro:
      "We promote your business to the right people — with SEO, social media, and paid advertising that turn attention into customers and grow your bottom line.",
    services: [
      {
        icon: <TrendingUp className="w-9 h-9" />,
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
        icon: <Target className="w-9 h-9" />,
        title: "Brand Strategy & Growth",
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
        icon: <Settings className="w-9 h-9" />,
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
    ],
  },
];

const industries = [
  {
    title: "Hospitality",
    subtitle: "Hotels & Restaurants",
    description:
      "Complete guest-facing digital presence, from website to room previews to digital menus.",
    icon: <Utensils className="w-7 h-7" />,
    iconWrap: "bg-amber-100 text-amber-600",
    bundle: ["Web Development", "360° Virtual Tours", "Digital Menus", "Branding"],
    linkLabel: "Case Study: De Phantom Hotel Group",
    linkHref: "https://www.dephantomhotelgroup.com",
  },
  {
    title: "Real Estate",
    subtitle: "Properties & Investments",
    description:
      "List, show, and sell properties anywhere with immersive 360° tours and AI video.",
    icon: <Landmark className="w-7 h-7" />,
    iconWrap: "bg-emerald-100 text-emerald-600",
    bundle: ["Web Development", "360° Virtual Tours", "AI Video Generation", "Branding"],
    linkLabel: "Case Study: First Choice Afro Villa",
    linkHref: "https://www.firstchoiceafrovilla.com",
  },
  {
    title: "Construction",
    subtitle: "Builders & Projects",
    description:
      "Keep clients engaged with project progress videos and a brand that reflects trust and quality.",
    icon: <Construction className="w-7 h-7" />,
    iconWrap: "bg-orange-100 text-orange-600",
    bundle: ["Web Development", "AI Video Generation", "Branding"],
    linkLabel: "View Our Work",
    linkHref: "/projects",
  },
];

const trustSignals = [
  { icon: <Clock className="w-8 h-8" />, title: "5+ Years", subtitle: "of Experience" },
  { icon: <Star className="w-8 h-8" />, title: "98%", subtitle: "Client Satisfaction" },
  { icon: <Award className="w-8 h-8" />, title: "100+", subtitle: "Projects Completed" },
  { icon: <Headphones className="w-8 h-8" />, title: "24/7", subtitle: "Support Available" },
];

const JoetechServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            provider: { "@type": "Organization", name: "Joetech" },
            serviceType: "Tech Solutions and Digital Marketing",
            description:
              "Comprehensive services including web development, branding, 360° virtual tours, AI video generation, digital menus, and marketing",
          }),
        }}
      />

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
      <section className="relative h-96 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            One partner to build, brand, and promote your business — from web and
            app development to 360° virtual tours, AI video, and digital marketing.
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse hidden lg:block"></div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillars Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Build, Show & Sell, and Grow — All Under One Roof
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We organise our services into three pillars that take your business
              from brand and product to visibility and growth — end to end.
            </p>
          </div>

          <div className="space-y-16">
            {pillars.map((pillar, idx) => (
              <PillarSection key={idx} pillar={pillar} />
            ))}
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Industries We Serve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We package our services into complete solutions for the industries
                that depend on seamless digital experiences and immersive visual content.
              </p>
            </div>

            <StaggerGrid className="grid md:grid-cols-3 gap-8" staggerDelay={150}>
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 flex flex-col"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${ind.iconWrap}`}
                  >
                    {ind.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {ind.title}
                  </h3>
                  <p className="text-gray-500 font-medium mb-2">{ind.subtitle}</p>
                  <p className="text-gray-600 mb-6 flex-grow">{ind.description}</p>
                  <ul className="space-y-2 mb-6">
                    {ind.bundle.map((f) => (
                      <li key={f} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={ind.linkHref}
                    target={ind.linkHref.startsWith("http") ? "_blank" : undefined}
                    rel={ind.linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {ind.linkLabel}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* Trust & Social Proof Section */}
        <section className="py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
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

            <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={150}>
              {trustSignals.map((signal, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
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
            </StaggerGrid>

            {/* Additional Trust Elements */}
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert Team
                </h3>
                <p className="text-gray-600">
                  Certified professionals with extensive experience in tech
                  solutions, immersive 360° content, and digital marketing strategies.
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
        <section className="py-20">
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
                Ready to transform your business with our expert tech solutions,
                immersive 360° tours, AI video, and digital marketing services?
                Let's discuss your project and create a strategy that drives results.
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
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Call Now: {PHONE_NUMBER}
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
    </div>
  );
};

export default JoetechServicesPage;