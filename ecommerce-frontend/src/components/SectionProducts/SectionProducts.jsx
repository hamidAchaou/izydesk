import React from "react";
import CategoryAreStarts from "../CategoryAreStarts/CategoryAreStarts";
import { ProductProvider } from "../../context/ProductContext";

const SectionProducts = () => {
  return (
    <ProductProvider>
      <CategoryAreStarts
        title="Derniers produits"
        details="Découvrez les nouveautés dans notre magasin."
      />
    </ProductProvider>
  );
};

export default SectionProducts;