import { PHONE_NUMBER, PHONE_TEL } from "../../lib/site";
import {
  ChevronRight,
  Code,
  Palette,
  Megaphone,
  Smartphone,
  Globe,
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
  title: "Our Services - Business Digital Branding: Websites, Graphics, Advertising & Apps | Joetech",
  description:
    "Explore Joetech's Business Digital Branding services: business websites, graphics & branding, advertising, and web & cross-platform mobile app development. One partner to build, brand and promote your business.",
  keywords:
    "business digital branding Lagos, website development Lagos, logo design Nigeria, graphics and branding agency Lagos, advertising agency Lagos, app development Nigeria, digital marketing Lagos",
  alternates: { canonical: "https://joetech.name.ng/services" },
  openGraph: {
    title: "Business Digital Branding Services | Joetech",
    description:
      "Transform your business with Joetech's websites, graphics & branding, advertising and app development services. Get a free consultation today!",
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
    title: "Website",
    icon: <Globe className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-blue-600 to-indigo-700",
    intro:
      "Your business, online and ready to sell — fast, professional websites that turn visitors into enquiries, bookings and sales.",
    services: [
      {
        icon: <Globe className="w-9 h-9" />,
        title: "Business Websites",
        description:
          "Custom responsive business websites built for speed, mobile and search — with clear calls to action, enquiry and WhatsApp forms, and pages that explain what you sell.",
        features: [
          "Responsive & Mobile-First Design",
          "SEO-Ready Structure",
          "Enquiry & WhatsApp Forms",
          "Fast Loading on Mobile",
          "Booking & Contact Pages",
          "Ongoing Maintenance & Updates",
        ],
      },
      {
        icon: <Target className="w-9 h-9" />,
        title: "Landing Pages & Booking Sites",
        description:
          "High-converting landing pages and booking sites for hotels, venues, real estate, clinics and service businesses — designed around one clear action: enquire, book or buy.",
        features: [
          "High-Converting Landing Pages",
          "Hotel, Venue & Event Booking Pages",
          "Lead Capture & WhatsApp Enquiries",
          "Clear Calls to Action",
          "Mobile-First Layout",
        ],
      },
    ],
  },
  {
    title: "Graphics & Branding",
    icon: <Palette className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-purple-600 to-fuchsia-700",
    intro:
      "A brand customers recognise instantly — logos, colours, fonts and graphics that stay consistent everywhere your business appears.",
    services: [
      {
        icon: <Palette className="w-9 h-9" />,
        title: "Logo & Brand Identity",
        description:
          "Complete brand identity including logo design, colour and font systems, and brand guidelines — so your business looks established and trustworthy from day one.",
        features: [
          "Logo Design & Visual Identity",
          "Brand Identity Development",
          "Colour & Font Systems",
          "Digital Brand Guidelines",
          "Market & Competitive Research",
        ],
      },
      {
        icon: <Megaphone className="w-9 h-9" />,
        title: "Social & Marketing Graphics",
        description:
          "Social media templates, ad creatives, flyers and brand kits that keep your marketing looking sharp — and make your ads and posts stop the scroll.",
        features: [
          "Social Media Templates",
          "Ad Creatives & Banners",
          "Flyers & Marketing Materials",
          "Complete Brand Kits",
          "Consistent Visual Style",
        ],
      },
    ],
  },
  {
    title: "Advertising",
    icon: <TrendingUp className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-emerald-600 to-teal-700",
    intro:
      "We promote your business to the right people — with paid ads, SEO and social media that turn attention into customers and grow your bottom line.",
    services: [
      {
        icon: <Megaphone className="w-9 h-9" />,
        title: "Paid Advertising",
        description:
          "Google, Meta and social media advertising matched to a landing page that converts — with clear tracking, so you know what each campaign actually brings in.",
        features: [
          "Google & Meta Advertising",
          "Social Media Advertising",
          "Landing Pages Matched to Ads",
          "Pay-Per-Click (PPC) Campaigns",
          "Campaign Tracking & Reporting",
        ],
      },
      {
        icon: <TrendingUp className="w-9 h-9" />,
        title: "SEO & Social Media Growth",
        description:
          "Search engine optimisation, social media management and content that increase online visibility and drive qualified traffic that converts.",
        features: [
          "Search Engine Optimization (SEO)",
          "Social Media Management",
          "Content Marketing Strategy",
          "Google Business Profile Optimisation",
        ],
      },
    ],
  },
  {
    title: "App Development",
    icon: <Smartphone className="w-7 h-7" />,
    headerClass: "bg-gradient-to-r from-indigo-600 to-blue-700",
    intro:
      "When a website is not enough — functional apps that let customers book, order, manage and stay connected with your business.",
    services: [
      {
        icon: <Code className="w-9 h-9" />,
        title: "Web Apps",
        description:
          "Powerful web applications including booking systems, online stores, dashboards and customer portals — built to scale as your business grows.",
        features: [
          "Booking & Order Systems",
          "Online Stores & Customer Portals",
          "Dashboards & Admin Panels",
          "Custom CMS Solutions",
          "Ongoing Maintenance & Updates",
        ],
      },
      {
        icon: <Smartphone className="w-9 h-9" />,
        title: "Cross-Platform Mobile Apps",
        description:
          "Mobile apps for Android and iOS built from one codebase — faster and more affordable than building two separate native apps, with a web-app (PWA) option where it fits.",
        features: [
          "Android & iOS from One Codebase",
          "Booking, Store & Customer Apps",
          "Push-Ready, Mobile-First Design",
          "App Store & Google Play Guidance",
          "Ongoing Maintenance & Updates",
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
      "Complete guest-facing digital presence, from website and booking pages to branding and advertising that fills rooms.",
    icon: <Utensils className="w-7 h-7" />,
    iconWrap: "bg-amber-100 text-amber-600",
    bundle: ["Website", "Graphics & Branding", "Advertising", "Booking Pages"],
    linkLabel: "Case Study: De Phantom Hotel Group",
    linkHref: "https://www.dephantomhotelgroup.com",
  },
  {
    title: "Real Estate",
    subtitle: "Properties & Investments",
    description:
      "List, show, and sell properties anywhere with a fast website, strong branding and ads that bring qualified buyers.",
    icon: <Landmark className="w-7 h-7" />,
    iconWrap: "bg-emerald-100 text-emerald-600",
    bundle: ["Website", "Graphics & Branding", "Advertising", "App Development"],
    linkLabel: "Case Study: First Choice Afro Villa",
    linkHref: "https://www.firstchoiceafrovilla.com",
  },
  {
    title: "Construction",
    subtitle: "Builders & Projects",
    description:
      "Keep clients engaged with a professional website, clear project showcases and a brand that reflects trust and quality.",
    icon: <Construction className="w-7 h-7" />,
    iconWrap: "bg-orange-100 text-orange-600",
    bundle: ["Website", "Advertising", "Branding"],
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
            serviceType: "Business Digital Branding",
            description:
              "Business Digital Branding services including websites, graphics & branding, advertising, and web & cross-platform mobile app development",
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
            One partner to build, brand, and promote your business — with
            websites, graphics, advertising and apps, under Business Digital Branding.
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
              Website, Graphics, Advertising & Apps — All Under One Roof
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We organise our services into four pillars that take your business
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
                that depend on strong websites, branding and advertising to win customers.
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
                  Certified professionals with extensive experience in websites,
                  branding, advertising and app development.
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
                Ready to transform your business with websites, graphics,
                advertising and apps that bring customers?
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