import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const { cart } = useCart();

  const totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
          tabIndex={0}
        >
          My E-Commerce
        </Typography>
        <Tooltip title="View cart">
          <IconButton
            component={RouterLink}
            to="/cart"
            color="inherit"
            aria-label="View shopping cart"
          >
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
