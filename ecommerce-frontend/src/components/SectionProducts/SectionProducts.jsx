import React from "react";
import CategoryAreStarts from "../CategoryAreStarts/CategoryAreStarts";
import { ProductProvider } from "../../context/ProductContext";

const SectionProducts = () => {
  return (
    <ProductProvider>
      <CategoryAreStarts
        title="Latest Products"
        details="Check out the newest arrivals in our store."
      />
    </ProductProvider>
  );
};

export default SectionProducts;
