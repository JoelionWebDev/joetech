import Image from "next/image";
import Link from "next/link";
import StaggerGrid from "../../components/StaggerGrid";

const projects = [
  {
    id: 1,
    title: "De Phantom Continental Hotel Group",
    description:
      "Multi-property website for De Phantom Continental Hotel Group, covering two Lagos locations. Built as a clean, fast-loading informational and booking-inquiry site for each hotel branch.",
    image: "/images/dephantom.png",
    tags: ["Web Development", "Hospitality"],
    category: "Hospitality",
    url: "https://www.dephantomhotelgroup.com",
  },
  {
    id: 2,
    title: "First Choice Afro Villa",
    description:
      "Real estate and land investment website featuring active property listings, an FAQ system, WhatsApp-integrated inquiries, and a full contact form covering all 36 Nigerian states.",
    image: "/images/firstchoiceafrovilla.png",
    tags: ["Web Development", "Real Estate"],
    category: "Real Estate",
    url: "https://www.firstchoiceafrovilla.com",
  },
  {
    id: 3,
    title: "Enamis Systems",
    description:
      "Company website for a Lagos-based electrical and smart technology solutions provider. Showcases six core services with a detailed quote-request form segmented by service and property type.",
    image: "/images/enamissystems.png",
    tags: ["Web Development", "Electrical & Smart Tech"],
    category: "Electrical & Smart Tech",
    url: "https://www.enamissystems.name.ng",
  },
];

const tagColors = {
  "Web Development": "bg-blue-100 text-blue-800",
  "Real Estate": "bg-emerald-100 text-emerald-800",
  Hospitality: "bg-amber-100 text-amber-800",
  "Electrical & Smart Tech": "bg-cyan-100 text-cyan-800",
  Construction: "bg-orange-100 text-orange-800",
  "E-commerce": "bg-purple-100 text-purple-800",
  "Music & Media": "bg-pink-100 text-pink-800",
  Blog: "bg-indigo-100 text-indigo-800",
  "Travel & Hospitality": "bg-teal-100 text-teal-800",
  Technology: "bg-slate-100 text-slate-800",
};

const ProjectsPortfolio = () => {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
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

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={100}>
          {projects.map((project) => (
            <article
              key={project.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={`${project.title} project showcasing Joetech's expertise`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

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

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-2"
                  aria-label={`View ${project.title} live website`}
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </StaggerGrid>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors group"
          >
            View Full Portfolio
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPortfolio;
