// src/components/Admin/DashboardMenu/DashboardMenu.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DashboardMenu = () => {
  const menuItems = [
    { label: "Tableau de bord", path: "/admin", icon: <DashboardIcon /> },
    { label: "Commandes", path: "/admin/orders", icon: <ShoppingCartIcon /> },
    { label: "Produits", path: "/admin/products", icon: <InventoryIcon /> },
    { label: "Catégories", path: "/admin/categories", icon: <CategoryIcon /> },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.path}
          component={NavLink}
          to={item.path}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#f0f0f0" : "transparent",
          })}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

export default DashboardMenu;
