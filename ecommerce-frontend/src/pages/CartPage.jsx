import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { Link as RouterLink } from "react-router-dom";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, totalPrice } = useCart();

  if (cart.items.length === 0) {
    return (
      <Typography variant="h6">
        Your cart is empty.{" "}
        <Button component={RouterLink} to="/">
          Go shopping
        </Button>
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.items.map(({ product, quantity }) => (
          <ListItem
            key={product.id}
            secondaryAction={
              <>
                <TextField
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(e) =>
                    updateQuantity(
                      product.id,
                      Math.max(1, Number(e.target.value))
                    )
                  }
                  sx={{ width: 60, mr: 2 }}
                  inputProps={{ min: 1 }}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeItem(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={product.name}
              secondary={`$${product.price.toFixed(2)} x ${quantity} = $${(
                product.price * quantity
              ).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="/checkout"
        sx={{ mt: 2 }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
}
