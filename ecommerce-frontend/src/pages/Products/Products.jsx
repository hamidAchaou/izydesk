import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactPaginate from "react-paginate";
import ProductsCards from "./ProductsCards/ProductsCards";
import FilterCard from "./FilterCard/FilterCard";
import { getProducts, getCategories } from "../../api";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const productsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productRes.data);
        setCategories(categoryRes.data);
        setFilteredProducts(productRes.data);
      } catch (err) {
        setError("Failed to fetch products or categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (selectedCategoryId) {
      filtered = filtered.filter(product => product.category?.id === parseInt(selectedCategoryId));
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategoryId]);

  // Initialiser priceRange seulement quand filteredProducts change après un filtre de catégorie
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const prices = filteredProducts.map(p => p.price);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [selectedCategoryId, filteredProducts]);

  // Reset page quand priceRange change
  useEffect(() => {
    setCurrentPage(0);
  }, [priceRange]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredAndPricedProducts = useMemo(() => {
    return filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }, [filteredProducts, priceRange]);

  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * productsPerPage;
    return filteredAndPricedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredAndPricedProducts, currentPage]);

  const handlePageChange = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  const [sliderMin, sliderMax] = useMemo(() => {
    if (filteredProducts.length === 0) return [0, 1000];
    const prices = filteredProducts.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [filteredProducts]);

  return (
    <section className="section" id="products">
      <div className="container">
      <h1 className="section-title">Nos derniers produits</h1>
      <p className="section-description">Parcourez notre large gamme de produits.</p>

        <div className="products-layout">
          <FilterCard
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={setSelectedCategoryId}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            sliderMin={sliderMin}
            sliderMax={sliderMax}
          />

          <main className="products-grid">
          {loading && <p>Chargement des produits...</p>}
          {error && <p className="error">{error}</p>}

            {!loading && !error && paginatedProducts.length > 0 && (
              <ProductsCards products={paginatedProducts} />
            )}

            {!loading && !error && paginatedProducts.length === 0 && (
              <p>Aucun produit ne correspond à vos filtres.</p>
            )}

            {!loading && !error && filteredAndPricedProducts.length > productsPerPage && (
              <div className="pagination-container">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={Math.ceil(filteredAndPricedProducts.length / productsPerPage)}
                  onPageChange={handlePageChange}
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  breakLabel="..."
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Products);
