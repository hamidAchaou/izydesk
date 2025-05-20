import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || 'https://via.placeholder.com/300x140?text=No+Image'}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onAddToCart(product)}>Add to Cart</Button>
        <Button size="small" component={RouterLink} to={`/product/${product.id}`}>Details</Button>
      </CardActions>
    </Card>
  );
}
