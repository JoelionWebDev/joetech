// app/testimonials/page.jsx
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Johnson Monasoko",
    role: "CEO at TechStart",
    company: "TechStart Inc.",
    message:
      "Working with this team has been transformative for our business. They delivered a robust solution that exceeded our expectations and helped us scale efficiently.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sunday Michael",
    role: "Product Manager",
    company: "InnovateCo",
    message:
      "The level of professionalism and technical expertise is outstanding. Our project was completed on time and the results speak for themselves.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Phillip",
    role: "Founder",
    company: "StartupHub",
    message:
      "I couldn't be happier with the web application they built for us. The attention to detail and user experience is phenomenal.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO at DataFlow",
    company: "DataFlow Systems",
    message:
      "Their deep understanding of modern web technologies made our complex project seem effortless. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Okafor",
    role: "Marketing Director",
    company: "GrowthLabs",
    message:
      "From concept to deployment, the process was smooth and collaborative. They truly care about delivering quality work.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Operations Manager",
    company: "LogiTech Solutions",
    message:
      "The custom dashboard they created has streamlined our operations significantly. Worth every penny!",
    rating: 4,
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
