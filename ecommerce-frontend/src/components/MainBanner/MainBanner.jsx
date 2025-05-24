import React from "react";

// Importation des images
import leftBannerImage from "../../assets/images/mainBanner-WomenShop.jpg";
import womenImage from "../../assets/images/baner-right-image-01.jpg";
import menImage from "../../assets/images/baner-right-image-02.jpg";
import kidsImage from "../../assets/images/baner-right-image-03.jpg";
import accessoriesImage from "../../assets/images/baner-right-image-04.jpg";

const MainBanner = () => {
  return (
    <section className="main-banner" id="top">
      <div className="container-fluid">
        <div className="row">
          {/* Bannière gauche */}
          <div className="col-lg-6">
            <div className="left-content">
              <div className="thumb">
                <div className="inner-content">
                  <h4>Bienvenue chez AtlacdpsShop</h4>
                  <span>
                    Votre boutique tout-en-un pour des produits stylés, propres et créatifs.
                    Explorez notre collection et trouvez ce que vous aimez !
                  </span>
                  <div className="main-border-button">
                    <a href="/products">Achetez maintenant !</a>
                  </div>
                </div>
                <img src={leftBannerImage} alt="Bannière principale" />
              </div>
            </div>
          </div>

          {/* Sections de la bannière droite */}
          <div className="col-lg-6">
            <div className="right-content">
              <div className="row">
                {[
                  {
                    title: "Femme",
                    subtitle: "Meilleurs vêtements pour femme",
                    img: womenImage,
                    desc: "Découvrez la meilleure collection de vêtements pour femme.",
                    query: "women",
                  },
                  {
                    title: "Homme",
                    subtitle: "Meilleurs vêtements pour homme",
                    img: menImage,
                    desc: "Explorez des vêtements de qualité pour homme.",
                    query: "men",
                  },
                  {
                    title: "Enfants",
                    subtitle: "Meilleurs vêtements pour enfants",
                    img: kidsImage,
                    desc: "Trouvez des vêtements adorables et stylés pour enfants.",
                    query: "kids",
                  },
                  {
                    title: "Accessoires",
                    subtitle: "Accessoires tendance",
                    img: accessoriesImage,
                    desc: "Parcourez notre collection d'accessoires tendance.",
                    query: "accessories",
                  },
                ].map((category, index) => (
                  <div className="col-lg-6" key={index}>
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>{category.title}</h4>
                          <span>{category.subtitle}</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>{category.title}</h4>
                            <p>{category.desc}</p>
                            <div className="main-border-button">
                              <a href={`/products?category=${category.query}`}>
                                Découvrir plus
                              </a>
                            </div>
                          </div>
                        </div>
                        <img src={category.img} alt={`Bannière ${category.title}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
