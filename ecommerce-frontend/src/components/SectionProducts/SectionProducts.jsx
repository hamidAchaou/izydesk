import React, { useEffect, useState } from "react";
import CategoryAreStarts from "../CategoryAreStarts/CategoryAreStarts";
import { getProducts } from "../../api";

const SectionProducts = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const allProducts = res.data;

        // Sort by ID or createdAt if available, then take latest 6
        const latest = allProducts
          .sort((a, b) => b.id - a.id) // or sort by `createdAt` if available
          .slice(0, 6)
          .map((p) => ({
            image: p.image,
            title: p.name,
            price: `$${p.price}`,
            link: `/single-product/${p.id}`,
          }));

        setLatestProducts(latest);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <>
      <CategoryAreStarts
        title="Latest Products"
        details="Check out the newest arrivals in our store."
        products={latestProducts}
      />
    </>
  );
};

export default SectionProducts;
