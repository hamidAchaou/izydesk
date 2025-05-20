import React from "react";
// Correctly import all images
import leftBannerImage from "../../assets/images/mainBanner-WomenShop.jpg";
import womenImage from "../../assets/images/baner-right-image-01.jpg";
import menImage from "../../assets/images/baner-right-image-02.jpg";
import kidsImage from "../../assets/images/baner-right-image-03.jpg";
import accessoriesImage from "../../assets/images/baner-right-image-04.jpg";

const MainBanner = () => {
  return (
    <>
      <div className="main-banner" id="top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content">
                <div className="thumb">
                  <div className="inner-content">
                    <h4>We Are AtlacdpsShop</h4>
                    <span>
                      {" "}
                      Your one-stop shop for awesome, clean, and creative
                      products. Explore our collection and find something you
                      love!
                    </span>
                    <div className="main-border-button">
                      <a href="/products">Purchase Now!</a>
                    </div>
                  </div>
                  <img src={leftBannerImage} alt="Hexashop Banner" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  {/* Women Section */}
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Women</h4>
                          <span>Best Clothes For Women</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Women</h4>
                            <p>
                              Discover the best women's clothing collection.
                            </p>
                            <div className="main-border-button">
                              <a href="/products?category=women">
                                Discover More
                              </a>
                            </div>
                          </div>
                        </div>
                        <img src={womenImage} alt="Women Fashion" />
                      </div>
                    </div>
                  </div>
                  {/* Men Section */}
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Men</h4>
                          <span>Best Clothes For Men</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Men</h4>
                            <p>Explore top-quality clothing for men.</p>
                            <div className="main-border-button">
                              <a href="/products?category=men">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src={menImage} alt="Men Fashion" />
                      </div>
                    </div>
                  </div>
                  {/* Kids Section */}
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Kids</h4>
                          <span>Best Clothes For Kids</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Kids</h4>
                            <p>Find adorable and stylish clothes for kids.</p>
                            <div className="main-border-button">
                              <a href="/products?category=kids">
                                Discover More
                              </a>
                            </div>
                          </div>
                        </div>
                        <img src={kidsImage} alt="Kids Fashion" />
                      </div>
                    </div>
                  </div>
                  {/* Accessories Section */}
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Accessories</h4>
                          <span>Best Trend Accessories</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Accessories</h4>
                            <p>
                              Browse our collection of trending accessories.
                            </p>
                            <div className="main-border-button">
                              <a href="/products?category=accessories">
                                Discover More
                              </a>
                            </div>
                          </div>
                        </div>
                        <img src={accessoriesImage} alt="Accessories" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
