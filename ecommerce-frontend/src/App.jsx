import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/templatemo-hexashop.css";
import "./assets/css/lightbox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom styles

import { Header, Footer, Loading } from "./components";
import { FaChevronCircleUp } from "react-icons/fa";
import useScrollToTop from "./hooks/useScrollToTop";

// Importing all pages from the index file
import { Home, About, Contact, Products, ShowProducts } from "./pages";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

const App = () => {
  const scrollToTop = useScrollToTop();

  return (
    <Router>
      <Header />
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/single-product/:id" element={<ShowProducts />} />
          </Routes>
        </Suspense>

        {/* Scroll-to-Top Button */}
        <button className="go-to-top" onClick={scrollToTop}>
          <FaChevronCircleUp size={30} />
        </button>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
