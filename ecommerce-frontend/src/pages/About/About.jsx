import React from "react";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import ServiceSection from "./ServiceSection";
import SubscribeSection from "./SubscribeSection";
import "./About.css";
import HeroSection from "../../components/HeroSection/HeroSection";

const About = () => (
  <div>
    {/* <MainBanner /> */}
    <HeroSection
      title={"À propos de notre entreprise"}
      details={"Un modèle HTML5 impressionnant, propre et créatif"}
    />
    <AboutSection />
    <TeamSection />
    <ServiceSection />
    <SubscribeSection />
  </div>
);

export default About;
