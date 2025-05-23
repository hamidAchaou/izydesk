// src/pages/Admin/Dashboard/AdminDashboardLayout.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import CategoriesDashboard from "./CategoriesDashboard/CategoriesDashboard";
import ProductsDashboard from "./ProductsDashboard/ProductsDashboard";
import Sidebar from "../../../components/Admin/Dashboards/Sidebar/Sidebar";
import ErrorBoundary from "../../../components/layouts/Error/ErrorBoundary";
import OrdersDashboard from "./OrdersDashboard/OrdersDashboard";

const AdminDashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ 
        flex: 1, 
        p: 3,
        maxWidth: 'calc(100% - 240px)' // Adjust based on sidebar width
      }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="products" replace />} />
            <Route path="products" element={<ProductsDashboard />} />
            <Route path="categories" element={<CategoriesDashboard />} />
            <Route path="orders" element={<OrdersDashboard />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;