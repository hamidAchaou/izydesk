// src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { getProductById } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(id)
      .then(({ data }) => setProduct(data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  if (!product) return null;

  return (
    <Box maxWidth={700} mx="auto" py={4} px={2}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Box
        component="img"
        src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'}
        alt={product.name}
        sx={{ width: '100%', borderRadius: 2, mb: 3 }}
      />
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        ${product.price.toFixed(2)}
      </Typography>
      <Button variant="contained" onClick={() => addItem(product)}>
        Add to Cart
      </Button>
    </Box>
  );
}
