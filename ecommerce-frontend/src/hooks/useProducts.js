// src/hooks/useProducts.js
import { useState, useEffect, useMemo, useCallback } from "react";
import { getProducts, getCategories } from "../api";

export const useProducts = (productsPerPage = 6) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        const fetchedProducts = productRes.data;
        const fetchedCategories = categoryRes.data;

        setProducts(fetchedProducts);
        setCategories(fetchedCategories);

        const prices = fetchedProducts.map((p) => p.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        setError("Failed to load products or categories.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
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
  }, [products, selectedCategoryId, priceRange]);

  const paginatedProducts = useMemo(() => {
    const start = currentPage * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  return {
    products,
    categories,
    paginatedProducts,
    filteredProducts,
    loading,
    error,
    selectedCategoryId,
    setSelectedCategoryId,
    priceRange,
    setPriceRange,
    handlePageChange,
  };
};
