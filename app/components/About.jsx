import { Users } from "lucide-react";
import Image from "next/image";

const strengthItems = [
  {
    icon: "code",
    text: "Expertise in modern web & app development with cutting-edge technologies",
  },
  {
    icon: "palette",
    text: "Creative branding and visual design that makes your business stand out",
  },
  {
    icon: "video",
    text: "Professional video production & editing for compelling storytelling",
  },
  {
    icon: "trending",
    text: "Strategic digital marketing campaigns that drive measurable results",
  },
];

const iconMap = {
  code: (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  palette: (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  video: (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  trending: (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

const AboutSection = () => {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950"
      aria-labelledby="about-joetech-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="about-joetech-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 dark:text-white"
          >
            About <span className="text-blue-600 dark:text-blue-500">Joetech</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-slate-400">
            Your all-in-one partner for business growth in the digital age.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
              <Image
                src="/joelion2.jpg"
                alt="Diverse team of professionals collaborating on digital solutions at Joetech, representing teamwork, creativity, and modern technology expertise"
                width={600}
                height={400}
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg dark:bg-slate-900/90">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    Expert Team
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed dark:text-slate-300">
                At Joetech, we transform ambitious ideas into digital reality.
                As a comprehensive tech solutions provider, we specialize in{" "}
                <strong className="text-gray-900 dark:text-white">web development</strong>,
                innovative <strong className="text-gray-900 dark:text-white">branding</strong>,
                professional{" "}
                <strong className="text-gray-900 dark:text-white">video editing</strong>, and
                results-driven{" "}
                <strong className="text-gray-900 dark:text-white">digital marketing</strong>
                strategies that propel businesses forward in today's competitive
                landscape.
              </p>

              <p className="text-gray-600 leading-relaxed dark:text-slate-400">
                Our mission is simple: to be your trusted partner in navigating
                the digital transformation journey, delivering exceptional tech
                solutions that drive growth, engagement, and success.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">
                Why Choose Joetech?
              </h3>
              <ul className="space-y-4" role="list">
                {strengthItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 mt-1 p-2 bg-blue-50 rounded-lg dark:bg-slate-800">
                      {iconMap[item.icon]}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium dark:text-slate-300">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Learn more about Joetech's services and team"
              >
                <span>Learn More About Us</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "100+", label: "Projects Completed" },
            { number: "50+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 dark:text-blue-500">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
