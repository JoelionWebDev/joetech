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
import FadeInSection from "../components/FadeInSection";

const page = () => {
  return (
    <div>
      <Hero />
      <FadeInSection><FeaturedServices /></FadeInSection>
      <FadeInSection><LearnTech /></FadeInSection>
      <FadeInSection delay={100}><AboutSection /></FadeInSection>
      <FadeInSection delay={100}><ProjectsPortfolio /></FadeInSection>
      <FadeInSection delay={100}><BlogInsights /></FadeInSection>
      <FadeInSection delay={100}><Howwwework /></FadeInSection>
      <FadeInSection delay={200}><TestimonialsSection /></FadeInSection>
      <FadeInSection delay={200}><ContactSection /></FadeInSection>
      <FadeInSection delay={200}><CTABanner /></FadeInSection>
    </div>
  );
};

export default page;
