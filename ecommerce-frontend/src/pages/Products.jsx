// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = search ? `/api/products?q=${encodeURIComponent(search)}` : '/api/products';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(query.trim());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{ mb: 4, display: 'flex', maxWidth: 400 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  aria-label="search products"
                  edge="end"
                  disabled={!query.trim()}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" mb={4}>
          {error}
        </Typography>
      )}

      {!loading && !error && products.length === 0 && (
        <Typography align="center" color="text.secondary" variant="h6">
          No products found.
        </Typography>
      )}

      <Grid container spacing={3}>
        {products.map(({ id, name, description, price, image }) => (
          <Grid key={id} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={image || 'https://via.placeholder.com/300x180?text=No+Image'}
                alt={name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {description}
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  ${price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/shop/${id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
