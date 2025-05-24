// components/TeamSection.js
import React from "react";
import TeamMember from "./TeamMember";

const teamMembers = [
  {
    name: "Ragnar Lodbrok",
    role: "Responsable Produits",
    image: "assets/images/omar.jpg",
  },
  {
    name: "Lagertha",
    role: "Cheffe de Projet",
    image: "assets/images/team-member-02.jpg",
  },
  {
    name: "Bjorn Ironside",
    role: "Développeur Principal",
    image: "assets/images/team-member-03.jpg",
  },
];

const TeamSection = () => (
  <section className="our-team">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading">
            <h2>Notre Équipe Exceptionnelle</h2>
            <span>
              Le souci du détail est ce qui rend AtlacdpsShop unique par rapport aux autres plateformes.
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
