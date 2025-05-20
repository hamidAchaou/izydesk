import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { Slider } from "@mui/material";
import ProductsCards from "./ProductsCards/ProductsCards";
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
        const [productRes, categoryRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productRes.data);
        setCategories(categoryRes.data);

        // Determine min and max price from data
        const prices = productRes.data.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setPriceRange([min, max]);
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
    const applyFilters = () => {
      let filtered = [...products];

      if (selectedCategoryId) {
        filtered = filtered.filter(
          (product) => product.category?.id === parseInt(selectedCategoryId)
        );
      }

      filtered = filtered.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(filtered);
      setCurrentPage(0);
    };

    applyFilters();
  }, [products, selectedCategoryId, priceRange]);

  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  return (
    <section className="section" id="products">
      <div className="container">
        <h1 className="section-title">Our Latest Products</h1>
        <p className="section-description">Browse through a wide range of our products.</p>

        <div className="products-layout">
          <aside className="filter-container">
            <h3 className="filter-title">Filter by</h3>

            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label>Price Range</label>
            <Slider
              value={priceRange}
              min={Math.min(...products.map(p => p.price))}
              max={Math.max(...products.map(p => p.price))}
              onChange={(_, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              sx={{ width: "90%", mt: 2 }}
            />
            <div className="price-values">
              <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
            </div>
          </aside>

          <main className="products-grid">
            {loading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && paginatedProducts.length > 0 && (
              <ProductsCards products={paginatedProducts} />
            )}

            {!loading && !error && paginatedProducts.length === 0 && (
              <p>No products match your filters.</p>
            )}

            {!loading && !error && filteredProducts.length > productsPerPage && (
              <div className="pagination-container">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
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
