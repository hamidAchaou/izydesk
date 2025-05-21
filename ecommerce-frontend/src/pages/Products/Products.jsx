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

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
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

  // Apply category filter
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];
      if (selectedCategoryId) {
        filtered = filtered.filter(
          (product) => product.category?.id === parseInt(selectedCategoryId)
        );
      }
      setFilteredProducts(filtered);
      setCurrentPage(0);
    };
    applyFilters();
  }, [products, selectedCategoryId]);

  // Adjust price slider range on category filter
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const prices = filteredProducts.map((p) => p.price);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [filteredProducts]);

  const handlePriceChange = (_, newValue) => {
    setPriceRange(newValue);
  };

  const filteredAndPricedProducts = useMemo(() => {
    return filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }, [filteredProducts, priceRange]);

  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * productsPerPage;
    return filteredAndPricedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredAndPricedProducts, currentPage]);

  const handlePageChange = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  const sliderMin =
    filteredProducts.length > 0
      ? Math.min(...filteredProducts.map((p) => p.price))
      : 0;

  const sliderMax =
    filteredProducts.length > 0
      ? Math.max(...filteredProducts.map((p) => p.price))
      : 1000;

  return (
    <section className="section" id="products">
      <div className="container">
        <h1 className="section-title">Our Latest Products</h1>
        <p className="section-description">Browse through a wide range of our products.</p>

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
            {loading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && paginatedProducts.length > 0 && (
              <ProductsCards products={paginatedProducts} />
            )}

            {!loading && !error && paginatedProducts.length === 0 && (
              <p>No products match your filters.</p>
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
