import React from "react";
import ContactAreaStarts from "./ContactAreaStarts";
import SubscribeAreaStarts from "../../components/SubscribeAreaStarts/SubscribeAreaStarts";
import HeroSection from "../../components/HeroSection/HeroSection";

const Contact = () => {
  return (
    <>
      <HeroSection
        title={"Contact Us"}
        details={"Awesome, clean &amp; creative HTML5 Template"}
      />
      <ContactAreaStarts />
      <SubscribeAreaStarts />
    </>
  );
};

export default Contact;
