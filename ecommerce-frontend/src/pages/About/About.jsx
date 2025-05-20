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
      title={"About Our Company"}
      details={"Awesome, clean &amp; creative HTML5 Template"}
    />
    <AboutSection />
    <TeamSection />
    <ServiceSection />
    <SubscribeSection />
  </div>
);

export default About;
