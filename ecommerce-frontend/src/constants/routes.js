// src/constants/routes.js
export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    PRODUCTS: '/products',
    SINGLE_PRODUCT: '/products/single-product/:id',
    CART: '/cart',
    ADMIN_DASHBOARD: '/admin/dashboard',
    LOGIN: '/login',
    REGISTER: '/register',
    FORBIDDEN: '/forbidden'
  };
  
  export const HIDE_HEADER_FOOTER_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    /^\/admin\/dashboard.*/ // Regex for all admin dashboard routes
  ];