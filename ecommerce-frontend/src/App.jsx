import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./assets/css/templatemo-hexashop.css";
import "./assets/css/lightbox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  Home,
  About,
  Contact,
  Products,
  ShowProducts,
} from "./pages";
import { Header, Footer, Loading } from "./components";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { FaChevronCircleUp } from "react-icons/fa";
import useScrollToTop from "./hooks/useScrollToTop";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Forbidden from "./pages/Forbidden";
import AdminDashboardLayout from "./pages/Admin/Dashboard/AdminDashboardLayout";

const AppContent = () => {
  const scrollToTop = useScrollToTop();
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/login", "/register"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/single-product/:id"
              element={<ShowProducts />}
            />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route
              path="/admin/dashboard/*"
              element={
                <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                  <AdminDashboardLayout />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forbidden" element={<Forbidden />} />
          </Routes>
        </Suspense>
        <button className="go-to-top" onClick={scrollToTop}>
          <FaChevronCircleUp size={30} />
        </button>
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
