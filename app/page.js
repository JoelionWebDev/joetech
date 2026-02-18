import React from "react";
import Hero from "./components/Hero";
import FeaturedServices from "./components/Featured";
import AboutSection from "./components/About";
import ProjectsPortfolio from "./components/Project";
import BlogInsights from "./components/blog";
import Howwwework from "./components/Howwework";
import TestimonialsSection from "./components/Testimony";
import ContactSection from "./components/Contact";
import CTABanner from "./components/CalltoAction";
import LearnTech from "./components/LearnTech";

const page = () => {
  return (
    <div>
      <Hero />
      {/* Additional content can be added here */}
      <FeaturedServices />
      {/* Learn Tech */}
      <LearnTech />
      {/* You can add more components or sections as needed */}
      <AboutSection />
      <ProjectsPortfolio />
      {/* Add more sections or components as required */}
      <BlogInsights />
      <Howwwework />
      <TestimonialsSection />
      <ContactSection />
      <CTABanner />
      {/* Footer can be added here if needed */}
    </div>
  );
};

export default page;
