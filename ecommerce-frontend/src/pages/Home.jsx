import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Alert } from "@mui/material";
import { getProducts } from "../api";
import ProductCard from "../components/Product/ProductCard";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    getProducts()
      .then(({ data }) => setProducts(data))
      .catch((err) => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} onAddToCart={addItem} />
        </Grid>
      ))}
    </Grid>
  );
}
