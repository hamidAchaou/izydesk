// src/context/ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../api";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const allProducts = res.data;
        const latest = allProducts
          .sort((a, b) => b.id - a.id)
          .slice(0, 6)
          .map((p) => ({
            id: p.id,
            image: p.image,
            title: p.name,
            price: `$${p.price}`,
          }));

        setLatestProducts(latest);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ latestProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
