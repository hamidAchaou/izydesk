// components/TeamSection.js
import React from "react";
import TeamMember from "./TeamMember";

const teamMembers = [
  {
    name: "Ragnar Lodbrok",
    role: "Product Caretaker",
    image: "assets/images/omar.jpg",
  },
  {
    name: "Lagertha",
    role: "Project Manager",
    image: "assets/images/team-member-02.jpg",
  },
  {
    name: "Bjorn Ironside",
    role: "Lead Developer",
    image: "assets/images/team-member-03.jpg",
  },
];

const TeamSection = () => (
  <section className="our-team">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading">
            <h2>Our Amazing Team</h2>
            <span>
              Details to details is what makes Hexashop different from the other
              themes.
            </span>
          </div>
        </div>
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
            width="300px"
            height="300px"
          />
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
