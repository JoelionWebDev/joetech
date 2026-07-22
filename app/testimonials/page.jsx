// app/testimonials/page.jsx
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Mr Olusola Sanni",
    role: "Manager, De Phantom Continental Hotel Group",
    company: "De Phantom Continental Hotel Group",
    message:
      "The website Joetech built for us is fantastic. It's beautiful, and we love how it turned out.",
    rating: 5,
    image: "/testimony/dephantom-rep.jpeg",
    url: "https://www.dephantomhotelgroup.com",
  },
  {
    id: 2,
    name: "Engr. (Dr.) Jerry Patrick",
    role: "CEO, First Choice Afro Villa",
    company: "First Choice Afro Villa",
    message:
      "What Joetech built for us is beautiful — we love everything about it.",
    rating: 5,
    image: "/testimony/firstchoice-rep.jpeg",
    url: "https://www.firstchoiceafrovilla.com",
  },
  {
    id: 3,
    name: "Mr Victor Ajaye",
    role: "Enamis Systems",
    company: "Enamis Systems",
    message:
      "This is wonderful. Beautiful work from Joetech — we love what they built for us.",
    rating: 5,
    image: "/testimony/enamis-logo.png",
    useLogo: true,
    url: "https://www.enamissystems.name.ng",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
